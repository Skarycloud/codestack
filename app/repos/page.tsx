import type { Metadata } from "next"
import { SheetBand, TopSheet } from "@/components/directory/toolbar"
import { PageHeader } from "@/components/page-header"
import { RepoDirectory } from "@/components/repos/repo-directory"
import { fetchRepos } from "@/lib/github"

export const metadata: Metadata = {
  title: "Top GitHub repositories",
  description: "The most-starred GitHub repositories and the fastest-rising new ones, live from GitHub and filterable by language.",
}

// The first list is rendered on the server and refreshed hourly; the rest load on demand.
export const revalidate = 3600

export default async function ReposPage() {
  const initial = await fetchRepos("top", "all")
  return (
    <SheetBand>
      <TopSheet>
        <PageHeader
          eyebrow="Top repos"
          title="The best of GitHub, live."
          description="The most-starred repositories of all time and the fastest-rising new ones, straight from GitHub and refreshed every hour. Filter by language."
        />
      </TopSheet>
      <RepoDirectory initial={initial} />
    </SheetBand>
  )
}
