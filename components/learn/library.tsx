"use client"

import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowUpRight,
  Book,
  BookOpen,
  ChevronDown,
  Compass,
  Dumbbell,
  Gamepad2,
  GraduationCap,
  Languages,
  Mic,
  Play,
  PlayCircle,
} from "lucide-react"
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react"
import { DragScroller } from "@/components/drag-scroller"
import { GameArcade } from "@/components/learn/game-arcade"
import { ease } from "@/components/motion/reveal"
import { SearchParamsListener, replaceQuery } from "@/components/search-params"
import { ActiveFilterChips, FilterButton, activeCount, type FilterGroup, type FilterValue } from "@/components/directory/filter-panel"
import { DirectoryTabs, DirectoryToolbar, ResultsHeader, ResultsSheet, SectionHeading } from "@/components/directory/toolbar"
import { resources, resourceTypes, tracks, type Resource, type ResourceType, type Track } from "@/data/resources"
import { cn } from "@/lib/utils"
import { useFilterTop } from "@/lib/use-filter-top"

const typeMeta: Record<ResourceType, { icon: typeof Book; label: string; tint: string }> = {
  docs: { icon: BookOpen, label: "Docs", tint: "text-[#0062c4] bg-[#0a84ff]/10 dark:text-[#64b5ff]" },
  course: { icon: GraduationCap, label: "Course", tint: "text-[#7d2fb0] bg-[#bf5af2]/10 dark:text-[#d79cff]" },
  guide: { icon: Compass, label: "Guide", tint: "text-[#166d2f] bg-[#30d158]/10 dark:text-[#30d158]" },
  book: { icon: Book, label: "Book", tint: "text-[#8f5000] bg-[#ff9f0a]/10 dark:text-[#ff9f0a]" },
  video: { icon: PlayCircle, label: "Video", tint: "text-[#c00d36] bg-[#ff375f]/10 dark:text-[#ff6b8a]" },
  practice: { icon: Dumbbell, label: "Practice", tint: "text-[#0062c4] bg-[#64d2ff]/15 dark:text-[#64d2ff]" },
  game: { icon: Gamepad2, label: "Game", tint: "text-[#15803d] bg-[#4ade80]/15 dark:text-[#4ade80]" },
  podcast: { icon: Mic, label: "Podcast", tint: "text-[#4b49c8] bg-[#5e5ce6]/10 dark:text-[#a5a4ff]" },
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

// Shorter tab labels so the tracks read as one tidy row; the full names show as tooltips and headings.
const trackShort: Partial<Record<Track, string>> = {
  platforms: "Platforms",
  backend: "Backend",
  devops: "DevOps",
  cs: "CS",
  fullstack: "Full-stack",
  career: "Career",
  creative: "Art & music",
  knowledge: "Languages & maths",
  games: "Games",
}

const levels = ["Beginner", "Intermediate", "Advanced", "All levels"] as const

/** Format, price and level are OR'd within each group and AND'd across groups. */
function applyFilters(items: Resource[], f: FilterValue) {
  const types = f.type ?? []
  const price = f.price ?? []
  const level = f.level ?? []
  return items.filter(
    (r) =>
      (!types.length || types.includes(r.type)) &&
      (!price.length || price.includes(r.free ? "free" : "paid")) &&
      (!level.length || level.includes(r.level)),
  )
}

export function LearnLibrary() {
  const [track, setTrack] = useState<Track | "all">("all")
  const [filters, setFilters] = useState<FilterValue>({})
  const [query, setQuery] = useState("")
  const deferred = useDeferredValue(query)
  const filterTop = useFilterTop()

  // Apply ?type= and ?q= on load, and follow them when they change from outside, e.g. a format
  // picked in the navbar. A format arrives as a preselected filter.
  const onParams = useCallback((params: URLSearchParams) => {
    const t = params.get("type")
    setFilters(resourceTypes.some((r) => r.id === t && t !== "all") ? { type: [t as ResourceType] } : {})
    const q = params.get("q")
    if (q !== null) setQuery(q)
  }, [])
  const changeFilters = (next: FilterValue) => {
    setFilters(next)
    filterTop.reset()
    const types = next.type ?? []
    replaceQuery({ type: types.length === 1 ? types[0] : null })
  }
  const selectTrack = (id: Track | "all") => {
    setTrack(id)
    filterTop.reset()
  }

  // A "#track" link can arrive together with a filter reset. Once the new results
  // have rendered, bring the requested section into view.
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    const t = setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }), 260)
    return () => clearTimeout(t)
  }, [filters])

  // Track and search narrow the list; the filter panel works within it.
  const scoped = useMemo(() => {
    const q = deferred.trim().toLowerCase()
    return resources.filter(
      (r) => (track === "all" || r.track === track) && (!q || `${r.name} ${r.description} ${r.author}`.toLowerCase().includes(q)),
    )
  }, [track, deferred])
  const results = useMemo(() => applyFilters(scoped, filters), [scoped, filters])
  const active = activeCount(filters)

  const groups = useMemo<FilterGroup[]>(
    () => [
      {
        id: "type",
        title: "Format",
        options: resourceTypes
          .filter((t) => t.id !== "all")
          .map((t) => ({ id: t.id, label: t.name, count: scoped.filter((r) => r.type === t.id).length }))
          .filter((o) => o.count),
      },
      {
        id: "price",
        title: "Price",
        options: [
          { id: "free", label: "Free", count: scoped.filter((r) => r.free).length },
          { id: "paid", label: "Paid", count: scoped.filter((r) => !r.free).length },
        ].filter((o) => o.count),
      },
      {
        id: "level",
        title: "Level",
        options: levels.map((l) => ({ id: l, label: l, count: scoped.filter((r) => r.level === l).length })).filter((o) => o.count),
      },
    ],
    [scoped],
  )

  // The "All tracks" view previews each track; picking a track, filtering or searching shows all.
  const preview = track === "all" && !active && !deferred.trim()
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
      <div ref={filterTop.ref} aria-hidden />
      <DirectoryToolbar
        search={{ value: query, onChange: setQuery, placeholder: `Search ${resources.length} resources`, label: "Search resources" }}
        controls={
          <FilterButton
            groups={groups}
            value={filters}
            onChange={changeFilters}
            resultCount={results.length}
            noun={["resource", "resources"]}
          />
        }
        tabs={
          <DirectoryTabs
            label="Tracks"
            layoutId="learn-tab"
            active={track}
            onSelect={selectTrack}
            items={[
              { id: "all" as const, label: "All tracks" },
              ...tracks.map((t) => ({ id: t.id, label: trackShort[t.id] ?? t.name, title: t.name })),
            ]}
          />
        }
      />

      <ResultsSheet className="min-h-[60vh] pb-28 pt-10">
        <div ref={listTop} className="shell">
          <ResultsHeader>
            <p>
              {results.length} {results.length === 1 ? "resource" : "resources"}
              {track !== "all" && (
                <>
                  {" "}
                  in <span className="text-foreground">{tracks.find((t) => t.id === track)!.name}</span>
                </>
              )}
            </p>
            <ActiveFilterChips groups={groups} value={filters} onChange={changeFilters} />
          </ResultsHeader>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${track}-${JSON.stringify(filters)}-${deferred}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.45, ease }}
              className="space-y-20"
            >
              {results.length === 0 && (
                <div className="py-24 text-center">
                  <p className="text-[22px] font-semibold tracking-[-0.02em]">Nothing matches that.</p>
                  <p className="mt-2 text-muted-foreground">Try another track, a broader search, or clear the filters.</p>
                </div>
              )}
              {tracks.map((t) => {
                const items = results.filter((r) => r.track === t.id)
                if (!items.length) return null
                if (t.id === "games")
                  return (
                    <GameArcade
                      key={t.id}
                      index={tracks.indexOf(t) + 1}
                      items={items}
                      preview={preview}
                      onShowAll={() => expand("games")}
                    />
                  )
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
                    <SectionHeading index={tracks.indexOf(t) + 1} title={t.name} blurb={t.blurb} meta={`${items.length} resources`} />
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
      </ResultsSheet>
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
