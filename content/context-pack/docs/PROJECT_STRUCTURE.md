# Project structure

```
[root]/
  src/
    app/          [routes and pages]
    components/   [shared UI]
    server/       [business logic and data access]
    lib/          [small shared helpers]
  tests/          [test files mirror src/]
  docs/           [project documentation]
```

## Rules

- [Where new features go]
- [Naming: files kebab-case, components PascalCase]
- [What may import what, e.g. components never import from server]
