// Shared, client-safe parts of the live GitHub lists: the list and language options and the
// repository shape. The server-side fetch lives in lib/github.ts.

export type RepoList = "top" | "week" | "month"

export const repoLists: { id: RepoList; name: string; blurb: string }[] = [
  { id: "top", name: "Most starred", blurb: "The most-starred repositories on GitHub, of all time." },
  { id: "week", name: "New this week", blurb: "Repositories created in the last 7 days, ranked by stars." },
  { id: "month", name: "New this month", blurb: "Repositories created in the last 30 days, ranked by stars." },
]

/** Language filters, with the GitHub `language:` qualifier each one uses. */
export const repoLanguages: { id: string; name: string; query?: string }[] = [
  { id: "all", name: "All" },
  { id: "typescript", name: "TypeScript", query: "TypeScript" },
  { id: "javascript", name: "JavaScript", query: "JavaScript" },
  { id: "python", name: "Python", query: "Python" },
  { id: "go", name: "Go", query: "Go" },
  { id: "rust", name: "Rust", query: "Rust" },
  { id: "java", name: "Java", query: "Java" },
  { id: "cpp", name: "C++", query: "C++" },
  { id: "csharp", name: "C#", query: "C#" },
  { id: "swift", name: "Swift", query: "Swift" },
  { id: "kotlin", name: "Kotlin", query: "Kotlin" },
  { id: "php", name: "PHP", query: "PHP" },
  { id: "ruby", name: "Ruby", query: "Ruby" },
]

export interface Repo {
  id: number
  name: string
  owner: string
  avatar: string
  url: string
  homepage: string | null
  description: string | null
  stars: number
  forks: number
  language: string | null
  topics: string[]
  license: string | null
  pushedAt: string
  createdAt: string
}

export interface RepoResult {
  repos: Repo[]
  /** When this list was fetched from GitHub. */
  fetchedAt: string
  error?: string
}

export const isRepoList = (v: string | null): v is RepoList => v === "top" || v === "week" || v === "month"
