# Agent workflow

## For each task

1. Pick a task from TASKS.md. Create a branch: [naming].
2. Start a fresh agent session. Prompt: "Read AGENTS.md and AGENT_HANDOFF.md, then task [ID]."
3. Agent restates the task and assumptions; approve the plan.
4. Agent implements one task, runs checks and shows output.
5. Read the diff. Run it locally if it touches UI.
6. Independent review: new session or different model, using docs/REVIEW_CHECKLIST.md.
7. Fix findings, merge, verify on main.
8. Update TASKS.md and AGENT_HANDOFF.md.

## Gates

- Human approval before: schema changes, auth changes, dependency changes, deploys.

## Parallel work

- One task per agent, one branch or worktree per agent. No two agents edit the same files.
