"use client"
import { useTheme } from "@/context/theme-context"
import { ChevronRight } from "lucide-react"
import { techIcons } from "@/data/tech-icons"

export default function TechDirectoryPage() {
  const { isDarkTheme } = useTheme()

  return (
    <>
      <section className="mb-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-500 to-teal-400 bg-clip-text text-transparent">
            Navigate the Modern Tech Landscape
          </h1>
          <p className={`${isDarkTheme ? "text-gray-400" : "text-gray-600"} text-lg transition-colors`}>
            A comprehensive directory of development technologies, frameworks, and tools. Click on any tech to visit its
            official website.
          </p>
        </div>
      </section>

      {/* Frontend Section */}
      <section id="frontend" className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold">Frontend Technologies</h2>
          <div
            className={`h-px flex-1 ${isDarkTheme ? "bg-gradient-to-r from-purple-800 to-transparent" : "bg-gradient-to-r from-purple-400 to-transparent"} transition-colors`}
          ></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {techIcons
            .filter((icon) => icon.category === "frontend")
            .map((icon) => (
              <TechCard
                key={icon.name}
                name={icon.name}
                description={getDescription(icon.name)}
                svg={icon.svg}
                url={getUrl(icon.name)}
                category={getCategory(icon.name)}
                isDarkTheme={isDarkTheme}
              />
            ))}
        </div>
      </section>

      {/* Backend Section */}
      <section id="backend" className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold">Backend Technologies</h2>
          <div
            className={`h-px flex-1 ${isDarkTheme ? "bg-gradient-to-r from-purple-800 to-transparent" : "bg-gradient-to-r from-purple-400 to-transparent"} transition-colors`}
          ></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {techIcons
            .filter((icon) => icon.category === "backend")
            .map((icon) => (
              <TechCard
                key={icon.name}
                name={icon.name}
                description={getDescription(icon.name)}
                svg={icon.svg}
                url={getUrl(icon.name)}
                category={getCategory(icon.name)}
                isDarkTheme={isDarkTheme}
              />
            ))}
        </div>
      </section>

      {/* Database Section */}
      <section id="database" className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold">Database Technologies</h2>
          <div
            className={`h-px flex-1 ${isDarkTheme ? "bg-gradient-to-r from-purple-800 to-transparent" : "bg-gradient-to-r from-purple-400 to-transparent"} transition-colors`}
          ></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {techIcons
            .filter((icon) => icon.category === "database")
            .map((icon) => (
              <TechCard
                key={icon.name}
                name={icon.name}
                description={getDescription(icon.name)}
                svg={icon.svg}
                url={getUrl(icon.name)}
                category={getCategory(icon.name)}
                isDarkTheme={isDarkTheme}
              />
            ))}
        </div>
      </section>

      {/* DevTools Section */}
      <section id="devtools" className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold">Development Tools</h2>
          <div
            className={`h-px flex-1 ${isDarkTheme ? "bg-gradient-to-r from-purple-800 to-transparent" : "bg-gradient-to-r from-purple-400 to-transparent"} transition-colors`}
          ></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {techIcons
            .filter((icon) => icon.category === "devtools")
            .map((icon) => (
              <TechCard
                key={icon.name}
                name={icon.name}
                description={getDescription(icon.name)}
                svg={icon.svg}
                url={getUrl(icon.name)}
                category={getCategory(icon.name)}
                isDarkTheme={isDarkTheme}
              />
            ))}
        </div>
      </section>

      {/* Open Source Tools Section */}
      <section id="opensource" className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold">Free & Open Source Tools</h2>
          <div
            className={`h-px flex-1 ${isDarkTheme ? "bg-gradient-to-r from-purple-800 to-transparent" : "bg-gradient-to-r from-purple-400 to-transparent"} transition-colors`}
          ></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {techIcons
            .filter((icon) => icon.category === "opensource")
            .map((icon) => (
              <TechCard
                key={icon.name}
                name={icon.name}
                description={getDescription(icon.name)}
                svg={icon.svg}
                url={getUrl(icon.name)}
                category={getCategory(icon.name)}
                isDarkTheme={isDarkTheme}
              />
            ))}
        </div>
      </section>
    </>
  )
}

function TechCard({
  name,
  description,
  svg,
  url,
  category,
  isDarkTheme,
}: {
  name: string
  description: string
  svg: string
  url: string
  category: string
  isDarkTheme: boolean
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group ${isDarkTheme ? "bg-gray-900 border-gray-800 hover:bg-gray-800 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]" : "bg-white border-gray-200 hover:bg-gray-50 hover:border-purple-300/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)]"} border rounded-xl p-4 transition-all`}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={`w-16 h-16 mb-4 rounded-xl ${isDarkTheme ? "bg-gray-800 group-hover:bg-gray-700" : "bg-gray-100 group-hover:bg-gray-200"} p-2 flex items-center justify-center transition-colors`}
        >
          {svg ? (
            <div dangerouslySetInnerHTML={{ __html: svg }} />
          ) : (
            <div
              className={`w-10 h-10 ${isDarkTheme ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-600"} rounded-md flex items-center justify-center text-xs transition-colors`}
            >
              {name.substring(0, 2)}
            </div>
          )}
        </div>
        <h3 className={`font-medium text-lg mb-1 group-hover:text-blue-400 transition-colors`}>{name}</h3>
        <span className="text-xs text-purple-400 mb-2">{category}</span>
        <p className={`${isDarkTheme ? "text-gray-400" : "text-gray-600"} text-sm transition-colors`}>{description}</p>
        <div className="mt-3 flex items-center text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Visit website</span>
          <ChevronRight className="h-3 w-3 ml-1" />
        </div>
      </div>
    </a>
  )
}

// Helper functions to get descriptions, URLs, and categories
function getDescription(name: string): string {
  const descriptions: Record<string, string> = {
    // Frontend
    React: "A JavaScript library for building user interfaces",
    "Next.js": "The React framework for production",
    "Vue.js": "The progressive JavaScript framework",
    Angular: "Platform for building mobile and desktop web applications",
    Svelte: "Cybernetically enhanced web apps",
    "Tailwind CSS": "A utility-first CSS framework",
    Bootstrap: "Build responsive, mobile-first sites",
    "Material UI": "React components for faster and easier web development",
    Gatsby: "Static site generator for React",
    Remix: "Full stack web framework for React",
    Astro: "Framework for building content-focused websites",
    "Solid.js": "Declarative, efficient, and flexible JavaScript library",
    Preact: "Fast 3kB alternative to React with the same API",
    "Alpine.js": "Rugged, minimal framework for composing JavaScript behavior",
    "Ember.js": "Framework for ambitious web developers",
    Lit: "Simple library for building fast, lightweight web components",

    // Backend
    "Node.js": "JavaScript runtime built on Chrome's V8 JavaScript engine",
    "Express.js": "Fast, unopinionated, minimalist web framework for Node.js",
    Django: "The web framework for perfectionists with deadlines",
    Flask: "A lightweight WSGI web application framework",
    "Ruby on Rails": "Full-stack web application framework",
    "Spring Boot": "Java-based framework for building web applications",
    Laravel: "PHP web application framework with elegant syntax",
    "ASP.NET Core": "Cross-platform, high-performance framework for building web apps",
    NestJS: "Progressive Node.js framework for building server-side applications",
    FastAPI: "Modern, fast web framework for building APIs with Python",
    Deno: "Secure runtime for JavaScript and TypeScript",
    Bun: "All-in-one JavaScript runtime & toolkit",

    // Database
    MongoDB: "General purpose, document-based, distributed database",
    PostgreSQL: "The world's most advanced open source database",
    MySQL: "The most popular open source relational database",
    Redis: "In-memory data structure store used as database and cache",
    SQLite: "Self-contained, serverless, zero-configuration SQL database engine",
    Supabase: "Open source Firebase alternative with PostgreSQL",
    Firebase: "Platform for building web and mobile applications",
    Prisma: "Next-generation ORM for Node.js and TypeScript",
    Cassandra: "Highly-scalable, distributed NoSQL database",
    DynamoDB: "Fast and flexible NoSQL database service",

    // DevTools
    "VS Code": "Free source-code editor made by Microsoft",
    Git: "Distributed version control system",
    Docker: "Platform for developing, shipping, and running applications",
    Kubernetes: "Container orchestration system for automating deployment",
    GitHub: "Platform for hosting and collaborating on Git repositories",
    GitLab: "Complete DevOps platform delivered as a single application",
    Postman: "API platform for building and using APIs",
    Insomnia: "Open source API client and design platform",
    Webpack: "Static module bundler for JavaScript applications",
    Vite: "Next generation frontend tooling",
    Jest: "JavaScript testing framework",
    Cypress: "End-to-end testing framework",

    // Open Source Tools
    Figma: "Collaborative interface design tool",
    Inkscape: "Professional vector graphics editor",
    GIMP: "Free and open-source raster graphics editor",
    Blender: "Free and open source 3D creation suite",
    LibreOffice: "Free and open source office productivity software",
    "OBS Studio": "Free and open source software for video recording and streaming",
    Audacity: "Free, open source, cross-platform audio software",
    VLC: "Free and open source cross-platform multimedia player",
    Firefox: "Free and open-source web browser",
    Thunderbird: "Free and open-source email client",
  }
  return descriptions[name] || "A modern development technology"
}

function getUrl(name: string): string {
  const urls: Record<string, string> = {
    // Frontend
    React: "https://reactjs.org",
    "Next.js": "https://nextjs.org",
    "Vue.js": "https://vuejs.org",
    Angular: "https://angular.io",
    Svelte: "https://svelte.dev",
    "Tailwind CSS": "https://tailwindcss.com",
    Bootstrap: "https://getbootstrap.com",
    "Material UI": "https://mui.com",
    Gatsby: "https://www.gatsbyjs.com",
    Remix: "https://remix.run",
    Astro: "https://astro.build",
    "Solid.js": "https://www.solidjs.com",
    Preact: "https://preactjs.com",
    "Alpine.js": "https://alpinejs.dev",
    "Ember.js": "https://emberjs.com",
    Lit: "https://lit.dev",

    // Backend
    "Node.js": "https://nodejs.org",
    "Express.js": "https://expressjs.com",
    Django: "https://www.djangoproject.com",
    Flask: "https://flask.palletsprojects.com",
    "Ruby on Rails": "https://rubyonrails.org",
    "Spring Boot": "https://spring.io/projects/spring-boot",
    Laravel: "https://laravel.com",
    "ASP.NET Core": "https://dotnet.microsoft.com/apps/aspnet",
    NestJS: "https://nestjs.com",
    FastAPI: "https://fastapi.tiangolo.com",
    Deno: "https://deno.land",
    Bun: "https://bun.sh",

    // Database
    MongoDB: "https://www.mongodb.com",
    PostgreSQL: "https://www.postgresql.org",
    MySQL: "https://www.mysql.com",
    Redis: "https://redis.io",
    SQLite: "https://www.sqlite.org",
    Supabase: "https://supabase.com",
    Firebase: "https://firebase.google.com",
    Prisma: "https://www.prisma.io",
    Cassandra: "https://cassandra.apache.org",
    DynamoDB: "https://aws.amazon.com/dynamodb",

    // DevTools
    "VS Code": "https://code.visualstudio.com",
    Git: "https://git-scm.com",
    Docker: "https://www.docker.com",
    Kubernetes: "https://kubernetes.io",
    GitHub: "https://github.com",
    GitLab: "https://about.gitlab.com",
    Postman: "https://www.postman.com",
    Insomnia: "https://insomnia.rest",
    Webpack: "https://webpack.js.org",
    Vite: "https://vitejs.dev",
    Jest: "https://jestjs.io",
    Cypress: "https://www.cypress.io",

    // Open Source Tools
    Figma: "https://www.figma.com",
    Inkscape: "https://inkscape.org",
    GIMP: "https://www.gimp.org",
    Blender: "https://www.blender.org",
    LibreOffice: "https://www.libreoffice.org",
    "OBS Studio": "https://obsproject.com",
    Audacity: "https://www.audacityteam.org",
    VLC: "https://www.videolan.org/vlc",
    Firefox: "https://www.mozilla.org/firefox",
    Thunderbird: "https://www.thunderbird.net",
  }
  return urls[name] || "#"
}

function getCategory(name: string): string {
  const categories: Record<string, string> = {
    // Frontend
    React: "JavaScript Library",
    "Next.js": "React Framework",
    "Vue.js": "JavaScript Framework",
    Angular: "JavaScript Framework",
    Svelte: "JavaScript Framework",
    "Tailwind CSS": "CSS Framework",
    Bootstrap: "CSS Framework",
    "Material UI": "UI Library",
    Gatsby: "Static Site Generator",
    Remix: "Full Stack Framework",
    Astro: "Web Framework",
    "Solid.js": "JavaScript Library",
    Preact: "JavaScript Library",
    "Alpine.js": "JavaScript Library",
    "Ember.js": "JavaScript Framework",
    Lit: "Web Components Library",

    // Backend
    "Node.js": "JavaScript Runtime",
    "Express.js": "Node.js Framework",
    Django: "Python Framework",
    Flask: "Python Framework",
    "Ruby on Rails": "Ruby Framework",
    "Spring Boot": "Java Framework",
    Laravel: "PHP Framework",
    "ASP.NET Core": ".NET Framework",
    NestJS: "Node.js Framework",
    FastAPI: "Python Framework",
    Deno: "JavaScript Runtime",
    Bun: "JavaScript Runtime",

    // Database
    MongoDB: "NoSQL Database",
    PostgreSQL: "SQL Database",
    MySQL: "SQL Database",
    Redis: "In-Memory Database",
    SQLite: "SQL Database",
    Supabase: "Backend as a Service",
    Firebase: "Backend as a Service",
    Prisma: "ORM",
    Cassandra: "NoSQL Database",
    DynamoDB: "NoSQL Database",

    // DevTools
    "VS Code": "Code Editor",
    Git: "Version Control",
    Docker: "Containerization",
    Kubernetes: "Container Orchestration",
    GitHub: "Code Hosting",
    GitLab: "DevOps Platform",
    Postman: "API Testing",
    Insomnia: "API Testing",
    Webpack: "Module Bundler",
    Vite: "Build Tool",
    Jest: "Testing Framework",
    Cypress: "Testing Framework",

    // Open Source Tools
    Figma: "Design Tool",
    Inkscape: "Vector Graphics",
    GIMP: "Image Editor",
    Blender: "3D Creation",
    LibreOffice: "Office Suite",
    "OBS Studio": "Streaming Software",
    Audacity: "Audio Editor",
    VLC: "Media Player",
    Firefox: "Web Browser",
    Thunderbird: "Email Client",
  }
  return categories[name] || "Technology"
}

