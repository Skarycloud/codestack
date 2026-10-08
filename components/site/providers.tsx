"use client"

import { MotionConfig } from "framer-motion"
import { ThemeProvider } from "next-themes"
import { Toaster } from "sonner"
import { CommandMenuProvider } from "@/components/site/command-menu"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <CommandMenuProvider>{children}</CommandMenuProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            classNames: {
              toast:
                "!rounded-full !border-black/[0.06] !bg-foreground !text-background !shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)] !py-3 !px-5 !text-[14px] !font-medium !w-auto !mx-auto dark:!border-white/10",
            },
          }}
        />
      </MotionConfig>
    </ThemeProvider>
  )
}
