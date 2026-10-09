# Review checklist

<!-- For every pull request, whether written by a person or an agent. -->

## Correctness
- [ ] Meets the task's acceptance criteria
- [ ] Edge cases and errors handled
- [ ] No unrelated changes in the diff

## Verification
- [ ] Lint, typecheck, tests and build ran, with output shown
- [ ] New behavior has tests; no tests weakened or deleted
- [ ] Checked in the browser or app where relevant

## Security
- [ ] Auth and permission checks on new endpoints
- [ ] Input validated; no secrets in code or logs
- [ ] New dependencies reviewed

## Quality
- [ ] Follows docs/CODING_STANDARDS.md and existing patterns
- [ ] Accessible: keyboard, labels, contrast
- [ ] No obvious performance problems

## Docs
- [ ] Affected docs, .env.example and TASKS.md updated
