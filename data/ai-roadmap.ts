// The AI-Assisted Development roadmap: how to go from prompting an AI to a professional,
// repeatable workflow with coding agents. Tool-agnostic: Codex, Claude Code, Copilot, Cursor,
// Gemini CLI and others. Agent behavior described here was checked against each tool's docs.

import type { ChartPhase, ChartTopic } from "@/data/roadmap"

export const aiPhases: ChartPhase[] = [
  { id: "understand", name: "Understand", blurb: "Know what agents can and can't do before you trust them with a repo.", color: "#7FBCFF" },
  { id: "context", name: "Prepare context", blurb: "Write down what you want before the agent has to guess.", color: "#C4A1FF" },
  {
    id: "system",
    name: "Design the system",
    blurb: "Decide architecture, data and contracts on purpose, then hand them over.",
    color: "#5CF2C4",
  },
  { id: "build", name: "Build and verify", blurb: "Small tasks, real checks, honest reports.", color: "#FFDC58" },
  { id: "ship", name: "Ship and scale", blurb: "Release safely, coordinate agents and improve the system over time.", color: "#FF9EE6" },
]

const docs = {
  claudeMemory: { name: "CLAUDE.md and AGENTS.md, Claude Code", href: "https://code.claude.com/docs/en/memory" },
  claudeBest: { name: "Best practices, Claude Code", href: "https://code.claude.com/docs/en/best-practices" },
  claudeSkills: { name: "Skills, Claude Code", href: "https://code.claude.com/docs/en/skills" },
  codexAgents: { name: "AGENTS.md, Codex", href: "https://learn.chatgpt.com/docs/agent-configuration/agents-md" },
  codexRepo: { name: "Codex on GitHub", href: "https://github.com/openai/codex" },
  codexSkills: { name: "Skills, Codex", href: "https://learn.chatgpt.com/docs/build-skills" },
  copilot: {
    name: "Custom instructions, GitHub Copilot",
    href: "https://docs.github.com/en/copilot/reference/custom-instructions-support",
  },
  vscode: { name: "Custom instructions, VS Code", href: "https://code.visualstudio.com/docs/copilot/customization/custom-instructions" },
  cursor: { name: "Rules, Cursor", href: "https://cursor.com/docs/context/rules" },
  gemini: { name: "GEMINI.md, Gemini CLI", href: "https://geminicli.com/docs/cli/gemini-md/" },
  agentsMd: { name: "AGENTS.md", href: "https://agents.md/" },
  agentSkills: { name: "Agent Skills standard", href: "https://agentskills.io" },
  mcp: { name: "Model Context Protocol", href: "https://modelcontextprotocol.io" },
  owaspAi: {
    name: "Secure Coding with AI, OWASP",
    href: "https://cheatsheetseries.owasp.org/cheatsheets/Secure_Coding_with_AI_Cheat_Sheet.html",
  },
  owaspInjection: { name: "Prompt injection, OWASP GenAI", href: "https://genai.owasp.org/llmrisk/llm01-prompt-injection/" },
  asvs: { name: "OWASP ASVS", href: "https://owasp.org/www-project-application-security-verification-standard/" },
  top10: { name: "OWASP Top 10:2025", href: "https://owasp.org/Top10/2025/" },
  threat: { name: "Threat modeling, OWASP", href: "https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html" },
  secrets: {
    name: "Secrets management, OWASP",
    href: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
  },
  openapi: { name: "OpenAPI", href: "https://www.openapis.org/" },
  jsonSchema: { name: "JSON Schema", href: "https://json-schema.org" },
  c4: { name: "C4 model", href: "https://c4model.com/" },
  adr: { name: "Architecture Decision Records", href: "https://adr.github.io/" },
  mermaid: { name: "Mermaid diagrams", href: "https://mermaid.js.org" },
  specKit: { name: "Spec Kit, GitHub", href: "https://github.com/github/spec-kit" },
  stories: { name: "User stories, Atlassian", href: "https://www.atlassian.com/agile/project-management/user-stories" },
  heuristics: { name: "10 usability heuristics, NN/g", href: "https://www.nngroup.com/articles/ten-usability-heuristics/" },
  wcag: { name: "WCAG 2.2 quick reference", href: "https://www.w3.org/WAI/WCAG22/quickref/" },
  vitals: { name: "Core Web Vitals", href: "https://web.dev/articles/vitals" },
  playwright: { name: "Playwright", href: "https://playwright.dev" },
  twelve: { name: "The Twelve-Factor App", href: "https://12factor.net" },
  sre: { name: "Site Reliability Engineering, Google", href: "https://sre.google/sre-book/table-of-contents/" },
  conventional: { name: "Conventional Commits", href: "https://www.conventionalcommits.org" },
  worktree: { name: "git worktree", href: "https://git-scm.com/docs/git-worktree" },
  changelog: { name: "Keep a Changelog", href: "https://keepachangelog.com" },
  semver: { name: "Semantic Versioning", href: "https://semver.org" },
  diataxis: { name: "Diátaxis documentation framework", href: "https://diataxis.fr" },
}

export const aiTopics: ChartTopic[] = [
  // Understand
  {
    id: "agents-101",
    title: "Understand AI coding agents",
    phase: "understand",
    summary: "An agent reads your repo, edits files and runs commands. It is fast, confident and sometimes wrong.",
    groups: [
      {
        title: "What agents are",
        items: [
          "Chat assistant vs repository-aware agent: one answers, the other reads, edits and runs",
          "The agent loop: inspect, plan, edit, run, check, repeat",
          "Tools and permissions: file edits, shell commands, network, MCP servers",
          "Know your options: Codex, Claude Code, Copilot, Cursor, Gemini CLI and open source agents",
        ],
      },
      {
        title: "Limits to plan around",
        items: [
          "Context windows are finite; long sessions forget early details",
          "Training data has a cutoff; APIs and libraries may have changed since",
          "Models hallucinate functions, flags and endpoints with full confidence",
          "Agents fill gaps with assumptions unless you tell them what you know",
          "Generated code is unverified until you run and review it",
        ],
      },
      {
        title: "Choosing and checking",
        items: [
          "Pick a model per task: fast for edits, strongest for planning and review",
          "Choose an agent by where you work (terminal, IDE, cloud) and what your team uses",
          "Verify the agent loaded your instructions (ask it to summarize them, or check its startup notice)",
          "Start in a read-only or ask-before-edit mode until you trust the setup",
        ],
      },
    ],
    rule: "Treat an agent like a fast new teammate: capable, but it only knows what you show it, and its work needs review.",
    flow: ["Inspect", "Plan", "Edit", "Run checks", "Report", "You review"],
    techniques: [
      'Ask "what do you know about this project?" at the start of a session to see what context it actually has.',
      "Ask the agent to cite the file and line it relied on, so you can check it.",
      "When it names a library function, ask it to show where that function is documented.",
    ],
    resources: [docs.claudeBest, docs.codexRepo, docs.agentsMd],
  },
  {
    id: "prompting",
    title: "Prompting and task specification",
    phase: "understand",
    summary: "A good task has a goal, context, constraints, acceptance criteria and a definition of done.",
    groups: [
      {
        title: "A precise task",
        items: [
          "State the goal and why it matters",
          "Point to the relevant files, docs and examples",
          "List constraints: stack, patterns to follow, things not to touch",
          "Name non-goals so the agent doesn't wander",
          "Write acceptance criteria you can check",
          "Say what output you expect: a plan, a diff, a report",
        ],
      },
      {
        title: "Before code",
        items: [
          "Ask the agent to restate the task and list its assumptions",
          "Let it ask clarifying questions first",
          "Get a plan, review it, then approve implementation",
          "Split big features into tasks that fit in one reviewable diff",
        ],
      },
      {
        title: "Debugging prompts",
        items: [
          "Give the exact error, stack trace and steps to reproduce",
          "Say what you expected and what happened instead",
          "Share what you already tried",
          "Ask for the root cause before asking for a fix",
        ],
      },
      {
        title: "Reuse",
        optional: true,
        items: [
          "Keep proven prompts in PROMPTS.md or as skills",
          "Use templates with placeholders",
          "Refine templates when an agent misunderstands",
        ],
      },
    ],
    rule: 'Never ask for "the whole app". Ask for one outcome you can verify.',
    flow: ["Goal", "Context", "Constraints", "Acceptance criteria", "Plan first", "Implement"],
    techniques: [
      'Weak: "Add login." Strong: "Add email and password login using our existing auth module in src/auth. Follow docs/AUTHENTICATION_AUTHORIZATION.md. Done when the three tests in tests/auth pass and no other files change."',
      'End prompts with "Before you start, list your assumptions and any questions."',
      'Ask for evidence: "Show the command you ran and its output."',
    ],
    resources: [docs.claudeBest, docs.specKit],
  },

  // Prepare context
  {
    id: "context-engineering",
    title: "Project context engineering",
    phase: "context",
    summary: "Durable files that tell any agent what you're building, how, and by which rules.",
    groups: [
      {
        title: "Agent instructions",
        items: [
          "One shared instruction file as the source of truth (AGENTS.md works across most agents)",
          "Small tool-specific adapters only where needed (CLAUDE.md, copilot-instructions.md, GEMINI.md)",
          "Build, test and lint commands the agent can run",
          "Conventions the agent can't infer from code",
          "Keep it short: under about 200 lines; link to deeper docs",
        ],
      },
      {
        title: "Project knowledge",
        items: [
          "Project brief and requirements",
          "Architecture and tech stack",
          "Design system and UI specs",
          "Database schema and API contracts",
          "Security, testing and deployment notes",
        ],
      },
      {
        title: "Working memory",
        items: ["Implementation plan and task list", "Decision log or ADRs", "Handoff notes between sessions", "Known issues"],
      },
    ],
    rule: "Prepare enough context to make important decisions clear, but don't write docs just to fill a checklist.",
    flow: ["Brief", "Requirements", "Architecture", "Contracts", "Instructions file", "Plan"],
    techniques: [
      "Point your instruction file at deeper docs instead of pasting them in, so it stays short.",
      "Use the Context Pack below: start with the Starter pack and add files only when the project needs them.",
      "Agents don't read every Markdown file automatically. Reference the docs you want used, or import them where the agent supports it.",
    ],
    resources: [docs.agentsMd, docs.claudeMemory, docs.codexAgents, docs.copilot, { name: "Context Pack below", href: "#context-pack" }],
  },
  {
    id: "requirements",
    title: "Product planning and requirements",
    phase: "context",
    summary: "Decide the problem, users and scope yourself. Agents implement decisions; they shouldn't invent them.",
    groups: [
      {
        title: "Problem and users",
        items: ["Problem statement in two sentences", "Target users and their main jobs", "Key user journeys", "Success metrics"],
      },
      {
        title: "Requirements",
        items: [
          "Functional requirements with IDs (FR-1, FR-2)",
          "Non-functional requirements: performance, accessibility, security, availability",
          "User stories with acceptance criteria",
          "Business rules and domain terms in a glossary",
        ],
      },
      {
        title: "Scope control",
        items: [
          "An MVP cut you can ship",
          "Explicit non-goals",
          "Edge cases and error states",
          "Constraints, assumptions and open questions",
          "Definition of done",
        ],
      },
      {
        title: "Traceability",
        optional: true,
        items: ["Link tasks and tests to requirement IDs", "Mark requirements done only when their acceptance criteria pass"],
      },
    ],
    rule: "If it's not written down, the agent will guess. Write down what matters.",
    flow: ["Problem", "Users", "Journeys", "Requirements", "MVP cut", "Acceptance criteria"],
    techniques: [
      "Have the agent interview you: one question at a time, then summarize into PROJECT_BRIEF.md.",
      "Separate confirmed facts, assumptions and open questions in every requirements doc.",
      "Use Given / When / Then for acceptance criteria so they translate directly into tests.",
    ],
    resources: [docs.stories, docs.specKit],
  },
  {
    id: "design-context",
    title: "Design and frontend context",
    phase: "context",
    summary: "Agents build generic screens unless you give them a design system, flows and every UI state.",
    groups: [
      {
        title: "Structure",
        items: ["Design brief: audience, tone, references", "Sitemap and information architecture", "User flows and wireframes"],
      },
      {
        title: "Design system",
        items: [
          "Design tokens: color, type scale, spacing, radius, shadows",
          "Typography and visual hierarchy rules",
          "Component inventory and when to use each",
          "Responsive breakpoints and behavior",
          "Motion guidelines and reduced-motion behavior",
        ],
      },
      {
        title: "States and accessibility",
        items: [
          "Loading, empty, error, success and offline states for every screen",
          "Form validation and interaction states (hover, focus, disabled)",
          "Semantic HTML, keyboard access and contrast (WCAG 2.2 AA)",
        ],
      },
      {
        title: "Verify visually",
        items: [
          "Screenshots or design references for the agent",
          "Check in real browsers at real breakpoints",
          "Visual regression tests for key screens",
        ],
      },
    ],
    rule: "Give the agent your tokens, components and states, and it builds your product, not a template.",
    flow: ["Brief", "Flows", "Tokens", "Components", "States", "Browser check"],
    techniques: [
      "Tell the agent to reuse existing components and tokens and never hard-code new colors.",
      "Paste screenshots of the target design; most agents accept images.",
      "Ask the agent to list every state a screen needs before building it.",
    ],
    resources: [docs.heuristics, docs.wcag, { name: "Design tools on CodeStack", href: "/explore?a=design" }],
  },

  // Design the system
  {
    id: "architecture",
    title: "Architecture and system design",
    phase: "system",
    summary: "Pick the simplest architecture that meets the requirements, write it down, and hold the agent to it.",
    groups: [
      {
        title: "Structure",
        items: [
          "System overview and context diagram",
          "Project structure and module boundaries",
          "Frontend and backend contracts",
          "State management and data flow",
        ],
      },
      {
        title: "Cross-cutting",
        items: [
          "Authentication and authorization",
          "Background jobs and queues where needed",
          "Caching and performance strategy",
          "Error handling and logging",
        ],
      },
      {
        title: "Decisions",
        items: [
          "Dependency choices with reasons",
          "Architecture Decision Records for significant choices",
          "Diagrams as code (Mermaid or C4)",
          "Known trade-offs and technical debt",
          "Monolith first unless requirements demand otherwise",
        ],
      },
    ],
    rule: "Choose architecture from requirements, not trends. A well-structured monolith beats premature microservices.",
    flow: ["Requirements", "Options", "Trade-offs", "Decision (ADR)", "ARCHITECTURE.md", "Agent follows it"],
    techniques: [
      "Ask the agent for two or three options with trade-offs, then decide yourself.",
      "Keep diagrams in Mermaid inside Markdown so agents can read and update them.",
      "Record every decision you'd hate to re-argue as an ADR.",
    ],
    resources: [docs.c4, docs.adr, docs.mermaid],
  },
  {
    id: "data",
    title: "Database and data engineering",
    phase: "system",
    summary: "Model the data deliberately. The schema and migrations are the source of truth, not a Markdown summary.",
    groups: [
      {
        title: "Modeling",
        items: [
          "Entities and relationships (ER diagram)",
          "Constraints: keys, uniqueness, not null, checks",
          "SQL vs NoSQL chosen from access patterns",
          "Indexes for real query patterns",
          "Validation at the boundary and in the database",
        ],
      },
      {
        title: "Change and safety",
        items: [
          "Migrations for every schema change, with rollback",
          "Transactions and concurrency rules",
          "Seed data for development",
          "Access control and tenant isolation",
          "Retention, deletion and backups you have restored",
        ],
      },
      {
        title: "Special stores",
        optional: true,
        items: ["Vector database for embeddings", "Object storage for files", "Cache and queue stores"],
      },
    ],
    rule: "Describe intent in Markdown; keep the real schema in migrations or schema files, and treat those as authoritative.",
    flow: ["Entities", "Relationships", "Constraints", "Indexes", "Migration", "Seed and test"],
    techniques: [
      "Never let an agent edit a production database directly; it writes migrations, you review and run them.",
      "Ask for the down migration with every up migration.",
      "Keep DATA_DICTIONARY.md for meaning (what a field represents), not for types the schema already states.",
    ],
    resources: [docs.mermaid, { name: "Databases on CodeStack", href: "/explore?c=databases" }],
  },
  {
    id: "integrations",
    title: "API and integration engineering",
    phase: "system",
    summary: "Contracts first, real docs always. Agents invent endpoints when you don't give them the spec.",
    groups: [
      {
        title: "Your API",
        items: [
          "API contract (OpenAPI for HTTP APIs)",
          "Request and response schemas",
          "Authentication method",
          "Error format and status codes",
          "Pagination, filtering and versioning",
        ],
      },
      {
        title: "Third parties",
        items: [
          "Official SDK docs linked or saved for: payments, auth, email, AI models",
          "Sandbox and test credentials",
          "Webhooks with signature verification",
          "Idempotency keys for anything that charges or sends",
          "Rate limits, retries with backoff and timeouts",
        ],
      },
      {
        title: "Verify",
        items: [
          "Integration tests against sandboxes or mocks",
          "Error mapping from provider errors to your errors",
          "Environment variables documented in .env.example",
          "Check the real API behavior, not the agent's memory of it",
        ],
      },
    ],
    rule: "If the agent can't show you the doc page for an endpoint, assume it doesn't exist.",
    flow: ["Contract", "Official docs", "Sandbox", "Implement", "Contract test", "Monitor"],
    techniques: [
      "Paste or link the provider's current docs into the task; tell the agent not to rely on memory.",
      "Generate types from the OpenAPI spec so drift becomes a compile error.",
      "Test webhooks with the provider's CLI or test events before going live.",
    ],
    resources: [docs.openapi, docs.jsonSchema, { name: "Payments on CodeStack", href: "/explore?c=payments" }],
  },

  // Build and verify
  {
    id: "implementation",
    title: "Coding standards and implementation",
    phase: "build",
    summary: "Explore first, follow conventions, make small diffs and read every one.",
    groups: [
      {
        title: "Before editing",
        items: [
          "Agent explores the repo and reports conventions",
          "Find existing helpers and components before writing new ones",
          "Confirm the plan for this one task",
        ],
      },
      {
        title: "While editing",
        items: [
          "Type safety and schema validation at boundaries",
          "Follow naming and formatting conventions",
          "Handle errors and log usefully",
          "No new dependency without a reason",
          "No unrelated refactors in the same change",
        ],
      },
      {
        title: "After editing",
        items: [
          "Review the full diff yourself",
          "Run format, lint, type check and tests",
          "Update docs the change affected",
          "Note any technical debt you accepted",
        ],
      },
    ],
    rule: "One task, one diff, one review. Big diffs hide bugs.",
    flow: ["Explore", "Plan", "Small change", "Checks", "Read diff", "Commit"],
    techniques: [
      'Tell the agent: "Match the style of the surrounding code. Don\'t refactor unrelated code."',
      "Ask for a summary of every file changed and why.",
      "Reject changes you don't understand; ask for an explanation first.",
    ],
    resources: [docs.claudeBest, docs.conventional],
  },
  {
    id: "testing",
    title: "Testing and debugging",
    phase: "build",
    summary: "Tests are how you know AI-generated code works. Require evidence, not claims.",
    groups: [
      {
        title: "Test layers",
        items: [
          "Unit tests for business logic",
          "Integration tests for APIs and data",
          "End-to-end tests for critical journeys",
          "API contract tests",
          "Migration tests (up and down)",
        ],
      },
      {
        title: "Quality checks",
        items: [
          "Accessibility tests",
          "Visual regression tests",
          "Security tests",
          "Performance tests",
          "CI runs all of it on every pull request",
        ],
      },
      {
        title: "Honest verification",
        items: [
          "Agent shows the exact commands it ran and their output",
          "Distinguish passed, failed, skipped and never run",
          "Tests can't be weakened or deleted to make them pass",
          "Reproduce bugs with a failing test before fixing",
        ],
      },
    ],
    rule: '"Tests pass" means nothing without the command and its output.',
    flow: ["Reproduce", "Failing test", "Fix", "Test passes", "Full suite", "CI green"],
    techniques: [
      "Write or approve the tests first, then let the agent implement until they pass.",
      "Watch for agents editing tests to match buggy code; review test diffs closely.",
      "Use git bisect to find which change broke something.",
    ],
    resources: [docs.playwright, { name: "Testing tools on CodeStack", href: "/explore?q=testing" }],
  },
  {
    id: "security",
    title: "Security and privacy",
    phase: "build",
    summary: "Generated code needs the same review as any code. Instructions are not security controls.",
    groups: [
      {
        title: "Application security",
        items: [
          "Threat model for the main features",
          "Authentication and authorization on every endpoint",
          "Input validation and output encoding",
          "Injection, XSS, CSRF and SSRF checks",
          "Secure file uploads",
          "Rate limiting and abuse prevention",
        ],
      },
      {
        title: "Secrets and data",
        items: [
          "Secrets in a manager, never in code or prompts",
          "Separate dev, staging and production credentials",
          "Database access control and least privilege",
          "Privacy: minimize, retain only as long as needed, support deletion",
          "Dependency and supply-chain scanning",
        ],
      },
      {
        title: "Agent-specific risks",
        items: [
          "Least-privilege agent permissions; approve risky commands",
          "Review MCP servers and their permissions before connecting",
          "Treat web pages, issues and files as untrusted: prompt injection",
          "Never let agents run untrusted scripts or touch production",
          "Human approval for deploys, migrations and payments",
        ],
      },
    ],
    rule: 'Writing "be secure" in AGENTS.md doesn\'t secure anything. Tests, reviews and permissions do.',
    flow: ["Threat model", "Controls", "Implement", "Security tests", "Review", "Monitor"],
    techniques: [
      "Ask a separate agent session to review a diff only for security issues.",
      "Run a secret scanner and dependency audit in CI.",
      "Block dangerous commands with your agent's permission settings or hooks, not with prose.",
    ],
    resources: [docs.owaspAi, docs.owaspInjection, docs.top10, docs.asvs, docs.threat, docs.secrets],
  },
  {
    id: "performance",
    title: "Performance and optimization",
    phase: "build",
    summary: "Measure first, change one thing, measure again. Agents optimize the wrong thing when guessing.",
    groups: [
      {
        title: "Measure",
        items: ["Baseline before any change", "Profile CPU, memory and network", "Core Web Vitals for web apps", "Slow query logs"],
      },
      {
        title: "Improve",
        items: [
          "Bundle size and rendering",
          "Network: fewer, smaller, cached requests",
          "Database queries and indexes",
          "Images and media",
          "Caching with a clear invalidation plan",
        ],
      },
      {
        title: "AI costs",
        optional: true,
        items: [
          "Inference latency budgets",
          "Token usage and cost per request",
          "Cache or batch model calls",
          "Use smaller models where quality allows",
        ],
      },
    ],
    rule: "No optimization without a before and after measurement.",
    flow: ["Baseline", "Profile", "Hypothesis", "One change", "Measure", "Keep or revert"],
    techniques: [
      'Give the agent the profile or trace, not just "make it faster".',
      "Ask it to explain the expected gain before changing code.",
      "Keep performance budgets in docs/PERFORMANCE.md and check them in CI.",
    ],
    resources: [docs.vitals],
  },

  // Ship and scale
  {
    id: "git-agents",
    title: "Git and multi-agent workflows",
    phase: "ship",
    summary: "Git is your safety net. Small commits, branches and one owner for integration.",
    groups: [
      {
        title: "Git habits",
        items: [
          "Commit before every agent task so you can roll back",
          "Small, reviewable commits with clear messages",
          "Feature branches and pull requests",
          "Inspect diffs before committing",
        ],
      },
      {
        title: "Several agents",
        items: [
          "Give each agent a bounded task and its own branch or worktree",
          "Never let two agents edit the same files at once",
          "Shared context lives in the repo, not in chat history",
          "A different agent or model reviews the work",
          "One person owns integration and the final merge",
        ],
      },
      {
        title: "Sessions",
        items: [
          "Write AGENT_HANDOFF.md at the end of a session",
          "Start new sessions by reading the handoff",
          "Verify again after merging",
        ],
      },
    ],
    rule: "If you can't roll it back in one command, the change was too big.",
    flow: ["Branch", "Agent task", "Checks", "Review", "Merge", "Verify on main"],
    techniques: [
      "Use git worktrees to run agents in parallel without file conflicts.",
      "Ask the reviewing agent for a list of risks, not a summary of what changed.",
      "Use Conventional Commits so history and changelogs stay readable.",
    ],
    resources: [docs.worktree, docs.conventional],
  },
  {
    id: "deployment",
    title: "Deployment and operations",
    phase: "ship",
    summary: "Reproducible builds, staged releases, health checks and a rollback you've practiced.",
    groups: [
      {
        title: "Environments",
        items: [
          "Local, staging and production",
          "Configuration in environment variables",
          "Secrets and permissions per environment",
          "Reproducible builds",
        ],
      },
      {
        title: "Release",
        items: [
          "CI/CD pipeline with checks",
          "Database migrations run safely during release",
          "Smoke tests after deploy",
          "Release notes",
          "Rollback plan ready before deploying",
        ],
      },
      {
        title: "Operate",
        items: [
          "Health checks and uptime monitoring",
          "Error tracking and alerts",
          "Backups and tested recovery",
          "Runbooks for common incidents",
        ],
      },
    ],
    rule: "Agents can prepare a release. A human approves and watches it.",
    flow: ["Build", "Staging", "Smoke test", "Approve", "Production", "Monitor"],
    techniques: [
      "Keep deploy steps in docs/DEPLOYMENT.md so any agent or person can follow them.",
      "Ask the agent to write the runbook while it's building the feature.",
      "Rehearse a rollback in staging before you need it.",
    ],
    resources: [docs.twelve, docs.sre, docs.changelog, docs.semver, { name: "Hosting on CodeStack", href: "/explore?c=hosting" }],
  },
  {
    id: "advanced",
    title: "Advanced AI engineering workflows",
    phase: "ship",
    summary: "Subagents, skills, MCP and evaluations, used where they add value, not by default.",
    groups: [
      {
        title: "Extend agents",
        items: [
          "Skills for repeatable workflows (SKILL.md)",
          "MCP servers for external tools and data",
          "Specialized subagents for review, testing or research",
          "Path-scoped rules for large repos and monorepos",
        ],
      },
      {
        title: "Control",
        items: [
          "Automation boundaries: what agents may do alone",
          "Human-in-the-loop for consequential actions",
          "Cost-aware model selection",
          "Independent verification agents",
        ],
      },
      {
        title: "Improve",
        items: [
          "Evaluate agent output on real tasks",
          "Measure quality: bugs, review comments, rework",
          "Update instructions when agents repeat a mistake",
          "Audit instruction files for conflicts and stale rules",
        ],
      },
    ],
    rule: "Add agents, tools and automation only when they measurably help. More moving parts mean more to verify.",
    flow: ["Spot repeated work", "Skill or subagent", "Test on real tasks", "Measure", "Keep or remove"],
    techniques: [
      "Every time you correct an agent twice for the same thing, add one line to your instructions.",
      "Check which features your agent actually supports in its docs before building a workflow on them.",
      "Browse ready-made skills on CodeStack before writing your own.",
    ],
    resources: [docs.agentSkills, docs.claudeSkills, docs.codexSkills, docs.mcp, { name: "Agent skills on CodeStack", href: "/skills" }],
  },
]

/** Which instruction files each agent loads on its own, checked against each tool's docs. */
export const agentFiles: { agent: string; reads: string[]; scoped: string; skills: string; note: string; href: string }[] = [
  {
    agent: "OpenAI Codex",
    reads: ["AGENTS.md", "AGENTS.override.md", "~/.codex/AGENTS.md"],
    scoped: "Nested AGENTS.md from the repo root down to your working directory; closer files win",
    skills: ".agents/skills/ and ~/.codex/skills/",
    note: "Combined instructions stop at 32 KiB by default (project_doc_max_bytes). Extra filenames via project_doc_fallback_filenames.",
    href: docs.codexAgents.href,
  },
  {
    agent: "Claude Code",
    reads: ["CLAUDE.md", ".claude/CLAUDE.md", "CLAUDE.local.md", "~/.claude/CLAUDE.md", "AGENTS.md (when no CLAUDE.md)"],
    scoped: ".claude/rules/*.md with a paths: frontmatter; subdirectory CLAUDE.md loads when Claude works there",
    skills: ".claude/skills/<name>/SKILL.md",
    note: "Reads AGENTS.md only if there's no CLAUDE.md (v2.1.277+), or import it with @AGENTS.md. Run /init to draft a CLAUDE.md.",
    href: docs.claudeMemory.href,
  },
  {
    agent: "GitHub Copilot",
    reads: [".github/copilot-instructions.md", "AGENTS.md", "CLAUDE.md", "GEMINI.md"],
    scoped: ".github/instructions/*.instructions.md with applyTo globs",
    skills: "See the Copilot docs for your surface",
    note: "copilot-instructions.md works on every surface. AGENTS.md, CLAUDE.md and GEMINI.md work in the cloud agent, code review, VS Code chat and the CLI. Nested AGENTS.md in VS Code needs chat.useNestedAgentsMdFiles.",
    href: docs.copilot.href,
  },
  {
    agent: "Cursor",
    reads: [".cursor/rules/*.mdc", "AGENTS.md"],
    scoped: "Rules with globs auto-attach to matching files; nested AGENTS.md supported",
    skills: "See the Cursor docs",
    note: "Rules need the .mdc extension and frontmatter (alwaysApply, globs, description). The old .cursorrules file is legacy.",
    href: docs.cursor.href,
  },
  {
    agent: "Gemini CLI",
    reads: ["GEMINI.md", "~/.gemini/GEMINI.md"],
    scoped: "GEMINI.md in parent folders, plus folders the CLI touches while working",
    skills: "See the Gemini CLI docs",
    note: 'Set context.fileName to ["AGENTS.md", "GEMINI.md"] in .gemini/settings.json to share AGENTS.md. Check what loaded with /memory show.',
    href: docs.gemini.href,
  },
]

export interface PromptTemplate {
  id: string
  title: string
  when: string
  prompt: string
}

/** Copyable prompts. Placeholders are in [BRACKETS]. Each asks for evidence, not just conclusions. */
export const prompts: PromptTemplate[] = [
  {
    id: "recon",
    title: "Repository reconnaissance",
    when: "First session on any repo, before changing anything",
    prompt: `Explore this repository without modifying any files.

Report:
1. Stack: languages, frameworks, package manager, runtime versions (cite the files you read).
2. Structure: the main modules and what each owns.
3. Commands: how to install, run, build, lint, type check and test. Run the safe read-only ones and show their output.
4. Conventions: naming, formatting, error handling, state management, testing style. Give one example file for each.
5. Existing context docs: list any README, AGENTS.md, CLAUDE.md, docs/ files and what they cover.
6. Unknowns: anything you couldn't determine. Do not guess.

Output a concise report. Do not write code.`,
  },
  {
    id: "discovery",
    title: "Requirements discovery",
    when: "Starting a new project or a large feature",
    prompt: `I want to build [ONE-LINE IDEA]. Interview me to turn this into a project brief.

Rules:
- Ask one question at a time, most important first.
- Cover: the problem, target users, main user journeys, must-have features, non-goals, constraints (budget, stack, deadline, hosting, regions), success metrics, and risks.
- After each answer, note whether it's a confirmed fact, an assumption or still open.

When I say "done", write PROJECT_BRIEF.md with sections: Problem, Users, Journeys, Requirements (FR-1...), Non-functional requirements, Non-goals, Constraints, Assumptions, Open questions, Success metrics.`,
  },
  {
    id: "research",
    title: "Technical research",
    when: "Before choosing a library, service or approach",
    prompt: `Research options for [DECISION, e.g. "authentication for a Next.js app"] given these constraints: [CONSTRAINTS].

For each of 2 to 4 options:
- What it is, current version, license and pricing (link the official page you used).
- Fit with our stack in [FILES OR docs/TECH_STACK.md].
- Trade-offs, risks and lock-in.

Use official documentation only. If you can't verify something, say "unverified". Recommend one option and explain why, but don't implement anything.`,
  },
  {
    id: "context-plan",
    title: "Context-file planning",
    when: "After the brief exists, before implementation",
    prompt: `Read PROJECT_BRIEF.md and the repository.

Propose the minimum set of context documents this project needs, using this list as a menu, not a checklist: AGENTS.md, README.md, REQUIREMENTS.md, docs/ARCHITECTURE.md, docs/TECH_STACK.md, docs/DESIGN_SYSTEM.md, docs/DATABASE_SCHEMA.md, docs/API_SPEC.md, docs/INTEGRATIONS.md, docs/SECURITY.md, docs/TESTING_STRATEGY.md, docs/DEPLOYMENT.md, IMPLEMENTATION_PLAN.md, TASKS.md, DECISIONS.md.

For each proposed file: why it's needed, what it will contain, what it depends on. List files you deliberately left out and why.
Then generate them in dependency order, one at a time, marking anything uncertain as an open question. Stop after each file for my review.`,
  },
  {
    id: "architecture",
    title: "Architecture document",
    when: "Once requirements are agreed",
    prompt: `Using PROJECT_BRIEF.md and REQUIREMENTS.md, draft docs/ARCHITECTURE.md.

Include:
- Context: users and external systems (Mermaid diagram).
- Containers and modules with responsibilities and boundaries.
- Data flow for the two most important user journeys.
- Auth model, error handling, caching and background work.
- Technology choices with one-line reasons, and rejected alternatives.
- Risks, trade-offs and open questions.

Prefer the simplest design that meets the requirements. For each significant decision, also draft an ADR in docs/adr/. Don't write application code.`,
  },
  {
    id: "design-spec",
    title: "Design specification",
    when: "Before building UI",
    prompt: `Create docs/DESIGN_SYSTEM.md and docs/UI_UX_SPEC.md for [PRODUCT].

Brand and tone: [ADJECTIVES, REFERENCES OR SCREENSHOTS]. Existing tokens or components: [PATHS, if any].

DESIGN_SYSTEM.md: tokens (color with light and dark values, type scale, spacing, radius, shadow, motion), components with usage rules, accessibility rules (WCAG 2.2 AA).
UI_UX_SPEC.md: every screen with purpose, layout, components used, and its loading, empty, error and success states, plus responsive behavior at [BREAKPOINTS].

Reuse existing tokens and components where they exist. Flag any screen where requirements are unclear.`,
  },
  {
    id: "schema",
    title: "Database schema",
    when: "Before writing data access code",
    prompt: `Design the data model for [FEATURES] using [DATABASE].

Deliver:
1. docs/DATABASE_SCHEMA.md: entities, relationships (Mermaid ER diagram), constraints, indexes with the query each one serves, and tenant or user isolation rules.
2. The first migration in [MIGRATION TOOL AND PATH], with a down migration.
3. Seed data for local development.

Explain any denormalization. List access patterns you assumed. Don't run migrations; I'll review and run them.`,
  },
  {
    id: "integration",
    title: "External integration spec",
    when: "Before integrating payments, auth, email, AI or any third-party API",
    prompt: `We're integrating [PROVIDER] for [PURPOSE]. Official docs: [LINKS].

Write docs/INTEGRATIONS.md section for it:
- Exact SDK or API version, endpoints and methods we'll use (link each to its doc page).
- Auth and required environment variables (add them to .env.example without values).
- Webhooks: events, signature verification, retries, idempotency.
- Errors, rate limits, timeouts and how we'll map them.
- Sandbox setup and how we'll test it.

Only use methods you found in the linked docs. If something isn't documented, list it as an open question instead of guessing.`,
  },
  {
    id: "threat-model",
    title: "Threat model",
    when: "Before launch, and when adding auth, payments, uploads or AI features",
    prompt: `Create docs/THREAT_MODEL.md for [SYSTEM OR FEATURE] based on docs/ARCHITECTURE.md.

1. Assets worth protecting and who might attack them.
2. Trust boundaries and data flows (Mermaid diagram).
3. Threats per boundary using STRIDE, including prompt injection if the app or its agents read untrusted content.
4. For each threat: likelihood, impact, existing control, missing control.
5. A prioritized list of fixes, each mapped to a test that would prove it works.

Reference OWASP Top 10:2025 and ASVS where relevant. Don't change code.`,
  },
  {
    id: "breakdown",
    title: "Break down into tasks",
    when: "After architecture and before implementation",
    prompt: `Read PROJECT_BRIEF.md, REQUIREMENTS.md and docs/ARCHITECTURE.md. Create IMPLEMENTATION_PLAN.md and TASKS.md.

Each task must:
- Be small enough for one reviewable diff (roughly under 300 changed lines).
- Have an ID, a clear outcome, the files likely touched, dependencies on other tasks, the requirement IDs it covers, and acceptance criteria.
- Include how to verify it (tests or commands).

Order tasks so the app runs end to end as early as possible. Mark risky tasks. Don't implement anything yet.`,
  },
  {
    id: "implement",
    title: "Implement one task",
    when: "For every implementation task",
    prompt: `Implement task [TASK ID] from TASKS.md: [TASK TITLE].

Context: follow AGENTS.md, docs/CODING_STANDARDS.md and [RELEVANT DOCS].
Constraints: only touch files needed for this task. No new dependencies without asking. No unrelated refactors. Match the surrounding code style.
Acceptance criteria: [CRITERIA].

Steps:
1. Restate the task and list assumptions. Ask if anything is unclear.
2. Show a short plan, then implement.
3. Run [FORMAT, LINT, TYPECHECK, TEST COMMANDS] and show the output.
4. Summarize every changed file and why, update affected docs, and mark the task in TASKS.md.
Report anything skipped or failing honestly.`,
  },
  {
    id: "debug",
    title: "Debug a reproducible issue",
    when: "When something breaks",
    prompt: `Bug: [WHAT HAPPENS]. Expected: [WHAT SHOULD HAPPEN].
Reproduce: [STEPS OR COMMAND]. Error output:
[PASTE EXACT ERROR AND STACK TRACE]
Environment: [OS, RUNTIME, BROWSER, VERSION]. Already tried: [ATTEMPTS].

1. Reproduce it and show the output.
2. Find the root cause and explain it with file and line references. Don't fix yet.
3. Write a failing test that captures the bug.
4. Propose the smallest fix, implement it, and show the test now passes along with the full suite.`,
  },
  {
    id: "verify",
    title: "Run and verify tests",
    when: "Before every commit or pull request",
    prompt: `Verify the current changes.

Run, in order: [INSTALL], [FORMAT CHECK], [LINT], [TYPECHECK], [UNIT TESTS], [INTEGRATION OR E2E TESTS], [BUILD].
For each command report: the exact command, exit code, and the relevant output.

Then give a table: check | passed / failed / skipped / not run | notes.
Do not change tests to make them pass. Do not say "all tests pass" unless every command above ran and passed.`,
  },
  {
    id: "review",
    title: "Independent code review",
    when: "After implementation, ideally in a fresh session or with a different model",
    prompt: `Review the diff of [BRANCH OR COMMIT RANGE] against main. You didn't write this code; be skeptical.

Check: correctness against [TASK OR ACCEPTANCE CRITERIA], edge cases, error handling, security (auth, validation, injection, secrets), performance, test coverage, consistency with docs/CODING_STANDARDS.md, and unnecessary changes or dependencies.

For each finding: file and line, severity (blocker, major, minor), why it matters, and a suggested fix. Separate confirmed problems from suspicions. Don't edit files.`,
  },
  {
    id: "perf",
    title: "Performance investigation",
    when: "When something is slow",
    prompt: `[PAGE, ENDPOINT OR JOB] is slow: [MEASUREMENT, e.g. "p95 1.8 s, target 300 ms"].

1. Measure a baseline with [TOOL OR COMMAND] and show the numbers.
2. Profile and identify the top three costs, with evidence.
3. For each, propose one change and its expected gain.
4. Implement the most valuable change only, re-measure, and show before and after.
Don't optimize anything you haven't measured.`,
  },
  {
    id: "readiness",
    title: "Production readiness",
    when: "Before the first launch and before major releases",
    prompt: `Audit this project for production readiness. Read docs/DEPLOYMENT.md, docs/SECURITY.md and docs/TESTING_STRATEGY.md first.

Check and report pass, fail or unknown, with evidence, for: environment config and secrets, auth and authorization, input validation, error tracking and logging, health checks, backups and a tested restore, database migrations, rate limiting, security headers, dependency audit, accessibility basics, performance budgets, rollback plan, and runbooks.

List blockers first. For each gap, the smallest fix. Don't deploy anything.`,
  },
  {
    id: "handoff",
    title: "Session handoff",
    when: "At the end of every working session",
    prompt: `We're ending this session. Update AGENT_HANDOFF.md with:

- Goal of the session and what was completed (task IDs).
- Current state: what works, what's in progress, what's broken.
- Decisions made and why (also add significant ones to DECISIONS.md).
- Commands run and their results (tests, builds).
- Known issues and risks (also update KNOWN_ISSUES.md).
- Exact next steps, in order, for the next session.

Keep it under 60 lines. Be factual; don't mark anything done that wasn't verified.`,
  },
]

export const promptPairs: { topic: string; weak: string; strong: string }[] = [
  {
    topic: "Feature",
    weak: "Build a todo app with login.",
    strong:
      "Implement task T-04 (create a task) from TASKS.md. Use the existing form components in src/components/form and the tasks table from docs/DATABASE_SCHEMA.md. Validate title (1 to 120 chars) with Zod. Done when the new tests in tests/tasks.test.ts pass and lint, typecheck and the full test suite pass. Don't touch auth.",
  },
  {
    topic: "Bug",
    weak: "Login is broken, fix it.",
    strong:
      "Login fails with 401 for valid users since commit a1b2c3. Steps: run npm run dev, sign in as test@example.com / [PASSWORD]. Error from the server log is pasted below. Find the root cause first, write a failing test, then make the smallest fix.",
  },
  {
    topic: "Design",
    weak: "Make the dashboard look better.",
    strong:
      "Restyle the dashboard to follow docs/DESIGN_SYSTEM.md: use the spacing scale and the Card component, keep existing data and behavior, add empty and loading states from docs/UI_UX_SPEC.md, and check it at 375px and 1440px. Attach screenshots of before and after.",
  },
  {
    topic: "Integration",
    weak: "Add Stripe payments.",
    strong:
      "Add a Stripe Checkout session for the Pro plan per docs/INTEGRATIONS.md. Use only methods from the linked Stripe docs, verify webhook signatures, make the webhook handler idempotent, and add the env vars to .env.example. Test with Stripe test cards and show the webhook test output.",
  },
]

/** The repeatable workflow, start to finish, with the prompt to use at each step. */
export const workflow: { title: string; goal: string; prompt?: string; output: string; exit: string }[] = [
  {
    title: "Repository reconnaissance",
    goal: "Learn the stack, structure and conventions before changing anything.",
    prompt: "recon",
    output: "A report of stack, modules, commands, conventions and unknowns.",
    exit: "You agree with the report, and the commands it ran worked.",
  },
  {
    title: "Requirements discovery",
    goal: "Turn the idea into decisions you've confirmed.",
    prompt: "discovery",
    output: "PROJECT_BRIEF.md with facts, assumptions and open questions separated.",
    exit: "No open question blocks the MVP.",
  },
  {
    title: "Research",
    goal: "Verify technical choices against official docs.",
    prompt: "research",
    output: "Options with trade-offs and links, and one recommendation.",
    exit: "Every key dependency is chosen, with a link to its docs.",
  },
  {
    title: "Context generation",
    goal: "Write only the context documents this project needs, in dependency order.",
    prompt: "context-plan",
    output: "AGENTS.md plus the selected docs: architecture, data, API, design, security, testing.",
    exit: "Each document is reviewed; unknowns are listed, not guessed.",
  },
  {
    title: "Human review",
    goal: "You check requirements, architecture, data model, integrations, security and costs.",
    output: "Approved documents, and ADRs for significant decisions.",
    exit: "You'd be comfortable if another developer built from these docs.",
  },
  {
    title: "Implementation planning",
    goal: "Break the work into small, testable tasks.",
    prompt: "breakdown",
    output: "IMPLEMENTATION_PLAN.md and TASKS.md with dependencies and acceptance criteria.",
    exit: "Every task fits in one reviewable diff and maps to requirements.",
  },
  {
    title: "Implementation",
    goal: "One coherent task at a time, following the agreed docs.",
    prompt: "implement",
    output: "A focused diff, with checks run and a summary of changed files.",
    exit: "Acceptance criteria met, and you've read the diff.",
  },
  {
    title: "Verification and doc updates",
    goal: "Prove it works with real commands, and keep docs in sync.",
    prompt: "verify",
    output: "Check results table, updated docs and remaining risks.",
    exit: "Every check ran and passed, or failures are recorded honestly.",
  },
  {
    title: "Handoff and maintenance",
    goal: "Leave the project so the next session, or person, can continue.",
    prompt: "handoff",
    output: "AGENT_HANDOFF.md, TASKS.md, DECISIONS.md and KNOWN_ISSUES.md updated.",
    exit: "A fresh session can continue from the handoff alone.",
  },
]

/** A small project taken from vague idea to verified first task. */
export const example: { title: string; body: string }[] = [
  {
    title: "1. The vague idea",
    body: `"I want a simple app where small teams can track tasks, with a paid plan."

Too vague for an agent: who are the users, what is "simple", what does paying unlock, what stack, where is it hosted?`,
  },
  {
    title: "2. The improved brief (PROJECT_BRIEF.md)",
    body: `Name: Tasklight
Problem: Teams of 2 to 10 people lose track of small tasks in chat.
Users: Team owner (creates workspace, pays), members (create and complete tasks).
Journeys: sign up, create workspace, invite member, add task, assign, complete.
MVP: workspaces, invites by email, tasks with title, assignee, due date and status.
Paid plan: Free up to 3 members; Pro ($6 per workspace per month) for unlimited members.
Non-goals: comments, file attachments, mobile apps, integrations.
Constraints: Next.js, Postgres, hosted on Vercel and Neon, payments through a merchant of record.
Success: a team of 3 can go from sign-up to first completed task in under 5 minutes.`,
  },
  {
    title: "3. Requirements and acceptance criteria",
    body: `FR-3 Create task: a member can create a task with a title (1 to 120 chars), optional assignee and due date.
  Given I'm a member of workspace W
  When I submit a task titled "Ship v1"
  Then it appears at the top of W's task list with status "open"
  And members of other workspaces can't see it

FR-7 Member limit: a Free workspace can't have more than 3 members.
  Given W is on Free with 3 members
  When the owner invites a 4th
  Then the invite is blocked with an upgrade prompt`,
  },
  {
    title: "4. Architecture and design decisions",
    body: `Architecture: one Next.js app (UI plus route handlers), Postgres via an ORM, background email through a queue-less provider call. No microservices.
ADR-0001: Use a merchant of record for billing so we don't handle global sales tax ourselves.
ADR-0002: Row-level workspace isolation: every query filters by workspace_id from the session, never from the request body.
Design: tokens and components in docs/DESIGN_SYSTEM.md; every list has empty, loading and error states.`,
  },
  {
    title: "5. Database and API considerations",
    body: `Tables: users, workspaces, memberships (user_id, workspace_id, role), tasks (workspace_id, title, assignee_id, due_on, status), subscriptions.
Constraints: unique (user_id, workspace_id) on memberships; tasks.title length check; foreign keys with on delete cascade for tasks.
Index: tasks (workspace_id, status, created_at desc) for the main list.
API: POST /api/tasks, PATCH /api/tasks/:id, documented in docs/API_SPEC.md. Billing webhooks documented in docs/WEBHOOKS.md.`,
  },
  {
    title: "6. Security requirements",
    body: `- Every API route checks the session and membership of the workspace.
- workspace_id always comes from the server-side membership lookup.
- Invite tokens are random, single-use and expire in 7 days.
- Billing webhook verifies the provider signature and is idempotent by event ID.
- Rate limit sign-in and invites. Secrets only in environment variables.`,
  },
  {
    title: "7. Testing strategy",
    body: `Unit: validation and plan-limit rules.
Integration: task API with a test database; a member of workspace A can't read B's tasks.
End-to-end (Playwright): sign up, create workspace, add task, complete it.
Webhook: replay a recorded test event twice and assert one subscription change.
CI runs lint, typecheck, tests and build on every pull request.`,
  },
  {
    title: "8. Initial implementation plan (TASKS.md)",
    body: `T-01 Project setup, lint, typecheck, CI (no features)
T-02 Database schema and first migration (FR-1 to FR-4)
T-03 Auth and workspace creation (FR-1, FR-2)
T-04 Create and list tasks (FR-3)  depends on T-02, T-03
T-05 Complete and assign tasks (FR-4, FR-5)
T-06 Invites and member limit (FR-6, FR-7)
T-07 Billing with webhooks (FR-8)
T-08 Empty, loading and error states; accessibility pass`,
  },
  {
    title: "9. A precise implementation prompt",
    body: `Implement T-04 from TASKS.md: create and list tasks (FR-3).
Follow AGENTS.md, docs/CODING_STANDARDS.md, docs/API_SPEC.md and docs/UI_UX_SPEC.md (Task list screen).
Only touch: src/app/(app)/tasks/*, src/server/tasks/*, tests/tasks/*.
Validate input with the existing schema helpers. workspace_id comes from the membership lookup.
Done when: the FR-3 acceptance criteria pass as integration tests, the list shows empty and error states, and lint, typecheck, tests and build pass. Show the command output.`,
  },
  {
    title: "10. Verification and review",
    body: `Agent report: 4 files changed, 2 test files added.
  npm run lint        exit 0
  npm run typecheck   exit 0
  npm test            38 passed, 0 failed, 0 skipped
  npm run build       exit 0
You: read the diff, try it in the browser, and check that a second workspace can't see the task.
Fresh review session: one finding (missing max length on the client) fixed in a follow-up commit.
Handoff: T-04 marked done in TASKS.md; next is T-05.`,
  },
]

export const habits: { title: string; how: string }[] = [
  { title: "Inspect before changing", how: "Start every task by having the agent read the relevant files and report what it found." },
  { title: "Define success first", how: "Write acceptance criteria before implementation, and check against them after." },
  { title: "Own the product decisions", how: "You decide scope, users and trade-offs. The agent proposes and implements." },
  { title: "Write down big decisions", how: "Add an ADR or a line in DECISIONS.md so no one, human or agent, re-argues them." },
  { title: "Reuse conventions", how: "Point agents to existing components, helpers and patterns instead of letting them invent new ones." },
  { title: "Work in small increments", how: "One task, one diff, one review. If a diff is too big to read, split the task." },
  { title: "Keep docs current", how: "Update the affected doc in the same change as the code, or the next agent works from stale facts." },
  { title: "Verify with real tools", how: "Run the tests, type checker, linter and build yourself, or read the agent's actual output." },
  { title: "Read every diff", how: "Never accept changes you haven't read. Ask for an explanation when something is unclear." },
  { title: "Check security and data integrity", how: "Review auth, validation and data access on every change that touches them." },
  { title: "Measure before optimizing", how: "Baseline, change one thing, measure again, and keep only what helped." },
  { title: "Keep a way back", how: "Commit before each agent task, isolate risky changes, and know how to roll back." },
  { title: "Avoid needless complexity", how: "Question every new dependency, abstraction and service the agent adds." },
  { title: "Manage context on purpose", how: "Start fresh sessions for new tasks, and feed the agent only the docs it needs." },
  { title: "Delegate only when it helps", how: "Use subagents or parallel agents for clearly separate work, not by default." },
  { title: "Treat output as unverified", how: "AI-generated code is a draft until tests and review say otherwise." },
  { title: "Keep humans accountable", how: "People approve production deploys, migrations, payments and anything users can't undo." },
]

export const aiResources: { group: string; links: { name: string; href: string }[] }[] = [
  {
    group: "Agent instructions",
    links: [docs.agentsMd, docs.claudeMemory, docs.codexAgents, docs.copilot, docs.vscode, docs.cursor, docs.gemini],
  },
  {
    group: "Working with agents",
    links: [docs.claudeBest, docs.codexRepo, docs.specKit, docs.agentSkills, docs.claudeSkills, docs.codexSkills, docs.mcp],
  },
  { group: "Security", links: [docs.owaspAi, docs.owaspInjection, docs.top10, docs.asvs, docs.threat, docs.secrets] },
  { group: "Specs and architecture", links: [docs.openapi, docs.jsonSchema, docs.c4, docs.adr, docs.mermaid, docs.diataxis] },
  {
    group: "Shipping",
    links: [docs.twelve, docs.sre, docs.conventional, docs.changelog, docs.semver, docs.worktree, docs.playwright, docs.vitals],
  },
]
