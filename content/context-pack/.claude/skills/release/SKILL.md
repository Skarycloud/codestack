---
name: release
description: Prepare a release. Use when asked to cut, prepare or publish a new version.
---

# Release

1. Confirm the branch is main and up to date. Stop if there are uncommitted changes.
2. Run [lint], [typecheck], [test] and [build]. Stop and report if any fail.
3. Read commits since the last tag and draft the CHANGELOG.md entry (Added, Changed, Fixed, Security).
4. Propose the next version using Semantic Versioning and explain why.
5. Wait for approval. Then update the version in [files], commit "chore(release): vX.Y.Z" and tag it.
6. Do not push or publish. Print the exact commands for the human to run.

<!--
Codex uses the same SKILL.md format in .agents/skills/<name>/.
Keep scripts and reference files beside this file and mention them in the steps.
-->
