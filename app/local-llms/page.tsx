import { ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"
import { BrandIcon } from "@/components/brand-icon"
import { ModelDirectory } from "@/components/local-llms/model-directory"
import { PageHeader } from "@/components/page-header"
import { localModels } from "@/data/local-llms"

export const metadata: Metadata = {
  title: "Local LLMs",
  description:
    "Open-weight AI models you can download and run on your own machine, from 135M to 671B parameters, with download size, context window, license and the command to run each one.",
}

const runners = [
  {
    name: "Ollama",
    label: "Recommended",
    slug: "ollama",
    href: "https://ollama.com/download",
    note: "Run any model on this page with one command.",
  },
  {
    name: "LM Studio",
    label: "Desktop app",
    slug: "lmstudio",
    href: "https://lmstudio.ai",
    note: "A desktop app to browse, download and chat.",
  },
  {
    name: "Open WebUI",
    label: "Chat interface",
    slug: "openwebui",
    href: "https://openwebui.com",
    note: "A ChatGPT-style interface for your local models.",
  },
]

export default function LocalLlmsPage() {
  const smallest = localModels[0]
  const largest = localModels[localModels.length - 1]
  return (
    <>
      <PageHeader
        eyebrow="Local LLMs"
        title="Run AI on your own machine."
        description={`${localModels.length} open-weight models, from ${smallest.name} at ${smallest.size} to ${largest.name} at ${largest.size}. Pick one that fits your memory, then run it with a single command. Private, offline and free.`}
      />

      <section className="shell pb-14">
        <div className="grid gap-4 md:grid-cols-3">
          {runners.map((r) => (
            <a
              key={r.name}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-surface card-lift group flex items-center gap-4 p-5"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-[13px] bg-surface-2">
                <BrandIcon slug={r.slug} name={r.name} className="size-[22px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12px] font-medium uppercase tracking-[0.06em] text-muted-foreground">{r.label}</span>
                <span className="block text-[16px] font-semibold tracking-[-0.015em]">{r.name}</span>
                <span className="block text-[13px] leading-snug text-muted-foreground">{r.note}</span>
              </span>
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
        <p className="mt-5 text-center text-[13.5px] text-muted-foreground">
          Install one, then pick a model below and copy its command. A model needs roughly its download size plus 20% in free RAM or GPU
          memory.
        </p>
      </section>

      <ModelDirectory />
    </>
  )
}
