import { ArrowRight, Check, Github } from "lucide-react"
import Link from "next/link"
import { Reveal } from "@/components/motion/reveal"
import { brandMeta } from "@/data/brand-meta"
import { stats } from "@/data/catalog"
import { localModels } from "@/data/local-llms"
import { resources } from "@/data/resources"
import { skills } from "@/data/skills"
import { display, serif } from "@/lib/fonts"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

// Server-rendered: the counts below are read from the data at build time and ship as HTML.

const points = [
  "Add a tool by editing one line of TypeScript",
  "Every link and free tier checked by hand",
  "No account, no paywall, free forever",
  "Brand icons, templates and prompts to reuse",
  "Light and dark, fast and accessible",
]

const catalog = [
  { name: "Tools", count: stats.tools },
  { name: "Brand icons", count: Object.keys(brandMeta).length },
  { name: "Learning resources", count: resources.length },
  { name: "Agent skills", count: skills.length },
  { name: "Local models", count: localModels.length },
]

/** Ink border and hard offset shadow, matching the hero's neobrutalist pieces. */
const ink = "border-2 border-black bg-background shadow-[5px_5px_0_0_#000] dark:border-[#d4d4d8] dark:shadow-[5px_5px_0_0_#FFDC58]"
const press =
  "inline-flex h-12 items-center gap-2 border-2 border-black px-5 text-[15px] font-semibold transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"

export function OpenSourceCta() {
  return (
    <section className="shell pb-28 pt-8">
      <Reveal>
        <div className="grid items-center gap-12 overflow-hidden rounded-[28px] [&>*]:min-w-0 border border-black/[0.08] bg-background px-6 py-12 sm:px-12 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 dark:border-white/[0.1] dark:bg-surface">
          <div>
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Open source &amp; community</p>
            <h2 className={cn(display.className, "mt-4 text-[clamp(2.25rem,4.4vw,3.6rem)] leading-[1.02] tracking-[-0.035em]")}>
              Built in the open.
              <span className={cn(serif.className, "block text-[1.08em] tracking-[-0.02em] text-muted-foreground")}>Shaped by you.</span>
            </h2>
            <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-muted-foreground">
              CodeStack is free and community-driven. Every tool, icon and course lives in plain TypeScript files, so adding one is a single
              pull request.
            </p>
            <ul className="mt-8 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px] leading-snug">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-foreground text-background">
                    <Check className="size-3" strokeWidth={3.5} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={site.repo}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  press,
                  "bg-black text-white shadow-[5px_5px_0_0_#FFDC58] hover:shadow-[7px_7px_0_0_#FFDC58] dark:border-white dark:bg-white dark:text-black",
                )}
              >
                <Github className="size-[18px]" />
                Star on GitHub
              </a>
              <Link
                href="/contribute"
                className={cn(
                  press,
                  "bg-background shadow-[5px_5px_0_0_#000] hover:shadow-[7px_7px_0_0_#000] dark:border-[#d4d4d8] dark:shadow-[5px_5px_0_0_#FFDC58] dark:hover:shadow-[7px_7px_0_0_#FFDC58]",
                )}
              >
                How to contribute
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <Mockup />
        </div>
      </Reveal>
    </section>
  )
}

/** A pull request adding a tool, with a terminal and the live catalog floating over it. */
function Mockup() {
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-[560px] pb-[7.5rem] pt-14 sm:pt-12">
      {/* Base: the diff */}
      <div className="overflow-hidden rounded-xl border border-black/[0.1] bg-[#fbfbfa] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] dark:border-white/[0.1] dark:bg-[#141416]">
        <div className="flex items-center gap-2 border-b border-black/[0.08] px-4 py-2.5 text-[12px] dark:border-white/[0.08]">
          <span className="rounded-full bg-[#1f883d] px-2 py-0.5 text-[11px] font-semibold text-white">Open</span>
          <span className="font-semibold">Add your favorite tool</span>
          <span className="ml-auto font-mono text-[11px] text-muted-foreground">+1 −0</span>
        </div>
        <div className="border-b border-black/[0.06] px-4 py-2 font-mono text-[11.5px] text-muted-foreground dark:border-white/[0.06]">
          data/catalog.ts
        </div>
        <pre className="overflow-hidden py-2 font-mono text-[11.5px] leading-[1.75]">
          <Line n={669} text={'  { name: "Motion", url: "https://motion.dev", … },'} />
          <Line n={670} text={'  { name: "GSAP", url: "https://gsap.com", … },'} />
          <Line n={671} text={'  { name: "Rive", url: "https://rive.app", … },'} />
          <Line n={672} add text={'+ { name: "[Your tool]", url: "https://…", kind: "…", … },'} />
          <Line n={673} text={'  { name: "LottieFiles", url: "https://lottiefiles.com", … },'} />
          <Line n={674} text={'  { name: "Three.js", url: "https://threejs.org", … },'} />
        </pre>
      </div>

      {/* Floating: the catalog, top right */}
      <div className={cn(ink, "absolute -top-2 right-0 w-[230px] p-3.5 sm:-right-4 sm:top-0")}>
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Catalog
          <span className="border border-black/20 px-1.5 font-mono text-[10.5px] tracking-normal dark:border-white/20">live</span>
        </div>
        <ul className="mt-2.5 space-y-1.5">
          {catalog.map((c) => (
            <li
              key={c.name}
              className="flex items-center justify-between border border-black/[0.12] px-2.5 py-1.5 text-[13.5px] dark:border-white/[0.12]"
            >
              {c.name}
              <span className="font-mono text-[11.5px] tabular-nums text-muted-foreground">{c.count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Floating: the terminal, bottom left */}
      <div className={cn(ink, "absolute bottom-0 left-0 w-[330px] max-w-[92%] sm:-left-4")}>
        <div className="flex items-center gap-1.5 border-b-2 border-black px-3 py-2 dark:border-[#d4d4d8]">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[11.5px] text-muted-foreground">terminal</span>
        </div>
        <div className="space-y-1 px-3.5 py-3 font-mono text-[12px] leading-relaxed">
          <p>
            <span className="text-muted-foreground">$</span> git checkout -b add-my-tool
          </p>
          <p>
            <span className="text-muted-foreground">$</span> git commit -m &quot;Add my tool&quot;
          </p>
          <p>
            <span className="text-muted-foreground">$</span> gh pr create
          </p>
          <p className="text-[#1f883d] dark:text-[#3fb950]">✓ Pull request opened</p>
        </div>
      </div>
    </div>
  )
}

function Line({ n, text, add, muted }: { n: number; text: string; add?: boolean; muted?: boolean }) {
  return (
    <span className={cn("flex", add && "bg-[#dafbe1] dark:bg-[#1f883d]/25")}>
      <span className="w-10 shrink-0 select-none pr-3 text-right text-muted-foreground/60">{n}</span>
      <span className={cn("truncate pr-4", add && "text-[#116329] dark:text-[#3fb950]", muted && "text-muted-foreground")}>{text}</span>
    </span>
  )
}
