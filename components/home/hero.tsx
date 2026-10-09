"use client"

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowRight, ChevronRight, Search } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useCommandMenu } from "@/components/site/command-menu"
import { BrandIcon } from "@/components/brand-icon"
import { brandMeta } from "@/data/brand-meta"
import { categoryById, stats, tools } from "@/data/catalog"
import { isVeryDark } from "@/lib/color"
import { ShortcutKey } from "@/components/shortcut-key"

// Decorative and heavy (100+ SVG tiles): render it after first paint instead of in the HTML.
const IconWall = dynamic(() => import("./icon-wall").then((m) => m.IconWall), {
  ssr: false,
  loading: () => <div aria-hidden className="mt-16 h-[520px] sm:mt-20 sm:h-[640px]" />,
})

const line1 = ["tool", "you", "need."]

// The tools that take turns in the headline, one from each corner of the directory.
const tileTools = [
  "Figma",
  "React",
  "Supabase",
  "Claude",
  "Tailwind CSS",
  "Framer",
  "Stripe",
  "Python",
  "Docker",
  "PostgreSQL",
  "Blender",
  "Svelte",
]
  .map((name) => tools.find((t) => t.name === name))
  .filter((t) => t?.icon && brandMeta[t.icon] && !brandMeta[t.icon].x)
  .map((t) => ({ name: t!.name, slug: t!.icon!, hex: brandMeta[t!.icon!].hex, category: t!.category }))
const line2 = ["All", "in", "one", "place."]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { open, prefetch } = useCommandMenu()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })

  const copyY = useTransform(smooth, [0, 1], [0, reduce ? 0 : -120])
  const copyOpacity = useTransform(smooth, [0, 0.45], [1, 0])
  const copyScale = useTransform(smooth, [0, 0.6], [1, reduce ? 1 : 0.94])

  return (
    <section ref={ref} className="relative isolate overflow-hidden pt-28 sm:pt-36">
      <Backdrop />

      <motion.div
        style={{ y: copyY, opacity: copyOpacity, scale: copyScale }}
        className="shell relative z-10 flex flex-col items-center text-center"
      >
        <div className="rise">
          <Link
            href="/roadmap/ai-coding"
            className="group inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-background/60 py-1 pl-1 pr-3 text-[13px] text-muted-foreground shadow-sm backdrop-blur-md transition-colors hover:text-foreground dark:border-white/10"
          >
            <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">New</span>
            <span>
              AI coding roadmap<span className="hidden sm:inline">: vibecode like an engineer</span>
            </span>
            <ChevronRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <h1 className="text-display mt-8 max-w-[14ch] sm:max-w-none">
          <span className="block">
            <Word delay={0.05}>Every</Word>
            <ToolTile />
            {line1.map((word, i) => (
              <Word key={word} delay={0.17 + i * 0.06}>
                {word}
              </Word>
            ))}
          </span>
          <span className="block pb-[0.08em]">
            {line2.map((word, i) => (
              <Word key={word} delay={0.29 + i * 0.06} className="text-spectrum" spectrumX={(i / (line2.length - 1)) * 100}>
                {word}
              </Word>
            ))}
          </span>
        </h1>

        <p className="rise text-lede mt-7 max-w-[34rem] text-muted-foreground" style={delay(0.45)}>
          A free, open source home for <span className="text-foreground">{stats.tools}+ tools</span>, brand icons, courses, agent skills and
          local AI models, plus a roadmap from idea to production.
        </p>

        <div className="rise mt-10 flex w-full max-w-md flex-col items-center gap-5" style={delay(0.55)}>
          <button
            onClick={open}
            onPointerEnter={prefetch}
            onFocus={prefetch}
            className="pressable group flex h-14 w-full items-center gap-3 rounded-full bg-background/70 pl-5 pr-2.5 text-left text-[15px] text-muted-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_30px_-8px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.07] backdrop-blur-xl transition-shadow hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_14px_40px_-10px_rgba(0,0,0,0.2)] dark:bg-white/[0.06] dark:ring-white/10"
          >
            <Search className="size-[18px] shrink-0" />
            <span className="flex-1 truncate">Search Figma, Next.js, Postgres…</span>
            <ShortcutKey className="mr-2" />
          </button>

          <div className="flex items-center gap-6">
            <Link
              href="/explore"
              className="pressable inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.6)] hover:brightness-110"
            >
              Start exploring
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/stack-builder" className="group inline-flex items-center gap-1 text-[15px] text-link">
              Build a stack
              <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </motion.div>

      <IconWall progress={smooth} />
    </section>
  )
}

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as React.CSSProperties

function Word({ children, delay: d, className, spectrumX }: { children: string; delay: number; className?: string; spectrumX?: number }) {
  return (
    <span className="rise-word mr-[0.22em] last:mr-0" style={delay(d)}>
      <span
        className={className}
        style={spectrumX === undefined ? undefined : ({ "--spectrum-x": `${spectrumX}%` } as React.CSSProperties)}
      >
        {children}
      </span>
    </span>
  )
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_30%,#000_30%,transparent_75%)]" />
      <div className="absolute left-1/2 top-[-18rem] h-[38rem] w-[62rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(10,132,255,0.18),transparent)] blur-2xl dark:bg-[radial-gradient(closest-side,rgba(10,132,255,0.22),transparent)]" />
      <div className="absolute right-[-10rem] top-[8rem] h-[26rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(191,90,242,0.14),transparent)] blur-2xl" />
      <div className="absolute left-[-12rem] top-[14rem] h-[24rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,159,10,0.10),transparent)] blur-2xl" />
    </div>
  )
}

/**
 * An app-icon tile set into the headline that rolls through real tools from the directory,
 * tinted with each brand's color. Fixed size, so the headline never reflows. Hover pauses it;
 * click opens that tool's category.
 */
function ToolTile() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduce || paused) return
    const id = setInterval(() => setI((n) => (n + 1) % tileTools.length), 2400)
    return () => clearInterval(id)
  }, [reduce, paused])

  const tool = tileTools[i]
  const glow = isVeryDark(tool.hex) ? "120,120,128" : hexToRgb(tool.hex)
  return (
    <span className="rise-word mr-[0.22em] align-[-0.1em]" style={delay(0.11)}>
      <Link
        href={`/explore?c=${tool.category}`}
        aria-label={`${tool.name}, in ${categoryById[tool.category].name}. Open the category`}
        title={tool.name}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="group relative inline-block size-[0.84em] outline-none"
      >
        <motion.span
          aria-hidden
          className="absolute inset-[-28%] -z-10 rounded-full blur-[0.22em]"
          animate={{ backgroundColor: `rgba(${glow},0.32)` }}
          transition={{ duration: 0.6 }}
        />
        <motion.span
          className="relative grid size-full place-items-center overflow-hidden rounded-[0.22em] bg-white shadow-[0_0.04em_0.1em_rgba(0,0,0,0.08),0_0.14em_0.4em_-0.1em_rgba(0,0,0,0.25)] ring-1 ring-black/[0.06] transition-shadow group-focus-visible:ring-2 group-focus-visible:ring-primary dark:bg-[#1c1c1e] dark:ring-white/10"
          animate={{ rotate: reduce ? 0 : i % 2 ? 5 : -5 }}
          whileHover={reduce ? undefined : { scale: 1.06, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.35, duration: 0.7 }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={tool.slug}
              className="grid place-items-center"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-110%", opacity: 0 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            >
              <BrandIcon slug={tool.slug} name={tool.name} className="size-[0.5em]" />
            </motion.span>
          </AnimatePresence>
        </motion.span>
      </Link>
    </span>
  )
}

function hexToRgb(hex: string) {
  return [0, 2, 4].map((o) => parseInt(hex.slice(o, o + 2), 16)).join(",")
}
