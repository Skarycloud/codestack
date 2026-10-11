"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useDeferredValue, useMemo, useState } from "react"
import { ActiveFilterChips, FilterButton, type FilterGroup, type FilterValue } from "@/components/directory/filter-panel"
import {
  DirectorySections,
  DirectoryTabs,
  DirectoryToolbar,
  ResultsHeader,
  ResultsSheet,
  SectionHeading,
} from "@/components/directory/toolbar"
import { ease } from "@/components/motion/reveal"
import { SearchParamsListener, replaceQuery } from "@/components/search-params"
import { Segmented } from "@/components/segmented"
import { ToolCard } from "@/components/tool-card"
import {
  categories,
  categoryById,
  inAudience,
  legacyCategories,
  sectionById,
  tools,
  type Audience,
  type CategoryId,
  type SectionId,
  type Tool,
} from "@/data/catalog"
import { useFilterTop } from "@/lib/use-filter-top"

type AudienceFilter = Audience | "all"

const isAudience = (a: string | null): a is Audience => a === "design" || a === "develop" || a === "ai"

const pricingOptions: { id: string; label: string; test: (t: Tool) => boolean }[] = [
  { id: "open", label: "Open source", test: (t) => !!t.openSource },
  { id: "free", label: "Free", test: (t) => !t.paid && !t.freemium },
  { id: "freemium", label: "Free + Pro", test: (t) => !!t.freemium },
  { id: "paid", label: "Paid", test: (t) => !!t.paid },
]

/** Pricing options are OR'd together, as are types; the two groups are AND'd. */
function applyFilters(items: Tool[], f: FilterValue) {
  const pricing = pricingOptions.filter((o) => f.pricing?.includes(o.id))
  const kinds = f.kind ?? []
  if (!pricing.length && !kinds.length) return items
  return items.filter((t) => (!pricing.length || pricing.some((o) => o.test(t))) && (!kinds.length || kinds.includes(t.kind)))
}

function countKinds(items: Tool[]) {
  const counts = new Map<string, number>()
  for (const t of items) counts.set(t.kind, (counts.get(t.kind) ?? 0) + 1)
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([id, count]) => ({ id, label: id, count }))
}

export function Explorer() {
  const [category, setCategory] = useState<CategoryId | "all">("all")
  const [section, setSection] = useState<SectionId | "all">("all")
  const [audience, setAudience] = useState<AudienceFilter>("all")
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState<FilterValue>({})
  const deferredQuery = useDeferredValue(query)
  const filterTop = useFilterTop()

  // Apply ?c=, ?s=, ?a= and ?q= on load, and follow them when they change from outside, e.g. a
  // category picked in the navbar. Old flat ids like ?c=payments map to their new home.
  const onParams = useCallback((params: URLSearchParams) => {
    let c = params.get("c")
    let s = params.get("s")
    const a = params.get("a")
    const q = params.get("q")
    if (q !== null) setQuery(q)
    setFilters({})
    if (c && !(c in categoryById) && legacyCategories[c]) {
      s = legacyCategories[c].s ?? s
      c = legacyCategories[c].c
    }
    if (c && c in categoryById) {
      const cat = categoryById[c as CategoryId]
      setCategory(cat.id)
      setSection(s && cat.sections.some((x) => x.id === s) ? (s as SectionId) : "all")
      setAudience((prev) => (prev === "all" || inAudience(cat, prev) ? prev : cat.audience))
    } else {
      setCategory("all")
      setSection("all")
      setAudience(isAudience(a) ? a : "all")
    }
  }, [])

  const select = (nextCategory: CategoryId | "all", nextAudience: AudienceFilter = audience) => {
    setCategory(nextCategory)
    setSection("all")
    setAudience(nextAudience)
    setFilters({})
    filterTop.reset()
    replaceQuery(nextCategory !== "all" ? { c: nextCategory } : { a: nextAudience === "all" ? null : nextAudience })
  }

  const selectSection = (next: SectionId | "all") => {
    if (category === "all") return
    setSection(next)
    // Types differ between sections, so only the pricing filter carries over.
    setFilters((f) => ({ pricing: f.pricing ?? [] }))
    filterTop.reset()
    replaceQuery({ c: category, s: next === "all" ? null : next })
  }

  // AI is a single category, so the AI view opens it directly.
  const selectAudience = (a: AudienceFilter) => (a === "ai" ? select("ai", "ai") : select("all", a))

  const visibleCategories = categories.filter((c) => audience === "all" || inAudience(c, audience))

  // Audience, category and search; then the section; then pricing and type.
  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    return tools.filter(
      (t) =>
        (audience === "all" || inAudience(categoryById[t.category], audience)) &&
        (category === "all" || t.category === category) &&
        (!q ||
          `${t.name} ${t.description} ${t.kind} ${categoryById[t.category].name} ${sectionById[t.section].name}`.toLowerCase().includes(q)),
    )
  }, [audience, category, deferredQuery])
  const inSection = useMemo(() => (section === "all" ? results : results.filter((t) => t.section === section)), [results, section])
  const filtered = useMemo(() => applyFilters(inSection, filters), [inSection, filters])

  const grouped = category === "all" && !deferredQuery.trim()
  const current = category !== "all" ? categoryById[category] : null
  const filtering = filtered.length !== inSection.length

  // Counts come from the list before filtering, so every option shows what it holds. Types are
  // left out of the Everything view, where the list would be too long to be useful.
  const groups = useMemo<FilterGroup[]>(
    () => [
      {
        id: "pricing",
        title: "Pricing",
        options: pricingOptions.map((o) => ({ id: o.id, label: o.label, count: inSection.filter(o.test).length })).filter((o) => o.count),
      },
      ...(grouped ? [] : [{ id: "kind", title: "Type", options: countKinds(inSection) }]),
    ],
    [inSection, grouped],
  )

  // Section chips count what each section holds under the current pricing filter.
  const sectionCounts = useMemo(() => {
    const priced = applyFilters(results, { pricing: filters.pricing ?? [] })
    const counts = new Map<string, number>()
    for (const t of priced) counts.set(t.section, (counts.get(t.section) ?? 0) + 1)
    return { all: priced.length, by: counts }
  }, [results, filters])

  return (
    <>
      <SearchParamsListener onChange={onParams} />
      <div ref={filterTop.ref} aria-hidden />
      <DirectoryToolbar
        search={{
          value: query,
          onChange: setQuery,
          placeholder: `Search ${tools.length.toLocaleString("en-US")} tools`,
          label: "Search tools",
        }}
        controls={
          <>
            <Segmented
              size="sm"
              value={audience}
              onChange={selectAudience}
              options={[
                { value: "all", label: "All" },
                { value: "design", label: "Design" },
                { value: "develop", label: "Develop" },
                { value: "ai", label: "AI" },
              ]}
            />
            <FilterButton groups={groups} value={filters} onChange={setFilters} resultCount={filtered.length} noun={["tool", "tools"]} />
          </>
        }
        tabs={
          <DirectoryTabs
            label="Categories"
            layoutId="explore-tab"
            active={category}
            onSelect={(id) => select(id)}
            items={[
              { id: "all" as const, label: "Everything" },
              ...visibleCategories.map((c) => ({ id: c.id, label: c.short, title: c.name })),
            ]}
          />
        }
        sections={
          current && {
            key: current.id,
            node: (
              <DirectorySections
                label={`${current.name} sections`}
                layoutId="explore-section"
                active={section}
                onSelect={selectSection}
                items={[
                  { id: "all" as const, label: "All", count: sectionCounts.all },
                  ...current.sections.map((s) => ({ id: s.id, label: s.name, count: sectionCounts.by.get(s.id) ?? 0 })),
                ]}
              />
            ),
          }
        }
      />

      <ResultsSheet className="min-h-[60vh] pb-28 pt-10">
        <div className="shell">
          <ResultsHeader>
            <p>
              {filtering && <>{filtered.length.toLocaleString("en-US")} of </>}
              {inSection.length.toLocaleString("en-US")} {inSection.length === 1 ? "tool" : "tools"}
              {current && (
                <>
                  {" "}
                  in <span className="text-foreground">{section === "all" ? current.name : sectionById[section].name}</span>
                </>
              )}
            </p>
            <ActiveFilterChips groups={groups} value={filters} onChange={setFilters} />
          </ResultsHeader>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${audience}-${category}-${section}-${grouped}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
              transition={{ duration: 0.5, ease }}
            >
              {filtered.length === 0 ? (
                <div className="py-24 text-center">
                  <p className="text-[22px] font-semibold tracking-[-0.02em]">
                    {query ? <>No matches for “{query}”.</> : "No tools match these filters."}
                  </p>
                  <p className="mt-2 text-muted-foreground">Try a broader term, or clear the filters.</p>
                </div>
              ) : grouped ? (
                <div className="space-y-24">
                  {visibleCategories.map((c) => {
                    const items = filtered.filter((t) => t.category === c.id)
                    if (!items.length) return null
                    return (
                      <section key={c.id} id={c.id} className="defer-render scroll-mt-48">
                        <SectionHeading
                          index={categories.indexOf(c) + 1}
                          title={c.name}
                          blurb={c.tagline}
                          meta={
                            <button onClick={() => select(c.id)} className="text-[14px] text-link hover:underline">
                              View {items.length} ›
                            </button>
                          }
                        />
                        <Grid items={items.slice(0, 8)} />
                      </section>
                    )
                  })}
                </div>
              ) : (
                <Grid items={filtered} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </ResultsSheet>
    </>
  )
}

function Grid({ items }: { items: Tool[] }) {
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
