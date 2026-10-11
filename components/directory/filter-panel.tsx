"use client"

import { AnimatePresence, motion } from "framer-motion"
import { SlidersHorizontal, X } from "lucide-react"
import { useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

export interface FilterOption {
  id: string
  label: string
  count: number
}

export interface FilterGroup {
  id: string
  title: string
  options: FilterOption[]
}

/** Selected option ids per group. Options are OR'd within a group and AND'd across groups. */
export type FilterValue = Record<string, string[]>

export const activeCount = (value: FilterValue) => Object.values(value).reduce((n, ids) => n + ids.length, 0)

const PREVIEW = 14

/** The active filters as removable chips, shown beside the result count. */
export function ActiveFilterChips({
  groups,
  value,
  onChange,
}: {
  groups: FilterGroup[]
  value: FilterValue
  onChange: (v: FilterValue) => void
}) {
  const chips = groups.flatMap((g) =>
    (value[g.id] ?? []).map((id) => ({
      key: `${g.id}-${id}`,
      label: g.options.find((o) => o.id === id)?.label ?? id,
      remove: () => onChange({ ...value, [g.id]: value[g.id].filter((x) => x !== id) }),
    })),
  )
  if (!chips.length) return null
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {chips.map((c) => (
        <button
          key={c.key}
          onClick={c.remove}
          aria-label={`Remove filter: ${c.label}`}
          className="pressable inline-flex h-7 items-center gap-1 rounded-full bg-foreground/[0.06] pl-3 pr-2 text-[12.5px] text-foreground hover:bg-foreground/[0.1] dark:bg-white/[0.08]"
        >
          {c.label}
          <X className="size-3 text-muted-foreground" />
        </button>
      ))}
      {chips.length > 1 && (
        <button onClick={() => onChange({})} className="ml-1 text-[12.5px] text-link hover:underline">
          Clear all
        </button>
      )}
    </div>
  )
}

/**
 * The Filter button and its panel: groups of tap-able pills with counts. A popover on wider screens
 * and a bottom sheet on phones. Esc, the backdrop or a click outside closes it, and focus returns to
 * the button. The panel is portalled to the body and pinned under the button, so it stays put while
 * the page scrolls (the button lives in the sticky toolbar) and is never trapped by the toolbar's blur.
 */
export function FilterButton({
  groups,
  value,
  onChange,
  resultCount,
  noun,
}: {
  groups: FilterGroup[]
  value: FilterValue
  onChange: (v: FilterValue) => void
  /** How many results the current selection shows, for the "Show N" button. */
  resultCount: number
  noun: [singular: string, plural: string]
}) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const panelId = useId()
  // Desktop placement under the button; null on phones, where the panel is a bottom sheet.
  const [pos, setPos] = useState<{ top: number; right: number; maxHeight: number } | null>(null)
  // The panel is portalled, so it only renders after hydration.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const place = () => {
    const r = trigger.current?.getBoundingClientRect()
    if (!r || !window.matchMedia("(min-width: 640px)").matches) return setPos(null)
    setPos({ top: r.bottom + 8, right: window.innerWidth - r.right, maxHeight: Math.min(560, window.innerHeight - r.bottom - 24) })
  }

  const active = activeCount(value)
  const shown = groups.filter((g) => g.options.length > 1)
  const toggle = (group: string, id: string) => {
    const list = value[group] ?? []
    onChange({ ...value, [group]: list.includes(id) ? list.filter((x) => x !== id) : [...list, id] })
  }
  const close = () => {
    setOpen(false)
    trigger.current?.focus()
  }

  // Keep the panel pinned under the button through resizes and scrolling.
  useEffect(() => {
    if (!open) return
    window.addEventListener("resize", place)
    window.addEventListener("scroll", place, { passive: true })
    return () => {
      window.removeEventListener("resize", place)
      window.removeEventListener("scroll", place)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    requestAnimationFrame(() => panel.current?.querySelector<HTMLButtonElement>("[data-pill]")?.focus({ preventScroll: true }))
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node
      if (!root.current?.contains(t) && !panel.current?.contains(t)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      setOpen(false)
      trigger.current?.focus()
    }
    document.addEventListener("pointerdown", onPointer)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onPointer)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div ref={root} className="relative shrink-0">
      <button
        ref={trigger}
        onClick={() => {
          if (!open) place()
          setOpen((o) => !o)
        }}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          "pressable inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-[13.5px] font-medium ring-1 ring-inset transition-colors",
          active
            ? "bg-foreground text-background ring-transparent"
            : cn(
                "bg-background/60 ring-black/[0.1] hover:text-foreground dark:ring-white/[0.12]",
                open ? "text-foreground" : "text-muted-foreground",
              ),
        )}
      >
        <SlidersHorizontal className="size-4" />
        Filter
        {active > 0 && (
          <span className="grid min-w-5 place-items-center rounded-full bg-background/20 px-1.5 text-[12px] tabular-nums">{active}</span>
        )}
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 bg-black/30 sm:hidden"
                  onClick={close}
                />
                <motion.div
                  ref={panel}
                  id={panelId}
                  role="dialog"
                  aria-label={`Filter ${noun[1]}`}
                  style={pos ?? undefined}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12, transition: { duration: 0.15 } }}
                  transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                  className="fixed inset-x-0 bottom-0 z-50 flex max-h-[80dvh] flex-col overflow-hidden rounded-t-3xl bg-popover pb-[env(safe-area-inset-bottom)] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.3)] ring-1 ring-black/[0.08] sm:inset-x-auto sm:bottom-auto sm:w-[380px] sm:rounded-2xl sm:pb-0 sm:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] dark:ring-white/[0.1]"
                >
                  <div className="mx-auto mt-2.5 h-1 w-9 rounded-full bg-foreground/15 sm:hidden" aria-hidden />
                  <div className="flex items-center justify-between px-5 pb-2 pt-3 sm:pt-4">
                    <p className="text-[15px] font-semibold">Filter</p>
                    <button
                      onClick={() => onChange({})}
                      disabled={!active}
                      className="text-[13px] text-link hover:underline disabled:pointer-events-none disabled:opacity-0"
                    >
                      Reset
                    </button>
                  </div>

                  <div className="flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 pb-5 pt-1">
                    {shown.map((g) => {
                      const selected = value[g.id] ?? []
                      const all = expanded[g.id]
                      // Selected options always stay visible, even when the group is collapsed.
                      const options = all ? g.options : g.options.filter((o, i) => i < PREVIEW || selected.includes(o.id))
                      return (
                        <div key={g.id} role="group" aria-label={g.title}>
                          <p className="mb-2.5 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">{g.title}</p>
                          <div className="flex flex-wrap gap-2">
                            {options.map((o) => (
                              <Pill
                                key={o.id}
                                label={o.label}
                                count={o.count}
                                on={selected.includes(o.id)}
                                onClick={() => toggle(g.id, o.id)}
                              />
                            ))}
                            {g.options.length > PREVIEW && (
                              <button
                                onClick={() => setExpanded((e) => ({ ...e, [g.id]: !all }))}
                                className="h-8 px-2 text-[13px] text-link hover:underline"
                              >
                                {all ? "Show fewer" : `Show all ${g.options.length}`}
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="border-t border-border p-4">
                    <button
                      onClick={close}
                      className="pressable h-11 w-full rounded-full bg-primary text-[14.5px] font-medium text-primary-foreground hover:bg-primary-hover"
                    >
                      Show {resultCount.toLocaleString("en-US")} {resultCount === 1 ? noun[0] : noun[1]}
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  )
}

function Pill({ label, count, on, onClick }: { label: string; count: number; on: boolean; onClick: () => void }) {
  return (
    <button
      data-pill
      onClick={onClick}
      aria-pressed={on}
      className={cn(
        "pressable inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[13px] transition-colors",
        on
          ? "bg-foreground text-background"
          : "bg-foreground/[0.05] text-foreground hover:bg-foreground/[0.09] dark:bg-white/[0.07] dark:hover:bg-white/[0.12]",
      )}
    >
      {label}
      <span className={cn("text-[11.5px] tabular-nums", on ? "text-background/70" : "text-muted-foreground")}>{count}</span>
    </button>
  )
}
