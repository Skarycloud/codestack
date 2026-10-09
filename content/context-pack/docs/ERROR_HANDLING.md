# Error handling

## Types

| Error | When | HTTP | User sees |
| --- | --- | --- | --- |
| ValidationError | Bad input | 400 | Field messages |
| UnauthorizedError | Not signed in | 401 | Sign-in prompt |
| ForbiddenError | No permission | 403 | "You don't have access" |
| NotFoundError | Missing resource | 404 | Not found page |
| ConflictError | Duplicate or stale | 409 | Explanation and next step |
| Unexpected | Bugs | 500 | Generic message; details logged |

## Rules

- Throw typed errors from [path]; map them in one place ([path]).
- Retry only idempotent operations, with backoff.
- Log with a request ID; never log secrets or personal data.
