"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Search, X } from "lucide-react"
import { useCallback, useDeferredValue, useMemo, useState } from "react"
import { ease } from "@/components/motion/reveal"
import { SearchParamsListener, replaceQuery } from "@/components/search-params"
import { Segmented } from "@/components/segmented"
import { ToolCard } from "@/components/tool-card"
import { categories, categoryById, inAudience, tools, type Audience, type CategoryId } from "@/data/catalog"
import { cn } from "@/lib/utils"
import { ChipScroller } from "@/components/chip-scroller"

type AudienceFilter = Audience | "all"

export function Explorer() {
  const [category, setCategory] = useState<CategoryId | "all">("all")
  const [audience, setAudience] = useState<AudienceFilter>("all")
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(query)

  // Apply ?c= and ?a= on load, and follow them when they change from outside,
  // e.g. a category picked in the navbar.
  const onParams = useCallback((params: URLSearchParams) => {
    const c = params.get("c") as CategoryId | null
    const a = params.get("a")
    if (c && categoryById[c]) {
      setCategory(c)
      setAudience((prev) => (prev === "all" || inAudience(categoryById[c], prev) ? prev : categoryById[c].audience))
    } else {
      setCategory("all")
      setAudience(a === "design" || a === "develop" ? a : "all")
    }
  }, [])

  const select = (nextCategory: CategoryId | "all", nextAudience: AudienceFilter = audience) => {
    setCategory(nextCategory)
    setAudience(nextAudience)
    replaceQuery(nextCategory !== "all" ? { c: nextCategory } : { a: nextAudience === "all" ? null : nextAudience })
  }

  const visibleCategories = categories.filter((c) => audience === "all" || inAudience(c, audience))

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    return tools.filter(
      (t) =>
        (audience === "all" || inAudience(categoryById[t.category], audience)) &&
        (category === "all" || t.category === category) &&
        (!q || `${t.name} ${t.description} ${t.kind} ${categoryById[t.category].name}`.toLowerCase().includes(q)),
    )
  }, [audience, category, deferredQuery])

  const grouped = category === "all" && !deferredQuery.trim()

  return (
    <>
      <SearchParamsListener onChange={onParams} />
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
              onChange={(a) => select("all", a)}
              options={[
                { value: "all", label: "All" },
                { value: "design", label: "Design" },
                { value: "develop", label: "Develop" },
              ]}
              className="self-start md:self-auto"
            />
          </div>
          <div className="shell">
            <ChipScroller label="Categories" activeKey={category}>
              {[{ id: "all" as const, name: "Everything" }, ...visibleCategories].map((c) => {
                const active = category === c.id
                return (
                  <button
                    key={c.id}
                    data-active={active}
                    onClick={() => select(c.id)}
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
            </ChipScroller>
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
                    <section key={c.id} id={c.id} className="defer-render scroll-mt-48">
                      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
                        <div>
                          <h2 className="text-title">{c.name}</h2>
                          <p className="mt-2 text-muted-foreground">{c.tagline}</p>
                        </div>
                        <button onClick={() => select(c.id)} className="text-[14px] text-link hover:underline">
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
      {items.map((tool) => (
        <div key={`${tool.category}-${tool.name}`} className="scroll-reveal">
          <ToolCard tool={tool} />
        </div>
      ))}
    </div>
  )
}
