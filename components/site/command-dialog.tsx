"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { Command } from "cmdk"
import { ArrowUpRight, Bot, CornerDownLeft, Cpu, Hammer, Layers, LibraryBig, Moon, Route, Search, Shapes, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { BrandIcon } from "@/components/brand-icon"
import { categories, categoryById, tools } from "@/data/catalog"

// Loaded on demand by CommandMenuProvider, so the palette (and the catalog's
// logos) never weigh down a page until someone actually searches.

const pages = [
  { name: "Explore the directory", href: "/explore", icon: Layers },
  { name: "Brand icon library", href: "/icons", icon: Shapes },
  { name: "Learning resources", href: "/learn", icon: LibraryBig },
  { name: "Stack Builder", href: "/stack-builder", icon: Hammer },
  { name: "Agent skills for AI coding agents", href: "/skills", icon: Bot },
  { name: "Developer roadmap: idea to production", href: "/roadmap", icon: Route },
  { name: "Local LLMs you can download and run", href: "/local-llms", icon: Cpu },
]

export default function CommandDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()

  const run = useCallback(
    (fn: () => void) => {
      onOpenChange(false)
      fn()
    },
    [onOpenChange],
  )

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-[2px] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-black/60" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-[12vh] z-[91] w-[calc(100%-2rem)] max-w-[640px] -translate-x-1/2 overflow-hidden rounded-[22px] border border-black/[0.08] bg-popover/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] backdrop-blur-2xl duration-300 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-[0.97] data-[state=open]:zoom-in-[0.97] data-[state=open]:slide-in-from-top-2 dark:border-white/10"
        >
          <Dialog.Title className="sr-only">Search CodeStack</Dialog.Title>
          <Command loop className="flex max-h-[min(70vh,560px)] flex-col">
            <div className="flex items-center gap-3 border-b border-border/70 px-5">
              <Search className="size-[18px] shrink-0 text-muted-foreground" />
              <Command.Input
                autoFocus
                placeholder="Search tools, categories, pages…"
                className="h-14 w-full bg-transparent text-[17px] tracking-[-0.01em] outline-none placeholder:text-muted-foreground/70"
              />
              <kbd className="hidden h-[18px] place-items-center rounded-[5px] bg-foreground/[0.06] px-1.5 font-sans text-[11px] font-medium leading-none text-muted-foreground ring-1 ring-inset ring-foreground/[0.07] sm:grid">
                esc
              </kbd>
            </div>

            <Command.List className="no-scrollbar overflow-y-auto overscroll-contain p-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.08em] [&_[cmdk-group-heading]]:text-muted-foreground">
              <Command.Empty className="px-4 py-14 text-center text-sm text-muted-foreground">
                Nothing found. Try “Figma”, “icons” or “Postgres”.
              </Command.Empty>

              <Command.Group heading="Pages">
                {pages.map((p) => (
                  <Item key={p.href} value={p.name} onSelect={() => run(() => router.push(p.href))}>
                    <span className="grid size-8 place-items-center rounded-lg bg-surface-2">
                      <p.icon className="size-4" />
                    </span>
                    {p.name}
                  </Item>
                ))}
                <Item
                  value="Toggle appearance theme dark light"
                  onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
                >
                  <span className="grid size-8 place-items-center rounded-lg bg-surface-2">
                    {resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
                  </span>
                  Switch to {resolvedTheme === "dark" ? "light" : "dark"} appearance
                </Item>
              </Command.Group>

              <Command.Group heading="Categories">
                {categories.map((c) => (
                  <Item key={c.id} value={`category ${c.name} ${c.audience}`} onSelect={() => run(() => router.push(`/explore?c=${c.id}`))}>
                    <span className="grid size-8 place-items-center rounded-lg bg-surface-2 text-[11px] font-semibold uppercase text-muted-foreground">
                      {c.name.slice(0, 2)}
                    </span>
                    {c.name}
                    <span className="ml-auto text-xs text-muted-foreground">
                      {c.alsoFor ? "Design + Develop" : c.audience === "design" ? "Design" : "Develop"}
                    </span>
                  </Item>
                ))}
              </Command.Group>

              <Command.Group heading="Tools">
                {tools.map((t) => (
                  <Item
                    key={`${t.category}-${t.name}`}
                    value={`${t.name} ${t.kind} ${categoryById[t.category].name}`}
                    onSelect={() => run(() => window.open(t.url, "_blank", "noopener,noreferrer"))}
                  >
                    <span className="grid size-8 place-items-center rounded-lg bg-surface-2">
                      <BrandIcon slug={t.icon} name={t.name} className="size-4" />
                    </span>
                    <span className="truncate">{t.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{t.kind}</span>
                    <ArrowUpRight className="ml-auto size-4 text-muted-foreground opacity-0 transition-opacity group-data-[selected=true]:opacity-100" />
                  </Item>
                ))}
              </Command.Group>
            </Command.List>

            <div className="hidden items-center justify-between border-t border-border/70 px-5 py-2.5 text-[12px] text-muted-foreground sm:flex">
              <span>
                {tools.length} tools · {categories.length} categories
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
