"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Search, X } from "lucide-react"
import type { ReactNode } from "react"
import { ChipScroller } from "@/components/chip-scroller"
import { ease } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

/*
 * The directory layout shared by Explore, Learn and Skills: a top sheet (the page header) with
 * rounded bottom corners, a sticky toolbar in the band between, and a results sheet with rounded
 * top corners. The band is the surface color; both sheets are the page background, so their
 * corners read as the toolbar tucking in between them.
 */

/** Wraps the top sheet, toolbar and results sheet so the band color shows around the corners. */
export function SheetBand({ children }: { children: ReactNode }) {
  return <div className="bg-surface">{children}</div>
}

export function TopSheet({ children }: { children: ReactNode }) {
  return <div className="relative rounded-b-[28px] bg-background sm:rounded-b-[40px]">{children}</div>
}

export function ResultsSheet({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-t-[28px] bg-background sm:rounded-t-[40px]", className)}>{children}</div>
}

/**
 * The sticky toolbar: search on the left, view controls and the Filter button on the right, tabs
 * underneath and, when a tab has them, its sections in a quiet row below.
 */
export function DirectoryToolbar({
  search,
  controls,
  tabs,
  sections,
}: {
  search: { value: string; onChange: (v: string) => void; placeholder: string; label: string }
  /** View controls and the Filter button, right-aligned. */
  controls: ReactNode
  /** Optional: pages without categories, such as Icons, leave it out. */
  tabs?: ReactNode
  /** The current tab's sections, with a key so switching tabs cross-fades them. */
  sections?: { key: string; node: ReactNode } | null
}) {
  return (
    <div className="sticky top-14 z-30 bg-surface/85 backdrop-blur-xl backdrop-saturate-150">
      <div className="shell flex flex-wrap items-center gap-3 pb-1 pt-4">
        <label className="relative flex h-9 min-w-[200px] flex-1 items-center sm:max-w-[300px]">
          <Search className="pointer-events-none absolute left-3 size-[15px] text-muted-foreground" />
          <input
            value={search.value}
            onChange={(e) => search.onChange(e.target.value)}
            placeholder={search.placeholder}
            aria-label={search.label}
            className="h-full w-full rounded-full bg-background/70 pl-9 pr-9 text-[13.5px] outline-none ring-1 ring-inset ring-black/[0.06] transition-[box-shadow,background-color] duration-200 placeholder:text-muted-foreground hover:bg-background focus:bg-background focus:ring-foreground/20 dark:ring-white/[0.08]"
          />
          {search.value && (
            <button
              onClick={() => search.onChange("")}
              aria-label="Clear search"
              className="absolute right-2.5 grid size-5 place-items-center rounded-full bg-foreground/20 text-background"
            >
              <X className="size-3" />
            </button>
          )}
        </label>
        <div className="ml-auto flex items-center gap-3">{controls}</div>
      </div>

      {tabs ? <div className="shell">{tabs}</div> : <div className="h-1" aria-hidden />}

      <AnimatePresence initial={false}>
        {sections && (
          <motion.div
            key="sections"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease }}
            className="overflow-hidden border-t border-black/[0.05] dark:border-white/[0.06]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={sections.key}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.18, ease }}
                className="shell py-2"
              >
                {sections.node}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-3" aria-hidden />
    </div>
  )
}

export interface TabItem<T extends string> {
  id: T
  label: string
  /** Full name, shown as a tooltip when the label is shortened. */
  title?: string
}

/** Text tabs with a sliding underline. */
export function DirectoryTabs<T extends string>({
  label,
  items,
  active,
  onSelect,
  layoutId,
}: {
  label: string
  items: TabItem<T>[]
  active: T
  onSelect: (id: T) => void
  layoutId: string
}) {
  return (
    <ChipScroller label={label} activeKey={active} variant="tabs">
      {items.map((t) => {
        const on = active === t.id
        return (
          <button
            key={t.id}
            data-active={on}
            onClick={() => onSelect(t.id)}
            title={t.title && t.title !== t.label ? t.title : undefined}
            aria-current={on ? "true" : undefined}
            className={cn(
              "relative h-11 shrink-0 whitespace-nowrap px-3 text-[13.5px] font-medium tracking-[-0.005em] transition-colors duration-200 first:pl-0",
              on ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
            {on && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-foreground [button:first-child>&]:left-0"
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              />
            )}
          </button>
        )
      })}
    </ChipScroller>
  )
}

/** A quiet row of sections with a sliding highlight and counts. */
export function DirectorySections<T extends string>({
  label,
  items,
  active,
  onSelect,
  layoutId,
  onSheet = false,
}: {
  label: string
  items: { id: T; label: string; count?: number }[]
  /** On a sheet (the page background) rather than the toolbar band, the highlight needs a tint to show. */
  onSheet?: boolean
  active: T
  onSelect: (id: T) => void
  layoutId: string
}) {
  return (
    <ChipScroller label={label} activeKey={active} variant="tabs" className="-ml-3">
      {items.map((s) => {
        const on = active === s.id
        return (
          <button
            key={s.id}
            data-active={on}
            onClick={() => onSelect(s.id)}
            aria-pressed={on}
            className={cn(
              "relative inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-[13px] transition-colors duration-200",
              on ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {on && (
              <motion.span
                layoutId={layoutId}
                className={cn(
                  "absolute inset-0 rounded-full",
                  onSheet
                    ? "bg-foreground/[0.06] dark:bg-white/[0.09]"
                    : "bg-background shadow-[0_1px_2px_rgba(0,0,0,0.06)] dark:bg-white/[0.09] dark:shadow-none",
                )}
                transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              />
            )}
            <span className="relative">{s.label}</span>
            {s.count !== undefined && <span className="relative text-[11.5px] tabular-nums text-muted-foreground/70">{s.count}</span>}
          </button>
        )
      })}
    </ChipScroller>
  )
}

/** The line above the results: a count, active filter chips and nothing else. */
export function ResultsHeader({ children }: { children: ReactNode }) {
  return <div className="mb-8 flex min-h-9 flex-wrap items-center gap-x-3 gap-y-2 text-[14px] text-muted-foreground">{children}</div>
}

/**
 * A section heading in a directory list: a hairline, a quiet two-digit index, the title and its
 * one-line description, with a count or an action on the right. Typography does the work, so
 * sections read as chapters rather than as icons in boxes.
 */
export function SectionHeading({ index, title, blurb, meta }: { index: number; title: ReactNode; blurb?: ReactNode; meta?: ReactNode }) {
  return (
    <div className="mb-8 border-t border-border pt-6">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="min-w-0">
          <p className="font-mono text-[12px] tabular-nums tracking-[0.04em] text-muted-foreground">{String(index).padStart(2, "0")}</p>
          <h2 className="text-title mt-3">{title}</h2>
          {blurb && <p className="mt-2 max-w-2xl text-pretty text-muted-foreground">{blurb}</p>}
        </div>
        {meta && <div className="shrink-0 text-[13px] tabular-nums text-muted-foreground">{meta}</div>}
      </div>
    </div>
  )
}
