import { categories } from "@/data/catalog"
import { resources, resourceTypes } from "@/data/resources"
import { levels, phases } from "@/data/roadmap"
import { skillFields } from "@/data/skills"
import { stackPresets } from "@/data/stacks"

export interface NavLink {
  name: string
  href: string
  external?: boolean
}

export interface NavGroup {
  title: string
  links: NavLink[]
  /** The first, large‑type column of a menu. */
  primary?: boolean
}

export interface NavItem {
  name: string
  href: string
  menu?: NavGroup[]
}

const presetHref = (tools: string[]) => `/stack-builder?s=${tools.map(encodeURIComponent).join(",")}`
const featured = (name: string): NavLink => {
  const r = resources.find((x) => x.name === name)!
  return { name: r.name, href: r.url, external: true }
}

export const navItems: NavItem[] = [
  {
    name: "Explore",
    href: "/explore",
    menu: [
      {
        title: "Explore",
        primary: true,
        links: [
          { name: "All tools", href: "/explore" },
          { name: "For designers", href: "/explore?a=design" },
          { name: "For developers", href: "/explore?a=develop" },
        ],
      },
      {
        title: "Design",
        // Design categories first, then shared ones like AI.
        links: [...categories.filter((c) => c.audience === "design"), ...categories.filter((c) => c.alsoFor === "design")].map((c) => ({
          name: c.name,
          href: `/explore?c=${c.id}`,
        })),
      },
      {
        title: "Develop",
        links: categories.filter((c) => c.audience === "develop").map((c) => ({ name: c.name, href: `/explore?c=${c.id}` })),
      },
    ],
  },
  {
    name: "Icons",
    href: "/icons",
    menu: [
      { title: "Icons", primary: true, links: [{ name: "All brand icons", href: "/icons" }] },
      {
        title: "Popular",
        links: ["Figma", "React", "Next.js", "Tailwind CSS", "GitHub", "Vercel"].map((n) => ({
          name: n,
          href: `/icons?q=${encodeURIComponent(n)}`,
        })),
      },
      {
        title: "Related",
        links: [
          { name: "Icon sets", href: "/explore?c=icons" },
          { name: "Color tools", href: "/explore?c=color" },
          { name: "Design tools", href: "/explore?c=design-tools" },
        ],
      },
    ],
  },
  {
    name: "Learn",
    href: "/learn",
    menu: [
      {
        title: "Learn",
        primary: true,
        links: [
          { name: "All resources", href: "/learn" },
          { name: "Learning platforms", href: "/learn#platforms" },
          { name: "Design", href: "/learn#design" },
          { name: "Frontend", href: "/learn#frontend" },
          { name: "AI & ML", href: "/learn#ai" },
          { name: "Learn by playing", href: "/learn#games" },
        ],
      },
      { title: "Formats", links: resourceTypes.filter((t) => t.id !== "all").map((t) => ({ name: t.name, href: `/learn?type=${t.id}` })) },
      { title: "Start here", links: ["Human Interface Guidelines", "Laws of UX", "MDN Web Docs", "roadmap.sh"].map(featured) },
    ],
  },
  {
    name: "Stack Builder",
    href: "/stack-builder",
    menu: [
      {
        title: "Stack Builder",
        primary: true,
        links: [
          { name: "Build a stack", href: "/stack-builder" },
          { name: "Developer tools", href: "/explore?a=develop" },
        ],
      },
      { title: "Full‑stack presets", links: stackPresets.slice(0, 5).map((p) => ({ name: p.name, href: presetHref(p.tools) })) },
      { title: "More presets", links: stackPresets.slice(5).map((p) => ({ name: p.name, href: presetHref(p.tools) })) },
    ],
  },
  {
    name: "Skills",
    href: "/skills",
    menu: [
      {
        title: "Agent Skills",
        primary: true,
        links: [
          { name: "All skills", href: "/skills" },
          { name: "Design & UI", href: "/skills?f=design" },
          { name: "Engineering", href: "/skills?f=workflow" },
        ],
      },
      {
        title: "By field",
        links: skillFields.filter((f) => !["design", "workflow"].includes(f.id)).map((f) => ({ name: f.name, href: `/skills?f=${f.id}` })),
      },
      {
        title: "Directories",
        links: [
          { name: "skills.sh", href: "https://skills.sh", external: true },
          { name: "Anthropic skills", href: "https://github.com/anthropics/skills", external: true },
          { name: "Agent Skills spec", href: "https://agentskills.io", external: true },
        ],
      },
    ],
  },
  {
    name: "Roadmap",
    href: "/roadmap",
    menu: [
      {
        title: "Roadmap",
        primary: true,
        links: [
          { name: "Full roadmap", href: "/roadmap" },
          { name: "AI-first loop", href: "/roadmap#ai-loop" },
          { name: "Ship checklist", href: "/roadmap#ship" },
        ],
      },
      { title: "Phases", links: phases.map((p) => ({ name: p.name, href: `/roadmap#phase-${p.id}` })) },
      { title: "Levels", links: levels.map((l) => ({ name: `${l.level}. ${l.name}`, href: `/roadmap?level=${l.level}#roadmap` })) },
    ],
  },
  { name: "Contribute", href: "/contribute" },
]
