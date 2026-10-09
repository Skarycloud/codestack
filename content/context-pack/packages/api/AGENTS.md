# AGENTS.md (packages/api)

<!--
Nested instructions for one package in a monorepo. Agents that support nesting
combine this with the root AGENTS.md; this file wins where they differ.
-->

## This package

[What this package does, e.g. the HTTP API for the web and mobile apps].

## Commands

```bash
[package test command]
[package build command]
```

## Rules

- [Stack differences from the root, e.g. uses Go 1.23, not TypeScript]
- Public endpoints are defined in openapi.yaml; update it with every change.
- Don't import from other packages except [shared package].
