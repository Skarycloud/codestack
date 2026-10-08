"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * A single row of filter chips that may be wider than the screen. Overflow is shown with soft
 * edge fades and arrow buttons, a mouse can drag the row (without the drag ever selecting a chip),
 * touch and trackpads scroll natively, and the active chip (marked `data-active`) is kept in view.
 * The vertical wheel is deliberately left alone so the page still scrolls under the cursor.
 */
export function ChipScroller({
  children,
  activeKey,
  label,
  className,
}: {
  children: ReactNode
  activeKey?: string
  label: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef({ down: false, moved: false, startX: 0, startLeft: 0 })
  const [edges, setEdges] = useState({ start: false, end: false })

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    setEdges({ start: el.scrollLeft > 2, end: el.scrollLeft + el.clientWidth < el.scrollWidth - 2 })
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    for (const child of el.children) ro.observe(child)
    return () => ro.disconnect()
  }, [update, children])

  // Bring the selected chip into view, e.g. after a deep link or a navbar pick.
  useLayoutEffect(() => {
    const el = ref.current
    const chip = el?.querySelector<HTMLElement>("[data-active=true]")
    if (!el || !chip) return
    const left = chip.offsetLeft - (el.clientWidth - chip.offsetWidth) / 2
    if (chip.offsetLeft < el.scrollLeft || chip.offsetLeft + chip.offsetWidth > el.scrollLeft + el.clientWidth) {
      el.scrollTo({ left, behavior: "smooth" })
    }
  }, [activeKey])

  const page = (dir: 1 | -1) => {
    const el = ref.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" })
  }

  return (
    <div className={cn("relative", className)}>
      <div
        ref={ref}
        role="group"
        aria-label={label}
        onScroll={update}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || e.button !== 0) return
          drag.current = { down: true, moved: false, startX: e.clientX, startLeft: ref.current!.scrollLeft }
        }}
        onPointerMove={(e) => {
          const d = drag.current
          if (!d.down) return
          const dx = e.clientX - d.startX
          if (!d.moved && Math.abs(dx) < 5) return
          if (!d.moved) ref.current!.setPointerCapture(e.pointerId)
          d.moved = true
          ref.current!.scrollLeft = d.startLeft - dx
        }}
        onPointerUp={() => (drag.current.down = false)}
        onPointerCancel={() => (drag.current.down = false)}
        onClickCapture={(e) => {
          // A drag that ends over a chip is not a click on it.
          if (drag.current.moved) {
            e.preventDefault()
            e.stopPropagation()
            drag.current.moved = false
          }
        }}
        style={{
          maskImage: `linear-gradient(90deg, ${edges.start ? "transparent, #000 48px" : "#000"}, ${edges.end ? "#000 calc(100% - 48px), transparent" : "#000"})`,
        }}
        className="no-scrollbar relative -mx-1 flex select-none gap-1 overflow-x-auto overscroll-x-contain px-1 pb-3"
      >
        {children}
      </div>
      {(["start", "end"] as const).map((side) => (
        <button
          key={side}
          type="button"
          tabIndex={-1}
          aria-hidden
          onClick={() => page(side === "start" ? -1 : 1)}
          className={cn(
            "pressable absolute top-0 grid size-8 place-items-center rounded-full bg-background/90 text-muted-foreground shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_14px_-4px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.06] backdrop-blur transition-opacity duration-200 hover:text-foreground dark:ring-white/10",
            side === "start" ? "-left-2" : "-right-2",
            edges[side] ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          {side === "start" ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
        </button>
      ))}
    </div>
  )
}
