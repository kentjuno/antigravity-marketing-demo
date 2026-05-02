import { Hono } from 'hono';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, resolve, extname, basename, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = new Hono();

// Docs root: <project>/docs/
const getDocsDir = () => resolve(join(__dirname, '../../../../../docs'));

/**
 * Build a navigation tree from the docs directory
 */
function buildNavTree(dir, baseDir = dir) {
  const items = [];
  if (!existsSync(dir)) return items;

  const entries = readdirSync(dir, { withFileTypes: true }).sort((a, b) => {
    // Directories first, then files
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;
    return a.name.localeCompare(b.name);
  });

  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'index.json') continue;
    const fullPath = join(dir, entry.name);
    const relativePath = relative(baseDir, fullPath).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      const children = buildNavTree(fullPath, baseDir);
      if (children.length > 0) {
        items.push({
          type: 'category',
          name: formatName(entry.name),
          slug: relativePath,
          children
        });
      }
    } else if (extname(entry.name) === '.md') {
      const slug = relativePath.replace(/\.md$/, '');
      const content = readFileSync(fullPath, 'utf-8');
      const title = extractTitle(content) || formatName(basename(entry.name, '.md'));
      const description = extractDescription(content);
      items.push({
        type: 'doc',
        name: title,
        description,
        slug,
        path: relativePath
      });
    }
  }
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
        filePath = resolved;
        break;
      }
    }

    if (!filePath) {
      return c.json({ error: 'Doc not found', slug }, 404);
    }

    const content = readFileSync(filePath, 'utf-8');
    const stats = statSync(filePath);
    const title = extractTitle(content) || formatName(basename(filePath, '.md'));

    return c.json({
      slug,
      title,
      content,
      modifiedAt: stats.mtime.toISOString()
    });
  } catch (error) {
    console.error('Failed to fetch doc:', error);
    return c.json({ error: 'Failed to fetch doc' }, 500);
  }
});

export default app;

