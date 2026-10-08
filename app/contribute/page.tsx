import {
  ArrowUpRight,
  Check,
  GitPullRequest,
  Github,
  HeartHandshake,
  Lightbulb,
  MessageCircle,
  Paintbrush,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { CopyCommand } from "@/components/contribute/copy-command"
import { Reveal } from "@/components/motion/reveal"
import { PageHeader } from "@/components/page-header"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contribute",
  description: "Add a tool, fix a link or improve the design. CodeStack is built by its community.",
}

const ways = [
  {
    icon: Lightbulb,
    tint: "bg-[#ff9f0a]/[0.12] text-[#c27400] dark:text-[#ff9f0a]",
    title: "Suggest a tool",
    body: "Know something great that's missing? Open an issue with a link and one line on why people love it. No code needed.",
    cta: "Open an issue",
    href: `${site.repo}/issues/new`,
  },
  {
    icon: GitPullRequest,
    tint: "bg-primary/[0.12] text-link",
    title: "Add it yourself",
    body: "Add the entry straight to the catalog. It's a single file, and most pull requests take under five minutes.",
    cta: "See the steps",
    href: "#steps",
  },
  {
    icon: Paintbrush,
    tint: "bg-[#bf5af2]/[0.12] text-[#9a3fd0] dark:text-[#bf5af2]",
    title: "Polish the site",
    body: "Fix a bug, sharpen a description, improve accessibility or refine a detail of the design. Every bit counts.",
    cta: "Browse issues",
    href: `${site.repo}/issues`,
  },
]

const steps = [
  {
    title: "Fork and clone",
    body: "Fork the repository on GitHub, then clone your fork and install dependencies.",
    commands: [`git clone ${site.repo}.git`, "npm install"],
  },
  {
    title: "Create a branch",
    body: "Keep each pull request focused on one change. It makes review fast.",
    commands: ["git checkout -b add-rive"],
  },
  {
    title: "Add your entry",
    body: "Add the tool to data/catalog.ts. If it has a logo on Simple Icons, set its slug and regenerate the icon set.",
    commands: ["npm run icons", "npm run typecheck"],
  },
  {
    title: "Open a pull request",
    body: "Push your branch and open a PR. Tell us why the tool deserves a spot; we review every one by hand.",
    commands: ["git push origin add-rive"],
  },
]

const dos = [
  "Genuinely useful and actively maintained",
  "The official URL, without tracking parameters",
  "A short, factual description in plain language",
  "The category where people would look for it first",
]
const donts = [
  "Affiliate or referral links",
  "Marketing slogans and superlatives",
  "Abandoned or paywalled‑only projects",
  "Duplicates of an existing entry",
]

const values = [
  { icon: HeartHandshake, title: "Be kind", body: "Use welcoming, inclusive language. Assume good intent." },
  { icon: Users, title: "Be open", body: "Respect differing viewpoints, experience levels and backgrounds." },
  { icon: MessageCircle, title: "Be constructive", body: "Give and accept feedback gracefully. Critique work, never people." },
  { icon: ShieldCheck, title: "Be safe", body: "Harassment of any kind is not tolerated, in any project space." },
]

export default function ContributePage() {
  return (
    <>
      <PageHeader
        eyebrow="Contribute"
        title="Built by people like you."
        description="CodeStack is free and open source. Suggest a tool, add one yourself or help polish the details."
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`${site.repo}/issues/new`}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground hover:brightness-110"
          >
            <Sparkles className="size-4" /> Suggest a tool
          </a>
          <a
            href={site.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable inline-flex h-11 items-center gap-2 rounded-full bg-surface-2 px-6 text-[15px] font-medium hover:bg-foreground/10"
          >
            <Github className="size-[18px]" /> View on GitHub
          </a>
        </div>
      </PageHeader>

      {/* Three ways to help */}
      <section className="shell grid gap-4 pb-28 pt-6 md:grid-cols-3 [&>*]:min-w-0">
        {ways.map((way, i) => {
          const external = way.href.startsWith("http")
          return (
            <Reveal key={way.title} delay={i * 0.06}>
              <a
                href={way.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="card-surface card-lift group flex h-full flex-col p-7"
              >
                <span className={`grid size-12 place-items-center rounded-[14px] ${way.tint}`}>
                  <way.icon className="size-[22px]" />
                </span>
                <h2 className="mt-6 text-[21px] font-semibold tracking-[-0.025em]">{way.title}</h2>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted-foreground">{way.body}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-[14px] font-medium text-link">
                  {way.cta}
                  <ArrowUpRight className="size-4 transition-transform duration-300 ease-apple group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </Reveal>
          )
        })}
      </section>

      {/* Steps */}
      <section id="steps" className="scroll-mt-20 bg-surface py-24 sm:py-32">
        <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="text-eyebrow text-link">Add a tool</p>
              <h2 className="text-headline mt-4">Four steps. About five minutes.</h2>
              <p className="text-lede mt-5 text-muted-foreground">
                Every tool lives in a single, typed file. Here's what an entry looks like.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="mt-10">
              <div className="overflow-hidden rounded-[20px] bg-[#0b0b0d] text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
                <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-3 font-mono text-[11px] text-white/45">data/catalog.ts</span>
                </div>
                <pre className="no-scrollbar overflow-x-auto py-5 font-mono text-[12.5px] leading-[1.75]">
                  <span className="inline-block min-w-full">
                    <Line>
                      <span className="text-white/35">{"// Motion"}</span>
                    </Line>
                    <Line added>{"{"}</Line>
                    <Line added indent>
                      <Key>name</Key>: <Str>&quot;Rive&quot;</Str>,
                    </Line>
                    <Line added indent>
                      <Key>url</Key>: <Str>&quot;https://rive.app&quot;</Str>,
                    </Line>
                    <Line added indent>
                      <Key>description</Key>: <Str>&quot;Interactive, real‑time animations.&quot;</Str>,
                    </Line>
                    <Line added indent>
                      <Key>kind</Key>: <Str>&quot;Interactive&quot;</Str>,
                    </Line>
                    <Line added indent>
                      <Key>category</Key>: <Str>&quot;motion&quot;</Str>,
                    </Line>
                    <Line added indent>
                      <Key>icon</Key>: <Str>&quot;rive&quot;</Str>,
                    </Line>
                    <Line added>{"},"}</Line>
                  </span>
                </pre>
              </div>
            </Reveal>
          </div>

          <div className="relative">
            <span
              aria-hidden
              className="absolute bottom-8 left-[19px] top-8 w-px bg-gradient-to-b from-primary/50 via-border to-transparent"
            />
            <ol className="relative space-y-6">
              {steps.map((step, i) => (
                <li key={step.title}>
                  <Reveal delay={i * 0.06} className="relative flex gap-5">
                    <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-background text-[14px] font-semibold text-link ring-1 ring-primary/40">
                      {i + 1}
                    </span>
                    <div className="card-surface min-w-0 flex-1 p-6">
                      <h3 className="text-[19px] font-semibold tracking-[-0.022em]">{step.title}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{step.body}</p>
                      <div className="mt-5 space-y-2">
                        {step.commands.map((c) => (
                          <CopyCommand key={c} command={c} />
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="shell py-24 sm:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow text-muted-foreground">Guidelines</p>
          <h2 className="text-headline mt-4">What makes a great entry.</h2>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-2 [&>*]:min-w-0">
          <Reveal>
            <div className="card-surface h-full p-7">
              <p className="text-[15px] font-semibold">Please include</p>
              <ul className="mt-5 space-y-3.5">
                {dos.map((d) => (
                  <li key={d} className="flex gap-3 text-[15px] text-muted-foreground">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#30d158] text-white">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="card-surface h-full p-7">
              <p className="text-[15px] font-semibold">Please avoid</p>
              <ul className="mt-5 space-y-3.5">
                {donts.map((d) => (
                  <li key={d} className="flex gap-3 text-[15px] text-muted-foreground">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-foreground/[0.12] text-foreground/70">
                      <X className="size-3" strokeWidth={3} />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Code of conduct */}
      <section id="conduct" className="shell scroll-mt-20 pb-24">
        <Reveal>
          <div className="rounded-[32px] bg-surface p-8 sm:p-14">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
              <div>
                <p className="text-eyebrow text-muted-foreground">Code of conduct</p>
                <h2 className="text-title mt-4">A welcoming place for everyone.</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  We pledge to make participation in CodeStack a harassment‑free experience for everyone, regardless of background or
                  experience.
                </p>
              </div>
              <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                {values.map((v) => (
                  <div key={v.title}>
                    <v.icon className="size-5 text-link" />
                    <p className="mt-3 text-[16px] font-semibold tracking-[-0.015em]">{v.title}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{v.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Closing CTA */}
      <section className="shell pb-28 text-center">
        <Reveal>
          <h2 className="text-headline mx-auto max-w-[16ch] text-balance">Your first pull request starts here.</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
            <a
              href={`${site.repo}/issues?q=is%3Aopen+label%3A%22good+first+issue%22`}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-[15px] font-medium text-background hover:opacity-90"
            >
              Good first issues
            </a>
            <Link href="/explore" className="group inline-flex items-center gap-1 text-[15px] text-link">
              See what&apos;s already listed
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}

function Line({ children, added, indent }: { children: React.ReactNode; added?: boolean; indent?: boolean }) {
  return (
    <span className={`block whitespace-pre px-5 ${added ? "bg-[#30d158]/[0.1] text-white/90" : ""}`}>
      <span className={`inline-block w-4 select-none ${added ? "text-[#30d158]" : "text-transparent"}`}>{added ? "+" : " "}</span>
      {indent ? "  " : ""}
      {children}
    </span>
  )
}

function Key({ children }: { children: string }) {
  return <span className="text-[#64d2ff]">{children}</span>
}

function Str({ children }: { children: React.ReactNode }) {
  return <span className="text-[#ffd60a]">{children}</span>
}
