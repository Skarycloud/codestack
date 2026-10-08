"use client"

import { Check, Flag, X } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { useProgress } from "@/components/roadmap/progress"
import { TopicPanel } from "@/components/roadmap/topic-panel"
import { SearchParamsListener, replaceQuery } from "@/components/search-params"
import { groupIds, levels, phases, stepNumber, topicIds, topics, type Level, type RoadmapGroup, type RoadmapTopic } from "@/data/roadmap"
import { cn } from "@/lib/utils"

const colorOf = (topic: RoadmapTopic) => phases.find((p) => p.id === topic.phase)!.color

type Open = { topic: string; group?: number } | null

/**
 * The roadmap as a flowchart, in the spirit of roadmap.sh: main steps run down a central spine
 * and their topics branch off to either side. Every box opens a panel with its checklist.
 */
export function RoadmapChart() {
  const [open, setOpen] = useState<Open>(null)
  const [level, setLevel] = useState<Level | null>(null)

  const onParams = useCallback((params: URLSearchParams) => {
    const l = Number(params.get("level"))
    setLevel(l >= 1 && l <= 5 ? (l as Level) : null)
  }, [])

  const clearLevel = () => {
    setLevel(null)
    replaceQuery({})
  }

  return (
    <section id="roadmap" aria-label="Roadmap" className="shell scroll-mt-24 pb-24">
      <SearchParamsListener onChange={onParams} />

      {level && (
        <div className="sticky top-16 z-20 mx-auto mb-8 flex w-fit items-center gap-3 rounded-full bg-foreground py-1.5 pl-4 pr-1.5 text-[13px] text-background shadow-lg">
          Highlighting Level {level}: {levels[level - 1].name}
          <button
            onClick={clearLevel}
            aria-label="Show every level"
            className="pressable grid size-7 place-items-center rounded-full bg-background/15 hover:bg-background/25"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      <div className="relative mx-auto max-w-[1120px]">
        {phases.map((phase, index) => (
          <div key={phase.id} id={`phase-${phase.id}`} className="relative scroll-mt-28 pb-6">
            {/* The spine: centered on large screens, along the left edge on small ones. */}
            <span
              aria-hidden
              className="absolute bottom-0 left-[19px] top-0 w-[2px] lg:left-1/2 lg:-translate-x-1/2"
              style={{ background: `linear-gradient(${phase.color}55, ${phase.color}55)` }}
            />
            <PhaseLabel index={index} name={phase.name} blurb={phase.blurb} color={phase.color} />
            <div className="space-y-10 pt-8 lg:space-y-14">
              {topics
                .filter((t) => t.phase === phase.id)
                .map((topic) => (
                  <TopicRow
                    key={topic.id}
                    topic={topic}
                    dim={!!level && topic.level !== level}
                    onOpen={(group) => setOpen({ topic: topic.id, group })}
                  />
                ))}
            </div>
          </div>
        ))}

        <div className="relative flex lg:justify-center">
          <a
            href="#ship"
            className="pressable relative z-10 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-[15px] font-semibold text-background shadow-lg"
          >
            <Flag className="size-4" />
            Ready to ship? Run the final checklist
          </a>
        </div>
      </div>

      <TopicPanel open={open} onOpenChange={(o) => !o && setOpen(null)} onNavigate={(id) => setOpen({ topic: id })} />
    </section>
  )
}

function PhaseLabel({ index, name, blurb, color }: { index: number; name: string; blurb: string; color: string }) {
  return (
    <div className="relative z-10 flex flex-col pt-4 lg:items-center lg:text-center">
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-background py-1.5 pl-2 pr-4 text-[13px] font-semibold ring-1 ring-inset ring-black/[0.08] dark:ring-white/[0.1]">
        <span className="grid size-6 place-items-center rounded-full text-[11px] font-bold text-white" style={{ background: color }}>
          {index + 1}
        </span>
        {name}
      </span>
      <p className="ml-12 mt-2 max-w-xs bg-background text-[13px] text-muted-foreground lg:ml-0 lg:px-2">{blurb}</p>
    </div>
  )
}

function TopicRow({ topic, dim, onOpen }: { topic: RoadmapTopic; dim: boolean; onOpen: (group?: number) => void }) {
  const color = colorOf(topic)
  const half = Math.ceil(topic.groups.length / 2)
  const left = topic.groups.slice(0, half).map((g, i) => ({ g, i }))
  const right = topic.groups.slice(half).map((g, i) => ({ g, i: i + half }))

  return (
    <div
      // Dimming fades a step's contents, never its background, so the spine can't show through.
      className={cn("relative", dim && "dimmed")}
    >
      {/* Large screens: topics branch to both sides of the main step. */}
      <div className="hidden grid-cols-[1fr_272px_1fr] items-center lg:grid">
        <Side side="left" groups={left} topic={topic} color={color} onOpen={onOpen} />
        <MainNode topic={topic} color={color} onOpen={() => onOpen()} />
        <Side side="right" groups={right} topic={topic} color={color} onOpen={onOpen} />
      </div>

      {/* Small screens: a timeline, with topics listed under each step. */}
      <div className="pl-11 lg:hidden">
        <span
          aria-hidden
          className="absolute left-[13px] top-5 size-[14px] rounded-full border-[3px] border-background"
          style={{ background: color }}
        />
        <MainNode topic={topic} color={color} onOpen={() => onOpen()} />
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {topic.groups.map((g, i) => (
            <GroupNode key={g.title} topic={topic} group={g} onClick={() => onOpen(i)} className="w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}

function Side({
  side,
  groups,
  topic,
  color,
  onOpen,
}: {
  side: "left" | "right"
  groups: { g: RoadmapGroup; i: number }[]
  topic: RoadmapTopic
  color: string
  onOpen: (group: number) => void
}) {
  if (!groups.length) return <div />
  const dotted = { borderColor: `${color}88` }
  const stack = (
    <div className={cn("relative flex flex-col gap-2", side === "left" ? "pr-5" : "pl-5")}>
      {groups.length > 1 && (
        <span
          aria-hidden
          className={cn("absolute bottom-5 top-5 border-dotted", side === "left" ? "right-0 border-r-2" : "left-0 border-l-2")}
          style={dotted}
        />
      )}
      {groups.map(({ g, i }) => (
        <div key={g.title} className="relative">
          <span
            aria-hidden
            className={cn("absolute top-1/2 w-5 border-t-2 border-dotted", side === "left" ? "-right-5" : "-left-5")}
            style={dotted}
          />
          <GroupNode topic={topic} group={g} onClick={() => onOpen(i)} className="w-[228px]" />
        </div>
      ))}
    </div>
  )
  const link = <span aria-hidden className="h-0 w-10 shrink-0 border-t-2 border-dotted" style={dotted} />
  return (
    <div className={cn("flex items-center", side === "left" ? "justify-end" : "justify-start")}>
      {side === "left" ? (
        <>
          {stack}
          {link}
        </>
      ) : (
        <>
          {link}
          {stack}
        </>
      )}
    </div>
  )
}

function MainNode({ topic, color, onOpen }: { topic: RoadmapTopic; color: string; onOpen: () => void }) {
  const { done, ready } = useProgress()
  const ids = useMemo(() => topicIds(topic), [topic])
  const count = ready ? ids.filter((id) => done.has(id)).length : 0
  const complete = count === ids.length

  return (
    <button
      onClick={onOpen}
      className={cn(
        "card-lift group relative z-10 flex w-full items-center gap-3 rounded-2xl border-2 bg-background px-4 py-3.5 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.25)]",
        topic.optional && "border-dashed",
      )}
      style={{ borderColor: color }}
    >
      <span
        className="grid size-8 shrink-0 place-items-center rounded-full text-[13px] font-bold text-white transition-transform duration-300 group-hover:scale-110"
        style={{ background: complete ? "#30B158" : color }}
      >
        {complete ? <Check className="size-4" strokeWidth={3} /> : stepNumber[topic.id]}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-semibold tracking-[-0.015em]">{topic.title}</span>
        <span className="mt-1.5 flex items-center gap-2 text-[11.5px] text-muted-foreground">
          <span className="h-1 flex-1 overflow-hidden rounded-full bg-foreground/[0.08]">
            <span
              className="block h-full rounded-full transition-[width] duration-500"
              style={{ width: `${(count / ids.length) * 100}%`, background: complete ? "#30B158" : color }}
            />
          </span>
          <span className="tabular-nums">
            {count}/{ids.length}
          </span>
        </span>
      </span>
    </button>
  )
}

function GroupNode({
  topic,
  group,
  onClick,
  className,
}: {
  topic: RoadmapTopic
  group: RoadmapGroup
  onClick: () => void
  className?: string
}) {
  const { done, ready } = useProgress()
  const ids = groupIds(topic, group)
  const count = ready ? ids.filter((id) => done.has(id)).length : 0
  const complete = count === ids.length

  return (
    <button
      onClick={onClick}
      className={cn(
        "pressable flex h-10 items-center gap-2 rounded-xl border bg-surface px-3.5 text-left text-[13.5px] transition-[border-color,background-color] duration-200 hover:bg-surface-2",
        group.optional ? "border-dashed border-foreground/25" : "border-black/[0.07] dark:border-white/[0.09]",
        complete && "border-[#30B158]/50 bg-[#30B158]/[0.07]",
        className,
      )}
    >
      <span className="min-w-0 flex-1 truncate">{group.title}</span>
      {complete ? (
        <Check className="size-4 shrink-0 text-[#1f9d55]" strokeWidth={2.5} aria-label="Done" />
      ) : (
        <span className="shrink-0 text-[11.5px] tabular-nums text-muted-foreground">
          {count > 0 ? `${count}/` : ""}
          {ids.length}
        </span>
      )}
    </button>
  )
}
