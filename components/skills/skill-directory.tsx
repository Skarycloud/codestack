"use client"

import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  Check,
  ChevronDown,
  Clapperboard,
  Copy,
  Database,
  FileText,
  FlaskConical,
  Flame,
  Gem,
  LayoutTemplate,
  Megaphone,
  Palette,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
  X,
} from "lucide-react"
import { useCallback, useDeferredValue, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { BrandIcon } from "@/components/brand-icon"
import { ease } from "@/components/motion/reveal"
import { SearchParamsListener, replaceQuery } from "@/components/search-params"
import { Segmented } from "@/components/segmented"
import { installCommand, publisherById, skillFields, skills, type Skill, type SkillField } from "@/data/skills"
import { cn } from "@/lib/utils"

export const fieldIcons: Record<SkillField, typeof Palette> = {
  design: Palette,
  frontend: LayoutTemplate,
  testing: FlaskConical,
  workflow: Workflow,
  docs: FileText,
  video: Clapperboard,
  backend: Database,
  mobile: Smartphone,
  security: ShieldCheck,
  ai: BrainCircuit,
  marketing: Megaphone,
  productivity: Sparkles,
}

const fieldTint: Record<SkillField, string> = {
  design: "text-[#bf5af2] bg-[#bf5af2]/10",
  frontend: "text-[#0a84ff] bg-[#0a84ff]/10",
  testing: "text-[#1e9e45] bg-[#30d158]/10 dark:text-[#30d158]",
  workflow: "text-[#5e5ce6] bg-[#5e5ce6]/10",
  docs: "text-[#c27400] bg-[#ff9f0a]/10 dark:text-[#ff9f0a]",
  video: "text-[#ff375f] bg-[#ff375f]/10",
  backend: "text-[#1e9e45] bg-[#30d158]/10 dark:text-[#30d158]",
  mobile: "text-[#0a84ff] bg-[#64d2ff]/15",
  security: "text-[#d70015] bg-[#ff453a]/10 dark:text-[#ff6961]",
  ai: "text-[#9a3fd0] bg-[#bf5af2]/10 dark:text-[#bf5af2]",
  marketing: "text-[#c27400] bg-[#ffd60a]/15 dark:text-[#ffd60a]",
  productivity: "text-[#0071e3] bg-[#0a84ff]/10 dark:text-[#64d2ff]",
}

async function copy(text: string, label: string) {
  try {
    await navigator.clipboard.writeText(text)
    toast(label)
  } catch {
    toast("Couldn’t access the clipboard")
  }
}

export function SkillDirectory() {
  const [field, setFieldState] = useState<SkillField | "all">("all")
  const [show, setShow] = useState<"all" | "popular" | "gems">("all")
  const [query, setQuery] = useState("")
  const deferred = useDeferredValue(query)

  // Apply ?f= on load, and follow it when it changes from outside, e.g. a field picked in the navbar.
  const onParams = useCallback((params: URLSearchParams) => {
    const f = params.get("f")
    setFieldState(skillFields.some((s) => s.id === f) ? (f as SkillField) : "all")
  }, [])
  const setField = (next: SkillField | "all") => {
    setFieldState(next)
    replaceQuery({ f: next === "all" ? null : next })
  }

  const results = useMemo(() => {
    const q = deferred.trim().toLowerCase()
    return skills.filter(
      (s) =>
        (field === "all" || s.field === field) &&
        (show === "all" || (show === "popular" ? s.popular : s.gem)) &&
        (!q || `${s.name} ${s.description} ${publisherById[s.publisher].name}`.toLowerCase().includes(q)),
    )
  }, [field, show, deferred])

  const counts = useMemo(() => Object.fromEntries(skillFields.map((f) => [f.id, skills.filter((s) => s.field === f.id).length])), [])

  // The "Everything" view previews each field; picking a field or searching shows all.
  const preview = field === "all" && show === "all" && !deferred.trim()
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
      <div className="sticky top-14 z-30">
        <div className="glass border-y border-black/[0.06] dark:border-white/[0.07]">
          <div className="shell flex flex-col gap-3 py-3 md:flex-row md:items-center">
            <label className="relative flex h-10 w-full shrink-0 items-center md:max-w-xs md:flex-1">
              <Search className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${skills.length} skills`}
                aria-label="Search skills"
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
              size="sm"
              value={show}
              onChange={setShow}
              options={[
                { value: "all", label: "All" },
                { value: "popular", label: "Popular", count: skills.filter((s) => s.popular).length },
                { value: "gems", label: "Hidden gems", count: skills.filter((s) => s.gem).length },
              ]}
              className="self-start md:ml-auto md:self-auto"
            />
          </div>
          <div className="shell">
            <div className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1 pb-3">
              {[{ id: "all" as const, name: "Everything" }, ...skillFields].map((f) => {
                const active = field === f.id
                return (
                  <button
                    key={f.id}
                    onClick={() => setField(f.id)}
                    className={cn(
                      "pressable relative shrink-0 rounded-full px-3.5 py-1.5 text-[13px] transition-colors",
                      active ? "text-background" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="skills-chip"
                        className="absolute inset-0 rounded-full bg-foreground"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                      />
                    )}
                    <span className="relative">
                      {f.name}
                      {f.id !== "all" && <span className="ml-1.5 tabular-nums font-normal">{counts[f.id]}</span>}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div ref={listTop} className="shell min-h-[60vh] pb-24 pt-12">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${field}-${show}-${deferred}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            transition={{ duration: 0.45, ease }}
            className="space-y-20"
          >
            {results.length === 0 && (
              <div className="py-24 text-center">
                <p className="text-[22px] font-semibold tracking-[-0.02em]">No skills match that.</p>
                <p className="mt-2 text-muted-foreground">Try a broader search, or switch the filter back to “All”.</p>
              </div>
            )}
            {skillFields.map((f) => {
              const items = results.filter((s) => s.field === f.id)
              if (!items.length) return null
              const Icon = fieldIcons[f.id]
              return (
                <section key={f.id} id={f.id} className="defer-render scroll-mt-44">
                  <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className={cn("grid size-12 shrink-0 place-items-center rounded-[14px]", fieldTint[f.id])}>
                        <Icon className="size-[22px]" />
                      </span>
                      <div>
                        <h2 className="text-title">{f.name}</h2>
                        <p className="mt-1 text-muted-foreground">{f.blurb}</p>
                      </div>
                    </div>
                    <span className="text-[13px] tabular-nums text-muted-foreground">
                      {items.length} {items.length === 1 ? "skill" : "skills"}
                    </span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
                    {(preview ? items.slice(0, 6) : items).map((s) => (
                      <div key={`${s.publisher}-${s.name}`} className="scroll-reveal">
                        <SkillCard skill={s} />
                      </div>
                    ))}
                  </div>
                  {preview && items.length > 6 && <ShowAll count={items.length} label={`${f.name} skills`} onClick={() => expand(f.id)} />}
                </section>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
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
