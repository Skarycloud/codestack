import { brandMeta, brandSprite, brandSpriteExtra } from "@/data/brand-meta"
import { isVeryDark, isVeryLight } from "@/lib/color"
import { cn } from "@/lib/utils"

export type IconVariant = "color" | "mono"

interface BrandIconProps {
  slug?: string
  name: string
  variant?: IconVariant
  className?: string
}

/**
 * Renders a Simple Icons brand mark from the cached SVG sprite (public/brand-icons.svg),
 * so path data never ships in JavaScript. Brand colors too dark (or light) for the
 * current theme fall back to `currentColor`, so every logo stays visible.
 * Tools without a brand icon get a bold, colored initial.
 */
// Mid-tone colors that keep at least 3:1 contrast on both the light and the dark tile.
const monogramPalette = ["#0A7CFF", "#5E5CE6", "#AF52DE", "#E5355C", "#E0590C", "#1F9D55", "#0E8F9E", "#C2410C", "#7C3AED", "#DB2777"]

function monogramColor(name: string) {
  let hash = 0
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  return monogramPalette[hash % monogramPalette.length]
}

export function BrandIcon({ slug, name, variant = "color", className }: BrandIconProps) {
  const icon = slug ? brandMeta[slug] : undefined

  if (!icon) {
    // No published logo: a single bold initial, sized and colored to sit alongside real marks.
    const letter = (name.match(/[A-Za-z0-9]/)?.[0] ?? "?").toUpperCase()
    const color = variant === "mono" ? "currentColor" : monogramColor(name)
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label={name} className={cn("size-6", className)}>
        <text
          x="12"
          y="12"
          dy="0.35em"
          textAnchor="middle"
          fill={color}
          fontSize={20}
          fontWeight={750}
          letterSpacing="-0.02em"
          fontFamily="var(--font-sans), system-ui, sans-serif"
        >
          {letter}
        </text>
      </svg>
    )
  }

  const tone = variant === "mono" ? "currentColor" : isVeryDark(icon.hex) || isVeryLight(icon.hex) ? "currentColor" : `#${icon.hex}`

  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={icon.title} className={cn("size-6", className)} fill={tone}>
      <use href={`${icon.x ? brandSpriteExtra : brandSprite}#${slug}`} />
    </svg>
  )
}
