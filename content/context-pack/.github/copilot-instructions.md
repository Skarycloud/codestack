# Copilot instructions

<!--
Applies to every GitHub Copilot surface: github.com, VS Code, Visual Studio,
JetBrains, Eclipse, Xcode and the Copilot CLI. Keep it short.
The full rules live in AGENTS.md, which Copilot's agent surfaces also read.
-->

This repository's agent instructions live in AGENTS.md. Follow them.

Key rules:

- Stack: [framework, language, versions]. Don't suggest other libraries for the same job.
- Follow docs/CODING_STANDARDS.md and reuse existing components in [path].
- Validate inputs with [validation library] at every boundary.
- Never include secrets in code or examples.
- Tests: [test command]. New behavior needs a test.

When reviewing pull requests, use docs/REVIEW_CHECKLIST.md.
