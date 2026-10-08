"use client"

import { ArrowDown, ArrowRight, Bot, Check, CornerDownLeft, RotateCcw, ShieldCheck, Undo2, User } from "lucide-react"
import { useProgress } from "@/components/roadmap/progress"
import { replaceQuery } from "@/components/search-params"
import { aiLoop, itemId, levels, phases, shipChecklist, tips, topics, type Level } from "@/data/roadmap"
import { cn } from "@/lib/utils"

/** The phases as a strip of links, shown under the page header. */
export function PhaseStrip() {
  return (
    <nav aria-label="Phases" className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
      {phases.map((p, i) => (
        <span key={p.id} className="flex items-center gap-1">
          <a
            href={`#phase-${p.id}`}
            className="pressable inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-[13px] font-medium ring-1 ring-inset ring-black/[0.06] hover:bg-surface-2 dark:ring-white/[0.08]"
          >
            <span className="size-2 rounded-full" style={{ background: p.color }} />
            {p.name}
          </a>
          {i < phases.length - 1 && <ArrowRight aria-hidden className="size-3.5 text-muted-foreground/50" />}
        </span>
      ))}
    </nav>
  )
}

/** Overall progress, plus the chart's legend. */
export function RoadmapLegend() {
  const { done, ready } = useProgress()
  const total = topics.reduce((n, t) => n + t.groups.reduce((m, g) => m + g.items.length, 0), 0)
  const count = ready
    ? topics.reduce((n, t) => n + t.groups.reduce((m, g) => m + g.items.filter((i) => done.has(itemId(t.id, i))).length, 0), 0)
    : 0

  return (
    <div className="shell mb-14">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-5 rounded-[24px] bg-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <ul className="flex flex-wrap gap-x-5 gap-y-2.5 text-[13px] text-muted-foreground">
          <li className="flex items-center gap-2">
            <span className="h-5 w-8 rounded-md border-2 border-foreground/60 bg-background" /> Main step
          </li>
          <li className="flex items-center gap-2">
            <span className="h-5 w-8 rounded-md border border-black/10 bg-background dark:border-white/15" /> Topic
          </li>
          <li className="flex items-center gap-2">
            <span className="h-5 w-8 rounded-md border border-dashed border-foreground/40" /> Optional
          </li>
          <li className="flex items-center gap-2">
            <span className="grid h-5 w-8 place-items-center rounded-md bg-[#30B158]/15 text-[#1f9d55]">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            Done
          </li>
        </ul>
        <div className="min-w-[220px]">
          <div className="flex items-baseline justify-between text-[13px]">
            <span className="font-medium">Your progress</span>
            <span className="tabular-nums text-muted-foreground">
              {count} / {total}
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-foreground/[0.08]">
            <div
              className="h-full rounded-full bg-[#30B158] transition-[width] duration-500"
              style={{ width: `${(count / total) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-[12px] text-muted-foreground">Click any box for its checklist. Progress is saved in this browser only.</p>
        </div>
      </div>
    </div>
  )
}

const roleStyle = {
  human: { icon: User, label: "You", cls: "bg-[#0A84FF]/10 text-[#0060c7] dark:text-[#64b5ff]" },
  ai: { icon: Bot, label: "AI", cls: "bg-[#BF5AF2]/12 text-[#8e2fc2] dark:text-[#d79cf7]" },
  gate: { icon: ShieldCheck, label: "Gate", cls: "bg-[#30B158]/12 text-[#1a7f43] dark:text-[#5fd68a]" },
  ship: { icon: RotateCcw, label: "Ship", cls: "bg-[#FF9F0A]/14 text-[#a35f00] dark:text-[#ffb340]" },
} as const

export function AiLoop() {
  return (
    <section id="ai-loop" className="scroll-mt-24 bg-surface py-24 sm:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="max-w-xl">
          <p className="text-eyebrow text-muted-foreground">The AI-first loop</p>
          <h2 className="text-headline mt-4">AI accelerates the loop. It doesn&apos;t own it.</h2>
          <p className="text-lede mt-5 text-muted-foreground">
            Agents can work at every stage, but every change still passes through you and the same quality gates. If a step comes back
            wrong, fix it or retry before moving on.
          </p>
          <div className="mt-8 flex flex-wrap gap-2 text-[12.5px]">
            {Object.values(roleStyle).map(({ icon: Icon, label, cls }) => (
              <span key={label} className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium", cls)}>
                <Icon className="size-3.5" />
                {label}
              </span>
            ))}
          </div>
        </div>
        <ol className="relative mx-auto w-full max-w-md">
          {aiLoop.map((s, i) => {
            const { icon: Icon, cls } = roleStyle[s.who]
            return (
              <li key={s.step} className="flex flex-col items-center">
                <div className="flex w-full items-center gap-3 rounded-2xl bg-background px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.05] dark:ring-white/[0.07]">
                  <span className={cn("grid size-8 shrink-0 place-items-center rounded-full", cls)}>
                    <Icon className="size-4" />
                  </span>
                  <span className="text-[15px] font-medium">{s.step}</span>
                  {s.step === "You review the diff" && (
                    <span className="ml-auto inline-flex items-center gap-1 text-[12px] text-muted-foreground">
                      <Undo2 className="size-3.5" /> Wrong? Fix or retry
                    </span>
                  )}
                </div>
                {i < aiLoop.length - 1 ? (
                  <ArrowDown aria-hidden className="my-1.5 size-4 text-muted-foreground/50" />
                ) : (
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
                    <CornerDownLeft className="size-3.5" /> Next iteration
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

const optimizeSteps = ["Measure", "Identify", "Profile", "Change", "Test", "Measure again"]

export function OptimizeLoop() {
  return (
    <section id="optimize" className="shell scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-eyebrow text-muted-foreground">The optimization loop</p>
        <h2 className="text-headline mt-4">Don&apos;t optimize what you haven&apos;t measured.</h2>
        <p className="text-lede mt-5 text-muted-foreground">
          The same loop works for page speed, queries, cloud bills and token costs. It stops people, and agents, from shipping
          &ldquo;optimizations&rdquo; that make things worse.
        </p>
      </div>
      <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-2">
        {optimizeSteps.map((s, i) => (
          <span key={s} className="flex items-center gap-2">
            <span className="rounded-xl bg-surface px-4 py-2.5 text-[14.5px] font-medium ring-1 ring-inset ring-black/[0.05] dark:ring-white/[0.07]">
              {s}
            </span>
            <ArrowRight aria-hidden className="size-4 text-muted-foreground/50" />
          </span>
        ))}
        <span className="flex flex-col gap-1.5 text-[13.5px] font-medium">
          <span className="rounded-xl bg-[#30B158]/12 px-3.5 py-1.5 text-[#1a7f43] dark:text-[#5fd68a]">Improved: keep it</span>
          <span className="rounded-xl bg-[#FF375F]/10 px-3.5 py-1.5 text-[#c2193f] dark:text-[#ff7a93]">Not better: revert</span>
        </span>
      </div>
    </section>
  )
}

const levelColors = ["#30B158", "#0A84FF", "#5E5CE6", "#FF9F0A", "#FF375F"]

export function Levels() {
  const pick = (level: Level) => {
    replaceQuery({ level: String(level) })
    document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <section id="levels" className="scroll-mt-24 bg-surface py-24 sm:py-28">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="text-eyebrow text-muted-foreground">Levels</p>
          <h2 className="text-headline mt-4">Grow one level at a time.</h2>
          <p className="text-lede mt-5 text-muted-foreground">Pick your level to highlight its steps on the roadmap.</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 [&>*]:min-w-0">
          {levels.map((l) => (
            <button key={l.level} onClick={() => pick(l.level)} className="card-surface card-lift group flex flex-col p-5 text-left">
              <span className="flex items-center gap-2">
                <span
                  className="grid size-7 place-items-center rounded-full text-[12px] font-bold text-white"
                  style={{ background: levelColors[l.level - 1] }}
                >
                  {l.level}
                </span>
                <span className="text-[16px] font-semibold tracking-[-0.02em]">{l.name}</span>
              </span>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">{l.blurb}</p>
              <ul className="mt-4 flex flex-1 flex-wrap content-start gap-1.5">
                {l.topics.map((t) => (
                  <li key={t} className="rounded-full bg-surface-2 px-2.5 py-1 text-[12px] text-muted-foreground">
                    {t}
                  </li>
                ))}
              </ul>
              <span className="mt-5 text-[13px] font-medium text-link">Highlight on the roadmap ›</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ShipChecklist() {
  const { done, ready, toggle, setMany } = useProgress()
  const all = shipChecklist.flatMap((g) => g.items.map((i) => itemId(`ship-${g.title}`, i)))
  const count = ready ? all.filter((id) => done.has(id)).length : 0

  return (
    <section id="ship" className="shell scroll-mt-24 py-24 sm:py-28">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-eyebrow text-muted-foreground">Final production checklist</p>
          <h2 className="text-headline mt-4">Before you say &ldquo;ship it.&rdquo;</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-48">
            <div className="flex justify-between text-[13px]">
              <span className="font-medium">{count === all.length ? "Ready to ship" : "Checked"}</span>
              <span className="tabular-nums text-muted-foreground">
                {count} / {all.length}
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-foreground/[0.08]">
              <div
                className="h-full rounded-full bg-[#30B158] transition-[width] duration-500"
                style={{ width: `${(count / all.length) * 100}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => setMany(all, false)}
            disabled={!count}
            className="pressable rounded-full bg-surface-2 px-4 py-2 text-[13px] font-medium disabled:opacity-40"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {shipChecklist.map((g) => (
          <div key={g.title} className="card-surface mb-4 break-inside-avoid p-5">
            <h3 className="text-[15px] font-semibold">{g.title}</h3>
            <ul className="mt-3 space-y-0.5">
              {g.items.map((item) => {
                const id = itemId(`ship-${g.title}`, item)
                const checked = done.has(id)
                return (
                  <li key={item}>
                    <button
                      role="checkbox"
                      aria-checked={checked}
                      onClick={() => toggle(id)}
                      className="group flex w-full items-start gap-2.5 rounded-lg px-1.5 py-1 text-left text-[14px] hover:bg-surface-2"
                    >
                      <span
                        className={cn(
                          "mt-0.5 grid size-[17px] shrink-0 place-items-center rounded-[5px] border-[1.5px] transition-colors",
                          checked ? "border-[#30B158] bg-[#30B158] text-white" : "border-foreground/25 group-hover:border-foreground/50",
                        )}
                      >
                        {checked && <Check className="size-3" strokeWidth={3.5} />}
                      </span>
                      <span className={cn(checked && "text-muted-foreground line-through decoration-foreground/30")}>{item}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Tips() {
  return (
    <section id="tips" className="scroll-mt-24 bg-surface py-24 sm:py-28">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="text-eyebrow text-muted-foreground">Tips and tricks</p>
          <h2 className="text-headline mt-4">Small habits, big difference.</h2>
        </div>
        <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 [&>*]:min-w-0">
          {tips.map((tip, i) => (
            <li key={tip} className="flex gap-3 rounded-2xl bg-background p-5 ring-1 ring-black/[0.05] dark:ring-white/[0.07]">
              <span className="font-mono text-[12px] tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[14.5px] leading-relaxed">{tip}</span>
            </li>
          ))}
        </ol>
        <blockquote className="mx-auto mt-16 max-w-3xl text-balance text-center text-[22px] font-semibold leading-snug tracking-[-0.02em] sm:text-[26px]">
          &ldquo;If an AI agent makes a change, you should be able to explain what changed, why it changed, what could break, and how it was
          tested.&rdquo;
        </blockquote>
      </div>
    </section>
  )
}
