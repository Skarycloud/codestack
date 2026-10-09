"use client"

import { ArrowDown, ArrowRight, Check } from "lucide-react"
import { useProgress } from "@/components/roadmap/progress"
import { replaceQuery } from "@/components/search-params"
import { aiLoop, itemId, levels, phases, shipChecklist, tips, topicIds, topics, type Level } from "@/data/roadmap"
import { cn } from "@/lib/utils"

/** A big section heading with neobrutalist highlighted words. */
export function Heading({ eyebrow, children, id }: { eyebrow: string; children: React.ReactNode; id?: string }) {
  return (
    <div id={id} className="scroll-mt-24 text-center">
      <p className="mx-auto w-fit border-2 border-[var(--nb-line)] bg-[var(--nb-card)] px-3 py-1 text-[12.5px] font-bold uppercase tracking-wider">
        {eyebrow}
      </p>
      <h2 className="mt-5 font-sans text-[34px] font-black uppercase leading-[1.05] tracking-[-0.03em] sm:text-[52px]">{children}</h2>
    </div>
  )
}

/** The phases as chips, plus overall progress. Sits under the page title. */
export function RoadmapIntro() {
  const { done, ready } = useProgress()
  const total = topics.reduce((n, t) => n + topicIds(t).length, 0)
  const count = ready ? topics.reduce((n, t) => n + topicIds(t).filter((id) => done.has(id)).length, 0) : 0

  return (
    <div className="nb-font mx-auto mt-10 max-w-3xl px-4">
      <nav aria-label="Phases" className="flex flex-wrap justify-center gap-2.5">
        {phases.map((p, i) => (
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
          Follow the path from top to bottom. Click a yellow step or any topic under it to open its checklist. Progress is saved in this
          browser. Want deeper, per-technology roadmaps?{" "}
          <a href="https://roadmap.sh" target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-2">
            roadmap.sh
          </a>{" "}
          is the classic, and inspired this one.
        </p>
      </div>
    </div>
  )
}

const roleColor = { human: "#7FBCFF", ai: "#C4A1FF", gate: "#5CF2C4", ship: "#FFDC58" } as const
const roleName = { human: "You", ai: "AI", gate: "Gate", ship: "Ship" } as const
const optimizeSteps = ["Measure", "Identify", "Profile", "Change", "Test", "Measure again"]

/** The AI-first loop and the optimization loop, side by side. */
export function Loops() {
  return (
    <section className="nb-font px-4 py-20">
      <Heading eyebrow="Two loops to remember" id="ai-loop">
        AI speeds up the loop. <span className="nb-mark">You own it.</span>
      </Heading>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
        <div className="nb-box bg-[var(--nb-card)] p-5 sm:p-6">
          <h3 className="text-[20px] font-bold">The AI-first loop</h3>
          <p className="mt-1 text-[14px] text-[var(--nb-muted)]">
            Agents can help at every step, but every change goes through you and the same gates.
          </p>
          <ol className="mt-5 space-y-0">
            {aiLoop.map((s, i) => (
              <li key={s.step} className="flex flex-col items-start">
                <span className="flex items-center gap-2.5">
                  <span
                    className="w-12 border-2 border-[var(--nb-line)] py-0.5 text-center text-[11.5px] font-bold text-black"
                    style={{ background: roleColor[s.who] }}
                  >
                    {roleName[s.who]}
                  </span>
                  <span className="text-[15.5px]">{s.step}</span>
                  {s.step === "You review the diff" && <span className="text-[12.5px] text-[var(--nb-muted)]">(wrong? fix or retry)</span>}
                </span>
                {i < aiLoop.length - 1 && <ArrowDown aria-hidden className="my-0.5 ml-[18px] size-3.5 opacity-50" />}
              </li>
            ))}
          </ol>
        </div>
        <div className="nb-box bg-[var(--nb-card)] p-5 sm:p-6">
          <h3 className="text-[20px] font-bold">The optimization loop</h3>
          <p className="mt-1 text-[14px] text-[var(--nb-muted)]">
            Don&apos;t optimize what you haven&apos;t measured. Works for speed, queries, cloud bills and tokens.
          </p>
          <ol className="mt-5">
            {optimizeSteps.map((s, i) => (
              <li key={s} className="flex flex-col items-start">
                <span className="border-2 border-[var(--nb-line)] bg-[var(--nb-sub)] px-3 py-1 text-[15.5px]">
                  {i + 1}. {s}
                </span>
                <ArrowDown aria-hidden className="my-0.5 ml-4 size-3.5 opacity-50" />
              </li>
            ))}
            <li className="flex flex-wrap gap-2 text-[15px] font-bold text-black">
              <span className="border-2 border-[var(--nb-line)] bg-[#5CF2C4] px-3 py-1">Better? Keep it</span>
              <span className="border-2 border-[var(--nb-line)] bg-[#FF8A8A] px-3 py-1">Worse? Revert</span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  )
}

const levelColors = ["#5CF2C4", "#7FBCFF", "#C4A1FF", "#FFDC58", "#FF9EE6"]

export function Levels() {
  const pick = (level: Level) => {
    replaceQuery({ level: String(level) })
    document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <section className="nb-font px-4 py-20">
      <Heading eyebrow="Levels" id="levels">
        Grow <span className="nb-mark">one level</span> at a time
      </Heading>
      <p className="mx-auto mt-4 max-w-md text-center text-[15px] text-[var(--nb-muted)]">
        Pick your level and the path highlights the steps that matter for it.
      </p>
      <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {levels.map((l) => (
          <button key={l.level} onClick={() => pick(l.level)} className="nb-box nb-press flex flex-col bg-[var(--nb-card)] text-left">
            <span className="border-b-2 border-[var(--nb-line)] px-4 py-3 text-black" style={{ background: levelColors[l.level - 1] }}>
              <span className="block text-[13px] font-bold">LEVEL {l.level}</span>
              <span className="block text-[19px] font-bold leading-tight">{l.name}</span>
            </span>
            <span className="flex flex-1 flex-col p-4">
              <span className="text-[14px] text-[var(--nb-muted)]">{l.blurb}</span>
              <span className="mt-3 flex flex-1 flex-wrap content-start gap-1.5">
                {l.topics.map((t) => (
                  <span key={t} className="border-2 border-[var(--nb-line)] px-1.5 py-0.5 text-[12.5px]">
                    {t}
                  </span>
                ))}
              </span>
              <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-bold">
                Highlight my steps <ArrowRight className="size-3.5" />
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

export function ShipChecklist() {
  const { done, ready, toggle, setMany } = useProgress()
  const all = shipChecklist.flatMap((g) => g.items.map((i) => itemId(`ship-${g.title}`, i)))
  const count = ready ? all.filter((id) => done.has(id)).length : 0

  return (
    <section className="nb-font px-4 py-20">
      <Heading eyebrow="Final production checklist" id="ship">
        Before you say <span className="nb-mark">&ldquo;ship it&rdquo;</span>
      </Heading>
      <div className="mx-auto mt-8 flex max-w-md items-center gap-3">
        <div className="h-4 flex-1 border-2 border-[var(--nb-line)] bg-[var(--nb-card)]">
          <div className="h-full bg-[#5CF2C4] transition-[width] duration-500" style={{ width: `${(count / all.length) * 100}%` }} />
        </div>
        <span className="text-[15px] font-bold tabular-nums">
          {count}/{all.length}
        </span>
        <button
          onClick={() => setMany(all, false)}
          disabled={!count}
          className="nb-box-sm nb-press bg-[var(--nb-card)] px-3 py-1 text-[13.5px] font-bold disabled:opacity-40"
        >
          Reset
        </button>
      </div>
      <div className="mx-auto mt-10 max-w-6xl columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
        {shipChecklist.map((g, gi) => (
          <div key={g.title} className="nb-box mb-5 break-inside-avoid bg-[var(--nb-card)]">
            <h3
              className="border-b-2 border-[var(--nb-line)] px-4 py-2 text-[16px] font-bold text-black"
              style={{ background: phases[gi % phases.length].color }}
            >
              {g.title}
            </h3>
            <ul className="space-y-1 p-4">
              {g.items.map((item) => {
                const id = itemId(`ship-${g.title}`, item)
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
          </div>
        ))}
      </div>
    </section>
  )
}

export function Tips() {
  return (
    <section className="nb-font px-4 pb-24 pt-20">
      <Heading eyebrow="Tips and tricks" id="tips">
        Small habits, <span className="nb-mark">big difference</span>
      </Heading>
      <ol className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tips.map((tip, i) => (
          <li key={tip} className="nb-box-sm flex gap-3 bg-[var(--nb-card)] p-4">
            <span className="grid size-7 shrink-0 place-items-center bg-black text-[12px] font-bold text-white dark:bg-[var(--nb-yellow)] dark:text-black">
              {i + 1}
            </span>
            <span className="text-[15px] leading-snug">{tip}</span>
          </li>
        ))}
      </ol>
      <blockquote className="nb-box nb-alt-shadow mx-auto mt-16 max-w-3xl bg-[var(--nb-yellow)] p-6 text-center text-[20px] font-bold leading-snug text-black sm:text-[24px]">
        If an AI agent makes a change, you should be able to explain what changed, why, what could break, and how it was tested.
      </blockquote>
    </section>
  )
}
