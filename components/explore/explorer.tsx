"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Search, X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDeferredValue, useEffect, useMemo, useState } from "react"
import { ease } from "@/components/motion/reveal"
import { Segmented } from "@/components/segmented"
import { ToolCard } from "@/components/tool-card"
import { audienceOf, categories, categoryById, tools, type Audience, type CategoryId } from "@/data/catalog"
import { cn } from "@/lib/utils"

type AudienceFilter = Audience | "all"

export function Explorer() {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const initialCategory = params.get("c") as CategoryId | null
  const [category, setCategory] = useState<CategoryId | "all">(initialCategory && categoryById[initialCategory] ? initialCategory : "all")
  const [audience, setAudience] = useState<AudienceFilter>(() => {
    if (initialCategory && categoryById[initialCategory]) return categoryById[initialCategory].audience
    const a = params.get("a")
    return a === "design" || a === "develop" ? a : "all"
  })
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(query)

  // Follow the URL when it changes from outside, e.g. a category picked in the navbar.
  const paramC = params.get("c")
  const paramA = params.get("a")
  useEffect(() => {
    const c = paramC as CategoryId | null
    if (c && categoryById[c]) {
      setCategory(c)
      setAudience((prev) => (prev === "all" || prev === categoryById[c].audience ? prev : categoryById[c].audience))
    } else {
      setCategory("all")
      setAudience(paramA === "design" || paramA === "develop" ? paramA : "all")
    }
  }, [paramC, paramA])

  useEffect(() => {
    const next = new URLSearchParams()
    if (category !== "all") next.set("c", category)
    else if (audience !== "all") next.set("a", audience)
    const qs = next.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }, [category, audience, pathname, router])

  const visibleCategories = categories.filter((c) => audience === "all" || c.audience === audience)

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    return tools.filter(
      (t) =>
        (audience === "all" || audienceOf(t) === audience) &&
        (category === "all" || t.category === category) &&
        (!q || `${t.name} ${t.description} ${t.kind} ${categoryById[t.category].name}`.toLowerCase().includes(q)),
    )
  }, [audience, category, deferredQuery])

  const grouped = category === "all" && !deferredQuery.trim()

  return (
    <>
      <div className="sticky top-14 z-30">
        <div className="glass border-y border-black/[0.06] dark:border-white/[0.07]">
          <div className="shell flex flex-col gap-3 py-3 md:flex-row md:items-center">
            <label className="relative flex h-10 w-full shrink-0 items-center md:max-w-xs md:flex-1">
              <Search className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${tools.length} tools`}
                aria-label="Search tools"
                className="h-full w-full rounded-full bg-surface-2/80 pl-10 pr-9 text-[14px] outline-none ring-1 ring-inset ring-transparent transition-shadow placeholder:text-muted-foreground focus:ring-primary/60"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 grid size-5 place-items-center rounded-full bg-foreground/20 text-background"
                >
                  <X className="size-3" />
                </button>
              )}
            </label>
            <Segmented
              value={audience}
              onChange={(a) => {
                setAudience(a)
                setCategory("all")
              }}
              options={[
                { value: "all", label: "All" },
                { value: "design", label: "Design" },
                { value: "develop", label: "Develop" },
              ]}
              className="self-start md:self-auto"
            />
          </div>
          <div className="shell">
            <div className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1 pb-3">
              {[{ id: "all" as const, name: "Everything" }, ...visibleCategories].map((c) => {
                const active = category === c.id
                return (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={cn(
                      "pressable relative shrink-0 rounded-full px-3.5 py-1.5 text-[13px] transition-colors",
                      active ? "text-background" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="explore-chip"
                        className="absolute inset-0 rounded-full bg-foreground"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                      />
                    )}
                    <span className="relative">{c.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="shell min-h-[60vh] pb-28 pt-12">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${audience}-${category}-${grouped}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
            transition={{ duration: 0.5, ease }}
          >
            {results.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-[22px] font-semibold tracking-[-0.02em]">No matches for “{query}”.</p>
                <p className="mt-2 text-muted-foreground">Try a broader term, or switch to “All”.</p>
              </div>
            ) : grouped ? (
              <div className="space-y-24">
                {visibleCategories.map((c) => {
                  const items = results.filter((t) => t.category === c.id)
                  if (!items.length) return null
                  return (
                    <section key={c.id} id={c.id} className="scroll-mt-48">
                      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
                        <div>
                          <h2 className="text-title">{c.name}</h2>
                          <p className="mt-2 text-muted-foreground">{c.tagline}</p>
                        </div>
                        <button onClick={() => setCategory(c.id)} className="text-[14px] text-link hover:underline">
                          View {items.length} ›
                        </button>
                      </div>
                      <Grid items={items.slice(0, 8)} />
                    </section>
                  )
                })}
              </div>
            ) : (
              <>
                <p className="mb-8 text-[14px] text-muted-foreground">
                  {results.length} {results.length === 1 ? "tool" : "tools"}
                  {category !== "all" && (
                    <>
                      {" "}
                      in <span className="text-foreground">{categoryById[category].name}</span>
                    </>
                  )}
                </p>
                <Grid items={results} />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}

function Grid({ items }: { items: typeof tools }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 [&>*]:min-w-0">
      {items.map((tool, i) => (
        <motion.div
          key={`${tool.category}-${tool.name}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -5% 0px" }}
          transition={{ duration: 0.6, ease, delay: (i % 4) * 0.04 }}
        >
          <ToolCard tool={tool} />
        </motion.div>
      ))}
    </div>
  )
}
