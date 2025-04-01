import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import MainNav from "@/components/main-nav"
import SiteFooter from "@/components/site-footer"
import { ThemeProvider } from "@/context/theme-context"
import dynamic from 'next/dynamic';

// Dynamic imports
const AnimatedLogoClient = dynamic(() => import('../components/AnimatedLogoClient'));
const PageTransition = dynamic(() => import('../components/PageTransition'), { ssr: true });

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "<CodeStack/> - Developer Technology Hub",
  description: "A comprehensive directory of development technologies, frameworks, and tools",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} transition-colors duration-200`}>
        <ThemeProvider>
          {/* The animated logo will be loaded client-side */}
          <AnimatedLogoClient />
          <div className="min-h-screen flex flex-col">
            <MainNav />
            <PageTransition>
              <main className="container mx-auto px-4 py-12 flex-grow">{children}</main>
              <SiteFooter />
            </PageTransition>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}