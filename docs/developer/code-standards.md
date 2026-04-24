# AntigravityKit Marketing - Code Standards & Development Guidelines

**Document Version:** 1.0
**Created:** December 17, 2025
**Last Updated:** December 17, 2025
**Maintainer:** Docs Manager Agent

---

## Table of Contents

1. [Architecture Principles](#architecture-principles)
2. [Agent Development Standards](#agent-development-standards)
3. [Command Structure](#command-structure)
4. [Skill Development](#skill-development)
5. [Workflow Conventions](#workflow-conventions)
6. [Naming Conventions](#naming-conventions)
7. [File Organization](#file-organization)
8. [Documentation Standards](#documentation-standards)
9. [Testing & Quality Assurance](#testing--quality-assurance)
10. [Git & Version Control](#git--version-control)

---

## Architecture Principles

### System Design Philosophy

AntigravityKit Marketing follows a **distributed agent orchestration architecture** with the following core principles:

**1. Separation of Concerns**
- Agents: Specialized AI roles with distinct responsibilities
- Skills: Reusable capability modules
- Commands: User-facing interfaces
- Workflows: Orchestration and coordination logic
- Hooks: Automation triggers and validation

**2. Funnel-Based Organization**
Marketing agents are organized by customer journey stage:
- **TOFU (Top of Funnel):** Lead generation and awareness (4 agents)
- **MOFU (Middle of Funnel):** Engagement and nurturing (5 agents)
- **BOFU (Bottom of Funnel):** Conversion and closing (1 agent)
- **Core & Support:** Cross-functional capabilities (12 agents)

**3. Parallel Execution**
- Independent agents execute simultaneously
- Orchestrator coordinates async operations
- Results aggregated and reported
- Sequential chaining for dependent workflows

**4. File-Based Communication**
- Agent handoffs via markdown files
- Reports stored in `plans/reports/` directory
- Timestamped naming for traceability
- Version control via Git

---

## Agent Development Standards

### Agent File Structure

**Location:** `.antigravity/agents/agent-name.md`

**Required Sections:**
```markdown
# [Agent Name] Agent

**Role:** [One-line description]
**Type:** [TOFU|MOFU|BOFU|Core|Support]
**Capabilities:**
- [Capability 1]
- [Capability 2]
- [Capability 3]

## System Prompt
[Detailed instructions for the agent]

## Responsibilities
[Detailed list of agent duties]

## Input & Output
[Data model for inputs and outputs]

## Integration Points
[How this agent works with other agents/skills]

## MCP Integrations
[Any MCP tools used by this agent]

## Error Handling
[How errors are managed and reported]

## Examples
[Real-world usage examples]
```

### Agent Responsibilities

Each agent must have:

1. **Clear Role Definition**
   - Single primary responsibility
   - Specific customer journey stage (TOFU/MOFU/BOFU) or function (Core/Support)
   - Distinct from other agents to avoid duplication

2. **Output Standardization**
   - All outputs in markdown format
   - Timestamped reports with consistent naming
   - Structured recommendations and findings
   - Actionable suggestions, not just analysis

3. **Error Handling**
   - Graceful degradation on API failures
   - User-friendly error messages
   - Automatic retry logic with exponential backoff
   - Fallback behaviors when services unavailable

4. **Integration Capability**
   - Work with other agents in parallel
   - Accept inputs from previous agent outputs
   - Support skill chaining
   - Respect workflow orchestration

### Agent Naming Convention

```
{function}-{specialty}.md

Examples:
- attraction-specialist.md (TOFU agent)
- email-wizard.md (MOFU agent)
- content-reviewer.md (Core agent)
- docs-manager.md (Support agent)
```

---

## Command Structure

### Command File Format

**Location:** `.antigravity/commands/[category]/[command-name].md` or `.antigravity/commands/[command-name].md`

**Required Sections:**
```markdown
# /command-name Command

**Type:** [slash command]
**Agents:** [Primary, Secondary agents]
**Skills:** [Skills used]
**Purpose:** [What this command does]

## Usage

### Syntax
/command-name [required-arg] [optional-arg]

### Examples
[Usage examples with expected output]

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| arg1 | string | Yes | Description |
| arg2 | number | No | Description |

## Output

[Description of output format and structure]

## Related Commands
[Links to related commands]
```

### Command Naming Convention

```
{function}-{variant}.md

Examples:
- content/good.md (content creation - good quality)
- content/fast.md (content creation - fast turnaround)
- plan/hard.md (planning - complex scenarios)
- fix/ui.md (fixing - UI-specific)
- campaign:email.md (campaign - email variant)
```

### Command Categories

**Organized by function:**
```
.antigravity/commands/
├── content/           # Content creation variants
├── campaign/          # Campaign management
├── seo/               # SEO optimization
├── social/            # Social media
├── email/             # Email management
├── plan/              # Planning variants
├── design/            # Design variants
├── fix/               # Problem fixing
├── skill/             # Skill management
├── git/               # Git operations
├── integrate/         # Payment/service integration
├── docs/              # Documentation
├── analyze.md         # Analytics
├── ask.md             # Questions
├── brainstorm.md      # Ideation
├── competitor.md      # Competitive analysis
├── funnel.md          # Funnel management
├── journal.md         # Documentation
├── persona.md         # Audience management
├── plan.md            # Base planning
├── preview.md         # Preview rendering
├── scout.md           # File discovery
├── use-mcp.md         # MCP tool usage
└── watzup.md          # Status check
```

---

## Skill Development

### Skill File Structure

**Location:** `.antigravity/skills/skill-name/`

**Required Files:**
```
skill-name/
├── README.md           # Skill documentation
├── reference/          # Reference materials
│   └── *.md           # Guides, examples, specs
├── scripts/            # Executable scripts
│   ├── *.cjs          # Node.js scripts
│   └── *.sh           # Shell scripts
└── templates/          # Template files
    └── *.md           # Template examples
```

### Skill Documentation Standards

Each skill must include:

1. **README.md**
   - Purpose and capabilities
   - Use cases and examples
   - API reference
   - Configuration requirements
   - Error handling

2. **Reference Materials**
   - Technical specifications
   - API documentation
   - Integration guides
   - Example outputs

3. **Templates**
   - Starter templates for common tasks
   - Configuration examples
   - Best practices documentation

### Skill Categories

**AI & Content Processing (4):**
- `ai-multimodal` - Image/video generation (Gemini)
- `media-processing` - FFmpeg/ImageMagick
- `chrome-devtools` - Browser automation
- `document-skills` - PDF processing

**Design & UI (4):**
- `ui-styling` - Tailwind CSS + shadcn/ui
- `ui-ux-pro-max` - Advanced design system
- `frontend-design` - Design patterns
- `frontend-design-pro` - Production interfaces

**Strategy & Planning (4):**
- `planning` - Architecture and planning
- `research` - Research and discovery
- `problem-solving` - Problem-solving techniques
- `sequential-thinking` - Logical reasoning

**Marketing (3):**
- `seo` - SEO and keywords
- `brand` - Brand identity
- `video` - AI video with Veo 3.1

**Integration & Tooling (8+):**
- `mcp-management` - MCP integration
- `payment-integration` - Payment gateways
- `docs-seeker` - Documentation search
- `repomix` - Codebase packaging
- `antigravity-code` - Google Antigravity features
- `skill-creator` - Skill creation guide
- `common` - Shared utilities
- `template-skill` - Skill template

---

## Workflow Conventions

### Workflow File Format

**Location:** `.antigravity/workflows/workflow-name.md`

**Structure:**
```markdown
# Workflow Name

**Type:** [Marketing|Content|Campaign|Sales|SEO|Analytics|Development|Orchestration]
**Agents:** [List of agents involved]
**Duration:** [Estimated time to complete]
**Trigger:** [What initiates this workflow]

## Overview
[Description of workflow and objectives]

## Workflow Steps

### Step 1: [Action Name]
- Agent: [Agent Name]
- Input: [Data/context needed]
- Output: [Expected result]
- Error Handling: [What to do if this fails]

### Step 2: [Action Name]
...

## Success Criteria
[How to determine if workflow completed successfully]

## Error Recovery
[Steps to recover from failures]

## Related Workflows
[Links to related workflows]
```

### Hook Integration

Workflows can include hooks for:
- **session-init.cjs** - Session initialization
- **subagent-init.cjs** - Subagent context setup
- **brand-guidelines-reminder.cjs** - Brand compliance
- **campaign-tracking.cjs** - Metric tracking
- **approval-workflow.cjs** - Approval requests
- **dev-rules-reminder.cjs** - Development standards
- **scout-block.cjs** - Access validation

---

## Naming Conventions

### Files & Directories

**Agent Files:**
```
.antigravity/agents/{specialty}-{function}.md
Examples: attraction-specialist.md, email-wizard.md
```

**Command Files:**
```
.antigravity/commands/{category}/{name}.md
.antigravity/commands/{name}.md

Examples:
- content/good.md
- campaign/email.md
- ask.md
```

**Skill Directories:**
```
.antigravity/skills/{skill-name}/
Examples: video/, seo/
```

**Workflow Files:**
```
.antigravity/workflows/{workflow-type}-workflow.md
Examples: marketing-workflow.md, content-workflow.md
```

### Markdown Headers

**Use consistent header levels:**
```markdown
# Top-level title (H1) - Use once per file
## Major sections (H2) - Main categories
### Subsections (H3) - Details
#### Details (H4) - Additional context
```

### Report Naming

**Format:** `{agent}-{date}-{topic}.md`

**Examples:**
```
content-creator-2025-12-17-landing-page.md
campaign-debugger-2025-12-17-q4-analysis.md
planner-2025-12-17-2026-roadmap.md
```

**Date Format:** `YYYY-MM-DD` or configured format via `$CK_PLAN_DATE_FORMAT`

---

## File Organization

### Root Directory Structure

```
antigravitykit-marketing/
├── .antigravity/                    # Google Antigravity configuration
│   ├── agents/                # 27 marketing agents
│   ├── commands/              # 73+ marketing commands
│   ├── skills/                # 28+ capability modules
│   ├── hooks/                 # Automation triggers (6)
│   ├── workflows/             # Orchestration logic (10)
│   ├── .env.example           # Environment template
│   ├── .mcp.json              # MCP server config
│   └── .ckignore              # Ignore patterns
│
├── docs/                       # Project documentation
│   ├── project-overview-pdr.md
│   ├── codebase-summary.md
│   ├── code-standards.md
│   ├── system-architecture.md
│   ├── agent-catalog.md
│   ├── skill-catalog.md
│   ├── command-catalog.md
│   ├── marketing-overview.md
│   ├── brand-guidelines.md
│   ├── design-guidelines.md
│   ├── project-roadmap.md
│   └── mcp-*
│
├── plans/                      # Implementation plans & reports
│   └── reports/               # Agent execution reports
│
├── campaigns/                  # Campaign templates
├── content/                    # Content organization
├── reports/                    # Analytics reports
├── assets/                     # Marketing assets
├── scripts/                    # Build & release scripts
├── ANTIGRAVITY.md                   # Project instructions
├── README.md                   # Project overview
├── CHANGELOG.md                # Version history
├── package.json                # Project metadata
└── LICENSE                     # MIT License
```

### Documentation Directory

```
docs/
├── Core Documentation
│   ├── project-overview-pdr.md (500+ lines)
│   ├── codebase-summary.md (600+ lines)
│   ├── code-standards.md (250+ lines)
│   ├── system-architecture.md (800+ lines)
│   ├── project-roadmap.md (1200+ lines)
│   └── marketing-overview.md (400+ lines)
│
├── Reference Catalogs
│   ├── agent-catalog.md (560 lines)
│   ├── skill-catalog.md (670 lines)
│   └── command-catalog.md (700 lines)
│
├── Brand & Design
│   ├── brand-guidelines.md (300+ lines)
│   └── design-guidelines.md (400+ lines)
│
├── Integration Guides
│   ├── mcp-setup-guide.md (300+ lines)
│   └── mcp-troubleshooting.md (200+ lines)
│
└── Strategic Documentation
    └── overall/
        ├── AntigravityKit-Marketing-Antigravity-Code-for-Sales-and-Marketing.md
        └── Applying-Antigravity-Code-Subagents-to-Modern-Sales-and-Marketing-Frameworks.md
```

---

## Documentation Standards

### Document Structure

**All documentation files should include:**

1. **Header Section**
   ```markdown
   # Document Title

   **Document Version:** X.Y
   **Created:** [Date]
   **Last Updated:** [Date]
   **Maintainer:** [Agent/Person Name]
   **Status:** [Draft|Review|Active|Archived]
   ```

2. **Table of Contents**
   ```markdown
   ## Table of Contents
   1. [Section Name](#section-name)
   2. [Another Section](#another-section)
   ```

3. **Overview/Executive Summary**
   - Brief description
   - Key statistics
   - Current phase/status

4. **Main Content**
   - Organized by H2 headings
   - Clear subsections
   - Practical examples

5. **Related Resources**
   - Links to related docs
   - References
   - External resources

6. **Metadata**
   - Last reviewed date
   - Next review date
   - Document owner

### Code Examples in Documentation

**Format consistently:**

````markdown
### Example: Feature Description

**Code:**
```[language]
// Language-specific code with syntax highlighting
const example = () => { };
```

**Output:**
```
Expected output or result
```

**Explanation:**
Brief explanation of what the code does.
````

### Markdown Formatting

**Consistency Rules:**
- Use consistent emphasis: **bold** for UI elements, *italic* for concepts
- Use inline code: `variable names`, `function()` calls
- Use code blocks for multi-line content
- Use tables for structured data
- Use lists for unordered information
- Use numbered lists for steps/procedures

**Example Table:**
```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Value 1  | Value 2  | Value 3  |
```

---

## Testing & Quality Assurance

### Agent Testing

**Before deploying an agent:**

1. **Functional Testing**
   - Execute with sample inputs
   - Verify output format
   - Test error conditions
   - Validate integration with other agents

2. **Quality Checks**
   - Brand voice consistency
   - Output completeness
   - Response accuracy
   - SEO optimization (if applicable)

3. **Integration Testing**
   - Workflow compatibility
   - Skill chaining
   - Error handling in cascades
   - Data format consistency

### Command Testing

**Before releasing a command:**

1. **Syntax Validation**
   - Command parses correctly
   - Arguments accepted as documented
   - Help text displays properly

2. **Functional Testing**
   - Command executes without errors
   - Output matches specification
   - Error handling works

3. **Documentation
 Testing**
   - Examples work as documented
   - Related commands link correctly
   - Help text is accurate

### Skill Testing

**Before integrating a skill:**

1. **Unit Testing**
   - Individual functions work
   - Error handling correct
   - Output format validated

2. **Integration Testing**
   - Works with agents
   - Proper error propagation
   - Resource cleanup

3. **Performance Testing**
   - Response time acceptable
   - Resource usage reasonable
   - Scaling characteristics documented

---

## Git & Version Control

### Commit Message Convention

**Format:**
```
type(scope): description

Additional details if needed.

Fixes #issue-number (if applicable)
```

**Types:**
- `feat` - New feature
- `enhance` - Enhancement to existing feature
- `fix` - Bug fix
- `docs` - Documentation only
- `refactor` - Code refactoring
- `test` - Test additions
- `chore` - Maintenance tasks
- `perf` - Performance improvements

**Scopes:**
- `agents` - Agent changes
- `commands` - Command changes
- `skills` - Skill changes
- `workflows` - Workflow changes
- `docs` - Documentation
- `config` - Configuration files
- `scripts` - Build/release scripts

**Examples:**
```
feat(agents): add lead-qualifier agent

Implements lead scoring and qualification for TOFU stage.
Includes integration with GA4 for user behavior analysis.

enhance(commands): improve /plan command with parallel execution

Adds parallel execution capability to /plan command for 3+ agents.
Reduces planning time from 60s to 20s for complex scenarios.

fix(skills): fix media-processing FFmpeg integration

Resolves issue with FFmpeg not respecting video duration limits.

docs(agent-catalog): update with Phase 2 agents

Adds 13 new marketing agents to catalog with descriptions.

Fixes #42
```

### Branch Naming

**Convention:** `{type}/{description}`

**Examples:**
```
feature/phase2-marketing-agents
enhance/command-parallelization
fix/mcp-integration-errors
docs/codebase-summary-update
```

### Pull Request Process

1. Create feature branch from `main`
2. Implement changes with descriptive commits
3. Update relevant documentation
4. Create PR with comprehensive description
5. Pass all checks and reviews
6. Merge when approved

---

## Performance & Optimization

### Response Time Targets

**Command Performance:**
- Simple content requests: < 10 seconds
- Complex planning: < 30 seconds
- Analysis requests: < 20 seconds
- Parallel agent execution: proportional reduction

**Skills Performance:**
- AI generation (Gemini): < 15 seconds
- Data processing: < 5 seconds
- File operations: < 2 seconds
- API calls: < 3 seconds

### Optimization Guidelines

1. **Parallel Execution**
   - Execute independent agents simultaneously
   - Aggregate results efficiently

2. **Caching**
   - Cache API responses when appropriate
   - Cache file operations
   - Use versioning for caching strategy

3. **Resource Management**
   - Clean up temporary files
   - Close database connections
   - Release memory after operations

---

## Security Best Practices

### Credential Management

**Required:**
- No API keys in source code
- All secrets in environment variables
- `.env` files in `.gitignore`
- `.env.example` with placeholders only

**MCP Servers:**
- Token management via `.env`
- OAuth2 for cloud services
- API key rotation policies

### Data Privacy

**Guidelines:**
- No automatic external uploads
- User controls data distribution
- Audit trail via Git commits
- Secure handling of sensitive data

### Access Control

**Hooks include:**
- `scout-block.cjs` - File access validation
- `approval-workflow.cjs` - Approval requirements
- `dev-rules-reminder.cjs` - Development standards

---

## Quality Metrics

### Code Quality

**Target Metrics:**
- Documentation coverage: 100%
- Command success rate: > 98%
- Agent operational: 100%
- Zero security issues: 0

### Documentation Quality

**Target Metrics:**
- Completeness: 100% of features documented
- Accuracy: Verified against implementation
- Consistency: Uniform formatting and style
- Currency: Updated with each release

---

## Continuous Improvement

### Documentation Review Process

**Frequency:** Monthly
**Checklist:**
- [ ] All features documented
- [ ] Examples are current
- [ ] Links are valid
- [ ] Formatting is consistent
- [ ] Version numbers updated

### Update Triggers

**Automatic updates needed when:**
- New agents added
- Commands modified
- Skills updated
- Architecture changes
- Phase completions
- Breaking changes

---

## Contact & Support

- **Documentation Owner:** Docs Manager Agent
- **Technical Lead:** Development Team
- **Questions:** Check ANTIGRAVITY.md for project instructions
- **Issues:** Report via GitHub Issues

---

**Last Review:** 2025-12-17
**Next Review:** 2025-12-31 (Phase 8 Launch)
