"use client"

import { Plus } from "lucide-react"
import Link from "next/link"
import { BrandIcon } from "@/components/brand-icon"
import { DragScroller } from "@/components/drag-scroller"
import { Reveal } from "@/components/motion/reveal"
import { useCommandMenu } from "@/components/site/command-menu"
import { tools } from "@/data/catalog"
import { brandMeta } from "@/data/brand-meta"
import { localModels } from "@/data/local-llms"
import { resources } from "@/data/resources"
import { phaseById, topics } from "@/data/roadmap"
import { publisherById, skills } from "@/data/skills"
import { creatorIcon } from "@/lib/model-creators"
import { cn } from "@/lib/utils"
import { useModKey } from "@/components/shortcut-key"

const iconSample = Object.keys(brandMeta).slice(12, 24)
const stackSample = ["Next.js", "Tailwind CSS", "Supabase", "Vercel"].map((n) => tools.find((t) => t.name === n)!)
const skillSample = ["frontend-design", "high-end-visual-design", "seo-audit"].map((n) => skills.find((s) => s.name === n)!).filter(Boolean)
const stepSample = ["architecture", "appsec", "performance", "deployment"].map((id) => topics.find((t) => t.id === id)!)
const modelSample = ["Gemma 3 4B", "Qwen 3 8B", "gpt-oss 20B", "Llama 3.3 70B"].map((n) => localModels.find((m) => m.name === n)!)
const maxLog = Math.log10(Math.max(...modelSample.map((m) => m.paramsB)) * 10)

type Feature = { eyebrow: string; title: string; href: string; tone: string; visual: React.ReactNode; search?: true }

const features: Feature[] = [
  {
    eyebrow: "Icon library",
    title: "Copy any logo. As SVG, JSX or PNG.",
    href: "/icons",
    tone: "bg-[#f5f5f7] dark:bg-surface",
    visual: (
      <div className="grid grid-cols-4 gap-3">
        {iconSample.map((slug) => (
          <span key={slug} className="grid aspect-square place-items-center rounded-2xl bg-white shadow-sm dark:bg-white/[0.06]">
            <BrandIcon slug={slug} name={slug} className="size-7" />
          </span>
        ))}
      </div>
    ),
  },
  {
    eyebrow: "Stack Builder",
    title: "Assemble your stack in seconds.",
    href: "/stack-builder",
    tone: "bg-[#0b0b0d] text-white dark:bg-surface",
    visual: (
      <div className="space-y-2.5">
        {stackSample.map((t, i) => (
          <div
            key={t.name}
            className="flex items-center gap-3 rounded-2xl bg-white/[0.07] px-4 py-3 ring-1 ring-inset ring-white/10"
            style={{ marginLeft: i * 14 }}
          >
            <BrandIcon slug={t.icon} name={t.name} className="size-5 text-white" />
            <span className="text-[15px] font-medium">{t.name}</span>
            <span className="ml-auto text-[12px] text-white/40">{t.kind}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    eyebrow: "Learn",
    title: "Learn from the very best teachers.",
    href: "/learn",
    tone: "bg-gradient-to-b from-[#eef4ff] to-[#f5f5f7] dark:from-[#0a1a33] dark:to-surface",
    visual: (
      <div className="space-y-2">
        {resources.slice(0, 4).map((r) => (
          <div key={r.name} className="rounded-2xl bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:bg-white/[0.06]">
            <p className="text-[14px] font-semibold tracking-[-0.01em]">{r.name}</p>
            <p className="text-[12px] text-muted-foreground">{r.author}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    eyebrow: "Agent Skills",
    title: "Teach your coding agent new tricks.",
    href: "/skills",
    tone: "bg-gradient-to-b from-[#f3efff] to-[#f5f5f7] dark:from-[#1a1433] dark:to-surface",
    visual: (
      <div className="space-y-2">
        {skillSample.map((s) => {
          const p = publisherById[s.publisher]
          return (
            <div
              key={s.name}
              className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:bg-white/[0.06]"
            >
              <BrandIcon slug={p.icon} name={p.name} className="size-5" />
              <span className="truncate font-mono text-[13px]">{s.name}</span>
              <span className="ml-auto shrink-0 text-[12px] text-muted-foreground">{p.name}</span>
            </div>
          )
        })}
        <p className="pt-1 text-center text-[12px] text-muted-foreground">For Claude Code, Codex, Cursor and more</p>
      </div>
    ),
  },
  {
    eyebrow: "Local LLMs",
    title: "Run AI on your own machine.",
    href: "/local-llms",
    tone: "bg-[#0b0b0d] text-white dark:bg-surface",
    visual: (
      <div className="space-y-3">
        {modelSample.map((m) => (
          <div key={m.name}>
            <div className="flex items-center gap-2.5 text-[14px]">
              <BrandIcon slug={creatorIcon[m.creator]} name={m.creator} className="size-4" />
              <span className="font-medium">{m.name}</span>
              <span className="ml-auto text-[12px] tabular-nums text-white/45">{m.size}</span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-white/50" style={{ width: `${(Math.log10(m.paramsB * 10) / maxLog) * 100}%` }} />
            </div>
          </div>
        ))}
        <p className="rounded-xl bg-white/[0.07] px-3 py-2 font-mono text-[12.5px] text-white/80 ring-1 ring-inset ring-white/10">
          <span className="text-white/40">$</span> ollama run gemma3:4b
        </p>
      </div>
    ),
  },
  {
    eyebrow: "Roadmap",
    title: "From idea to production, step by step.",
    href: "/roadmap",
    tone: "bg-gradient-to-b from-[#fff8e5] to-[#f5f5f7] dark:from-[#2a2106] dark:to-surface",
    visual: (
      <div className="relative">
        <span aria-hidden className="absolute bottom-5 left-[9px] top-5 w-px bg-foreground/15" />
        <div className="space-y-2.5">
          {stepSample.map((t) => (
            <div key={t.id} className="relative flex items-center gap-3">
              <span
                className="z-[1] size-[18px] shrink-0 rounded-[5px] ring-2 ring-[#f9f6ee] dark:ring-[#1c1c1e]"
                style={{ background: phaseById[t.phase].color }}
              />
              <span className="flex-1 rounded-2xl bg-white/80 px-4 py-2.5 text-[14px] font-medium shadow-sm backdrop-blur dark:bg-white/[0.06]">
                {t.title}
                <span className="ml-2 text-[12px] font-normal text-muted-foreground">{phaseById[t.phase].name}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Search",
    title: "Find anything. Instantly.",
    href: "/explore",
    tone: "bg-[#f5f5f7] dark:bg-surface",
    visual: <SearchKeys />,
    search: true,
  },
  {
    eyebrow: "Open source",
    title: "Free forever. Built with the community.",
    href: "/contribute",
    tone: "bg-gradient-to-br from-[#5e5ce6] via-[#bf5af2] to-[#ff375f] text-white",
    visual: (
      <div className="rounded-2xl bg-black/20 p-4 font-mono text-[12.5px] leading-relaxed text-white/90 backdrop-blur">
        <span className="text-white/50">$</span> git checkout -b add-my-tool
        <br />
        <span className="text-white/50">$</span> git commit -m &quot;Add Rive&quot;
        <br />
        <span className="text-white/50">$</span> gh pr create <span className="text-[#30d158]">✓</span>
      </div>
    ),
  },
]

export function FeatureCarousel() {
  const { open, prefetch } = useCommandMenu()
  return (
    <section className="overflow-hidden pb-12 pt-24 sm:pt-32">
      <Reveal className="shell">
        <h2 className="text-headline max-w-[14ch]">Get to know CodeStack.</h2>
      </Reveal>

      <DragScroller label="CodeStack features" className="mt-12" trackClassName="gap-5 pb-6 pt-2">
        {features.map((f, i) => (
          <Reveal key={f.eyebrow} delay={i * 0.05} className="shrink-0 snap-start">
            <article
              className={cn("card-lift relative flex h-[500px] w-[300px] flex-col overflow-hidden rounded-[28px] p-8 sm:w-[372px]", f.tone)}
            >
              <p className="text-[13px] font-semibold opacity-70">{f.eyebrow}</p>
              <h3 className="mt-2 text-[26px] font-semibold leading-[1.12] tracking-[-0.028em]">{f.title}</h3>
              <div className="mt-auto">{f.visual}</div>
              {f.search ? (
                // The search card opens the palette itself rather than a page.
                <button
                  onClick={open}
                  onPointerEnter={prefetch}
                  onFocus={prefetch}
                  aria-label="Open search"
                  className="absolute inset-0 z-10 rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                />
              ) : (
                <>
                  <Link
                    href={f.href}
                    aria-label={`Open ${f.eyebrow}`}
                    className="pressable absolute bottom-6 right-6 z-10 grid size-9 place-items-center rounded-full bg-foreground text-background opacity-0 shadow-lg transition-opacity duration-300 [article:hover_&]:opacity-100 focus-visible:opacity-100"
                  >
                    <Plus className="size-4" />
                  </Link>
                  <Link href={f.href} className="absolute inset-0 rounded-[inherit]" aria-hidden tabIndex={-1} />
                </>
              )}
            </article>
          </Reveal>
        ))}
      </DragScroller>
    </section>
  )
}

function SearchKeys() {
  const mod = useModKey()
  return (
    <div className="flex items-center justify-center gap-3 py-8">
      {[mod, "K"].map((k) => (
        <kbd
          key={k}
          className={cn(
            "grid h-24 min-w-24 place-items-center rounded-[22px] bg-gradient-to-b from-white to-[#e8e8ed] px-6 font-sans font-medium",
            k.length > 1 ? "text-[30px] tracking-[-0.02em]" : "text-[40px]",
            " shadow-[0_2px_0_#c7c7cc,0_10px_30px_-10px_rgba(0,0,0,0.3)] dark:from-[#2c2c2e] dark:to-[#1c1c1e] dark:shadow-[0_2px_0_#000,0_10px_30px_-10px_rgba(0,0,0,0.8)]",
          )}
        >
          {k}
        </kbd>
      ))}
    </div>
  )
}
