---
description: "Create a new marketing playbook from expert template"
argument-hint: "<name> [--template <id>]"
---

Create a new marketing playbook from an expert-strategized template.

<args>create $ARGUMENTS</args>

## Workflow

1. **Parse Arguments** — extract playbook name and optional `--template` flag from `$ARGUMENTS`
2. **Activate Skill** — route to `akm:play` skill with `create $ARGUMENTS`

## Skill Used
- `akm:play` — Marketing playbook orchestrator
