## Structure

`assets/`
- `articles/`: long form content (blog articles, technical blog, etc.)
- `posts/`: social posts
- `banners/`: for emails, landing pages, ads, social media, etc.
- `designs/`: for campaigns, print, web, etc.
- `infographics/`: visual flows or charts
- `storyboards/`: scripts & storyboards for videos
- `videos/`: generated videos
- `writing-styles/`: so AI can copy writing styles
- `logos/`: brand logos
- `css/`: shared CSS (slide-animations.css)
- `design-tokens.json` + `design-tokens.css`: design system tokens

## TODO

### Skills

- [x] `design-system`
  - [x] `search-slides.py` - slide strategy/layout search
  - [x] `fetch-background.py` - Pexels background images
  - [x] `generate-tokens.cjs` - token generation
  - [x] `slide-token-validator.py` - token compliance
- [x] `brand-guidelines`
  - [x] `inject-brand-context.cjs` - brand context injection
  - [x] `sync-brand-to-tokens.cjs` - brand → tokens sync
  - [x] `extract-colors.cjs` - color extraction helper
  - [x] `validate-asset.cjs` - asset validation
- [x] `copywriting` (references only, no automation scripts)
- [x] `content-marketing`
  - [x] `compose-blog-post`
  - [x] `content-audit`
  - [x] `content-strategy-framework`
  - [x] `editorial-calendar-template`
- [x] `email-marketing`
  - [x] `automation-flows`
  - [x] `deliverability-checklist`
  - [x] `email-templates`
  - [x] `subject-line-formulas`
- [x] `social-media`
- [x] `ai-multimodal` (Gemini Imagen 4)
- [x] `youtube-handling` (VidCap API)
- [x] `storage` (S3-compatible: R2, AWS, MinIO, etc.)

### Mini App (Dashboard)

- [x] Browse `assets/` directory
- [x] Generate/edit images using `ai-multimodal` skill
- [x] Brand Center (colors, typography, logos, voice)
- [x] Asset management with SQLite

### Commands

- [x] `/dashboard` - Open mini app
- [x] `/dashboard:check` - Verify server status
- [x] **Design**
  - [x] `/design:generate` - Imagen 4 with brand context
  - [x] `/design:good` - Full design workflow
  - [x] `/slides:create` - Interactive HTML/JS/CSS slides
  - [x] `/design:screenshot` - Capture screenshots
  - [x] `/design:3d` - 3D visualizations
  - [x] `/youtube:infographic` - YouTube → infographic
- [x] **Content** (actual commands use `/write:*`)
  - [x] `/write:blog` - SEO-optimized article
  - [x] `/write:cro` - CRO optimization
  - [x] `/write:enhance` - Content enhancement
  - [x] `/write:audit` - Content quality audit
  - [x] `/write:publish` - Finalize content
  - [x] `/youtube:blog` - YouTube → blog post
- [x] **Social**
  - [x] `/social` - Platform-specific content
  - [x] `/social:schedule` - Schedule planning (docs only, no API)
  - [x] `/youtube:social` - YouTube → social posts
  - [x] Hook writing (references/hook-writing.md)
  - [x] Writing styles (assets/writing-styles/)
  - [x] Story/Reel images (9:16)
- [x] **Copy**
  - [x] `/copy:formula` - AIDA, PAS, BAB formulas
- [x] **Email**
  - [x] `/email:sequence` - Email sequences
- [x] **Storage**
  - [x] `/storage:upload` - Upload single asset
  - [x] `/storage:sync` - Sync folder to bucket
  - [x] `/storage:list` - List remote objects
  - [x] `/storage:url` - Get public URL

### Not Implemented (Future)

- [ ] **Social API Posting**
  - [ ] X (Twitter) API
  - [ ] Facebook Page API
  - [ ] Threads API
  - [ ] Instagram API
  - [ ] YouTube API
  - [ ] TikTok API
- [ ] **Storage Integrations**
  - [ ] Google Drive
  - [x] S3-Compatible (Cloudflare R2, AWS S3, MinIO, Backblaze B2, DigitalOcean Spaces)
- [ ] **External APIs**
  - [ ] Replicate (qwen-image-layered)
  - [ ] Email providers (Mailchimp, SendGrid, Resend)
  - [ ] SEO tools (Ahrefs, SEMrush)
  - [ ] Analytics (GA4, Mixpanel)
