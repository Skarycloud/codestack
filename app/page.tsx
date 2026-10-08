import { Audiences } from "@/components/home/audiences"
import { CategoryBento } from "@/components/home/category-bento"
import { FeatureCarousel } from "@/components/home/feature-carousel"
import { Hero } from "@/components/home/hero"
import { LogoMarquee } from "@/components/home/logo-marquee"
import { OpenSourceCta } from "@/components/home/open-source-cta"
import { Stats } from "@/components/home/stats"

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Audiences />
      <CategoryBento />
      <FeatureCarousel />
      <Stats />
      <OpenSourceCta />
    </>
  )
}
