"use client"

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, Github, Search } from "lucide-react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { ease } from "@/components/motion/reveal"
import { useCommandMenu } from "@/components/site/command-menu"
import { Logo } from "@/components/site/logo"
import { ThemeToggle } from "@/components/site/theme-toggle"
import { navItems, type NavGroup, type NavItem, type NavLink } from "@/lib/nav"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"
import { ShortcutKey } from "@/components/shortcut-key"

const OPEN_DELAY = 120
const CLOSE_DELAY = 200

export function Navbar() {
  return (
    <Suspense fallback={<NavbarInner />}>
      <NavbarWithParams />
    </Suspense>
  )
}

function NavbarWithParams() {
  // Close menus whenever the URL changes, including query‑only changes.
  const params = useSearchParams()
  return <NavbarInner routeKey={params.toString()} />
}

function NavbarInner({ routeKey = "" }: { routeKey?: string }) {
  const pathname = usePathname()
  const { open: openSearch, prefetch: prefetchSearch } = useCommandMenu()
  const [menu, setMenu] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const openTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const triggers = useRef<Record<string, HTMLAnchorElement | null>>({})
  const panelRef = useRef<HTMLDivElement>(null)

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8))

  const clearTimers = () => {
    clearTimeout(openTimer.current)
    clearTimeout(closeTimer.current)
    closeTimer.current = undefined
  }
  const close = useCallback(() => {
    clearTimeout(openTimer.current)
    clearTimeout(closeTimer.current)
    closeTimer.current = undefined
    setMenu(null)
  }, [])

  useEffect(() => {
    close()
    setMobileOpen(false)
  }, [pathname, routeKey, close])

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : ""
  }, [mobileOpen])

  useEffect(() => {
    if (!menu) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      triggers.current[menu]?.focus()
      close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menu, close])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
  const activeItem = navItems.find((i) => isActive(i.href))?.name ?? null
  const pill = hovered ?? (menu ? null : activeItem)
  const current = navItems.find((i) => i.name === menu)

  const onItemEnter = (item: NavItem) => {
    setHovered(item.name)
    clearTimers()
    if (!item.menu) {
      closeTimer.current = setTimeout(() => setMenu(null), 80)
      return
    }
    if (menu) setMenu(item.name)
    else openTimer.current = setTimeout(() => setMenu(item.name), OPEN_DELAY)
  }

  const focusFirstLink = () => requestAnimationFrame(() => panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus())

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return
        setHovered(null)
        clearTimers()
        closeTimer.current = setTimeout(() => setMenu(null), CLOSE_DELAY)
      }}
      onPointerEnter={() => {
        clearTimeout(closeTimer.current)
        closeTimer.current = undefined
      }}
    >
      <div
        className={cn(
          "glass relative z-20 border-b transition-[border-color,background-color] duration-500",
          scrolled || mobileOpen
            ? "border-black/[0.07] dark:border-white/[0.08]"
            : "border-transparent bg-transparent [-webkit-backdrop-filter:none] [backdrop-filter:none]",
          menu &&
            "!border-transparent !bg-background/80 ![-webkit-backdrop-filter:saturate(180%)_blur(20px)] ![backdrop-filter:saturate(180%)_blur(20px)]",
          mobileOpen && "!bg-background",
        )}
      >
        <nav className="shell flex h-14 items-center justify-between gap-6" aria-label="Main">
          <Logo />

          <ul className="hidden items-center lg:flex" onPointerLeave={() => setHovered(null)}>
            {navItems.map((item) => {
              const open = menu === item.name
              return (
                <li
                  key={item.name}
                  className="relative flex items-center"
                  onPointerEnter={(e) => e.pointerType === "mouse" && onItemEnter(item)}
                >
                  {pill === item.name && (
                    <motion.span
                      layoutId="nav-pill"
                      className={cn(
                        "absolute inset-0 rounded-full",
                        hovered === item.name ? "bg-foreground/[0.07]" : "bg-foreground/[0.05]",
                      )}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                    />
                  )}
                  <Link
                    ref={(el) => {
                      triggers.current[item.name] = el
                    }}
                    href={item.href}
                    aria-current={activeItem === item.name ? "page" : undefined}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown" && item.menu) {
                        e.preventDefault()
                        clearTimers()
                        setMenu(item.name)
                        focusFirstLink()
                      }
                    }}
                    className={cn(
                      "pressable relative flex h-8 items-center rounded-full text-[13.5px] transition-colors duration-200",
                      item.menu ? "pl-3.5 pr-1" : "px-3.5",
                      open || activeItem === item.name || hovered === item.name ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {item.name}
                  </Link>
                  {item.menu && (
                    <button
                      type="button"
                      aria-label={`${open ? "Hide" : "Show"} ${item.name} menu`}
                      aria-expanded={open}
                      aria-haspopup="true"
                      onClick={() => {
                        clearTimers()
                        if (open) close()
                        else {
                          setMenu(item.name)
                          focusFirstLink()
                        }
                      }}
                      className={cn(
                        "pressable relative mr-1.5 grid size-5 place-items-center rounded-full transition-colors duration-200 hover:bg-foreground/10",
                        open || hovered === item.name ? "text-foreground" : "text-muted-foreground/70",
                      )}
                    >
                      <ChevronDown
                        className={cn("size-3 transition-transform duration-300 ease-apple", open && "rotate-180")}
                        strokeWidth={2.5}
                      />
                    </button>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-1">
            <button
              onClick={openSearch}
              onPointerEnter={prefetchSearch}
              onFocus={prefetchSearch}
              className="pressable hidden h-9 items-center gap-2 rounded-full pl-3 pr-2 text-[13px] text-muted-foreground ring-1 ring-inset ring-black/[0.08] hover:bg-foreground/[0.04] hover:text-foreground dark:ring-white/[0.1] xl:flex"
            >
              <Search className="size-3.5" />
              Search
              <ShortcutKey className="ml-2.5" />
            </button>
            <button
              onClick={openSearch}
              onPointerEnter={prefetchSearch}
              onFocus={prefetchSearch}
              aria-label="Search"
              className="pressable grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground xl:hidden"
            >
              <Search className="size-[17px]" />
            </button>
            <a
              href={site.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CodeStack on GitHub"
              className="pressable hidden size-9 place-items-center rounded-full text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground sm:grid"
            >
              <Github className="size-[17px]" />
            </a>
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="pressable relative grid size-9 place-items-center rounded-full hover:bg-foreground/[0.06] lg:hidden"
            >
              <span
                className={cn(
                  "absolute h-[1.5px] w-[17px] rounded-full bg-foreground transition-transform duration-500 ease-apple",
                  mobileOpen ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-[1.5px] w-[17px] rounded-full bg-foreground transition-transform duration-500 ease-apple",
                  mobileOpen ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* Desktop mega‑menu */}
      <AnimatePresence>
        {current?.menu && (
          <>
            <motion.div
              key="panel"
              ref={panelRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.05 } }}
              transition={{ duration: 0.2 }}
              className="glass absolute inset-x-0 top-full z-10 hidden border-b border-black/[0.06] !bg-background/80 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.25)] dark:border-white/[0.08] lg:block"
            >
              <AutoHeight>
                <AnimatePresence mode="popLayout" initial={false}>
                  <MenuContent key={current.name} groups={current.menu} onNavigate={close} />
                </AnimatePresence>
              </AutoHeight>
            </motion.div>
            <motion.div
              key="scrim"
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onPointerMove={(e) => {
                // Only a real mouse movement onto the page closes the menu; the scrim appearing
                // under a resting cursor (after a click or keyboard open) must not.
                if (e.pointerType !== "mouse" || (!e.movementX && !e.movementY) || closeTimer.current) return
                setHovered(null)
                clearTimers()
                closeTimer.current = setTimeout(() => setMenu(null), CLOSE_DELAY)
              }}
              onClick={close}
              className="fixed inset-0 top-14 z-0 hidden bg-black/10 backdrop-blur-[10px] dark:bg-black/40 lg:block"
            />
          </>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>{mobileOpen && <MobileMenu pathname={pathname} isActive={isActive} />}</AnimatePresence>
    </header>
  )
}

/** Animates its height to fit whatever content is inside. */
function AutoHeight({ children }: { children: React.ReactNode }) {
  const inner = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | "auto">("auto")

  useLayoutEffect(() => {
    const el = inner.current
    if (!el) return
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <motion.div initial={false} animate={{ height }} transition={{ type: "spring", bounce: 0, duration: 0.45 }} className="overflow-hidden">
      <div ref={inner} className="relative">
        {children}
      </div>
    </motion.div>
  )
}

function MenuContent({ groups, onNavigate, ref }: { groups: NavGroup[]; onNavigate: () => void; ref?: React.Ref<HTMLDivElement> }) {
  let index = 0
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.12 } }}
      className="shell grid grid-cols-[minmax(0,1.5fr)_repeat(2,minmax(0,1fr))] gap-12 pb-14 pt-9"
    >
      {groups.map((group) => (
        <div key={group.title}>
          <p className="mb-3.5 text-[12px] text-muted-foreground">{group.title}</p>
          <ul className={group.primary ? "space-y-2" : "space-y-2.5"}>
            {group.links.map((link) => (
              <motion.li
                key={link.href + link.name}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease, delay: 0.03 + index++ * 0.018 }}
              >
                <MenuLink link={link} primary={group.primary} onNavigate={onNavigate} />
              </motion.li>
            ))}
          </ul>
        </div>
      ))}
    </motion.div>
  )
}

function MenuLink({ link, primary, onNavigate }: { link: NavLink; primary?: boolean; onNavigate: () => void }) {
  const className = cn(
    "group/link inline-flex items-center gap-1 rounded-md transition-colors duration-200 active:opacity-60",
    primary
      ? "text-[24px] font-semibold leading-tight tracking-[-0.028em] text-foreground/90 hover:text-foreground"
      : "text-[13px] font-medium text-foreground/75 hover:text-foreground",
  )
  const arrow = link.external ? (
    <ArrowUpRight className="size-3 opacity-50" />
  ) : primary ? (
    <ChevronRight className="size-5 -translate-x-1 opacity-0 transition-all duration-300 ease-apple group-hover/link:translate-x-0 group-hover/link:opacity-60" />
  ) : null

  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className={className}>
      {link.name}
      {arrow}
    </a>
  ) : (
    <Link href={link.href} onClick={onNavigate} className={className}>
      {link.name}
      {arrow}
    </Link>
  )
}

function MobileMenu({ pathname, isActive }: { pathname: string; isActive: (href: string) => boolean }) {
  const [sub, setSub] = useState<NavItem | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      className="fixed inset-x-0 bottom-0 top-14 overflow-y-auto overflow-x-hidden bg-background lg:hidden"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {sub ? (
          <motion.div
            key={sub.name}
            initial={{ x: "40%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "40%", opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.45 }}
            className="shell pb-16 pt-4"
          >
            <button
              onClick={() => setSub(null)}
              className="pressable -ml-1.5 flex items-center gap-0.5 py-2 text-[15px] text-muted-foreground"
            >
              <ChevronLeft className="size-5" /> Back
            </button>
            {sub.menu!.map((group) => (
              <div key={group.title} className="mt-6">
                <p className="text-[12px] text-muted-foreground">{group.title}</p>
                <ul className="mt-2">
                  {group.links.map((link) => (
                    <li key={link.href + link.name}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "flex items-center gap-1.5 py-1.5",
                            group.primary ? "text-[26px] font-semibold tracking-[-0.03em]" : "text-[17px] font-medium",
                          )}
                        >
                          {link.name} <ArrowUpRight className="size-4 opacity-50" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className={cn(
                            "block py-1.5",
                            group.primary ? "text-[26px] font-semibold tracking-[-0.03em]" : "text-[17px] font-medium",
                          )}
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.ul
            key="root"
            initial={{ x: "-25%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-25%", opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.45 }}
            className="shell pb-16 pt-8"
          >
            {[{ name: "Home", href: "/" } as NavItem, ...navItems].map((item, i) => {
              const active = item.href === "/" ? pathname === "/" : isActive(item.href)
              return (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.04 + i * 0.04 }}
                  className="flex items-center justify-between"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex-1 py-2.5 text-[28px] font-semibold tracking-[-0.03em]",
                      active ? "text-foreground" : "text-foreground/60",
                    )}
                  >
                    {item.name}
                  </Link>
                  {item.menu && (
                    <button
                      onClick={() => setSub(item)}
                      aria-label={`Open ${item.name} menu`}
                      className="pressable grid size-10 place-items-center rounded-full text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground"
                    >
                      <ChevronRight className="size-5" />
                    </button>
                  )}
                </motion.li>
              )
            })}
            <li className="mt-8 border-t pt-6">
              <a
                href={site.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[15px] text-muted-foreground"
              >
                <Github className="size-4" /> Star on GitHub
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
