import { BrandIcon } from "@/components/brand-icon"
import { tools } from "@/data/catalog"

const featured = [
  "Figma", "React", "Next.js", "Framer", "Tailwind CSS", "Vercel", "Supabase", "Blender", "Svelte",
  "Dribbble", "Docker", "Stripe", "Webflow", "PostgreSQL", "GSAP", "Behance", "Astro", "Claude",
]
const row = featured.map((name) => tools.find((t) => t.name === name)!).filter(Boolean)

export function LogoMarquee() {
  return (
    <section className="py-16 sm:py-20" aria-label="Featured tools">
      <p className="shell text-center text-[13px] text-muted-foreground">The tools behind the world's best products, gathered in one place.</p>
      <div className="mask-fade-x group mt-8 flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-14 pr-14 group-hover:[animation-play-state:paused]" style={{ ["--duration" as string]: "60s" }}>
          {[...row, ...row].map((tool, i) => (
            <a
              key={i}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={i >= row.length ? -1 : undefined}
              aria-hidden={i >= row.length || undefined}
              className="group/logo flex shrink-0 items-center gap-2.5 text-foreground/65 transition-colors duration-300 hover:text-foreground"
            >
              <span className="grayscale transition-[filter] duration-300 group-hover/logo:grayscale-0">
                <BrandIcon slug={tool.icon} name={tool.name} className="size-6" />
              </span>
              <span className="text-[17px] font-semibold tracking-[-0.02em]">{tool.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
