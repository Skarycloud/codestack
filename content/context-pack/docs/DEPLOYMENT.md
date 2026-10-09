# Deployment

## Prerequisites

- [Access, tools, approvals needed]

## Steps

1. Confirm main is green in CI.
2. [Build or promote command]
3. Run migrations: [command] (see docs/DATABASE_MIGRATIONS.md)
4. Deploy: [command or pipeline]
5. Smoke test: [key URLs or script]
6. Watch error tracking and metrics for [15] minutes.

## Rollback

See docs/ROLLBACK_PLAN.md. Fastest path: [command].

## After deploy

- Update CHANGELOG.md and announce in [channel].
