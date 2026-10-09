import { Github, Globe, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { LogoMark, Wordmark } from "@/components/site/logo"
import { categories } from "@/data/catalog"
import { site } from "@/lib/site"

const columns = [
  {
    title: "Explore",
    links: [
      { name: "Directory", href: "/explore" },
      { name: "Icon library", href: "/icons" },
      { name: "Learning resources", href: "/learn" },
      { name: "Stack Builder", href: "/stack-builder" },
      { name: "Agent skills", href: "/skills" },
      { name: "Developer roadmap", href: "/roadmap" },
      { name: "AI coding roadmap", href: "/roadmap/ai-coding" },
      { name: "Local LLMs", href: "/local-llms" },
    ],
  },
  {
    title: "For designers",
    links: categories
      .filter((c) => c.audience === "design")
      .slice(0, 6)
      .map((c) => ({ name: c.name, href: `/explore?c=${c.id}` })),
  },
  {
    title: "For developers",
    links: categories
      .filter((c) => c.audience === "develop")
      .slice(0, 6)
      .map((c) => ({ name: c.name, href: `/explore?c=${c.id}` })),
  },
  {
    title: "Community",
    links: [
      { name: "Contribute", href: "/contribute" },
      { name: "Code of conduct", href: "/contribute#conduct" },
      { name: "Source on GitHub", href: site.repo, external: true },
      { name: "Report an issue", href: `${site.repo}/issues`, external: true },
    ],
  },
]

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const socials = [
  { name: "GitHub", href: site.socials.github, icon: Github },
  { name: "X", href: site.socials.x, icon: XLogo },
  { name: "LinkedIn", href: site.socials.linkedin, icon: Linkedin },
  { name: "Email", href: site.socials.email, icon: Mail },
  { name: "Portfolio", href: site.socials.portfolio, icon: Globe },
]

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-surface text-[13px] dark:border-white/[0.06]">
      <div className="shell py-14">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <LogoMark className="size-8" />
              <Wordmark />
            </Link>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              A free, open source home for the tools designers and developers love. Curated by hand, shaped by the community.
            </p>
            <div className="mt-6 flex gap-1">
              {socials.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  title={name}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="pressable grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="font-semibold text-foreground">{col.title}</h2>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-black/[0.06] pt-6 text-muted-foreground dark:border-white/[0.06] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} CodeStack. Free and open source. Brand icons by{" "}
            <a
              href="https://simpleicons.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:text-foreground hover:underline"
            >
              Simple Icons
            </a>
            .
          </p>
          <p>
            Crafted by{" "}
            <a
              href={site.socials.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
            >
              {site.author}
            </a>{" "}
            and contributors.
          </p>
        </div>
      </div>
    </footer>
  )
}
