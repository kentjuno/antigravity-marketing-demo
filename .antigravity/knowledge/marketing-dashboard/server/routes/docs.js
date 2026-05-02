import { Hono } from 'hono';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, resolve, extname, basename, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = new Hono();

// Docs root: <project>/docs/
const getDocsDir = () => resolve(join(__dirname, '../../../../../docs'));

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  const data = {};
  let body = content;
  if (match) {
    const yaml = match[1];
    body = content.slice(match[0].length).trim();
    yaml.split('\n').forEach(line => {
      const [key, ...values] = line.split(':');
      if (key && values.length > 0) {
        data[key.trim()] = values.join(':').trim();
      }
    });
  }
  return { data, body };
}

/**
 * Build a navigation tree from the docs directory
 */
function buildNavTree(dir, baseDir = dir) {
  const items = [];
  if (!existsSync(dir)) return items;

  const entries = readdirSync(dir, { withFileTypes: true });
  const docGroups = {};

  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'index.json') continue;
    const fullPath = join(dir, entry.name);
    const relativePath = relative(baseDir, fullPath).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      const children = buildNavTree(fullPath, baseDir);
      if (children.length > 0) {
        let order = 999;
        const match = entry.name.match(/^(\d+)-/);
        if (match) order = parseInt(match[1], 10);

        items.push({
          type: 'category',
          name: formatName(entry.name),
          slug: relativePath,
          order,
          children
        });
      }
    } else if (extname(entry.name) === '.md') {
      const content = readFileSync(fullPath, 'utf-8');
      const { data, body } = parseFrontmatter(content);
      
      let baseSlugName = entry.name.replace(/\.md$/, '');
      let lang = data.lang;
      
      const langMatch = baseSlugName.match(/\.(vn|en)$/i);
      if (langMatch) {
         lang = langMatch[1].toLowerCase();
         baseSlugName = baseSlugName.replace(/\.(vn|en)$/i, '');
      }
      
      const relativePathDir = relative(baseDir, dir).replace(/\\/g, '/');
      const baseSlug = relativePathDir ? `${relativePathDir}/${baseSlugName}` : baseSlugName;

      const title = data.title || extractTitle(body) || formatName(baseSlugName);
      const description = data.description || extractDescription(body);
      const order = data.order !== undefined ? parseInt(data.order, 10) : 999;
      
      if (!docGroups[baseSlug]) {
        docGroups[baseSlug] = {
           type: 'doc',
           name: {},
           description,
           slug: baseSlug,
           order: order,
           langs: {}
        };
        items.push(docGroups[baseSlug]);
      }
      
      const targetLang = lang || 'default';
      docGroups[baseSlug].name[targetLang] = title;
      docGroups[baseSlug].langs[targetLang] = { path: relativePath };
      
      if (order < docGroups[baseSlug].order) docGroups[baseSlug].order = order;
    }
  }

  // Sort items based on order, then name
  items.sort((a, b) => {
    const orderA = a.order !== undefined ? a.order : 999;
    const orderB = b.order !== undefined ? b.order : 999;
    if (orderA !== orderB) return orderA - orderB;
    const nameA = typeof a.name === 'string' ? a.name : (a.name.vn || a.name.en || a.name.default || '');
    const nameB = typeof b.name === 'string' ? b.name : (b.name.vn || b.name.en || b.name.default || '');
    return nameA.localeCompare(nameB);
  });

  return items;
}

function formatName(name) {
  return name
    .replace(/^\d+-/, '') // Remove leading numbers like "01-"
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].replace(/[🚀🎨📖⚡📣🤖🧠]/g, '').trim() : null;
}

function extractDescription(content) {
  // Get first non-heading, non-empty paragraph
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('!') && !trimmed.startsWith('>')) {
      return trimmed.replace(/\*([^*]+)\*/g, '$1').slice(0, 120);
    }
  }
  return '';
}

// GET /api/docs - List all docs with navigation tree
app.get('/', (c) => {
  try {
    const docsDir = getDocsDir();
    const tree = buildNavTree(docsDir);
    return c.json({ docs: tree, docsDir: existsSync(docsDir) });
  } catch (error) {
    console.error('Failed to list docs:', error);
    return c.json({ error: 'Failed to list docs' }, 500);
  }
});

// GET /api/docs/:slug - Get specific doc content (supports nested paths via wildcard)
app.get('/*', (c) => {
  try {
    const docsDir = getDocsDir();
    const slug = c.req.path.replace('/api/docs/', '').replace(/^\//, '');

    if (!slug) {
      return c.json({ error: 'No slug provided' }, 400);
    }

    // Try with .md extension, then without
    const candidates = [
      join(docsDir, slug + '.md'),
      join(docsDir, slug),
      join(docsDir, slug, 'README.md'),
      join(docsDir, slug, 'index.md')
    ];

    let filePath = null;
    for (const candidate of candidates) {
      // Security: must stay within docsDir
      const resolved = resolve(candidate);
      if (!resolved.startsWith(resolve(docsDir))) continue;
      if (existsSync(resolved)) {
        if (statSync(resolved).isFile()) {
          filePath = resolved;
          break;
        }
      }
    }

    if (!filePath) {
      return c.json({ error: 'Doc not found', slug }, 404);
    }

    const rawContent = readFileSync(filePath, 'utf-8');
    const { data, body } = parseFrontmatter(rawContent);
    const stats = statSync(filePath);
    const title = data.title || extractTitle(body) || formatName(basename(filePath, '.md'));

    return c.json({
      slug,
      title,
      content: body,
      modifiedAt: stats.mtime.toISOString()
    });
  } catch (error) {
    console.error('Failed to fetch doc:', error);
    return c.json({ error: 'Failed to fetch doc' }, 500);
  }
});

export default app;

