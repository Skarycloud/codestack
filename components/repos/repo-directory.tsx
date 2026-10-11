"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, GitFork, RotateCw, Star } from "lucide-react"
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react"
import { DirectorySections, DirectoryTabs, DirectoryToolbar, ResultsHeader, ResultsSheet } from "@/components/directory/toolbar"
import { ease } from "@/components/motion/reveal"
import { SearchParamsListener, replaceQuery } from "@/components/search-params"
import { isRepoList, repoLanguages, repoLists, type Repo, type RepoList, type RepoResult } from "@/lib/repos"
import { useFilterTop } from "@/lib/use-filter-top"

// GitHub's own language colors, for the dot beside each repository's language.
const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  "C++": "#f34b7d",
  "C#": "#178600",
  C: "#555555",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Dart: "#00B4AB",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  Zig: "#ec915c",
  "Jupyter Notebook": "#DA5B0B",
  MDX: "#fcb32c",
}

const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 })

function ago(iso: string) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))} min ago`
  if (s < 86_400) return `${Math.round(s / 3600)} h ago`
  if (s < 86_400 * 30) return `${Math.round(s / 86_400)} d ago`
  if (s < 86_400 * 365) return `${Math.round(s / (86_400 * 30))} mo ago`
  return `${Math.round(s / (86_400 * 365))} y ago`
}

const key = (list: RepoList, lang: string) => `${list}:${lang}`

/**
 * Live repository lists: tabs pick the list, the language row narrows it, and search filters what
 * is loaded. The first list ships in the HTML; others load from /api/repos and stay cached here.
 */
export function RepoDirectory({ initial }: { initial: RepoResult }) {
  const [list, setList] = useState<RepoList>("top")
  const [lang, setLang] = useState("all")
  const [query, setQuery] = useState("")
  const deferred = useDeferredValue(query)
  const filterTop = useFilterTop()
  const cache = useRef(new Map<string, RepoResult>(initial.error ? [] : [[key("top", "all"), initial]]))
  const [result, setResult] = useState<RepoResult | null>(initial.error ? null : initial)
  const [loading, setLoading] = useState(false)
  const [attempt, setAttempt] = useState(0)

  const onParams = useCallback((params: URLSearchParams) => {
    const l = params.get("list")
    const g = params.get("l")
    setList(isRepoList(l) ? l : "top")
    setLang(repoLanguages.some((x) => x.id === g) ? g! : "all")
    const q = params.get("q")
    if (q !== null) setQuery(q)
  }, [])

  // Load the chosen list, from the local cache when we already have it.
  useEffect(() => {
    const k = key(list, lang)
    const hit = cache.current.get(k)
    if (hit) {
      setResult(hit)
      setLoading(false)
      return
    }
    const controller = new AbortController()
    setLoading(true)
    fetch(`/api/repos?list=${list}&lang=${lang}`, { signal: controller.signal })
      .then((r) => r.json() as Promise<RepoResult>)
      .then((data) => {
        if (!data.error) cache.current.set(k, data)
        setResult(data)
        setLoading(false)
      })
      .catch((e) => {
        if (e.name === "AbortError") return
        setResult({ repos: [], fetchedAt: new Date().toISOString(), error: "network" })
        setLoading(false)
      })
    return () => controller.abort()
  }, [list, lang, attempt])

  const update = (next: { list?: RepoList; lang?: string }) => {
    const l = next.list ?? list
    const g = next.lang ?? lang
    setList(l)
    setLang(g)
    filterTop.reset()
    replaceQuery({ list: l === "top" ? null : l, l: g === "all" ? null : g })
  }

  const repos = useMemo(() => {
    const q = deferred.trim().toLowerCase()
    const all = result?.repos ?? []
    return q ? all.filter((r) => `${r.owner}/${r.name} ${r.description ?? ""} ${r.topics.join(" ")}`.toLowerCase().includes(q)) : all
  }, [result, deferred])

  const current = repoLists.find((l) => l.id === list)!
  const language = repoLanguages.find((l) => l.id === lang)!

  return (
    <>
      <SearchParamsListener onChange={onParams} />
      <div ref={filterTop.ref} aria-hidden />
      <DirectoryToolbar
        search={{ value: query, onChange: setQuery, placeholder: "Search these repositories", label: "Search repositories" }}
        controls={
          <span className="inline-flex items-center gap-2 text-[12.5px] text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            Live from GitHub
          </span>
        }
        tabs={
          <DirectoryTabs
            label="Lists"
            layoutId="repos-tab"
            active={list}
            onSelect={(id) => update({ list: id })}
            items={repoLists.map((l) => ({ id: l.id, label: l.name }))}
          />
        }
        sections={{
          key: "languages",
          node: (
            <DirectorySections
              label="Languages"
              layoutId="repos-lang"
              active={lang}
              onSelect={(id) => update({ lang: id })}
              items={repoLanguages.map((l) => ({ id: l.id, label: l.name }))}
            />
          ),
        }}
      />

      <ResultsSheet className="min-h-[60vh] pb-28 pt-10">
        <div className="shell">
          <ResultsHeader>
            <p>
              {loading ? (
                "Loading from GitHub…"
              ) : (
                <>
                  {repos.length} {repos.length === 1 ? "repository" : "repositories"} ·{" "}
                  <span className="text-foreground">
                    {current.name}
                    {lang !== "all" && ` in ${language.name}`}
                  </span>
                  {result && !result.error && (
                    <>
                      {" "}
                      · updated <time suppressHydrationWarning>{ago(result.fetchedAt)}</time>
                    </>
                  )}
                </>
              )}
            </p>
          </ResultsHeader>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${list}-${lang}-${loading}-${result?.error ?? ""}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.4, ease }}
            >
              {loading ? (
                <Grid>
                  {Array.from({ length: 9 }, (_, i) => (
                    <div key={i} className="card-surface h-[218px] p-6">
                      <div className="flex items-center gap-2.5">
                        <div className="skeleton size-6 rounded-md" />
                        <div className="skeleton h-3 w-24 rounded-full" />
                      </div>
                      <div className="skeleton mt-5 h-4 w-2/3 rounded-full" />
                      <div className="skeleton mt-4 h-3 w-full rounded-full" />
                      <div className="skeleton mt-2 h-3 w-4/5 rounded-full" />
                    </div>
                  ))}
                </Grid>
              ) : result?.error ? (
                <div className="py-24 text-center">
                  <p className="text-[22px] font-semibold tracking-[-0.02em]">
                    {result.error === "rate-limited" ? "GitHub needs a short breather." : "Couldn’t reach GitHub."}
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    {result.error === "rate-limited"
                      ? "Too many requests just now. Try again in a minute."
                      : "Check your connection and try again."}
                  </p>
                  <button
                    onClick={() => {
                      cache.current.delete(key(list, lang))
                      setAttempt((n) => n + 1)
                    }}
                    className="pressable mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-[14px] font-medium text-primary-foreground hover:bg-primary-hover"
                  >
                    <RotateCw className="size-4" />
                    Try again
                  </button>
                </div>
              ) : repos.length === 0 ? (
                <div className="py-24 text-center">
                  <p className="text-[22px] font-semibold tracking-[-0.02em]">No repositories match “{query}”.</p>
                  <p className="mt-2 text-muted-foreground">Try a broader search, or another language.</p>
                </div>
              ) : (
                <Grid>
                  {repos.map((r) => (
                    <div key={r.id} className="scroll-reveal">
                      <RepoCard repo={r} rank={(result?.repos.indexOf(r) ?? 0) + 1} />
                    </div>
                  ))}
                </Grid>
              )}
            </motion.div>
          </AnimatePresence>

          <p className="mt-16 text-center text-[13px] text-muted-foreground">
            Data from the{" "}
            <a
              href="https://docs.github.com/en/rest/search/search#search-repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link underline-offset-2 hover:underline"
            >
              GitHub REST API
            </a>
            , refreshed every hour. “New” lists rank repositories created in that window by stars.
          </p>
        </div>
      </ResultsSheet>
    </>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">{children}</div>
}

function RepoCard({ repo: r, rank }: { repo: Repo; rank: number }) {
  return (
    <a href={r.url} target="_blank" rel="noopener noreferrer" className="card-surface card-lift group flex h-full flex-col p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${r.avatar}&s=64`}
            alt=""
            width={24}
            height={24}
            loading="lazy"
            decoding="async"
            className="size-6 shrink-0 rounded-md bg-surface-2"
          />
          <span className="truncate text-[13px] text-muted-foreground">{r.owner}</span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="font-mono text-[12px] tabular-nums text-muted-foreground">#{rank}</span>
          <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 ease-apple group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
      <h3 className="mt-4 truncate text-[18px] font-semibold tracking-[-0.02em]">{r.name}</h3>
      <p className="mt-1.5 line-clamp-2 text-[14px] leading-relaxed text-muted-foreground">{r.description ?? "No description."}</p>
      <div className="flex-1" />
      {r.topics.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {r.topics.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[11.5px] text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      )}
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border pt-4 text-[12.5px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 text-foreground">
          <Star className="size-3.5" />
          {compact.format(r.stars)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <GitFork className="size-3.5" />
          {compact.format(r.forks)}
        </span>
        {r.language && (
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: languageColors[r.language] ?? "#8b8b8b" }} />
            {r.language}
          </span>
        )}
        <time suppressHydrationWarning dateTime={r.pushedAt} title={`Last updated ${new Date(r.pushedAt).toDateString()}`} className="ml-auto">
          {ago(r.pushedAt)}
        </time>
      </div>
    </a>
  )
}
