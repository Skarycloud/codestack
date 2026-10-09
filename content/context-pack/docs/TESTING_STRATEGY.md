# Testing strategy

## Layers

| Layer | Tool | Location | What it covers |
| --- | --- | --- | --- |
| Unit | [ ] | [path] | Business rules, validation |
| Integration | [ ] | [path] | API plus database, auth checks |
| End-to-end | [Playwright] | [path] | Critical journeys |
| Accessibility | [axe] | [path] | Key screens |
| Visual | [ ] | [path] | Key screens at 375 and 1280 |

## Commands

```bash
[unit]
[integration]
[e2e]
```

## Rules

- New behavior needs a test; bug fixes start with a failing test.
- Never weaken or delete a test to make it pass. Explain any skipped test.
- Mock external services at the boundary; use sandboxes for integration tests.
- Reports must say which commands ran and their results: passed, failed, skipped, not run.

## Merge requirements

CI must pass: [lint, typecheck, unit, integration, build].
