import { ArrowUpRight } from "lucide-react"
import { BrandIcon } from "@/components/brand-icon"
import type { Tool } from "@/data/catalog"

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <a href={tool.url} target="_blank" rel="noopener noreferrer" className="card-surface card-lift group flex h-full flex-col p-5">
      <div className="flex items-start justify-between">
        <span className="grid size-12 place-items-center rounded-[14px] bg-surface-2/80 ring-1 ring-inset ring-black/[0.04] transition-transform duration-500 ease-apple group-hover:scale-[1.06] dark:ring-white/[0.05]">
          <BrandIcon slug={tool.icon} name={tool.name} className="size-6" />
        </span>
        <span className="grid size-7 place-items-center rounded-full text-muted-foreground opacity-0 transition-all duration-300 ease-apple group-hover:bg-surface-2 group-hover:opacity-100">
          <ArrowUpRight className="size-3.5" />
        </span>
      </div>
      <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.02em]">{tool.name}</h3>
      <p className="mt-1 flex-1 text-[14px] leading-relaxed text-muted-foreground">{tool.description}</p>
      {tool.free && (
        <p className="mt-3 rounded-xl bg-[#30d158]/[0.08] px-3 py-2 text-[12.5px] leading-snug text-foreground/80">
          <span className="font-semibold text-[#166d2f] dark:text-[#30d158]">Free: </span>
          {tool.free}
        </p>
      )}
      <div className="mt-5 flex flex-wrap items-center gap-1.5 text-[12px]">
        <span className="shrink-0 whitespace-nowrap rounded-full bg-surface-2 px-2.5 py-1 text-muted-foreground">{tool.kind}</span>
        {tool.openSource && (
          <span className="shrink-0 whitespace-nowrap rounded-full bg-[#30d158]/[0.12] px-2.5 py-1 text-[#166d2f] dark:text-[#30d158]">
            Open source
          </span>
        )}
        {tool.paid && (
          <span className="shrink-0 whitespace-nowrap rounded-full bg-[#ff9f0a]/[0.12] px-2.5 py-1 text-[#8f5000] dark:text-[#ff9f0a]">
            Paid
          </span>
        )}
        {tool.freemium && <span className="shrink-0 whitespace-nowrap rounded-full bg-link/[0.1] px-2.5 py-1 text-link">Free + Pro</span>}
      </div>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}
