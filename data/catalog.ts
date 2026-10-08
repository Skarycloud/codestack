// The single source of truth for every tool listed on CodeStack.
// `icon` is a Simple Icons slug. Run `npm run icons` after adding a new one.

export type Audience = "develop" | "design"

export type CategoryId =
  | "frameworks"
  | "languages"
  | "mobile"
  | "backend"
  | "databases"
  | "devtools"
  | "hosting"
  | "services"
  | "ai"
  | "design-tools"
  | "inspiration"
  | "typography"
  | "icons"
  | "color"
  | "assets"
  | "components"
  | "motion"

export interface Category {
  id: CategoryId
  name: string
  audience: Audience
  tagline: string
}

export interface Tool {
  name: string
  url: string
  description: string
  kind: string
  category: CategoryId
  icon?: string
  openSource?: boolean
  paid?: boolean
}

export const categories: Category[] = [
  { id: "frameworks", name: "Frameworks", audience: "develop", tagline: "The foundations of the modern web." },
  { id: "languages", name: "Languages", audience: "develop", tagline: "Pick the right tongue for the job." },
  { id: "mobile", name: "Mobile", audience: "develop", tagline: "Ship to every pocket." },
  { id: "backend", name: "Backend", audience: "develop", tagline: "Servers, runtimes and APIs." },
  { id: "databases", name: "Databases", audience: "develop", tagline: "Where your data lives." },
  { id: "devtools", name: "Dev Tools", audience: "develop", tagline: "Build, test and ship faster." },
  { id: "hosting", name: "Hosting", audience: "develop", tagline: "From localhost to the world." },
  { id: "services", name: "Services", audience: "develop", tagline: "Auth, payments, email, insight." },
  { id: "ai", name: "AI", audience: "develop", tagline: "Models and tools for intelligent apps." },
  { id: "design-tools", name: "Design Tools", audience: "design", tagline: "Where ideas take shape." },
  { id: "inspiration", name: "Inspiration", audience: "design", tagline: "The best work on the internet." },
  { id: "typography", name: "Typography", audience: "design", tagline: "Type that sets the tone." },
  { id: "icons", name: "Icon Sets", audience: "design", tagline: "Pixel‑perfect symbols, free." },
  { id: "color", name: "Color", audience: "design", tagline: "Palettes that just work." },
  { id: "assets", name: "Photos & Art", audience: "design", tagline: "Imagery and illustration." },
  { id: "components", name: "UI Kits", audience: "design", tagline: "Components, ready to compose." },
  { id: "motion", name: "Motion", audience: "design", tagline: "Make interfaces feel alive." },
]

export const tools: Tool[] = [
  // Frameworks
  { name: "React", url: "https://react.dev", description: "The library for web and native user interfaces.", kind: "UI Library", category: "frameworks", icon: "react", openSource: true },
  { name: "Next.js", url: "https://nextjs.org", description: "The React framework for the web, by Vercel.", kind: "React Framework", category: "frameworks", icon: "nextdotjs", openSource: true },
  { name: "Vue.js", url: "https://vuejs.org", description: "The progressive JavaScript framework.", kind: "Framework", category: "frameworks", icon: "vuedotjs", openSource: true },
  { name: "Svelte", url: "https://svelte.dev", description: "Cybernetically enhanced, compiler‑first web apps.", kind: "Framework", category: "frameworks", icon: "svelte", openSource: true },
  { name: "Angular", url: "https://angular.dev", description: "The web development framework for building at scale.", kind: "Framework", category: "frameworks", icon: "angular", openSource: true },
  { name: "Astro", url: "https://astro.build", description: "The web framework for content‑driven websites.", kind: "Framework", category: "frameworks", icon: "astro", openSource: true },
  { name: "Solid", url: "https://www.solidjs.com", description: "Simple and performant reactivity for UIs.", kind: "UI Library", category: "frameworks", icon: "solid", openSource: true },
  { name: "React Router", url: "https://reactrouter.com", description: "Full‑stack routing and data framework for React.", kind: "Framework", category: "frameworks", icon: "reactrouter", openSource: true },
  { name: "Tailwind CSS", url: "https://tailwindcss.com", description: "Rapidly build modern sites without leaving your HTML.", kind: "CSS Framework", category: "frameworks", icon: "tailwindcss", openSource: true },
  { name: "Bootstrap", url: "https://getbootstrap.com", description: "Build fast, responsive sites with a proven toolkit.", kind: "CSS Framework", category: "frameworks", icon: "bootstrap", openSource: true },
  { name: "Preact", url: "https://preactjs.com", description: "A fast 3kB alternative to React with the same API.", kind: "UI Library", category: "frameworks", icon: "preact", openSource: true },
  { name: "Alpine.js", url: "https://alpinejs.dev", description: "Sprinkle reactive behaviour right into your markup.", kind: "UI Library", category: "frameworks", icon: "alpinedotjs", openSource: true },
  { name: "Lit", url: "https://lit.dev", description: "Fast, lightweight, standards‑based web components.", kind: "Web Components", category: "frameworks", icon: "lit", openSource: true },
  { name: "TanStack", url: "https://tanstack.com", description: "High‑quality open‑source libraries: Query, Router, Table.", kind: "Libraries", category: "frameworks", icon: "tanstack", openSource: true },
  { name: "Gatsby", url: "https://www.gatsbyjs.com", description: "React‑based framework for fast static sites.", kind: "Static Site", category: "frameworks", icon: "gatsby", openSource: true },
  { name: "Ember.js", url: "https://emberjs.com", description: "A framework for ambitious web developers.", kind: "Framework", category: "frameworks", icon: "emberdotjs", openSource: true },

  // Languages
  { name: "TypeScript", url: "https://www.typescriptlang.org", description: "JavaScript with syntax for types.", kind: "Language", category: "languages", icon: "typescript", openSource: true },
  { name: "JavaScript", url: "https://developer.mozilla.org/docs/Web/JavaScript", description: "The language of the web, documented on MDN.", kind: "Language", category: "languages", icon: "javascript", openSource: true },
  { name: "Python", url: "https://www.python.org", description: "A language that lets you work quickly and integrate well.", kind: "Language", category: "languages", icon: "python", openSource: true },
  { name: "Rust", url: "https://www.rust-lang.org", description: "Reliable, efficient software with memory safety.", kind: "Language", category: "languages", icon: "rust", openSource: true },
  { name: "Go", url: "https://go.dev", description: "Build simple, secure, scalable systems.", kind: "Language", category: "languages", icon: "go", openSource: true },
  { name: "PHP", url: "https://www.php.net", description: "A popular general‑purpose language for the web.", kind: "Language", category: "languages", icon: "php", openSource: true },

  // Mobile
  { name: "React Native", url: "https://reactnative.dev", description: "Build native apps for Android and iOS using React.", kind: "Cross‑platform", category: "mobile", icon: "react", openSource: true },
  { name: "Expo", url: "https://expo.dev", description: "The fastest way to build and ship React Native apps.", kind: "Platform", category: "mobile", icon: "expo", openSource: true },
  { name: "Flutter", url: "https://flutter.dev", description: "Google's UI toolkit for multi‑platform apps.", kind: "Cross‑platform", category: "mobile", icon: "flutter", openSource: true },
  { name: "Swift", url: "https://www.swift.org", description: "Apple's powerful, intuitive language for every platform.", kind: "Language", category: "mobile", icon: "swift", openSource: true },
  { name: "Kotlin", url: "https://kotlinlang.org", description: "A concise, multiplatform language by JetBrains.", kind: "Language", category: "mobile", icon: "kotlin", openSource: true },
  { name: "Ionic", url: "https://ionicframework.com", description: "Cross‑platform apps with web technologies.", kind: "Hybrid", category: "mobile", icon: "ionic", openSource: true },

  // Backend
  { name: "Node.js", url: "https://nodejs.org", description: "Run JavaScript everywhere, built on Chrome's V8.", kind: "Runtime", category: "backend", icon: "nodedotjs", openSource: true },
  { name: "Bun", url: "https://bun.sh", description: "All‑in‑one JavaScript runtime and toolkit.", kind: "Runtime", category: "backend", icon: "bun", openSource: true },
  { name: "Deno", url: "https://deno.com", description: "The modern, secure runtime for JavaScript and TypeScript.", kind: "Runtime", category: "backend", icon: "deno", openSource: true },
  { name: "Express", url: "https://expressjs.com", description: "Fast, unopinionated, minimalist web framework for Node.", kind: "Node Framework", category: "backend", icon: "express", openSource: true },
  { name: "NestJS", url: "https://nestjs.com", description: "A progressive Node.js framework for scalable servers.", kind: "Node Framework", category: "backend", icon: "nestjs", openSource: true },
  { name: "Django", url: "https://www.djangoproject.com", description: "The web framework for perfectionists with deadlines.", kind: "Python Framework", category: "backend", icon: "django", openSource: true },
  { name: "FastAPI", url: "https://fastapi.tiangolo.com", description: "High performance Python APIs, easy to learn.", kind: "Python Framework", category: "backend", icon: "fastapi", openSource: true },
  { name: "Flask", url: "https://flask.palletsprojects.com", description: "A lightweight WSGI web application framework.", kind: "Python Framework", category: "backend", icon: "flask", openSource: true },
  { name: "Laravel", url: "https://laravel.com", description: "The PHP framework for web artisans.", kind: "PHP Framework", category: "backend", icon: "laravel", openSource: true },
  { name: "Ruby on Rails", url: "https://rubyonrails.org", description: "Compress the complexity of modern web apps.", kind: "Ruby Framework", category: "backend", icon: "rubyonrails", openSource: true },
  { name: "Spring Boot", url: "https://spring.io/projects/spring-boot", description: "Production‑grade Java applications that just run.", kind: "Java Framework", category: "backend", icon: "springboot", openSource: true },
  { name: ".NET", url: "https://dotnet.microsoft.com", description: "Free, cross‑platform developer platform by Microsoft.", kind: "Platform", category: "backend", icon: "dotnet", openSource: true },
  { name: "GraphQL", url: "https://graphql.org", description: "A query language for your API.", kind: "API", category: "backend", icon: "graphql", openSource: true },
  { name: "tRPC", url: "https://trpc.io", description: "End‑to‑end typesafe APIs made easy.", kind: "API", category: "backend", icon: "trpc", openSource: true },

  // Databases
  { name: "PostgreSQL", url: "https://www.postgresql.org", description: "The world's most advanced open source database.", kind: "SQL", category: "databases", icon: "postgresql", openSource: true },
  { name: "MySQL", url: "https://www.mysql.com", description: "The world's most popular open source database.", kind: "SQL", category: "databases", icon: "mysql", openSource: true },
  { name: "SQLite", url: "https://www.sqlite.org", description: "Small, fast, self‑contained SQL database engine.", kind: "SQL", category: "databases", icon: "sqlite", openSource: true },
  { name: "MongoDB", url: "https://www.mongodb.com", description: "The developer data platform, document‑first.", kind: "NoSQL", category: "databases", icon: "mongodb" },
  { name: "Redis", url: "https://redis.io", description: "In‑memory data store for caching and real‑time.", kind: "Key‑Value", category: "databases", icon: "redis" },
  { name: "Supabase", url: "https://supabase.com", description: "The open source Postgres development platform.", kind: "Backend as a Service", category: "databases", icon: "supabase", openSource: true },
  { name: "Firebase", url: "https://firebase.google.com", description: "Google's app development platform.", kind: "Backend as a Service", category: "databases", icon: "firebase" },
  { name: "Convex", url: "https://www.convex.dev", description: "The reactive backend database for app developers.", kind: "Backend as a Service", category: "databases", icon: "convex", openSource: true },
  { name: "Neon", url: "https://neon.com", description: "Serverless Postgres with branching.", kind: "Serverless SQL", category: "databases", icon: "neon" },
  { name: "Turso", url: "https://turso.tech", description: "SQLite for production, at the edge.", kind: "Serverless SQL", category: "databases", icon: "turso" },
  { name: "Prisma", url: "https://www.prisma.io", description: "Next‑generation Node.js and TypeScript ORM.", kind: "ORM", category: "databases", icon: "prisma", openSource: true },
  { name: "Drizzle", url: "https://orm.drizzle.team", description: "Headless TypeScript ORM with a SQL‑like API.", kind: "ORM", category: "databases", icon: "drizzle", openSource: true },
  { name: "PocketBase", url: "https://pocketbase.io", description: "Open source backend in one single file.", kind: "Backend as a Service", category: "databases", icon: "pocketbase", openSource: true },
  { name: "Cassandra", url: "https://cassandra.apache.org", description: "Highly scalable, distributed NoSQL database.", kind: "NoSQL", category: "databases", icon: "apachecassandra", openSource: true },
  { name: "DynamoDB", url: "https://aws.amazon.com/dynamodb", description: "Serverless NoSQL database by AWS.", kind: "NoSQL", category: "databases" },

  // Dev Tools
  { name: "VS Code", url: "https://code.visualstudio.com", description: "The free, extensible code editor by Microsoft.", kind: "Editor", category: "devtools", openSource: true },
  { name: "Git", url: "https://git-scm.com", description: "Distributed version control for everything.", kind: "Version Control", category: "devtools", icon: "git", openSource: true },
  { name: "GitHub", url: "https://github.com", description: "Where the world builds software.", kind: "Code Hosting", category: "devtools", icon: "github" },
  { name: "GitLab", url: "https://about.gitlab.com", description: "The complete DevSecOps platform.", kind: "Code Hosting", category: "devtools", icon: "gitlab", openSource: true },
  { name: "Docker", url: "https://www.docker.com", description: "Build, share and run containerised apps.", kind: "Containers", category: "devtools", icon: "docker" },
  { name: "Kubernetes", url: "https://kubernetes.io", description: "Production‑grade container orchestration.", kind: "Orchestration", category: "devtools", icon: "kubernetes", openSource: true },
  { name: "Vite", url: "https://vite.dev", description: "Next generation frontend tooling. Instant.", kind: "Build Tool", category: "devtools", icon: "vite", openSource: true },
  { name: "Turborepo", url: "https://turborepo.com", description: "High‑performance build system for monorepos.", kind: "Build Tool", category: "devtools", icon: "turborepo", openSource: true },
  { name: "Webpack", url: "https://webpack.js.org", description: "The battle‑tested module bundler.", kind: "Bundler", category: "devtools", icon: "webpack", openSource: true },
  { name: "pnpm", url: "https://pnpm.io", description: "Fast, disk space efficient package manager.", kind: "Package Manager", category: "devtools", icon: "pnpm", openSource: true },
  { name: "Biome", url: "https://biomejs.dev", description: "One toolchain to format and lint your web project.", kind: "Linting", category: "devtools", icon: "biome", openSource: true },
  { name: "ESLint", url: "https://eslint.org", description: "Find and fix problems in your JavaScript.", kind: "Linting", category: "devtools", icon: "eslint", openSource: true },
  { name: "Prettier", url: "https://prettier.io", description: "An opinionated code formatter.", kind: "Formatting", category: "devtools", icon: "prettier", openSource: true },
  { name: "Vitest", url: "https://vitest.dev", description: "Next generation testing framework, powered by Vite.", kind: "Testing", category: "devtools", icon: "vitest", openSource: true },
  { name: "Playwright", url: "https://playwright.dev", description: "Reliable end‑to‑end testing for modern web apps.", kind: "Testing", category: "devtools", openSource: true },
  { name: "Jest", url: "https://jestjs.io", description: "Delightful JavaScript testing.", kind: "Testing", category: "devtools", icon: "jest", openSource: true },
  { name: "Cypress", url: "https://www.cypress.io", description: "Browser testing for anything that runs in a browser.", kind: "Testing", category: "devtools", icon: "cypress", openSource: true },
  { name: "Storybook", url: "https://storybook.js.org", description: "Build UI components and pages in isolation.", kind: "UI Workshop", category: "devtools", icon: "storybook", openSource: true },
  { name: "Postman", url: "https://www.postman.com", description: "The world's leading API platform.", kind: "API Client", category: "devtools", icon: "postman" },
  { name: "Insomnia", url: "https://insomnia.rest", description: "Open source API client for REST, GraphQL and gRPC.", kind: "API Client", category: "devtools", icon: "insomnia", openSource: true },

  // Hosting
  { name: "Vercel", url: "https://vercel.com", description: "Build and deploy the best web experiences.", kind: "Frontend Cloud", category: "hosting", icon: "vercel" },
  { name: "Netlify", url: "https://www.netlify.com", description: "Connect everything. Build anything.", kind: "Frontend Cloud", category: "hosting", icon: "netlify" },
  { name: "Cloudflare", url: "https://www.cloudflare.com", description: "Edge network, Workers and Pages for global apps.", kind: "Edge Cloud", category: "hosting", icon: "cloudflare" },
  { name: "Railway", url: "https://railway.com", description: "Instant deploys for apps, databases and more.", kind: "PaaS", category: "hosting", icon: "railway" },
  { name: "Render", url: "https://render.com", description: "The unified cloud to build and run your apps.", kind: "PaaS", category: "hosting", icon: "render" },
  { name: "Fly.io", url: "https://fly.io", description: "Run full‑stack apps close to your users.", kind: "PaaS", category: "hosting", icon: "flydotio" },
  { name: "DigitalOcean", url: "https://www.digitalocean.com", description: "Simple, scalable cloud infrastructure.", kind: "Cloud", category: "hosting", icon: "digitalocean" },

  // Services
  { name: "Stripe", url: "https://stripe.com", description: "Financial infrastructure for the internet.", kind: "Payments", category: "services", icon: "stripe", paid: true },
  { name: "Clerk", url: "https://clerk.com", description: "Complete user management and authentication.", kind: "Auth", category: "services", icon: "clerk" },
  { name: "Auth0", url: "https://auth0.com", description: "Secure access for everyone, by Okta.", kind: "Auth", category: "services", icon: "auth0" },
  { name: "Resend", url: "https://resend.com", description: "Email for developers.", kind: "Email", category: "services", icon: "resend" },
  { name: "Sentry", url: "https://sentry.io", description: "Application monitoring and error tracking.", kind: "Monitoring", category: "services", icon: "sentry", openSource: true },
  { name: "PostHog", url: "https://posthog.com", description: "Product analytics, session replay and flags.", kind: "Analytics", category: "services", icon: "posthog", openSource: true },

  // AI
  { name: "Claude", url: "https://claude.ai", description: "Anthropic's AI for thinking, writing and coding.", kind: "Assistant", category: "ai", icon: "claude" },
  { name: "Anthropic API", url: "https://docs.anthropic.com", description: "Build with Claude models on the developer platform.", kind: "Model API", category: "ai", icon: "anthropic" },
  { name: "OpenAI API", url: "https://platform.openai.com", description: "Build with OpenAI's models and tools.", kind: "Model API", category: "ai" },
  { name: "Hugging Face", url: "https://huggingface.co", description: "The home of open models, datasets and Spaces.", kind: "Model Hub", category: "ai", icon: "huggingface" },
  { name: "Ollama", url: "https://ollama.com", description: "Run large language models locally.", kind: "Local Models", category: "ai", icon: "ollama", openSource: true },
  { name: "Google Colab", url: "https://colab.research.google.com", description: "Free hosted Jupyter notebooks with GPUs.", kind: "Notebooks", category: "ai", icon: "googlecolab" },

  // Design Tools
  { name: "Figma", url: "https://www.figma.com", description: "The collaborative interface design tool.", kind: "Interface Design", category: "design-tools", icon: "figma" },
  { name: "Framer", url: "https://www.framer.com", description: "Design and publish stunning sites, no code.", kind: "Site Builder", category: "design-tools", icon: "framer" },
  { name: "Penpot", url: "https://penpot.app", description: "Open source design and prototyping for teams.", kind: "Interface Design", category: "design-tools", icon: "penpot", openSource: true },
  { name: "Sketch", url: "https://www.sketch.com", description: "The Mac‑native design platform.", kind: "Interface Design", category: "design-tools", icon: "sketch", paid: true },
  { name: "Webflow", url: "https://webflow.com", description: "Build professional custom websites visually.", kind: "Site Builder", category: "design-tools", icon: "webflow" },
  { name: "Spline", url: "https://spline.design", description: "Design and collaborate in 3D, in the browser.", kind: "3D Design", category: "design-tools" },
  { name: "Blender", url: "https://www.blender.org", description: "The free and open source 3D creation suite.", kind: "3D Suite", category: "design-tools", icon: "blender", openSource: true },
  { name: "Canva", url: "https://www.canva.com", description: "Design anything, publish anywhere.", kind: "Graphic Design", category: "design-tools" },
  { name: "Inkscape", url: "https://inkscape.org", description: "Professional vector graphics editor, free.", kind: "Vector", category: "design-tools", icon: "inkscape", openSource: true },
  { name: "GIMP", url: "https://www.gimp.org", description: "The free and open source image editor.", kind: "Raster", category: "design-tools", icon: "gimp", openSource: true },
  { name: "Krita", url: "https://krita.org", description: "Professional digital painting, made by artists.", kind: "Painting", category: "design-tools", icon: "krita", openSource: true },
  { name: "DaVinci Resolve", url: "https://www.blackmagicdesign.com/products/davinciresolve", description: "Editing, color, VFX and audio in one tool.", kind: "Video", category: "design-tools", icon: "davinciresolve" },

  // Inspiration
  { name: "Dribbble", url: "https://dribbble.com", description: "Discover the world's top designers and creatives.", kind: "Community", category: "inspiration", icon: "dribbble" },
  { name: "Behance", url: "https://www.behance.net", description: "Showcase and discover creative work.", kind: "Community", category: "inspiration", icon: "behance" },
  { name: "Awwwards", url: "https://www.awwwards.com", description: "The awards for design, creativity and innovation.", kind: "Awards", category: "inspiration", icon: "awwwards" },
  { name: "Mobbin", url: "https://mobbin.com", description: "The world's largest library of real app screens.", kind: "UI Library", category: "inspiration" },
  { name: "Godly", url: "https://godly.website", description: "Astronomically good web design inspiration.", kind: "Gallery", category: "inspiration" },
  { name: "Land‑book", url: "https://land-book.com", description: "Hand‑picked landing page inspiration.", kind: "Gallery", category: "inspiration" },
  { name: "Lapa Ninja", url: "https://www.lapa.ninja", description: "The best landing page examples, curated.", kind: "Gallery", category: "inspiration" },
  { name: "Minimal Gallery", url: "https://minimal.gallery", description: "Inspiration for the minimalist in you.", kind: "Gallery", category: "inspiration" },
  { name: "Siteinspire", url: "https://www.siteinspire.com", description: "A showcase of the finest web and interactive design.", kind: "Gallery", category: "inspiration" },
  { name: "Page Flows", url: "https://pageflows.com", description: "User flow videos and screenshots of real products.", kind: "UX Flows", category: "inspiration", paid: true },

  // Typography
  { name: "Google Fonts", url: "https://fonts.google.com", description: "Free, open source fonts optimised for the web.", kind: "Font Library", category: "typography", icon: "googlefonts", openSource: true },
  { name: "Fontshare", url: "https://www.fontshare.com", description: "Quality fonts by Indian Type Foundry, free.", kind: "Font Library", category: "typography" },
  { name: "Uncut", url: "https://uncut.wtf", description: "A curated catalogue of free contemporary typefaces.", kind: "Font Library", category: "typography" },
  { name: "Velvetyne", url: "https://velvetyne.fr", description: "Libre, experimental type foundry.", kind: "Foundry", category: "typography", openSource: true },
  { name: "Font Squirrel", url: "https://www.fontsquirrel.com", description: "Free fonts licensed for commercial work.", kind: "Font Library", category: "typography" },
  { name: "Typescale", url: "https://typescale.com", description: "Visually generate a modular type scale.", kind: "Utility", category: "typography" },
  { name: "Fontjoy", url: "https://fontjoy.com", description: "Generate font pairings in one click.", kind: "Utility", category: "typography" },

  // Icon Sets
  { name: "Lucide", url: "https://lucide.dev", description: "Beautiful and consistent open source icons.", kind: "Icon Set", category: "icons", icon: "lucide", openSource: true },
  { name: "Phosphor", url: "https://phosphoricons.com", description: "A flexible icon family in six weights.", kind: "Icon Set", category: "icons", icon: "phosphoricons", openSource: true },
  { name: "Heroicons", url: "https://heroicons.com", description: "Hand‑crafted SVG icons by the Tailwind team.", kind: "Icon Set", category: "icons", openSource: true },
  { name: "Tabler Icons", url: "https://tabler.io/icons", description: "Over 5,000 free, pixel‑perfect icons.", kind: "Icon Set", category: "icons", openSource: true },
  { name: "Iconoir", url: "https://iconoir.com", description: "An open source library of 1,500+ icons.", kind: "Icon Set", category: "icons", openSource: true },
  { name: "Material Symbols", url: "https://fonts.google.com/icons", description: "Google's variable icon font.", kind: "Icon Set", category: "icons", icon: "materialdesign", openSource: true },
  { name: "Simple Icons", url: "https://simpleicons.org", description: "Free SVG icons for popular brands.", kind: "Brand Icons", category: "icons", icon: "simpleicons", openSource: true },
  { name: "Iconify", url: "https://icon-sets.iconify.design", description: "200,000+ open source icons in one place.", kind: "Aggregator", category: "icons", icon: "iconify", openSource: true },
  { name: "Font Awesome", url: "https://fontawesome.com", description: "The internet's icon library and toolkit.", kind: "Icon Set", category: "icons", icon: "fontawesome" },

  // Color
  { name: "Coolors", url: "https://coolors.co", description: "The super fast color palette generator.", kind: "Palettes", category: "color" },
  { name: "Realtime Colors", url: "https://www.realtimecolors.com", description: "Preview your palette on a real website.", kind: "Palettes", category: "color" },
  { name: "Radix Colors", url: "https://www.radix-ui.com/colors", description: "An accessible color system for UIs.", kind: "Color System", category: "color", icon: "radixui", openSource: true },
  { name: "UI Colors", url: "https://uicolors.app", description: "Generate Tailwind CSS color scales instantly.", kind: "Scales", category: "color" },
  { name: "Huemint", url: "https://huemint.com", description: "Machine learning color palettes for brands.", kind: "Palettes", category: "color" },
  { name: "Happy Hues", url: "https://www.happyhues.co", description: "Curated palettes shown in real context.", kind: "Palettes", category: "color" },
  { name: "Contrast Checker", url: "https://webaim.org/resources/contrastchecker", description: "Check WCAG contrast ratios, by WebAIM.", kind: "Accessibility", category: "color" },

  // Photos & Art
  { name: "Unsplash", url: "https://unsplash.com", description: "Beautiful, free images from generous creators.", kind: "Photos", category: "assets", icon: "unsplash" },
  { name: "Pexels", url: "https://www.pexels.com", description: "Free stock photos and videos.", kind: "Photos", category: "assets", icon: "pexels" },
  { name: "Pixabay", url: "https://pixabay.com", description: "Royalty‑free images, video and music.", kind: "Photos", category: "assets", icon: "pixabay" },
  { name: "unDraw", url: "https://undraw.co", description: "Open source illustrations in any color.", kind: "Illustrations", category: "assets", openSource: true },
  { name: "Storyset", url: "https://storyset.com", description: "Customisable, animated illustrations.", kind: "Illustrations", category: "assets" },
  { name: "Blush", url: "https://blush.design", description: "Mix‑and‑match illustrations by global artists.", kind: "Illustrations", category: "assets" },
  { name: "Open Peeps", url: "https://www.openpeeps.com", description: "A hand‑drawn illustration library, CC0.", kind: "Illustrations", category: "assets", openSource: true },
  { name: "Haikei", url: "https://haikei.app", description: "Generate unique SVG shapes and backgrounds.", kind: "Generators", category: "assets" },
  { name: "Hairline", url: "https://hairline.lucasmarkes.com", description: "Interactive isometric line illustrations for React or plain DOM.", kind: "Illustrations", category: "assets", openSource: true },
  { name: "Blobatar", url: "https://blobatar.dev", description: "Deterministic blob avatars from any string, in a tiny package.", kind: "Avatars", category: "assets" },
  { name: "Avatar Lab", url: "https://avatars.bible-strong.app", description: "Design procedural 2D avatars and animations, export React, SVG or PNG.", kind: "Avatars", category: "assets" },

  // UI Kits
  { name: "shadcn/ui", url: "https://ui.shadcn.com", description: "Beautifully designed components you own.", kind: "Components", category: "components", icon: "shadcnui", openSource: true },
  { name: "Radix UI", url: "https://www.radix-ui.com", description: "Unstyled, accessible primitives for React.", kind: "Primitives", category: "components", icon: "radixui", openSource: true },
  { name: "Headless UI", url: "https://headlessui.com", description: "Unstyled, accessible components for Tailwind.", kind: "Primitives", category: "components", icon: "headlessui", openSource: true },
  { name: "MUI", url: "https://mui.com", description: "Move faster with intuitive React UI tools.", kind: "Components", category: "components", icon: "mui", openSource: true },
  { name: "Chakra UI", url: "https://chakra-ui.com", description: "Accessible React components that are a joy to use.", kind: "Components", category: "components", icon: "chakraui", openSource: true },
  { name: "Mantine", url: "https://mantine.dev", description: "A fully featured React components library.", kind: "Components", category: "components", icon: "mantine", openSource: true },
  { name: "daisyUI", url: "https://daisyui.com", description: "The most popular component library for Tailwind.", kind: "Components", category: "components", icon: "daisyui", openSource: true },
  { name: "Aceternity UI", url: "https://ui.aceternity.com", description: "Trending, animated components for React.", kind: "Animated", category: "components" },
  { name: "Magic UI", url: "https://magicui.design", description: "UI library for design engineers.", kind: "Animated", category: "components", openSource: true },
  { name: "Material Design", url: "https://m3.material.io", description: "Google's open source design system.", kind: "Design System", category: "components", icon: "materialdesign" },

  // Motion
  { name: "Motion", url: "https://motion.dev", description: "Production‑grade animation for React and JS.", kind: "Library", category: "motion", openSource: true },
  { name: "GSAP", url: "https://gsap.com", description: "The professional‑grade JavaScript animation platform.", kind: "Library", category: "motion", icon: "gsap" },
  { name: "Rive", url: "https://rive.app", description: "Interactive, real‑time animations for any platform.", kind: "Interactive", category: "motion", icon: "rive" },
  { name: "LottieFiles", url: "https://lottiefiles.com", description: "Lightweight, scalable animations for apps and web.", kind: "Animations", category: "motion", icon: "lottiefiles" },
  { name: "Three.js", url: "https://threejs.org", description: "Lightweight 3D library for the browser.", kind: "3D", category: "motion", icon: "threedotjs", openSource: true },
  { name: "Anime.js", url: "https://animejs.com", description: "A fast, multipurpose JavaScript animation engine.", kind: "Library", category: "motion", icon: "animedotjs", openSource: true },
  { name: "Easings.net", url: "https://easings.net", description: "Visual cheat sheet of easing functions.", kind: "Reference", category: "motion" },
  { name: "Cubic Bézier", url: "https://cubic-bezier.com", description: "Craft and compare your own timing curves.", kind: "Utility", category: "motion" },
]

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<CategoryId, Category>

export function toolsIn(category: CategoryId) {
  return tools.filter((t) => t.category === category)
}

export function audienceOf(tool: Tool): Audience {
  return categoryById[tool.category].audience
}

export const stats = {
  tools: tools.length,
  categories: categories.length,
  developers: tools.filter((t) => audienceOf(t) === "develop").length,
  designers: tools.filter((t) => audienceOf(t) === "design").length,
}
