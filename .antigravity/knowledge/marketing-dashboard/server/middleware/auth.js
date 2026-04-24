import fs from 'fs';
import path from 'path';

/**
 * License Authentication Middleware
 * Checks if the user has a valid GitHub PAT saved locally
 */
export async function licenseAuth(c, next) {
  // Allow all requests to the license verification endpoints
  if (c.req.path.startsWith('/api/license')) {
    return next();
  }

  // Allow health check
  if (c.req.path === '/health') {
    return next();
  }

  const rootPath = path.resolve(process.cwd(), '../../../');
  const licenseFile = path.join(rootPath, '.antigravity', '.license');
  
  if (!fs.existsSync(licenseFile)) {
    return c.json({
      error: 'Payment Required',
      message: 'No valid license found. Please verify your GitHub PAT.'
    }, 402);
  }

  // File exists, we assume license is valid for runtime to avoid API limits.
  // Full verification happens during the initial entry at the LicenseGate.
  return next();
}
