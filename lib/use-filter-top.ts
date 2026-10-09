"use client"

import { useCallback, useRef } from "react"

/** The navbar height that the sticky filter bars sit under (`top-14`). */
const NAV_HEIGHT = 56

/**
 * Put `ref` on an empty element right above a sticky filter bar, then call `reset` when a
 * filter tab changes. If the page has scrolled past the bar's resting place, it glides back
 * so the new results start right under the bar instead of somewhere mid-list.
 */
export function useFilterTop() {
  const ref = useRef<HTMLDivElement>(null)
  const reset = useCallback(() => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT
    if (window.scrollY <= top + 1) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top, behavior: "auto" })
      return
    }
    // From far down, skip most of the way first: a long glide drags through stale results,
    // and the list shrinking mid-scroll would cut the animation short with a jump.
    const glide = window.innerHeight * 0.6
    if (window.scrollY - top > glide) window.scrollTo({ top: top + glide, behavior: "auto" })
    window.scrollTo({ top, behavior: "smooth" })
  }, [])
  return { ref, reset }
}
