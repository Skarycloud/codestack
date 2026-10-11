"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useId, useState } from "react"
import { switchTheme } from "@/lib/theme-transition"
import { cn } from "@/lib/utils"

const spring = { type: "spring", bounce: 0.25, duration: 0.7 } as const
const rays = [0, 45, 90, 135, 180, 225, 270, 315]

/**
 * A single icon that morphs between a sun and a crescent moon: the rays fold away as the disc
 * grows, and a mask slides in to carve the crescent. Clicking reveals the new theme in a circle
 * that grows from the button (see lib/theme-transition).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const reduce = useReducedMotion()
  // useId can include characters that break url(#id) references, so keep it to safe ones.
  const maskId = `theme-mask-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const dark = mounted && resolvedTheme === "dark"
  const transition = reduce ? { duration: 0 } : spring

  return (
    <button
      type="button"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        switchTheme(dark ? "light" : "dark", setTheme, { x: r.left + r.width / 2, y: r.top + r.height / 2 })
      }}
      aria-label={`Switch to ${dark ? "light" : "dark"} appearance`}
      title={dark ? "Light appearance" : "Dark appearance"}
      className={cn(
        "pressable group grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground",
        className,
      )}
    >
      <motion.svg
        viewBox="0 0 24 24"
        aria-hidden
        className="size-[18px] overflow-visible"
        initial={false}
        animate={{ rotate: dark ? 90 : 0 }}
        transition={transition}
      >
        <mask id={maskId}>
          <rect width="24" height="24" fill="white" />
          <motion.circle
            initial={false}
            animate={dark ? { cx: 7, cy: 7 } : { cx: -6, cy: -6 }}
            r="7.5"
            fill="black"
            transition={transition}
          />
        </mask>
        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask={`url(#${maskId})`}
          initial={false}
          animate={{ r: dark ? 8.5 : 4.5 }}
          transition={transition}
        />
        <motion.g
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ transformOrigin: "12px 12px" }}
          initial={false}
          animate={dark ? { scale: 0.4, rotate: 45, opacity: 0 } : { scale: 1, rotate: 0, opacity: 1 }}
          transition={transition}
        >
          {rays.map((deg) => (
            <line key={deg} x1="12" y1="2.5" x2="12" y2="4.5" transform={`rotate(${deg} 12 12)`} />
          ))}
        </motion.g>
      </motion.svg>
    </button>
  )
}
