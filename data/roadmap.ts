// The Modern Developer Roadmap: idea to production, including AI-assisted development.
// Language and framework agnostic. Each topic is a step on the main path; its groups are the
// boxes that branch off it, and each group's items are the checklist shown in the side panel.

export type PhaseId = "plan" | "build" | "secure" | "verify" | "ship" | "run" | "grow"
export type Level = 1 | 2 | 3 | 4 | 5

export interface RoadmapGroup {
  title: string
  items: string[]
  /** Useful for many projects, but not every project needs it. */
  optional?: boolean
}

export interface RoadmapTopic {
  id: string
  title: string
  phase: PhaseId
  level: Level
  summary: string
  groups: RoadmapGroup[]
  /** The one rule to remember. */
  rule?: string
  /** A short sequence, drawn as a mini flowchart. */
  flow?: string[]
  /** Practical techniques and rules of thumb. */
  techniques?: string[]
  resources?: { name: string; href: string }[]
  optional?: boolean
}

export const phases: { id: PhaseId; name: string; blurb: string; color: string }[] = [
  { id: "plan", name: "Plan", blurb: "Decide what to build, and how, before writing code.", color: "#7FBCFF" },
  { id: "build", name: "Build", blurb: "Write code that people and agents can maintain.", color: "#C4A1FF" },
  { id: "secure", name: "Secure", blurb: "Design security in. Never bolt it on at the end.", color: "#FF8A8A" },
  { id: "verify", name: "Verify", blurb: "Prove it works, is fast, and can be found.", color: "#5CF2C4" },
  { id: "ship", name: "Ship", blurb: "Release safely, with a way back.", color: "#FFDC58" },
  { id: "run", name: "Run", blurb: "Production is never a black box.", color: "#E7F192" },
  { id: "grow", name: "Grow", blurb: "Keep it healthy, and let others help.", color: "#FF9EE6" },
]

export const levels: { level: Level; name: string; blurb: string; topics: string[] }[] = [
  { level: 1, name: "Beginner", blurb: "The fundamentals every path builds on.", topics: ["HTML, CSS and JavaScript", "Git and GitHub", "HTTP and DNS", "Basic security", "First tests"] },
  { level: 2, name: "Developer", blurb: "Ship real features on a modern stack.", topics: ["A framework", "TypeScript", "APIs", "Databases", "Authentication", "CI/CD", "Accessibility", "SEO", "Performance"] },
  { level: 3, name: "Professional", blurb: "Own systems, not just features.", topics: ["Architecture", "Security", "Observability", "Cloud and containers", "Testing strategy", "Scalability", "Privacy"] },
  { level: 4, name: "AI Developer", blurb: "Build with and for AI, safely.", topics: ["AI-assisted coding", "Coding agents", "MCP", "LLM APIs", "RAG", "AI evaluation", "Agent security", "AI observability"] },
  { level: 5, name: "Production Engineer", blurb: "Keep critical systems up, secure and affordable.", topics: ["Threat modeling", "Supply-chain security", "Infrastructure as code", "Disaster recovery", "SRE", "Cost engineering", "Compliance", "Incident response"] },
]

export const topics: RoadmapTopic[] = [
  // Plan
  {
    id: "foundations",
    title: "Foundations",
    phase: "plan",
    level: 1,
    summary: "Know the problem, who has it, and what done looks like before a single line of code.",
    groups: [
      { title: "The problem", items: ["What problem are you solving?", "Who has it, and why does it matter?", "What alternatives already exist?", "What makes this different?", "What is the smallest useful version?"] },
      { title: "Requirements", items: ["Functional requirements", "Non-functional requirements", "Performance and scalability targets", "Security and privacy requirements", "Accessibility and SEO requirements", "Compliance requirements"] },
      { title: "Define success", items: ["What does done mean?", "Which metrics decide success?", "What should NOT be built?"] },
    ],
    rule: "Don't let an AI coding agent decide your product requirements for you.",
  },
  {
    id: "research",
    title: "Research",
    phase: "plan",
    level: 2,
    summary: "Check what exists before you build it. The best code is code you didn't have to write.",
    groups: [
      { title: "Existing solutions", items: ["Study competitors", "Search GitHub", "Search package registries", "Check existing standards and APIs"] },
      { title: "Feasibility", items: ["Technical feasibility", "Security implications", "Operational and running cost"] },
      { title: "Licensing", items: ["Is the license compatible?", "Is it actively maintained?", "Is it secure and reputable?"] },
    ],
    flow: ["Does it already exist?", "Can we use it?", "Is the license compatible?", "Is it maintained?", "Is it secure?"],
    resources: [
      { name: "Explore the CodeStack directory", href: "/explore" },
      { name: "Open Source Guides", href: "https://opensource.guide" },
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    phase: "plan",
    level: 3,
    summary: "Set the shape of the system before asking an agent to generate it. Start simple and grow on evidence.",
    groups: [
      { title: "Core decisions", items: ["Architecture style", "Technology choices", "Repository structure", "Data model", "API boundaries"] },
      { title: "Identity", items: ["Authentication model", "Authorization model", "Session strategy"] },
      { title: "Runtime", items: ["State management", "Caching strategy", "Storage", "Background jobs and queues", "External services"] },
      { title: "Operations", items: ["Error handling", "Logging and monitoring", "Deployment model"] },
      { title: "Decision records", items: ["docs/architecture.md", "docs/decisions/ with one ADR per important choice", "Diagrams that stay up to date"] },
    ],
    rule: "A well-designed monolith beats premature microservices. Reach for Kubernetes, Kafka or GraphQL when a measured bottleneck asks for it.",
    flow: ["Start simple", "Measure", "Find the bottleneck", "Optimize", "Scale only where needed"],
    resources: [
      { name: "Architecture Decision Records", href: "https://adr.github.io" },
      { name: "The Twelve-Factor App", href: "https://12factor.net" },
      { name: "Monolith First, Martin Fowler", href: "https://martinfowler.com/bliki/MonolithFirst.html" },
    ],
  },
  {
    id: "design",
    title: "Design",
    phase: "plan",
    level: 2,
    summary: "A deliberate visual system, so the product looks designed, not generated.",
    groups: [
      { title: "Identity", items: ["Visual identity", "Typography hierarchy", "Color system", "Spacing system"] },
      { title: "Behavior", items: ["Responsive behavior", "Motion with a purpose", "Micro-interactions"] },
      { title: "Every state", items: ["Loading states", "Empty states", "Error states", "Success, disabled and offline states", "Permission denied"] },
    ],
    rule: "AI-generated UI is no excuse for poor design. Decide the system first, then let tools apply it.",
    resources: [
      { name: "Design tools on CodeStack", href: "/explore?c=design-tools" },
      { name: "UI kits on CodeStack", href: "/explore?c=components" },
      { name: "Design skills for agents", href: "/skills?f=design" },
    ],
  },
  {
    id: "ux",
    title: "UX",
    phase: "plan",
    level: 2,
    summary: "Make the next action obvious and every action answer back.",
    groups: [
      { title: "First impression", items: ["One clear primary action", "A real product demonstration", "Good onboarding"] },
      { title: "Getting around", items: ["Navigation hierarchy", "Search", "Keyboard navigation", "Mobile UX"] },
      { title: "Doing things", items: ["Forms with clear validation", "Useful empty states", "Feedback after every action"] },
    ],
    resources: [{ name: "Laws of UX", href: "https://lawsofux.com" }],
  },
  {
    id: "accessibility",
    title: "Accessibility",
    phase: "plan",
    level: 2,
    summary: "Build it in from the first component. A final audit finds problems too late and too expensive to fix.",
    groups: [
      { title: "Semantics", items: ["Semantic HTML first", "Correct heading hierarchy", "Form labels", "ARIA only when HTML can't express it"] },
      { title: "Keyboard and focus", items: ["Everything works by keyboard", "Visible focus", "Focus management in modals and menus", "Accessible navigation"] },
      { title: "Perception", items: ["Color contrast", "Never rely on color alone", "Alt text", "Respect reduced motion", "Error announcements"] },
      { title: "Testing", items: ["Test keyboard-only", "Test with a screen reader", "Automated checks in CI"] },
    ],
    rule: "Target WCAG 2.2 AA for any serious web application.",
    resources: [
      { name: "WCAG 2.2", href: "https://www.w3.org/TR/WCAG22/" },
      { name: "ARIA Authoring Practices", href: "https://www.w3.org/WAI/ARIA/apg/" },
    ],
  },

  // Build
  {
    id: "development",
    title: "Development",
    phase: "build",
    level: 2,
    summary: "Readable, typed, boring code. Clarity is what lets people and agents change it safely later.",
    groups: [
      { title: "Code quality", items: ["Consistent naming", "Small functions and components", "Clear abstractions, but none premature", "Avoid duplication", "Handle errors explicitly", "Keep business logic separate", "Document non-obvious decisions"] },
      { title: "Type safety", items: ["Static typing with strict mode", "Avoid any", "Validate external data at the edges", "Type API boundaries, config and database access"] },
      { title: "Dependencies", items: ["Prefer platform APIs", "Avoid huge libraries for tiny jobs", "Remove unused packages", "Check bundle impact before adding"] },
      { title: "Git", items: ["Meaningful commits", "Small pull requests", "Protected main branch", "Required checks and review", "No secrets, no generated junk"] },
    ],
    techniques: ["Remove unnecessary work before optimizing anything", "Avoid duplicate calculations; cache expensive ones", "Pick the right data structure", "Move expensive work off the main thread", "Parallelize independent work; stream large responses", "Don't install a 2 MB package to do what Math.round() does"],
    resources: [
      { name: "Dev tools on CodeStack", href: "/explore?c=devtools" },
      { name: "Conventional Commits", href: "https://www.conventionalcommits.org" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend craft",
    phase: "build",
    level: 2,
    summary: "Ship less JavaScript, render on the server where it helps, and keep the main thread free.",
    groups: [
      { title: "Ship less", items: ["Code-split large features", "Lazy-load non-critical components", "Tree-shake unused code", "Defer non-critical scripts", "Minimize third-party scripts", "Measure bundle size in CI"] },
      { title: "Assets", items: ["Modern image formats", "Responsive image sizes", "Preload only truly critical assets", "Self-host and subset fonts"] },
      { title: "Rendering", items: ["Prefer server rendering where it fits", "Avoid needless client-side fetching", "Virtualize very long lists", "Debounce input, throttle scroll and resize"] },
      { title: "React", items: ["You might not need an effect", "Keep state close to where it's used", "Avoid unnecessary global state", "Memoize only when profiling justifies it", "Profile first, never optimize on assumptions"] },
    ],
    resources: [
      { name: "You Might Not Need an Effect", href: "https://react.dev/learn/you-might-not-need-an-effect" },
      { name: "Frameworks on CodeStack", href: "/explore?c=frameworks" },
      { name: "Frontend skills for agents", href: "/skills?f=frontend" },
    ],
  },
  {
    id: "ai-development",
    title: "AI-assisted development",
    phase: "build",
    level: 4,
    summary: "Agents can read, edit and run your repository. You stay responsible for every line they write.",
    groups: [
      { title: "Give context", items: ["Project and architecture docs", "Coding conventions and existing patterns", "Testing requirements and definition of done", "Security constraints", "What the agent can and cannot modify"] },
      { title: "Context files", items: ["AGENTS.md or CLAUDE.md", "CONTRIBUTING.md", "README.md", "Only the relevant files for the task"] },
      { title: "Small tasks", items: ["Never: \"Build my entire SaaS\"", "Better: one feature, explicit scope, tests, and what not to touch", "Ask for a plan before large changes", "Ask it to explain before modifying when unsure"] },
      { title: "Review every diff", items: ["Read and understand the change", "Check dependencies, auth and permissions", "Check database, API and network calls", "Check shell commands and file operations", "Run tests, lint, types and security scans"] },
    ],
    rule: "If an agent made a change, you should be able to explain what changed, why, what could break, and how it was tested.",
    flow: ["Understand the repo", "Analyze requirements", "Propose a plan", "Implement one feature", "Run tests", "Review the diff", "Fix failures", "Security checks", "Commit"],
    techniques: ["Relevant files, then architecture, then task, then constraints, then tests: this order improves accuracy and cost", "Give the AI the error, the relevant code and the expected behavior", "Read error messages completely before asking", "Keep agent context lean: not 500 files and every past conversation"],
    resources: [
      { name: "AGENTS.md", href: "https://agents.md" },
      { name: "GitHub Copilot best practices", href: "https://docs.github.com/en/copilot/get-started/best-practices" },
      { name: "Agent skills on CodeStack", href: "/skills" },
      { name: "AI tools on CodeStack", href: "/explore?c=ai" },
    ],
  },
  {
    id: "agent-workflow",
    title: "Coding-agent workflow",
    phase: "build",
    level: 4,
    summary: "The definition of done for every agent task. Far more useful than telling an AI not to look vibe-coded.",
    groups: [
      { title: "Understand", items: ["Inspect the existing project", "Understand the requirements", "Create an implementation plan", "Identify dependencies"] },
      { title: "Build", items: ["Check existing components before creating new ones", "Follow the existing design system", "Implement incrementally"] },
      { title: "Check", items: ["Run lint and type checks", "Run tests", "Inspect the UI", "Check responsive layouts", "Check accessibility", "Check SEO", "Check security", "Check performance"] },
      { title: "Finish", items: ["Review its own changes", "Remove unnecessary code", "Only then call the task complete"] },
    ],
    rule: "Don't let the coding agent decide architecture blindly.",
  },
  {
    id: "api",
    title: "API design",
    phase: "build",
    level: 2,
    summary: "A predictable contract that's documented, validated and safe to retry.",
    groups: [
      { title: "Contract", items: ["Consistent naming and HTTP semantics", "Validation on every input", "One consistent error format", "Versioning strategy"] },
      { title: "Collections", items: ["Pagination (cursor for large sets)", "Filtering and sorting", "Return only the fields needed"] },
      { title: "Reliability", items: ["Authentication and authorization", "Rate limiting", "Idempotency keys for retries", "Timeouts, and retries with exponential backoff"] },
      { title: "Docs", items: ["OpenAPI specification", "Readable API docs", "SDKs and webhooks where useful"] },
    ],
    techniques: ["Compress responses and set HTTP caching headers", "Use ETags where they fit", "Batch requests instead of chaining several round trips", "Reuse connections"],
    resources: [
      { name: "OpenAPI Initiative", href: "https://www.openapis.org" },
      { name: "Idempotent requests, Stripe", href: "https://docs.stripe.com/api/idempotent_requests" },
    ],
  },
  {
    id: "data",
    title: "Data and caching",
    phase: "build",
    level: 3,
    summary: "Optimize the query before you scale the database, and cache with a clear invalidation plan.",
    groups: [
      { title: "Queries", items: ["Index real query patterns, but don't over-index", "Avoid SELECT *", "Avoid N+1 queries; batch instead", "Analyze slow queries", "Transactions where needed"] },
      { title: "At scale", items: ["Connection pooling", "Cursor pagination", "Archive old data", "Backups you have actually restored"] },
      { title: "Cache layers", items: ["Browser cache (Cache-Control)", "CDN cache", "Application cache (Redis or in-memory)", "Database last"] },
      { title: "Invalidation", items: ["TTLs", "Stale-while-revalidate", "ETags", "Cache warming for hot paths"] },
    ],
    rule: "Optimize the query before scaling the database.",
    flow: ["Browser cache", "CDN cache", "Application cache", "Database"],
    resources: [
      { name: "Use The Index, Luke", href: "https://use-the-index-luke.com" },
      { name: "HTTP caching, MDN", href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching" },
      { name: "Databases on CodeStack", href: "/explore?c=databases" },
    ],
  },
  {
    id: "i18n",
    title: "Internationalization",
    phase: "build",
    level: 3,
    optional: true,
    summary: "Plan for other languages early. Retrofitting i18n touches every string in the app.",
    groups: [
      { title: "Setup", items: ["i18n architecture", "Translation files", "Unicode everywhere"] },
      { title: "Locale-aware", items: ["Dates and time zones", "Numbers and currency", "Right-to-left layouts"] },
      { title: "Search", items: ["Language-specific SEO", "hreflang tags"] },
    ],
    resources: [
      { name: "Localized versions, Google", href: "https://developers.google.com/search/docs/specialty/international/localized-versions" },
      { name: "i18next", href: "https://www.i18next.com" },
    ],
  },

  // Secure
  {
    id: "appsec",
    title: "Application security",
    phase: "secure",
    level: 3,
    summary: "Anchor on OWASP Top 10:2025 for awareness and OWASP ASVS when you need a verifiable standard.",
    groups: [
      { title: "OWASP Top 10:2025", items: ["A01 Broken Access Control", "A02 Security Misconfiguration", "A03 Software Supply Chain Failures", "A04 Cryptographic Failures", "A05 Injection", "A06 Insecure Design", "A07 Authentication Failures", "A08 Software or Data Integrity Failures", "A09 Security Logging and Alerting Failures", "A10 Mishandling of Exceptional Conditions"] },
      { title: "Identity", items: ["Authentication", "Authorization on every request", "API authorization", "Session management", "Password hashing", "Brute-force protection"] },
      { title: "Input and output", items: ["Input validation", "Output encoding and XSS protection", "SQL, NoSQL and command injection prevention", "SSRF protection", "Secure file uploads"] },
      { title: "Browser and transport", items: ["Security headers", "Content Security Policy", "CORS", "CSRF protection", "Secure cookies", "Encryption in transit and at rest"] },
      { title: "Operations", items: ["Rate limiting", "Secrets management", "Dependency auditing", "Logging without leaking sensitive data", "Remove unused endpoints and ports"] },
    ],
    rule: "Least privilege is both a security and an architecture optimization.",
    resources: [
      { name: "OWASP Top 10:2025", href: "https://top10.owasp.org/2025/" },
      { name: "OWASP ASVS", href: "https://owasp.org/www-project-application-security-verification-standard/" },
      { name: "OWASP Cheat Sheet Series", href: "https://cheatsheetseries.owasp.org" },
      { name: "Content Security Policy, MDN", href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP" },
    ],
  },
  {
    id: "agent-security",
    title: "Agent and MCP security",
    phase: "secure",
    level: 4,
    summary: "Treat coding agents and MCP servers as privileged automation, not magical employees.",
    groups: [
      { title: "Agent permissions", items: ["Least privilege", "Sandboxed execution", "Restrict filesystem, network and shell", "Require approval for dangerous actions", "No production secrets, SSH keys or cloud credentials"] },
      { title: "MCP servers", items: ["Install only trusted servers", "Review source, tools and permissions", "Pin versions", "Remove unused integrations", "Audit changes"] },
      { title: "Gates", items: ["Agents never bypass CI checks", "Agents never push to protected branches", "Human approval before merge"] },
    ],
    rule: "Every arrow from MCP server to tool to permission to external system is an attack surface.",
    flow: ["MCP server", "Tool", "Permission", "External system"],
    resources: [
      { name: "MCP security best practices", href: "https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices" },
      { name: "OWASP GenAI Security Project", href: "https://genai.owasp.org" },
    ],
  },
  {
    id: "supply-chain",
    title: "Supply chain and secrets",
    phase: "secure",
    level: 5,
    summary: "Every dependency, action and credential is part of your attack surface.",
    groups: [
      { title: "Dependencies", items: ["Commit lockfiles", "Review new packages: owner, maintenance, reputation", "Scan for vulnerabilities in CI", "Automate updates with Dependabot or Renovate", "Remove unused packages"] },
      { title: "Build and release", items: ["Pin critical GitHub Actions", "Scan container images", "Protect package publishing and release credentials", "Provenance and SBOMs where appropriate"] },
      { title: "Secrets", items: [".env ignored, .env.example committed", "Secret scanning and push protection", "A secret manager in production", "Separate dev, staging and prod secrets", "Rotate anything that leaked", "Never paste secrets into an AI model"] },
    ],
    resources: [
      { name: "OpenSSF Scorecard", href: "https://scorecard.dev" },
      { name: "SLSA framework", href: "https://slsa.dev" },
      { name: "GitHub secret scanning", href: "https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning" },
      { name: "Renovate", href: "https://docs.renovatebot.com" },
    ],
  },
  {
    id: "privacy",
    title: "Privacy and payments",
    phase: "secure",
    level: 3,
    summary: "Collect less, keep it shorter, and let established providers handle money.",
    groups: [
      { title: "Privacy", items: ["Data inventory", "Data minimization and retention policy", "Privacy policy, and consent where required", "Export and delete user data", "Don't log sensitive data", "Don't send sensitive data to AI APIs needlessly"] },
      { title: "Payments", optional: true, items: ["Use an established provider; never store raw card data", "Verify webhooks", "Idempotency and a payment state machine", "Refunds, failures and fraud controls", "Audit logs"] },
    ],
    resources: [{ name: "Webhooks, Stripe", href: "https://docs.stripe.com/webhooks" }],
  },

  // Verify
  {
    id: "testing",
    title: "Testing and quality",
    phase: "verify",
    level: 2,
    summary: "Test where failure hurts most first, then check it in real browsers and devices.",
    groups: [
      { title: "Automated tests", items: ["Unit tests for business logic", "Integration tests for APIs, data and auth", "End-to-end tests for critical journeys", "Security tests: authorization and fuzzing"] },
      { title: "Real-world checks", items: ["Accessibility testing", "Browser testing", "Mobile testing"] },
      { title: "In production", items: ["Error monitoring", "Analytics", "Performance monitoring"] },
    ],
    flow: ["Authentication", "Authorization", "Payments", "Data integrity", "Core business logic", "Critical user flows"],
    techniques: ["High-risk code gets the high-value tests first", "Use git bisect to find the commit that broke something", "Test failure paths, not only the happy path"],
    resources: [
      { name: "Playwright", href: "https://playwright.dev" },
      { name: "Vitest", href: "https://vitest.dev" },
      { name: "Testing skills for agents", href: "/skills?f=testing" },
    ],
  },
  {
    id: "quality-gates",
    title: "Quality gates",
    phase: "verify",
    level: 3,
    summary: "Automate the checks so nothing, and no agent, can skip them.",
    groups: [
      { title: "On every PR", items: ["Lint", "Type check", "Unit and integration tests", "Build"] },
      { title: "Security", items: ["Code scanning", "Dependency scanning", "Secret scanning"] },
      { title: "Merge rules", items: ["Required checks", "Human review", "Protected main branch"] },
    ],
    rule: "AI agents should never be able to bypass these gates.",
    flow: ["Pull request", "Lint", "Type check", "Tests", "Security scan", "Dependency scan", "Build", "Review", "Merge"],
  },
  {
    id: "performance",
    title: "Performance",
    phase: "verify",
    level: 2,
    summary: "Fast and measurable. Optimize Core Web Vitals with data from real users.",
    groups: [
      { title: "Core Web Vitals", items: ["LCP: largest content paints fast", "INP: interactions respond fast", "CLS: nothing jumps"] },
      { title: "Loading", items: ["Image optimization and lazy loading", "Font optimization", "Caching and a CDN", "TTFB and FCP"] },
      { title: "JavaScript", items: ["Code splitting", "Bundle analysis", "Avoid unnecessary JavaScript", "Optimize third-party scripts"] },
      { title: "Measure", items: ["Lab tests (Lighthouse)", "Real user monitoring", "Budgets in CI"] },
    ],
    rule: "Don't ask how to make it faster. Ask where the bottleneck is.",
    flow: ["Measure", "Identify", "Profile", "Change", "Test", "Measure again", "Keep it, or revert"],
    resources: [
      { name: "Web Vitals, web.dev", href: "https://web.dev/articles/vitals" },
      { name: "Interaction to Next Paint", href: "https://web.dev/articles/inp" },
      { name: "Optimize LCP", href: "https://web.dev/articles/optimize-lcp" },
    ],
  },
  {
    id: "seo",
    title: "SEO",
    phase: "verify",
    level: 2,
    summary: "Make every page crawlable, understandable and worth ranking.",
    groups: [
      { title: "Technical", items: ["Title and meta description", "Canonical URLs", "robots.txt and XML sitemap", "Clean URLs and proper redirects", "HTTPS and a real 404 page", "Crawlable navigation"] },
      { title: "On the page", items: ["Semantic HTML and heading hierarchy", "Image alt text", "Structured data", "Open Graph and X cards", "Internal linking"] },
      { title: "Content", items: ["Search intent and keyword research", "Topic clusters", "Avoid duplicate content", "Keep content fresh", "Programmatic SEO only when justified"] },
      { title: "Monitoring", items: ["Google Search Console", "Bing Webmaster Tools", "Indexing and crawl errors", "Search performance"] },
    ],
    resources: [
      { name: "Google Search Central", href: "https://developers.google.com/search/docs" },
      { name: "SEO starter guide", href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
      { name: "Schema.org", href: "https://schema.org" },
    ],
  },
  {
    id: "geo",
    title: "GEO: AI discoverability",
    phase: "verify",
    level: 4,
    summary: "Generative engine optimization: make your content easy for AI systems to understand, retrieve and cite.",
    groups: [
      { title: "Clarity", items: ["Define entities explicitly", "Consistent terminology", "Answer questions directly", "Clear, factual writing"] },
      { title: "Structure", items: ["Schema.org structured data", "FAQ content", "Comparison information", "Stable URLs"] },
      { title: "Authority", items: ["Author and company information", "Citations and references", "Factual consistency across the web"] },
      { title: "Machine-readable", items: ["Content that can be extracted without the surrounding UI", "Key information not hidden behind JavaScript", "llms.txt where you want it", "Monitor how AI search describes you"] },
    ],
    rule: "An AI should be able to answer: what is this, who is it for, how do I install it, how does it work, and what are its limits?",
    flow: ["Your content", "AI search and answer engines", "AI-generated answers that cite you"],
    resources: [
      { name: "llms.txt", href: "https://llmstxt.org" },
      { name: "Schema.org", href: "https://schema.org" },
    ],
  },

  // Ship
  {
    id: "ci-cd",
    title: "CI/CD and infrastructure",
    phase: "ship",
    level: 3,
    summary: "One-command setup, automated pipelines, and environments that match production.",
    groups: [
      { title: "Infrastructure", items: ["Docker or dev containers", "Infrastructure as code", "Staging and production environments", "TLS, DNS and CDN", "Firewall and network security"] },
      { title: "Pipeline", items: ["Automated tests and builds", "Preview deployments", "Automated releases"] },
      { title: "Developer experience", items: ["git clone, install, dev: done", "Pre-commit hooks", "Seed data and reset scripts", "Formatting and linting on save"] },
    ],
    rule: "Setup should be four commands, not a 47-page document with 18 manual steps.",
    resources: [
      { name: "Dev Containers", href: "https://containers.dev" },
      { name: "Hosting on CodeStack", href: "/explore?c=hosting" },
    ],
  },
  {
    id: "deployment",
    title: "Deployment",
    phase: "ship",
    level: 3,
    summary: "Know how to roll back before you roll out.",
    groups: [
      { title: "Before launch", items: ["Environment variables", "Database and migrations", "Domain, HTTPS and DNS", "Backups", "Security scan", "Performance test"] },
      { title: "Launch", items: ["Monitoring and logging on", "Error tracking on", "Analytics and SEO ready", "Feature flags for risky changes"] },
      { title: "Way back", items: ["Rollback plan", "Staging before production", "Tested restore from backup"] },
    ],
  },

  // Run
  {
    id: "observability",
    title: "Observability",
    phase: "run",
    level: 3,
    summary: "See what's slow, failing, expensive and unused, from production evidence.",
    groups: [
      { title: "Logs", items: ["Structured logs", "Request and error IDs", "No secrets in logs"] },
      { title: "Metrics", items: ["Latency and error rate", "Throughput", "CPU and memory", "Database and queue health"] },
      { title: "Tracing and alerts", items: ["Distributed tracing for complex systems", "Alerts: down, errors, latency, database, security"] },
      { title: "Analytics", items: ["Decide what you need to know first", "Privacy-conscious analytics", "Feature usage and conversion", "Errors and performance"] },
    ],
    flow: ["What is slow?", "What is expensive?", "What is failing?", "What is used?", "What isn't?"],
    resources: [
      { name: "OpenTelemetry", href: "https://opentelemetry.io" },
      { name: "Services on CodeStack", href: "/explore?c=services" },
    ],
  },
  {
    id: "cost-scale",
    title: "Cost and scale",
    phase: "run",
    level: 5,
    summary: "Watch spend like a metric, and scale only the part that's actually the bottleneck.",
    groups: [
      { title: "Cost", items: ["Monitor cloud, database and API spend", "Monitor AI tokens", "Request and rate limits", "Agent execution limits; stop infinite loops"] },
      { title: "AI routing", items: ["Simple task: small model", "Complex reasoning: large model", "Critical task: best model", "Repeated task: cache it", "Batch independent requests"] },
      { title: "Scaling", items: ["Database indexes and caching", "CDN", "Queues and background jobs", "Connection pooling and load balancing", "Stateless services where it fits"] },
    ],
    rule: "Don't use your most expensive model to lowercase a string.",
    techniques: ["Send only the context the model needs", "Summarize old conversation state", "Use structured outputs", "Cache repeated prompts and context", "Consider local inference for private or high-volume work"],
    resources: [
      { name: "AI models and inference on CodeStack", href: "/explore?c=ai" },
      { name: "Free LLM API directory", href: "https://freellm.net" },
    ],
  },
  {
    id: "ai-apps",
    title: "AI evaluation",
    phase: "run",
    level: 4,
    optional: true,
    summary: "For AI products: evaluate outputs like you test code, so a model update can't silently break production.",
    groups: [
      { title: "Evaluate", items: ["Accuracy and instruction following", "Hallucination and safety", "Latency and cost", "Tool use and retrieval quality", "Regression suites"] },
      { title: "Maintain", items: ["Track model and prompt versions", "Evaluation datasets", "Model and provider fallbacks", "Rate-limit handling", "RAG and agent evaluation"] },
    ],
    flow: ["Prompt", "Model", "Output", "Evaluation"],
    resources: [
      { name: "OWASP Top 10 for LLM apps", href: "https://owasp.org/www-project-top-10-for-large-language-model-applications/" },
      { name: "NIST AI Risk Management Framework", href: "https://www.nist.gov/itl/ai-risk-management-framework" },
    ],
  },
  {
    id: "incidents",
    title: "Incident response",
    phase: "run",
    level: 5,
    summary: "Decide what happens when everything breaks, before it does.",
    groups: [
      { title: "Prepare", items: ["Incident procedure", "Clear owners and contacts", "Tested backups and recovery"] },
      { title: "Respond", items: ["Roll back", "Rotate credentials", "Communicate with users"] },
      { title: "Learn", items: ["Blameless postmortem", "Root-cause analysis", "Follow-up actions tracked"] },
    ],
    resources: [{ name: "Google SRE book", href: "https://sre.google/sre-book/table-of-contents/" }],
  },

  // Grow
  {
    id: "open-source",
    title: "Open source and releases",
    phase: "grow",
    level: 3,
    summary: "A project people can install, understand and contribute to in minutes.",
    groups: [
      { title: "Repository", items: ["README and LICENSE", "CONTRIBUTING and CODE_OF_CONDUCT", "SECURITY policy", "CHANGELOG", "Issue and PR templates", "Labels and good first issues"] },
      { title: "Docs for everyone", items: ["Humans: getting started and guides", "Search engines: clear pages", "AI assistants: ARCHITECTURE and FAQ", "Coding agents: AGENTS.md"] },
      { title: "Releases", items: ["Semantic versioning", "Release notes and tags", "Automated releases", "Signed releases and SBOMs where appropriate", "A rollback procedure"] },
    ],
    resources: [
      { name: "Open Source Guides", href: "https://opensource.guide" },
      { name: "Semantic Versioning", href: "https://semver.org" },
      { name: "Keep a Changelog", href: "https://keepachangelog.com" },
      { name: "Contribute to CodeStack", href: "/contribute" },
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance",
    phase: "grow",
    level: 3,
    summary: "A project isn't finished when it's deployed. Keep a weekly and monthly rhythm.",
    groups: [
      { title: "Weekly", items: ["Dependency updates", "Security alerts", "Error rates", "User feedback"] },
      { title: "Monthly", items: ["Performance and cost", "Analytics", "SEO health and broken links", "Accessibility regressions", "Documentation accuracy"] },
      { title: "Housekeeping", items: ["Delete code that's no longer needed", "Revisit old architecture decisions", "Keep the roadmap public"] },
    ],
  },
]

/** The AI-first developer loop. */
export const aiLoop = [
  { who: "human", step: "Define the problem" },
  { who: "human", step: "Define the design" },
  { who: "human", step: "Give the AI context" },
  { who: "ai", step: "AI implements" },
  { who: "human", step: "You review the diff" },
  { who: "gate", step: "Tests" },
  { who: "gate", step: "Security" },
  { who: "gate", step: "Performance" },
  { who: "ship", step: "Deploy and monitor" },
  { who: "ship", step: "Learn, then iterate" },
] as const

export const tips = [
  "Use git bisect to find the commit that caused a regression.",
  "Profile before optimizing. Measure before and after.",
  "Ship risky changes behind feature flags.",
  "Keep pull requests small; make one architectural change at a time.",
  "Prefer boring technology for boring problems.",
  "Automate anything you do twice.",
  "Read error messages completely before asking an AI.",
  "Give AI the error, the relevant code and the expected behavior.",
  "Ask an agent for a plan before any large change.",
  "Never paste production secrets into an AI model.",
  "Record important decisions as ADRs.",
  "Use staging before production, and have a rollback plan before deploying.",
  "Treat dependencies as part of your attack surface.",
  "Treat AI agents as privileged automation, not magical employees.",
  "Delete code when it's no longer needed.",
  "Make setup one command: clone, install, run.",
]

/** The final production checklist: everything to confirm before "ship it". */
export const shipChecklist: { title: string; items: string[] }[] = [
  { title: "Product", items: ["Problem defined", "Requirements defined", "Scope defined"] },
  { title: "Architecture", items: ["Architecture documented", "Data model designed", "APIs defined", "Failure modes considered"] },
  { title: "Code", items: ["Code reviewed", "Type checking passes", "Lint passes", "No dead code", "No unnecessary dependencies"] },
  { title: "AI", items: ["AI-generated code reviewed", "Agent permissions restricted", "MCP integrations reviewed", "AI outputs tested"] },
  { title: "Security", items: ["Authentication", "Authorization", "Input validation", "Secrets secured", "Dependency and security scans", "Rate limiting", "Security headers", "OWASP review"] },
  { title: "Testing", items: ["Unit tests", "Integration tests", "End-to-end tests", "Critical and failure paths tested"] },
  { title: "Accessibility", items: ["Keyboard", "Screen reader", "Contrast", "Focus", "WCAG review"] },
  { title: "Performance", items: ["LCP", "INP", "CLS", "Images optimized", "Bundle checked"] },
  { title: "SEO and GEO", items: ["Metadata, sitemap and robots", "Canonicals and structured data", "Open Graph", "Search Console", "AI-readable docs and FAQs"] },
  { title: "Privacy", items: ["Data minimized", "Privacy policy", "Consent where required", "Sensitive data protected"] },
  { title: "Deployment", items: ["HTTPS", "Environment variables", "Database backups", "CI/CD", "Rollback plan"] },
  { title: "Observability", items: ["Logs", "Metrics", "Error tracking", "Alerts"] },
  { title: "Open source", items: ["README", "CONTRIBUTING", "LICENSE", "SECURITY", "CODE_OF_CONDUCT", "CHANGELOG"] },
  { title: "Maintenance", items: ["Dependency updates scheduled", "Security monitoring", "Incident response ready"] },
]

/** Stable id for a checklist item, so saved progress survives reordering. */
export const itemId = (scope: string, text: string) =>
  `${scope}/${text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`

export const phaseById = Object.fromEntries(phases.map((p) => [p.id, p])) as Record<PhaseId, (typeof phases)[number]>

/** Step numbers along the main path, 1 to n. */
export const stepNumber = Object.fromEntries(topics.map((t, i) => [t.id, i + 1])) as Record<string, number>

export const groupIds = (topic: RoadmapTopic, group: RoadmapGroup) => group.items.map((item) => itemId(topic.id, item))
export const topicIds = (topic: RoadmapTopic) => topic.groups.flatMap((g) => groupIds(topic, g))
