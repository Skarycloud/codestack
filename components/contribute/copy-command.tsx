"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

/** A terminal command with a one‑click copy button. */
export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard can be unavailable (e.g. insecure context); the text stays selectable.
    }
  }

  return (
    <div className="group flex min-w-0 items-center gap-3 rounded-xl bg-surface-2 py-2 pl-4 pr-2 font-mono text-[12.5px]">
      <span className="select-none text-muted-foreground">$</span>
      <code className="no-scrollbar min-w-0 flex-1 overflow-x-auto whitespace-nowrap">{command}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : `Copy command: ${command}`}
        className="pressable grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-background hover:text-foreground"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={copied ? "done" : "copy"}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.3 }}
          >
            {copied ? <Check className="size-4 text-[#30d158]" /> : <Copy className="size-4" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  )
}
