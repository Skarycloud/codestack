import { brandIcons, type BrandIcon } from "@/data/brand-icons"

// Full SVG path data lives here, imported only by the icon library's copy and
// download features. Everything else renders logos from the cached sprite.

const viewBox = (icon: BrandIcon) => icon.viewBox ?? "0 0 24 24"
const inner = (icon: BrandIcon) => icon.body ?? `<path d="${icon.path}"/>`

/** Raw SVG markup for copy / download. */
export function brandSvg(slug: string, color?: string) {
  const icon = brandIcons[slug]
  if (!icon) return ""
  const fill = color ?? `#${icon.hex}`
  return `<svg role="img" viewBox="${viewBox(icon)}" xmlns="http://www.w3.org/2000/svg" fill="${fill}"><title>${icon.title}</title>${inner(icon)}</svg>`
}

export function brandJsx(slug: string, component: string) {
  const icon = brandIcons[slug]
  if (!icon) return ""
  // JSX spells SVG attributes in camelCase: fill-rule becomes fillRule, and so on.
  const jsx = inner(icon).replace(/ ([a-z]+)-([a-z]+)=/g, (_, a: string, b: string) => ` ${a}${b[0].toUpperCase()}${b.slice(1)}=`)
  return `export function ${component}(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg role="img" viewBox="${viewBox(icon)}" fill="#${icon.hex}" {...props}>
      <title>${icon.title}</title>
      ${jsx}
    </svg>
  )
}`
}
