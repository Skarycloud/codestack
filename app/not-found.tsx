import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80dvh] flex-col items-center justify-center pt-14 text-center">
      <p className="text-[clamp(6rem,20vw,12rem)] font-semibold leading-none tracking-[-0.06em] text-gradient">404</p>
      <h1 className="text-title mt-4">This page took a different stack.</h1>
      <p className="text-lede mt-3 max-w-md text-muted-foreground">The page you’re looking for doesn’t exist or has moved.</p>
      <div className="mt-8 flex items-center gap-6">
        <Link href="/" className="pressable rounded-full bg-primary px-6 py-2.5 text-[15px] font-medium text-primary-foreground hover:brightness-110">
          Go home
        </Link>
        <Link href="/explore" className="group inline-flex items-center gap-1 text-[15px] text-link">
          Explore tools <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  )
}
