import { ChevronRight, Github } from "lucide-react"
import Link from "next/link"
import { LogoMark } from "@/components/site/logo"
import { Reveal } from "@/components/motion/reveal"
import { site } from "@/lib/site"

export function OpenSourceCta() {
  return (
    <section className="shell pb-28 pt-8">
      <Reveal>
        <div className="noise relative isolate overflow-hidden rounded-[36px] bg-[#0b0b0d] px-6 py-24 text-center text-white sm:px-12 dark:bg-surface">
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-full h-[34rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_180deg,#0a84ff,#5e5ce6,#bf5af2,#ff375f,#ff9f0a,#0a84ff)] opacity-40 blur-[90px]" />
          </div>
          <div className="group mx-auto w-fit">
            <LogoMark className="size-20 drop-shadow-[0_20px_40px_rgba(94,92,230,0.55)] transition-transform duration-700 ease-apple group-hover:scale-105" />
          </div>
          <h2 className="text-headline mx-auto mt-8 max-w-[18ch]">Built in the open. Shaped by you.</h2>
          <p className="text-lede mx-auto mt-5 max-w-xl text-white/60">
            Know a tool that deserves a spot? CodeStack is free and community‑driven. Add it in a single pull request.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7">
            <a
              href={site.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-medium text-black hover:bg-white/90"
            >
              <Github className="size-[18px]" />
              Star on GitHub
            </a>
            <Link href="/contribute" className="group inline-flex items-center gap-1 text-[15px] text-[#2997ff]">
              How to contribute
              <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
