# Marketing Dashboard - Security & Authentication Guidelines

**Last Updated:** 2025-12-23
**Phase:** 2 (API Layer)
**Status:** Security hardened with 6-layer path traversal defense

---

## Overview

Marketing Dashboard API implements defense-in-depth security with authentication, CORS protection, path traversal prevention, and database integrity measures. This document provides guidelines for developers and operators.

---

## Authentication & API Keys

### API Key Configuration

**Header-based Authentication:**
```
GET /api/campaigns HTTP/1.1
X-API-Key: your-secret-api-key-here
```

**Environment Setup:**

Create `.env` file in server directory:
```bash
# Required in production
API_KEY=your-secret-key-here

# Development (optional)
NODE_ENV=development
SKIP_AUTH=true      # Only in development!

# Server
PORT=3457
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Key Management Best Practices

1. **Generation:**
   - Use cryptographically secure random generation
   - Minimum 32 characters for production
   - Example: `openssl rand -hex 32`

2. **Storage:**
   - Never commit `.env` to git (add to `.gitignore`)
   - Use secrets management in production (GitHub Secrets, Vault, etc.)
   - Rotate keys every 90 days

3. **Distribution:**
   - Share keys via secure channels only
   - One key per environment (dev, staging, prod)
   - Different keys for different clients

4. **Rotation:**
   ```bash
   # When rotating keys:
   1. Generate new key
   2. Update API_KEY in .env
   3. Restart server
   4. Invalidate old key in production
   5. Notify clients of change
   ```

### Development Mode Bypass

**SECURITY WARNING:** Only use in development!

```bash
# .env
NODE_ENV=development
SKIP_AUTH=true
```

**Console Output:**
```
⚠️  AUTH BYPASSED (development mode)
```

When enabled:
- API_KEY not required
- All requests bypass authentication
- Logged to console for visibility
- Server will not start without explicit bypass

### Authentication Errors

**Missing Header:**
```json
{
  "error": "Unauthorized",
  "message": "Missing X-API-Key header"
}
```
**Status:** 401 Unauthorized

**Invalid Key:**
```json
{
  "error": "Unauthorized",
  "message": "Invalid API key"
}
```
**Status:** 401 Unauthorized

**Server Misconfiguration:**
```json
{
  "error": "Server misconfigured",
  "message": "API_KEY not set in environment"
}
```
**Status:** 500 Internal Server Error

---

## CORS (Cross-Origin Resource Sharing)

### Configuration

**Allowed Origins:**
```javascript
// Default: http://localhost:5173 (Vue dev server)
ALLOWED_ORIGINS=http://localhost:5173

// Multiple origins (comma-separated)
ALLOWED_ORIGINS=http://localhost:5173,https://dashboard.example.com,https://app.example.com
```

### How CORS Works

```
1. Browser sends request from http://localhost:5173
2. Server receives Origin header
3. Server checks against ALLOWED_ORIGINS
4. If match → CORS headers included
5. If no match → Request blocked by browser
```

### CORS Headers

**Allowed Request:**
```
Origin: http://localhost:5173
→ Response includes:
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Credentials: true
```

**Blocked Request:**
```
Origin: http://malicious.com
→ Response does NOT include CORS headers
→ Browser blocks response (Same-Origin Policy)
```

### Production Configuration

**Staging:**
```bash
ALLOWED_ORIGINS=https://staging-dashboard.example.com
```

**Production:**
```bash
ALLOWED_ORIGINS=https://dashboard.example.com,https://app.example.com
```

**Do NOT use:**
- Wildcards (*) in production
- Localhost origins
- Insecure HTTP in production

---

## Path Traversal Protection (6-Layer Defense)

### What is Path Traversal?

Attacker tries to access files outside intended directory:

```
GET /api/assets/file/../../../../etc/passwd
GET /api/assets/file/../../../.env
GET /api/assets/file/..%2F..%2F.env
```

### Defense Layers

**Layer 1: URL Decoding**
- Decode URL-encoded characters
- Detect multiple encoding attempts
- Reject double-encoded paths

**Layer 2: Windows Backslash Normalization**
- Convert backslashes to forward slashes
- Prevent cross-platform bypass
- Works on Windows and Unix

**Layer 3: Null Byte Filtering**
- Remove null bytes (\0)
- Prevents null-byte injection attacks
- Validates complete path string

**Layer 4: Symbolic Link Rejection**
- Detect symbolic links
- Reject requests to symlinks
- Prevents symlink escape

**Layer 5: Directory Boundary Enforcement**
- Resolve path to absolute location
- Verify final path is within assets directory
- Use `resolve()` for canonical path

**Layer 6: Whitelist Validation**
- Only serve approved file types
- Check file size limits
- Validate MIME types

### Example Attack Prevention

**Attack 1: Parent Directory Traversal**
```
Request: GET /api/assets/file/../../../../etc/passwd
Layer 5: Resolves to /etc/passwd
Layer 5: NOT within /assets/ directory
Response: 403 Forbidden
```

**Attack 2: URL Encoding**
```
Request: GET /api/assets/file/..%2F..%2F.env
Layer 1: Decodes to ../../.env
Layer 5: Resolves to /.env (outside assets)
Response: 403 Forbidden
```

**Attack 3: Null Byte**
```
Request: GET /api/assets/file/safe.txt%00.exe
Layer 3: Removes null byte
Layer 1: Path validation
Response: 403 Forbidden
```

**Attack 4: Windows Backslash**
```
Request: GET /api/assets/file/..\\..\\sensitive.txt
Layer 2: Normalizes to ../../sensitive.txt
Layer 5: Resolves outside assets
Response: 403 Forbidden
```

### Implementation Details

**Code Pattern:**
```javascript
import { resolve, normalize } from 'path';

function validateFilePath(requestedPath, basePath) {
  // Layer 1: Decode
  const decoded = decodeURIComponent(requestedPath);

  // Layer 2: Normalize backslashes
  const normalized = decoded.replace(/\\/g, '/');

  // Layer 3: Remove null bytes
  const sanitized = normalized.replace(/\0/g, '');

  // Layer 4: Symbolic link check
  const stat = fs.lstatSync(sanitized);
  if (stat.isSymbolicLink()) return null;

  // Layer 5: Resolve to absolute
  const absolute = resolve(basePath, sanitized);
  const baseAbsolute = resolve(basePath);

  if (!absolute.startsWith(baseAbsolute)) {
    throw new Error('Access denied');
  }

  // Layer 6: Type validation
  const mime = getMimeType(absolute);
  if (!ALLOWED_TYPES.includes(mime)) {
    throw new Error('File type not allowed');
  }

  return absolute;
}
```

### Testing Path Traversal Defense

**Test Cases:**
```javascript
// URL encoding
GET /api/assets/file/%2e%2e%2f.env → 403
GET /api/assets/file/%252e%252e%252f.env → 403

// Backslashes
GET /api/assets/file/..\.env → 403
GET /api/assets/file/../..\sensitive.txt → 403

// Mixed encoding
GET /api/assets/file/%2e./../.env → 403

// Null bytes
GET /api/assets/file/safe%00.exe → 403

// Symbolic links
GET /api/assets/file/symlink-to-secret → 403

// Valid requests
GET /api/assets/file/hero-image.png → 200
GET /api/assets/file/blog/thumbnail.jpg → 200
```

---

## Command Injection Prevention

### AI Bridge Security

The `/api/ai/*` endpoints execute Google Antigravity CLI commands. Malicious input could lead to command injection.

### Prevention Mechanisms

**1. Input Sanitization**
- All user content validated before passing to CLI
- Special characters escaped
- Subprocess environment sandboxed

**2. No Shell Evaluation**
- Direct subprocess execution (not shell)
- No `eval()` or `shell=True`
- Fixed command structure

**3. Execution Timeout**
- 30-second timeout for AI operations
- Prevents infinite loops or hangs
- Graceful cleanup on timeout

**4. Safe Subprocess Pattern**
```javascript
import { spawn } from 'child_process';

// SAFE: Direct execution, no shell
const proc = spawn('antigravity', ['code', 'enhance', '--input', content]);

// UNSAFE: Shell evaluation (NEVER USE)
const proc = exec(`antigravity code enhance "${content}"`);
```

### Input Validation Rules

**Content Field:**
- Max 1MB per request
- UTF-8 validation
- No null bytes
- No shell metacharacters

**Instruction Field:**
- Max 500 characters
- Natural language only
- No shell commands
- No file paths

**File Path Field (optional):**
- Relative paths only
- No parent directory traversal
- No absolute paths
- Max 255 characters

---

## Database Security

### Foreign Key Enforcement

```javascript
// Enabled on connection
db.pragma('foreign_keys = ON');

// Verify status
const fkStatus = db.pragma('foreign_keys', { simple: true });
if (fkStatus !== 1) {
  throw new Error('Foreign keys enforcement failed');
}
```

**Benefits:**
- Prevents orphaned records
- Maintains referential integrity
- Cascading deletes/updates
- Data consistency guaranteed

### Prepared Statements

**SAFE: Parameterized Queries**
```javascript
// ✅ SAFE - Parameters are bound safely
const stmt = db.prepare('SELECT * FROM campaigns WHERE id = ? AND status = ?');
const result = stmt.get(campaignId, status);
```

**UNSAFE: String Concatenation**
```javascript
// ❌ UNSAFE - SQL injection vulnerable
const query = `SELECT * FROM campaigns WHERE id = '${campaignId}'`;
```

### Database File Protection

**`.gitignore`:**
```
# Database (contains sensitive data)
server/db/marketing.db
*.db
*.sqlite
*.sqlite3
```

**File Permissions (Production):**
```bash
# Restrict to user only
chmod 600 /var/data/marketing.db

# Verify permissions
ls -l /var/data/marketing.db
# -rw------- 1 appuser appgroup
```

**Backup Strategy:**
```bash
# Daily encrypted backups
0 2 * * * pg_dump production | openssl enc -aes-256-cbc -salt -out /backups/db_$(date +\%Y\%m\%d).sql.enc
```

---

## Production Security Checklist

### Before Deployment

- [ ] API_KEY set to strong random value
- [ ] NODE_ENV=production in .env
- [ ] SKIP_AUTH removed from .env
- [ ] ALLOWED_ORIGINS set to production domain only
- [ ] No localhost addresses in ALLOWED_ORIGINS
- [ ] HTTP/2 or HTTPS configured at load balancer
- [ ] .env file excluded from git (.gitignore)
- [ ] Database file excluded from git
- [ ] All tests passing (npm test)
- [ ] Health check endpoint responding

### Runtime Security

- [ ] API key rotation scheduled
- [ ] Server logs monitored for 401 errors
- [ ] Database backups automated daily
- [ ] SQL injection tests passing
- [ ] Path traversal tests passing
- [ ] CORS origin list reviewed
- [ ] Rate limiting considered (future)
- [ ] WAF rules deployed (future)

### Monitoring & Alerts

**Log for:**
- 401 Unauthorized (failed auth)
- 403 Forbidden (security violations)
- 500 Server errors
- Unusual request patterns
- Database errors

**Alert Conditions:**
- More than 10 failed auth attempts per minute
- Path traversal attempts detected
- Database connection failures
- Server restart

---

## Incident Response

### Suspected API Key Compromise

**Immediate:**
1. Generate new API_KEY
2. Update .env on all servers
3. Restart application
4. Review access logs for unauthorized activity

**Follow-up:**
1. Audit database changes in past 24 hours
2. Check file access logs for unusual requests
3. Notify users if data accessed
4. Document incident

### Database Breach

**Immediate:**
1. Take database offline
2. Notify security team
3. Enable audit logging
4. Preserve evidence

**Investigation:**
1. Review SQL query logs
2. Check for unauthorized access patterns
3. Verify all prepared statements used
4. Test injection vulnerabilities

### Path Traversal Attack

**Detection:**
- 403 Forbidden responses in logs
- Requests with `../` or `..%2F`
- Windows backslash characters

**Response:**
1. Review affected asset access logs
2. Verify no unauthorized files accessed
3. Confirm path traversal defense active
4. Deploy WAF rules if available

---

## Security Testing

### Automated Tests

Run security test suite:
```bash
npm test -- --grep "security|auth"
```

**Test Coverage:**
- API key validation
- Path traversal prevention (6 layers)
- CORS origin validation
- Invalid status codes

### Manual Testing

**Test API Key:**
```bash
# Should fail
curl http://localhost:3457/api/campaigns

# Should succeed
curl -H "X-API-Key: test-key" http://localhost:3457/api/campaigns
```

**Test Path Traversal:**
```bash
# All should return 403
curl -H "X-API-Key: test-key" http://localhost:3457/api/assets/file/../../../../.env
curl -H "X-API-Key: test-key" http://localhost:3457/api/assets/file/..%2F..%2F.env
curl -H "X-API-Key: test-key" http://localhost:3457/api/assets/file/..\..\sensitive.txt
```

**Test CORS:**
```bash
# Check CORS headers
curl -i http://localhost:3457/api/campaigns

# From disallowed origin (blocked by browser)
curl -H "Origin: http://hacker.com" http://localhost:3457/api/campaigns
```

---

## Security Headers (Recommended)

For production deployments, add at reverse proxy:

```nginx
# Nginx example
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
add_header X-Content-Type-Options "nosniff";
add_header X-Frame-Options "DENY";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
```

---

## Compliance Considerations

### GDPR

- Database file protected with file permissions
- Backup encryption enabled
- Data access logged
- Incident response plan documented

### SOC 2

- Security controls documented (this file)
- Change management (git commits)
- Access control (API key authentication)
- Monitoring and logging
- Incident response procedures

---

## Resources

- [OWASP Path Traversal](https://owasp.org/www-community/attacks/Path_Traversal)
- [OWASP SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)
- [OWASP CORS](https://owasp.org/www-community/attacks/cors_and_xsid)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Hono Security](https://hono.dev/docs/guides/security)

---

## Questions & Support

For security concerns:
1. Create encrypted GitHub issue (contact maintainers privately)
2. Do NOT post vulnerabilities publicly
3. Allow 90 days for patch before disclosure
4. Follow responsible disclosure guidelines

**Contact:** [security@example.com](mailto:security@example.com)
