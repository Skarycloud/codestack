"use client"

import { animate, AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowRight, ChevronRight, Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useCommandMenu } from "@/components/site/command-menu"
import { BrandIcon } from "@/components/brand-icon"
import { StoryScene } from "@/components/home/story-scene"
import { brandMeta } from "@/data/brand-meta"
import { categoryById, stats, tools } from "@/data/catalog"
import { isVeryDark } from "@/lib/color"
import { display, serif } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { useModKey } from "@/components/shortcut-key"

const line1b = ["you", "need."]

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

  return (
    <section ref={ref} className="relative isolate overflow-hidden pt-24 sm:pt-32">
      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="shell relative z-10 grid items-center gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-10"
      >
        <div className="order-2 lg:order-1">
          <div className="rise">
            <Link
              href="/roadmap/ai-coding"
              className="group inline-flex items-center gap-2 rounded-full border border-black/[0.07] py-1 pl-1 pr-3 text-[13px] text-muted-foreground transition-colors hover:text-foreground dark:border-white/10"
            >
              <span className="rounded-full bg-foreground px-2 py-0.5 text-[11px] font-semibold text-background">New</span>
              <span>
                AI coding roadmap<span className="hidden sm:inline">: vibecode like an engineer</span>
              </span>
              <ChevronRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <h1 className={cn(display.className, "mt-7 text-[clamp(2.75rem,5.6vw,5rem)] font-semibold leading-[1] tracking-[-0.035em]")}>
            <span className="block">
              <Word delay={0.05}>Every</Word>
              <ToolTile />
              <Word delay={0.17}>tool</Word>
            </span>
            <span className="block">
              {line1b.map((word, i) => (
                <Word key={word} delay={0.23 + i * 0.06}>
                  {word}
                </Word>
              ))}
            </span>
            <span className={cn(serif.className, "block pb-[0.08em] text-[1.08em] font-normal tracking-[-0.02em] text-muted-foreground")}>
              {line2.map((word, i) => (
                <Word key={word} delay={0.35 + i * 0.06}>
                  {word}
                </Word>
              ))}
            </span>
          </h1>

          <p
            className={cn(
              display.className,
              "rise mt-6 max-w-[32rem] text-[18px] font-normal leading-[1.55] tracking-[-0.005em] text-muted-foreground sm:text-[19.5px]",
            )}
            style={delay(0.45)}
          >
            A free, open source home for{" "}
            <span className="font-semibold text-foreground">
              <CountUp to={stats.tools} />+ tools
            </span>
            , brand icons, courses, agent skills and local AI models, plus a roadmap from idea to production.
          </p>
        </div>

        <div className="rise order-1 lg:order-2" style={delay(0.2)}>
          <StoryScene caption={`${stats.tools} tools · idea to launch`} />
        </div>

        <div className="rise order-3 flex flex-col gap-4 pr-[7px] sm:flex-row sm:items-center lg:col-span-2 lg:mt-2" style={delay(0.55)}>
          <CommandBar onOpen={open} onPrefetch={prefetch} />
          <div className="flex shrink-0 items-center gap-4">
            <Link
              href="/explore"
              className={cn(
                nbButton,
                "bg-black text-white shadow-[5px_5px_0_0_#FFDC58] hover:shadow-[7px_7px_0_0_#FFDC58] dark:border-white dark:bg-white dark:text-black",
              )}
            >
              Start exploring
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/stack-builder"
              className={cn(
                nbButton,
                "bg-background shadow-[5px_5px_0_0_#000] hover:shadow-[7px_7px_0_0_#000] dark:border-[#d4d4d8] dark:shadow-[5px_5px_0_0_#FFDC58] dark:hover:shadow-[7px_7px_0_0_#FFDC58]",
              )}
            >
              Build a stack
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as React.CSSProperties

function Word({ children, delay: d }: { children: string; delay: number }) {
  return (
    <span className="rise-word mr-[0.22em] last:mr-0" style={delay(d)}>
      {children}
    </span>
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
  const paper = isVeryDark(tool.hex) ? "#f1efe8" : tint(tool.hex, 0.8)
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
          className="relative grid size-full place-items-center overflow-hidden rounded-[0.12em] border-[0.045em] border-black shadow-[0.07em_0.07em_0_0_#000] group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-primary dark:border-[#d4d4d8] dark:shadow-[0.07em_0.07em_0_0_#ffdc58]"
          animate={{ rotate: reduce ? 0 : i % 2 ? 4 : -4, backgroundColor: paper }}
          whileHover={reduce ? undefined : { rotate: 0, x: "-0.03em", y: "-0.03em" }}
          transition={{ type: "spring", bounce: 0.35, duration: 0.7, backgroundColor: { duration: 0.5 } }}
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

/** Mixes a brand color with white, for the tile's pastel paper. */
function tint(hex: string, amount: number) {
  const [r, g, b] = [0, 2, 4].map((o) => Math.round(parseInt(hex.slice(o, o + 2), 16) + (255 - parseInt(hex.slice(o, o + 2), 16)) * amount))
  return `rgb(${r},${g},${b})`
}

/** Shared neobrutalist button: ink border, hard shadow, lifts on hover and presses flat on click. */
const nbButton =
  "inline-flex h-14 items-center gap-2 border-2 border-black px-6 text-[15px] font-semibold transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"

// Real searches the palette can answer, typed out one after another in the search bar.
const examples = [
  "Figma",
  "UPI payments",
  "S3 compatible storage",
  "free LLM API",
  "Next.js",
  "AGENTS.md template",
  "Postgres",
  "icons for React",
]

/** Types and erases example searches. Holds a static hint for reduced motion. */
function useTypewriter(words: string[]) {
  const reduce = useReducedMotion()
  // Starts empty on the server and the client alike, so hydration matches; the effect fills it in.
  const [text, setText] = useState("")
  useEffect(() => {
    if (reduce) {
      setText("Figma, Next.js, Postgres…")
      return
    }
    let word = 0
    let chars = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const full = words[word]
      chars += deleting ? -1 : 1
      setText(full.slice(0, chars))
      let wait = deleting ? 32 : 70
      if (!deleting && chars === full.length) {
        deleting = true
        wait = 1500
      } else if (deleting && chars === 0) {
        deleting = false
        word = (word + 1) % words.length
        wait = 350
      }
      timer = setTimeout(tick, wait)
    }
    timer = setTimeout(tick, 900)
    return () => clearTimeout(timer)
  }, [reduce, words])
  return text
}

/** The hero's search: a neobrutalist command bar that opens the palette. */
function CommandBar({ onOpen, onPrefetch }: { onOpen: () => void; onPrefetch: () => void }) {
  const text = useTypewriter(examples)
  const mod = useModKey()
  return (
    <button
      onClick={onOpen}
      onPointerEnter={onPrefetch}
      onFocus={onPrefetch}
      aria-label="Search CodeStack"
      className="group flex h-14 w-full min-w-0 flex-1 items-center gap-3.5 border-2 border-black bg-background pl-2 pr-3 text-left shadow-[5px_5px_0_0_#000] transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none dark:border-[#d4d4d8] dark:shadow-[5px_5px_0_0_#FFDC58] dark:hover:shadow-[7px_7px_0_0_#FFDC58]"
    >
      <span className="grid size-9 shrink-0 place-items-center border-2 border-black bg-[#FFDC58] text-black">
        <Search className="size-4" strokeWidth={2.5} />
      </span>
      <span aria-hidden className="flex min-w-0 flex-1 items-center font-mono text-[15px]">
        <span className="shrink-0 text-muted-foreground">search&nbsp;</span>
        <span className="truncate">{text}</span>
        <span className="caret-blink ml-0.5 h-[1.1em] w-[2px] shrink-0 bg-foreground" />
      </span>
      <span aria-hidden className="hidden shrink-0 items-center gap-1.5 sm:flex">
        {[mod, "K"].map((k) => (
          <kbd
            key={k}
            className="grid h-7 min-w-7 place-items-center border-2 border-black bg-background px-1.5 font-mono text-[12px] font-bold shadow-[2px_2px_0_0_#000] dark:border-[#d4d4d8] dark:shadow-[2px_2px_0_0_#FFDC58]"
          >
            {k}
          </kbd>
        ))}
      </span>
    </button>
  )
}

/**
 * Counts up to a number once, easing out as it lands. The real number ships in the HTML; the
 * count only plays after hydration, and not at all for reduced motion. The slot is sized to the final
 * number, so the sentence doesn't shift while the digits change.
 */
function CountUp({ to }: { to: number }) {
  const reduce = useReducedMotion()
  const [value, setValue] = useState(to)
  useEffect(() => {
    if (reduce) return
    setValue(0)
    const controls = animate(0, to, { duration: 1.8, delay: 0.55, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [reduce, to])
  return (
    <span className="inline-grid tabular-nums">
      {/* The final number, invisible, holds the slot's exact width. */}
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {to}
      </span>
      <span className="col-start-1 row-start-1 text-right">{value}</span>
    </span>
  )
}
