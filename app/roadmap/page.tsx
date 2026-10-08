import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ProgressProvider } from "@/components/roadmap/progress"
import { RoadmapChart } from "@/components/roadmap/roadmap-chart"
import { AiLoop, Levels, OptimizeLoop, PhaseStrip, RoadmapLegend, ShipChecklist, Tips } from "@/components/roadmap/roadmap-extras"
import { topics } from "@/data/roadmap"
import { site } from "@/lib/site"

const description =
  "A step-by-step, language-agnostic roadmap from idea to production: architecture, AI-assisted development, security, testing, performance, SEO, GEO, observability and open source, with checklists for every step."

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

export default function RoadmapPage() {
  return (
    <ProgressProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader
        eyebrow="Developer Roadmap 2026"
        title="From idea to production."
        description={`${topics.length} steps to secure, accessible, fast and discoverable software, for any language or framework. AI agents work throughout, but never skip the gates.`}
      >
        <PhaseStrip />
      </PageHeader>

      <RoadmapLegend />
      <RoadmapChart />
      <AiLoop />
      <OptimizeLoop />
      <Levels />
      <ShipChecklist />
      <Tips />
    </ProgressProvider>
  )
}
