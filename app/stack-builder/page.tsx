import type { Metadata } from "next"
import { Suspense } from "react"
import { PageHeader } from "@/components/page-header"
import { StackBuilder } from "@/components/stack/stack-builder"

export const metadata: Metadata = {
  title: "Stack Builder",
  description: "Assemble your tech stack, compare it to proven presets and share it with your team.",
}

export default function StackBuilderPage() {
  return (
    <>
      <PageHeader
        eyebrow="Stack Builder"
        title="Assemble your stack."
        description="Start from a proven preset or pick piece by piece. See how close you are to the classics, then share it or copy it as Markdown."
      />
      <Suspense>
        <StackBuilder />
      </Suspense>
    </>
  )
}
