"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { FileText, FolderClosed, FolderOpen } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { BrandIcon } from "@/components/brand-icon"
import { ease } from "@/components/motion/reveal"
import { skillAgents } from "@/data/skills"
import { cn } from "@/lib/utils"

const cards = [
  {
    step: "01",
    eyebrow: "Anatomy",
    title: "A folder with a SKILL.md",
    body: "Instructions, plus optional scripts and references, that teach an agent how to do one job really well.",
    Visual: Anatomy,
  },
  {
    step: "02",
    eyebrow: "Progressive disclosure",
    title: "Loaded only when needed",
    body: "Agents keep just each skill's name and description in mind, and read the full instructions only when a task calls for them.",
    Visual: Disclosure,
  },
  {
    step: "03",
    eyebrow: "Portable",
    title: "Works across agents",
    body: "One open format, read by Claude Code, Codex, Cursor, Copilot, Gemini CLI and dozens more.",
    Visual: Orbit,
  },
]

export function SkillExplainer() {
  return (
    <section className="shell grid gap-4 pb-20 md:grid-cols-3 [&>*]:min-w-0">
      {cards.map(({ step, eyebrow, title, body, Visual }, i) => (
        <motion.article
          key={step}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.8, ease, delay: i * 0.08 }}
          className="card-lift group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-surface ring-1 ring-inset ring-black/[0.04] dark:ring-white/[0.06]"
        >
          <div
            aria-hidden
            className="relative h-[290px] shrink-0 overflow-hidden [mask-image:linear-gradient(180deg,#000_78%,transparent)]"
          >
            <Visual />
          </div>
          <div className="relative flex-1 px-7 pb-7 pt-2">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              <span className="text-link">{step}</span>
              <span className="h-px w-4 bg-foreground/20" />
              {eyebrow}
            </p>
            <h2 className="mt-3 text-[20px] font-semibold tracking-[-0.025em]">{title}</h2>
            <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">{body}</p>
          </div>
        </motion.article>
      ))}
    </section>
  )
}

/* ── 01 · A file tree that types out a real SKILL.md header ───────────────── */

function Anatomy() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" })

  const tree = [
    { icon: FolderOpen, label: "frontend-design/", depth: 0 },
    { icon: FileText, label: "SKILL.md", depth: 1, required: true },
    { icon: FolderClosed, label: "scripts/", depth: 1 },
    { icon: FolderClosed, label: "references/", depth: 1 },
  ]
  const frontmatter = [
    <span key="a" className="text-muted-foreground/60">
      ---
    </span>,
    <span key="b">
      <span className="text-[#7d2fb0] dark:text-[#d79cff]">name</span>: frontend-design
    </span>,
    <span key="c">
      <span className="text-[#7d2fb0] dark:text-[#d79cff]">description</span>: Distinctive, production‑grade UI…
    </span>,
    <span key="d" className="text-muted-foreground/60">
      ---
    </span>,
    <span key="e" className="text-muted-foreground">
      # Commit to a bold aesthetic
    </span>,
  ]

  return (
    <div ref={ref} className="absolute inset-x-6 top-6">
      <div className="overflow-hidden rounded-2xl bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.05] dark:ring-white/[0.08]">
        <div className="flex items-center gap-1.5 border-b border-black/[0.05] px-3.5 py-2.5 dark:border-white/[0.06]">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[10.5px] text-muted-foreground">.claude/skills</span>
        </div>
        <ul className="space-y-0.5 p-2.5 font-mono text-[12px]">
          {tree.map((row, i) => (
            <motion.li
              key={row.label}
              initial={{ opacity: 0, x: -6 }}
              animate={inView ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.45, ease, delay: 0.15 + i * 0.09 }}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2 py-1.5",
                row.required ? "bg-primary/10 text-link" : "text-foreground/80",
              )}
              style={{ paddingLeft: 8 + row.depth * 18 }}
            >
              <row.icon className="size-3.5 shrink-0" />
              {row.label}
              {row.required && (
                <span className="ml-auto rounded-full bg-primary px-1.5 py-px font-sans text-[9.5px] font-semibold text-primary-foreground">
                  required
                </span>
              )}
            </motion.li>
          ))}
        </ul>
        <div className="border-t border-black/[0.05] px-4 py-3 font-mono text-[11.5px] leading-[1.75] dark:border-white/[0.06]">
          {frontmatter.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={inView ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : undefined}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 + i * 0.16 }}
              className="truncate"
            >
              {line}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── 02 · Skills sit as one‑liners until a task activates one ─────────────── */

const library = ["frontend-design", "tdd", "pdf", "web-perf", "grill-me", "supabase"]

function Disclosure() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" })
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!inView || reduce) return
    const id = setInterval(() => setActive((a) => (a + 1) % library.length), 2400)
    return () => clearInterval(id)
  }, [inView, reduce])

  return (
    <div ref={ref} className="absolute inset-x-6 top-6">
      <div className="mb-3 flex items-center gap-3 px-1 text-[11px] text-muted-foreground">
        <span className="font-medium">Context window</span>
        <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/[0.08]">
          <span className="absolute inset-y-0 left-0 w-[6%] rounded-full bg-foreground/25" />
          <motion.span
            key={active}
            className="absolute inset-y-0 left-[6%] rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: "9%" }}
            transition={{ duration: 0.6, ease }}
          />
        </span>
        <span className="font-mono tabular-nums">~2%</span>
      </div>
      <ul className="space-y-1.5">
        {library.map((name, i) => {
          const on = i === active
          return (
            <motion.li
              key={name}
              layout
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              className={cn(
                "overflow-hidden rounded-xl px-3 py-2 ring-1 transition-colors duration-500",
                on
                  ? "bg-card shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)] ring-primary/40"
                  : "bg-transparent ring-black/[0.05] dark:ring-white/[0.06]",
              )}
            >
              <motion.div layout="position" className="flex items-center gap-2 font-mono text-[12px]">
                <span className={cn("size-1.5 rounded-full transition-colors duration-500", on ? "bg-primary" : "bg-foreground/25")} />
                <span className={on ? "text-foreground" : "text-muted-foreground"}>{name}</span>
                <span className={cn("ml-auto text-[10.5px] tabular-nums", on ? "text-link" : "text-muted-foreground")}>
                  {on ? "loaded" : "~40 tok"}
                </span>
              </motion.div>
              {on && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.45, ease }}
                  className="space-y-1.5 pl-3.5 pt-2.5"
                >
                  {[92, 78, 85, 60].map((w, j) => (
                    <motion.span
                      key={j}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, ease, delay: 0.1 + j * 0.06 }}
                      className="block h-1.5 origin-left rounded-full bg-foreground/[0.12]"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}

/* ── 03 · Agents orbiting one open format ─────────────────────────────────── */

function Orbit() {
  const radius = 108
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div aria-hidden className="absolute size-[216px] rounded-full border border-dashed border-foreground/[0.12]" />
      <div aria-hidden className="absolute size-[140px] rounded-full border border-foreground/[0.06]" />
      <div
        aria-hidden
        className="absolute size-40 rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.18),transparent)] blur-xl"
      />

      <div className="relative grid size-[76px] place-items-center rounded-[22px] bg-gradient-to-br from-[#0a84ff] via-[#5e5ce6] to-[#bf5af2] text-white shadow-[0_16px_40px_-12px_rgba(94,92,230,0.6)] transition-transform duration-700 ease-apple group-hover:scale-105">
        <span className="font-mono text-[11px] font-semibold tracking-tight">SKILL.md</span>
      </div>

      <ul className="absolute size-0 animate-[orbit_48s_linear_infinite] group-hover:[animation-play-state:paused]">
        {skillAgents.map((agent, i) => {
          const angle = (360 / skillAgents.length) * i
          return (
            <li
              key={agent.name}
              className="absolute left-0 top-0"
              style={{ transform: `rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)` }}
            >
              <div className="-translate-x-1/2 -translate-y-1/2">
                <span
                  title={agent.name}
                  className="grid size-10 animate-[orbit_48s_linear_infinite_reverse] place-items-center rounded-full bg-card text-foreground shadow-[0_6px_18px_-8px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.06] group-hover:[animation-play-state:paused] dark:ring-white/[0.08]"
                >
                  <BrandIcon slug={agent.icon} name={agent.name} className="size-[18px]" />
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
