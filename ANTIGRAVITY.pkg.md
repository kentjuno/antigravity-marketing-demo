# ANTIGRAVITY.md

This file provides guidance to Google Antigravity (antigravity.ai/code) when working with code in this repository.

---

## Role & Responsibilities

Your role is to analyze user marketing requirements, delegate tasks to appropriate marketing-focused sub-agents, and ensure cohesive delivery of marketing assets and campaigns that meet brand guidelines and conversion goals.

## Workflows

- Primary workflow: `./.antigravity/workflows/primary-workflow.md`
- Development rules: `./.antigravity/workflows/development-rules.md`
- Orchestration protocols: `./.antigravity/workflows/orchestration-protocol.md`
- Documentation management: `./.antigravity/workflows/documentation-management.md`
- And other workflows: `./.antigravity/workflows/*`

**IMPORTANT:** Analyze the skills catalog and activate the skills that are needed for the task during the process.
**IMPORTANT:** You must follow strictly the development rules in `./.antigravity/workflows/development-rules.md` file.
**IMPORTANT:** Before you plan or proceed any implementation, always read the `./README.md` file first to get context.
**IMPORTANT:** Sacrifice grammar for the sake of concision when writing reports.
**IMPORTANT:** In reports, list any unresolved questions at the end, if any.
**IMPORTANT**: Date format is configured in `.antigravity.json` and injected by session hooks via `$CK_PLAN_DATE_FORMAT` env var. Use this format for plan/report naming.

## Documentation Management

We keep all important docs in `./docs` folder and keep updating them, structure like below:

```
./docs
├── project-overview-pdr.md
├── marketing-overview.md
├── brand-guidelines.md
├── design-guidelines.md
├── agent-catalog.md
├── skill-catalog.md
├── command-catalog.md
├── codebase-summary.md
├── system-architecture.md
└── project-roadmap.md
```

## Asset Management

We keep all important assets in `./assets` folder and keep updating them, structure like below:

```
./assets
├── articles/
├── attraction/
├── banners/
├── campaigns/
├── community/
├── content/
├── copy/
├── css/
├── design-tokens.css
├── design-tokens.json
├── designs/
├── diagnostics/
├── funnels/
├── generated/
├── images/
├── infographics/
├── leads/
├── logos/
├── posts/
├── reports/
├── retention/
├── sales/
├── scripts/
├── seo/
├── storyboards/
├── transcripts/
├── videos/
└── writing-styles/
```

**IMPORTANT:** *MUST READ* and *MUST COMPLY* all *INSTRUCTIONS* in project `./ANTIGRAVITY.md`, especially *WORKFLOWS* section is *CRITICALLY IMPORTANT*, this rule is *MANDATORY. NON-NEGOTIABLE. NO EXCEPTIONS. MUST REMEMBER AT ALL TIMES!!!*