import { Hono } from 'hono';
import fs from 'fs';
import path from 'path';

const router = new Hono();

router.post('/verify', async (c) => {
  try {
    const body = await c.req.json();
    const token = body.token;
    
    if (!token) {
      return c.json({ error: 'Token is required' }, 400);
    }

    // Call GitHub API to check access to kentjuno/antigravitykit-marketing
    const response = await fetch('https://api.github.com/repos/kentjuno/antigravitykit-marketing', {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'KJ-Studio-License-Checker'
      }
    });

    if (response.status === 200) {
      // Save token
      const rootPath = path.resolve(process.cwd(), '../../../');
      const antigravityDir = path.join(rootPath, '.antigravity');
      if (!fs.existsSync(antigravityDir)) fs.mkdirSync(antigravityDir, { recursive: true });
      
      fs.writeFileSync(path.join(antigravityDir, '.license'), token);
      
      return c.json({ success: true, message: 'License verified successfully' });
    } else {
      return c.json({ error: 'Invalid license or no access to the repository' }, 402);
    }
  } catch (error) {
    return c.json({ error: 'Failed to verify license' }, 500);
  }
});

router.get('/status', (c) => {
  const rootPath = path.resolve(process.cwd(), '../../../');
  const licenseFile = path.join(rootPath, '.antigravity', '.license');
  const hasLicense = fs.existsSync(licenseFile);
  
  return c.json({ hasLicense });
});

export default router;
