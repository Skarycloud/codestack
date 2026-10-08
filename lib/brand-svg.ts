import { brandIcons } from "@/data/brand-icons"

// Full SVG path data lives here, imported only by the icon library's copy and
// download features. Everything else renders logos from the cached sprite.

/** Raw SVG markup for copy / download. */
export function brandSvg(slug: string, color?: string) {
  const icon = brandIcons[slug]
  if (!icon) return ""
  const fill = color ?? `#${icon.hex}`
  return `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="${fill}"><title>${icon.title}</title><path d="${icon.path}"/></svg>`
}

export function brandJsx(slug: string, component: string) {
  const icon = brandIcons[slug]
  if (!icon) return ""
  return `export function ${component}(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="#${icon.hex}" {...props}>
      <title>${icon.title}</title>
      <path d="${icon.path}" />
    </svg>
  )
}`
}
