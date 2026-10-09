import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import { Balsamiq_Sans } from "next/font/google"
import Link from "next/link"
import { ProgressProvider } from "@/components/roadmap/progress"
import { RoadmapChart } from "@/components/roadmap/roadmap-chart"
import { Levels, Loops, RoadmapIntro, ShipChecklist, Tips } from "@/components/roadmap/roadmap-extras"
import { aiTopics, prompts } from "@/data/ai-roadmap"
import { contextFiles } from "@/data/context-pack"
import { topicIds, topics } from "@/data/roadmap"
import { site } from "@/lib/site"

// The hand-drawn face roadmap.sh uses for its charts. Loaded only on this page.
const balsamiq = Balsamiq_Sans({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-balsamiq", display: "swap" })

const description =
  "A step-by-step, language-agnostic roadmap from idea to production: design, UX, architecture, AI-assisted development, security, testing, performance, SEO, GEO, observability and open source, with a checklist for every step."

export const metadata: Metadata = {
  title: "Developer Roadmap 2026",
  description,
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "Modern Developer Roadmap 2026",
  description,
  url: `${site.url}/roadmap`,
  learningResourceType: "Roadmap",
  educationalLevel: ["Beginner", "Intermediate", "Advanced"],
  isAccessibleForFree: true,
  author: { "@type": "Person", name: site.author, url: site.socials.portfolio },
  hasPart: topics.map((t) => ({ "@type": "LearningResource", name: t.title, description: t.summary })),
}

const checks = topics.reduce((n, t) => n + topicIds(t).length, 0)

export default function RoadmapPage() {
  return (
    <ProgressProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={`nb ${balsamiq.variable}`}>
        <header className="px-4 pb-6 pt-32 text-center sm:pt-40">
          <p className="nb-font mx-auto w-fit border-2 border-[var(--nb-line)] bg-[var(--nb-card)] px-3 py-1 text-[13px] font-bold uppercase tracking-wider">
            Developer roadmap 2026
          </p>
          <h1 className="mx-auto mt-6 max-w-4xl text-[44px] font-black uppercase leading-[0.98] tracking-[-0.04em] sm:text-[76px]">
            From idea to <span className="nb-mark">production</span>
          </h1>
          <p className="nb-font mx-auto mt-6 max-w-2xl text-[18px] leading-relaxed text-[var(--nb-muted)] sm:text-[20px]">
            {topics.length} steps, {checks} checks, one path. For any language or framework. AI agents help along the way, but never skip
            the checks.
          </p>
          <RoadmapIntro />
          <AiRoadmapCard />
        </header>
        <RoadmapChart />
        <Loops />
        <Levels />
        <ShipChecklist />
        <Tips />
      </div>
    </ProgressProvider>
  )
}

/** The way into the separate AI coding roadmap, kept off the main path on purpose. */
function AiRoadmapCard() {
  return (
    <Link
      href="/roadmap/ai-coding"
      className="nb-font nb-box nb-press group mx-auto mt-8 flex max-w-3xl flex-col gap-4 bg-[#C4A1FF] p-5 text-left text-black sm:flex-row sm:items-center sm:p-6"
    >
      <div className="flex-1">
        <p className="w-fit border-2 border-black bg-white px-2 py-0.5 text-[12px] font-bold uppercase tracking-wider">
          Separate roadmap · for vibecoders
        </p>
        <h2 className="mt-3 text-[24px] font-bold leading-tight sm:text-[28px]">Building with AI coding agents?</h2>
        <p className="mt-1.5 text-[15px] leading-snug">
          Prompting, context files, AGENTS.md and CLAUDE.md, testing and security for Codex, Claude Code, Copilot and Cursor.{" "}
          {aiTopics.length} levels, {contextFiles.length} downloadable Markdown templates and {prompts.length} copyable prompts.
        </p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-2 self-start border-2 border-black bg-black px-4 py-2.5 text-[15px] font-bold text-white sm:self-center">
        Open the AI roadmap
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}
