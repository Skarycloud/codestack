import type { Metadata } from "next"
import { Suspense } from "react"
import { IconLibrary } from "@/components/icons/icon-library"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Icon library",
  description: "Copy brand icons for the tools you use as SVG, JSX or PNG, for free.",
}

export default function IconsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Icon library"
        title="Every logo. Ready to paste."
        description="Pixel‑perfect brand marks for the tools in your stack. Copy as SVG or a React component, or export a crisp PNG."
      />
      <Suspense>
        <IconLibrary />
      </Suspense>
    </>
  )
}
