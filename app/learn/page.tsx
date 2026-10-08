import type { Metadata } from "next"
import { preconnect } from "react-dom"
import { FeaturedVideos, LearnLibrary } from "@/components/learn/library"
import { PageHeader } from "@/components/page-header"
import { resources, tracks } from "@/data/resources"

export const metadata: Metadata = {
  title: "Learn",
  description: "The best docs, courses, videos, books, practice platforms and podcasts for designers and developers.",
}

const free = resources.filter((r) => r.free).length

export default function LearnPage() {
  preconnect("https://i.ytimg.com")
  return (
    <>
      <PageHeader
        eyebrow="Learn"
        title="Learn from the very best."
        description={`${resources.length} hand‑picked docs, courses, videos, books, practice platforms and podcasts across ${tracks.length} tracks. ${free} of them are completely free.`}
      />
      <FeaturedVideos />
      <LearnLibrary />
    </>
  )
}
