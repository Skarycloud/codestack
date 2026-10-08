"use client"

import { ChevronDown, Gamepad2 } from "lucide-react"
import { useState } from "react"
import { BrandIcon } from "@/components/brand-icon"
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
 * The Learn by playing track as a clean, App Store style list: an icon, a name, one line about
 * the game and a Play button, filtered by the skill it teaches.
 */
export function GameArcade({ items, preview, onShowAll }: { items: Resource[]; preview: boolean; onShowAll: () => void }) {
  const [skill, setSkill] = useState<GameSkill | "all">("all")
  const present = (Object.keys(skillNames) as GameSkill[]).filter((s) => items.some((g) => g.skill === s))
  const filtered = skill === "all" ? items : items.filter((g) => g.skill === skill)
  const shown = preview && skill === "all" ? filtered.slice(0, 9) : filtered

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
        <span className="text-[13px] tabular-nums text-muted-foreground">
          {items.length} games · {items.filter((g) => g.free).length} free
        </span>
      </div>

      {present.length > 1 && (
        <div className="no-scrollbar -mx-1 mb-4 flex gap-1 overflow-x-auto px-1">
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

      <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
        {shown.map((g) => (
          <li key={g.name} className="border-b border-black/[0.06] dark:border-white/[0.08]">
            <a
              href={g.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group -mx-3 flex items-center gap-4 rounded-2xl px-3 py-4 transition-colors hover:bg-foreground/[0.03]"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-[16px] bg-surface-2 ring-1 ring-inset ring-black/[0.04] transition-transform duration-500 ease-apple group-hover:scale-[1.04] dark:ring-white/[0.06]">
                <BrandIcon name={g.name} className="size-7" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15.5px] font-semibold tracking-[-0.015em]">{g.name}</span>
                <span className="mt-0.5 line-clamp-2 text-[13.5px] leading-snug text-muted-foreground">{g.description}</span>
                <span className="mt-1 block text-[12px] text-muted-foreground/80">
                  {g.skill ? skillNames[g.skill] : "Game"} · {g.level}
                </span>
              </span>
              <span className="flex shrink-0 flex-col items-center gap-1">
                <span className="rounded-full bg-surface-2 px-4 py-1.5 text-[13px] font-semibold text-link transition-colors group-hover:bg-foreground/10">
                  Play
                </span>
                <span className="text-[10.5px] text-muted-foreground">{g.free ? "Free" : "Paid"}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      {shown.length < filtered.length && (
        <div className="mt-8 flex justify-center">
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
