"use client"

import { ArrowUpRight, ChevronDown, Gamepad2 } from "lucide-react"
import { useState } from "react"
import type { GameSkill, Resource } from "@/data/resources"
import { cn } from "@/lib/utils"

const skillNames: Record<GameSkill, string> = {
  code: "Code",
  css: "CSS",
  js: "JavaScript",
  sql: "SQL",
  git: "Git & terminal",
  security: "Security",
  cs: "Computer science",
  design: "Design",
}

/**
 * The Learn by playing track, presented like a game store: generous cover art, a quiet
 * eyebrow, the title, one line about the game and a single Play action.
 */
export function GameArcade({ items, preview, onShowAll }: { items: Resource[]; preview: boolean; onShowAll: () => void }) {
  const [skill, setSkill] = useState<GameSkill | "all">("all")
  const present = (Object.keys(skillNames) as GameSkill[]).filter((s) => items.some((g) => g.skill === s))
  const filtered = skill === "all" ? items : items.filter((g) => g.skill === skill)
  const shown = preview && skill === "all" ? filtered.slice(0, 6) : filtered

  return (
    <section id="games" className="scroll-mt-48">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-[14px] bg-surface-2 text-foreground">
            <Gamepad2 className="size-[22px]" />
          </span>
          <div>
            <h2 className="text-title">Learn by playing</h2>
            <p className="mt-1 text-muted-foreground">Games that teach real skills, from SQL and Git to CSS and a designer&apos;s eye.</p>
          </div>
        </div>
        <span className="text-[13px] tabular-nums text-muted-foreground">{items.length} games</span>
      </div>

      {present.length > 1 && (
        <div className="no-scrollbar -mx-1 mb-10 flex gap-1 overflow-x-auto px-1">
          {(["all", ...present] as const).map((id) => (
            <button
              key={id}
              onClick={() => setSkill(id)}
              className={cn(
                "pressable shrink-0 rounded-full px-3.5 py-1.5 text-[13px] transition-colors",
                skill === id ? "bg-foreground text-background" : "text-muted-foreground hover:bg-foreground/[0.05] hover:text-foreground",
              )}
            >
              {id === "all" ? "All" : skillNames[id]}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
        {shown.map((g) => (
          <GameCard key={g.name} game={g} />
        ))}
      </div>

      {shown.length < filtered.length && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={onShowAll}
            className="pressable group inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-5 py-2.5 text-[14px] font-medium hover:bg-foreground/10"
          >
            Show all {filtered.length} games
            <ChevronDown className="size-4 transition-transform duration-300 ease-apple group-hover:translate-y-0.5" />
          </button>
        </div>
      )}
    </section>
  )
}

function GameCard({ game: g }: { game: Resource }) {
  return (
    <a href={g.url} target="_blank" rel="noopener noreferrer" className="group block">
      <div className="relative aspect-[1.91/1] overflow-hidden rounded-[22px] bg-surface-2 ring-1 ring-inset ring-black/[0.05] dark:ring-white/[0.06]">
        {g.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={g.cover}
            alt=""
            width={760}
            height={398}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-700 ease-apple group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid size-full place-items-center bg-gradient-to-br from-surface-2 to-foreground/[0.06] p-6 text-center">
            <span className="text-[28px] font-semibold leading-tight tracking-[-0.03em] text-foreground/85 transition-transform duration-700 ease-apple group-hover:scale-[1.03]">
              {g.name}
            </span>
          </div>
        )}
      </div>

      <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
        {g.skill ? skillNames[g.skill] : "Game"} · {g.level}
      </p>
      <h3 className="mt-1.5 text-[19px] font-semibold tracking-[-0.02em]">{g.name}</h3>
      <p className="mt-1 line-clamp-2 text-[14.5px] leading-relaxed text-muted-foreground">{g.description}</p>
      <div className="mt-4 flex items-center gap-3">
        <span className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-4 py-1.5 text-[13px] font-semibold text-link transition-colors group-hover:bg-foreground/10">
          Play
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px" />
        </span>
        <span className="text-[13px] text-muted-foreground">{g.free ? "Free" : "Paid"}</span>
      </div>
    </a>
  )
}
