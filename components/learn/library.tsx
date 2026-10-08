"use client"

import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowUpRight,
  Book,
  BookOpen,
  BrainCircuit,
  ChevronDown,
  Code2,
  Compass,
  Cpu,
  Dumbbell,
  GraduationCap,
  Layers,
  Mic,
  Palette,
  Play,
  PlayCircle,
  Rocket,
  Search,
  Server,
  Smartphone,
  X,
} from "lucide-react"
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react"
import { DragScroller } from "@/components/drag-scroller"
import { ease } from "@/components/motion/reveal"
import { SearchParamsListener, replaceQuery } from "@/components/search-params"
import { Segmented } from "@/components/segmented"
import { SwitchPill } from "@/components/switch-pill"
import { resources, resourceTypes, tracks, type Resource, type ResourceType, type Track } from "@/data/resources"
import { cn } from "@/lib/utils"

const typeMeta: Record<ResourceType, { icon: typeof Book; label: string; tint: string }> = {
  docs: { icon: BookOpen, label: "Docs", tint: "text-[#0062c4] bg-[#0a84ff]/10 dark:text-[#64b5ff]" },
  course: { icon: GraduationCap, label: "Course", tint: "text-[#7d2fb0] bg-[#bf5af2]/10 dark:text-[#d79cff]" },
  guide: { icon: Compass, label: "Guide", tint: "text-[#166d2f] bg-[#30d158]/10 dark:text-[#30d158]" },
  book: { icon: Book, label: "Book", tint: "text-[#8f5000] bg-[#ff9f0a]/10 dark:text-[#ff9f0a]" },
  video: { icon: PlayCircle, label: "Video", tint: "text-[#c00d36] bg-[#ff375f]/10 dark:text-[#ff6b8a]" },
  practice: { icon: Dumbbell, label: "Practice", tint: "text-[#0062c4] bg-[#64d2ff]/15 dark:text-[#64d2ff]" },
  podcast: { icon: Mic, label: "Podcast", tint: "text-[#4b49c8] bg-[#5e5ce6]/10 dark:text-[#a5a4ff]" },
}

const trackIcons: Record<Track, typeof Book> = {
  design: Palette,
  frontend: Code2,
  backend: Server,
  devops: Layers,
  mobile: Smartphone,
  ai: BrainCircuit,
  cs: Cpu,
  fullstack: Rocket,
  career: Compass,
}

const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

/** A draggable row of hand‑picked videos, shown above the directory. */
export function FeaturedVideos() {
  const videos = resources.filter((r) => r.youtube)
  return (
    <section className="pb-16">
      <DragScroller
        label="featured videos"
        controls="header"
        header={
          <>
            <h2 className="text-[22px] font-semibold tracking-[-0.025em]">Start watching</h2>
            <p className="mt-1 text-[14px] text-muted-foreground">{videos.length} talks and courses every developer should see.</p>
          </>
        }
        trackClassName="gap-4 py-2"
      >
        {videos.map((v, i) => (
          <VideoCard
            key={v.youtube}
            video={v}
            priority={i === 0 ? "high" : i < 4 ? "eager" : undefined}
            className="w-[300px] shrink-0 snap-start sm:w-[340px]"
          />
        ))}
      </DragScroller>
    </section>
  )
}

const channelPalettes = [
  "from-[#ff375f] to-[#bf5af2]",
  "from-[#0a84ff] to-[#5e5ce6]",
  "from-[#30d158] to-[#0a84ff]",
  "from-[#ff9f0a] to-[#ff375f]",
  "from-[#5e5ce6] to-[#bf5af2]",
  "from-[#64d2ff] to-[#0a84ff]",
]

const initials = (name: string) =>
  name
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

/** A uniform 16:9 card for single videos (real thumbnail) and channels (designed tile). */
function VideoCard({ video: v, className, priority }: { video: Resource; className?: string; priority?: "high" | "eager" }) {
  const palette = channelPalettes[[...v.name].reduce((n, c) => n + c.charCodeAt(0), 0) % channelPalettes.length]
  return (
    <a href={v.url} target="_blank" rel="noopener noreferrer" className={cn("group/video block", className)}>
      <div className="skeleton relative aspect-video overflow-hidden rounded-[18px] bg-surface-2 ring-1 ring-black/[0.06] dark:ring-white/[0.08]">
        {v.youtube ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb(v.youtube)}
              alt=""
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority === "high" ? "high" : undefined}
              decoding="async"
              draggable={false}
              className="size-full scale-[1.02] object-cover transition-transform duration-700 ease-apple group-hover/video:scale-[1.07]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </>
        ) : (
          <div className={cn("noise relative grid size-full place-items-center bg-gradient-to-br", palette)}>
            <span className="text-[44px] font-semibold tracking-[-0.04em] text-white/95 drop-shadow-sm transition-transform duration-700 ease-apple group-hover/video:scale-110">
              {initials(v.name)}
            </span>
          </div>
        )}
        <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 scale-90 place-items-center rounded-full bg-white/90 text-black opacity-0 shadow-lg backdrop-blur transition-all duration-300 ease-apple group-hover/video:scale-100 group-hover/video:opacity-100">
          <Play className="ml-0.5 size-5 fill-current" />
        </span>
        {v.badge && (
          <span className="absolute bottom-2.5 left-2.5 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur">
            {v.badge}
          </span>
        )}
        {!v.free && (
          <span className="absolute bottom-2.5 right-2.5 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur">
            Paid
          </span>
        )}
      </div>
      <p className="mt-3 line-clamp-2 text-[15px] font-semibold leading-snug tracking-[-0.015em]">{v.name}</p>
      <p className="mt-0.5 line-clamp-1 text-[13px] text-muted-foreground">{v.author}</p>
    </a>
  )
}

export function LearnLibrary() {
  const [type, setType] = useState<ResourceType | "all">("all")
  const [track, setTrack] = useState<Track | "all">("all")
  const [freeOnly, setFreeOnly] = useState(false)
  const [query, setQuery] = useState("")
  const deferred = useDeferredValue(query)

  // Apply ?type= on load, and follow it when it changes from outside, e.g. a format picked in the navbar.
  const onParams = useCallback((params: URLSearchParams) => {
    const t = params.get("type")
    setType(resourceTypes.some((r) => r.id === t) ? (t as ResourceType) : "all")
  }, [])
  const selectType = (next: ResourceType | "all") => {
    setType(next)
    replaceQuery({ type: next === "all" ? null : next })
  }

  // A "#track" link can arrive together with a filter reset. Once the new results
  // have rendered, bring the requested section into view.
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    const t = setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }), 260)
    return () => clearTimeout(t)
  }, [type])

  const results = useMemo(() => {
    const q = deferred.trim().toLowerCase()
    return resources.filter(
      (r) =>
        (type === "all" || r.type === type) &&
        (track === "all" || r.track === track) &&
        (!freeOnly || r.free) &&
        (!q || `${r.name} ${r.description} ${r.author}`.toLowerCase().includes(q)),
    )
  }, [type, track, freeOnly, deferred])

  const counts = useMemo(() => Object.fromEntries(tracks.map((t) => [t.id, resources.filter((r) => r.track === t.id).length])), [])

  // The "All tracks" view previews each track; picking a track or searching shows all.
  const preview = track === "all" && type === "all" && !deferred.trim()
  const listTop = useRef<HTMLDivElement>(null)
  const expand = (id: Track) => {
    setTrack(id)
    requestAnimationFrame(() => {
      const top = (listTop.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 160
      window.scrollTo({ top, behavior: "smooth" })
    })
  }

  return (
    <>
      <SearchParamsListener onChange={onParams} />
      <div className="sticky top-14 z-30">
        <div className="glass border-y border-black/[0.06] dark:border-white/[0.07]">
          <div className="shell flex flex-col gap-3 py-3 md:flex-row md:items-center">
            <label className="relative flex h-10 w-full shrink-0 items-center md:max-w-xs md:flex-1">
              <Search className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${resources.length} resources`}
                aria-label="Search resources"
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
            <div className="no-scrollbar -mx-5 flex items-center gap-3 overflow-x-auto px-5 md:mx-0 md:flex-1 md:px-0">
              <Segmented
                size="sm"
                value={type}
                onChange={selectType}
                options={resourceTypes.map((t) => ({ value: t.id, label: t.name }))}
                className="shrink-0"
              />
              <SwitchPill checked={freeOnly} onChange={setFreeOnly} label="Free only" className="ml-auto" />
            </div>
          </div>
          <div className="shell">
            <div className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1 pb-3">
              {[{ id: "all" as const, name: "All tracks" }, ...tracks].map((t) => {
                const active = track === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => setTrack(t.id)}
                    className={cn(
                      "pressable relative shrink-0 rounded-full px-3.5 py-1.5 text-[13px] transition-colors",
                      active ? "text-background" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="learn-chip"
                        className="absolute inset-0 rounded-full bg-foreground"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                      />
                    )}
                    <span className="relative">
                      {t.name}
                      {t.id !== "all" && <span className="ml-1.5 tabular-nums font-normal">{counts[t.id]}</span>}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div ref={listTop} className="shell min-h-[60vh] pb-28 pt-12">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${type}-${track}-${freeOnly}-${deferred}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            transition={{ duration: 0.45, ease }}
            className="space-y-20"
          >
            {results.length === 0 && (
              <div className="py-24 text-center">
                <p className="text-[22px] font-semibold tracking-[-0.02em]">Nothing matches that.</p>
                <p className="mt-2 text-muted-foreground">Try another format or track, or a broader search.</p>
              </div>
            )}
            {tracks.map((t) => {
              const items = results.filter((r) => r.track === t.id)
              if (!items.length) return null
              const Icon = trackIcons[t.id]
              const allReading = items.filter((r) => r.type !== "video")
              const allWatch = items.filter((r) => r.type === "video")
              const reading = preview ? allReading.slice(0, 6) : allReading
              const watch = preview ? allWatch.slice(0, 4) : allWatch
              const hidden = items.length - reading.length - watch.length
              return (
                <section
                  key={t.id}
                  id={t.id}
                  // Skip rendering off-screen tracks. The size estimates match a real track at each
                  // breakpoint, so "#track" links from the navbar still land in the right place.
                  className="defer-render scroll-mt-48 [contain-intrinsic-size:auto_2900px] md:[contain-intrinsic-size:auto_1600px] lg:[contain-intrinsic-size:auto_1000px]"
                >
                  <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="grid size-12 shrink-0 place-items-center rounded-[14px] bg-surface-2 text-foreground">
                        <Icon className="size-[22px]" />
                      </span>
                      <div>
                        <h2 className="text-title">{t.name}</h2>
                        <p className="mt-1 text-muted-foreground">{t.blurb}</p>
                      </div>
                    </div>
                    <span className="text-[13px] tabular-nums text-muted-foreground">{items.length} resources</span>
                  </div>
                  {reading.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
                      {reading.map((r) => (
                        <div key={r.name} className="scroll-reveal">
                          <ResourceCard resource={r} />
                        </div>
                      ))}
                    </div>
                  )}
                  {watch.length > 0 && (
                    <div className={reading.length > 0 ? "mt-12" : ""}>
                      <p className="mb-5 flex items-center gap-2 text-[13px] font-medium text-muted-foreground">
                        <PlayCircle className="size-4 text-[#ff375f]" /> Watch
                      </p>
                      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 [&>*]:min-w-0">
                        {watch.map((r) => (
                          <div key={r.name} className="scroll-reveal">
                            <VideoCard video={r} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {hidden > 0 && <ShowAll count={items.length} label={`${t.name} resources`} onClick={() => expand(t.id)} />}
                </section>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}

function ShowAll({ count, label, onClick }: { count: number; label: string; onClick: () => void }) {
  return (
    <div className="mt-8 flex justify-center">
      <button
        type="button"
        onClick={onClick}
        className="pressable group inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-5 py-2.5 text-[14px] font-medium hover:bg-foreground/10"
      >
        Show all {count} {label}
        <ChevronDown className="size-4 transition-transform duration-300 ease-apple group-hover:translate-y-0.5" />
      </button>
    </div>
  )
}

function ResourceCard({ resource: r }: { resource: Resource }) {
  const meta = typeMeta[r.type]
  return (
    <a href={r.url} target="_blank" rel="noopener noreferrer" className="card-surface card-lift group flex h-full flex-col overflow-hidden">
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5">
            <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium", meta.tint)}>
              <meta.icon className="size-3.5" />
              {meta.label}
            </span>
            {r.badge && <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[12px] text-muted-foreground">{r.badge}</span>}
          </span>
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-apple group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        <h3 className="mt-5 text-[19px] font-semibold leading-snug tracking-[-0.022em]">{r.name}</h3>
        <p className="mt-0.5 text-[13px] text-muted-foreground">{r.author}</p>
        <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted-foreground">{r.description}</p>
        <div className="mt-6 flex items-center gap-2 border-t border-black/[0.05] pt-4 text-[12px] text-muted-foreground dark:border-white/[0.06]">
          <span>{r.level}</span>
          <span className="size-1 rounded-full bg-foreground/20" />
          <span className={r.free ? "text-[#166d2f] dark:text-[#30d158]" : ""}>{r.free ? "Free" : "Paid"}</span>
        </div>
      </div>
    </a>
  )
}
