---
description: "Show and execute next ready playbook step"
argument-hint: "[playbook-name]"
---

Show smart suggestions and execute the next ready step in a playbook.

<args>next $ARGUMENTS</args>

## Workflow

1. **Parse Arguments** — extract optional playbook name from `$ARGUMENTS`
2. **Activate Skill** — route to `akm:play` skill with `next $ARGUMENTS`

## Skill Used
- `akm:play` — Marketing playbook orchestrator
