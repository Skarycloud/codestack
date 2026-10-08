import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { BrandIcon } from "@/components/brand-icon"
import { Reveal } from "@/components/motion/reveal"
import { stats, tools } from "@/data/catalog"

const pick = (...names: string[]) => names.map((n) => tools.find((t) => t.name === n)!).filter(Boolean)

const swatches = ["#0A84FF", "#5E5CE6", "#BF5AF2", "#FF375F", "#FF9F0A", "#30D158"]

export function Audiences() {
  return (
    <section className="shell grid gap-5 py-8 md:grid-cols-2 [&>*]:min-w-0">
      <Reveal>
        <div className="noise relative flex h-[560px] flex-col overflow-hidden rounded-[32px] bg-surface p-9 text-center sm:p-12">
          <p className="text-eyebrow text-[#7d2fb0] dark:text-[#d79cff]">For designers</p>
          <h2 className="text-title mx-auto mt-4 max-w-[16ch]">Type, color, icons and endless inspiration.</h2>
          <Links href="/explore?a=design" count={stats.designers} label="Explore design" />

          <div className="relative mx-auto mt-auto w-full max-w-sm">
            <div className="card-surface relative mx-auto rounded-[24px] p-5 text-left">
              <div className="flex items-baseline justify-between">
                <span className="text-[56px] font-semibold leading-none tracking-[-0.05em]">Aa</span>
                <span className="font-mono text-[11px] text-muted-foreground">Inter · 650</span>
              </div>
              <div className="mt-5 flex gap-1.5">
                {swatches.map((c) => (
                  <span key={c} className="h-9 flex-1 rounded-lg" style={{ background: c }} />
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2">
                {pick("Figma", "Framer", "Dribbble", "Behance", "Blender").map((t) => (
                  <span key={t.name} className="grid size-9 place-items-center rounded-xl bg-surface-2">
                    <BrandIcon slug={t.icon} name={t.name} className="size-[18px]" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="relative flex h-[560px] flex-col overflow-hidden rounded-[32px] bg-[#0b0b0d] p-9 text-center text-white sm:p-12 dark:bg-surface">
          <p className="text-eyebrow text-[#2997ff]">For developers</p>
          <h2 className="text-title mx-auto mt-4 max-w-[16ch]">Frameworks, data and the tools to ship.</h2>
          <Links href="/explore?a=develop" count={stats.developers} label="Explore code" dark />

          <div className="relative mx-auto mt-auto w-full max-w-sm overflow-hidden rounded-[20px] bg-white/[0.06] text-left ring-1 ring-white/10">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-[11px] text-white/40">~/my-app</span>
            </div>
            <pre className="no-scrollbar overflow-x-auto px-4 py-4 font-mono text-[11.5px] leading-[1.8] text-white/70 sm:text-[12.5px]">
              <span className="text-[#30d158]">❯</span> npx create-next-app@latest{"\n"}
              <span className="text-white/40">✔ TypeScript · Tailwind · App Router</span>{"\n"}
              <span className="text-[#30d158]">❯</span> npm i drizzle-orm @neondatabase/serverless{"\n"}
              <span className="text-[#30d158]">❯</span> vercel deploy <span className="animate-pulse">▍</span>
            </pre>
            <div className="flex items-center gap-2 px-4 pb-4">
              {pick("Next.js", "TypeScript", "Tailwind CSS", "Drizzle", "Vercel").map((t) => (
                <span key={t.name} className="grid size-9 place-items-center rounded-xl bg-white/[0.07] text-white">
                  <BrandIcon slug={t.icon} name={t.name} className="size-[18px]" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Links({ href, count, label, dark }: { href: string; count: number; label: string; dark?: boolean }) {
  return (
    <div className="mt-6 flex items-center justify-center gap-6 text-[15px]">
      <Link href={href} className="pressable rounded-full bg-primary px-5 py-2 font-medium text-primary-foreground hover:brightness-110">
        {label}
      </Link>
      <Link href={href} className={`group inline-flex items-center gap-0.5 ${dark ? "text-[#2997ff]" : "text-link"}`}>
        {count} tools
        <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    </div>
  )
}
