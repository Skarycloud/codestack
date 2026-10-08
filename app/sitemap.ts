import type { MetadataRoute } from "next"
import { site } from "@/lib/site"

const routes = ["", "/explore", "/icons", "/learn", "/stack-builder", "/skills", "/roadmap", "/contribute"]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }))
}
