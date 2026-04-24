import { Hono } from 'hono';
import { promises as fs } from 'fs';
import path from 'path';

const router = new Hono();
const KNOWLEDGE_DIR = path.resolve(process.cwd(), '../../.antigravity/knowledge');

router.get('/', async (c) => {
  try {
    const entries = await fs.readdir(KNOWLEDGE_DIR, { withFileTypes: true });
    
    const skills = [];
    
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name.startsWith('mkt-')) {
        const metadataPath = path.join(KNOWLEDGE_DIR, entry.name, 'metadata.json');
        try {
          const content = await fs.readFile(metadataPath, 'utf-8');
          const metadata = JSON.parse(content);
          
          // Generate a friendly name from the slug
          const slug = entry.name.replace('mkt-', '');
          const name = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          
          skills.push({
            id: slug,
            category: 'all', // We can improve categorization later if needed
            icon: '⚡',
            name: name,
            command: `/ckm:${slug} [Nhập yêu cầu của bạn]`,
            desc: metadata.summary?.substring(0, 100) + (metadata.summary?.length > 100 ? '...' : '') || 'Marketing skill'
          });
        } catch (e) {
          // Ignore folders without metadata.json
          continue;
        }
      }
    }
    
    return c.json(skills);
  } catch (error) {
    console.error('Error reading skills:', error);
    return c.json({ error: 'Failed to load skills' }, 500);
  }
});

export default router;
