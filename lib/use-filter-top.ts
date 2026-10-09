"use client"

import { useCallback, useRef } from "react"

/** The navbar height that the sticky filter bars sit under (`top-14`). */
const NAV_HEIGHT = 56

/**
 * Put `ref` on an empty element right above a sticky filter bar, then call `reset` when a
 * filter tab changes. If the page has scrolled past the bar's resting place, it jumps back
 * so the new results start right under the bar instead of somewhere mid-list.
 */
export function useFilterTop() {
  const ref = useRef<HTMLDivElement>(null)
  const reset = useCallback(() => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT
    if (window.scrollY > top + 1) window.scrollTo({ top, behavior: "auto" })
  }, [])
  return { ref, reset }
}
