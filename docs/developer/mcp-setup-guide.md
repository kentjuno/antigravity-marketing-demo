# MCP Setup Guide

Model Context Protocol (MCP) servers enable Google Antigravity to interact with external services for analytics, email, and communication.

## Quick Start

1. Copy environment template: `cp .antigravity/.env.example .antigravity/.env`
2. Add your API keys to `.antigravity/.env`
3. Restart Google Antigravity to load MCP servers

## MCP Server Tiers

| Tier | Service | Purpose | Priority |
|------|---------|---------|----------|
| 1 | ReviewWebsite | SEO & content intelligence | High |
| 1 | Google Analytics | Traffic & conversion data | High |
| 1 | Google Ads | Ad campaign metrics | Medium |
| 1 | Search Console | Search performance | Medium |
| 2 | Discord | Community management | Medium |
| 2 | Slack | Team communication | Medium |
| 3 | SendGrid | Email campaigns | High |
| 3 | Resend | Transactional email | Low |

## Tier 1: Analytics & SEO

### ReviewWebsite

Content scraping, SEO analysis, backlink data.

**Package:** `reviewwebsite-mcp`

**Get API Key:**
1. Visit https://reviewweb.site/pricing
2. Create account and select plan
3. Copy API key from dashboard

**Environment Variable:**
```bash
REVIEWWEB_API_KEY=your_api_key_here
```

**Capabilities:**
- URL-to-Markdown conversion
- Keyword research & difficulty scoring
- Domain traffic analysis
- Backlink data retrieval
- Competitor content analysis

### Google Analytics 4

Natural language queries for website analytics.

**Package:** `mcp-server-google-analytics`

**Get Access Token:**
1. Visit [Google Cloud Console](https://console.cloud.google.com)
2. Create project → Enable Analytics Data API
3. Create OAuth 2.0 credentials
4. Generate access token using OAuth playground

**Environment Variable:**
```bash
GA_ACCESS_TOKEN=your_access_token_here
```

**Capabilities:**
- Traffic reports
- Conversion tracking
- Custom event queries
- Audience insights

### Google Ads

Campaign performance and keyword analysis.

**Get Credentials:**
1. Apply for [Google Ads API access](https://developers.google.com/google-ads/api/docs/first-call/oauth-cloud-project)
2. Create OAuth client in Cloud Console
3. Generate refresh token

**Environment Variables:**
```bash
GOOGLE_ADS_DEVELOPER_TOKEN=your_dev_token
GOOGLE_ADS_CLIENT_ID=your_client_id
GOOGLE_ADS_CLIENT_SECRET=your_client_secret
GOOGLE_ADS_REFRESH_TOKEN=your_refresh_token
GOOGLE_ADS_CUSTOMER_ID=123-456-7890
```

**Capabilities:**
- Campaign metrics
- Keyword performance
- Ad spend tracking
- ROI analysis

### Google Search Console

Search performance and indexing status.

**Get Access Token:**
1. Enable Search Console API in Cloud Console
2. Use same OAuth credentials as GA4
3. Generate access token

**Environment Variable:**
```bash
GSC_ACCESS_TOKEN=your_access_token_here
```

**Capabilities:**
- Search queries and clicks
- URL inspection
- Sitemap status
- Indexing coverage

## Tier 2: Communication

### Discord

Community management and messaging.

**Get Bot Token:**
1. Visit [Discord Developer Portal](https://discord.com/developers/applications)
2. Create New Application → Bot
3. Reset and copy bot token
4. Enable required intents (Message Content, Server Members)
5. Invite bot to server with appropriate permissions

**Environment Variable:**
```bash
DISCORD_BOT_TOKEN=your_bot_token_here
```

**Capabilities:**
- Read/send messages
- Channel management
- Member queries
- Reaction handling

**Required Bot Permissions:**
- Read Messages/View Channels
- Send Messages
- Manage Messages (optional)
- Read Message History

### Slack

Team communication and channel management.

**Package:** `slack-mcp-server`

**Get User Token:**
1. Visit [Slack API Apps](https://api.slack.com/apps)
2. Create New App → From scratch
3. OAuth & Permissions → Add scopes
4. Install to workspace
5. Copy User OAuth Token

**Environment Variable:**
```bash
SLACK_USER_TOKEN=xoxp-your-token-here
```

**Required Scopes:**
- `channels:read`
- `channels:history`
- `chat:write`
- `users:read`
- `files:read` (optional)

**Capabilities:**
- Read/post messages
- Channel operations
- User lookups
- File sharing

## Tier 3: Email

### SendGrid

Email campaigns and transactional emails.

**Get API Key:**
1. Visit [SendGrid Dashboard](https://app.sendgrid.com)
2. Settings → API Keys → Create API Key
3. Select "Full Access" or customize permissions
4. Copy and save key (shown once)

**Environment Variable:**
```bash
SENDGRID_API_KEY=SG.your_api_key_here
```

**Required Permissions:**
- Mail Send
- Marketing Campaigns (for campaigns)
- Contacts (for list management)

**Capabilities:**
- Send emails
- Campaign management
- Contact lists
- Template management
- Email statistics

### Resend

Modern transactional email alternative.

**Get API Key:**
1. Visit [Resend Dashboard](https://resend.com)
2. API Keys → Create API Key
3. Copy key

**Environment Variable:**
```bash
RESEND_API_KEY=re_your_api_key_here
```

**Capabilities:**
- Transactional emails
- Marketing emails
- Domain management

## Agent-MCP Mapping

| Agent | MCP Servers |
|-------|-------------|
| analytics-analyst | google-analytics, google-search-console |
| seo-specialist | reviewwebsite, google-search-console |
| attraction-specialist | reviewwebsite, google-ads |
| campaign-manager | google-ads, google-analytics, sendgrid |
| email-wizard | sendgrid, resend |
| community-manager | discord, slack |
| social-media-manager | discord |
| funnel-architect | google-analytics |

## Security Best Practices

1. **Never commit credentials** - `.env` is gitignored
2. **Use minimal scopes** - Request only needed permissions
3. **Rotate tokens quarterly** - Update OAuth tokens regularly
4. **Audit access** - Review connected apps periodically
5. **Read-only first** - Start with read permissions, add write later

## Rate Limits

| Service | Limit | Notes |
|---------|-------|-------|
| GA4 | 10,000 requests/day | Per property |
| Google Ads | 15,000 requests/day | Per developer token |
| Search Console | 1,200 requests/min | Per property |
| Discord | 50 requests/second | Per bot |
| Slack | 1+ requests/second | Tier 2+ recommended |
| SendGrid | 100 emails/day (free) | Higher with paid plan |

## Testing MCP Connections

After configuration, test each MCP with simple queries:

```bash
# In Google Antigravity
/use-mcp "list GA4 properties"
/use-mcp "get Discord server info"
/use-mcp "check SendGrid sender verification"
```

## Next Steps

- [MCP Troubleshooting Guide](./mcp-troubleshooting.md)
- [Agent Catalog](./agent-catalog.md)
- [Command Reference](./command-catalog.md)
