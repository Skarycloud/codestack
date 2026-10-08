"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SwitchPillProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  className?: string
}

/** A labelled iOS‑style switch. The whole pill is the hit target. */
export function SwitchPill({ checked, onChange, label, className }: SwitchPillProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "pressable flex h-9 shrink-0 items-center gap-2.5 rounded-full pl-1.5 pr-3.5 text-[13px] ring-1 ring-inset transition-colors duration-300",
        checked
          ? "bg-[#30d158]/[0.1] text-foreground ring-[#30d158]/40"
          : "text-muted-foreground ring-black/[0.08] hover:text-foreground dark:ring-white/10",
        className,
      )}
    >
      <span
        className={cn(
          "relative flex h-[22px] w-[38px] shrink-0 items-center rounded-full p-[2px] transition-colors duration-300",
          checked ? "justify-end bg-[#30d158]" : "justify-start bg-foreground/[0.14]",
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
          className="block size-[18px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.25)]"
        />
      </span>
      {label}
    </button>
  )
}
