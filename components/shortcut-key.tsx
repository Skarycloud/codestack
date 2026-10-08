"use client"

import { useSyncExternalStore } from "react"

const subscribe = () => () => {}
const isApple = () => /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent)

/** The search shortcut modifier for this device: ⌘ on Apple, Ctrl everywhere else. */
export function useModKey() {
  return useSyncExternalStore(
    subscribe,
    () => (isApple() ? "⌘" : "Ctrl"),
    () => "⌘",
  )
}

/** Renders the search shortcut as "⌘K" on Apple devices and "Ctrl K" on Windows and Linux. */
export function ShortcutKey() {
  const mod = useModKey()
  return <>{mod === "⌘" ? "⌘K" : "Ctrl K"}</>
}
