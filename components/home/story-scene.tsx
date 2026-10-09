"use client"

import { useReducedMotion } from "framer-motion"
import { useEffect, useId, useRef } from "react"

/*
 * From idea to launch: an isometric diorama in six stations. A glowing idea travels a track past
 * blueprint, design, code, AI and servers, lighting a golden trail behind it, and ends in a rocket
 * that counts down and lifts off. Each station comes alive while the idea is there, and keeps a
 * little ambient life otherwise. Hovering a station pauses the story on it.
 *
 * Drawing: every face is a flat panel mapped into the isometric view with one SVG matrix, so detail
 * (a screen, a sheet, a rack) is drawn in plain 2D coordinates on its face.
 */

// Projection: world units, x down-right, y down-left, z up.
const U = 48
const OX = 246
const OY = 74
const CX = Math.cos(Math.PI / 6) * U
const CY = 0.5 * U
const P = (x: number, y: number, z = 0): [number, number] => [OX + (x - y) * CX, OY + (x + y) * CY - z * U]
const pts = (...p: [number, number][]) => p.map((q) => q.map((n) => n.toFixed(1)).join(",")).join(" ")
const css = (v: Record<string, string | number>) => v as React.CSSProperties

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

/** A solid block: top and the two faces toward the viewer, a soft sheen down the sides, and a bevel of light on the top's front edges. */
function Box({
  x,
  y,
  z = 0,
  w,
  d,
  h,
  c,
  bevel = true,
}: {
  x: number
  y: number
  z?: number
  w: number
  d: number
  h: number
  c: Shade
  bevel?: boolean
}) {
  const left = pts(P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h))
  const right = pts(P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h))
  return (
    <g strokeLinejoin="round">
      <polygon points={left} fill={c[1]} stroke="rgba(0,0,0,0.12)" strokeWidth={0.5} />
      <polygon points={right} fill={c[2]} stroke="rgba(0,0,0,0.12)" strokeWidth={0.5} />
      {h > 0.12 && <polygon points={left} fill="url(#story-sheen)" />}
      {h > 0.12 && <polygon points={right} fill="url(#story-sheen)" />}
      <polygon
        points={pts(P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h))}
        fill={c[0]}
        stroke="rgba(0,0,0,0.1)"
        strokeWidth={0.5}
      />
      {bevel && (
        <polyline
          points={pts(P(x, y + d, z + h), P(x + w, y + d, z + h), P(x + w, y, z + h))}
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth={0.8}
          strokeLinecap="round"
        />
      )}
    </g>
  )
}

/** A soft contact shadow on the floor under a footprint. */
function Shadow({ x, y, w, d, z = 0.004, s = 0.22 }: { x: number; y: number; w: number; d: number; z?: number; s?: number }) {
  return (
    <Face kind="top" at={[x - s, y - s * 0.4, z]}>
      <rect width={w + s * 2} height={d + s * 1.6} rx={0.25} fill="url(#story-ao)" />
    </Face>
  )
}

const wood: Shade = ["#DCAE7E", "#BC8B5F", "#A1724B"]
const legs: Shade = ["#8F5F3D", "#7C5133", "#6A452C"]
const slate: Shade = ["#474D56", "#373C43", "#2B2F35"]
const steel: Shade = ["#D0D5DC", "#9EA7B2", "#838C97"]
const graphite: Shade = ["#4E555F", "#373C44", "#2C3037"]
const concrete: Shade = ["#D6D1C9", "#BCB6AD", "#A8A197"]
const red: Shade = ["#CF5B4E", "#AC473C", "#903A31"]

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
const LENGTH = AT[AT.length - 1]
const along = (s: number): [number, number] => {
  for (let k = 0; k < SEG.length; k++) {
    if (s <= AT[k + 1] || k === SEG.length - 1) {
      const t = Math.min(1, Math.max(0, (s - AT[k]) / SEG[k]))
      return [PATH[k][0] + (PATH[k + 1][0] - PATH[k][0]) * t, PATH[k][1] + (PATH[k + 1][1] - PATH[k][1]) * t]
    }
  }
  return PATH[0]
}

// The loop, in seconds: dwell at a station, travel to the next; then the launch sequence and a reset.
const DWELL = 1.45
const MOVE = 0.85
const LAUNCH_AT = 5 * (DWELL + MOVE) + 0.4
const LAUNCH = 3.4
const RESET = 1.8
const LOOP = LAUNCH_AT + LAUNCH + RESET
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
const easeOut = (t: number) => 1 - (1 - t) ** 3
/** 0 to 1 across [a, b] of p, eased. */
const span = (p: number, a: number, b: number) => ease(clamp01((p - a) / (b - a)))

// Launch geometry: the pad's centre and where the idea enters the rocket.
const PAD = P(1.15, T + 1.05, 0.14)
const INTO: [number, number] = (() => {
  const stop = P(1.2, FRONT_Y, 0.32)
  return [PAD[0] - stop[0], PAD[1] - 72 - stop[1]]
})()
const PUFFS = [-150, -115, -70, -25, 20, 60].map((deg, i) => ({ a: (deg * Math.PI) / 180, r: 11 + (i % 3) * 3, far: 38 + (i % 2) * 14 }))

export function StoryScene({ className, caption }: { className?: string; caption: string }) {
  const reduce = useReducedMotion()
  const root = useRef<SVGSVGElement>(null)
  const readout = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const svg = root.current
    if (!svg) return
    const q = <E extends Element>(k: string) => svg.querySelector<E>(`[data-k="${k}"]`)!
    // In story order. The DOM holds them in painting order, which differs, so look each up by name.
    const stations = STATIONS.map((st) => svg.querySelector<SVGGElement>(`[data-st="${st.name.toLowerCase()}"]`)!)
    const idea = q<SVGGElement>("idea")
    const layerBack = q<SVGGElement>("layer-back")
    const layerFront = q<SVGGElement>("layer-front")
    const trail = [...svg.querySelectorAll<SVGPolylineElement>("[data-k=trail]")]
    const rocket = q<SVGGElement>("rocket")
    const flame = q<SVGGElement>("flame")
    const contrail = q<SVGRectElement>("contrail")
    const arm = q<SVGGElement>("arm")
    const lamps = [...svg.querySelectorAll<SVGCircleElement>("[data-k=lamp]")]
    const puffs = [...svg.querySelectorAll<SVGCircleElement>("[data-k=puff]")]
    const [bx, by] = P(1.2, BACK_Y, 0)

    let active = -1
    const setActive = (k: number) => {
      if (k === active) return
      active = k
      stations.forEach((g, i) => (i === k || (reduce && k < 0) ? g.setAttribute("data-on", "") : g.removeAttribute("data-on")))
      if (readout.current) readout.current.textContent = k < 0 ? "Idea to launch" : `0${k + 1} · ${STATIONS[k].name}`
    }

    /** The idea at distance s along the track, with an extra screen offset, a fade and a gentle bob. */
    const placeIdea = (s: number, alpha: number, extra: [number, number] = [0, 0], bob = 0, scale = 1) => {
      const [x, y] = along(s)
      const [sx, sy] = P(x, y, 0)
      idea.setAttribute("transform", `translate(${(sx - bx + extra[0]).toFixed(2)} ${(sy - by + extra[1]).toFixed(2)})`)
      idea.style.opacity = alpha.toFixed(3)
      idea.style.setProperty("--bob", `${bob.toFixed(2)}px`)
      idea.style.setProperty("--scale", scale.toFixed(3))
      // Painter's order: behind the front row's objects while on the back row, in front after.
      const layer = y > BACK_Y + 0.4 ? layerFront : layerBack
      if (idea.parentNode !== layer) layer.append(idea)
    }

    /** How much of the track glows behind the idea, 0 to 1, and how bright. */
    const placeTrail = (progress: number, alpha: number) => {
      for (const t of trail) {
        t.style.strokeDashoffset = (1 - progress).toFixed(4)
        t.style.opacity = alpha.toFixed(3)
      }
    }

    /** The launch sequence at p, 0 to 1 (or the reset at r, 0 to 1, after it). */
    const placeLaunch = (p: number, r = 0, time = 0) => {
      const count = [0.22, 0.32, 0.42].map((at) => (p >= at && r === 0 ? 1 : 0))
      lamps.forEach((l, i) => l.setAttribute("data-lit", String(count[i])))
      const retract = r > 0 ? 1 - span(r, 0.4, 1) : span(p, 0.4, 0.5)
      arm.setAttribute("transform", `translate(${(retract * 0.42 * CX).toFixed(2)} ${(retract * 0.42 * CY).toFixed(2)})`)
      const fire = r > 0 ? 0 : clamp01((p - 0.5) / 0.05)
      const rise = r > 0 ? 1 : clamp01((p - 0.6) / 0.4)
      const lift = rise ** 2.6 * 520
      const shake = fire * (1 - rise) * Math.sin(time * 95) * 0.9
      // During the reset a fresh rocket stands on the pad and fades in.
      rocket.setAttribute("transform", r > 0 ? "translate(0 0)" : `translate(${shake.toFixed(2)} ${(-lift).toFixed(1)})`)
      rocket.style.opacity = (r > 0 ? clamp01((r - 0.45) / 0.4) : 1 - clamp01((rise - 0.7) / 0.3)).toFixed(3)
      flame.style.opacity = fire.toFixed(3)
      flame.style.setProperty("--flicker", (0.85 + 0.15 * Math.sin(time * 41) * Math.sin(time * 23)).toFixed(3))
      const trailH = r > 0 ? 520 : Math.max(0, lift - 8)
      contrail.setAttribute("height", trailH.toFixed(1))
      contrail.setAttribute("y", (-trailH).toFixed(1))
      contrail.style.opacity = (r > 0 ? 0.55 * (1 - clamp01(r / 0.5)) : 0.55 * rise).toFixed(3)
      // Smoke billows out along the pad from ignition, then thins during the reset.
      const billow = r > 0 ? 1 : easeOut(clamp01((p - 0.5) / 0.45))
      const fade = r > 0 ? 1 - clamp01(r / 0.7) : 1
      puffs.forEach((el, i) => {
        const f = PUFFS[i]
        el.setAttribute("cx", (Math.cos(f.a) * f.far * billow).toFixed(1))
        el.setAttribute("cy", (Math.sin(f.a) * f.far * 0.35 * billow + 2).toFixed(1))
        el.setAttribute("r", (f.r * (0.4 + billow * 0.9)).toFixed(1))
        el.style.opacity = (Math.min(1, billow * 2) * fade * 0.95).toFixed(3)
      })
    }

    // Reduced motion: one still, complete scene, with every station shown at work.
    if (reduce) {
      placeIdea(AT[STOPS[2]], 1)
      placeTrail(AT[STOPS[2]] / LENGTH, 1)
      placeLaunch(0)
      setActive(-1)
      return
    }

    let t = 0
    let last = 0
    let frame = 0
    let paused = false
    let visible = true

    const draw = () => {
      const cycle = DWELL + MOVE
      const bob = Math.sin(t * 3.2) * 1.8
      if (t < LAUNCH_AT) {
        const k = Math.min(5, Math.floor(t / cycle))
        const inside = t - k * cycle
        let s: number
        if (k >= 5 || inside < DWELL) {
          setActive(Math.min(5, k))
          s = AT[STOPS[Math.min(5, k)]]
        } else {
          setActive(-1)
          s = AT[STOPS[k]] + (AT[STOPS[k + 1]] - AT[STOPS[k]]) * ease((inside - DWELL) / MOVE)
        }
        placeIdea(s, 1, [0, 0], bob)
        placeTrail(s / LENGTH, 1)
        placeLaunch(0)
      } else if (t < LAUNCH_AT + LAUNCH) {
        setActive(5)
        const p = (t - LAUNCH_AT) / LAUNCH
        // The idea floats up into the rocket's window and is taken in.
        const into = span(p, 0, 0.16)
        placeIdea(AT[STOPS[5]], 1 - clamp01((p - 0.14) / 0.05), [INTO[0] * into, INTO[1] * into], bob * (1 - into), 1 - into * 0.45)
        placeTrail(1, 1)
        placeLaunch(p, 0, t)
      } else {
        // Reset: the trail and smoke fade, the arm swings back, a fresh rocket appears on the pad.
        const r = (t - LAUNCH_AT - LAUNCH) / RESET
        setActive(-1)
        placeIdea(0, clamp01((r - 0.6) / 0.4), [0, 0], bob)
        placeTrail(1, 1 - clamp01(r / 0.5))
        placeLaunch(1, Math.max(0.0001, r), t)
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
    const offs = hits.map((h, k) => {
      const fn = () => {
        paused = true
        setActive(k)
      }
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
      offs.forEach((off) => off())
      svg.removeEventListener("pointerleave", leave)
    }
  }, [reduce])

  const tileTop = ([i, j]: readonly [number, number]) =>
    pts(P(i * T, j * T), P(i * T + 2.4, j * T), P(i * T + 2.4, j * T + 2.4), P(i * T, j * T + 2.4))
  const track = pts(...PATH.map(([x, y]) => P(x, y, 0.012)))

  return (
    <figure className={className}>
      <svg
        ref={root}
        viewBox="0 0 600 420"
        role="img"
        aria-label="From idea to launch: a glowing idea travels past blueprint, design, code, AI and server stations, then lifts off on a rocket."
        className="story block h-auto w-full select-none overflow-visible"
      >
        <defs>
          <linearGradient id="story-sheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.14" />
            <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="story-ao">
            <stop offset="0" stopColor="#000" style={{ stopOpacity: "var(--st-ao, 0.16)" }} />
            <stop offset="0.7" stopColor="#000" style={{ stopOpacity: "calc(var(--st-ao, 0.16) * 0.45)" }} />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="story-ground">
            <stop offset="0" stopColor="#000" style={{ stopOpacity: "var(--st-ground, 0.07)" }} />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="story-warm">
            <stop offset="0" stopColor="#FFD98A" stopOpacity="0.75" />
            <stop offset="1" stopColor="#FFD98A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="story-cool">
            <stop offset="0" stopColor="#8EC5FF" stopOpacity="0.55" />
            <stop offset="1" stopColor="#8EC5FF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="story-ai-glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3FD0B0" stopOpacity="0.5" />
            <stop offset="1" stopColor="#2F6BD8" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="story-contrail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F4F1EA" stopOpacity="0" />
            <stop offset="1" stopColor="#F4F1EA" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* A soft shadow under the whole board, then the six tiles, back to front. */}
        <ellipse cx={P(3.9, 2.5)[0]} cy={P(3.9, 2.5)[1] + 40} rx={290} ry={96} fill="url(#story-ground)" />
        {[...STATIONS.map((s) => s.tile)]
          .sort((a, b) => a[0] + a[1] - (b[0] + b[1]))
          .map(([i, j]) => (
            <g key={`${i}${j}`}>
              <Box x={i * T} y={j * T} z={-0.32} w={2.4} d={2.4} h={0.32} c={["var(--st-top)", "var(--st-left)", "var(--st-right)"]} />
              <Face kind="top" at={[i * T + 0.1, j * T + 0.1, 0.001]}>
                <rect
                  width={2.2}
                  height={2.2}
                  rx={0.08}
                  fill="none"
                  stroke="var(--st-inset)"
                  strokeWidth={0.8}
                  vectorEffect="non-scaling-stroke"
                />
              </Face>
            </g>
          ))}

        {/* The track: a groove, dashes, and the golden trail that lights up behind the idea. */}
        <polyline points={track} className="story-rail" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={track} className="story-rail-dash" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <polyline
          data-k="trail"
          points={track}
          pathLength={1}
          className="story-trail-glow"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          data-k="trail"
          points={track}
          pathLength={1}
          className="story-trail"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Floor cables from the servers to the AI cabinet and to the pad, with data pulsing along them. */}
        <Face kind="top" at={[0, 0, 0.008]}>
          <g fill="none" strokeLinecap="round">
            {[
              "M4.56 3.62 C4.9 3.62 5.0 3.75 5.42 3.75",
              "M4.56 3.78 C4.95 3.8 5.05 3.92 5.42 3.92",
              "M2.82 3.7 C2.5 3.7 2.3 3.5 1.95 3.5",
            ].map((d) => (
              <g key={d}>
                <path d={d} stroke="var(--st-cable)" strokeWidth={2.6} vectorEffect="non-scaling-stroke" />
                <path d={d} pathLength={1} className="story-pulse" stroke="#7DE0B8" strokeWidth={1.4} vectorEffect="non-scaling-stroke" />
              </g>
            ))}
          </g>
        </Face>

        <Station k={0}>
          <Blueprint x={0} y={0} />
        </Station>
        <Station k={1}>
          <Design x={T} y={0} />
        </Station>
        <Station k={5}>
          <Launch x={0} y={T} />
        </Station>
        <Station k={2}>
          <Code x={2 * T} y={0} />
        </Station>
        <g data-k="layer-back">
          <g data-k="idea">
            <Idea />
          </g>
        </g>
        <Station k={4}>
          <Servers x={T} y={T} />
        </Station>
        <Station k={3}>
          <AI x={2 * T} y={T} />
        </Station>
        <g data-k="layer-front" />

        {/* The rocket's flight path stays above everything else. */}
        <g transform={`translate(${PAD[0].toFixed(1)} ${PAD[1].toFixed(1)})`}>
          <rect data-k="contrail" x={-5} y={0} width={10} height={0} rx={5} fill="url(#story-contrail)" style={{ opacity: 0 }} />
          <Rocket />
        </g>

        {/* Hit areas: each tile's top, invisible, over everything. */}
        {STATIONS.map((s) => (
          <polygon key={s.name} data-hit points={tileTop(s.tile)} fill="transparent" />
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

/** A station's group, with the ripple that spreads from its stop when the idea arrives. */
function Station({ k, children }: { k: number; children: React.ReactNode }) {
  const [x, y] = PATH[STOPS[k]]
  return (
    <g data-st={STATIONS[k].name.toLowerCase()}>
      <Face kind="top" at={[x, y, 0.014]}>
        <circle r={0.42} fill="none" stroke="#F2B544" strokeWidth={1.2} vectorEffect="non-scaling-stroke" className="story-ripple" />
      </Face>
      {children}
    </g>
  )
}

/** A desk: wooden top on four legs, with its shadow. */
function Desk({ x, y, w = 1.8, d = 1.2, h = 0.55 }: { x: number; y: number; w?: number; d?: number; h?: number }) {
  const l = 0.08
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      <Box x={x + 0.06} y={y + 0.06} w={l} d={l} h={h} c={legs} bevel={false} />
      <Box x={x + w - 0.14} y={y + 0.06} w={l} d={l} h={h} c={legs} bevel={false} />
      <Box x={x + 0.06} y={y + d - 0.14} w={l} d={l} h={h} c={legs} bevel={false} />
      <Box x={x + w - 0.14} y={y + d - 0.14} w={l} d={l} h={h} c={legs} bevel={false} />
      <Box x={x} y={y} z={h} w={w} d={d} h={0.08} c={wood} />
    </g>
  )
}

/** 01 · Blueprint: a drafting table, a blueprint that draws its plan, and an architect's lamp. */
function Blueprint({ x, y }: { x: number; y: number }) {
  const dx = x + 0.3
  const dy = y + 0.3
  const top = 0.63
  const base = [dx + 1.6, dy + 0.18] as const
  const [b0x, b0y] = P(base[0], base[1], top + 0.06)
  const [elx, ely] = P(base[0] - 0.05, base[1] + 0.05, top + 0.62)
  const [shx, shy] = P(dx + 1.18, dy + 0.42, top + 0.7)
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
          strokeOpacity={0.16}
          strokeWidth={0.5}
          vectorEffect="non-scaling-stroke"
        />
        <g fill="none" stroke="#EEF5FC" strokeWidth={1.1} className="story-wire">
          {[
            "M0.12 0.1H1.3V0.88H0.12Z",
            "M0.12 0.26H1.3",
            "M0.2 0.36H0.62V0.78H0.2Z",
            "M0.72 0.36H1.22V0.54H0.72Z",
            "M0.72 0.62H1.22M0.72 0.7H1.1",
          ].map((d) => (
            <path key={d} d={d} pathLength={1} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
        <ellipse cx={0.95} cy={0.42} rx={0.6} ry={0.45} fill="url(#story-warm)" className="story-lamp-light" />
      </Face>
      <Box x={dx + 0.12} y={dy + 1.0} z={top} w={1.3} d={0.1} h={0.03} c={["#E7C88F", "#C9A66A", "#B08E55"]} />
      <Box x={dx + 1.62} y={dy + 0.5} z={top} w={0.05} d={0.5} h={0.05} c={["#F2C94C", "#D4A92E", "#B78F20"]} />
      {/* The lamp: a weighted base, two arm segments, a shade with a warm bulb. */}
      <Box x={base[0] - 0.09} y={base[1] - 0.09} z={top} w={0.18} d={0.18} h={0.05} c={slate} />
      <path
        d={`M${b0x} ${b0y}L${elx} ${ely}L${shx} ${shy}`}
        fill="none"
        stroke="#3B4048"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={elx} cy={ely} r={2} fill="#2B2F35" />
      <path d={`M${shx - 9} ${shy + 6}L${shx - 2} ${shy - 5}L${shx + 6} ${shy - 1}L${shx + 3} ${shy + 10}Z`} fill="#3B4048" />
      <ellipse cx={shx - 3} cy={shy + 8} rx={5.5} ry={2.6} fill="#FFE7A8" className="story-bulb" />
    </g>
  )
}

/** 02 · Design: a drawing tablet with a canvas, swatches, a sticky note and a plant. */
function Design({ x, y }: { x: number; y: number }) {
  const dx = x + 0.3
  const dy = y + 0.3
  const top = 0.63
  const [px, py] = P(dx + 1.62, dy + 1.0, top + 0.17)
  return (
    <g>
      <Desk x={dx} y={dy} />
      <Box x={dx + 0.25} y={dy + 0.15} z={top} w={1.0} d={0.72} h={0.04} c={slate} />
      <Face kind="top" at={[dx + 0.31, dy + 0.21, top + 0.041]}>
        <rect width={0.88} height={0.6} rx={0.03} fill="#F8F5EF" />
        <g className="story-pop">
          <circle cx={0.24} cy={0.22} r={0.13} fill="#E07A5F" style={css({ "--i": 0 })} />
          <rect x={0.44} y={0.1} width={0.34} height={0.2} rx={0.03} fill="#81B29A" style={css({ "--i": 1 })} />
          <rect x={0.1} y={0.42} width={0.68} height={0.08} rx={0.03} fill="#3D405B" style={css({ "--i": 2 })} />
        </g>
      </Face>
      <Box x={dx + 1.08} y={dy + 0.2} z={top} w={0.05} d={0.6} h={0.05} c={["#E9E4DA", "#CFC8BB", "#B9B1A3"]} />
      {(
        [
          ["#E07A5F", 0.2],
          ["#F2CC8F", 0.42],
          ["#81B29A", 0.64],
        ] as const
      ).map(([c, o]) => (
        <Box key={c} x={dx + 1.42} y={dy + o} z={top} w={0.2} d={0.16} h={0.03} c={[c, c, c]} bevel={false} />
      ))}
      <Face kind="top" at={[dx + 0.25, dy + 0.94, top + 0.005]}>
        <rect width={0.26} height={0.22} fill="#F7E08A" transform="rotate(-8 0.13 0.11)" />
      </Face>
      {/* A plant in a terracotta pot. */}
      <Box x={dx + 1.52} y={dy + 0.9} z={top} w={0.2} d={0.2} h={0.17} c={["#C8714F", "#B0603F", "#984F33"]} />
      <g className="story-sway" style={css({ transformOrigin: `${px}px ${py}px` })}>
        <ellipse cx={px - 6} cy={py - 9} rx={4.5} ry={9} fill="#5E9E6E" transform={`rotate(-28 ${px - 6} ${py - 9})`} />
        <ellipse cx={px + 6} cy={py - 10} rx={4.5} ry={9.5} fill="#4E8A5E" transform={`rotate(26 ${px + 6} ${py - 10})`} />
        <ellipse cx={px} cy={py - 14} rx={4.5} ry={10.5} fill="#6BAF7B" />
      </g>
    </g>
  )
}

/** 03 · Code: a workstation whose screen types and lights the desk, a keyboard and a steaming mug. */
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
  const [mx, my] = P(dx + 1.58, dy + 0.74, top + 0.2)
  return (
    <g>
      <Desk x={dx} y={dy} />
      <Face kind="top" at={[dx + 0.2, dy + 0.38, top + 0.081]}>
        <ellipse cx={0.75} cy={0.32} rx={0.75} ry={0.4} fill="url(#story-cool)" className="story-screen-light" />
      </Face>
      <Box x={dx + 0.82} y={dy + 0.28} z={top} w={0.16} d={0.12} h={0.18} c={slate} />
      <Box x={dx + 0.3} y={dy + 0.3} z={top + 0.16} w={1.15} d={0.06} h={0.72} c={slate} />
      <Face kind="left" at={[dx + 0.36, dy + 0.361, top + 0.22]}>
        <rect width={1.03} height={0.6} fill="#1E232B" />
        <g className="story-type">
          {lines.map(([indent, len, c], i) => (
            <rect key={i} x={indent} y={0.08 + i * 0.085} width={len} height={0.035} rx={0.015} fill={c} style={css({ "--i": i })} />
          ))}
        </g>
        <rect x={0.06} y={0.6 - 0.07} width={0.035} height={0.045} fill="#E8E3D6" className="story-caret" />
      </Face>
      <Box x={dx + 0.42} y={dy + 0.72} z={top} w={0.86} d={0.26} h={0.03} c={["#E3DED5", "#C9C2B6", "#B4AC9F"]} />
      <Face kind="top" at={[dx + 0.46, dy + 0.76, top + 0.032]}>
        {Array.from({ length: 3 }, (_, r) => (
          <rect key={r} x={0.02} y={0.03 + r * 0.06} width={0.74} height={0.035} rx={0.01} fill="#D2CBBF" />
        ))}
      </Face>
      <Box x={dx + 1.5} y={dy + 0.66} z={top} w={0.16} d={0.16} h={0.18} c={["#F1EDE5", "#D86F57", "#BE5C46"]} />
      <g className="story-steam" fill="none" stroke="var(--st-steam)" strokeWidth={1.4} strokeLinecap="round">
        <path d={`M${mx - 2} ${my - 4} q-3 -5 0 -9 q3 -4 0 -9`} style={css({ "--i": 0 })} />
        <path d={`M${mx + 3} ${my - 2} q-3 -5 0 -9 q3 -4 0 -9`} style={css({ "--i": 1 })} />
      </g>
    </g>
  )
}

/** 04 · AI: a GPU supercomputer behind a glass door, with fans and a status strip. */
function AI({ x, y }: { x: number; y: number }) {
  // Set left of the track's corner, so the idea stays in view at the code stop behind it.
  const bx = x + 0.22
  const by = y + 0.5
  const w = 1.25
  const d = 0.92
  const h = 1.7
  return (
    <g>
      <Shadow x={bx} y={by} w={w} d={d} s={0.28} />
      <Box x={bx} y={by} w={w} d={d} h={h} c={graphite} />
      <Face kind="left" at={[bx + 0.07, by + d + 0.001, 0.1]}>
        <rect width={w - 0.14} height={h - 0.2} rx={0.03} fill="#20242A" />
        <rect width={w - 0.14} height={h - 0.2} rx={0.03} fill="url(#story-ai-glass)" className="story-ai-glow" />
        {Array.from({ length: 5 }, (_, k) => (
          <rect key={k} x={0.07} y={0.08 + k * 0.16} width={w - 0.28} height={0.1} rx={0.015} fill="#384049" />
        ))}
        <rect x={0.07} y={0.92} width={w - 0.28} height={0.03} rx={0.015} fill="#5ED3B6" className="story-glow" />
        {[0.3, 0.83].map((cx) => (
          <g key={cx} transform={`translate(${cx} 1.2)`}>
            <circle r={0.16} fill="#171A1F" stroke="#4A515B" strokeWidth={0.8} vectorEffect="non-scaling-stroke" />
            <g className="story-spin">
              {[0, 60, 120].map((a) => (
                <ellipse key={a} rx={0.13} ry={0.032} fill="#5A626D" transform={`rotate(${a})`} />
              ))}
            </g>
            <circle r={0.03} fill="#2B3036" />
          </g>
        ))}
        {/* The glass door's reflection. */}
        <path d={`M0.1 ${h - 0.3}L0.32 ${h - 0.3}L0.08 0.95L0 0.95Z`} fill="#FFFFFF" opacity={0.06} />
      </Face>
      <Face kind="top" at={[bx + 0.18, by + 0.14, h + 0.001]}>
        {Array.from({ length: 5 }, (_, k) => (
          <rect key={k} x={0} y={k * 0.13} width={w - 0.36} height={0.05} rx={0.02} fill="#3A4049" />
        ))}
      </Face>
      <Face kind="right" at={[bx + w + 0.001, by + 0.12, 0.25]}>
        {Array.from({ length: 7 }, (_, k) => (
          <rect key={k} x={0} y={k * 0.17} width={0.68} height={0.05} rx={0.02} fill="#24282E" />
        ))}
      </Face>
    </g>
  )
}

/** 05 · Servers: three racks with drive lights. */
function Servers({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <Shadow x={x + 0.22} y={y + 0.32} w={1.74} d={0.92} s={0.24} />
      {[0.22, 0.82, 1.42].map((ox, r) => (
        <g key={ox}>
          <Box x={x + ox} y={y + 0.32} w={0.54} d={0.92} h={1.52} c={steel} />
          <Face kind="left" at={[x + ox + 0.04, y + 1.241, 0.08]}>
            <rect width={0.46} height={1.36} fill="#5C6570" />
            {Array.from({ length: 8 }, (_, k) => (
              <g key={k}>
                <rect x={0.03} y={0.05 + k * 0.165} width={0.4} height={0.13} rx={0.01} fill="#454D57" />
                <rect x={0.06} y={0.1 + k * 0.165} width={0.2} height={0.02} fill="#2E343C" />
                <circle
                  cx={0.33}
                  cy={0.115 + k * 0.165}
                  r={0.018}
                  fill={k % 3 === 1 ? "#F2B84B" : "#6BD49A"}
                  className="story-led"
                  style={css({ "--d": `${((k * 7 + r * 3) % 9) * 130}ms` })}
                />
              </g>
            ))}
          </Face>
          <Face kind="top" at={[x + ox + 0.08, y + 0.4, 1.521]}>
            <rect
              width={0.38}
              height={0.76}
              rx={0.02}
              fill="none"
              stroke="rgba(0,0,0,0.08)"
              strokeWidth={0.8}
              vectorEffect="non-scaling-stroke"
            />
          </Face>
        </g>
      ))}
    </g>
  )
}

/** 06 · Launch: a pad with countdown lamps, and a gantry whose arm swings clear for liftoff. */
function Launch({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <Shadow x={x + 0.35} y={y + 0.25} w={1.6} d={1.6} s={0.18} />
      <Box x={x + 0.35} y={y + 0.25} w={1.6} d={1.6} h={0.14} c={concrete} />
      <Face kind="top" at={[x + 1.15, y + 1.05, 0.141]}>
        <circle r={0.55} fill="none" stroke="#9E978C" strokeWidth={1} strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
        <circle r={0.3} fill="#C3BDB3" />
        {[0, 1, 2].map((k) => (
          <circle key={k} data-k="lamp" cx={-0.2 + k * 0.2} cy={0.68} r={0.055} className="story-lamp" data-lit="0" />
        ))}
      </Face>
      <g data-k="arm">
        <Box x={x + 1.3} y={y + 0.58} z={1.72} w={0.42} d={0.06} h={0.05} c={red} bevel={false} />
      </g>
      <Box x={x + 1.72} y={y + 0.5} z={0.14} w={0.16} d={0.16} h={2.3} c={red} />
      <Face kind="left" at={[x + 1.72, y + 0.661, 0.2]}>
        <path
          d={Array.from({ length: 7 }, (_, k) => `M0 ${k * 0.32}L0.16 ${k * 0.32 + 0.16}L0 ${k * 0.32 + 0.32}`).join("")}
          fill="none"
          stroke="#6E2C25"
          strokeWidth={0.8}
          vectorEffect="non-scaling-stroke"
        />
      </Face>
      <g transform={`translate(${PAD[0].toFixed(1)} ${PAD[1].toFixed(1)})`}>
        {PUFFS.map((_, i) => (
          <circle key={i} data-k="puff" cx={0} cy={0} r={6} fill={i % 2 ? "#E6E1D8" : "#F1EDE6"} style={{ opacity: 0 }} />
        ))}
      </g>
    </g>
  )
}

/** The rocket, drawn in screen space: a rocket looks the same from any side. */
function Rocket() {
  return (
    <g data-k="rocket">
      <g data-k="flame" style={{ opacity: 0 }}>
        <g className="story-flame">
          <path d="M-8 -6 Q0 40 8 -6 Z" fill="#F08A3C" />
          <path d="M-5.5 -6 Q0 26 5.5 -6 Z" fill="#F7B955" />
          <path d="M-3 -6 Q0 14 3 -6 Z" fill="#FFF0C4" />
        </g>
      </g>
      <path d="M-9 -6 L9 -6 L7 -14 L-7 -14 Z" fill="#5E646C" />
      <path d="M-12 -14 L-24 4 L-12 -2 Z" fill="#CF5B4E" />
      <path d="M12 -14 L24 4 L12 -2 Z" fill="#AC473C" />
      <rect x={-12} y={-100} width={24} height={88} rx={4} fill="#F7F4EE" stroke="rgba(0,0,0,0.12)" strokeWidth={0.6} />
      <rect x={2} y={-100} width={10} height={88} rx={3} fill="#E6E1D7" />
      <rect x={-9} y={-98} width={3} height={84} rx={1.5} fill="#FFFFFF" opacity={0.7} />
      <path d="M-12 -98 Q-12 -122 0 -134 Q12 -122 12 -98 Z" fill="#CF5B4E" />
      <path d="M0 -134 Q12 -122 12 -98 L3 -98 Q6 -118 0 -134 Z" fill="#AC473C" />
      <rect x={-12} y={-30} width={24} height={5} fill="#CF5B4E" />
      <circle cy={-72} r={6.5} fill="#5B7A99" stroke="#D9D3C8" strokeWidth={2} />
      <circle cx={-2} cy={-74} r={2} fill="#A9C1D8" />
    </g>
  )
}

/** The idea: a small glowing orb riding the track, with a halo and a shadow on the rails. */
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
          <stop offset="0" stopColor="#FFC85A" stopOpacity="0.6" />
          <stop offset="1" stopColor="#FFC85A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <Face kind="top" at={[1.2, BACK_Y, 0.016]}>
        <ellipse rx={0.2} ry={0.2} fill="rgba(0,0,0,0.16)" />
        <ellipse rx={0.42} ry={0.42} fill="url(#story-warm)" opacity={0.6} />
      </Face>
      <g className="story-idea" style={css({ transformOrigin: `${cx}px ${cy}px` })}>
        <circle cx={cx} cy={cy} r={22} fill={`url(#${id}-glow)`} className="story-halo" />
        <circle cx={cx} cy={cy} r={8.5} fill={`url(#${id}-orb)`} stroke="rgba(160,90,10,0.35)" strokeWidth={0.6} />
        <ellipse cx={cx - 2.6} cy={cy - 3} rx={2.4} ry={1.6} fill="#FFFFFF" opacity={0.8} />
      </g>
    </g>
  )
}
