"use client"

import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Lightbulb, X, Zap } from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { useProgress } from "@/components/roadmap/progress"
import { SearchParamsListener, replaceQuery } from "@/components/search-params"
import {
  groupIds,
  itemId,
  levels,
  phases,
  topicIds,
  topics,
  type ChartPhase,
  type ChartTopic,
  type Level,
  type RoadmapGroup,
} from "@/data/roadmap"
import { cn } from "@/lib/utils"

type Open = { topic: string; group?: number } | null

/** A short vertical connector between blocks on the path. */
const Line = ({ className }: { className?: string }) => (
  <div aria-hidden className={cn("mx-auto h-8 w-[3px] bg-[var(--nb-line)]", className)} />
)

export interface ChartConfig {
  phases: ChartPhase[]
  topics: ChartTopic[]
  /** The box the path starts from. */
  start: string
  /** The button the path ends on. */
  end: { href: string; label: string }
  /** The small caps line at the top of an open checklist. */
  meta: (topic: ChartTopic, step: number) => string
  /** Supports ?level= highlighting. */
  levels?: boolean
}

const mainConfig: ChartConfig = {
  phases,
  topics,
  start: "Start here: an idea",
  end: { href: "#ship", label: "Ready to ship? Final checklist" },
  meta: (t, n) => `Step ${n} · Level ${t.level} ${levels[t.level! - 1].name}`,
  levels: true,
}

/**
 * A roadmap as one continuous path: every step follows the last, its topics hang right
 * underneath, and its checklist opens in place. Nothing to hunt for, nothing in a side panel.
 */
export function RoadmapChart({ config = mainConfig }: { config?: ChartConfig }) {
  const [open, setOpen] = useState<Open>(null)
  const [level, setLevel] = useState<Level | null>(null)
  const { phases, topics } = config
  const stepNumber = Object.fromEntries(topics.map((t, i) => [t.id, i + 1]))

  const onParams = useCallback(
    (params: URLSearchParams) => {
      const l = Number(params.get("level"))
      if (config.levels) setLevel(l >= 1 && l <= 5 ? (l as Level) : null)
      // ?step= opens that step's checklist and brings it into view, e.g. from the search palette.
      const step = params.get("step")
      if (step && config.topics.some((t) => t.id === step)) {
        setOpen({ topic: step })
        // After the step's own "bring the checklist into view" scroll, so the step title leads.
        setTimeout(() => document.getElementById(step)?.scrollIntoView({ behavior: "smooth", block: "start" }), 150)
      }
    },
    [config],
  )

  const toggle = (topic: string, group?: number) =>
    setOpen((prev) => (prev?.topic === topic && (group === undefined || prev.group === group) ? null : { topic, group }))

  return (
    <section id="roadmap" aria-label="Roadmap" className="nb-font scroll-mt-24 px-4 pb-10">
      <SearchParamsListener onChange={onParams} />

      {level && (
        <div className="sticky top-16 z-20 mx-auto mb-6 flex w-fit items-center gap-3 border-2 border-black bg-[var(--nb-yellow)] py-1.5 pl-4 pr-1.5 text-[14px] font-bold text-black shadow-[3px_3px_0_0_#000]">
          Highlighting Level {level}: {levels[level - 1].name}
          <button
            onClick={() => {
              setLevel(null)
              replaceQuery({})
            }}
            aria-label="Show every level"
            className="grid size-7 place-items-center border-2 border-black bg-white"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      <div className="mx-auto max-w-3xl">
        <div className="mx-auto w-fit">
          <div className="nb-box bg-black px-6 py-3 text-center text-[17px] font-bold text-white dark:bg-[var(--nb-card)]">
            {config.start}
          </div>
        </div>

        {phases.map((phase, pi) => (
          <div key={phase.id} id={`phase-${phase.id}`} className="scroll-mt-24">
            <Line />
            <div className="mx-auto w-fit">
              <div
                className={cn(
                  "nb-box px-5 py-2 text-center text-[15px] font-bold uppercase tracking-wide text-black",
                  phase.color === "#FFDC58" && "nb-alt-shadow",
                )}
                style={{ background: phase.color }}
              >
                Phase {pi + 1} · {phase.name}
              </div>
            </div>
            <p className="mx-auto mt-3 max-w-sm text-center text-[14px] text-[var(--nb-muted)]">{phase.blurb}</p>
            {topics
              .filter((t) => t.phase === phase.id)
              .map((topic) => (
                <Step
                  key={topic.id}
                  topic={topic}
                  color={phase.color}
                  dim={!!level && topic.level !== level}
                  number={stepNumber[topic.id]}
                  meta={config.meta(topic, stepNumber[topic.id])}
                  open={open?.topic === topic.id ? open : null}
                  onToggle={(group) => toggle(topic.id, group)}
                  onClose={() => setOpen(null)}
                />
              ))}
          </div>
        ))}

        <Line />
        <a
          href={config.end.href}
          className="nb-box nb-press nb-alt-shadow mx-auto flex w-fit items-center gap-2 bg-black px-6 py-3 text-[16px] font-bold text-white dark:bg-[var(--nb-yellow)] dark:text-black"
        >
          {config.end.label}
          <ArrowDown className="size-4" />
        </a>
      </div>
    </section>
  )
}

function Step({
  topic,
  color,
  dim,
  number,
  meta,
  open,
  onToggle,
  onClose,
}: {
  topic: ChartTopic
  color: string
  dim: boolean
  number: number
  meta: string
  open: Open
  onToggle: (group?: number) => void
  onClose: () => void
}) {
  const { done, ready } = useProgress()
  const ids = topicIds(topic)
  const count = ready ? ids.filter((id) => done.has(id)).length : 0
  const complete = count === ids.length
  const panel = useRef<HTMLDivElement>(null)

  // Bring a freshly opened checklist into view.
  useEffect(() => {
    if (!open) return
    const id = requestAnimationFrame(() => {
      const target = open.group === undefined ? panel.current : panel.current?.querySelector<HTMLElement>(`[data-group="${open.group}"]`)
      target?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    })
    return () => cancelAnimationFrame(id)
  }, [open])

  return (
    <div id={topic.id} className={cn("scroll-mt-24 transition-opacity duration-300", dim && "opacity-35 hover:opacity-100")}>
      <Line />
      <button
        onClick={() => onToggle()}
        aria-expanded={!!open}
        className={cn(
          "nb-box nb-press nb-alt-shadow mx-auto flex w-full max-w-md items-center gap-3 px-4 py-3 text-left text-black",
          topic.optional && "border-dashed",
        )}
        style={{ background: complete ? "#5CF2C4" : "var(--nb-yellow)" }}
      >
        <span className="grid size-9 shrink-0 place-items-center bg-black text-[15px] font-bold text-white">
          {complete ? <Check className="size-4" strokeWidth={3} /> : number}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[18px] font-bold leading-tight">{topic.title}</span>
          <span className="mt-0.5 block text-[12.5px] opacity-75">
            {count}/{ids.length} done{topic.optional ? " · optional" : ""}
          </span>
        </span>
        <ChevronDown className={cn("size-5 shrink-0 transition-transform duration-200", open && "rotate-180")} />
      </button>

      <p className="mx-auto mt-3 max-w-md text-center text-[14px] leading-snug text-[var(--nb-muted)]">{topic.summary}</p>

      <div className="mt-4 flex flex-wrap justify-center gap-2.5">
        {topic.groups.map((g, i) => (
          <TopicChip key={g.title} topic={topic} group={g} color={color} active={open?.group === i} onClick={() => onToggle(i)} />
        ))}
      </div>

      {open && (
        <div ref={panel} className="nb-box mt-5 scroll-mt-24 bg-[var(--nb-card)] p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <p className="text-[13px] font-bold uppercase tracking-wide text-[var(--nb-muted)]">{meta}</p>
            <button
              onClick={onClose}
              aria-label="Close checklist"
              className="nb-box-sm grid size-8 shrink-0 place-items-center bg-[var(--nb-card)]"
            >
              <X className="size-4" />
            </button>
          </div>

          {topic.rule && (
            <div className="nb-box-sm nb-alt-shadow mt-4 flex gap-3 bg-[var(--nb-yellow)] p-3.5 text-[15px] font-bold leading-snug text-black">
              <Lightbulb className="mt-0.5 size-4 shrink-0" />
              {topic.rule}
            </div>
          )}

          {topic.flow && (
            <ol className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-[13.5px]" aria-label="Flow">
              {topic.flow.map((step, i) => (
                <li key={step} className="flex items-center gap-1.5">
                  <span className="border-2 border-[var(--nb-line)] px-2.5 py-1" style={{ background: `${color}55` }}>
                    {step}
                  </span>
                  {i < topic.flow!.length - 1 && <ArrowRight aria-hidden className="size-3.5 opacity-60" />}
                </li>
              ))}
            </ol>
          )}

          <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {topic.groups.map((g, gi) => (
              <Checklist key={g.title} topic={topic} group={g} index={gi} highlight={open.group === gi} />
            ))}
          </div>

          {topic.techniques && (
            <div className="mt-6 border-t-2 border-dashed border-[var(--nb-line)] pt-5">
              <h4 className="flex items-center gap-2 text-[15px] font-bold">
                <Zap className="size-4" /> Techniques
              </h4>
              <ul className="mt-2.5 space-y-1.5 text-[14px] leading-snug">
                {topic.techniques.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span aria-hidden>→</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {topic.resources && (
            <div className="mt-6 flex flex-wrap gap-2.5">
              {topic.resources.map((r) => {
                const cls = "nb-box-sm nb-press inline-flex items-center gap-1.5 bg-[var(--nb-sub)] px-3 py-1.5 text-[13.5px] font-bold"
                return r.href.startsWith("http") ? (
                  <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {r.name}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                ) : (
                  <Link key={r.href} href={r.href} className={cls}>
                    {r.name}
                    <ArrowRight className="size-3.5" />
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function TopicChip({
  topic,
  group,
  color,
  active,
  onClick,
}: {
  topic: ChartTopic
  group: RoadmapGroup
  color: string
  active: boolean
  onClick: () => void
}) {
  const { done, ready } = useProgress()
  const ids = groupIds(topic, group)
  const count = ready ? ids.filter((id) => done.has(id)).length : 0
  const complete = count === ids.length
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "nb-box-sm nb-press inline-flex items-center gap-2 px-3 py-1.5 text-[14.5px]",
        group.optional && "border-dashed",
        active && "font-bold",
      )}
      style={{ background: complete ? "#5CF2C4" : active ? color : "var(--nb-sub)", color: complete || active ? "#000" : undefined }}
    >
      {group.title}
      {complete ? (
        <Check className="size-3.5" strokeWidth={3} aria-label="Done" />
      ) : (
        <span className="text-[12px] tabular-nums opacity-70">
          {count > 0 ? `${count}/` : ""}
          {ids.length}
        </span>
      )}
    </button>
  )
}

function Checklist({ topic, group, index, highlight }: { topic: ChartTopic; group: RoadmapGroup; index: number; highlight: boolean }) {
  const { done, toggle, setMany } = useProgress()
  const ids = groupIds(topic, group)
  const all = ids.every((id) => done.has(id))
  return (
    <section
      data-group={index}
      className={cn("scroll-mt-28 p-1", highlight && "outline outline-2 outline-offset-4 outline-[var(--nb-line)]")}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="text-[16px] font-bold">
          {group.title}
          {group.optional && <span className="ml-2 text-[12px] font-normal text-[var(--nb-muted)]">optional</span>}
        </h4>
        <button onClick={() => setMany(ids, !all)} className="text-[12.5px] underline underline-offset-2">
          {all ? "Clear" : "Tick all"}
        </button>
      </div>
      <ul className="mt-2 space-y-1">
        {group.items.map((item) => {
          const id = itemId(topic.id, item)
          const checked = done.has(id)
          return (
            <li key={item}>
              <button
                role="checkbox"
                aria-checked={checked}
                onClick={() => toggle(id)}
                className="flex w-full items-start gap-2.5 py-0.5 text-left text-[15px] leading-snug"
              >
                <span
                  className={cn(
                    "mt-0.5 grid size-[18px] shrink-0 place-items-center border-2 border-[var(--nb-line)]",
                    checked ? "bg-[#5CF2C4] text-black" : "bg-[var(--nb-card)]",
                  )}
                >
                  {checked && <Check className="size-3" strokeWidth={4} />}
                </span>
                <span className={cn(checked && "line-through opacity-55")}>{item}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
