---
description: "Goal tracker — set targets, pull metrics, view progress"
argument-hint: "[set|pull] [args]"
---

Track marketing goals — set target values, pull latest metrics from APIs, view progress dashboard.

<args>goals $ARGUMENTS</args>

## Workflow

1. **Parse Arguments** — extract optional subaction (set/pull) and args from `$ARGUMENTS`
2. **Activate Skill** — route to `akm:play` skill with `goals $ARGUMENTS`

## Skill Used
- `akm:play` — Marketing playbook orchestrator
