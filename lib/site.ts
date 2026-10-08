/** Public URL of the site. Set NEXT_PUBLIC_SITE_URL in production (e.g. https://codestack.dev). */
const url =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")

export const site = {
  name: "CodeStack",
  url,
  tagline: "Everything you need to design and build.",
  description:
    "An open source, hand‑picked directory of the best tools, icons and learning resources for designers and developers, all in one place.",
  repo: "https://github.com/Skarycloud/codestack",
  author: "Sumanth Kumar",
  socials: {
    github: "https://github.com/Skarycloud",
    x: "https://x.com/SumanthKum75525",
    linkedin: "https://www.linkedin.com/in/sumanth-kumar-230194294",
    email: "mailto:sumanth.k.0202@gmail.com",
    portfolio: "https://sumanth-kumar-portfolio.vercel.app",
  },
}
