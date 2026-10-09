# CI/CD

| Workflow | File | Trigger | Steps |
| --- | --- | --- | --- |
| Checks | [.github/workflows/ci.yml] | pull request | install, lint, typecheck, test, build |
| Deploy | [file] | push to main / tag | build, migrate, deploy, smoke test |

## Secrets used

- [NAME] (from [store], scope [environment])

## Common failures

- [Failure]: [fix]
