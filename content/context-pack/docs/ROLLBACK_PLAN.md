# Rollback plan

## App

- Fastest rollback: [redeploy previous build / platform rollback command]
- Who can trigger it: [names or roles]

## Database

- Migrations are backward compatible for one release, so the previous app version still works.
- If a migration must be reverted: [down migration command]; [data considerations].

## Feature flags

- Risky features ship behind [flag tool]; turn off with [how].

## Decide

Roll back when: [error rate, failed smoke test, data issue]. Investigate after.
