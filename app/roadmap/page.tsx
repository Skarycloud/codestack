import type { Metadata } from "next"
import { Balsamiq_Sans } from "next/font/google"
import { ProgressProvider } from "@/components/roadmap/progress"
import { RoadmapChart } from "@/components/roadmap/roadmap-chart"
import { Levels, Loops, RoadmapIntro, ShipChecklist, Tips } from "@/components/roadmap/roadmap-extras"
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
