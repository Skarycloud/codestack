# API specification

<!--
For HTTP APIs, openapi.yaml is the authoritative contract. This file is the human summary.
Update both in the same change. Generate types or contract tests from openapi.yaml.
-->

Contract: [path/to/openapi.yaml] (OpenAPI 3.1)
Base URL: [https://api.example.com/v1]

## Authentication

[Session cookie / bearer token / API key]; how to obtain it; where it's checked.

## Conventions

- JSON in and out; field names in [camelCase / snake_case].
- Pagination: [cursor with limit, max 100].
- Versioning: [URL /v1, breaking changes need a new version].
- Idempotency: [Idempotency-Key header on POSTs that create or charge].

## Error format

```json
{ "error": { "code": "validation_error", "message": "Title is required", "fields": { "title": "Required" } } }
```

## Endpoints

| Method | Path | Purpose | Auth | Requirement |
| --- | --- | --- | --- | --- |
| GET | /tasks | List tasks in the workspace | member | FR-3 |
| POST | /tasks | Create a task | member | FR-3 |
