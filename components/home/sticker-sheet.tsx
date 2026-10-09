import Link from "next/link"
import { BrandIcon } from "@/components/brand-icon"
import { brandMeta } from "@/data/brand-meta"
import { stats, tools } from "@/data/catalog"
import { isVeryDark } from "@/lib/color"
import { cn } from "@/lib/utils"

const names = [
  "Figma",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Supabase",
  "Vercel",
  "Stripe",
  "Docker",
  "PostgreSQL",
  "Python",
  "Blender",
  "Framer",
  "Svelte",
  "Claude",
  "GitHub",
  "Webflow",
  "Astro",
  "Vue.js",
  "Rust",
  "Go",
  "TypeScript",
  "Node.js",
  "Firebase",
  "MongoDB",
  "Redis",
  "Kubernetes",
  "Cloudflare",
  "Prisma",
  "Sentry",
  "PostHog",
  "Dribbble",
  "GSAP",
  "Flutter",
  "Swift",
  "Kotlin",
  "Hugging Face",
]

const stickers = names
  .map((name) => tools.find((t) => t.name === name))
  .filter((t) => t?.icon && brandMeta[t.icon] && !brandMeta[t.icon].x)
  .map((t, i) => ({
    name: t!.name,
    slug: t!.icon!,
    category: t!.category,
    paper: isVeryDark(brandMeta[t!.icon!].hex) ? "#f1efe8" : tint(brandMeta[t!.icon!].hex, 0.82),
    // Black logos turn white in dark mode, so their stickers switch to dark paper there.
    darkPaper: isVeryDark(brandMeta[t!.icon!].hex) ? "#232326" : tint(brandMeta[t!.icon!].hex, 0.82),
    // A small, fixed tilt per sticker, as if pinned by hand. Deterministic, so server and client agree.
    tilt: ((i * 37) % 9) - 4,
  }))

/**
 * A sheet of brand stickers: paper tiles tinted in each brand's color, with an ink border and a
 * hard shadow, pinned at slight angles. Still by default; a sticker straightens and lifts on hover.
 */
export function StickerSheet() {
  return (
    <section aria-label="A few of the tools" className="shell mt-20 sm:mt-24">
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-5 sm:gap-x-5 sm:gap-y-6">
        {stickers.map((s, i) => (
          <Link
            key={s.slug}
            href={`/explore?c=${s.category}`}
            title={s.name}
            aria-label={`${s.name}: open its category`}
            className={cn("rise group outline-none", i >= 15 && "hidden sm:block", i >= 24 && "sm:hidden lg:block")}
            style={{ "--d": `${0.5 + (i % 12) * 0.035 + Math.floor(i / 12) * 0.08}s` } as React.CSSProperties}
          >
            <span
              className="grid size-[58px] place-items-center rounded-[10px] bg-[var(--paper)] dark:bg-[var(--paper-dark)] border-2 border-black shadow-[4px_4px_0_0_#000] transition-[transform,box-shadow,rotate] duration-200 ease-out [rotate:var(--tilt)] group-hover:-translate-y-1 group-hover:[rotate:0deg] group-hover:shadow-[6px_7px_0_0_#000] group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-primary group-active:translate-y-0 group-active:shadow-none dark:border-[#d4d4d8] dark:shadow-[4px_4px_0_0_#FFDC58] dark:group-hover:shadow-[6px_7px_0_0_#FFDC58] sm:size-[64px]"
              style={{ "--paper": s.paper, "--paper-dark": s.darkPaper, "--tilt": `${s.tilt}deg` } as React.CSSProperties}
            >
              <BrandIcon slug={s.slug} name={s.name} className="size-7 sm:size-8" />
            </span>
          </Link>
        ))}
      </div>
      <p className="mt-8 flex justify-between font-mono text-[11.5px] uppercase tracking-[0.08em] text-muted-foreground/70">
        <span>Fig. 02</span>
        <span>A few of the {stats.tools} tools</span>
      </p>
    </section>
  )
}

/** Mixes a brand color with white, for the sticker's pastel paper. */
function tint(hex: string, amount: number) {
  const [r, g, b] = [0, 2, 4].map((o) => {
    const c = parseInt(hex.slice(o, o + 2), 16)
    return Math.round(c + (255 - c) * amount)
  })
  return `rgb(${r},${g},${b})`
}
