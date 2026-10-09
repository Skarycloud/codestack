# Database migrations

- Tool: [e.g. Drizzle Kit, Prisma Migrate, Alembic, Flyway]
- Folder: [path]
- Naming: [timestamp_short_description]

## Rules

- Every schema change is a migration; never edit the database by hand.
- Every migration has a tested down path, or a documented reason it can't.
- Agents write migrations; a human reviews and runs them outside local development.
- Zero-downtime changes: add new columns as nullable, backfill, then add constraints; rename in two releases.
- Large backfills run as separate jobs, not inside the migration.

## Commands

```bash
[create migration]
[apply migrations]
[roll back last migration]
```

## Release

Migrations run [before / after] deploy in [environment] by [person or pipeline].
