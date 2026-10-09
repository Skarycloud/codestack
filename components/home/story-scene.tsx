"use client"

import { useReducedMotion } from "framer-motion"
import { useEffect, useId, useRef } from "react"
import { cn } from "@/lib/utils"

/*
 * From idea to launch: an isometric diorama in six stations. A small package travels a track
 * past each one (blueprint, design, code, AI, servers) and ends in a rocket that lifts off.
 * Each station comes alive while the package is there. Hovering a station pauses the trip on it.
 *
 * Drawing: every face is a flat panel mapped into the isometric view with one SVG matrix, so
 * detail (a screen, a sheet, a rack) is drawn in plain 2D coordinates on its face.
 */

// Projection: world units, x down-right, y down-left, z up.
const U = 48
const OX = 246
const OY = 74
const CX = Math.cos(Math.PI / 6) * U
const CY = 0.5 * U
const P = (x: number, y: number, z = 0): [number, number] => [OX + (x - y) * CX, OY + (x + y) * CY - z * U]
const pts = (...p: [number, number][]) => p.map((q) => q.map((n) => n.toFixed(1)).join(",")).join(" ")

/** Flat 2D drawing onto a face: "top" (u along x, v along y), "left" (u along x, v up), "right" (u along y, v up). */
function Face({
  kind,
  at,
  children,
  className,
}: {
  kind: "top" | "left" | "right"
  at: [number, number, number]
  children: React.ReactNode
  className?: string
}) {
  const [px, py] = P(...at)
  const m = kind === "top" ? [CX, CY, -CX, CY] : kind === "left" ? [CX, CY, 0, -U] : [-CX, CY, 0, -U]
  return (
    <g className={className} transform={`matrix(${m.map((n) => n.toFixed(3)).join(" ")} ${px.toFixed(1)} ${py.toFixed(1)})`}>
      {children}
    </g>
  )
}

type Shade = readonly [string, string, string]

/** A solid block: its top and the two faces toward the viewer, shaded like daylight from the upper left. */
function Box({ x, y, z = 0, w, d, h, c }: { x: number; y: number; z?: number; w: number; d: number; h: number; c: Shade }) {
  return (
    <g strokeLinejoin="round" stroke="rgba(0,0,0,0.14)" strokeWidth={0.6}>
      <polygon points={pts(P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h))} fill={c[1]} />
      <polygon points={pts(P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h))} fill={c[2]} />
      <polygon points={pts(P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h))} fill={c[0]} />
    </g>
  )
}

const wood: Shade = ["#D8A877", "#B8875C", "#9E6F48"]
const legs: Shade = ["#8F5F3D", "#7C5133", "#6A452C"]
const slate: Shade = ["#454B54", "#363B42", "#2B2F35"]
const steel: Shade = ["#CBD1D8", "#9BA4AF", "#808994"]
const graphite: Shade = ["#4C535D", "#363B43", "#2C3036"]
const concrete: Shade = ["#D3CEC6", "#BAB4AB", "#A69F95"]

// The six stations on a 3 × 2 board of tiles, in story order. [i, j] is the tile.
const T = 2.6
const STATIONS = [
  { name: "Blueprint", tile: [0, 0] },
  { name: "Design", tile: [1, 0] },
  { name: "Code", tile: [2, 0] },
  { name: "AI", tile: [2, 1] },
  { name: "Servers", tile: [1, 1] },
  { name: "Launch", tile: [0, 1] },
] as const

// The track: along the front of the back row, round the right end, back along the front row.
const BACK_Y = 1.95
const FRONT_Y = T + 1.95
const TURN_X = 2 * T + 2.05
const PATH: [number, number][] = [
  [1.2, BACK_Y],
  [T + 1.2, BACK_Y],
  [2 * T + 1.2, BACK_Y],
  [TURN_X, BACK_Y],
  [TURN_X, FRONT_Y],
  [2 * T + 1.2, FRONT_Y],
  [T + 1.2, FRONT_Y],
  [1.2, FRONT_Y],
]
const STOPS = [0, 1, 2, 5, 6, 7] // where on PATH each station's stop is
const SEG = PATH.slice(1).map((p, k) => Math.hypot(p[0] - PATH[k][0], p[1] - PATH[k][1]))
const AT = PATH.map((_, k) => SEG.slice(0, k).reduce((a, b) => a + b, 0))
const along = (s: number): [number, number] => {
  for (let k = 0; k < SEG.length; k++) {
    if (s <= AT[k + 1] || k === SEG.length - 1) {
      const t = Math.min(1, Math.max(0, (s - AT[k]) / SEG[k]))
      return [PATH[k][0] + (PATH[k + 1][0] - PATH[k][0]) * t, PATH[k][1] + (PATH[k + 1][1] - PATH[k][1]) * t]
    }
  }
  return PATH[0]
}

// The loop, in seconds: dwell at a station, travel to the next; then load, launch and reset.
const DWELL = 1.25
const MOVE = 0.75
const LAUNCH_AT = 5 * (DWELL + MOVE) + 0.5
const LAUNCH = 2.2
const LOOP = LAUNCH_AT + LAUNCH + 1.6
/** Screen offset from the idea at the launch stop to the rocket's window. */
const INTO: [number, number] = (() => {
  const stop = P(1.2, FRONT_Y, 0.32)
  const pad = P(1.15, T + 1.05, 0.14)
  return [pad[0] - stop[0], pad[1] - 70 - stop[1]]
})()
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)

export function StoryScene({ className, caption }: { className?: string; caption: string }) {
  const reduce = useReducedMotion()
  const root = useRef<SVGSVGElement>(null)
  const pkg = useRef<SVGGElement>(null)
  const layerBack = useRef<SVGGElement>(null)
  const layerFront = useRef<SVGGElement>(null)
  const rocket = useRef<SVGGElement>(null)
  const flame = useRef<SVGGElement>(null)
  const smoke = useRef<SVGGElement>(null)
  const readout = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const svg = root.current
    if (!svg) return
    // In story order. The DOM holds them in painting order, which differs, so look each up by name.
    const stations = STATIONS.map((st) => svg.querySelector<SVGGElement>(`[data-st="${st.name.toLowerCase()}"]`)!)
    let active = -1
    const setActive = (k: number) => {
      if (k === active) return
      active = k
      stations.forEach((g, i) => (i === k || (reduce && k < 0) ? g.setAttribute("data-on", "") : g.removeAttribute("data-on")))
      if (readout.current) readout.current.textContent = k < 0 ? "Idea to launch" : `0${k + 1} · ${STATIONS[k].name}`
    }

    /** The idea at distance s along the track, plus an extra screen offset (its float into the rocket). */
    const placePackage = (s: number, visible: number, extra: [number, number] = [0, 0], bob = 0) => {
      const [x, y] = along(s)
      const [sx, sy] = P(x, y, 0)
      const [bx, by] = P(1.2, BACK_Y, 0)
      const g = pkg.current
      if (!g) return
      g.setAttribute("transform", `translate(${(sx - bx + extra[0]).toFixed(2)} ${(sy - by + extra[1]).toFixed(2)})`)
      g.style.opacity = String(visible)
      g.style.setProperty("--bob", `${bob.toFixed(2)}px`)
      // Painter's order: behind the front row's objects while on the back row, in front after.
      const layer = y > BACK_Y + 0.4 ? layerFront.current : layerBack.current
      if (layer && g.parentNode !== layer) layer.append(g)
    }

    const placeRocket = (lift: number, fire: number, puff: number, alpha: number) => {
      rocket.current?.setAttribute("transform", `translate(0 ${(-lift).toFixed(1)})`)
      if (rocket.current) rocket.current.style.opacity = String(alpha)
      if (flame.current) flame.current.style.opacity = String(fire)
      if (smoke.current) {
        smoke.current.style.opacity = String(puff * 0.9)
        smoke.current.setAttribute("transform", `scale(${(0.6 + puff * 0.7).toFixed(3)})`)
      }
    }

    // Reduced motion: one still, complete scene, with every station shown at work.
    if (reduce) {
      placePackage(AT[STOPS[2]], 1)
      placeRocket(0, 0, 0, 1)
      setActive(-1)
      return
    }

    let t = 0
    let last = 0
    let frame = 0
    let paused = false
    let visible = true

    const draw = () => {
      // Where the story is: at a station, between two, or at the launch.
      const cycle = DWELL + MOVE
      const bob = Math.sin(t * 3.4) * 1.8
      if (t < LAUNCH_AT) {
        const k = Math.min(5, Math.floor(t / cycle))
        const inside = t - k * cycle
        if (k >= 5 || inside < DWELL) {
          setActive(Math.min(5, k))
          placePackage(AT[STOPS[Math.min(5, k)]], 1, [0, 0], bob)
        } else {
          setActive(-1)
          const p = ease((inside - DWELL) / MOVE)
          placePackage(AT[STOPS[k]] + (AT[STOPS[k + 1]] - AT[STOPS[k]]) * p, 1, [0, 0], bob)
        }
        placeRocket(0, 0, 0, 1)
      } else {
        setActive(5)
        const p = (t - LAUNCH_AT) / LAUNCH
        // The idea floats up into the rocket's window, then the rocket goes.
        const q = ease(Math.min(1, p / 0.16))
        placePackage(AT[STOPS[5]], 1 - Math.min(1, Math.max(0, (p - 0.13) / 0.06)), [INTO[0] * q, INTO[1] * q])
        if (p <= 1) {
          const rise = p < 0.18 ? 0 : (p - 0.18) / 0.82
          placeRocket(rise * rise * 460, Math.min(1, p * 6), Math.min(1, p * 2.5) * (1 - rise), 1 - Math.max(0, rise - 0.75) * 4)
        } else {
          // Reset: a fresh rocket fades in on the pad.
          placeRocket(0, 0, 0, Math.min(1, (t - LAUNCH_AT - LAUNCH) / 0.8))
        }
      }
    }

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0
      last = now
      if (paused || !visible) return
      t = (t + dt) % LOOP
      draw()
    }
    draw()
    frame = requestAnimationFrame(tick)

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      last = 0
    })
    io.observe(svg)

    // Hovering a station pauses the trip and shows that station at work.
    const hits = [...svg.querySelectorAll<SVGPolygonElement>("[data-hit]")]
    const enter = (k: number) => () => {
      paused = true
      setActive(k)
    }
    const handlers = hits.map((h, k) => {
      const fn = enter(k)
      h.addEventListener("pointerenter", fn)
      return () => h.removeEventListener("pointerenter", fn)
    })
    const leave = () => {
      paused = false
      last = 0
      draw()
    }
    svg.addEventListener("pointerleave", leave)

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      handlers.forEach((off) => off())
      svg.removeEventListener("pointerleave", leave)
    }
  }, [reduce])

  const tiles = STATIONS.map((s) => s.tile)
  const tileTop = ([i, j]: readonly [number, number]) => {
    const x = i * T
    const y = j * T
    return pts(P(x, y), P(x + 2.4, y), P(x + 2.4, y + 2.4), P(x, y + 2.4))
  }

  return (
    <figure className={className}>
      <svg
        ref={root}
        viewBox="0 0 600 420"
        role="img"
        aria-label="From idea to launch: a package travels past blueprint, design, code, AI and server stations, then lifts off on a rocket."
        className="story block h-auto w-full select-none overflow-visible"
      >
        {/* Ground shadow and the six tiles, back to front. */}
        <ellipse cx={P(3.9, 2.5)[0]} cy={P(3.9, 2.5)[1] + 34} rx={262} ry={78} className="fill-black/[0.045] dark:fill-black/40" />
        {[...tiles]
          .sort((a, b) => a[0] + a[1] - (b[0] + b[1]))
          .map(([i, j]) => (
            <g key={`${i}${j}`} className="story-tile">
              <Box x={i * T} y={j * T} z={-0.32} w={2.4} d={2.4} h={0.32} c={["var(--st-top)", "var(--st-left)", "var(--st-right)"]} />
            </g>
          ))}

        {/* The track. */}
        <polyline
          points={pts(...PATH.map(([x, y]) => P(x, y, 0.01)))}
          className="story-rail"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points={pts(...PATH.map(([x, y]) => P(x, y, 0.01)))}
          className="story-rail-dash"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Back row: blueprint, design, code. */}
        <Station k={0}>
          <Blueprint x={0} y={0} />
        </Station>
        <Station k={1}>
          <Design x={T} y={0} />
        </Station>
        <Station k={5}>
          <Launch x={0} y={T} rocket={rocket} flame={flame} smoke={smoke} />
        </Station>
        <Station k={2}>
          <Code x={2 * T} y={0} />
        </Station>
        <g ref={layerBack}>
          <g ref={pkg}>
            <Idea />
          </g>
        </g>
        <Station k={4}>
          <Servers x={T} y={T} />
        </Station>
        <Station k={3}>
          <AI x={2 * T} y={T} />
        </Station>
        <g ref={layerFront} />

        {/* Hit areas: each tile's top, invisible, on top of everything. */}
        {STATIONS.map((s) => (
          <polygon key={s.name} data-hit points={tileTop(s.tile)} fill="transparent" className="cursor-default" />
        ))}
      </svg>
      <figcaption className="mt-1 hidden justify-between font-mono text-[11.5px] uppercase tracking-[0.08em] text-muted-foreground/70 lg:flex">
        <span>
          Fig. 01 · <span ref={readout}>Idea to launch</span>
        </span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  )
}

function Station({ k, children }: { k: number; children: React.ReactNode }) {
  return <g data-st={STATIONS[k].name.toLowerCase()}>{children}</g>
}

/** A desk: wooden top on four legs. */
function Desk({ x, y, w = 1.8, d = 1.2, h = 0.55 }: { x: number; y: number; w?: number; d?: number; h?: number }) {
  const l = 0.08
  return (
    <g>
      <Box x={x + 0.06} y={y + 0.06} w={l} d={l} h={h} c={legs} />
      <Box x={x + w - 0.14} y={y + 0.06} w={l} d={l} h={h} c={legs} />
      <Box x={x + 0.06} y={y + d - 0.14} w={l} d={l} h={h} c={legs} />
      <Box x={x + w - 0.14} y={y + d - 0.14} w={l} d={l} h={h} c={legs} />
      <Box x={x} y={y} z={h} w={w} d={d} h={0.08} c={wood} />
    </g>
  )
}

/** 02 · Design: a drawing tablet with a canvas, swatches and a sticky note. */
function Design({ x, y }: { x: number; y: number }) {
  const dx = x + 0.3
  const dy = y + 0.3
  const top = 0.63
  return (
    <g>
      <Desk x={dx} y={dy} />
      <Box x={dx + 0.25} y={dy + 0.15} z={top} w={1.0} d={0.72} h={0.04} c={slate} />
      <Face kind="top" at={[dx + 0.31, dy + 0.21, top + 0.041]}>
        <rect width={0.88} height={0.6} rx={0.03} fill="#F8F5EF" />
        <g className="story-pop">
          <circle cx={0.24} cy={0.22} r={0.13} fill="#E07A5F" style={{ "--i": 0 } as React.CSSProperties} />
          <rect x={0.44} y={0.1} width={0.34} height={0.2} rx={0.03} fill="#81B29A" style={{ "--i": 1 } as React.CSSProperties} />
          <rect x={0.1} y={0.42} width={0.68} height={0.08} rx={0.03} fill="#3D405B" style={{ "--i": 2 } as React.CSSProperties} />
        </g>
      </Face>
      <Box x={dx + 1.08} y={dy + 0.2} z={top} w={0.05} d={0.6} h={0.05} c={["#E9E4DA", "#CFC8BB", "#B9B1A3"]} />
      {[
        ["#E07A5F", 0.2],
        ["#F2CC8F", 0.42],
        ["#81B29A", 0.64],
      ].map(([c, o]) => (
        <Box
          key={c as string}
          x={dx + 1.42}
          y={dy + (o as number)}
          z={top}
          w={0.2}
          d={0.16}
          h={0.03}
          c={[c as string, c as string, c as string]}
        />
      ))}
      <Face kind="top" at={[dx + 0.25, dy + 0.94, top + 0.005]}>
        <rect width={0.26} height={0.22} fill="#F7E08A" transform="rotate(-8 0.13 0.11)" />
      </Face>
    </g>
  )
}

/** 01 · Blueprint: a drafting table with a blueprint that draws its own plan. */
function Blueprint({ x, y }: { x: number; y: number }) {
  const dx = x + 0.3
  const dy = y + 0.3
  const top = 0.63
  return (
    <g>
      <Desk x={dx} y={dy} />
      <Face kind="top" at={[dx + 0.12, dy + 0.1, top + 0.002]}>
        <rect width={1.42} height={0.98} fill="#2F5F8F" />
        <path
          d={
            Array.from({ length: 13 }, (_, k) => `M${0.1 * (k + 1)} 0V0.98`).join("") +
            Array.from({ length: 9 }, (_, k) => `M0 ${0.1 * (k + 1)}H1.42`).join("")
          }
          stroke="#DCE8F5"
          strokeOpacity={0.18}
          strokeWidth={0.5}
          vectorEffect="non-scaling-stroke"
        />
        <g fill="none" stroke="#EAF2FB" strokeWidth={1.1} className="story-wire">
          <path vectorEffect="non-scaling-stroke" pathLength={1} d="M0.12 0.1H1.3V0.88H0.12Z" />
          <path vectorEffect="non-scaling-stroke" pathLength={1} d="M0.12 0.26H1.3" />
          <path vectorEffect="non-scaling-stroke" pathLength={1} d="M0.2 0.36H0.62V0.78H0.2Z" />
          <path vectorEffect="non-scaling-stroke" pathLength={1} d="M0.72 0.36H1.22V0.54H0.72Z" />
          <path vectorEffect="non-scaling-stroke" pathLength={1} d="M0.72 0.62H1.22M0.72 0.7H1.1" />
        </g>
      </Face>
      <Box x={dx + 0.12} y={dy + 1.0} z={top} w={1.3} d={0.1} h={0.03} c={["#E7C88F", "#C9A66A", "#B08E55"]} />
      <Box x={dx + 1.62} y={dy + 0.18} z={top} w={0.05} d={0.62} h={0.05} c={["#F2C94C", "#D4A92E", "#B78F20"]} />
    </g>
  )
}

/** 03 · Code: a workstation whose screen types, a keyboard and a mug. */
function Code({ x, y }: { x: number; y: number }) {
  const dx = x + 0.3
  const dy = y + 0.3
  const top = 0.63
  const lines: [number, number, string][] = [
    [0.06, 0.32, "#C59CD9"],
    [0.14, 0.42, "#7FB3D5"],
    [0.14, 0.26, "#A8D08D"],
    [0.22, 0.36, "#F2A65A"],
    [0.14, 0.3, "#7FB3D5"],
    [0.06, 0.18, "#C59CD9"],
  ]
  return (
    <g>
      <Desk x={dx} y={dy} />
      <Box x={dx + 0.82} y={dy + 0.28} z={top} w={0.16} d={0.12} h={0.18} c={slate} />
      <Box x={dx + 0.3} y={dy + 0.3} z={top + 0.16} w={1.15} d={0.06} h={0.72} c={slate} />
      <Face kind="left" at={[dx + 0.36, dy + 0.361, top + 0.22]}>
        <rect width={1.03} height={0.6} fill="#1E232B" />
        <g className="story-type">
          {lines.map(([indent, len, c], i) => (
            <rect
              key={i}
              x={indent}
              y={0.08 + i * 0.085}
              width={len}
              height={0.035}
              rx={0.015}
              fill={c}
              style={{ "--i": i } as React.CSSProperties}
            />
          ))}
        </g>
      </Face>
      <Box x={dx + 0.42} y={dy + 0.72} z={top} w={0.86} d={0.26} h={0.03} c={["#E3DED5", "#C9C2B6", "#B4AC9F"]} />
      <g>
        <Box x={dx + 1.5} y={dy + 0.66} z={top} w={0.16} d={0.16} h={0.18} c={["#F1EDE5", "#D86F57", "#BE5C46"]} />
      </g>
    </g>
  )
}

/** 04 · AI: a GPU supercomputer cabinet with fans and a status strip. */
function AI({ x, y }: { x: number; y: number }) {
  // Set left of the track's corner, so the idea stays in view at the code stop behind it.
  const bx = x + 0.22
  const by = y + 0.5
  const w = 1.25
  const d = 0.92
  const h = 1.7
  return (
    <g>
      <Box x={bx} y={by} w={w} d={d} h={h} c={graphite} />
      <Face kind="left" at={[bx + 0.08, by + d + 0.001, 0.1]}>
        <rect width={w - 0.16} height={h - 0.22} rx={0.02} fill="#252930" />
        {Array.from({ length: 6 }, (_, k) => (
          <rect key={k} x={0.06} y={0.08 + k * 0.17} width={w - 0.28} height={0.11} rx={0.015} fill="#3A4049" />
        ))}
        <rect x={0.06} y={1.17} width={w - 0.28} height={0.035} rx={0.015} fill="#5ED3B6" className="story-glow" />
        {[0.32, 0.92].map((cx) => (
          <g key={cx} transform={`translate(${cx} 1.42)`}>
            <circle r={0.17} fill="#1C2026" stroke="#4A515B" strokeWidth={0.8} vectorEffect="non-scaling-stroke" />
            <g className="story-spin">
              {[0, 60, 120].map((a) => (
                <ellipse key={a} rx={0.14} ry={0.035} fill="#5A626D" transform={`rotate(${a})`} />
              ))}
            </g>
          </g>
        ))}
      </Face>
      <Face kind="top" at={[bx + 0.2, by + 0.15, h + 0.001]}>
        {Array.from({ length: 5 }, (_, k) => (
          <rect key={k} x={0} y={k * 0.14} width={w - 0.4} height={0.05} rx={0.02} fill="#3A4049" />
        ))}
      </Face>
      <Face kind="right" at={[bx + w + 0.001, by + 0.12, 0.25]}>
        {Array.from({ length: 7 }, (_, k) => (
          <rect key={k} x={0} y={k * 0.18} width={0.76} height={0.05} rx={0.02} fill="#24282E" />
        ))}
      </Face>
    </g>
  )
}

/** 05 · Servers: three racks with blinking drive lights. */
function Servers({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {[0.22, 0.82, 1.42].map((ox, r) => (
        <g key={ox}>
          <Box x={x + ox} y={y + 0.32} w={0.54} d={0.92} h={1.52} c={steel} />
          <Face kind="left" at={[x + ox + 0.04, y + 1.241, 0.08]}>
            <rect width={0.46} height={1.36} fill="#5C6570" />
            {Array.from({ length: 8 }, (_, k) => (
              <g key={k}>
                <rect x={0.03} y={0.05 + k * 0.165} width={0.4} height={0.13} rx={0.01} fill="#454D57" />
                <circle
                  cx={0.33}
                  cy={0.115 + k * 0.165}
                  r={0.018}
                  fill={k % 3 === 1 ? "#F2B84B" : "#6BD49A"}
                  className="story-led"
                  style={{ "--d": `${((k * 7 + r * 3) % 9) * 110}ms` } as React.CSSProperties}
                />
                <rect x={0.07} y={0.105 + k * 0.165} width={0.18} height={0.02} fill="#2E343C" />
              </g>
            ))}
          </Face>
        </g>
      ))}
    </g>
  )
}

/** 06 · Launch: a pad, a gantry and a rocket that lifts off. */
function Launch({
  x,
  y,
  rocket,
  flame,
  smoke,
}: {
  x: number
  y: number
  rocket: React.RefObject<SVGGElement | null>
  flame: React.RefObject<SVGGElement | null>
  smoke: React.RefObject<SVGGElement | null>
}) {
  const [cx, cy] = P(x + 1.15, y + 1.05, 0.14)
  return (
    <g>
      <Box x={x + 0.35} y={y + 0.25} w={1.6} d={1.6} h={0.14} c={concrete} />
      <Face kind="top" at={[x + 1.15, y + 1.05, 0.141]}>
        <circle r={0.52} fill="none" stroke="#9E978C" strokeWidth={1} strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
      </Face>
      {/* The gantry: a steel tower with cross bracing, and an arm toward the rocket. */}
      <Box x={x + 1.72} y={y + 0.5} z={0.14} w={0.16} d={0.16} h={2.3} c={["#C9564A", "#A9443A", "#8E382F"]} />
      <Face kind="left" at={[x + 1.72, y + 0.661, 0.2]}>
        <path
          d={Array.from({ length: 7 }, (_, k) => `M0 ${k * 0.32}L0.16 ${k * 0.32 + 0.16}L0 ${k * 0.32 + 0.32}`).join("")}
          fill="none"
          stroke="#6E2C25"
          strokeWidth={0.8}
          vectorEffect="non-scaling-stroke"
        />
      </Face>
      <Box x={x + 1.3} y={y + 0.58} z={1.7} w={0.42} d={0.06} h={0.05} c={["#C9564A", "#A9443A", "#8E382F"]} />
      {/* Smoke and the rocket, drawn in screen space: a rocket looks the same from any side. */}
      <g transform={`translate(${cx.toFixed(1)} ${cy.toFixed(1)})`}>
        <g ref={smoke} style={{ opacity: 0 }}>
          <circle cx={-22} cy={2} r={14} fill="#EAE6DE" />
          <circle cx={20} cy={4} r={16} fill="#E2DDD4" />
          <circle cx={0} cy={8} r={18} fill="#EFEBE4" />
        </g>
        <g ref={rocket}>
          <g ref={flame} style={{ opacity: 0 }}>
            <path d="M-7 -6 Q0 34 7 -6 Z" fill="#F4A259" />
            <path d="M-4 -6 Q0 20 4 -6 Z" fill="#FBE29F" />
          </g>
          <path d="M-9 -6 L9 -6 L7 -14 L-7 -14 Z" fill="#5E646C" />
          <path d="M-12 -14 L-24 4 L-12 -2 Z" fill="#C9564A" />
          <path d="M12 -14 L24 4 L12 -2 Z" fill="#A9443A" />
          <rect x={-12} y={-100} width={24} height={88} rx={4} fill="#F6F3EC" stroke="rgba(0,0,0,0.12)" strokeWidth={0.6} />
          <rect x={2} y={-100} width={10} height={88} rx={3} fill="#E4DFD5" />
          <path d="M-12 -98 Q-12 -122 0 -134 Q12 -122 12 -98 Z" fill="#C9564A" />
          <path d="M3 -98 Q12 -110 12 -98 Z M0 -134 Q12 -122 12 -98 L3 -98 Q6 -118 0 -134 Z" fill="#A9443A" />
          <rect x={-12} y={-30} width={24} height={5} fill="#C9564A" />
          <circle cy={-70} r={6.5} fill="#5B7A99" stroke="#D9D3C8" strokeWidth={2} />
          <circle cx={-2} cy={-72} r={2} fill="#A9C1D8" />
        </g>
      </g>
    </g>
  )
}

/** The idea: a small glowing orb riding the track, with a soft glow and a shadow on the rails. */
function Idea() {
  const id = useId().replace(/:/g, "")
  const [cx, cy] = P(1.2, BACK_Y, 0.32)
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-orb`} cx="0.36" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#FFF8E1" />
          <stop offset="0.45" stopColor="#FFD27A" />
          <stop offset="1" stopColor="#E89A2C" />
        </radialGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor="#FFC85A" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFC85A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <Face kind="top" at={[1.2, BACK_Y, 0.005]}>
        <ellipse rx={0.2} ry={0.2} fill="rgba(0,0,0,0.14)" />
      </Face>
      <g style={{ transform: "translateY(var(--bob, 0px))" }}>
        <circle cx={cx} cy={cy} r={20} fill={`url(#${id}-glow)`} />
        <circle cx={cx} cy={cy} r={8.5} fill={`url(#${id}-orb)`} stroke="rgba(160,90,10,0.35)" strokeWidth={0.6} />
        <ellipse cx={cx - 2.6} cy={cy - 3} rx={2.4} ry={1.6} fill="#FFFFFF" opacity={0.75} />
      </g>
    </g>
  )
}
