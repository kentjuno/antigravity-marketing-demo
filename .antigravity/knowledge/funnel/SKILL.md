---
name: akm:funnel
description: 💡💡 Funnel design and optimization
argument-hint: "[action] [type]"
metadata:
  author: antigravitykit
  version: "1.0.0"
---

Design and optimize marketing funnels.

<args>$ARGUMENTS</args>

## Actions
- `design [type]` - Design new funnel
- `analyze` - Analyze existing funnel
- `optimize` - Optimization recommendations

## Funnel Types
- `lead-magnet` - Lead capture funnel
- `webinar` - Webinar registration funnel
- `product-launch` - Product launch sequence
- `evergreen` - Evergreen sales funnel
- `tripwire` - Low-ticket tripwire funnel

## Workflow

1. **Parse Arguments**
   - Extract action (design/analyze/optimize)
   - Extract funnel type (for design)

2. **Design Workflow**
   - Use `funnel-architect` agent for funnel architecture
   - Activate `campaign` skill
   - Design stages:
     - Traffic source
     - Landing page
     - Lead capture
     - Nurture sequence
     - Sales page
     - Checkout
     - Follow-up
   - Define metrics per stage

3. **Analyze Workflow**
   - Use `analytics-analyst` agent for funnel metrics
   - Calculate conversion rates per stage
   - Identify drop-off points
   - Benchmark against industry standards

4. **Optimize Workflow**
   - Use `funnel-architect` for recommendations
   - Use `sale-enabler` for conversion tactics
   - Priority-ranked improvements
   - A/B test suggestions

5. **Output**
   - Funnel designs → `assets/funnels/designs/{date}-{slug}-funnel.md`
   - Analysis reports → `assets/funnels/audits/{date}-{funnel}-audit.md`

## Agents Used
- `funnel-architect` - Funnel design
- `sale-enabler` - Conversion optimization
- `analytics-analyst` - Performance analysis

## Skills Used
- `campaign` - Funnel frameworks
- `analytics` - Metrics tracking
- `assets-organizing` - Standardized output paths

## Output
- Funnel designs → `assets/funnels/designs/{date}-{slug}-funnel.md`
- Funnel audits → `assets/funnels/audits/{date}-{funnel}-audit.md`
- A/B tests → `assets/funnels/tests/{date}-{test-name}.md`

## Examples
```
/funnel design lead-magnet
/funnel design webinar
/funnel analyze
/funnel optimize
```
