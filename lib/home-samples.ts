import { brandMeta } from "@/data/brand-meta"
import { stats } from "@/data/catalog"
import { contextFiles } from "@/data/context-pack"
import { localModels } from "@/data/local-llms"
import { resources } from "@/data/resources"
import { phaseById, phases, stepNumber, topics } from "@/data/roadmap"
import { publisherById, skills } from "@/data/skills"
import { creatorIcon } from "@/lib/model-creators"

// The few items and counts the home page shows from each directory. Picked on the server and
// passed to the client components as props, so the full data files never reach the browser.

export function homeSamples() {
  const steps = ["development", "frontend"].map((id) => topics.find((t) => t.id === id)!)
  const phase = phaseById[steps[0].phase]
  return {
    resources: resources.slice(0, 4).map((r) => ({ name: r.name, author: r.author })),
    skills: ["frontend-design", "high-end-visual-design", "seo-audit"]
      .map((n) => skills.find((s) => s.name === n))
      .filter((s) => s !== undefined)
      .map((s) => ({ name: s.name, publisher: publisherById[s.publisher].name, icon: publisherById[s.publisher].icon })),
    models: ["Gemma 3 4B", "Qwen 3 8B", "gpt-oss 20B", "Llama 3.3 70B"]
      .map((n) => localModels.find((m) => m.name === n))
      .filter((m) => m !== undefined)
      .map((m) => ({ name: m.name, creator: m.creator, icon: creatorIcon[m.creator], size: m.size, paramsB: m.paramsB })),
    steps: steps.map((t) => ({ id: t.id, title: t.title, number: stepNumber[t.id] })),
    phase: { name: phase.name, color: phase.color, number: phases.indexOf(phase) + 1 },
    templateCount: contextFiles.length,
  }
}

export type HomeSamples = ReturnType<typeof homeSamples>

export function homeStats() {
  return [
    { value: stats.tools, suffix: "+", label: "Hand‑picked tools" },
    { value: Object.keys(brandMeta).length, suffix: "", label: "Brand icons to copy" },
    { value: resources.length, suffix: "", label: "Learning resources" },
    { value: skills.length, suffix: "", label: "Agent skills" },
    { value: localModels.length, suffix: "", label: "Local AI models" },
  ]
}
