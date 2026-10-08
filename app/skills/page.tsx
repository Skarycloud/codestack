import { ArrowUpRight, BadgeCheck, ShieldAlert } from "lucide-react"
import type { Metadata } from "next"
import { BrandIcon } from "@/components/brand-icon"
import { CopyCommand } from "@/components/contribute/copy-command"
import { Reveal } from "@/components/motion/reveal"
import { PageHeader } from "@/components/page-header"
import { SkillDirectory } from "@/components/skills/skill-directory"
import { SkillExplainer } from "@/components/skills/skill-explainer"
import { publishers, skillAgents, skills } from "@/data/skills"

export const metadata: Metadata = {
  title: "Agent Skills",
  description: "The best Agent Skills for Claude Code, Codex, Cursor and more, organized by field, with one‑line install commands.",
}

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Agent Skills"
        title="Teach your AI agent new tricks."
        description={`${skills.length} of the best skills for coding agents, from design taste to security audits, organized by field. Copy a command and your agent learns it.`}
      >
        <div className="mx-auto max-w-md text-left">
          <CopyCommand command="npx skills add <owner/repo>" />
        </div>
        <p className="mt-4 text-[13px] text-muted-foreground">Works with {skillAgents.map((a) => a.name).join(", ")} and more.</p>
      </PageHeader>

      <SkillExplainer />

      <SkillDirectory />

      <section className="bg-surface py-24 sm:py-28">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="text-eyebrow text-muted-foreground">Publishers</p>
            <h2 className="text-headline mt-4">Where these skills come from.</h2>
            <p className="text-lede mt-4 text-muted-foreground">
              Every skill links back to its source. Install a whole collection at once with its repository.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
            {publishers.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.05}>
                <div className="card-surface flex h-full flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-2">
                      <BrandIcon slug={p.icon} name={p.name} className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 text-[16px] font-semibold tracking-[-0.02em]">
                        {p.name}
                        {p.official && <BadgeCheck className="size-4 text-link" aria-label="Official" />}
                      </p>
                      <p className="truncate font-mono text-[12px] text-muted-foreground">{p.repo}</p>
                    </div>
                  </div>
                  <p className="mt-4 flex-1 text-[14px] leading-relaxed text-muted-foreground">{p.blurb}</p>
                  <div className="mt-5 flex items-center justify-between text-[13px]">
                    <span className="text-muted-foreground">{skills.filter((s) => s.publisher === p.id).length} listed here</span>
                    <a
                      href={`https://github.com/${p.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-0.5 font-medium text-link"
                    >
                      View repo
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-20">
        <Reveal>
          <div className="flex flex-col gap-5 rounded-[24px] border border-black/[0.06] p-7 dark:border-white/[0.08] sm:flex-row sm:items-start">
            <ShieldAlert className="size-6 shrink-0 text-[#ff9f0a]" />
            <div className="text-[14px] leading-relaxed text-muted-foreground">
              <p className="font-semibold text-foreground">Review a skill before you install it.</p>
              <p className="mt-1">
                Skills can include scripts and instructions that run with your agent&apos;s permissions. Prefer official publishers, read
                the SKILL.md, and only install from sources you trust. This list was compiled in October 2026 from the{" "}
                <a href="https://skills.sh" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">
                  skills.sh
                </a>{" "}
                leaderboard and each publisher&apos;s repository. “Popular” marks skills that ranked in the all‑time top 80 at the time.
                “Hidden gem” marks underrated, high‑quality picks we chose by hand. Want to write your own? Start with the open{" "}
                <a href="https://agentskills.io" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">
                  Agent Skills specification
                </a>
                .
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
