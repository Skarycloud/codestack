import { flushSync } from "react-dom"

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> }
}

/**
 * Switches the theme with a circular reveal that grows from `origin` (the toggle) to cover the
 * page, using the View Transitions API. The class is applied directly inside the transition so the
 * new snapshot is always the new theme; next-themes then persists it. Browsers without View
 * Transitions, and people who prefer reduced motion, get an instant switch.
 */
export function switchTheme(next: "light" | "dark", setTheme: (theme: string) => void, origin?: { x: number; y: number }) {
  const apply = () => {
    const root = document.documentElement
    root.classList.toggle("dark", next === "dark")
    root.classList.toggle("light", next === "light")
    root.style.colorScheme = next
    setTheme(next)
  }

  const doc = document as ViewTransitionDocument
  if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return apply()

  const x = origin?.x ?? window.innerWidth / 2
  const y = origin?.y ?? window.innerHeight / 2
  // The circle has to reach the farthest corner of the viewport.
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

  const transition = doc.startViewTransition(() => flushSync(apply))
  transition.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
      )
    })
    .catch(() => {})
}
