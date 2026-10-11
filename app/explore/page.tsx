import type { Metadata } from "next"
import { Explorer } from "@/components/explore/explorer"
import { SheetBand, TopSheet } from "@/components/directory/toolbar"
import { PageHeader } from "@/components/page-header"
import { categories, stats } from "@/data/catalog"

export const metadata: Metadata = {
  title: "Explore",
  description: "Browse hand‑picked tools for designers and developers, organised by craft.",
}

export default function ExplorePage() {
  return (
    <SheetBand>
      <TopSheet>
        <PageHeader
          eyebrow="Directory"
          title="The best tools. Hand‑picked."
          description={`${stats.tools.toLocaleString("en-US")} tools across ${categories.length} categories, from Figma to Postgres. Every one chosen because people genuinely love using it.`}
        />
      </TopSheet>
      <Explorer />
    </SheetBand>
  )
}
