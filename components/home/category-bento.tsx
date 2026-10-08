"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { BrandIcon } from "@/components/brand-icon"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { categories, toolsIn, type CategoryId } from "@/data/catalog"
import { cn } from "@/lib/utils"

const layout: { id: CategoryId; span: string }[] = [
  { id: "design-tools", span: "md:col-span-2 md:row-span-2" },
  { id: "frameworks", span: "md:col-span-2" },
  { id: "inspiration", span: "" },
  { id: "databases", span: "" },
  { id: "typography", span: "" },
  { id: "ai", span: "" },
  { id: "icons", span: "" },
  { id: "color", span: "" },
  { id: "motion", span: "md:col-span-2" },
  { id: "devtools", span: "md:col-span-2" },
]

export function CategoryBento() {
  return (
    <section className="shell py-24 sm:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-eyebrow text-muted-foreground">Categories</p>
        <h2 className="text-headline mt-4">
          Curated by craft.
          <br />
          <span className="text-muted-foreground">Organised for flow.</span>
        </h2>
      </Reveal>

      <RevealGroup className="mt-16 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 [&>*]:min-w-0">
        {layout.map(({ id, span }) => {
          return (
            <RevealItem key={id} className={span}>
              <BentoCard id={id} large={span.includes("row-span-2")} />
            </RevealItem>
          )
        })}
      </RevealGroup>

      <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
        {categories
          .filter((c) => !layout.some((l) => l.id === c.id))
          .map((c) => (
            <Link
              key={c.id}
              href={`/explore?c=${c.id}`}
              className="pressable rounded-full bg-surface px-4 py-2 text-[14px] text-muted-foreground ring-1 ring-inset ring-black/[0.04] hover:text-foreground dark:ring-white/[0.06]"
            >
              {c.name} <span className="tabular-nums font-normal">{toolsIn(c.id).length}</span>
            </Link>
          ))}
      </Reveal>
    </section>
  )
}

function BentoCard({ id, large }: { id: CategoryId; large: boolean }) {
  const category = categories.find((c) => c.id === id)!
  const items = [...toolsIn(id)].sort((a, b) => Number(!!b.icon) - Number(!!a.icon))
  const shown = items.slice(0, large ? 10 : 4)

  return (
    <Link href={`/explore?c=${id}`} className="group block h-full">
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="card-surface card-lift relative flex h-full flex-col justify-between overflow-hidden p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-eyebrow text-muted-foreground">
              {category.alsoFor ? "Design + Develop" : category.audience === "design" ? "Design" : "Develop"}
            </p>
            <h3 className={cn("mt-2 font-semibold tracking-[-0.025em]", large ? "text-[32px] leading-[1.05]" : "text-[22px]")}>
              {category.name}
            </h3>
            <p className="mt-1.5 text-[14px] text-muted-foreground">{category.tagline}</p>
          </div>
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-2 text-muted-foreground transition-all duration-500 ease-apple group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        {large ? (
          <div className="mt-6 grid w-full grid-cols-4 gap-3 sm:grid-cols-5">
            {shown.map((t, i) => (
              <motion.span
                key={t.name}
                variants={{ rest: { y: 0, rotate: 0 }, hover: { y: -4, rotate: i % 2 ? 3 : -3 } }}
                transition={{ type: "spring", bounce: 0.35, duration: 0.6, delay: i * 0.02 }}
                className="grid aspect-square place-items-center rounded-[20px] bg-surface-2/80 text-muted-foreground ring-1 ring-inset ring-black/[0.04] dark:ring-white/[0.05]"
              >
                <BrandIcon slug={t.icon} name={t.name} className="size-7 text-foreground" />
              </motion.span>
            ))}
          </div>
        ) : (
          <div className="flex items-end justify-between">
            <div className="flex -space-x-2">
              {shown.map((t, i) => (
                <motion.span
                  key={t.name}
                  variants={{ rest: { x: 0 }, hover: { x: i * 8 } }}
                  transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                  className="grid size-10 place-items-center rounded-full bg-card ring-2 ring-card shadow-sm"
                  style={{ zIndex: shown.length - i }}
                >
                  <span className="grid size-full place-items-center rounded-full bg-surface-2 text-foreground">
                    <BrandIcon slug={t.icon} name={t.name} className="size-[18px]" />
                  </span>
                </motion.span>
              ))}
            </div>
            <span className="text-[13px] tabular-nums text-muted-foreground">{toolsIn(id).length} tools</span>
          </div>
        )}
      </motion.div>
    </Link>
  )
}
