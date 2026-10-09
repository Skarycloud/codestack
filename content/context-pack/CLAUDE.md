# CLAUDE.md

<!--
Claude Code reads this file. Keep shared rules in AGENTS.md and import them here,
so every agent follows the same instructions. Only add Claude-specific notes below.
Tip: a CLAUDE.md stops Claude Code reading AGENTS.md on its own, so keep the import.
-->

@AGENTS.md

## Claude Code notes

- Path-scoped rules live in .claude/rules/ (see the paths: frontmatter in each file).
- Reusable workflows live in .claude/skills/. Use them when a task matches their description.
- Start each session by reading AGENT_HANDOFF.md if it exists.
- [Any Claude-only preference, e.g. use plan mode before multi-file changes]

<!-- Personal, uncommitted preferences go in CLAUDE.local.md (add it to .gitignore). -->
