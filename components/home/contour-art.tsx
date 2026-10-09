"use client"

import { useReducedMotion } from "framer-motion"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/** Grid spacing in CSS pixels for tracing the contours. Smaller is smoother and costlier. */
const STEP = 7
const LEVELS = Array.from({ length: 22 }, (_, i) => 0.06 + i * 0.065)
/** The single contour drawn in the accent color. */
const ACCENT = 9

// Hills of the terrain, in 0..1 space. They wander slowly, so the map breathes.
const hills = [
  { x: 0.42, y: 0.4, s: 0.2, h: 1, sx: 0.05, sy: 0.04, p: 0 },
  { x: 0.72, y: 0.66, s: 0.15, h: 0.75, sx: 0.04, sy: 0.05, p: 2.1 },
  { x: 0.2, y: 0.74, s: 0.13, h: 0.55, sx: 0.05, sy: 0.03, p: 4.2 },
  { x: 0.78, y: 0.2, s: 0.11, h: 0.45, sx: 0.03, sy: 0.04, p: 1.3 },
]

/**
 * Topographic line art: contour lines traced over a slowly drifting terrain, like an engraved
 * survey map. Every fifth line is an index contour, one line carries the accent color, and the
 * ground rises gently under the cursor. Animates only while visible; still for reduced motion.
 */
export function ContourArt({ className }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = canvas.current
    const ctx = el?.getContext("2d")
    if (!el || !ctx) return

    let w = 0
    let h = 0
    let dpr = 1
    let dark = false
    let frame = 0
    let last = 0
    let visible = true
    const pointer = { x: -1, y: -1, k: 0 }
    const target = { x: -1, y: -1, k: 0 }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = el.clientWidth
      h = el.clientHeight
      el.width = Math.round(w * dpr)
      el.height = Math.round(h * dpr)
    }

    const field = (x: number, y: number, t: number) => {
      let v = 0
      for (const hill of hills) {
        const cx = hill.x + Math.sin(t / 7000 + hill.p) * hill.sx
        const cy = hill.y + Math.cos(t / 8000 + hill.p) * hill.sy
        const dx = x - cx
        const dy = y - cy
        v += hill.h * Math.exp(-(dx * dx + dy * dy) / (2 * hill.s * hill.s))
      }
      v += 0.05 * Math.sin(x * 5 + t / 9000) * Math.cos(y * 4 - t / 11000)
      if (pointer.k > 0.01) {
        const dx = x - pointer.x
        const dy = y - pointer.y
        v += 0.32 * pointer.k * Math.exp(-(dx * dx + dy * dy) / (2 * 0.07 * 0.07))
      }
      return v
    }

    const draw = (t: number) => {
      pointer.x += (target.x - pointer.x) * 0.08
      pointer.y += (target.y - pointer.y) * 0.08
      pointer.k += (target.k - pointer.k) * 0.05

      const cols = Math.ceil(w / STEP) + 1
      const rows = Math.ceil(h / STEP) + 1
      const grid = new Float32Array(cols * rows)
      const aspect = h / w
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) grid[j * cols + i] = field(i / (cols - 1), (j / (rows - 1)) * aspect, t)

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.lineJoin = "round"
      const ink = dark ? "245,245,247" : "17,17,19"

      LEVELS.forEach((level, li) => {
        const index = li % 5 === 4
        ctx.beginPath()
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const a = grid[j * cols + i]
            const b = grid[j * cols + i + 1]
            const c = grid[(j + 1) * cols + i + 1]
            const d = grid[(j + 1) * cols + i]
            const code = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (d > level ? 1 : 0)
            if (code === 0 || code === 15) continue
            const x = i * STEP
            const y = j * STEP
            // Where the contour crosses each edge of the cell, by linear interpolation.
            const top = [x + ((level - a) / (b - a)) * STEP, y] as const
            const right = [x + STEP, y + ((level - b) / (c - b)) * STEP] as const
            const bottom = [x + ((level - d) / (c - d)) * STEP, y + STEP] as const
            const left = [x, y + ((level - a) / (d - a)) * STEP] as const
            const seg = (p: readonly [number, number], q: readonly [number, number]) => {
              ctx.moveTo(p[0], p[1])
              ctx.lineTo(q[0], q[1])
            }
            switch (code) {
              case 1:
              case 14:
                seg(left, bottom)
                break
              case 2:
              case 13:
                seg(bottom, right)
                break
              case 3:
              case 12:
                seg(left, right)
                break
              case 4:
              case 11:
                seg(top, right)
                break
              case 6:
              case 9:
                seg(top, bottom)
                break
              case 7:
              case 8:
                seg(left, top)
                break
              case 5:
                seg(left, top)
                seg(bottom, right)
                break
              case 10:
                seg(left, bottom)
                seg(top, right)
                break
            }
          }
        }
        if (li === ACCENT) {
          ctx.strokeStyle = dark ? "rgba(64,156,255,0.95)" : "rgba(10,132,255,0.9)"
          ctx.lineWidth = 1.4
        } else {
          ctx.strokeStyle = `rgba(${ink},${index ? (dark ? 0.42 : 0.38) : dark ? 0.2 : 0.17})`
          ctx.lineWidth = index ? 1.15 : 0.8
        }
        ctx.stroke()
      })
    }

    // About 30 fps: smooth for slow drift, light on the battery.
    const loop = (t: number) => {
      frame = requestAnimationFrame(loop)
      if (!visible || t - last < 33) return
      last = t
      draw(t)
    }

    const readTheme = () => {
      dark = document.documentElement.classList.contains("dark")
    }

    readTheme()
    resize()
    draw(0)
    if (!reduce) frame = requestAnimationFrame(loop)

    const ro = new ResizeObserver(() => {
      resize()
      draw(performance.now())
    })
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(el)
    const mo = new MutationObserver(() => {
      readTheme()
      draw(performance.now())
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      const r = el.getBoundingClientRect()
      const inside = e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom
      target.k = inside ? 1 : 0
      if (inside) {
        target.x = (e.clientX - r.left) / r.width
        target.y = ((e.clientY - r.top) / r.height) * (r.height / r.width)
        if (pointer.k < 0.01) {
          pointer.x = target.x
          pointer.y = target.y
        }
      }
    }
    if (!reduce) window.addEventListener("pointermove", onMove, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      window.removeEventListener("pointermove", onMove)
    }
  }, [reduce])

  return <canvas ref={canvas} aria-hidden className={cn("block", className)} />
}
