# MCP Troubleshooting Guide

Common issues and solutions for MCP server integrations.

## General Issues

### MCP Server Not Loading

**Symptoms:** Agent reports MCP not available, tool calls fail

**Solutions:**
1. Verify `.antigravity/.env` exists with correct API keys
2. Restart Google Antigravity after adding new keys
3. Check MCP server logs: `antigravity mcp status`
4. Ensure npx can download packages (network access)

### Environment Variables Not Found

**Symptoms:** "Missing API key" or "Unauthorized" errors

**Solutions:**
1. Confirm variable names match exactly (case-sensitive)
2. No quotes around values in `.env` file
3. No trailing spaces after values
4. Restart Google Antigravity after changes

### Rate Limit Errors

**Symptoms:** "429 Too Many Requests", throttling messages

**Solutions:**
1. Wait before retrying (exponential backoff)
2. Batch requests where possible
3. Cache frequently accessed data
4. Check service-specific rate limits in setup guide

## Google Services

### OAuth Token Expired

**Symptoms:** "401 Unauthorized", "Token expired"

**Solutions:**
1. Refresh token using OAuth playground
2. If refresh token invalid, re-authorize application
3. Check token hasn't been revoked in Google Account

**Refresh Process:**
```bash
# Using Google OAuth Playground
1. Visit https://developers.google.com/oauthplayground
2. Select API scopes needed
3. Exchange authorization code
4. Copy new access token
5. Update .env file
```

### GA4 Property Not Found

**Symptoms:** "Property not found", empty results

**Solutions:**
1. Verify property ID format (numbers only)
2. Ensure OAuth account has access to property
3. Check property is GA4, not Universal Analytics
4. Verify data exists for requested date range

### Google Ads Customer ID Issues

**Symptoms:** "Invalid customer ID", access denied

**Solutions:**
1. Format: `123-456-7890` (with dashes) or `1234567890`
2. Ensure developer token approved for production
3. Verify account linked to MCC if using manager account
4. Check test account vs production account

### Search Console Access Denied

**Symptoms:** "403 Forbidden", property not visible

**Solutions:**
1. Verify site is verified in Search Console
2. OAuth account must have property access
3. Check full URL format (https://example.com/)
4. Wait 24-48 hours for new properties

## Discord

### Bot Token Invalid

**Symptoms:** "Invalid token", connection refused

**Solutions:**
1. Regenerate token in Developer Portal
2. Don't include "Bot " prefix in token
3. Check bot hasn't been deleted
4. Verify token is for correct application

### Missing Intents

**Symptoms:** Events not received, members list empty

**Solutions:**
1. Enable required intents in Developer Portal:
   - Presence Intent (optional)
   - Server Members Intent (if querying members)
   - Message Content Intent (for reading messages)
2. Restart bot after enabling intents

### Bot Not In Server

**Symptoms:** "Unknown Guild", can't access channels

**Solutions:**
1. Generate invite link with correct permissions
2. Invite bot to target server
3. Verify bot role has channel access
4. Check channel-specific permission overrides

## Slack

### Token Scope Insufficient

**Symptoms:** "missing_scope" error

**Solutions:**
1. Add required scopes in app settings
2. Reinstall app to workspace
3. Copy new token after reinstall
4. Common scopes needed:
   - `channels:read`
   - `channels:history`
   - `chat:write`

### User Token vs Bot Token

**Symptoms:** Some operations fail, others work

**Solutions:**
1. Use User OAuth Token for most operations
2. Bot tokens have limited channel access
3. Check token prefix:
   - `xoxb-` = Bot token
   - `xoxp-` = User token

### Workspace Access Issues

**Symptoms:** Can't access some channels

**Solutions:**
1. Add app to private channels manually
2. Check if user/bot is member of channel
3. Verify workspace permissions
4. Enterprise Grid: check org-level settings

## SendGrid

### API Key Permissions

**Symptoms:** "403 Forbidden" for specific operations

**Solutions:**
1. Create new key with required permissions
2. Full Access key for testing
3. Minimum scopes for production:
   - Mail Send
   - Marketing Campaigns (if needed)

### Sender Not Verified

**Symptoms:** "sender identity not found"

**Solutions:**
1. Verify sender email in SendGrid dashboard
2. Complete domain authentication
3. Use verified sender for all emails

### Email Not Delivered

**Symptoms:** No errors but email not received

**Solutions:**
1. Check SendGrid Activity Feed
2. Verify recipient not on suppression list
3. Check spam folder
4. Review bounce/block reasons

## Resend

### Domain Not Verified

**Symptoms:** Emails rejected, domain error

**Solutions:**
1. Add DNS records to domain
2. Wait for DNS propagation (up to 48 hours)
3. Verify in Resend dashboard

### API Key Invalid

**Symptoms:** "Invalid API key"

**Solutions:**
1. Generate new key in dashboard
2. Key format: `re_xxxxxx`
3. Check for copy/paste errors

## Debugging Tips

### Check MCP Status

```bash
# In terminal
antigravity mcp list
antigravity mcp logs [server-name]
```

### Test Individual MCP

```bash
# In Google Antigravity session
/use-mcp "test google-analytics connection"
/use-mcp "list discord servers"
```

### Verbose Logging

```bash
# Enable debug mode
DEBUG=mcp:* antigravity
```

### Common Error Patterns

| Error | Likely Cause | Solution |
|-------|--------------|----------|
| `ENOTFOUND` | Network issue | Check internet connection |
| `401 Unauthorized` | Invalid/expired token | Refresh credentials |
| `403 Forbidden` | Insufficient permissions | Check scopes/roles |
| `429 Too Many Requests` | Rate limited | Wait and retry |
| `500 Internal Error` | Service issue | Retry later |

## Getting Help

1. Check service-specific documentation
2. Review MCP server GitHub issues
3. Test with minimal configuration first
4. Report issues with:
   - Error message
   - MCP server name
   - Steps to reproduce

## Related Documentation

- [MCP Setup Guide](./mcp-setup-guide.md)
- [Agent Catalog](./agent-catalog.md)
- [Command Reference](./command-catalog.md)
