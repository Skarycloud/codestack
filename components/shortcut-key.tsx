"use client"

import { useSyncExternalStore } from "react"
import { cn } from "@/lib/utils"

type Platform = "apple" | "other" | "touch"

const subscribe = () => () => {}

function detectPlatform(): Platform {
  // Phones and tablets without a keyboard have no shortcut to show.
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return "touch"
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } }
  const platform = nav.userAgentData?.platform || navigator.platform || navigator.userAgent
  return /mac|iphone|ipad|ipod/i.test(platform) ? "apple" : "other"
}

/** The search shortcut modifier for this device: ⌘ on Apple, Ctrl on Windows, Linux and ChromeOS. */
export function useModKey() {
  const platform = useSyncExternalStore(subscribe, detectPlatform, () => "apple" as Platform)
  return platform === "apple" ? "⌘" : "Ctrl"
}

/**
 * The search shortcut as small keycaps: "⌘ K" on Apple devices, "Ctrl K" elsewhere, and nothing
 * on touch devices. It stays invisible until the platform is known, so the server's guess never
 * flashes the wrong key.
 */
export function ShortcutKey({ className }: { className?: string }) {
  const platform = useSyncExternalStore(subscribe, detectPlatform, () => null)
  if (platform === "touch") return null
  const keys = platform === "other" ? ["Ctrl", "K"] : ["⌘", "K"]
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex items-center gap-[3px] font-sans text-[11px] font-medium leading-none text-muted-foreground transition-opacity duration-200",
        !platform && "opacity-0",
        className,
      )}
    >
      {keys.map((key) => (
        <kbd
          key={key}
          className={cn(
            "grid h-[18px] min-w-[18px] place-items-center rounded-[5px] bg-foreground/[0.06] px-1 font-sans ring-1 ring-inset ring-foreground/[0.07]",
            key === "⌘" && "text-[12px]",
          )}
        >
          {key}
        </kbd>
      ))}
    </span>
  )
}
