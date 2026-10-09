"use client"

import { animate, useInView, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Reveal } from "@/components/motion/reveal"

/** Counts come from the server (lib/home-samples.ts), so the data files stay off the client. */
export function Stats({ items }: { items: { value: number; suffix: string; label: string }[] }) {
  return (
    <section className="shell py-20">
      <div className="grid grid-cols-2 gap-y-12 border-y border-black/[0.06] py-14 dark:border-white/[0.07] md:grid-cols-5">
        {items.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.06} className="text-center last:col-span-2 md:last:col-span-1">
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
