import { categories, categoryById, tools } from "@/data/catalog"
import { brandMeta } from "@/data/brand-meta"
import { localModels } from "@/data/local-llms"
import { resources, resourceTypes, tracks } from "@/data/resources"
import { aiPhases, aiTopics, prompts } from "@/data/ai-roadmap"
import { contextFiles } from "@/data/context-pack"
import { phaseById, stepNumber, topics } from "@/data/roadmap"
import { publisherById, skillFields, skills } from "@/data/skills"
import { creatorIcon } from "@/lib/model-creators"

// One index over everything on the site, for the ⌘K palette. Only the palette imports
// this, and the palette loads on first open, so none of it weighs down a page.

export type GroupId = "pages" | "categories" | "tools" | "learn" | "skills" | "models" | "icons" | "roadmap"

export interface SearchItem {
  id: string
  group: GroupId
  title: string
  subtitle?: string
  href: string
  external?: boolean
  /** A brand icon slug, or a name for the monogram fallback. */
  icon?: string
  iconName?: string
  /** Normalized text to match: the name, then tags, then the description. */
  n: string
  k: string
  d: string
}

export const groups: { id: GroupId; name: string; limit: number; seeAll?: (q: string) => string; seeAllLabel?: string }[] = [
  { id: "pages", name: "Pages", limit: 8 },
  { id: "categories", name: "Categories", limit: 4 },
  { id: "tools", name: "Tools", limit: 8, seeAll: (q) => `/explore?q=${encodeURIComponent(q)}`, seeAllLabel: "Explore" },
  { id: "learn", name: "Learn", limit: 5, seeAll: (q) => `/learn?q=${encodeURIComponent(q)}`, seeAllLabel: "Learn" },
  { id: "skills", name: "Agent skills", limit: 5, seeAll: (q) => `/skills?q=${encodeURIComponent(q)}`, seeAllLabel: "Skills" },
  { id: "models", name: "Local LLMs", limit: 5, seeAll: (q) => `/local-llms?q=${encodeURIComponent(q)}`, seeAllLabel: "Local LLMs" },
  { id: "icons", name: "Brand icons", limit: 6, seeAll: (q) => `/icons?q=${encodeURIComponent(q)}`, seeAllLabel: "Icons" },
  { id: "roadmap", name: "Roadmap", limit: 6 },
]

export const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")

const typeName = Object.fromEntries(resourceTypes.map((t) => [t.id, t.name]))
const trackName = Object.fromEntries(tracks.map((t) => [t.id, t.name]))
const fieldName = Object.fromEntries(skillFields.map((f) => [f.id, f.name]))

const item = (i: Omit<SearchItem, "n" | "k" | "d">, keys: string[], body = ""): SearchItem => ({
  ...i,
  n: norm(i.title),
  k: norm(keys.join(" ")),
  d: norm(body),
})

export const pages: SearchItem[] = [
  item({ id: "p-explore", group: "pages", title: "Explore the directory", href: "/explore", icon: "page:explore" }, [
    "tools",
    "directory",
    "browse",
  ]),
  item({ id: "p-icons", group: "pages", title: "Brand icon library", href: "/icons", icon: "page:icons" }, ["icons", "logos", "svg"]),
  item({ id: "p-learn", group: "pages", title: "Learning resources", href: "/learn", icon: "page:learn" }, [
    "learn",
    "courses",
    "books",
    "tutorials",
  ]),
  item({ id: "p-stack", group: "pages", title: "Stack Builder", href: "/stack-builder", icon: "page:stack" }, ["stack", "builder"]),
  item({ id: "p-skills", group: "pages", title: "Agent skills for AI coding agents", href: "/skills", icon: "page:skills" }, [
    "skills",
    "claude code",
    "agents",
  ]),
  item({ id: "p-roadmap", group: "pages", title: "Developer roadmap: idea to production", href: "/roadmap", icon: "page:roadmap" }, [
    "roadmap",
    "checklist",
    "steps",
  ]),
  item(
    { id: "p-ai-roadmap", group: "pages", title: "AI coding roadmap and Context Pack", href: "/roadmap/ai-coding", icon: "page:roadmap" },
    ["vibecoding", "vibe coding", "ai agents", "agents.md", "claude.md", "prompts", "context"],
  ),
  item({ id: "p-llms", group: "pages", title: "Local LLMs you can download and run", href: "/local-llms", icon: "page:llms" }, [
    "models",
    "ollama",
    "offline",
    "ai",
  ]),
  item({ id: "p-contribute", group: "pages", title: "Contribute to CodeStack", href: "/contribute", icon: "page:contribute" }, [
    "contribute",
    "add a tool",
    "github",
  ]),
]

export const categoryItems: SearchItem[] = categories.map((c) =>
  item(
    {
      id: `c-${c.id}`,
      group: "categories",
      title: c.name,
      subtitle: c.alsoFor ? "Design + Develop" : c.audience === "design" ? "Design" : "Develop",
      href: `/explore?c=${c.id}`,
      icon: "category",
      iconName: c.name,
    },
    ["category", c.audience],
    c.tagline,
  ),
)

let index: SearchItem[] | null = null

export function searchIndex() {
  if (index) return index
  index = [
    ...pages,
    ...categoryItems,
    ...tools.map((t) =>
      item(
        {
          id: `t-${t.category}-${t.name}`,
          group: "tools",
          title: t.name,
          subtitle: t.kind,
          href: t.url,
          external: true,
          icon: t.icon,
          iconName: t.name,
        },
        [t.kind, categoryById[t.category].name, t.openSource ? "open source" : "", t.free ? "free" : ""],
        t.description,
      ),
    ),
    ...resources.map((r) =>
      item(
        {
          id: `r-${r.track}-${r.name}`,
          group: "learn",
          title: r.name,
          subtitle: [typeName[r.type] ?? r.type, r.author].filter(Boolean).join(" · "),
          href: r.url,
          external: true,
          icon: `learn:${r.type}`,
          iconName: r.name,
        },
        [r.author, typeName[r.type] ?? "", trackName[r.track] ?? "", r.level, r.free ? "free" : ""],
        r.description,
      ),
    ),
    ...skills.map((s) => {
      const p = publisherById[s.publisher]
      return item(
        {
          id: `s-${s.publisher}-${s.name}`,
          group: "skills",
          title: s.name,
          subtitle: p.name,
          href: `/skills?q=${encodeURIComponent(s.name)}`,
          icon: p.icon,
          iconName: p.name,
        },
        [p.name, fieldName[s.field] ?? "", "skill"],
        s.description,
      )
    }),
    ...localModels.map((m) =>
      item(
        {
          id: `m-${m.run}`,
          group: "models",
          title: m.name,
          subtitle: `${m.params.split(" ")[0]} · ${m.size}`,
          href: `/local-llms?q=${encodeURIComponent(m.name)}`,
          icon: creatorIcon[m.creator],
          iconName: m.creator,
        },
        [m.family, m.creator, ...m.capabilities, "model", "llm"],
        m.description,
      ),
    ),
    ...Object.entries(brandMeta).map(([slug, b]) =>
      item(
        {
          id: `i-${slug}`,
          group: "icons",
          title: b.title,
          subtitle: "Brand icon",
          href: `/icons?q=${encodeURIComponent(b.title)}`,
          icon: slug,
          iconName: b.title,
        },
        [slug, "icon", "logo"],
      ),
    ),
    ...topics.map((t) =>
      item(
        {
          id: `rm-${t.id}`,
          group: "roadmap",
          title: t.title,
          subtitle: `Step ${stepNumber[t.id]} · ${phaseById[t.phase].name}`,
          href: `/roadmap?step=${t.id}`,
          icon: "page:roadmap",
        },
        [...t.groups.map((g) => g.title), phaseById[t.phase].name, "roadmap"],
        [t.summary, t.rule ?? "", ...t.groups.flatMap((g) => g.items)].join(" "),
      ),
    ),
    ...aiTopics.map((t, i) =>
      item(
        {
          id: `ai-${t.id}`,
          group: "roadmap",
          title: t.title,
          subtitle: `AI roadmap · Level ${i + 1} · ${aiPhases.find((p) => p.id === t.phase)!.name}`,
          href: `/roadmap/ai-coding?step=${t.id}`,
          icon: "page:roadmap",
        },
        [...t.groups.map((g) => g.title), "ai", "agents", "vibecoding"],
        [t.summary, t.rule ?? "", ...t.groups.flatMap((g) => g.items)].join(" "),
      ),
    ),
    ...contextFiles.map((f) =>
      item(
        {
          id: `cp-${f.path}`,
          group: "roadmap",
          title: f.path,
          subtitle: "Context Pack template",
          href: `/roadmap/ai-coding#file-${f.path
            .replace(/[^a-zA-Z0-9]+/g, "-")
            .replace(/^-|-$/g, "")
            .toLowerCase()}`,
          icon: "page:roadmap",
        },
        ["template", "markdown", "context pack", f.priority],
        `${f.purpose} ${f.includes.join(" ")}`,
      ),
    ),
    ...prompts.map((p) =>
      item(
        {
          id: `pr-${p.id}`,
          group: "roadmap",
          title: `${p.title} prompt`,
          subtitle: "AI roadmap prompt",
          href: `/roadmap/ai-coding#prompt-${p.id}`,
          icon: "page:roadmap",
        },
        ["prompt", "template", "ai"],
        p.when,
      ),
    ),
  ]
  return index
}

/** True when `w` starts a word in `hay`, so "pay" matches "PayPal" and "Google Pay", not "Upay". */
function startsWord(hay: string, w: string) {
  for (let i = hay.indexOf(w); i !== -1; i = hay.indexOf(w, i + 1)) {
    if (i === 0 || !/[a-z0-9]/.test(hay[i - 1])) return true
  }
  return false
}

/** Name matches beat tags, and tags beat descriptions. Every word must match somewhere. */
function score(it: SearchItem, q: string, words: string[]) {
  let total = 0
  for (const w of words) {
    let s = 0
    if (it.n.startsWith(w)) s = 70
    else if (startsWord(it.n, w)) s = 55
    else if (it.n.includes(w)) s = 35
    else if (startsWord(it.k, w)) s = 25
    else if (w.length > 2 && it.k.includes(w)) s = 15
    else if (w.length > 1 && startsWord(it.d, w)) s = 10
    else if (w.length > 3 && it.d.includes(w)) s = 5
    if (!s) return 0
    total += s
  }
  if (it.n === q) total += 200
  else if (it.n.startsWith(q)) total += 60
  // Shorter names are usually the thing itself, not something about it.
  return total - it.n.length * 0.05
}

export interface GroupResult {
  id: GroupId
  name: string
  items: SearchItem[]
  total: number
  seeAll?: { href: string; label: string }
}

export function search(raw: string): GroupResult[] {
  const q = norm(raw.trim())
  if (!q) {
    return [
      { id: "pages", name: "Pages", items: pages, total: pages.length },
      { id: "categories", name: "Categories", items: categoryItems, total: categoryItems.length },
    ]
  }
  const words = q.split(/\s+/)
  const scored = new Map<GroupId, { it: SearchItem; s: number }[]>()
  for (const it of searchIndex()) {
    const s = score(it, q, words)
    if (s > 0) {
      const list = scored.get(it.group) ?? []
      list.push({ it, s })
      scored.set(it.group, list)
    }
  }
  return groups
    .filter((g) => scored.has(g.id))
    .map((g) => {
      const list = scored.get(g.id)!.sort((a, b) => b.s - a.s)
      return {
        id: g.id,
        name: g.name,
        items: list.slice(0, g.limit).map((x) => x.it),
        total: list.length,
        best: list[0].s,
        seeAll:
          g.seeAll && list.length > g.limit
            ? { href: g.seeAll(raw.trim()), label: `See all ${list.length} in ${g.seeAllLabel}` }
            : undefined,
      }
    })
    .sort((a, b) => b.best - a.best)
    .map(({ best: _best, ...g }) => g)
}
