import type { Metadata } from "next"
import { Balsamiq_Sans } from "next/font/google"
import { AiChart, AiIntro } from "@/components/ai-roadmap/ai-chart"
import { AgentFiles, ContextPack, Example, Habits, Prompts, Resources, Workflow } from "@/components/ai-roadmap/sections"
import { ProgressProvider } from "@/components/roadmap/progress"
import { aiTopics, prompts } from "@/data/ai-roadmap"
import { contextFiles } from "@/data/context-pack"
import { topicIds } from "@/data/roadmap"
import { site } from "@/lib/site"

const balsamiq = Balsamiq_Sans({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-balsamiq", display: "swap" })

const description =
  "A roadmap for building real software with AI coding agents like Codex, Claude Code, Copilot, Cursor and Gemini CLI: prompting, context files, requirements, architecture, data, APIs, testing, security and deployment, with a downloadable Context Pack of Markdown templates and copyable prompts."

export const metadata: Metadata = {
  title: "AI Coding Roadmap: Vibecode Like an Engineer",
  description,
  alternates: { canonical: "/roadmap/ai-coding" },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "AI-Assisted Development and Vibecoding Roadmap",
  description,
  url: `${site.url}/roadmap/ai-coding`,
  learningResourceType: "Roadmap",
  educationalLevel: ["Beginner", "Intermediate", "Advanced"],
  isAccessibleForFree: true,
  author: { "@type": "Person", name: site.author, url: site.socials.portfolio },
  hasPart: aiTopics.map((t) => ({ "@type": "LearningResource", name: t.title, description: t.summary })),
}

const checks = aiTopics.reduce((n, t) => n + topicIds(t).length, 0)

export default function AiCodingRoadmapPage() {
  return (
    <ProgressProvider storageKey="codestack:ai-roadmap:v1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={`nb ${balsamiq.variable}`}>
        <header className="px-4 pb-6 pt-32 text-center sm:pt-40">
          <p className="nb-font mx-auto w-fit border-2 border-[var(--nb-line)] bg-[var(--nb-card)] px-3 py-1 text-[13px] font-bold uppercase tracking-wider">
            AI-assisted development and vibecoding
          </p>
          <h1 className="mx-auto mt-6 max-w-4xl text-[42px] font-black uppercase leading-[0.98] tracking-[-0.04em] sm:text-[72px]">
            Vibecode like an <span className="nb-mark">engineer</span>
          </h1>
          <p className="nb-font mx-auto mt-6 max-w-2xl text-[18px] leading-relaxed text-[var(--nb-muted)] sm:text-[20px]">
            From prompting an AI to a repeatable workflow that ships real software. {aiTopics.length} levels, {checks} checks,{" "}
            {contextFiles.length} context-file templates and {prompts.length} prompts. Works with Codex, Claude Code, Copilot, Cursor,
            Gemini CLI and other agents.
          </p>
          <AiIntro />
        </header>
        <AiChart />
        <ContextPack />
        <AgentFiles />
        <Workflow />
        <Prompts />
        <Example />
        <Habits />
        <Resources />
      </div>
    </ProgressProvider>
  )
}
