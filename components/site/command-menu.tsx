"use client"

import dynamic from "next/dynamic"
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

const loadDialog = () => import("@/components/site/command-dialog")
const CommandDialog = dynamic(loadDialog, { ssr: false })

const CommandMenuContext = createContext<{ open: () => void; prefetch: () => void } | null>(null)

export function useCommandMenu() {
  const ctx = useContext(CommandMenuContext)
  if (!ctx) throw new Error("useCommandMenu must be used inside <CommandMenuProvider>")
  return ctx
}

export function CommandMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  // Mount the dialog only after the first open, then keep it for instant reopening.
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey) && !e.altKey) || (e.key === "/" && !isTyping(e.target))) {
        e.preventDefault()
        setMounted(true)
        setIsOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const value = useMemo(
    () => ({
      open: () => {
        setMounted(true)
        setIsOpen(true)
      },
      prefetch: () => void loadDialog(),
    }),
    [],
  )

  return (
    <CommandMenuContext.Provider value={value}>
      {children}
      {mounted && <CommandDialog open={isOpen} onOpenChange={setIsOpen} />}
    </CommandMenuContext.Provider>
  )
}

function isTyping(target: EventTarget | null) {
  const el = target as HTMLElement | null
  return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)
}
