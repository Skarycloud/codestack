"use client"

import { animate, useInView, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Reveal } from "@/components/motion/reveal"
import { stats } from "@/data/catalog"
import { brandMeta } from "@/data/brand-meta"
import { resources } from "@/data/resources"

const items = [
  { value: stats.tools, suffix: "+", label: "Hand‑picked tools" },
  { value: Object.keys(brandMeta).length, suffix: "", label: "Brand icons to copy" },
  { value: resources.length, suffix: "", label: "Learning resources" },
  { value: 100, suffix: "%", label: "Free & open source" },
]

export function Stats() {
  return (
    <section className="shell py-20">
      <div className="grid grid-cols-2 gap-y-12 border-y border-black/[0.06] py-14 dark:border-white/[0.07] md:grid-cols-4">
        {items.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.06} className="text-center">
            <p className="text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-none tracking-[-0.045em] tabular-nums">
              <Counter to={item.value} />
              <span className="text-muted-foreground">{item.suffix}</span>
            </p>
            <p className="mt-3 text-[14px] text-muted-foreground">{item.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(reduce ? to : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [inView, reduce, to])

  return <span ref={ref}>{value}</span>
}
