"use client"

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion"
import { BrandIcon } from "@/components/brand-icon"
import { tools } from "@/data/catalog"
import { cn } from "@/lib/utils"

const wallTools = Array.from(new Map(tools.filter((t) => t.icon).map((t) => [t.icon, t])).values())

const COLUMNS = 9
const PER_COLUMN = 7
const columns = Array.from({ length: COLUMNS }, (_, c) =>
  Array.from({ length: PER_COLUMN }, (_, r) => wallTools[(c * 13 + r * 5) % wallTools.length]),
)

/**
 * A tilted plane of app‑icon tiles drifting in alternating columns. Scrolling
 * flattens the plane toward the viewer; the pointer casts a soft spotlight.
 */
export function IconWall({ progress }: { progress: MotionValue<number> }) {
  const reduce = useReducedMotion()
  const rotateX = useTransform(progress, [0, 0.55], [reduce ? 0 : 30, 0])
  const scale = useTransform(progress, [0, 0.55], [reduce ? 1 : 0.92, 1.08])
  const y = useTransform(progress, [0, 1], [0, reduce ? 0 : -140])

  const mx = useMotionValue(50)
  const my = useMotionValue(40)
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, hsl(var(--primary) / 0.16), transparent 70%)`

  return (
    <div
      aria-hidden
      className="relative mt-16 h-[520px] sm:mt-20 sm:h-[640px] [perspective:1400px]"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(((e.clientX - r.left) / r.width) * 100)
        my.set(((e.clientY - r.top) / r.height) * 100)
      }}
    >
      <motion.div
        style={{ rotateX, scale, y, transformOrigin: "50% 0%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.6 }}
        className="absolute inset-x-0 top-0 mx-auto flex h-[760px] max-w-[1400px] justify-center gap-4 sm:gap-5 [mask-image:radial-gradient(ellipse_62%_70%_at_50%_30%,#000_35%,transparent_78%)] [transform-style:preserve-3d]"
      >
        {columns.map((col, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 flex-col gap-4 sm:gap-5",
              i % 2 ? "animate-scroll-down" : "animate-scroll-up",
              i === 0 || i === COLUMNS - 1 ? "hidden lg:flex" : i === 1 || i === COLUMNS - 2 ? "hidden sm:flex" : "flex",
            )}
            style={{ ["--duration" as string]: `${46 + (i % 3) * 9}s`, marginTop: i % 2 ? 0 : 56 }}
          >
            {[...col, ...col].map((tool, j) => (
              <Tile key={j} slug={tool.icon} name={tool.name} />
            ))}
          </div>
        ))}
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}

function Tile({ slug, name }: { slug?: string; name: string }) {
  return (
    <div className="relative grid size-[76px] place-items-center rounded-[22px] bg-tile shadow-[0_1px_1px_rgba(0,0,0,0.04),0_10px_30px_-12px_rgba(0,0,0,0.22)] ring-1 ring-inset ring-black/[0.05] dark:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.9)] dark:ring-white/[0.07] sm:size-[92px] sm:rounded-[26px]">
      <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/60 to-transparent opacity-70 dark:from-white/[0.06]" />
      <BrandIcon slug={slug} name={name} className="relative size-8 sm:size-10" />
    </div>
  )
}
