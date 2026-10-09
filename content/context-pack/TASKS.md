# Tasks

<!--
One row per task. Each task should fit in one reviewable diff.
Agents: update Status only after checks pass, and add the verification you ran.
Status: todo, doing, review, done, blocked
-->

| ID | Task | Status | Depends on | Covers | Verify with |
| --- | --- | --- | --- | --- | --- |
| T-01 | [Project setup: lint, typecheck, tests, CI] | todo | none | none | [CI green] |
| T-02 | [Schema and first migration] | todo | T-01 | FR-1 | [migration up and down] |
| T-03 | [Feature] | todo | T-02 | FR-2 | [tests/feature.test.ts] |

## T-03 details

Outcome: [what exists when done]
Files likely touched: [paths]
Acceptance criteria:
- [Criterion]
Notes: [risks, open questions]
