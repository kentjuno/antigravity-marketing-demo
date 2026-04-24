# Marketing Dashboard - Setup & Deployment Guide

**Last Updated:** 2025-12-23
**Phase:** 2 (API Layer)
**Status:** Production-ready with security hardening

---

## Quick Start (5 minutes)

### Prerequisites

- Node.js 16+ (LTS recommended)
- npm 8+
- Git
- Google Antigravity CLI installed (for AI endpoints)

### Local Development Setup

**1. Navigate to server directory:**
```bash
cd .antigravity/skills/marketing-dashboard/server
```

**2. Install dependencies:**
```bash
npm install
```

**3. Create `.env` file:**
```bash
cp .env.example .env
```

**4. Edit `.env` for development:**
```bash
# .env
PORT=3457
NODE_ENV=development
SKIP_AUTH=true
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

**5. Start development server:**
```bash
npm run dev
```

**Output:**
```
🚀 Marketing Dashboard API
   Server: http://localhost:3457
   Health: http://localhost:3457/health
   Environment: development
   CORS: http://localhost:5173

   Endpoints:
   • /api/campaigns - Campaign CRUD
   • /api/content   - Content CRUD
   • /api/assets    - Assets + Scanner
   • /api/ai        - AI Enhancement
```

**6. Verify health:**
```bash
curl http://localhost:3457/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2025-12-23T18:04:00.000Z",
  "environment": "development"
}
```

---

## Full Setup Guide

### 1. Environment Configuration

#### Development Environment

Create `.env`:
```bash
# Server
PORT=3457
NODE_ENV=development

# Authentication (development bypass only!)
SKIP_AUTH=true
API_KEY=dev-key-do-not-use-in-production

# CORS Origins
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Optional: Custom database path
DATABASE_PATH=./db/marketing.db
```

#### Staging Environment

Create `.env.staging`:
```bash
# Server
PORT=3457
NODE_ENV=production

# Authentication (required)
API_KEY=$(openssl rand -hex 32)

# CORS Origins (staging domain)
ALLOWED_ORIGINS=https://staging-dashboard.example.com

# Database
DATABASE_PATH=/var/data/marketing.db
```

#### Production Environment

Create `.env.production`:
```bash
# Server
PORT=3457
NODE_ENV=production

# Authentication (REQUIRED - strong random key)
API_KEY=$(openssl rand -hex 32)

# CORS Origins (production domain only)
ALLOWED_ORIGINS=https://dashboard.example.com

# Database (secure location)
DATABASE_PATH=/var/data/marketing.db

# Logging
LOG_LEVEL=info
```

### 2. Installation Steps

**Step 1: Clone repository**
```bash
git clone https://github.com/your-org/antigravitykit-marketing.git
cd antigravitykit-marketing
```

**Step 2: Navigate to server**
```bash
cd .antigravity/skills/marketing-dashboard/server
```

**Step 3: Install Node dependencies**
```bash
npm install
```

**Expected output:**
```
npm notice created a lockfile as package-lock.json
npm notice
added 87 packages
```

**Step 4: Verify installation**
```bash
npm run test -- --version
```

### 3. Database Initialization

The database is automatically initialized on first server startup:

**Tables created:**
- `campaigns` - Campaign management
- `content` - Content items
- `assets` - Asset metadata
- `automations` - Automation configurations

**Verify database:**
```bash
# Check if database file exists
ls -lh ./db/marketing.db

# View database info (optional - install sqlite3 CLI)
sqlite3 ./db/marketing.db ".tables"
```

**Schema verification:**
```bash
npm test -- --grep "database schema"
```

### 4. Running the Server

#### Development Mode

**Watch file changes:**
```bash
npm run dev
```

**Manual start:**
```bash
node index.js
```

#### Production Mode

**Start with process manager:**
```bash
# Using PM2
pm2 start index.js --name "marketing-dashboard" --env production

# Check status
pm2 status
```

**Using Docker (optional):**
```bash
docker build -t marketing-dashboard .
docker run -p 3457:3457 \
  -e NODE_ENV=production \
  -e API_KEY=your-secret-key \
  -v /var/data/marketing.db:/app/db/marketing.db \
  marketing-dashboard
```

**Using systemd service:**

Create `/etc/systemd/system/marketing-dashboard.service`:
```ini
[Unit]
Description=Marketing Dashboard API
After=network.target

[Service]
Type=simple
User=dashboard
WorkingDirectory=/app/marketing-dashboard/server
ExecStart=/usr/bin/node index.js
Restart=on-failure
RestartSec=10

Environment="NODE_ENV=production"
Environment="API_KEY=your-secret-key"
Environment="PORT=3457"

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable marketing-dashboard
sudo systemctl start marketing-dashboard
sudo systemctl status marketing-dashboard
```

---

## Configuration Reference

### Environment Variables

| Variable | Default | Required | Notes |
|----------|---------|----------|-------|
| `PORT` | 3457 | No | Server listening port |
| `NODE_ENV` | development | No | development\|production |
| `API_KEY` | undefined | Yes (prod) | Secret API key for requests |
| `SKIP_AUTH` | false | No | Bypass auth in dev only |
| `ALLOWED_ORIGINS` | localhost:5173 | No | CORS origins (comma-separated) |
| `DATABASE_PATH` | ./db/marketing.db | No | Database file location |
| `LOG_LEVEL` | info | No | debug\|info\|warn\|error |

### Port Configuration

**Default: 3457**

Change if needed:
```bash
PORT=8080 npm run dev
```

Verify port available:
```bash
# macOS/Linux
lsof -i :3457

# Windows
netstat -ano | findstr :3457
```

### CORS Origins

**Development:**
```bash
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

**Production:**
```bash
ALLOWED_ORIGINS=https://dashboard.example.com,https://app.example.com
```

**Multiple origins (exact domain matching):**
```bash
ALLOWED_ORIGINS=https://main.example.com,https://partner.example.com,https://staging.example.com
```

---

## Testing

### Run All Tests

```bash
npm test
```

**Output:**
```
PASS  __tests__/campaigns.test.js (23 tests)
PASS  __tests__/content.test.js (29 tests)
PASS  __tests__/assets.test.js (24 tests)
PASS  __tests__/ai.test.js (35 tests)
PASS  __tests__/security-file-serving.test.js (21 tests)

Test Files  5 passed (5)
Tests      132 passed (132)
Duration   3.2s
```

### Watch Mode

```bash
npm run test:watch
```

Reruns tests on file changes.

### Test UI Dashboard

```bash
npm run test:ui
```

Opens browser UI at `http://localhost:51204/__vitest__/`

### Coverage Report

```bash
npm test -- --coverage
```

### Run Specific Tests

```bash
# Test authentication
npm test -- --grep "auth"

# Test path traversal security
npm test -- --grep "security|traversal"

# Test campaigns API
npm test -- --grep "campaigns"
```

---

## Development Workflow

### 1. Make changes to routes

Edit `/routes/campaigns.js`, `/routes/content.js`, etc.

### 2. Run watch mode

```bash
npm run dev
```

Server restarts on changes.

### 3. Test changes

```bash
npm run test:watch
```

Tests rerun automatically.

### 4. Verify with requests

```bash
# List campaigns
curl -H "X-API-Key: test" http://localhost:3457/api/campaigns

# Create campaign
curl -X POST http://localhost:3457/api/campaigns \
  -H "X-API-Key: test" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Campaign"}'
```

### 5. Commit changes

```bash
git add .
git commit -m "feat(api): add campaign filtering"
```

---

## Deployment

### Pre-deployment Checklist

- [ ] All tests passing: `npm test`
- [ ] No console errors in production mode
- [ ] `.env.production` configured
- [ ] API_KEY set to secure random value
- [ ] ALLOWED_ORIGINS updated for production domain
- [ ] NODE_ENV=production
- [ ] Database backup strategy in place
- [ ] Monitoring/alerting configured
- [ ] Health check endpoint tested

### Deployment Steps

**1. Build and test:**
```bash
npm test
npm run build  # if applicable
```

**2. Deploy application:**
```bash
# Option A: Manual deployment
scp -r ./* deploy@server:/app/marketing-dashboard

# Option B: Git-based deployment
git push production main
```

**3. Configure environment:**
```bash
ssh deploy@server
cd /app/marketing-dashboard/server
cp /etc/config/marketing-dashboard/.env .env
```

**4. Install dependencies:**
```bash
npm install --production
```

**5. Start service:**
```bash
pm2 start index.js --name "marketing-dashboard" --env production
pm2 save
```

**6. Verify deployment:**
```bash
curl https://api.dashboard.example.com/health
```

### Rolling Deployment

For zero-downtime updates:

```bash
# Terminal 1: New instance
NODE_ENV=production npm start

# Wait for health check to pass
curl http://localhost:3457/health

# Terminal 2: Redirect traffic
nginx -s reload  # Or reconfigure load balancer

# Terminal 1: Stop old instance
pm2 stop old-instance-id
```

---

## Monitoring & Logs

### Application Logs

View server logs:
```bash
# Development
npm run dev 2>&1 | tee server.log

# Production (systemd)
sudo journalctl -u marketing-dashboard -f

# Production (PM2)
pm2 logs marketing-dashboard
```

### Health Monitoring

**Health endpoint:**
```bash
curl http://localhost:3457/health
```

**Monitor with curl loop:**
```bash
watch -n 5 'curl -s http://localhost:3457/health | jq .'
```

**Monitor with health check service:**
```bash
# Using external service
curl -X POST https://healthchecks.io/ping/your-check-id
```

### Database Monitoring

Check database size:
```bash
du -h ./db/marketing.db
```

Monitor database performance:
```bash
sqlite3 ./db/marketing.db
sqlite> .schema
sqlite> SELECT COUNT(*) FROM campaigns;
```

### Error Monitoring

Monitor 401 errors:
```bash
# From logs
grep "401" server.log | wc -l

# Real-time
tail -f server.log | grep "Unauthorized"
```

---

## Troubleshooting

### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::3457`

**Solution:**
```bash
# Find process using port
lsof -i :3457

# Kill process
kill -9 <PID>

# Or use different port
PORT=3458 npm run dev
```

### API Key Not Set

**Error:** `Server misconfigured: API_KEY not set in environment`

**Solution:**
```bash
# Check .env file exists
ls -la .env

# Ensure API_KEY is set
grep API_KEY .env

# If missing, add to .env
echo "API_KEY=your-key-here" >> .env
```

### CORS Errors

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
```bash
# Verify frontend origin in ALLOWED_ORIGINS
grep ALLOWED_ORIGINS .env

# Should include frontend URL
ALLOWED_ORIGINS=http://localhost:5173

# Restart server after changes
npm run dev
```

### Database Lock

**Error:** `Error: database is locked`

**Solution:**
```bash
# Check for multiple server instances
ps aux | grep "node index.js"

# Kill duplicate processes
killall node

# Restart single instance
npm run dev
```

### Tests Failing

**Error:** `FAIL __tests__/campaigns.test.js`

**Solution:**
```bash
# Run tests with verbose output
npm test -- --reporter=verbose

# Run single test file
npm test -- __tests__/campaigns.test.js

# Check database state
sqlite3 ./db/marketing.db "SELECT COUNT(*) FROM campaigns;"
```

### Memory Issues

**Error:** `JavaScript heap out of memory`

**Solution:**
```bash
# Increase Node memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run dev

# Or in .env
export NODE_OPTIONS="--max-old-space-size=4096"
```

---

## Security Hardening

### SSL/TLS Configuration

**Nginx reverse proxy example:**
```nginx
upstream dashboard {
    server localhost:3457;
}

server {
    listen 443 ssl http2;
    server_name dashboard.example.com;

    ssl_certificate /etc/letsencrypt/live/dashboard.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dashboard.example.com/privkey.pem;

    location / {
        proxy_pass http://dashboard;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name dashboard.example.com;
    return 301 https://$server_name$request_uri;
}
```

### Rate Limiting

**Future feature - Nginx rate limit example:**
```nginx
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

location /api/ {
    limit_req zone=api_limit burst=20;
    proxy_pass http://dashboard;
}
```

### Firewall Rules

**UFW (Ubuntu):**
```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw deny 3457/tcp   # Block direct access to API
sudo ufw enable
```

---

## Backup & Recovery

### Automated Backups

**Create backup script:**

```bash
#!/bin/bash
# /usr/local/bin/backup-marketing-db.sh

BACKUP_DIR=/var/backups/marketing-dashboard
RETENTION_DAYS=30

mkdir -p $BACKUP_DIR

# Create backup
sqlite3 /var/data/marketing.db ".dump" | \
  gzip > "$BACKUP_DIR/marketing-$(date +%Y%m%d-%H%M%S).sql.gz"

# Delete old backups
find $BACKUP_DIR -mtime +$RETENTION_DAYS -delete

echo "Backup completed: $(ls -lh $BACKUP_DIR | tail -1)"
```

**Schedule with cron:**
```bash
# Run daily at 2 AM
0 2 * * * /usr/local/bin/backup-marketing-db.sh
```

### Database Recovery

**Restore from backup:**
```bash
# Stop server
pm2 stop marketing-dashboard

# Restore database
gunzip < /var/backups/marketing-dashboard/marketing-20251223-020000.sql.gz | sqlite3 /var/data/marketing.db

# Verify
sqlite3 /var/data/marketing.db "SELECT COUNT(*) FROM campaigns;"

# Restart server
pm2 start marketing-dashboard
```

---

## Performance Tuning

### Database Optimization

```sql
-- Check for missing indexes
PRAGMA index_list(campaigns);

-- Create index for faster queries
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_content_campaign_id ON content(campaign_id);
CREATE INDEX idx_content_type ON content(type);
```

### Server Optimization

```bash
# Enable compression in Hono (future enhancement)
# Reduce response payload size
# Implement caching headers
# Use CDN for static assets
```

### Connection Pooling

Future enhancement for high-traffic scenarios.

---

## Version Management

### Versioning Strategy

- **Major:** Breaking API changes
- **Minor:** New features (backward compatible)
- **Patch:** Bug fixes

Current version: `1.0.0` (Phase 2)

### Upgrade Path

```bash
# Check for updates
npm outdated

# Install updates
npm update

# Security audit
npm audit fix
```

---

## Support & Troubleshooting

### Getting Help

1. **Check logs:** `npm run dev 2>&1`
2. **Run tests:** `npm test`
3. **Check health:** `curl http://localhost:3457/health`
4. **Review docs:** See `/docs/marketing-dashboard-api.md`

### Reporting Issues

File issues on GitHub with:
- Error message and logs
- Steps to reproduce
- Environment details (Node version, OS, etc.)
- Expected vs. actual behavior

---

## Next Steps

1. Connect Vue.js frontend: Point dashboard to `http://localhost:3457`
2. Configure SSL/TLS for production
3. Set up monitoring (Datadog, New Relic, etc.)
4. Schedule automated backups
5. Plan Phase 3: Advanced features
