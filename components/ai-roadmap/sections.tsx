import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown, Lightbulb } from "lucide-react"
import Link from "next/link"
import { CopyText, PackDownload, TemplateActions } from "@/components/ai-roadmap/actions"
import { Heading } from "@/components/roadmap/roadmap-extras"
import { agentFiles, aiResources, example, habits, promptPairs, prompts, workflow } from "@/data/ai-roadmap"
import { contextCategories, contextFiles, packFiles, packs, type Priority } from "@/data/context-pack"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

// Server-rendered: everything here ships as HTML. Only the copy, download and preview
// buttons (./actions) run in the browser.

const priorityStyle: Record<Priority, { label: string; bg: string }> = {
  essential: { label: "Essential", bg: "#FFDC58" },
  recommended: { label: "Recommended", bg: "#7FBCFF" },
  conditional: { label: "Conditional", bg: "#C4A1FF" },
  optional: { label: "Optional", bg: "#E4E4E7" },
}

function PriorityTag({ p }: { p: Priority }) {
  return (
    <span
      className="shrink-0 border-2 border-black px-1.5 py-px text-[11.5px] font-bold uppercase tracking-wide text-black"
      style={{ background: priorityStyle[p].bg }}
    >
      {priorityStyle[p].label}
    </span>
  )
}

function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cn("nb-font px-4 py-20", className)}>{children}</section>
}

export function ContextPack() {
  return (
    <Section>
      <Heading eyebrow="The AI Project Context Pack" id="context-pack">
        Markdown files every <span className="nb-mark">vibecoder</span> should know
      </Heading>
      <p className="mx-auto mt-6 max-w-2xl text-center text-[17px] leading-relaxed text-[var(--nb-muted)]">
        {contextFiles.length} templates, ready to copy or download into your project. Agents build what you describe; these files are how
        you describe it once instead of in every prompt.
      </p>

      <div className="mx-auto mt-10 max-w-5xl">
        <div className="nb-box-sm nb-alt-shadow flex gap-3 bg-[var(--nb-yellow)] p-4 text-[16px] font-bold leading-snug text-black">
          <Lightbulb className="mt-0.5 size-5 shrink-0" />
          Prepare enough context to make important decisions clear, but don&apos;t create documentation merely to fill a checklist. Start
          with the Starter pack, and add a file only when the project needs what it covers.
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {packs.map((pack, i) => (
            <div key={pack.id} className="nb-box flex flex-col bg-[var(--nb-card)] p-5">
              <p className="text-[12.5px] font-bold uppercase tracking-wider text-[var(--nb-muted)]">Pack {i + 1}</p>
              <h3 className="mt-1 text-[24px] font-bold">{pack.name}</h3>
              <p className="mt-1 text-[14px] text-[var(--nb-muted)]">{pack.for}</p>
              {i > 0 && <p className="mt-4 text-[13.5px] font-bold">Everything in {packs[i - 1].name}, plus:</p>}
              <ul className={cn("flex-1 space-y-1 font-mono text-[12.5px]", i > 0 ? "mt-2" : "mt-4")}>
                {pack.files.map((f) => (
                  <li key={f} className="flex gap-1.5">
                    <span aria-hidden>·</span>
                    <a href={`#file-${slug(f)}`} className="break-all hover:underline">
                      {f}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <PackDownload id={pack.id} files={packFiles(pack.id)} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-[13.5px] text-[var(--nb-muted)]">
          Unzip into your project root. Folders like docs/ and .github/ are already in place. Delete what you don&apos;t need, then fill in
          the [placeholders], or ask your agent to with the context-planning prompt below.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 text-[13.5px]">
          <span className="font-bold">Priority:</span>
          {(Object.keys(priorityStyle) as Priority[]).map((p) => (
            <PriorityTag key={p} p={p} />
          ))}
        </div>
        <nav aria-label="File categories" className="mt-5 flex flex-wrap justify-center gap-2">
          {contextCategories.map((c) => (
            <a key={c.id} href={`#cat-${c.id}`} className="nb-box-sm nb-press bg-[var(--nb-sub)] px-3 py-1.5 text-[14px] font-bold">
              {c.letter}. {c.name}
            </a>
          ))}
        </nav>

        <div className="mt-12 space-y-14">
          {contextCategories.map((c) => (
            <div key={c.id} id={`cat-${c.id}`} className="scroll-mt-24">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center bg-black text-[18px] font-bold text-white dark:bg-[var(--nb-yellow)] dark:text-black">
                  {c.letter}
                </span>
                <h3 className="text-[24px] font-bold leading-tight">{c.name}</h3>
              </div>
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[var(--nb-muted)]">{c.blurb}</p>
              <div className="mt-5 space-y-3">
                {contextFiles
                  .filter((f) => f.category === c.id)
                  .map((f) => (
                    <details key={f.path} id={`file-${slug(f.path)}`} className="nb-box-sm group scroll-mt-24 bg-[var(--nb-card)]">
                      <summary className="flex cursor-pointer list-none items-start gap-3 p-4 [&::-webkit-details-marker]:hidden">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <code className="break-all font-mono text-[15px] font-bold">{f.path}</code>
                            <PriorityTag p={f.priority} />
                          </div>
                          <p className="mt-1.5 text-[14.5px] leading-snug">{f.purpose}</p>
                        </div>
                        <ChevronDown className="mt-1 size-5 shrink-0 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="border-t-2 border-dashed border-[var(--nb-line)] p-4">
                        <dl className="grid gap-x-8 gap-y-4 text-[14px] leading-snug sm:grid-cols-2">
                          <Field label="What to include">
                            <ul className="space-y-0.5">
                              {f.includes.map((x) => (
                                <li key={x}>→ {x}</li>
                              ))}
                            </ul>
                          </Field>
                          <Field label="When to create it">{f.when}</Field>
                          <Field label="Read automatically by">{f.autoRead}</Field>
                          <Field label="Check the agent used it">{f.verify}</Field>
                          <Field label="Depends on">
                            {f.dependsOn.length ? (
                              <span className="font-mono text-[13px]">{f.dependsOn.join(", ")}</span>
                            ) : (
                              "Nothing; write it first."
                            )}
                          </Field>
                          <Field label="Update it">{f.update}</Field>
                        </dl>
                        <div className="mt-5 flex flex-wrap items-start justify-between gap-3">
                          <TemplateActions path={f.path} />
                          <a
                            href={`${site.repo}/blob/main/content/context-pack/${f.path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[13px] font-bold underline underline-offset-2"
                          >
                            View on GitHub
                            <ArrowUpRight className="size-3.5" />
                          </a>
                        </div>
                      </div>
                    </details>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[12px] font-bold uppercase tracking-wider text-[var(--nb-muted)]">{label}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  )
}

const slug = (path: string) =>
  path
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()

const sharedSetup = `# One source of truth for every agent

AGENTS.md                         # the shared instructions (Codex, Cursor, Copilot, Claude Code)
CLAUDE.md                         # only if you need Claude-specific notes; first line: @AGENTS.md
GEMINI.md                         # only if you use Gemini CLI; first line: @AGENTS.md
.github/copilot-instructions.md   # only for Copilot chat surfaces; points to AGENTS.md

# Or let Gemini CLI read AGENTS.md directly, in .gemini/settings.json:
{ "context": { "fileName": ["AGENTS.md", "GEMINI.md"] } }`

export function AgentFiles() {
  return (
    <Section>
      <Heading eyebrow="Checked against each tool's docs" id="agents">
        Which file does <span className="nb-mark">my agent</span> read?
      </Heading>
      <p className="mx-auto mt-6 max-w-2xl text-center text-[17px] leading-relaxed text-[var(--nb-muted)]">
        No agent reads every Markdown file automatically. Each loads its own instruction files; everything else, you reference.
      </p>
      <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
        {agentFiles.map((a) => (
          <div key={a.agent} className="nb-box flex flex-col bg-[var(--nb-card)] p-5">
            <h3 className="text-[21px] font-bold">{a.agent}</h3>
            <dl className="mt-3 flex-1 space-y-3 text-[14px] leading-snug">
              <Field label="Loads automatically">
                <span className="flex flex-wrap gap-1.5">
                  {a.reads.map((r) => (
                    <code key={r} className="border-2 border-[var(--nb-line)] bg-[var(--nb-sub)] px-1.5 font-mono text-[12.5px]">
                      {r}
                    </code>
                  ))}
                </span>
              </Field>
              <Field label="Scoped rules">{a.scoped}</Field>
              <Field label="Skills">{a.skills}</Field>
              <Field label="Good to know">{a.note}</Field>
            </dl>
            <a
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-[13.5px] font-bold underline underline-offset-2"
            >
              Official docs <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        ))}
        <div className="nb-box flex flex-col bg-[var(--nb-card)] p-5">
          <h3 className="text-[21px] font-bold">Using several agents?</h3>
          <p className="mt-1 text-[14px] text-[var(--nb-muted)]">
            Keep rules in AGENTS.md and make the other files thin adapters. Copying rules into four files guarantees they drift apart.
          </p>
          <pre className="mt-4 flex-1 overflow-x-auto border-2 border-[var(--nb-line)] bg-[var(--nb-bg)] p-3 font-mono text-[12px] leading-relaxed">
            {sharedSetup}
          </pre>
          <div className="mt-3">
            <CopyText text={sharedSetup} label="setup" />
          </div>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-3xl text-center text-[13px] text-[var(--nb-muted)]">
        Tools change quickly. If something here doesn&apos;t match your version, the linked docs are the source of truth.
      </p>
    </Section>
  )
}

export function Workflow() {
  const byId = Object.fromEntries(prompts.map((p) => [p.id, p]))
  return (
    <Section>
      <Heading eyebrow="Generate the Context Pack with AI" id="workflow">
        The <span className="nb-mark">9-step</span> workflow
      </Heading>
      <p className="mx-auto mt-6 max-w-2xl text-center text-[17px] leading-relaxed text-[var(--nb-muted)]">
        Works with any coding agent. Each step has a prompt, what you should get back, and when you&apos;re done.
      </p>
      <ol className="mx-auto mt-12 max-w-3xl">
        {workflow.map((s, i) => {
          const p = s.prompt ? byId[s.prompt] : undefined
          return (
            <li key={s.title}>
              {i > 0 && <div aria-hidden className="mx-auto h-8 w-[3px] bg-[var(--nb-line)]" />}
              <div className="nb-box bg-[var(--nb-card)] p-5">
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center bg-black text-[15px] font-bold text-white dark:bg-[var(--nb-yellow)] dark:text-black">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[19px] font-bold leading-tight">{s.title}</h3>
                    <p className="mt-1 text-[14.5px] text-[var(--nb-muted)]">{s.goal}</p>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 text-[14px] sm:grid-cols-2">
                  <div className="border-2 border-[var(--nb-line)] bg-[#7FBCFF]/25 p-3">
                    <p className="text-[12px] font-bold uppercase tracking-wider">You get</p>
                    <p className="mt-1">{s.output}</p>
                  </div>
                  <div className="border-2 border-[var(--nb-line)] bg-[#5CF2C4]/25 p-3">
                    <p className="text-[12px] font-bold uppercase tracking-wider">Done when</p>
                    <p className="mt-1">{s.exit}</p>
                  </div>
                </div>
                {p ? (
                  <details className="group mt-4">
                    <summary className="flex cursor-pointer list-none items-center gap-1.5 text-[14px] font-bold [&::-webkit-details-marker]:hidden">
                      <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                      Prompt: {p.title}
                    </summary>
                    <PromptBlock text={p.prompt} label={`${p.title} prompt`} />
                  </details>
                ) : (
                  <p className="mt-4 text-[14px] font-bold">No prompt: this step is yours. Read the docs the agent wrote and decide.</p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}

function PromptBlock({ text, label }: { text: string; label: string }) {
  return (
    <div className="mt-3">
      <pre className="max-h-[360px] overflow-auto whitespace-pre-wrap border-2 border-[var(--nb-line)] bg-[var(--nb-bg)] p-3.5 font-mono text-[12.5px] leading-relaxed">
        {text}
      </pre>
      <div className="mt-2">
        <CopyText text={text} label={label} />
      </div>
    </div>
  )
}

export function Prompts() {
  return (
    <Section>
      <Heading eyebrow={`${prompts.length} copyable templates`} id="prompts">
        Prompts that ask for <span className="nb-mark">evidence</span>
      </Heading>
      <p className="mx-auto mt-6 max-w-2xl text-center text-[17px] leading-relaxed text-[var(--nb-muted)]">
        Replace the [PLACEHOLDERS]. Every template asks the agent to show what it ran and what it found, not just its conclusion.
      </p>

      <div className="mx-auto mt-12 max-w-5xl">
        <h3 className="text-[22px] font-bold">Weak vs strong</h3>
        <div className="mt-4 space-y-4">
          {promptPairs.map((pair) => (
            <div key={pair.topic} className="grid gap-3 md:grid-cols-[110px_1fr_1.6fr] md:items-stretch">
              <p className="text-[15px] font-bold md:pt-3">{pair.topic}</p>
              <div className="border-2 border-[var(--nb-line)] bg-[#FF8A8A]/30 p-3 text-[14px]">
                <p className="text-[12px] font-bold uppercase tracking-wider">Weak</p>
                <p className="mt-1">{pair.weak}</p>
              </div>
              <div className="border-2 border-[var(--nb-line)] bg-[#5CF2C4]/30 p-3 text-[14px]">
                <p className="text-[12px] font-bold uppercase tracking-wider">Strong</p>
                <p className="mt-1">{pair.strong}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-14 text-[22px] font-bold">Prompt library</h3>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {prompts.map((p) => (
            <div key={p.id} id={`prompt-${p.id}`} className="nb-box flex scroll-mt-24 flex-col bg-[var(--nb-card)] p-5">
              <h4 className="text-[18px] font-bold">{p.title}</h4>
              <p className="mt-0.5 text-[13.5px] text-[var(--nb-muted)]">{p.when}</p>
              <div className="flex-1">
                <PromptBlock text={p.prompt} label={`${p.title} prompt`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export function Example() {
  return (
    <Section>
      <Heading eyebrow="Worked example" id="example">
        From vague idea to <span className="nb-mark">verified</span> first task
      </Heading>
      <p className="mx-auto mt-6 max-w-2xl text-center text-[17px] leading-relaxed text-[var(--nb-muted)]">
        Tasklight: a small team task app with a paid plan. Small enough to follow, real enough to show the practice.
      </p>
      <ol className="mx-auto mt-12 max-w-3xl">
        {example.map((e, i) => (
          <li key={e.title}>
            {i > 0 && <ArrowDown aria-hidden className="mx-auto my-2 size-5 opacity-60" />}
            <div
              className={cn(
                "nb-box p-5",
                i === 0 ? "bg-[#FF8A8A]/30" : i === example.length - 1 ? "bg-[#5CF2C4]/30" : "bg-[var(--nb-card)]",
              )}
            >
              <h3 className="text-[18px] font-bold">{e.title}</h3>
              <pre className="mt-3 overflow-x-auto whitespace-pre-wrap font-mono text-[13px] leading-relaxed">{e.body}</pre>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export function Habits() {
  return (
    <Section>
      <Heading eyebrow="What experienced developers do differently" id="habits">
        {habits.length} habits worth <span className="nb-mark">stealing</span>
      </Heading>
      <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {habits.map((h, i) => (
          <div key={h.title} className="nb-box-sm bg-[var(--nb-card)] p-4">
            <p className="text-[12px] font-bold text-[var(--nb-muted)]">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-0.5 text-[16.5px] font-bold leading-tight">{h.title}</h3>
            <p className="mt-1.5 text-[14px] leading-snug">{h.how}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

export function Resources() {
  return (
    <Section className="pb-24">
      <Heading eyebrow="Official docs first" id="resources">
        Keep <span className="nb-mark">learning</span>
      </Heading>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {aiResources.map((g) => (
          <div key={g.group} className="nb-box bg-[var(--nb-card)] p-5">
            <h3 className="text-[18px] font-bold">{g.group}</h3>
            <ul className="mt-3 space-y-1.5 text-[14.5px]">
              {g.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 underline-offset-2 hover:underline"
                  >
                    {l.name}
                    <ArrowUpRight className="size-3.5 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-3">
        <Link
          href="/roadmap"
          className="nb-box nb-press inline-flex items-center gap-2 bg-[var(--nb-card)] px-5 py-2.5 text-[15px] font-bold"
        >
          The full developer roadmap <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/skills"
          className="nb-box nb-press inline-flex items-center gap-2 bg-[var(--nb-card)] px-5 py-2.5 text-[15px] font-bold"
        >
          Agent skills <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/local-llms"
          className="nb-box nb-press inline-flex items-center gap-2 bg-[var(--nb-card)] px-5 py-2.5 text-[15px] font-bold"
        >
          Local LLMs <ArrowRight className="size-4" />
        </Link>
      </div>
    </Section>
  )
}
