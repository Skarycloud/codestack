// Agent Skills: folders with a SKILL.md that teach coding agents a specific job.
// Sources were checked against each publisher's repository and the skills.sh
// leaderboard (October 2026). Descriptions are written for CodeStack.

export type SkillField =
  | "design"
  | "frontend"
  | "testing"
  | "workflow"
  | "docs"
  | "video"
  | "backend"
  | "mobile"
  | "security"
  | "ai"
  | "marketing"
  | "productivity"

export type PublisherId =
  | "anthropic"
  | "vercel"
  | "mattpocock"
  | "superpowers"
  | "taste"
  | "emil"
  | "trailofbits"
  | "supabase"
  | "cloudflare"
  | "azure"
  | "huggingface"
  | "expo"
  | "remotion"
  | "hyperframes"
  | "marketing"
  | "caveman"
  | "shadcn"
  | "playwright"
  | "chrome"
  | "addy"
  | "sentry"
  | "coderabbit"
  | "openai"
  | "figma"
  | "gsap"
  | "platformdesign"
  | "hairline"
  | "cypress"
  | "browserbase"
  | "stripe"
  | "netlify"
  | "neon"
  | "betterauth"
  | "firebase"
  | "mongodb"
  | "redis"
  | "duckdb"
  | "apollo"
  | "resend"
  | "terraform"
  | "wordpress"
  | "gemini"
  | "brave"
  | "datadog"

export interface Publisher {
  id: PublisherId
  name: string
  repo: string
  blurb: string
  /** Simple Icons slug, if the publisher has one. */
  icon?: string
  official?: boolean
  /** Overrides the default `npx skills add` command for this publisher. */
  install?: string
}

export interface Skill {
  name: string
  field: SkillField
  publisher: PublisherId
  description: string
  /** Ranked in the skills.sh all‑time top 80 when this list was compiled. */
  popular?: boolean
  /** An underrated, high‑quality pick: excellent but not (yet) widely installed. */
  gem?: boolean
}

export const skillFields: { id: SkillField; name: string; blurb: string }[] = [
  { id: "design", name: "Design & UI", blurb: "Taste, layout, typography and motion that don't look generated." },
  { id: "frontend", name: "Frontend & Web", blurb: "React, Next.js, performance and the rules of the modern web." },
  { id: "testing", name: "Testing & Browser", blurb: "Drive real browsers, write tests and break your UI before users do." },
  { id: "workflow", name: "Engineering Workflow", blurb: "Planning, TDD, debugging, review and git, done with discipline." },
  { id: "docs", name: "Documents & Office", blurb: "Word, PDF, slides, spreadsheets and team writing." },
  { id: "video", name: "Video & Media", blurb: "Code‑driven video, animation and media pipelines." },
  { id: "backend", name: "Backend, Data & Cloud", blurb: "Databases, edge platforms and cloud infrastructure." },
  { id: "mobile", name: "Mobile", blurb: "Native apps with React Native and Expo." },
  { id: "security", name: "Security", blurb: "Audits, static analysis and verification from the pros." },
  { id: "ai", name: "AI & Machine Learning", blurb: "Models, training, evals and building with LLM APIs." },
  { id: "marketing", name: "Marketing & Growth", blurb: "Copy, SEO, conversion and launch playbooks." },
  { id: "productivity", name: "Productivity & Meta", blurb: "Find skills, make skills and keep agents efficient." },
]

export const publishers: Publisher[] = [
  {
    id: "anthropic",
    name: "Anthropic",
    repo: "anthropics/skills",
    blurb: "The official reference skills, including the production document skills.",
    icon: "anthropic",
    official: true,
  },
  {
    id: "vercel",
    name: "Vercel",
    repo: "vercel-labs/agent-skills",
    blurb: "React, Next.js and web interface guidelines from the Vercel team.",
    icon: "vercel",
    official: true,
  },
  {
    id: "mattpocock",
    name: "Matt Pocock",
    repo: "mattpocock/skills",
    blurb: "The most installed engineering workflow skills: grilling, TDD, architecture.",
    icon: "github",
  },
  {
    id: "superpowers",
    name: "Superpowers",
    repo: "obra/superpowers",
    blurb: "A complete planning, testing and review methodology for coding agents.",
    icon: "github",
  },
  {
    id: "taste",
    name: "Taste Skill",
    repo: "leonxlnx/taste-skill",
    blurb: "Anti‑generic design direction for landing pages and product UI.",
    icon: "github",
  },
  {
    id: "emil",
    name: "Emil Kowalski",
    repo: "emilkowalski/skills",
    blurb: "Design engineering and animation polish from Linear's design engineer.",
    icon: "github",
  },
  {
    id: "trailofbits",
    name: "Trail of Bits",
    repo: "trailofbits/skills",
    blurb: "Security auditing skills from one of the best known security firms.",
    install: "/plugin marketplace add trailofbits/skills",
  },
  {
    id: "supabase",
    name: "Supabase",
    repo: "supabase/agent-skills",
    blurb: "Supabase products and Postgres performance best practices.",
    icon: "supabase",
    official: true,
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    repo: "cloudflare/skills",
    blurb: "Workers, Durable Objects, agents and the rest of the developer platform.",
    icon: "cloudflare",
    official: true,
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    repo: "microsoft/azure-skills",
    blurb: "Prepare, deploy, diagnose and govern workloads on Azure.",
    official: true,
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    repo: "huggingface/skills",
    blurb: "The Hub, training with TRL, evals, Spaces and local models.",
    icon: "huggingface",
    official: true,
  },
  {
    id: "expo",
    name: "Expo",
    repo: "expo/skills",
    blurb: "Build, ship and upgrade React Native apps with Expo and EAS.",
    icon: "expo",
    official: true,
  },
  { id: "remotion", name: "Remotion", repo: "remotion-dev/skills", blurb: "Make videos programmatically with React.", official: true },
  {
    id: "hyperframes",
    name: "HyperFrames",
    repo: "heygen-com/hyperframes",
    blurb: "HeyGen's HTML‑to‑video framework, built for agents.",
    official: true,
  },
  {
    id: "marketing",
    name: "Marketing Skills",
    repo: "coreyhaines31/marketingskills",
    blurb: "A full marketing toolkit: CRO, copy, SEO, pricing and growth.",
    icon: "github",
  },
  {
    id: "caveman",
    name: "Caveman",
    repo: "juliusbrussee/caveman",
    blurb: "Terse output styles that cut an agent's token usage.",
    icon: "github",
  },
  {
    id: "shadcn",
    name: "shadcn/ui",
    repo: "shadcn-ui/ui",
    blurb: "The official shadcn skill: project‑aware components, CLI, theming and registries.",
    icon: "shadcnui",
    official: true,
  },
  {
    id: "playwright",
    name: "Playwright",
    repo: "microsoft/playwright-cli",
    blurb: "Microsoft's official browser automation skill. Also installable with playwright-cli install --skills.",
    official: true,
  },
  {
    id: "chrome",
    name: "Chrome DevTools",
    repo: "ChromeDevTools/chrome-devtools-mcp",
    blurb: "Official skills for debugging pages, performance, memory and accessibility in Chrome.",
    icon: "googlechrome",
    official: true,
  },
  {
    id: "addy",
    name: "Addy Osmani",
    repo: "addyosmani/agent-skills",
    blurb: "Production‑grade engineering skills that encode how senior engineers spec, build, review and ship.",
  },
  {
    id: "sentry",
    name: "Sentry",
    repo: "getsentry/skills",
    blurb: "The skills Sentry's own engineers use for commits, PRs, bug hunting and security review.",
    icon: "sentry",
    official: true,
  },
  {
    id: "coderabbit",
    name: "CodeRabbit",
    repo: "coderabbitai/skills",
    blurb: "AI code review and safe, approved autofix of PR feedback.",
    icon: "coderabbit",
    official: true,
  },
  {
    id: "openai",
    name: "OpenAI",
    repo: "openai/skills",
    blurb: "OpenAI's curated skills for Codex, from fixing CI to working with Linear and Notion.",
    official: true,
  },
  {
    id: "figma",
    name: "Figma",
    repo: "figma/mcp-server-guide",
    blurb: "Official skills for reading designs into code and writing code back into Figma.",
    icon: "figma",
    official: true,
  },
  {
    id: "gsap",
    name: "GSAP",
    repo: "greensock/gsap-skills",
    blurb: "Official GreenSock skills for timelines, ScrollTrigger and React.",
    icon: "gsap",
    official: true,
  },
  {
    id: "platformdesign",
    name: "Platform Design Skills",
    repo: "ehmo/platform-design-skills",
    blurb: "Hundreds of rules from Apple's HIG, Material Design 3 and WCAG, one skill per platform.",
  },
  {
    id: "hairline",
    name: "Hairline",
    repo: "lucasmarkes/hairline",
    blurb: "Interactive isometric line illustrations, with a skill that draws new ones.",
  },
  {
    id: "cypress",
    name: "Cypress",
    repo: "cypress-io/ai-toolkit",
    blurb: "Official skills for writing and explaining Cypress tests.",
    icon: "cypress",
    official: true,
  },
  {
    id: "browserbase",
    name: "Browserbase",
    repo: "browserbase/skills",
    blurb: "Cloud browser automation, adversarial UI testing and API discovery.",
    official: true,
  },
  {
    id: "stripe",
    name: "Stripe",
    repo: "stripe/ai",
    blurb: "Official guidance for building and upgrading Stripe integrations.",
    icon: "stripe",
    official: true,
  },
  {
    id: "netlify",
    name: "Netlify",
    repo: "netlify/context-and-tools",
    blurb: "Functions, edge, deploys and every Netlify primitive.",
    icon: "netlify",
    official: true,
  },
  {
    id: "neon",
    name: "Neon",
    repo: "neondatabase/agent-skills",
    blurb: "Serverless Postgres, branching and auth on Neon.",
    icon: "neon",
    official: true,
  },
  {
    id: "betterauth",
    name: "Better Auth",
    repo: "better-auth/skills",
    blurb: "Add secure TypeScript authentication the right way.",
    icon: "betterauth",
    official: true,
  },
  {
    id: "firebase",
    name: "Firebase",
    repo: "firebase/agent-skills",
    blurb: "Official Firebase skills, including a security rules auditor.",
    icon: "firebase",
    official: true,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    repo: "mongodb/agent-skills",
    blurb: "Schema design, query optimization and Atlas features.",
    icon: "mongodb",
    official: true,
  },
  {
    id: "redis",
    name: "Redis",
    repo: "redis/agent-skills",
    blurb: "Data modeling, search and semantic caching for LLM apps.",
    icon: "redis",
    official: true,
  },
  {
    id: "duckdb",
    name: "DuckDB",
    repo: "duckdb/duckdb-skills",
    blurb: "Query any data file or database locally with DuckDB.",
    icon: "duckdb",
    official: true,
  },
  {
    id: "apollo",
    name: "Apollo GraphQL",
    repo: "apollographql/skills",
    blurb: "Apollo Server, Client, Federation and schema design.",
    icon: "apollographql",
    official: true,
  },
  {
    id: "resend",
    name: "Resend",
    repo: "resend/resend-skills",
    blurb: "Sending, receiving and designing email that lands in the inbox.",
    icon: "resend",
    official: true,
  },
  {
    id: "terraform",
    name: "Anton Babenko",
    repo: "antonbabenko/terraform-skill",
    blurb: "Terraform and OpenTofu expertise from the author of the most used AWS modules.",
    icon: "terraform",
  },
  {
    id: "wordpress",
    name: "WordPress",
    repo: "WordPress/agent-skills",
    blurb: "Official skills for blocks, plugins, themes and performance.",
    icon: "wordpress",
    official: true,
  },
  {
    id: "gemini",
    name: "Google Gemini",
    repo: "google-gemini/gemini-skills",
    blurb: "Build with the Gemini API, from chat to live audio.",
    icon: "googlegemini",
    official: true,
  },
  {
    id: "brave",
    name: "Brave Search",
    repo: "brave/brave-search-skills",
    blurb: "Give agents fresh web search and LLM‑ready page content.",
    icon: "brave",
    official: true,
  },
  {
    id: "datadog",
    name: "Datadog",
    repo: "datadog-labs/agent-skills",
    blurb: "APM setup and root cause analysis for production LLM apps.",
    icon: "datadog",
    official: true,
  },
]

export const skills: Skill[] = [
  // Design & UI
  {
    name: "frontend-design",
    field: "design",
    publisher: "anthropic",
    popular: true,
    description: "Commits to a clear aesthetic direction before writing UI, so interfaces feel designed rather than templated.",
  },
  {
    name: "design-taste-frontend",
    field: "design",
    publisher: "taste",
    popular: true,
    description: "Reads the brief, picks a fitting design direction and runs a strict pre‑flight check against generic AI patterns.",
  },
  {
    name: "high-end-visual-design",
    field: "design",
    publisher: "taste",
    popular: true,
    description: "Agency‑grade defaults for fonts, spacing, shadows, cards and motion that make a site feel premium.",
  },
  {
    name: "redesign-existing-projects",
    field: "design",
    publisher: "taste",
    popular: true,
    description: "Audits an existing site, flags what looks cheap or generic, and upgrades it without breaking functionality.",
  },
  {
    name: "minimalist-ui",
    field: "design",
    publisher: "taste",
    popular: true,
    description: "Calm, editorial interfaces: warm monochrome, strong typographic contrast and flat bento grids.",
  },
  {
    name: "industrial-brutalist-ui",
    field: "design",
    publisher: "taste",
    description: "Swiss print meets terminal aesthetics: rigid grids, extreme type scale and utilitarian color.",
  },
  {
    name: "image-to-code",
    field: "design",
    publisher: "taste",
    description: "Generates reference designs first, studies them closely, then implements the site to match.",
  },
  {
    name: "brandkit",
    field: "design",
    publisher: "taste",
    description: "Produces brand guideline boards, logo systems and identity decks with a considered visual world.",
  },
  {
    name: "emil-design-eng",
    field: "design",
    publisher: "emil",
    gem: true,
    description: "A senior design engineer's philosophy on UI polish, component craft and when (and how) to animate.",
  },
  {
    name: "review-animations",
    field: "design",
    publisher: "emil",
    gem: true,
    description: "Critiques motion code against high standards: easing, duration, interruption and purpose.",
  },
  {
    name: "canvas-design",
    field: "design",
    publisher: "anthropic",
    description: "Creates posters and visual compositions as finished PNG or PDF artwork.",
  },
  {
    name: "theme-factory",
    field: "design",
    publisher: "anthropic",
    description: "Applies a consistent, professionally designed theme to slides, documents and pages.",
  },
  {
    name: "brand-guidelines",
    field: "design",
    publisher: "anthropic",
    description: "Keeps every artifact on brand by teaching the agent your colors, type and voice.",
  },
  {
    name: "algorithmic-art",
    field: "design",
    publisher: "anthropic",
    description: "Generative art with p5.js, from flow fields to particle systems, with seeded randomness.",
  },

  // Frontend & Web
  {
    name: "vercel-react-best-practices",
    field: "frontend",
    publisher: "vercel",
    popular: true,
    description: "Dozens of prioritized React and Next.js performance rules, from waterfalls to bundle size.",
  },
  {
    name: "web-design-guidelines",
    field: "frontend",
    publisher: "vercel",
    popular: true,
    description: "Reviews UI code against 100+ web interface rules covering accessibility, forms, motion and more.",
  },
  {
    name: "composition-patterns",
    field: "frontend",
    publisher: "vercel",
    description: "React composition patterns that scale, so components don't drown in boolean props.",
  },
  {
    name: "react-view-transitions",
    field: "frontend",
    publisher: "vercel",
    gem: true,
    description: "Smooth page and element transitions with React's View Transition API in Next.js.",
  },
  {
    name: "agent-browser",
    field: "testing",
    publisher: "vercel",
    popular: true,
    description: "Lets the agent drive a real browser: navigate, click, fill forms, screenshot and read the page.",
  },
  {
    name: "webapp-testing",
    field: "testing",
    publisher: "anthropic",
    description: "Tests local web apps with Playwright, capturing screenshots and browser logs as evidence.",
  },
  {
    name: "web-artifacts-builder",
    field: "frontend",
    publisher: "anthropic",
    description: "Builds rich, multi‑component HTML artifacts with React, Tailwind and shadcn/ui.",
  },
  {
    name: "web-perf",
    field: "frontend",
    publisher: "cloudflare",
    description: "Audits Core Web Vitals and suggests concrete fixes for loading and interaction speed.",
  },

  // Engineering Workflow
  {
    name: "grill-me",
    field: "workflow",
    publisher: "mattpocock",
    popular: true,
    description: "Interviews you relentlessly about a plan until every branch of the decision tree is resolved.",
  },
  {
    name: "grill-with-docs",
    field: "workflow",
    publisher: "mattpocock",
    popular: true,
    description: "A grilling session that also updates your glossary and architecture decision records as it goes.",
  },
  {
    name: "tdd",
    field: "workflow",
    publisher: "mattpocock",
    popular: true,
    description: "Test‑driven development with a strict red, green, refactor loop.",
  },
  {
    name: "improve-codebase-architecture",
    field: "workflow",
    publisher: "mattpocock",
    popular: true,
    description: "Scans a codebase for opportunities to deepen modules and reports them as a visual HTML page.",
  },
  {
    name: "diagnosing-bugs",
    field: "workflow",
    publisher: "mattpocock",
    popular: true,
    description: "A disciplined diagnosis loop for bugs and performance regressions, before any fix is attempted.",
  },
  {
    name: "code-review",
    field: "workflow",
    publisher: "mattpocock",
    popular: true,
    description: "Reviews changes on two axes, standards and spec, using parallel sub‑agents.",
  },
  {
    name: "codebase-design",
    field: "workflow",
    publisher: "mattpocock",
    popular: true,
    description: "Designs deep modules that hide lots of behavior behind a small, simple interface.",
  },
  {
    name: "domain-modeling",
    field: "workflow",
    publisher: "mattpocock",
    popular: true,
    description: "Builds and sharpens the domain model of a project as the work evolves.",
  },
  {
    name: "implement",
    field: "workflow",
    publisher: "mattpocock",
    popular: true,
    description: "Builds from a spec or tickets, driving TDD at the seams you agreed on.",
  },
  {
    name: "wayfinder",
    field: "workflow",
    publisher: "mattpocock",
    popular: true,
    description: "Plans big chunks of work as decision tickets, resolved one by one until the path is clear.",
  },
  {
    name: "to-spec",
    field: "workflow",
    publisher: "mattpocock",
    description: "Turns the current conversation into a spec and files it in your issue tracker.",
  },
  {
    name: "resolving-merge-conflicts",
    field: "workflow",
    publisher: "mattpocock",
    popular: true,
    description: "Works through merge conflicts carefully, preserving the intent of both sides.",
  },
  {
    name: "git-guardrails-claude-code",
    field: "workflow",
    publisher: "mattpocock",
    popular: true,
    description: "Adds guardrails that stop the agent from running dangerous git commands.",
  },
  {
    name: "brainstorming",
    field: "workflow",
    publisher: "superpowers",
    description: "Socratic questioning that refines a design before a single line of code is written.",
  },
  {
    name: "writing-plans",
    field: "workflow",
    publisher: "superpowers",
    description: "Breaks work into small, explicit implementation tasks the agent can follow.",
  },
  {
    name: "systematic-debugging",
    field: "workflow",
    publisher: "superpowers",
    description: "A four‑phase root cause process that replaces guess‑and‑check fixes.",
  },
  {
    name: "test-driven-development",
    field: "workflow",
    publisher: "superpowers",
    description: "Enforces red, green, refactor, with a reference of common testing anti‑patterns.",
  },
  {
    name: "verification-before-completion",
    field: "workflow",
    publisher: "superpowers",
    gem: true,
    description: "Makes the agent prove a fix actually works before it reports the task as done.",
  },
  {
    name: "subagent-driven-development",
    field: "workflow",
    publisher: "superpowers",
    description: "Hands each task to a fresh sub‑agent and reviews the result in two stages.",
  },
  {
    name: "using-git-worktrees",
    field: "workflow",
    publisher: "superpowers",
    description: "Isolates work in git worktrees so experiments never touch your main checkout.",
  },

  // Documents & Office
  {
    name: "docx",
    field: "docs",
    publisher: "anthropic",
    description: "Creates and edits Word documents, including tracked changes, comments and formatting.",
  },
  {
    name: "pdf",
    field: "docs",
    publisher: "anthropic",
    description: "Extracts text and tables, fills forms, and merges or splits PDF files.",
  },
  {
    name: "pptx",
    field: "docs",
    publisher: "anthropic",
    description: "Builds and edits PowerPoint decks with layouts, speaker notes and templates.",
  },
  {
    name: "xlsx",
    field: "docs",
    publisher: "anthropic",
    description: "Works with spreadsheets: formulas, formatting, charts and data analysis.",
  },
  {
    name: "doc-coauthoring",
    field: "docs",
    publisher: "anthropic",
    description: "A structured workflow for writing proposals, specs and docs together with the agent.",
  },
  {
    name: "internal-comms",
    field: "docs",
    publisher: "anthropic",
    description: "Writes status reports, updates, FAQs and newsletters in your company's format.",
  },
  {
    name: "writing-guidelines",
    field: "docs",
    publisher: "vercel",
    description: "Reviews docs and prose against Vercel's writing handbook of 80+ rules.",
  },

  // Video & Media
  {
    name: "remotion-best-practices",
    field: "video",
    publisher: "remotion",
    popular: true,
    description: "Everything the agent needs to build videos in React with Remotion, the right way.",
  },
  {
    name: "remotion-render",
    field: "video",
    publisher: "remotion",
    description: "Renders a Remotion composition into a finished video or still image.",
  },
  { name: "remotion-captions", field: "video", publisher: "remotion", description: "Adds captions and subtitles to programmatic videos." },
  {
    name: "hyperframes",
    field: "video",
    publisher: "hyperframes",
    popular: true,
    description: "Routes any video request to the right HyperFrames workflow for HTML‑to‑MP4 rendering.",
  },
  {
    name: "hyperframes-animation",
    field: "video",
    publisher: "hyperframes",
    popular: true,
    description: "Motion know‑how across GSAP, Lottie, Three.js, Anime.js, CSS and WAAPI for rendered video.",
  },
  {
    name: "hyperframes-creative",
    field: "video",
    publisher: "hyperframes",
    popular: true,
    description: "Design direction for video: typography, narration, beats and composition.",
  },
  {
    name: "media-use",
    field: "video",
    publisher: "hyperframes",
    popular: true,
    description: "Finds or generates the music, sound effects, images and voiceover a video needs.",
  },
  { name: "slack-gif-creator", field: "video", publisher: "anthropic", description: "Makes animated GIFs sized and optimized for Slack." },

  // Backend, Data & Cloud
  {
    name: "supabase",
    field: "backend",
    publisher: "supabase",
    description: "Covers every Supabase product, client library and the most common troubleshooting cases.",
  },
  {
    name: "supabase-postgres-best-practices",
    field: "backend",
    publisher: "supabase",
    popular: true,
    description: "Postgres performance rules across eight categories, ordered by impact.",
  },
  {
    name: "workers-best-practices",
    field: "backend",
    publisher: "cloudflare",
    description: "Production guidance for writing, testing and running Cloudflare Workers.",
  },
  {
    name: "durable-objects",
    field: "backend",
    publisher: "cloudflare",
    description: "Stateful coordination and WebSockets with Durable Objects.",
  },
  {
    name: "wrangler",
    field: "backend",
    publisher: "cloudflare",
    description: "Deploys Workers and manages KV, R2, D1 and Queues from the CLI.",
  },
  {
    name: "agents-sdk",
    field: "backend",
    publisher: "cloudflare",
    description: "Builds stateful AI agents on Cloudflare with scheduling and RPC.",
  },
  {
    name: "azure-diagnostics",
    field: "backend",
    publisher: "azure",
    popular: true,
    description: "Troubleshoots failing Azure resources and explains errors in plain terms.",
  },
  {
    name: "azure-compute",
    field: "backend",
    publisher: "azure",
    popular: true,
    description: "Helps choose and configure the right Azure compute service for a workload.",
  },
  {
    name: "azure-kubernetes",
    field: "backend",
    publisher: "azure",
    popular: true,
    description: "Creates and manages AKS clusters and Kubernetes workloads on Azure.",
  },
  {
    name: "azure-rbac",
    field: "backend",
    publisher: "azure",
    popular: true,
    description: "Sets up role‑based access control with least‑privilege defaults.",
  },
  {
    name: "vercel-deploy-claimable",
    field: "backend",
    publisher: "vercel",
    description: "Deploys an app to Vercel instantly, with ownership you can claim afterwards.",
  },

  // Mobile
  { name: "expo-router", field: "mobile", publisher: "expo", description: "File‑based navigation and routing for Expo apps." },
  {
    name: "expo-native-ui",
    field: "mobile",
    publisher: "expo",
    description: "Native styling and platform UI controls that feel at home on iOS and Android.",
  },
  { name: "expo-animation", field: "mobile", publisher: "expo", description: "Smooth animations with Reanimated and gestures." },
  {
    name: "eas-app-stores",
    field: "mobile",
    publisher: "expo",
    description: "Builds iOS and Android binaries and submits them to TestFlight and the stores.",
  },
  {
    name: "expo-upgrade",
    field: "mobile",
    publisher: "expo",
    description: "Upgrades the Expo SDK and dependencies without breaking the app.",
  },
  {
    name: "react-native-guidelines",
    field: "mobile",
    publisher: "vercel",
    description: "React Native best practices for performance and structure.",
  },

  // Security
  {
    name: "static-analysis",
    field: "security",
    publisher: "trailofbits",
    description: "Runs CodeQL and Semgrep and makes sense of the SARIF results.",
  },
  {
    name: "differential-review",
    field: "security",
    publisher: "trailofbits",
    description: "Security review of a change set, using git history for context.",
  },
  {
    name: "supply-chain-risk-auditor",
    field: "security",
    publisher: "trailofbits",
    gem: true,
    description: "Audits npm, PyPI and Go dependencies for supply chain risk.",
  },
  {
    name: "insecure-defaults",
    field: "security",
    publisher: "trailofbits",
    description: "Hunts for fail‑open settings and insecure defaults across a codebase.",
  },
  {
    name: "sharp-edges",
    field: "security",
    publisher: "trailofbits",
    gem: true,
    description: "Flags dangerous APIs and footgun designs before they ship.",
  },
  {
    name: "property-based-testing",
    field: "security",
    publisher: "trailofbits",
    description: "Writes and reviews property‑based tests that find edge cases humans miss.",
  },
  {
    name: "semgrep-rule-creator",
    field: "security",
    publisher: "trailofbits",
    description: "Creates and refines custom Semgrep rules for your codebase.",
  },
  {
    name: "building-secure-contracts",
    field: "security",
    publisher: "trailofbits",
    description: "Vulnerability scanning and secure development guidance for smart contracts.",
  },

  // AI & Machine Learning
  {
    name: "claude-api",
    field: "ai",
    publisher: "anthropic",
    description: "Builds correctly with the Claude API and SDKs: models, tools, streaming and caching.",
  },
  {
    name: "mcp-builder",
    field: "ai",
    publisher: "anthropic",
    gem: true,
    description: "Guides the creation of high‑quality MCP servers that connect agents to external services.",
  },
  {
    name: "hf-cli",
    field: "ai",
    publisher: "huggingface",
    description: "Downloads, uploads and manages models, datasets and Spaces on the Hugging Face Hub.",
  },
  {
    name: "huggingface-llm-trainer",
    field: "ai",
    publisher: "huggingface",
    description: "Fine‑tunes language models with TRL, from data prep to training runs.",
  },
  {
    name: "huggingface-community-evals",
    field: "ai",
    publisher: "huggingface",
    description: "Runs model evaluations with inspect‑ai and lighteval.",
  },
  {
    name: "huggingface-local-models",
    field: "ai",
    publisher: "huggingface",
    description: "Runs models locally with llama.cpp and GGUF weights.",
  },
  { name: "huggingface-gradio", field: "ai", publisher: "huggingface", description: "Builds Gradio demos and web UIs for models." },
  {
    name: "transformers-js",
    field: "ai",
    publisher: "huggingface",
    description: "Runs machine learning models directly in JavaScript and the browser.",
  },

  // Marketing & Growth
  {
    name: "copywriting",
    field: "marketing",
    publisher: "marketing",
    description: "Writes marketing pages that are clear, specific and built to convert.",
  },
  {
    name: "seo-audit",
    field: "marketing",
    publisher: "marketing",
    description: "A technical SEO audit with prioritized, actionable fixes.",
  },
  {
    name: "ai-seo",
    field: "marketing",
    publisher: "marketing",
    description: "Optimizes content to be found and cited by AI search engines.",
  },
  { name: "cro", field: "marketing", publisher: "marketing", description: "Improves landing pages and forms for higher conversion." },
  { name: "pricing", field: "marketing", publisher: "marketing", description: "Shapes pricing and packaging strategy for a product." },
  { name: "launch", field: "marketing", publisher: "marketing", description: "Plans product announcements and launch sequencing." },
  {
    name: "marketing-psychology",
    field: "marketing",
    publisher: "marketing",
    description: "Applies behavioral science principles to marketing decisions.",
  },

  // Productivity & Meta
  {
    name: "find-skills",
    field: "productivity",
    publisher: "vercel",
    popular: true,
    description: "Finds and installs the right skill when you ask “is there a skill for this?”.",
  },
  {
    name: "skill-creator",
    field: "productivity",
    publisher: "anthropic",
    popular: true,
    description: "Creates, tests and improves your own skills, with evals to measure them.",
  },
  {
    name: "writing-skills",
    field: "productivity",
    publisher: "superpowers",
    description: "A framework for writing new skills that agents actually follow.",
  },
  {
    name: "handoff",
    field: "productivity",
    publisher: "mattpocock",
    gem: true,
    description: "Compacts a long session into a handoff document another agent can continue from.",
  },
  {
    name: "teach",
    field: "productivity",
    publisher: "mattpocock",
    popular: true,
    description: "Teaches you a new skill or concept over several sessions.",
  },
  {
    name: "caveman",
    field: "productivity",
    publisher: "caveman",
    popular: true,
    description: "A terse reply style that cuts output tokens while keeping the meaning.",
  },
  {
    name: "caveman-compress",
    field: "productivity",
    publisher: "caveman",
    popular: true,
    description: "Shrinks memory and instruction files so the agent reads fewer tokens.",
  },
  // Added: design
  {
    name: "shadcn",
    field: "design",
    publisher: "shadcn",
    description: "Knows your shadcn setup and uses the CLI to add, fix, theme and compose components the way the project expects.",
  },
  {
    name: "hairline-create",
    field: "design",
    publisher: "hairline",
    gem: true,
    description: "Turns an idea into a new interactive isometric line illustration, delivered as one self‑contained HTML file.",
  },
  {
    name: "ios-design-guidelines",
    field: "design",
    publisher: "platformdesign",
    gem: true,
    description: "Applies Apple's Human Interface Guidelines to SwiftUI and UIKit: Dynamic Type, Dark Mode and accessibility.",
  },
  {
    name: "android-design-guidelines",
    field: "design",
    publisher: "platformdesign",
    description: "Material Design 3 and Android platform rules for Jetpack Compose and XML layouts.",
  },
  {
    name: "web-design-guidelines",
    field: "design",
    publisher: "platformdesign",
    description: "Web accessibility and responsive layout rules with WCAG 2.2 compliance checks.",
  },
  {
    name: "figma-design-to-code",
    field: "design",
    publisher: "figma",
    description: "Implements a Figma design as code, pulling the real design context instead of guessing.",
  },
  {
    name: "figma-generate-design",
    field: "design",
    publisher: "figma",
    description: "Pushes an app page or layout from code into Figma as an editable design.",
  },
  {
    name: "figma-generate-library",
    field: "design",
    publisher: "figma",
    gem: true,
    description: "Builds a proper design system in Figma from your codebase: tokens, variants and light and dark themes.",
  },
  {
    name: "figma-code-connect",
    field: "design",
    publisher: "figma",
    description: "Maps Figma components to real code snippets with Code Connect files.",
  },
  {
    name: "gsap-core",
    field: "design",
    publisher: "gsap",
    description: "The official guide to GSAP tweens, easing, staggers and reduced‑motion aware animation.",
  },
  {
    name: "gsap-scrolltrigger",
    field: "design",
    publisher: "gsap",
    description: "Scroll‑linked animation, pinning, scrubbing and parallax with ScrollTrigger.",
  },
  {
    name: "gsap-react",
    field: "design",
    publisher: "gsap",
    description: "Animates React and Next.js with the useGSAP hook and proper cleanup.",
  },

  // Added: frontend
  {
    name: "frontend-ui-engineering",
    field: "frontend",
    publisher: "addy",
    description: "Production‑quality UI: component architecture, state, responsive layout and WCAG AA accessibility.",
  },
  {
    name: "performance-optimization",
    field: "frontend",
    publisher: "addy",
    description: "A measure‑first approach to speed across Core Web Vitals, queries and the backend.",
  },
  {
    name: "migrate-radix-to-base",
    field: "frontend",
    publisher: "shadcn",
    description: "Migrates components or whole projects from Radix UI to Base UI.",
  },
  {
    name: "debug-optimize-lcp",
    field: "frontend",
    publisher: "chrome",
    gem: true,
    description: "Finds out why the main content loads slowly and fixes Largest Contentful Paint with real DevTools data.",
  },
  {
    name: "a11y-debugging",
    field: "frontend",
    publisher: "chrome",
    description: "Audits semantics, ARIA, focus, keyboard navigation and contrast in a live browser.",
  },
  {
    name: "memory-leak-debugging",
    field: "frontend",
    publisher: "chrome",
    gem: true,
    description: "Captures and compares heap snapshots to track down memory leaks in JavaScript and Node.js.",
  },

  // Added: testing & browser
  {
    name: "playwright-cli",
    field: "testing",
    publisher: "playwright",
    description: "Microsoft's official skill for driving browsers, testing pages and working with Playwright tests.",
  },
  {
    name: "chrome-devtools",
    field: "testing",
    publisher: "chrome",
    description: "Debugs pages, inspects network requests and automates Chrome through DevTools.",
  },
  {
    name: "cypress-author",
    field: "testing",
    publisher: "cypress",
    description: "Writes, updates and fixes Cypress end‑to‑end and component tests, including flaky ones.",
  },
  {
    name: "ui-test",
    field: "testing",
    publisher: "browserbase",
    gem: true,
    description: "Adversarial UI testing that reads your git diff and tries to break only what changed.",
  },
  {
    name: "browser-to-api",
    field: "testing",
    publisher: "browserbase",
    gem: true,
    description: "Watches a site's network traffic and turns it into an OpenAPI spec.",
  },
  {
    name: "browser",
    field: "testing",
    publisher: "browserbase",
    description: "Browses, clicks, fills forms and extracts data from websites using plain language.",
  },

  // Added: workflow
  {
    name: "spec-driven-development",
    field: "workflow",
    publisher: "addy",
    description: "Writes a clear spec covering goals, structure, testing and boundaries before any code.",
  },
  {
    name: "planning-and-task-breakdown",
    field: "workflow",
    publisher: "addy",
    description: "Breaks a spec into small, ordered tasks with acceptance criteria.",
  },
  {
    name: "incremental-implementation",
    field: "workflow",
    publisher: "addy",
    description: "Ships changes in thin, verified slices, each one tested and committed.",
  },
  {
    name: "interview-me",
    field: "workflow",
    publisher: "addy",
    gem: true,
    description: "Asks one question at a time until it understands what you actually need, not just what you asked for.",
  },
  {
    name: "code-review-and-quality",
    field: "workflow",
    publisher: "addy",
    description: "Reviews changes on five axes with severity labels before anything is merged.",
  },
  {
    name: "code-simplification",
    field: "workflow",
    publisher: "addy",
    description: "Makes working code easier to read and change without altering its behavior.",
  },
  {
    name: "doubt-driven-development",
    field: "workflow",
    publisher: "addy",
    gem: true,
    description: "Has a fresh‑context reviewer challenge every important decision before it stands.",
  },
  {
    name: "context-engineering",
    field: "workflow",
    publisher: "addy",
    gem: true,
    description: "Sets up rules files and context so the agent gets the right information at the right time.",
  },
  {
    name: "documentation-and-adrs",
    field: "workflow",
    publisher: "addy",
    description: "Records architecture decisions and the reasoning future engineers will need.",
  },
  {
    name: "shipping-and-launch",
    field: "workflow",
    publisher: "addy",
    description: "Pre‑launch checklists, staged rollouts, monitoring and a rollback plan.",
  },
  {
    name: "commit",
    field: "workflow",
    publisher: "sentry",
    description: "Writes clean conventional commits with issue references, the way Sentry does.",
  },
  {
    name: "pr-writer",
    field: "workflow",
    publisher: "sentry",
    description: "Writes reviewer‑friendly pull request titles and descriptions.",
  },
  {
    name: "find-bugs",
    field: "workflow",
    publisher: "sentry",
    description: "Hunts for bugs, security holes and quality issues in your branch before review.",
  },
  {
    name: "iterate-pr",
    field: "workflow",
    publisher: "sentry",
    gem: true,
    description: "Loops on a pull request until CI passes and important review feedback is resolved.",
  },
  {
    name: "agents-md",
    field: "workflow",
    publisher: "sentry",
    gem: true,
    description: "Creates and maintains lean AGENTS.md and CLAUDE.md files for your repository.",
  },
  {
    name: "code-review",
    field: "workflow",
    publisher: "coderabbit",
    description: "Runs CodeRabbit reviews on local changes or pull requests from inside your agent.",
  },
  {
    name: "autofix",
    field: "workflow",
    publisher: "coderabbit",
    description: "Applies PR review feedback one approved change at a time, never running untrusted prompts.",
  },
  {
    name: "gh-fix-ci",
    field: "workflow",
    publisher: "openai",
    gem: true,
    description: "Reads failing GitHub Actions logs, explains the failure and proposes a fix for approval.",
  },
  {
    name: "gh-address-comments",
    field: "workflow",
    publisher: "openai",
    description: "Works through the review comments on your open pull request.",
  },
  { name: "linear", field: "workflow", publisher: "openai", description: "Reads, creates and updates Linear issues and projects." },

  // Added: docs
  {
    name: "notion-spec-to-implementation",
    field: "docs",
    publisher: "openai",
    description: "Turns a Notion spec into an implementation plan with tracked tasks.",
  },
  {
    name: "jupyter-notebook",
    field: "docs",
    publisher: "openai",
    description: "Creates and edits clean Jupyter notebooks for experiments and tutorials.",
  },

  // Added: backend
  {
    name: "stripe-best-practices",
    field: "backend",
    publisher: "stripe",
    description: "Official guidance for building correct, secure Stripe payment integrations.",
  },
  { name: "upgrade-stripe", field: "backend", publisher: "stripe", description: "Upgrades Stripe API versions and SDKs safely." },
  {
    name: "netlify-functions",
    field: "backend",
    publisher: "netlify",
    description: "Writes and deploys Netlify serverless functions in TypeScript, JavaScript or Go.",
  },
  {
    name: "netlify-edge-functions",
    field: "backend",
    publisher: "netlify",
    description: "Middleware, geolocation and personalization at the edge on Netlify.",
  },
  {
    name: "netlify-deploy",
    field: "backend",
    publisher: "netlify",
    description: "Sets up Git deploys, deploy contexts and production releases on Netlify.",
  },
  { name: "neon-postgres", field: "backend", publisher: "neon", description: "Connects to and builds on Neon's serverless Postgres." },
  {
    name: "neon-postgres-branches",
    field: "backend",
    publisher: "neon",
    gem: true,
    description: "Uses database branches for previews, tests and safe migrations.",
  },
  {
    name: "better-auth-best-practices",
    field: "backend",
    publisher: "betterauth",
    description: "Configures Better Auth servers, clients, sessions, adapters and plugins correctly.",
  },
  {
    name: "create-auth",
    field: "backend",
    publisher: "betterauth",
    description: "Scaffolds full authentication, from OAuth providers to login pages.",
  },
  {
    name: "firebase-basics",
    field: "backend",
    publisher: "firebase",
    description: "The day‑to‑day Firebase workflow: CLI, projects and core services.",
  },
  {
    name: "mongodb-schema-design",
    field: "backend",
    publisher: "mongodb",
    description: "Document schema patterns and anti‑patterns, including embed versus reference.",
  },
  {
    name: "mongodb-query-optimizer",
    field: "backend",
    publisher: "mongodb",
    description: "Diagnoses slow MongoDB queries and recommends indexes.",
  },
  {
    name: "redis-core",
    field: "backend",
    publisher: "redis",
    description: "Picks the right Redis data structure and a consistent key naming scheme.",
  },
  {
    name: "query",
    field: "backend",
    publisher: "duckdb",
    gem: true,
    description: "Runs fast SQL over local databases and files with DuckDB.",
  },
  {
    name: "read-file",
    field: "backend",
    publisher: "duckdb",
    gem: true,
    description: "Reads CSV, JSON, Parquet, Excel and spatial files, locally or remotely.",
  },
  { name: "apollo-server", field: "backend", publisher: "apollo", description: "Builds GraphQL servers with Apollo Server." },
  {
    name: "apollo-client",
    field: "backend",
    publisher: "apollo",
    description: "Builds React apps on Apollo Client with good caching patterns.",
  },
  { name: "graphql-schema", field: "backend", publisher: "apollo", description: "Designs clear, evolvable GraphQL schemas." },
  {
    name: "resend",
    field: "backend",
    publisher: "resend",
    description: "Sends and receives email with the Resend API, including webhooks and broadcasts.",
  },
  { name: "react-email", field: "backend", publisher: "resend", description: "Builds HTML email templates with React components." },
  {
    name: "email-best-practices",
    field: "backend",
    publisher: "resend",
    gem: true,
    description: "Fixes deliverability: SPF, DKIM, DMARC, bounces, compliance and accessible email.",
  },
  {
    name: "terraform-skill",
    field: "backend",
    publisher: "terraform",
    gem: true,
    description: "Writes, reviews and debugs Terraform and OpenTofu, from modules and tests to state recovery.",
  },
  {
    name: "wp-block-development",
    field: "backend",
    publisher: "wordpress",
    description: "Builds Gutenberg blocks with block.json, dynamic rendering and migrations.",
  },
  {
    name: "wp-plugin-development",
    field: "backend",
    publisher: "wordpress",
    description: "Plugin architecture, hooks, settings and security done the WordPress way.",
  },
  {
    name: "observability-and-instrumentation",
    field: "backend",
    publisher: "addy",
    description: "Structured logs, metrics, tracing and alerts so production issues are diagnosable.",
  },
  {
    name: "api-and-interface-design",
    field: "backend",
    publisher: "addy",
    description: "Contract‑first APIs and module boundaries that stay stable as they grow.",
  },
  {
    name: "dd-apm",
    field: "backend",
    publisher: "datadog",
    description: "Sets up Datadog APM and analyzes traces, services and performance.",
  },

  // Added: security
  {
    name: "security-review",
    field: "security",
    publisher: "sentry",
    description: "Reviews code for injection, XSS, authentication and authorization flaws.",
  },
  {
    name: "gha-security-review",
    field: "security",
    publisher: "sentry",
    gem: true,
    description: "Finds exploitable GitHub Actions workflows, such as pwn requests and expression injection.",
  },
  {
    name: "skill-scanner",
    field: "security",
    publisher: "sentry",
    gem: true,
    description: "Scans agent skills for malicious or risky instructions before you install them.",
  },
  {
    name: "security-and-hardening",
    field: "security",
    publisher: "addy",
    description: "OWASP Top Ten defenses, auth patterns, secrets and dependency audits.",
  },
  {
    name: "firebase-security-rules-auditor",
    field: "security",
    publisher: "firebase",
    gem: true,
    description: "Audits Firestore and Storage security rules for data exposure.",
  },

  // Added: AI
  {
    name: "gemini-api-dev",
    field: "ai",
    publisher: "gemini",
    description: "Builds with the Gemini API: chat, multimodal input, image, video and speech.",
  },
  {
    name: "openai-docs",
    field: "ai",
    publisher: "openai",
    description: "Answers questions about OpenAI APIs with current, cited official documentation.",
  },
  {
    name: "llm-context",
    field: "ai",
    publisher: "brave",
    gem: true,
    description: "Fetches web content already cleaned up for LLMs, ideal for grounding and RAG.",
  },
  { name: "web-search", field: "ai", publisher: "brave", description: "Gives the agent fresh, ranked web search results." },
  {
    name: "redis-semantic-cache",
    field: "ai",
    publisher: "redis",
    gem: true,
    description: "Caches LLM responses by meaning to cut latency and cost.",
  },
  {
    name: "agent-observability-trace-rca",
    field: "ai",
    publisher: "datadog",
    gem: true,
    description: "Walks production LLM traces to find the root cause of failures.",
  },

  // Added: productivity
  {
    name: "skill-writer",
    field: "productivity",
    publisher: "sentry",
    description: "Writes and improves skills that follow the Agent Skills specification.",
  },
  {
    name: "prompt-optimizer",
    field: "productivity",
    publisher: "sentry",
    gem: true,
    description: "Rewrites system and agent prompts to be clearer and more reliable.",
  },
]

export const publisherById = Object.fromEntries(publishers.map((p) => [p.id, p])) as Record<PublisherId, Publisher>

export function installCommand(skill: Skill) {
  const publisher = publisherById[skill.publisher]
  return publisher.install ?? `npx skills add ${publisher.repo} --skill ${skill.name}`
}

/** Agents that read the open Agent Skills format. */
export const skillAgents: { name: string; icon?: string }[] = [
  { name: "Claude Code", icon: "claude" },
  { name: "Codex" },
  { name: "Cursor", icon: "cursor" },
  { name: "GitHub Copilot", icon: "githubcopilot" },
  { name: "Gemini CLI", icon: "googlegemini" },
  { name: "Windsurf", icon: "windsurf" },
  { name: "Cline", icon: "cline" },
  { name: "OpenCode", icon: "opencode" },
]
