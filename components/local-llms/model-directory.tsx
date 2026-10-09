"use client"

import { ArrowDownWideNarrow, ArrowUpNarrowWide, ArrowUpRight, Search, X } from "lucide-react"
import { useDeferredValue, useMemo, useState } from "react"
import { BrandIcon } from "@/components/brand-icon"
import { CopyCommand } from "@/components/contribute/copy-command"
import { Segmented } from "@/components/segmented"
import { localModels, type LocalModel, type ModelCapability } from "@/data/local-llms"
import { cn } from "@/lib/utils"

const creatorIcon: Record<string, string> = {
  Google: "gemma",
  Alibaba: "qwen",
  Meta: "meta",
  DeepSeek: "deepseek",
  OpenAI: "openai",
  Microsoft: "microsoft",
  "Mistral AI": "mistralai",
  "Hugging Face": "huggingface",
  Ai2: "ai2",
  "Z.ai": "zai",
  NVIDIA: "nvidia",
  "Liquid AI": "liquid",
}

/** Rough memory needed to run a model: the weights plus room for context and the runtime. */
const memoryNeeded = (m: LocalModel) => Math.max(1, Math.ceil(m.sizeGB * 1.2))

const memoryOptions = [
  { value: "any", label: "Any" },
  { value: "8", label: "8 GB" },
  { value: "16", label: "16 GB" },
  { value: "32", label: "32 GB" },
  { value: "64", label: "64 GB" },
] as const

const capabilityLabels: Record<ModelCapability, string> = {
  vision: "Vision",
  tools: "Tools",
  thinking: "Thinking",
  audio: "Audio",
  code: "Code",
}

const maxLog = Math.log10(Math.max(...localModels.map((m) => m.paramsB)) * 10)

export function ModelDirectory() {
  const [memory, setMemory] = useState<(typeof memoryOptions)[number]["value"]>("any")
  const [capability, setCapability] = useState<ModelCapability | "all">("all")
  const [order, setOrder] = useState<"asc" | "desc">("asc")
  const [query, setQuery] = useState("")
  const deferred = useDeferredValue(query)

  const results = useMemo(() => {
    const q = deferred.trim().toLowerCase()
    const list = localModels.filter(
      (m) =>
        (memory === "any" || memoryNeeded(m) <= Number(memory)) &&
        (capability === "all" || m.capabilities.includes(capability)) &&
        (!q || `${m.name} ${m.family} ${m.creator} ${m.description}`.toLowerCase().includes(q)),
    )
    return order === "asc" ? list : [...list].reverse()
  }, [memory, capability, order, deferred])

  return (
    <>
      <div className="sticky top-14 z-30">
        <div className="glass border-y border-black/[0.06] dark:border-white/[0.07]">
          <div className="shell flex flex-col gap-3 py-3 lg:flex-row lg:items-center">
            <label className="relative flex h-10 w-full shrink-0 items-center lg:max-w-xs">
              <Search className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${localModels.length} models`}
                aria-label="Search models"
                className="h-full w-full rounded-full bg-surface-2/80 pl-10 pr-9 text-[14px] outline-none ring-1 ring-inset ring-transparent transition-shadow placeholder:text-muted-foreground focus:ring-primary/60"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 grid size-5 place-items-center rounded-full bg-foreground/20 text-background"
                >
                  <X className="size-3" />
                </button>
              )}
            </label>
            <div className="no-scrollbar -mx-5 flex items-center gap-3 overflow-x-auto px-5 lg:mx-0 lg:flex-1 lg:px-0">
              <span className="shrink-0 text-[13px] text-muted-foreground">Fits in</span>
              <Segmented size="sm" value={memory} onChange={setMemory} options={[...memoryOptions]} className="shrink-0" />
              <button
                onClick={() => setOrder((o) => (o === "asc" ? "desc" : "asc"))}
                className="pressable ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] text-muted-foreground ring-1 ring-inset ring-black/[0.08] hover:text-foreground dark:ring-white/[0.1]"
              >
                {order === "asc" ? <ArrowUpNarrowWide className="size-4" /> : <ArrowDownWideNarrow className="size-4" />}
                {order === "asc" ? "Smallest first" : "Largest first"}
              </button>
            </div>
          </div>
          <div className="shell">
            <div className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1 pb-3">
              {(["all", "vision", "tools", "thinking", "code", "audio"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCapability(c)}
                  className={cn(
                    "pressable shrink-0 rounded-full px-3.5 py-1.5 text-[13px] transition-colors",
                    capability === c
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-foreground/[0.05] hover:text-foreground",
                  )}
                >
                  {c === "all" ? "All models" : capabilityLabels[c]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="shell min-h-[60vh] pb-28 pt-10">
        <p className="mb-8 text-[14px] text-muted-foreground">
          {results.length} {results.length === 1 ? "model" : "models"}
          {memory !== "any" && ` that fit in ${memory} GB of memory`} · memory figures are estimates for the default 4-bit download.
        </p>
        {results.length === 0 ? (
          <p className="py-24 text-center text-[20px] font-semibold tracking-[-0.02em]">No models match these filters.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 [&>*]:min-w-0">
            {results.map((m) => (
              <ModelCard key={m.run} model={m} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

function ModelCard({ model: m }: { model: LocalModel }) {
  const scale = Math.max(4, (Math.log10(m.paramsB * 10) / maxLog) * 100)
  return (
    <article className="card-surface flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start gap-3.5">
        <span className="grid size-11 shrink-0 place-items-center rounded-[13px] bg-surface-2 ring-1 ring-inset ring-black/[0.04] dark:ring-white/[0.06]">
          <BrandIcon slug={creatorIcon[m.creator]} name={m.creator} className="size-[22px]" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[18px] font-semibold tracking-[-0.02em]">{m.name}</h3>
          <p className="truncate text-[13px] text-muted-foreground">
            {m.creator} · {m.license}
          </p>
        </div>
        <a
          href={m.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${m.name} on Ollama`}
          className="pressable grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-surface-2 hover:text-foreground"
        >
          <ArrowUpRight className="size-4" />
        </a>
      </div>

      <dl className="mt-5 grid grid-cols-3 divide-x divide-black/[0.06] rounded-2xl bg-surface-2/70 py-3 text-center dark:divide-white/[0.08]">
        {[
          ["Parameters", m.params.split(" ")[0]],
          ["Download", m.size],
          ["Context", m.context],
        ].map(([label, value]) => (
          <div key={label} className="px-2">
            <dt className="text-[11px] uppercase tracking-[0.06em] text-muted-foreground">{label}</dt>
            <dd className="mt-1 text-[15.5px] font-semibold tabular-nums tracking-[-0.01em]">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[12px] text-muted-foreground">
          <span>{m.activeB ? `${m.activeB}B active per token` : "Dense model"}</span>
          <span>Needs about {memoryNeeded(m)} GB RAM</span>
        </div>
        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-foreground/[0.07]" aria-hidden>
          <div className="h-full rounded-full bg-foreground/40" style={{ width: `${scale}%` }} />
        </div>
      </div>

      <p className="mt-4 flex-1 text-[14px] leading-relaxed text-muted-foreground">{m.description}</p>

      {m.capabilities.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {m.capabilities.map((c) => (
            <span key={c} className="rounded-full bg-surface-2 px-2.5 py-1 text-[12px] text-muted-foreground">
              {capabilityLabels[c]}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5">
        <CopyCommand command={m.run} />
      </div>
    </article>
  )
}
