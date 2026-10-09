"use client"

import { Honk } from "next/font/google"
import Link from "next/link"
import { cn } from "@/lib/utils"

// The wordmark's face: Honk, a color font with its own built-in 3D lettering (SIL Open Font License).
const honk = Honk({ subsets: ["latin"], axes: ["MORF"], display: "swap" })

/**
 * The Stacked Slash, neobrutalist edition: three ink bars stepping like a staircase, read as
 * both a stack of layers and the "/" of code, on a yellow paper tile with an ink border and a
 * hard offset shadow. Hovering the parent `.group` snaps the bars into a neat stack.
 */
export function LogoMark({ className, animated = true }: { className?: string; animated?: boolean }) {
  const bar = cn(animated && "transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]")

  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-7 shrink-0", className)}>
      {/* Hard shadow, then the paper tile with its ink border. */}
      <rect x="4" y="4" width="27" height="27" rx="3" className="fill-black dark:fill-[#71717a]" />
      <rect x="1" y="1" width="27" height="27" rx="3" fill="#FFDC58" stroke="#000" strokeWidth="2" />
      {/* The Stacked Slash */}
      <rect
        x="12.5"
        y="7.5"
        width="11"
        height="4"
        rx="0.75"
        fill="#000"
        className={cn(bar, animated && "group-hover:-translate-x-[3px]")}
      />
      <rect x="9.5" y="12.5" width="11" height="4" rx="0.75" fill="#000" className={bar} />
      <rect x="6.5" y="17.5" width="11" height="4" rx="0.75" fill="#000" className={cn(bar, animated && "group-hover:translate-x-[3px]")} />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="CodeStack home" className={cn("pressable group flex items-center gap-2.5", className)}>
      <LogoMark className="size-[30px] transition-transform duration-300 group-hover:-translate-x-px group-hover:-translate-y-px" />
      <Wordmark />
    </Link>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn(honk.className, "text-[22px] leading-none tracking-[0.01em] [font-variation-settings:'MORF'_15]", className)}>
      CodeStack
    </span>
  )
}
