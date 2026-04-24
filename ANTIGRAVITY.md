# ANTIGRAVITY.md

This file provides guidance to Google Antigravity (antigravity.ai/code) when working with code in this repository.

---

ALWAYS activate `antigravity-code` skill before starting any implementation.

## ⚠️ CRITICAL: Current Project Directory & Structure

**KIT ABSOLUTE PATH:**

When current user is "duynguyen" (macOS):
```
/Users/duynguyen/www/antigravitykit-marketing/.antigravity
```

When current user is "bnqtoan" (macOS):
```
/Applications/MAMP/htdocs/antigravitykit-marketing/antigravitykit-marketing/.antigravity
```

When current user is "admin" (Windows):
```
D:\www\antigravitykit\antigravitykit-marketing\.antigravity
```

**Structure:**
```
antigravitykit-marketing/
├── .antigravity/                    ← KIT OUTPUT (what we're building)
│   ├── agents/                 ← Marketing subagents
│   ├── commands/               ← Slash commands (e.g., /brand:update)
│   ├── skills/                 ← Domain knowledge & scripts
│   ├── workflows/              ← Process definitions
│   └── hooks/                  ← Automation hooks
├── docs/                       ← Example user docs (for testing)
├── assets/                     ← Example assets (for testing)
└── ANTIGRAVITY.md                   ← This file
```

**REMEMBER:**
- **All new skills, agents, commands → go to `.antigravity/`**
- **docs/, assets/ are example/test files** - they simulate a user's project
- **Scripts must be dynamic** - read from user's `docs/`, never hardcode values

---

## Related Projects & Directories

- `antigravitykit` - Website of AntigravityKit
  - Directory: `../antigravitykit`
  - Design guidelines: `../antigravitykit/docs/design-guidelines.md`
  - Repo: https://github.com/antigravitykit/antigravitykit
- `antigravitykit-marketing` - Marketing Kit repository
  - Directory: `.` (current project)
  - Repo: https://github.com/antigravitykit/antigravitykit-marketing
- `antigravitykit-engineer` - Engineer Kit repository
  - Directory: `../antigravitykit-engineer`
  - Repo: https://github.com/antigravitykit/antigravitykit-engineer
- `antigravitykit-cli` - CLI tool for quick project setup via `ck` command
  - Directory: `../antigravitykit-cli`
  - Repo: https://github.com/mrgoonie/antigravitykit-cli
- `antigravitykit-docs` - Public documentation repository: https://docs.antigravitykit.cc
  - Directory: `../antigravitykit-docs`
  - Repo: https://github.com/antigravitykit/antigravitykit-docs

---

## Project Overview

AntigravityKit Marketing is a comprehensive toolkit for sales and marketing automation using Google Antigravity subagent orchestration. This toolkit enables autonomous marketing workflows for content creation, campaign management, SEO optimization, and lead generation.

**Target Users:** Indie hackers, small marketing teams, SMB marketing managers

## What We're Building (CRITICAL)

**The deliverable is the `.antigravity/` folder itself** - a reusable kit users install in THEIR projects.

```
OUTPUT: ./antigravitykit-marketing/.antigravity/
        ├── agents/      # Marketing subagents
        ├── commands/    # Slash commands
        ├── skills/      # Domain knowledge
        ├── workflows/   # Process definitions
        └── hooks/       # Automation hooks
```

**NOT building:** A specific marketing project with hardcoded brand values.

### Key Principle: Dynamic Context

All commands/skills must read from USER's project, never hardcode values:

| Wrong | Right |
|-------|-------|
| `colors: #6366F1` hardcoded | Read from user's `docs/brand-guidelines.md` |
| `font: Inter` hardcoded | Extract via `inject-brand-context.cjs` |
| Specific company voice | Parse user's brand voice docs |

### Brand Injection Pattern

```
User runs command → inject-brand-context.cjs → user's docs/ → dynamic prompt
```

**Script:** `.antigravity/skills/brand-guidelines/scripts/inject-brand-context.cjs`
- Reads: `docs/brand-guidelines.md` (user's file)
- Outputs: Brand context for prompt injection
- Fallback: Graceful message if no brand docs exist

### When Building Kit Components

1. **Commands**: Use `inject-brand-context.cjs` for brand-aware features
2. **Skills**: Reference patterns, not specific values. 
   - When scripts got errors, analyze and fix them. 
   - When SKILL.md or references got outdated, use `research` and `docs-seeker` skills to research and update them.
3. **Agents**: Activate skills that read user context
4. **Templates**: Use `{{placeholders}}` not hardcoded values

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

**IMPORTANT:** *MUST READ* and *MUST COMPLY* all *INSTRUCTIONS* in project `./ANTIGRAVITY.md`, especially *WORKFLOWS* section is *CRITICALLY IMPORTANT*, this rule is *MANDATORY. NON-NEGOTIABLE. NO EXCEPTIONS. MUST REMEMBER AT ALL TIMES!!!*