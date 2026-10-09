import type { CategoryId } from "./catalog"

/** Categories offered as building blocks in the Stack Builder, in display order. */
export const stackCategories: CategoryId[] = ["frameworks", "languages", "backend", "databases", "devtools", "hosting", "services", "payments", "ai"]

export interface StackPreset {
  name: string
  description: string
  tools: string[]
}

export const stackPresets: StackPreset[] = [
  { name: "T3 Stack", description: "Typesafe full‑stack with Next.js, tRPC, Tailwind and Prisma.", tools: ["Next.js", "TypeScript", "Tailwind CSS", "tRPC", "Prisma", "PostgreSQL", "Vercel"] },
  { name: "Supa‑Next", description: "Ship a SaaS in a weekend.", tools: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Stripe", "Vercel"] },
  { name: "MERN", description: "The classic all‑JavaScript stack.", tools: ["React", "Express", "Node.js", "MongoDB"] },
  { name: "MEAN", description: "MERN's enterprise sibling, with Angular.", tools: ["Angular", "Express", "Node.js", "MongoDB"] },
  { name: "MEVN", description: "Approachable full‑stack JavaScript with Vue.", tools: ["Vue.js", "Express", "Node.js", "MongoDB"] },
  { name: "Content Site", description: "Blazing‑fast content and marketing sites.", tools: ["Astro", "Tailwind CSS", "Netlify"] },
  { name: "Python API", description: "Modern, typed APIs in Python.", tools: ["Python", "FastAPI", "PostgreSQL", "Docker", "Railway"] },
  { name: "AI App", description: "LLM‑powered products, end to end.", tools: ["Next.js", "TypeScript", "Anthropic API", "Neon", "Drizzle", "Vercel"] },
  { name: "LAMP", description: "The stack that built the web.", tools: ["PHP", "Laravel", "MySQL", "DigitalOcean"] },
]
