"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

const DEFAULT_KEY = "codestack:roadmap:v1"

interface ProgressContext {
  done: Set<string>
  /** False until saved progress has been read, so counts never flash from zero. */
  ready: boolean
  toggle: (id: string) => void
  setMany: (ids: string[], value: boolean) => void
}

const Context = createContext<ProgressContext | null>(null)

export function useProgress() {
  const ctx = useContext(Context)
  if (!ctx) throw new Error("useProgress must be used inside <ProgressProvider>")
  return ctx
}

/** Checklist progress for the roadmap, kept in this browser only. */
export function ProgressProvider({ children, storageKey = DEFAULT_KEY }: { children: ReactNode; storageKey?: string }) {
  const [done, setDone] = useState<Set<string>>(() => new Set())
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? "[]")
      if (Array.isArray(saved)) setDone(new Set(saved.filter((x): x is string => typeof x === "string")))
    } catch {
      // Storage can be blocked (private mode, previews). Progress simply isn't remembered.
    }
    setReady(true)
  }, [storageKey])

  const save = (next: Set<string>) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...next]))
    } catch {}
    return next
  }

  const toggle = useCallback(
    (id: string) => {
      setDone((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return save(next)
      })
    },
    [storageKey],
  )

  const setMany = useCallback(
    (ids: string[], value: boolean) => {
      setDone((prev) => {
        const next = new Set(prev)
        for (const id of ids) {
          if (value) next.add(id)
          else next.delete(id)
        }
        return save(next)
      })
    },
    [storageKey],
  )

  const value = useMemo(() => ({ done, ready, toggle, setMany }), [done, ready, toggle, setMany])
  return <Context.Provider value={value}>{children}</Context.Provider>
}
