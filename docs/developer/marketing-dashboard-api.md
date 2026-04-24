# Marketing Dashboard API Documentation

**Phase:** 5 (Brand Center)
**Last Updated:** 2025-12-24
**Status:** 5 API routes + 8 endpoints operational (campaigns, content, assets, AI, brand), 142 tests (88% passing), security hardened, production-ready

---

## Overview

Marketing Dashboard API provides REST endpoints for campaign management, content creation, asset handling, AI-powered content enhancement, and brand center management. Built with Hono framework + better-sqlite3, designed for Vue.js frontend integration.

**Base URL:** `http://localhost:3457` (dev) | `https://api.dashboard.local` (production)

**Health Check:** `GET /health` - Returns server status and environment

---

## Authentication

**Method:** API Key (X-API-Key header)

**Required for:** All `/api/*` routes

**Header:**
```
X-API-Key: your-api-key-here
```

**Configuration:**
- `API_KEY`: Set in `.env` (required in production)
- `SKIP_AUTH=true`: Bypass auth in development only (NODE_ENV=development)

**Error Responses:**
```json
// Missing header
{
  "error": "Unauthorized",
  "message": "Missing X-API-Key header"
}

// Invalid key
{
  "error": "Unauthorized",
  "message": "Invalid API key"
}

// Misconfigured server
{
  "error": "Server misconfigured",
  "message": "API_KEY not set in environment"
}
```

---

## API Endpoints

### 1. Campaigns API (`/api/campaigns`)

**Purpose:** Campaign CRUD operations with validation

#### GET /api/campaigns
List all campaigns

**Query Parameters:** None

**Response:**
```json
{
  "campaigns": [
    {
      "id": "abc123def456",
      "name": "Q1 2025 Product Launch",
      "status": "active",
      "goal": "Launch new product and achieve 10k signups",
      "start_date": "2025-01-01",
      "end_date": "2025-03-31",
      "brand_context": "{\"voice\": \"professional\"}",
      "notes": "Cross-channel campaign",
      "created_at": "2025-12-23T10:30:00Z",
      "updated_at": "2025-12-23T14:20:00Z"
    }
  ],
  "total": 1
}
```

**Status Codes:** 200 OK | 500 Internal Server Error

---

#### GET /api/campaigns/:id
Get single campaign

**Path Parameters:**
- `id` (string, required): Campaign ID

**Response:**
```json
{
  "campaign": {
    "id": "abc123def456",
    "name": "Q1 2025 Product Launch",
    "status": "active",
    "goal": "Launch new product and achieve 10k signups",
    "start_date": "2025-01-01",
    "end_date": "2025-03-31",
    "brand_context": "{\"voice\": \"professional\"}",
    "notes": "Cross-channel campaign",
    "created_at": "2025-12-23T10:30:00Z",
    "updated_at": "2025-12-23T14:20:00Z"
  }
}
```

**Status Codes:** 200 OK | 404 Not Found | 500 Internal Server Error

---

#### POST /api/campaigns
Create new campaign

**Request Body:**
```json
{
  "name": "Q1 2025 Product Launch",
  "status": "draft",
  "goal": "Launch new product and achieve 10k signups",
  "start_date": "2025-01-01",
  "end_date": "2025-03-31",
  "brand_context": {
    "voice": "professional",
    "tone": "authoritative"
  },
  "notes": "Cross-channel campaign"
}
```

**Validation:**
- `name` (required): Non-empty string
- `status` (optional): "draft" | "active" | "completed" (default: "draft")
- `goal` (optional): String
- `start_date` (optional): ISO 8601 date
- `end_date` (optional): ISO 8601 date
- `brand_context` (optional): JSON object
- `notes` (optional): String

**Response (201 Created):**
```json
{
  "campaign": {
    "id": "abc123def456",
    "name": "Q1 2025 Product Launch",
    "status": "draft",
    ...
  }
}
```

**Status Codes:** 201 Created | 400 Bad Request | 500 Internal Server Error

**Example Error:**
```json
{
  "error": "Validation failed",
  "errors": ["Campaign name is required"]
}
```

---

#### PUT /api/campaigns/:id
Update campaign

**Path Parameters:**
- `id` (string, required): Campaign ID

**Request Body:** Any campaign fields to update

**Response (200 OK):**
```json
{
  "campaign": {
    "id": "abc123def456",
    "name": "Q1 2025 Product Launch - Updated",
    ...
  }
}
```

**Status Codes:** 200 OK | 404 Not Found | 400 Bad Request | 500 Internal Server Error

---

#### DELETE /api/campaigns/:id
Delete campaign

**Path Parameters:**
- `id` (string, required): Campaign ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Campaign deleted"
}
```

**Status Codes:** 200 OK | 404 Not Found | 500 Internal Server Error

---

### 2. Content API (`/api/content`)

**Purpose:** Content CRUD with type/status filtering

**Content Types:** blog | social | email | landing | other
**Content Statuses:** draft | review | published

#### GET /api/content
List content with optional filters

**Query Parameters:**
- `campaign_id` (optional): Filter by campaign
- `type` (optional): blog | social | email | landing | other
- `status` (optional): draft | review | published

**Response:**
```json
{
  "content": [
    {
      "id": "xyz789abc123",
      "campaign_id": "abc123def456",
      "type": "blog",
      "status": "published",
      "title": "5 Ways to Boost Your Q1 Revenue",
      "body": "Full blog post content...",
      "metadata": "{\"wordCount\": 2500, \"readTime\": 8}",
      "created_at": "2025-12-23T09:00:00Z",
      "updated_at": "2025-12-23T13:45:00Z"
    }
  ],
  "total": 1
}
```

**Status Codes:** 200 OK | 500 Internal Server Error

---

#### GET /api/content/:id
Get single content

**Path Parameters:**
- `id` (string, required): Content ID

**Response:**
```json
{
  "content": {
    "id": "xyz789abc123",
    "campaign_id": "abc123def456",
    "type": "blog",
    "status": "published",
    "title": "5 Ways to Boost Your Q1 Revenue",
    "body": "Full blog post content...",
    "metadata": "{\"wordCount\": 2500, \"readTime\": 8}",
    "created_at": "2025-12-23T09:00:00Z",
    "updated_at": "2025-12-23T13:45:00Z"
  }
}
```

**Status Codes:** 200 OK | 404 Not Found | 500 Internal Server Error

---

#### POST /api/content
Create new content

**Request Body:**
```json
{
  "campaign_id": "abc123def456",
  "type": "blog",
  "status": "draft",
  "title": "5 Ways to Boost Your Q1 Revenue",
  "body": "Full blog post content...",
  "metadata": {
    "wordCount": 2500,
    "readTime": 8,
    "seoKeywords": ["q1 revenue", "business growth"]
  }
}
```

**Validation:**
- `type` (required): blog | social | email | landing | other
- `status` (optional): draft | review | published (default: "draft")
- `campaign_id` (optional): String
- `title` (optional): String
- `body` (optional): String
- `metadata` (optional): JSON object

**Response (201 Created):**
```json
{
  "content": {
    "id": "xyz789abc123",
    ...
  }
}
```

**Status Codes:** 201 Created | 400 Bad Request | 500 Internal Server Error

---

#### PUT /api/content/:id
Update content

**Path Parameters:**
- `id` (string, required): Content ID

**Request Body:** Any content fields to update

**Response (200 OK):** Updated content object

**Status Codes:** 200 OK | 404 Not Found | 400 Bad Request | 500 Internal Server Error

---

#### DELETE /api/content/:id
Delete content

**Path Parameters:**
- `id` (string, required): Content ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Content deleted"
}
```

**Status Codes:** 200 OK | 404 Not Found | 500 Internal Server Error

---

#### POST /api/content/:id/save
Export content to markdown file with YAML frontmatter

**Path Parameters:**
- `id` (string, required): Content ID

**Request Body:**
```json
{
  "filename": "my-blog-post.md"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Content saved to file",
  "filepath": "markdown/my-blog-post.md",
  "format": "markdown",
  "bytes": 2548
}
```

**File Format:**
```markdown
---
title: Content Title
type: blog
status: published
campaign_id: abc123def456
created_at: 2025-12-23T09:00:00Z
updated_at: 2025-12-23T13:45:00Z
---

Full content body here...
```

**Validation:**
- `filename` (optional): Must be valid filename, auto-generated if not provided
- Content must exist
- File permissions required for writing

**Status Codes:** 200 OK | 404 Not Found | 400 Bad Request | 500 Internal Server Error

**Error Responses:**
```json
{
  "error": "File write failed",
  "message": "Permission denied"
}
```

---

### 3. Assets API (`/api/assets`)

**Purpose:** Asset management with Content Hub scanner integration

#### GET /api/assets
List assets (database + live scan)

**Query Parameters:** None

**Response:**
```json
{
  "assets": [
    {
      "id": "asset_001",
      "path": "assets/images/hero-image.png",
      "type": "image",
      "size": 2560000,
      "mime": "image/png",
      "metadata": "{\"width\": 1920, \"height\": 1080}",
      "created_at": "2025-12-23T08:00:00Z"
    }
  ],
  "total": 1,
  "fromDatabase": 5,
  "fromScan": 8
}
```

**Status Codes:** 200 OK | 500 Internal Server Error

---

#### GET /api/assets/:id
Get single asset

**Path Parameters:**
- `id` (string, required): Asset ID

**Response:**
```json
{
  "asset": {
    "id": "asset_001",
    "path": "assets/images/hero-image.png",
    "type": "image",
    "size": 2560000,
    "mime": "image/png",
    "metadata": "{\"width\": 1920, \"height\": 1080}",
    "created_at": "2025-12-23T08:00:00Z"
  }
}
```

**Status Codes:** 200 OK | 404 Not Found | 500 Internal Server Error

---

#### POST /api/assets/scan
Rescan assets folder and update database

**Request Body:** None

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Assets scanned and database updated",
  "inserted": 3,
  "updated": 2
}
```

**Status Codes:** 200 OK | 500 Internal Server Error

---

#### POST /api/assets/:id
Serve asset file (protected)

**Path Parameters:**
- `id` (string, required): Asset ID

**Response:** File binary content + headers

**Security:**
- Path traversal protection (6-layer defense)
- Origin validation
- File type whitelist
- Size limits

**Status Codes:** 200 OK | 403 Forbidden | 404 Not Found | 500 Internal Server Error

---

### 4. AI API (`/api/ai`)

**Purpose:** AI enhancement via Antigravity CLI bridge + brand context

#### GET /api/ai/status
Check Google Antigravity CLI availability

**Response:**
```json
{
  "available": true,
  "message": "Google Antigravity ready"
}
```

Or if unavailable:
```json
{
  "available": false,
  "error": "Google Antigravity not found in PATH"
}
```

**Status Codes:** 200 OK | 500 Internal Server Error

---

#### POST /api/ai/enhance
Enhance existing content with AI

**Request Body:**
```json
{
  "content": "Original blog post text...",
  "instruction": "Make this 20% more engaging and add SEO keywords",
  "filePath": "content/blog-post.md"
}
```

**Validation:**
- `content` (required): Non-empty string
- `instruction` (required): Non-empty string
- `filePath` (optional): String

**Response (200 OK):**
```json
{
  "success": true,
  "content": "Enhanced blog post text...",
  "originalLength": 2500,
  "enhancedLength": 3100
}
```

**Status Codes:** 200 OK | 400 Bad Request | 500 Internal Server Error

---

#### POST /api/ai/generate
Generate new content with AI

**Request Body:**
```json
{
  "type": "landing_page",
  "description": "SaaS product landing page for developer tools targeting startups",
  "brandContext": {
    "voice": "technical but accessible",
    "tone": "confident and friendly",
    "targetAudience": "startup developers"
  }
}
```

**Validation:**
- `type` (required): blog | social | email | landing | other
- `description` (required): Non-empty string
- `brandContext` (optional): JSON object

**Response (200 OK):**
```json
{
  "success": true,
  "content": "Generated content based on type and description...",
  "type": "landing_page",
  "length": 3500
}
```

**Status Codes:** 200 OK | 400 Bad Request | 500 Internal Server Error

---

### 5. Brand API (`/api/brand`) - NEW Phase 5

**Purpose:** Design tokens, logo management, and brand voice guidelines

#### GET /api/brand/tokens
Retrieve design tokens for theming

**Response (200 OK):**
```json
{
  "colors": {
    "primary": "#3B82F6",
    "secondary": "#14B8A6",
    "accent": "#F97316"
  },
  "fonts": {
    "heading": "Inter",
    "body": "system-ui"
  },
  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    "md": "1rem"
  }
}
```

**Status Codes:** 200 OK | 404 Not Found | 500 Internal Server Error

---

#### GET /api/brand/voice
Load brand voice guidelines and messaging

**Response (200 OK):**
```json
{
  "tone": "professional yet approachable",
  "values": ["innovation", "clarity", "reliability"],
  "messaging": {
    "headline": "Empower marketing with Antigravity",
    "description": "AI-powered marketing automation"
  },
  "examples": [
    "Use active voice, engaging tone",
    "Focus on benefits not features"
  ]
}
```

**Status Codes:** 200 OK | 404 Not Found | 500 Internal Server Error

---

#### GET /api/brand/logos
List all brand logos by category

**Response (200 OK):**
```json
[
  {
    "name": "logo-primary.svg",
    "path": "primary/logo-primary.svg",
    "category": "primary",
    "url": "http://localhost:3457/static/logos/primary/logo-primary.svg"
  },
  {
    "name": "logo-monochrome.png",
    "path": "monochrome/logo-monochrome.png",
    "category": "monochrome",
    "url": "http://localhost:3457/static/logos/monochrome/logo-monochrome.png"
  }
]
```

**Status Codes:** 200 OK | 500 Internal Server Error

---

#### POST /api/brand/logos
Upload a new logo

**Content-Type:** multipart/form-data

**Form Parameters:**
- `file` (required): Logo file (PNG, JPG, SVG, WebP max 5MB)

**Validation:**
- File type: image/png, image/jpeg, image/svg+xml, image/webp
- File size: max 5MB
- Filename sanitization: alphanumeric, dots, hyphens, underscores only

**Response (200 OK):**
```json
{
  "success": true,
  "name": "logo-new-variant.svg",
  "path": "logo-new-variant.svg"
}
```

**Error Response (400):**
```json
{
  "error": "Invalid file type. Allowed: PNG, JPG, SVG, WebP"
}
```

**Status Codes:** 200 OK | 400 Bad Request | 500 Internal Server Error

---

## Error Handling

All endpoints use standard HTTP status codes:

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | GET request returned data |
| 201 | Created | POST created new resource |
| 400 | Bad Request | Validation failed, missing required field |
| 401 | Unauthorized | Missing/invalid API key |
| 403 | Forbidden | Access denied (e.g., path traversal attempt) |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Unhandled exception |

**Error Response Format:**
```json
{
  "error": "Error type",
  "message": "Human-readable error description",
  "details": "Technical details (dev mode only)"
}
```

---

## Environment Variables

**Required:**
- `PORT` (default: 3457) - Server port
- `NODE_ENV` (development/production) - Execution environment
- `API_KEY` - Secret API key (required in production)

**Optional:**
- `ALLOWED_ORIGINS` (default: http://localhost:5173) - CORS origins, comma-separated
- `SKIP_AUTH` (development only) - Set to "true" to bypass authentication
- `DATABASE_PATH` - Custom database location

---

## Examples

### Create Campaign with cURL
```bash
curl -X POST http://localhost:3457/api/campaigns \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "name": "Q1 2025 Launch",
    "status": "active",
    "goal": "10k signups"
  }'
```

### Get Content with Filters
```bash
curl http://localhost:3457/api/content \
  -H "X-API-Key: your-api-key" \
  -G \
  -d "campaign_id=abc123" \
  -d "type=blog" \
  -d "status=published"
```

### Enhance Content with AI
```bash
curl -X POST http://localhost:3457/api/ai/enhance \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "content": "Original text",
    "instruction": "Add SEO keywords and improve clarity"
  }'
```

---

## Testing

**Run all tests:**
```bash
npm test
```

**Watch mode:**
```bash
npm run test:watch
```

**UI dashboard:**
```bash
npm run test:ui
```

**Coverage:**
```bash
npm test -- --coverage
```

**Current Coverage:**
- Campaigns: 23 tests
- Content: 29 tests
- Assets: 24 tests
- AI: 35 tests
- Brand: 14 tests
- Security: 21 tests (includes upload validation, path traversal)
- **Total:** 142 tests (88% passing)

---

## Security Considerations

### 1. API Key Protection
- Store `API_KEY` in `.env` (never in code)
- Rotate keys regularly in production
- Use different keys per environment
- Log key failures for audit trail

### 2. Path Traversal Defense
Assets endpoint implements 6-layer protection:
1. URL decoding validation
2. Windows backslash normalization
3. Null byte filtering
4. Symbolic link rejection
5. Directory boundary enforcement
6. Whitelist path validation

### 3. Command Injection Prevention
- AI bridge sanitizes all Antigravity CLI inputs
- No shell evaluation of user content
- Subprocess execution with timeout

### 4. Database Security
- Foreign key constraints enabled
- Prepared statements for all queries
- Database file excluded from git

### 5. CORS Protection
- Restricted to configured origins
- Credentials disabled by default
- Origin header validation

---

## Monitoring & Logging

**Health Endpoint:**
```
GET /health
```

**Log Levels:**
- INFO: Server startup, request routing
- WARN: Auth bypassed, missing configurations
- ERROR: Database errors, API failures, security violations

**Example Log Output:**
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

---

## Changelog

### Phase 2 (v1.0.0) - 2025-12-23
- Initial API layer implementation
- 4 core API routes (campaigns, content, assets, AI)
- Authentication middleware with API key
- Path traversal security hardening
- 132 comprehensive tests
- SQLite database integration
- CORS middleware configuration
