import { brandMeta, brandSprite } from "@/data/brand-meta"
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
 * Tools without a brand icon get a quiet monogram.
 */
export function BrandIcon({ slug, name, variant = "color", className }: BrandIconProps) {
  const icon = slug ? brandMeta[slug] : undefined

  if (!icon) {
    const initials = name
      .replace(/[^A-Za-z0-9 ]/g, " ")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label={name} className={cn("size-6", className)}>
        <text
          x="12"
          y="12.5"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="currentColor"
          fontSize={initials.length > 1 ? 10.5 : 14}
          fontWeight={650}
          letterSpacing="-0.04em"
          fontFamily="var(--font-sans), system-ui, sans-serif"
        >
          {initials.toUpperCase()}
        </text>
      </svg>
    )
  }

  const tone = variant === "mono" ? "currentColor" : isVeryDark(icon.hex) || isVeryLight(icon.hex) ? "currentColor" : `#${icon.hex}`

  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={icon.title} className={cn("size-6", className)} fill={tone}>
      <use href={`${brandSprite}#${slug}`} />
    </svg>
  )
}
