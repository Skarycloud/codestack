"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, BadgeCheck, Check, ChevronDown, Copy, Flame, Gem, Workflow } from "lucide-react"
import { useCallback, useDeferredValue, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { BrandIcon } from "@/components/brand-icon"
import { ease } from "@/components/motion/reveal"
import { SearchParamsListener, replaceQuery } from "@/components/search-params"
import { ActiveFilterChips, FilterButton, activeCount, type FilterGroup, type FilterValue } from "@/components/directory/filter-panel"
import { DirectoryTabs, DirectoryToolbar, ResultsHeader, ResultsSheet, SectionHeading } from "@/components/directory/toolbar"
import { installCommand, publisherById, skillFields, skills, type Skill, type SkillField } from "@/data/skills"
import { useFilterTop } from "@/lib/use-filter-top"

async function copy(text: string, label: string) {
  try {
    await navigator.clipboard.writeText(text)
    toast(label)
  } catch {
    toast("Couldn’t access the clipboard")
  }
}

// Shorter tab labels so the fields read as one tidy row; the full names show as tooltips and headings.
const fieldShort: Record<SkillField, string> = {
  design: "Design",
  frontend: "Frontend",
  testing: "Testing",
  workflow: "Workflow",
  docs: "Documents",
  video: "Video",
  backend: "Backend",
  mobile: "Mobile",
  security: "Security",
  ai: "AI & ML",
  marketing: "Marketing",
  productivity: "Productivity",
}

/** "Show" and publisher are each OR'd within their group and AND'd across groups. */
function applyFilters(items: Skill[], f: FilterValue) {
  const show = f.show ?? []
  const pubs = f.publisher ?? []
  return items.filter(
    (s) =>
      (!show.length || (show.includes("popular") && s.popular) || (show.includes("gems") && s.gem)) &&
      (!pubs.length || pubs.includes(s.publisher)),
  )
}

export function SkillDirectory() {
  const [field, setFieldState] = useState<SkillField | "all">("all")
  const [filters, setFiltersState] = useState<FilterValue>({})
  const [query, setQuery] = useState("")
  const deferred = useDeferredValue(query)
  const filterTop = useFilterTop()

  // Apply ?f= and ?q= on load, and follow it when it changes from outside, e.g. a field picked in the navbar.
  const onParams = useCallback((params: URLSearchParams) => {
    const f = params.get("f")
    setFieldState(skillFields.some((s) => s.id === f) ? (f as SkillField) : "all")
    const q = params.get("q")
    if (q !== null) setQuery(q)
  }, [])
  const setField = (next: SkillField | "all") => {
    setFieldState(next)
    filterTop.reset()
    replaceQuery({ f: next === "all" ? null : next })
  }
  const setFilters = (next: FilterValue) => {
    setFiltersState(next)
    filterTop.reset()
  }

  // Field and search narrow the list; the filter panel works within it.
  const scoped = useMemo(() => {
    const q = deferred.trim().toLowerCase()
    return skills.filter(
      (s) =>
        (field === "all" || s.field === field) &&
        (!q || `${s.name} ${s.description} ${publisherById[s.publisher].name}`.toLowerCase().includes(q)),
    )
  }, [field, deferred])
  const results = useMemo(() => applyFilters(scoped, filters), [scoped, filters])
  const active = activeCount(filters)

  const groups = useMemo<FilterGroup[]>(() => {
    const pubs = new Map<string, number>()
    for (const s of scoped) pubs.set(s.publisher, (pubs.get(s.publisher) ?? 0) + 1)
    return [
      {
        id: "show",
        title: "Show",
        options: [
          { id: "popular", label: "Popular", count: scoped.filter((s) => s.popular).length },
          { id: "gems", label: "Hidden gems", count: scoped.filter((s) => s.gem).length },
        ].filter((o) => o.count),
      },
      {
        id: "publisher",
        title: "Publisher",
        options: [...pubs]
          .sort(
            (a, b) =>
              b[1] - a[1] ||
              publisherById[a[0] as keyof typeof publisherById].name.localeCompare(publisherById[b[0] as keyof typeof publisherById].name),
          )
          .map(([id, count]) => ({ id, label: publisherById[id as keyof typeof publisherById].name, count })),
      },
    ]
  }, [scoped])

  // The "Everything" view previews each field; picking a field, filtering or searching shows all.
  const preview = field === "all" && !active && !deferred.trim()
  const listTop = useRef<HTMLDivElement>(null)
  const expand = (id: SkillField) => {
    setField(id)
    requestAnimationFrame(() => {
      const top = (listTop.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 160
      window.scrollTo({ top, behavior: "smooth" })
    })
  }

  return (
    <>
      <SearchParamsListener onChange={onParams} />
      <div ref={filterTop.ref} aria-hidden />
      <DirectoryToolbar
        search={{ value: query, onChange: setQuery, placeholder: `Search ${skills.length} skills`, label: "Search skills" }}
        controls={
          <FilterButton groups={groups} value={filters} onChange={setFilters} resultCount={results.length} noun={["skill", "skills"]} />
        }
        tabs={
          <DirectoryTabs
            label="Fields"
            layoutId="skills-tab"
            active={field}
            onSelect={setField}
            items={[
              { id: "all" as const, label: "Everything" },
              ...skillFields.map((f) => ({ id: f.id, label: fieldShort[f.id], title: f.name })),
            ]}
          />
        }
      />

      <ResultsSheet className="min-h-[60vh] pb-24 pt-10">
        <div ref={listTop} className="shell">
          <ResultsHeader>
            <p>
              {results.length} {results.length === 1 ? "skill" : "skills"}
              {field !== "all" && (
                <>
                  {" "}
                  in <span className="text-foreground">{skillFields.find((f) => f.id === field)!.name}</span>
                </>
              )}
            </p>
            <ActiveFilterChips groups={groups} value={filters} onChange={setFilters} />
          </ResultsHeader>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${field}-${JSON.stringify(filters)}-${deferred}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.45, ease }}
              className="space-y-20"
            >
              {results.length === 0 && (
                <div className="py-24 text-center">
                  <p className="text-[22px] font-semibold tracking-[-0.02em]">No skills match that.</p>
                  <p className="mt-2 text-muted-foreground">Try a broader search, or clear the filters.</p>
                </div>
              )}
              {skillFields.map((f) => {
                const items = results.filter((s) => s.field === f.id)
                if (!items.length) return null
                return (
                  <section key={f.id} id={f.id} className="defer-render scroll-mt-44">
                    <SectionHeading
                      index={skillFields.indexOf(f) + 1}
                      title={f.name}
                      blurb={f.blurb}
                      meta={`${items.length} ${items.length === 1 ? "skill" : "skills"}`}
                    />
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
                      {(preview ? items.slice(0, 6) : items).map((s) => (
                        <div key={`${s.publisher}-${s.name}`} className="scroll-reveal">
                          <SkillCard skill={s} />
                        </div>
                      ))}
                    </div>
                    {preview && items.length > 6 && (
                      <ShowAll count={items.length} label={`${f.name} skills`} onClick={() => expand(f.id)} />
                    )}
                  </section>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </ResultsSheet>
    </>
  )
}

function ShowAll({ count, label, onClick }: { count: number; label: string; onClick: () => void }) {
  return (
    <div className="mt-8 flex justify-center">
      <button
        type="button"
        onClick={onClick}
        className="pressable group inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-5 py-2.5 text-[14px] font-medium hover:bg-foreground/10"
      >
        Show all {count} {label}
        <ChevronDown className="size-4 transition-transform duration-300 ease-apple group-hover:translate-y-0.5" />
      </button>
    </div>
  )
}

function SkillCard({ skill }: { skill: Skill }) {
  const publisher = publisherById[skill.publisher]
  const command = installCommand(skill)
  const [copied, setCopied] = useState(false)

  return (
    <article className="card-surface card-lift group flex h-full flex-col p-6">
      <div className="flex items-center justify-between gap-3">
        <a
          href={`https://github.com/${publisher.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-w-0 items-center gap-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-surface-2 text-foreground">
            <BrandIcon slug={publisher.icon} name={publisher.name} className="size-3.5" />
          </span>
          <span className="truncate">{publisher.name}</span>
          {publisher.official && <BadgeCheck className="size-3.5 shrink-0 text-link" aria-label="Official" />}
        </a>
        {skill.popular ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#ff9f0a]/[0.12] px-2 py-0.5 text-[11px] font-medium text-[#8f5000] dark:text-[#ff9f0a]">
            <Flame className="size-3" /> Popular
          </span>
        ) : skill.gem ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#5e5ce6]/[0.12] px-2 py-0.5 text-[11px] font-medium text-[#4b49c8] dark:text-[#a5a4ff]">
            <Gem className="size-3" /> Hidden gem
          </span>
        ) : null}
      </div>

      <h3 className="mt-5 break-words font-mono text-[15px] font-semibold tracking-[-0.01em]">
        <span className="text-muted-foreground/60">/</span>
        {skill.name}
      </h3>
      <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted-foreground">{skill.description}</p>

      <div className="mt-5 flex items-center gap-2 rounded-xl bg-surface-2 py-1.5 pl-3 pr-1.5">
        <code className="no-scrollbar min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[11.5px] text-muted-foreground [mask-image:linear-gradient(90deg,#000_82%,transparent)]">
          {command}
        </code>
        <button
          type="button"
          onClick={() => {
            copy(command, `Install command for ${skill.name} copied`)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
          }}
          aria-label={`Copy install command for ${skill.name}`}
          className="pressable grid size-7 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-background hover:text-foreground"
        >
          {copied ? <Check className="size-3.5 text-[#30d158]" /> : <Copy className="size-3.5" />}
        </button>
        <a
          href={`https://github.com/${publisher.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${skill.name} source on GitHub`}
          className="pressable grid size-7 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-background hover:text-foreground"
        >
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </article>
  )
}
