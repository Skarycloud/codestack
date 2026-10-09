---
paths:
  - "src/server/**/*.ts"
  - "src/app/api/**/*.ts"
---

# API rules

- Every handler checks the session and the caller's permission (docs/AUTHENTICATION_AUTHORIZATION.md).
- Validate request bodies with [validation library]; reject unknown fields.
- Return errors in the format from docs/API_SPEC.md.
- Keep openapi.yaml in sync with any endpoint change, in the same commit.
- Database access only through [data layer path]; never build SQL from strings.
