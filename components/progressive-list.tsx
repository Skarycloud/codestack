"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

/**
 * Renders a long list in steps: the first `step` items ship in the static HTML and hydrate fast,
 * and the rest render as the reader scrolls toward them. Changing `resetKey` (a search query or
 * filter) starts again from the first step.
 */
export function useProgressiveList<T>(items: T[], step: number, resetKey: unknown) {
  const [limit, setLimit] = useState(step)
  useEffect(() => setLimit(step), [resetKey, step])
  return {
    visible: items.length > limit ? items.slice(0, limit) : items,
    hasMore: items.length > limit,
    loadMore: () => setLimit((l) => l + step),
  }
}

/**
 * Placeholder rows at the end of a progressive list. When they come within `margin` of the
 * viewport they ask for the next step, so in practice real items replace them before they are
 * ever seen; on a slow device the skeletons hold the space and nothing jumps.
 */
export function LoadMoreSentinel({
  onLoadMore,
  count,
  margin = "800px 0px",
  className,
  children,
}: {
  onLoadMore: () => void
  /** How many items are rendered. The observer restarts when it changes, so a sentinel that is
   *  still in range after a step keeps loading until the list catches up with the reader. */
  count: number
  margin?: string
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const latest = useRef(onLoadMore)
  latest.current = onLoadMore

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && latest.current(), {
      rootMargin: margin,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [count, margin])

  return (
    <div ref={ref} aria-hidden className={className}>
      {children}
    </div>
  )
}
