import { NextResponse } from "next/server"
import { fetchRepos } from "@/lib/github"
import { isRepoList, repoLanguages } from "@/lib/repos"

// The GitHub response itself is cached for an hour (see lib/github), so every visitor shares one
// request per list and language.
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const list = params.get("list")
  const lang = params.get("lang") ?? "all"
  if (!isRepoList(list) || !repoLanguages.some((l) => l.id === lang)) {
    return NextResponse.json({ error: "bad-request" }, { status: 400 })
  }
  const result = await fetchRepos(list, lang)
  return NextResponse.json(result, {
    headers: { "Cache-Control": result.error ? "no-store" : "public, s-maxage=3600, stale-while-revalidate=86400" },
  })
}
