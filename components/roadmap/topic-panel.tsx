"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { ArrowDown, ArrowUpRight, Check, ChevronLeft, ChevronRight, Lightbulb, X, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { useProgress } from "@/components/roadmap/progress"
import { groupIds, itemId, levels, phaseById, stepNumber, topicIds, topics } from "@/data/roadmap"
import { cn } from "@/lib/utils"

export function TopicPanel({
  open,
  onOpenChange,
  onNavigate,
}: {
  open: { topic: string; group?: number } | null
  onOpenChange: (open: boolean) => void
  onNavigate: (topicId: string) => void
}) {
  const { done, toggle, setMany } = useProgress()
  const body = useRef<HTMLDivElement>(null)
  // Keep showing the last topic while the panel animates closed.
  const last = useRef(open)
  if (open) last.current = open
  const shown = open ?? last.current
  const index = shown ? topics.findIndex((t) => t.id === shown.topic) : -1
  const topic = index >= 0 ? topics[index] : null

  // Opening from a topic box scrolls straight to its checklist and highlights it.
  useEffect(() => {
    if (!open) return
    const id = requestAnimationFrame(() => {
      const el = body.current
      if (!el) return
      if (open.group === undefined) return el.scrollTo({ top: 0 })
      const target = el.querySelector<HTMLElement>(`[data-group="${open.group}"]`)
      if (!target) return
      el.scrollTo({ top: target.offsetTop - 24, behavior: "smooth" })
      target.animate([{ backgroundColor: "hsl(var(--primary) / 0.12)" }, { backgroundColor: "transparent" }], {
        duration: 1400,
        easing: "ease-out",
      })
    })
    return () => cancelAnimationFrame(id)
  }, [open])

  if (!topic) return null
  const phase = phaseById[topic.phase]
  const ids = topicIds(topic)
  const count = ids.filter((id) => done.has(id)).length
  const prev = topics[index - 1]
  const next = topics[index + 1]

  return (
    <Dialog.Root open={!!open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/25 backdrop-blur-[2px] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-black/50" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 right-0 z-[81] flex w-full max-w-[560px] flex-col bg-popover shadow-2xl duration-500 ease-apple data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:inset-y-3 sm:right-3 sm:rounded-[24px] sm:ring-1 sm:ring-black/[0.06] dark:sm:ring-white/[0.08]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-border/70 px-6 py-4">
            <span className="inline-flex items-center gap-2 text-[12.5px] font-medium text-muted-foreground">
              <span className="size-2 rounded-full" style={{ background: phase.color }} />
              {phase.name} · Step {stepNumber[topic.id]} of {topics.length}
            </span>
            <Dialog.Close
              aria-label="Close"
              className="pressable grid size-8 place-items-center rounded-full bg-surface-2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>

          <div ref={body} className="relative flex-1 overflow-y-auto overscroll-contain px-6 pb-10 pt-6">
            <Dialog.Title className="text-[28px] font-semibold leading-tight tracking-[-0.03em]">{topic.title}</Dialog.Title>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{topic.summary}</p>

            <div className="mt-4 flex flex-wrap gap-1.5 text-[12px]">
              <span className="rounded-full bg-surface-2 px-2.5 py-1 text-muted-foreground">
                Level {topic.level} · {levels[topic.level - 1].name}
              </span>
              {topic.optional && (
                <span className="rounded-full border border-dashed border-foreground/25 px-2.5 py-1 text-muted-foreground">
                  Optional for many projects
                </span>
              )}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/[0.08]">
                <span
                  className="block h-full rounded-full transition-[width] duration-500"
                  style={{ width: `${(count / ids.length) * 100}%`, background: count === ids.length ? "#30B158" : phase.color }}
                />
              </span>
              <span className="text-[12.5px] tabular-nums text-muted-foreground">
                {count} of {ids.length} done
              </span>
            </div>

            {topic.rule && (
              <div className="mt-6 flex gap-3 rounded-2xl bg-[#ff9f0a]/[0.1] p-4 text-[14px] leading-relaxed">
                <Lightbulb className="mt-0.5 size-4 shrink-0 text-[#c77700] dark:text-[#ffb340]" />
                <p className="font-medium">{topic.rule}</p>
              </div>
            )}

            {topic.flow && <MiniFlow steps={topic.flow} color={phase.color} />}

            <div className="mt-8 space-y-7">
              {topic.groups.map((group, gi) => {
                const gids = groupIds(topic, group)
                const all = gids.every((id) => done.has(id))
                return (
                  <section key={group.title} data-group={gi} className="-mx-3 rounded-2xl px-3 py-2">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.01em]">
                        {group.title}
                        {group.optional && (
                          <span className="rounded-full border border-dashed border-foreground/25 px-2 py-0.5 text-[11px] font-normal text-muted-foreground">
                            Optional
                          </span>
                        )}
                      </h3>
                      <button onClick={() => setMany(gids, !all)} className="text-[12.5px] text-link hover:underline">
                        {all ? "Clear" : "Mark all"}
                      </button>
                    </div>
                    <ul className="mt-2.5 space-y-0.5">
                      {group.items.map((item) => {
                        const id = itemId(topic.id, item)
                        const checked = done.has(id)
                        return (
                          <li key={item}>
                            <button
                              role="checkbox"
                              aria-checked={checked}
                              onClick={() => toggle(id)}
                              className="group flex w-full items-start gap-3 rounded-lg px-2 py-1.5 text-left text-[14px] leading-snug hover:bg-surface-2"
                            >
                              <span
                                className={cn(
                                  "mt-px grid size-[18px] shrink-0 place-items-center rounded-[6px] border-[1.5px] transition-colors",
                                  checked
                                    ? "border-[#30B158] bg-[#30B158] text-white"
                                    : "border-foreground/25 group-hover:border-foreground/50",
                                )}
                              >
                                {checked && <Check className="size-3" strokeWidth={3.5} />}
                              </span>
                              <span
                                className={cn(
                                  "transition-colors",
                                  checked && "text-muted-foreground line-through decoration-foreground/30",
                                )}
                              >
                                {item}
                              </span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </section>
                )
              })}
            </div>

            {topic.techniques && (
              <section className="mt-8 rounded-2xl bg-surface-2/70 p-5">
                <h3 className="flex items-center gap-2 text-[15px] font-semibold">
                  <Zap className="size-4 text-[#ff9f0a]" />
                  Techniques and rules of thumb
                </h3>
                <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-muted-foreground">
                  {topic.techniques.map((t) => (
                    <li key={t} className="flex gap-2.5">
                      <span className="mt-[9px] size-1 shrink-0 rounded-full bg-foreground/40" />
                      {t}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {topic.resources && (
              <section className="mt-8">
                <h3 className="text-[15px] font-semibold">Resources</h3>
                <ul className="mt-3 space-y-1">
                  {topic.resources.map((r) => {
                    const external = r.href.startsWith("http")
                    const cls = "group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[14px] hover:bg-surface-2"
                    const inner = (
                      <>
                        <span>{r.name}</span>
                        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </>
                    )
                    return (
                      <li key={r.href}>
                        {external ? (
                          <a href={r.href} target="_blank" rel="noopener noreferrer" className={cls}>
                            {inner}
                          </a>
                        ) : (
                          <Link href={r.href} onClick={() => onOpenChange(false)} className={cls}>
                            {inner}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </section>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 border-t border-border/70 p-3">
            <button
              disabled={!prev}
              onClick={() => prev && onNavigate(prev.id)}
              className="pressable flex min-w-0 items-center gap-2 rounded-xl px-3 py-2.5 text-left hover:bg-surface-2 disabled:opacity-30"
            >
              <ChevronLeft className="size-4 shrink-0" />
              <span className="min-w-0">
                <span className="block text-[11.5px] text-muted-foreground">Previous</span>
                <span className="block truncate text-[13.5px] font-medium">{prev?.title ?? "Start"}</span>
              </span>
            </button>
            <button
              disabled={!next}
              onClick={() => next && onNavigate(next.id)}
              className="pressable flex min-w-0 items-center justify-end gap-2 rounded-xl px-3 py-2.5 text-right hover:bg-surface-2 disabled:opacity-30"
            >
              <span className="min-w-0">
                <span className="block text-[11.5px] text-muted-foreground">Next</span>
                <span className="block truncate text-[13.5px] font-medium">{next?.title ?? "Done"}</span>
              </span>
              <ChevronRight className="size-4 shrink-0" />
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

/** A compact vertical flowchart for a short sequence. */
function MiniFlow({ steps, color }: { steps: string[]; color: string }) {
  return (
    <ol className="mt-6 flex flex-col items-start" aria-label="Flow">
      {steps.map((step, i) => (
        <li key={step} className="flex flex-col items-start">
          <span className="rounded-xl border bg-background px-3.5 py-2 text-[13.5px] font-medium" style={{ borderColor: `${color}66` }}>
            {step}
          </span>
          {i < steps.length - 1 && <ArrowDown aria-hidden className="ml-4 my-1 size-3.5 text-muted-foreground/60" />}
        </li>
      ))}
    </ol>
  )
}
