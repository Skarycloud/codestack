"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useRef } from "react"

/**
 * Reports the URL's search params to `onChange` on load and whenever they change, e.g. when a
 * navbar link swaps `?c=`. Reading params with `useSearchParams` directly would opt the whole
 * page out of static rendering, leaving a blank area until JavaScript loads. Isolating it here
 * keeps every directory fully server-rendered: the page ships its default view as HTML and
 * applies any URL filters right after hydration.
 */
export function SearchParamsListener({ onChange }: { onChange: (params: URLSearchParams) => void }) {
  return (
    <Suspense fallback={null}>
      <Listener onChange={onChange} />
    </Suspense>
  )
}

function Listener({ onChange }: { onChange: (params: URLSearchParams) => void }) {
  const key = useSearchParams().toString()
  const latest = useRef(onChange)
  latest.current = onChange
  useEffect(() => latest.current(new URLSearchParams(key)), [key])
  return null
}

/**
 * Updates the query string without a navigation or server round trip. Next.js keeps
 * `useSearchParams` in sync with `history.replaceState`, so listeners still fire.
 */
export function replaceQuery(query: Record<string, string | null | undefined>) {
  const params = new URLSearchParams()
  for (const [k, v] of Object.entries(query)) if (v) params.set(k, v)
  // Commas are valid in a query string, so keep shared lists like ?s=Next.js,Supabase readable.
  const qs = params.toString().replace(/%2C/gi, ",")
  const { pathname, search, hash } = window.location
  const next = `${pathname}${qs ? `?${qs}` : ""}${hash}`
  if (next !== `${pathname}${search}${hash}`) window.history.replaceState(window.history.state, "", next)
}
