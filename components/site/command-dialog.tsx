"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { Command } from "cmdk"
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bot,
  CornerDownLeft,
  Cpu,
  Gamepad2,
  GraduationCap,
  Hammer,
  Headphones,
  Layers,
  LibraryBig,
  Moon,
  NotebookText,
  PencilRuler,
  PlayCircle,
  Route,
  Search,
  Shapes,
  Sun,
  Users,
  type LucideIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { useCallback, useDeferredValue, useEffect, useMemo, useState } from "react"
import { BrandIcon } from "@/components/brand-icon"
import { localModels } from "@/data/local-llms"
import { resources } from "@/data/resources"
import { skills } from "@/data/skills"
import { tools } from "@/data/catalog"
import { search, type SearchItem } from "@/lib/site-search"

// Loaded on demand by CommandMenuProvider, so the palette (and everything it searches)
// never weighs down a page until someone actually opens it.

const glyphs: Record<string, LucideIcon> = {
  "page:explore": Layers,
  "page:icons": Shapes,
  "page:learn": LibraryBig,
  "page:stack": Hammer,
  "page:skills": Bot,
  "page:roadmap": Route,
  "page:llms": Cpu,
  "page:contribute": Users,
  "learn:docs": NotebookText,
  "learn:course": GraduationCap,
  "learn:guide": BookOpen,
  "learn:book": BookOpen,
  "learn:video": PlayCircle,
  "learn:practice": PencilRuler,
  "learn:game": Gamepad2,
  "learn:podcast": Headphones,
}

export default function CommandDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const [query, setQuery] = useState("")
  const deferred = useDeferredValue(query)
  const results = useMemo(() => search(deferred), [deferred])
  const [selected, setSelected] = useState("")

  // Start every search on its best match.
  useEffect(() => setSelected(results[0]?.items[0]?.id ?? ""), [results])
  useEffect(() => {
    if (!open) setQuery("")
  }, [open])

  const run = useCallback(
    (fn: () => void) => {
      onOpenChange(false)
      fn()
    },
    [onOpenChange],
  )
  const go = (it: { href: string; external?: boolean }) =>
    run(() => (it.external ? window.open(it.href, "_blank", "noopener,noreferrer") : router.push(it.href)))

  const showTheme = !deferred.trim() || /theme|dark|light|appearance|mode/i.test(deferred)

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-[2px] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-black/60" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-[12vh] z-[91] w-[calc(100%-2rem)] max-w-[640px] -translate-x-1/2 overflow-hidden rounded-[22px] border border-black/[0.08] bg-popover/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] backdrop-blur-2xl duration-300 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-[0.97] data-[state=open]:zoom-in-[0.97] data-[state=open]:slide-in-from-top-2 dark:border-white/10"
        >
          <Dialog.Title className="sr-only">Search CodeStack</Dialog.Title>
          <Command loop shouldFilter={false} value={selected} onValueChange={setSelected} className="flex max-h-[min(70vh,560px)] flex-col">
            <div className="flex items-center gap-3 border-b border-border/70 px-5">
              <Search className="size-[18px] shrink-0 text-muted-foreground" />
              <Command.Input
                autoFocus
                value={query}
                onValueChange={setQuery}
                placeholder="Search tools, courses, skills, models, icons…"
                className="h-14 w-full bg-transparent text-[17px] tracking-[-0.01em] outline-none placeholder:text-muted-foreground/70"
              />
              <kbd className="hidden h-[18px] place-items-center rounded-[5px] bg-foreground/[0.06] px-1.5 font-sans text-[11px] font-medium leading-none text-muted-foreground ring-1 ring-inset ring-foreground/[0.07] sm:grid">
                esc
              </kbd>
            </div>

            <Command.List className="no-scrollbar overflow-y-auto overscroll-contain p-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.08em] [&_[cmdk-group-heading]]:text-muted-foreground">
              {results.length === 0 && !showTheme && (
                <div className="px-4 py-14 text-center text-sm text-muted-foreground">
                  Nothing found for “{deferred.trim()}”. Try “Figma”, “UPI” or “Postgres”.
                </div>
              )}

              {results.map((g) => (
                <Command.Group key={g.id} heading={g.name}>
                  {g.items.map((it) => (
                    <ResultItem key={it.id} item={it} onSelect={() => go(it)} />
                  ))}
                  {g.seeAll && (
                    <Item value={`all-${g.id}`} onSelect={() => go({ href: g.seeAll!.href })}>
                      <span className="grid size-8 place-items-center rounded-lg">
                        <ArrowRight className="size-4 text-muted-foreground" />
                      </span>
                      <span className="text-muted-foreground">{g.seeAll.label}</span>
                    </Item>
                  )}
                  {g.id === "pages" && showTheme && (
                    <ThemeItem
                      dark={resolvedTheme === "dark"}
                      onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
                    />
                  )}
                </Command.Group>
              ))}
              {showTheme && !results.some((g) => g.id === "pages") && (
                <Command.Group heading="Appearance">
                  <ThemeItem
                    dark={resolvedTheme === "dark"}
                    onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
                  />
                </Command.Group>
              )}
            </Command.List>

            <div className="hidden items-center justify-between border-t border-border/70 px-5 py-2.5 text-[12px] text-muted-foreground sm:flex">
              <span>
                {tools.length} tools · {resources.length} resources · {skills.length} skills · {localModels.length} models
              </span>
              <span className="flex items-center gap-1.5">
                <CornerDownLeft className="size-3.5" /> to open
              </span>
            </div>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function ResultItem({ item: it, onSelect }: { item: SearchItem; onSelect: () => void }) {
  const Glyph = it.icon ? glyphs[it.icon] : undefined
  return (
    <Item value={it.id} onSelect={onSelect}>
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-surface-2">
        {Glyph ? (
          <Glyph className="size-4" />
        ) : it.icon === "category" ? (
          <span className="text-[11px] font-semibold uppercase text-muted-foreground">{it.title.slice(0, 2)}</span>
        ) : (
          <BrandIcon slug={it.icon} name={it.iconName ?? it.title} className="size-4" />
        )}
      </span>
      <span className="truncate">{it.title}</span>
      {it.subtitle && <span className="truncate text-xs text-muted-foreground">{it.subtitle}</span>}
      {it.external ? (
        <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-data-[selected=true]:opacity-100" />
      ) : (
        <ArrowRight className="ml-auto size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-data-[selected=true]:opacity-100" />
      )}
    </Item>
  )
}

function ThemeItem({ dark, onSelect }: { dark: boolean; onSelect: () => void }) {
  return (
    <Item value="theme" onSelect={onSelect}>
      <span className="grid size-8 place-items-center rounded-lg bg-surface-2">
        {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </span>
      Switch to {dark ? "light" : "dark"} appearance
    </Item>
  )
}

function Item({ children, ...props }: React.ComponentProps<typeof Command.Item>) {
  return (
    <Command.Item
      {...props}
      className="group flex cursor-pointer select-none items-center gap-3 rounded-xl px-3 py-2 text-[15px] outline-none transition-colors data-[selected=true]:bg-primary/10 data-[selected=true]:text-foreground"
    >
      {children}
    </Command.Item>
  )
}
