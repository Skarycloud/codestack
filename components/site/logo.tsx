"use client"

import Link from "next/link"
import { useId } from "react"
import { cn } from "@/lib/utils"

/**
 * The Stacked Slash: three bars stacked like a staircase, reading as both a
 * stack of layers and the "/" of code. Each bar carries part of the site's
 * spectrum. Hovering the parent `.group` snaps the bars into a neat stack.
 */
export function LogoMark({ className, animated = true }: { className?: string; animated?: boolean }) {
  const id = useId().replace(/:/g, "")
  const bar = cn(animated && "transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]")

  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-7 shrink-0", className)}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a2e" />
          <stop offset="1" stopColor="#0b0b0d" />
        </linearGradient>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.55" r="0.5">
          <stop offset="0" stopColor="#5e5ce6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#5e5ce6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff375f" />
          <stop offset="1" stopColor="#ff9f0a" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5e5ce6" />
          <stop offset="1" stopColor="#bf5af2" />
        </linearGradient>
        <linearGradient id={`${id}-c`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0a84ff" />
          <stop offset="1" stopColor="#64d2ff" />
        </linearGradient>
      </defs>

      {/* App‑icon squircle */}
      <rect width="32" height="32" rx="9" fill={`url(#${id}-bg)`} />
      <rect width="32" height="32" rx="9" fill={`url(#${id}-glow)`} />
      <rect x="0.5" y="0.5" width="31" height="31" rx="8.5" fill="none" stroke={`url(#${id}-shine)`} />

      {/* The Stacked Slash */}
      <rect x="12.5" y="7" width="13" height="5" rx="2.5" fill={`url(#${id}-a)`} className={cn(bar, animated && "group-hover:-translate-x-[3px]")} />
      <rect x="9.5" y="13.5" width="13" height="5" rx="2.5" fill={`url(#${id}-b)`} className={bar} />
      <rect x="6.5" y="20" width="13" height="5" rx="2.5" fill={`url(#${id}-c)`} className={cn(bar, animated && "group-hover:translate-x-[3px]")} />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="CodeStack home" className={cn("pressable group flex items-center gap-2.5", className)}>
      <LogoMark className="size-[30px] drop-shadow-[0_4px_10px_rgba(94,92,230,0.35)] transition-transform duration-500 ease-apple group-hover:scale-105" />
      <Wordmark />
    </Link>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("text-[16px] font-semibold tracking-[-0.03em]", className)}>
      Code<span className="text-foreground/55">Stack</span>
    </span>
  )
}
