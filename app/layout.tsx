import type { Metadata, Viewport } from "next"
import { Geist_Mono, Inter } from "next/font/google"
import { Providers } from "@/components/site/providers"
import { Navbar } from "@/components/site/navbar"
import { Footer } from "@/components/site/footer"
import { site } from "@/lib/site"
import "./globals.css"

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" })
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: ["design tools", "developer tools", "tech stack", "brand icons", "svg icons", "learning resources", "open source"],
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh font-sans">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="min-h-dvh">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
