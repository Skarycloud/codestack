"use client"

import { motion } from "framer-motion"
import { useId } from "react"
import { cn } from "@/lib/utils"

interface SegmentedProps<T extends string> {
  value: T
  onChange: (value: T) => void
  options: { value: T; label: string; count?: number }[]
  className?: string
  size?: "sm" | "md"
}

/** iOS‑style segmented control with a spring‑animated thumb. */
export function Segmented<T extends string>({ value, onChange, options, className, size = "md" }: SegmentedProps<T>) {
  const id = useId()
  return (
    <div
      role="tablist"
      className={cn("inline-flex items-center gap-0.5 rounded-full bg-surface-2/80 p-1 ring-1 ring-inset ring-black/[0.04] dark:ring-white/[0.06]", className)}
    >
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative whitespace-nowrap rounded-full font-medium transition-colors duration-200",
              size === "sm" ? "px-3 py-1 text-[13px]" : "px-4 py-1.5 text-sm",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId={`seg-${id}`}
                className="absolute inset-0 rounded-full bg-background shadow-[0_1px_2px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.06)] dark:bg-white/[0.14] dark:shadow-none"
                transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {option.label}
              {option.count !== undefined && <span className="text-[11px] tabular-nums font-normal">{option.count}</span>}
            </span>
          </button>
        )
      })}
    </div>
  )
}
