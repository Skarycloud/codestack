"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Check, ClipboardCopy, Link2, RotateCcw, Sparkles } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { BrandIcon } from "@/components/brand-icon"
import { DragScroller } from "@/components/drag-scroller"
import { SearchParamsListener, replaceQuery } from "@/components/search-params"
import { ease } from "@/components/motion/reveal"
import { categoryById, tools, type Tool } from "@/data/catalog"
import { stackCategories, stackPresets, type StackPreset } from "@/data/stacks"
import { cn } from "@/lib/utils"

const toolByName = new Map(tools.map((t) => [t.name, t]))

function bestMatch(selected: Set<string>): { preset: StackPreset; score: number } | null {
  if (!selected.size) return null
  let best: { preset: StackPreset; score: number } | null = null
  for (const preset of stackPresets) {
    const hits = preset.tools.filter((t) => selected.has(t)).length
    const score = hits / new Set([...preset.tools, ...selected]).size
    if (!best || score > best.score) best = { preset, score }
  }
  return best && best.score > 0 ? best : null
}

export function StackBuilder() {
  const [selected, setSelected] = useState<Set<string>>(() => new Set())
  // False until the URL has been read, so the empty first render never overwrites a shared ?s= link.
  const [synced, setSynced] = useState(false)

  // Apply ?s= on load, and follow it when it changes from outside, e.g. a preset picked in the navbar.
  const onParams = useCallback((params: URLSearchParams) => {
    const next = new Set((params.get("s") ?? "").split(",").filter((n) => toolByName.has(n)))
    setSelected((prev) => (sameSet(prev, next) ? prev : next))
    setSynced(true)
  }, [])

  useEffect(() => {
    if (synced) replaceQuery({ s: [...selected].join(",") })
  }, [selected, synced])

  const toggle = (name: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })

  const match = useMemo(() => bestMatch(selected), [selected])
  const picked = [...selected].map((n) => toolByName.get(n)!).filter(Boolean)

  const markdown = () =>
    [
      `## ${match && match.score === 1 ? match.preset.name : "My stack"}`,
      "",
      ...picked.map((t) => `- [${t.name}](${t.url}): ${t.kind}`),
      "",
      "_Built with CodeStack_",
    ].join("\n")

  const copyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast(label)
    } catch {
      toast("Couldn’t access the clipboard")
    }
  }

  return (
    <div className="pb-32">
      <SearchParamsListener onChange={onParams} />
      <DragScroller
        label="stack presets"
        controls="header"
        header={
          <>
            <h2 className="text-[22px] font-semibold tracking-[-0.025em]">Start from a preset</h2>
            <p className="mt-1 text-[14px] text-muted-foreground">Proven combinations. Drag or scroll to see them all.</p>
          </>
        }
        trackClassName="gap-3 py-3"
      >
        {stackPresets.map((preset) => {
          const active = match?.score === 1 && match.preset.name === preset.name
          return (
            <button
              key={preset.name}
              onClick={() => setSelected(new Set(preset.tools))}
              aria-pressed={active}
              className={cn(
                "card-surface card-lift flex w-[260px] shrink-0 snap-start flex-col p-5 text-left",
                active && "ring-2 ring-primary",
              )}
            >
              <span className="flex -space-x-1.5">
                {preset.tools.slice(0, 5).map((n) => (
                  <span key={n} className="grid size-8 place-items-center rounded-full bg-surface-2 ring-2 ring-card">
                    <BrandIcon slug={toolByName.get(n)?.icon} name={n} className="size-4" />
                  </span>
                ))}
              </span>
              <span className="mt-4 text-[16px] font-semibold tracking-[-0.02em]">{preset.name}</span>
              <span className="mt-1 line-clamp-2 text-[13px] leading-snug text-muted-foreground">{preset.description}</span>
              <span className="mt-3 text-[12px] text-muted-foreground">{preset.tools.length} tools</span>
            </button>
          )
        })}
      </DragScroller>

      <div className="shell">
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-14">
            {stackCategories.map((id) => {
              const category = categoryById[id]
              const items = tools.filter((t) => t.category === id)
              return (
                <section key={id}>
                  <div className="mb-5 flex items-baseline justify-between">
                    <h2 className="text-[22px] font-semibold tracking-[-0.025em]">{category.name}</h2>
                    <span className="text-[13px] text-muted-foreground">{items.filter((t) => selected.has(t.name)).length} selected</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                    {items.map((tool) => (
                      <PickTile key={tool.name} tool={tool} active={selected.has(tool.name)} onClick={() => toggle(tool.name)} />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>

          <aside id="summary" className="lg:sticky lg:top-24 lg:self-start">
            <div className="card-surface overflow-hidden">
              <div className="relative overflow-hidden bg-[#0b0b0d] p-6 text-white dark:bg-surface-2">
                <div
                  aria-hidden
                  className="absolute -right-16 -top-16 size-48 rounded-full bg-[conic-gradient(from_90deg,#0a84ff,#bf5af2,#ff375f,#0a84ff)] opacity-50 blur-3xl"
                />
                <p className="relative text-eyebrow text-white/50">Your stack</p>
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={match?.score === 1 ? match.preset.name : picked.length ? "custom" : "empty"}
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                    transition={{ duration: 0.35, ease }}
                    className="relative mt-2 text-[28px] font-semibold tracking-[-0.03em]"
                  >
                    {match?.score === 1 ? match.preset.name : picked.length ? "Custom stack" : "Start picking"}
                  </motion.h3>
                </AnimatePresence>
                <p className="relative mt-1 min-h-[20px] text-[13px] text-white/60">
                  {match && match.score < 1 ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Sparkles className="size-3.5" />
                      {Math.round(match.score * 100)}% similar to {match.preset.name}
                    </span>
                  ) : match ? (
                    match.preset.description
                  ) : (
                    "Choose tools on the left, or start from a preset."
                  )}
                </p>
              </div>

              <div className="p-3">
                {picked.length === 0 ? (
                  <p className="px-3 py-10 text-center text-[14px] text-muted-foreground">Nothing selected yet.</p>
                ) : (
                  <ul className="max-h-[42vh] overflow-y-auto overflow-x-hidden overscroll-contain">
                    <AnimatePresence initial={false}>
                      {picked.map((t) => (
                        <motion.li
                          key={t.name}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            type: "spring",
                            bounce: 0,
                            duration: 0.4,
                          }}
                          className="overflow-hidden"
                        >
                          <button
                            onClick={() => toggle(t.name)}
                            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-surface-2"
                          >
                            <span className="grid size-8 place-items-center rounded-lg bg-surface-2 group-hover:bg-background">
                              <BrandIcon slug={t.icon} name={t.name} className="size-4" />
                            </span>
                            <span className="flex-1">
                              <span className="block text-[14px] font-medium leading-tight">{t.name}</span>
                              <span className="text-[12px] text-muted-foreground">{categoryById[t.category].name}</span>
                            </span>
                            <span className="text-[12px] text-muted-foreground opacity-0 group-hover:opacity-100">Remove</span>
                          </button>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 border-t border-black/[0.05] p-3 dark:border-white/[0.06]">
                <SummaryAction
                  icon={ClipboardCopy}
                  label="Markdown"
                  disabled={!picked.length}
                  onClick={() => copyText(markdown(), "Stack copied as Markdown")}
                />
                <SummaryAction
                  icon={Link2}
                  label="Share"
                  disabled={!picked.length}
                  onClick={() => copyText(window.location.href, "Share link copied")}
                />
                <SummaryAction icon={RotateCcw} label="Reset" disabled={!picked.length} onClick={() => setSelected(new Set())} />
              </div>
            </div>
          </aside>
        </div>

        <AnimatePresence>
          {picked.length > 0 && (
            <motion.a
              href="#summary"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              className="fixed inset-x-0 bottom-5 z-40 mx-auto flex w-fit items-center gap-3 rounded-full bg-foreground py-2 pl-2 pr-5 text-[14px] font-medium text-background shadow-2xl lg:hidden"
            >
              <span className="flex -space-x-2">
                {picked.slice(0, 4).map((t) => (
                  <span
                    key={t.name}
                    className="grid size-8 place-items-center rounded-full bg-background text-foreground ring-2 ring-foreground"
                  >
                    <BrandIcon slug={t.icon} name={t.name} className="size-4" />
                  </span>
                ))}
              </span>
              View stack · {picked.length}
            </motion.a>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function sameSet(a: Set<string>, b: Set<string>) {
  return a.size === b.size && [...a].every((x) => b.has(x))
}

function PickTile({ tool, active, onClick }: { tool: Tool; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "pressable relative flex items-center gap-3 rounded-2xl p-3 text-left ring-1 ring-inset transition-[background-color,box-shadow] duration-300",
        active ? "bg-primary/[0.08] ring-2 ring-primary" : "bg-card ring-black/[0.06] hover:bg-surface dark:ring-white/[0.07]",
      )}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-2/80">
        <BrandIcon slug={tool.icon} name={tool.name} className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[14px] font-medium tracking-[-0.01em]">{tool.name}</span>
        <span className="block truncate text-[12px] text-muted-foreground">{tool.kind}</span>
      </span>
      <AnimatePresence>
        {active && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", bounce: 0.45, duration: 0.4 }}
            className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-primary text-primary-foreground shadow"
          >
            <Check className="size-3" strokeWidth={3} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

function SummaryAction({
  icon: Icon,
  label,
  onClick,
  disabled,
}: {
  icon: typeof Check
  label: string
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="pressable flex flex-col items-center gap-1 rounded-xl py-2.5 text-[12px] text-muted-foreground hover:bg-surface-2 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
    >
      <Icon className="size-4" />
      {label}
    </button>
  )
}
