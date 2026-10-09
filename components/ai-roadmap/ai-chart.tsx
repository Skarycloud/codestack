"use client"

import { useProgress } from "@/components/roadmap/progress"
import { RoadmapChart, type ChartConfig } from "@/components/roadmap/roadmap-chart"
import { aiPhases, aiTopics } from "@/data/ai-roadmap"
import { topicIds } from "@/data/roadmap"
import { cn } from "@/lib/utils"

const config: ChartConfig = {
  phases: aiPhases,
  topics: aiTopics,
  start: "Start here: you have an AI coding agent",
  end: { href: "#context-pack", label: "Next: build your Context Pack" },
  meta: (_, n) => `Level ${n} of ${aiTopics.length}`,
}

export function AiChart() {
  return <RoadmapChart config={config} />
}

/** Phase chips, overall progress and links to the sections below the chart. */
export function AiIntro() {
  const { done, ready } = useProgress()
  const total = aiTopics.reduce((n, t) => n + topicIds(t).length, 0)
  const count = ready ? aiTopics.reduce((n, t) => n + topicIds(t).filter((id) => done.has(id)).length, 0) : 0

  return (
    <div className="nb-font mx-auto mt-10 max-w-3xl px-4">
      <nav aria-label="Phases" className="flex flex-wrap justify-center gap-2.5">
        {aiPhases.map((p, i) => (
          <a
            key={p.id}
            href={`#phase-${p.id}`}
            className={cn("nb-box-sm nb-press px-3 py-1.5 text-[14px] font-bold text-black", p.color === "#FFDC58" && "nb-alt-shadow")}
            style={{ background: p.color }}
          >
            {i + 1}. {p.name}
          </a>
        ))}
      </nav>
      <div className="nb-box mt-8 bg-[var(--nb-card)] p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-3 text-[15px]">
          <span className="font-bold">Your progress</span>
          <span className="tabular-nums">
            {count} / {total} checks
          </span>
        </div>
        <div className="mt-2.5 h-4 border-2 border-[var(--nb-line)] bg-[var(--nb-bg)]">
          <div className="h-full bg-[#5CF2C4] transition-[width] duration-500" style={{ width: `${(count / total) * 100}%` }} />
        </div>
        <p className="mt-2.5 text-[13.5px] text-[var(--nb-muted)]">
          Work down the path. Click a step or any topic under it to open its checklist. Progress is saved in this browser, separately from
          the main roadmap.
        </p>
      </div>
      <nav aria-label="On this page" className="mt-6 flex flex-wrap justify-center gap-2 text-[14px] font-bold">
        {[
          ["#roadmap", "Flowchart"],
          ["#context-pack", "Context Pack"],
          ["#agents", "Which file each agent reads"],
          ["#workflow", "9-step workflow"],
          ["#prompts", "Prompt library"],
          ["#example", "Worked example"],
          ["#habits", "Habits"],
          ["#resources", "Resources"],
        ].map(([href, label]) => (
          <a key={href} href={href} className="nb-box-sm nb-press bg-[var(--nb-sub)] px-3 py-1.5">
            {label}
          </a>
        ))}
      </nav>
    </div>
  )
}
