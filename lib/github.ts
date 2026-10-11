// Live repository lists from GitHub's REST search API, fetched on the server and cached for an
// hour, so visitors never hit GitHub's rate limits themselves. Set GITHUB_TOKEN (a fine-grained
// token with no extra scopes is enough) to raise the limits; it works without one.

import { repoLanguages, type Repo, type RepoList, type RepoResult } from "@/lib/repos"

export { isRepoList, repoLanguages, repoLists, type Repo, type RepoList, type RepoResult } from "@/lib/repos"

const day = (offset: number) => new Date(Date.now() - offset * 86_400_000).toISOString().slice(0, 10)

function searchQuery(list: RepoList, lang: string) {
  const language = repoLanguages.find((l) => l.id === lang)?.query
  const parts = [list === "top" ? "stars:>20000" : `created:>${day(list === "week" ? 7 : 30)} stars:>20`]
  if (language) parts.push(`language:"${language}"`)
  return parts.join(" ")
}

export async function fetchRepos(list: RepoList, lang = "all"): Promise<RepoResult> {
  const params = new URLSearchParams({ q: searchQuery(list, lang), sort: "stars", order: "desc", per_page: "60" })
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "codestack",
  }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

  try {
    const res = await fetch(`https://api.github.com/search/repositories?${params}`, { headers, next: { revalidate: 3600 } })
    if (!res.ok) {
      const limited = res.status === 403 || res.status === 429
      return { repos: [], fetchedAt: new Date().toISOString(), error: limited ? "rate-limited" : `github-${res.status}` }
    }
    const data = (await res.json()) as { items: GitHubRepo[] }
    return { repos: data.items.map(toRepo), fetchedAt: new Date().toISOString() }
  } catch {
    return { repos: [], fetchedAt: new Date().toISOString(), error: "network" }
  }
}

interface GitHubRepo {
  id: number
  name: string
  owner: { login: string; avatar_url: string }
  html_url: string
  homepage: string | null
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics?: string[]
  license: { spdx_id: string } | null
  pushed_at: string
  created_at: string
}

const toRepo = (r: GitHubRepo): Repo => ({
  id: r.id,
  name: r.name,
  owner: r.owner.login,
  avatar: r.owner.avatar_url,
  url: r.html_url,
  homepage: r.homepage || null,
  // GitHub descriptions often use emoji shortcodes like :books:, which only render on GitHub itself.
  description: r.description?.replace(/:[a-z0-9_+-]+:/g, "").replace(/\s{2,}/g, " ").trim() || null,
  stars: r.stargazers_count,
  forks: r.forks_count,
  language: r.language,
  topics: (r.topics ?? []).slice(0, 4),
  license: r.license && r.license.spdx_id !== "NOASSERTION" ? r.license.spdx_id : null,
  pushedAt: r.pushed_at,
  createdAt: r.created_at,
})
