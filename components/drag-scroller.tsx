"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface DragScrollerProps {
  children: ReactNode
  label: string
  className?: string
  /** Classes for the scrolling track (gap, padding‑bottom…). */
  trackClassName?: string
  /** Where the prev/next buttons sit. */
  controls?: "below" | "header" | "none"
  header?: ReactNode
}

// Apple's momentum projection: how far a flick at `velocity` (px/ms) would coast.
const project = (velocity: number, rate = 0.995) => (velocity * rate) / (1 - rate)

/**
 * A full‑bleed horizontal scroller. Touch and trackpads scroll natively;
 * mice can grab and fling it. Snaps to items, fades the edge that has more
 * content, and never lets a drag turn into an accidental click.
 */
export function DragScroller({ children, label, className, trackClassName, controls = "below", header }: DragScrollerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, moved: false, startX: 0, startLeft: 0, lastX: 0, lastT: 0, v: 0 })
  const [edges, setEdges] = useState({ start: true, end: true })
  const [dragging, setDragging] = useState(false)

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 4 })
  }, [])

  useEffect(() => {
    update()
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [update])

  const step = (dir: 1 | -1) => {
    const el = ref.current
    if (!el) return
    const item = el.firstElementChild as HTMLElement | null
    const gap = parseFloat(getComputedStyle(el).columnGap) || 16
    el.scrollBy({
      left: dir * ((item?.offsetWidth ?? 300) + gap) * Math.max(1, Math.floor(el.clientWidth / ((item?.offsetWidth ?? 300) + gap)) - 1),
      behavior: "smooth",
    })
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return
    const el = ref.current!
    drag.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      lastX: e.clientX,
      lastT: performance.now(),
      v: 0,
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d.active) return
    const el = ref.current!
    const dx = e.clientX - d.startX
    if (!d.moved) {
      if (Math.abs(dx) < 6) return
      d.moved = true
      setDragging(true)
      el.setPointerCapture(e.pointerId)
    }
    const now = performance.now()
    const dt = Math.max(1, now - d.lastT)
    d.v = 0.8 * ((e.clientX - d.lastX) / dt) + 0.2 * d.v
    d.lastX = e.clientX
    d.lastT = now
    el.scrollLeft = d.startLeft - dx
  }

  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d.active) return
    d.active = false
    if (!d.moved) return
    const el = ref.current!
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
    setDragging(false)
    // Re‑enable snapping, then glide toward where the flick was heading.
    requestAnimationFrame(() => el.scrollTo({ left: el.scrollLeft - project(d.v), behavior: "smooth" }))
  }

  const buttons = (
    <div className="flex gap-2">
      {([-1, 1] as const).map((dir) => (
        <button
          key={dir}
          type="button"
          onClick={() => step(dir)}
          disabled={dir === -1 ? edges.start : edges.end}
          aria-label={dir === -1 ? `Previous ${label}` : `Next ${label}`}
          className="pressable grid size-9 place-items-center rounded-full bg-surface-2 text-foreground transition-opacity hover:bg-foreground/10 disabled:pointer-events-none disabled:opacity-30"
        >
          {dir === -1 ? <ChevronLeft className="size-[18px]" /> : <ChevronRight className="size-[18px]" />}
        </button>
      ))}
    </div>
  )

  const fade = `linear-gradient(90deg, ${edges.start ? "#000" : "transparent"} 0, #000 var(--fade-start), #000 calc(100% - var(--fade-end)), ${edges.end ? "#000" : "transparent"} 100%)`

  return (
    <div className={className}>
      {(header || controls === "header") && (
        <div className="shell mb-6 flex items-end justify-between gap-6">
          <div>{header}</div>
          {controls === "header" && <div className="hidden sm:block">{buttons}</div>}
        </div>
      )}
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault()
            e.stopPropagation()
            drag.current.moved = false
          }
        }}
        onDragStart={(e) => e.preventDefault()}
        style={{ maskImage: fade, WebkitMaskImage: fade }}
        className={cn(
          "bleed-scroller no-scrollbar flex overflow-x-auto overscroll-x-contain outline-none [--fade-end:48px] [--fade-start:48px]",
          dragging ? "cursor-grabbing select-none [&_*]:pointer-events-none" : "cursor-grab snap-x snap-mandatory scroll-smooth",
          trackClassName,
        )}
      >
        {children}
      </div>
      {controls === "below" && <div className="shell mt-4 flex justify-end">{buttons}</div>}
    </div>
  )
}
