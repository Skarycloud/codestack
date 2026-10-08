"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { motion } from "framer-motion"
import { Check, Code2, Copy, Download, ImageDown, Search, X } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useDeferredValue, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { BrandIcon, type IconVariant } from "@/components/brand-icon"
import { brandJsx, brandSvg } from "@/lib/brand-svg"
import { ease } from "@/components/motion/reveal"
import { Segmented } from "@/components/segmented"
import { brandIcons } from "@/data/brand-icons"
import { isVeryDark, isVeryLight } from "@/lib/color"
import { cn } from "@/lib/utils"

const icons = Object.entries(brandIcons)
  .map(([slug, icon]) => ({ slug, ...icon }))
  .sort((a, b) => a.title.localeCompare(b.title))

type Icon = (typeof icons)[number]
type Fill = "brand" | "black" | "white"

const fillColor = (icon: Icon, fill: Fill) => (fill === "brand" ? `#${icon.hex}` : fill === "black" ? "#000000" : "#FFFFFF")

const componentName = (title: string) =>
  title
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join("")
    .replace(/^(\d)/, "Icon$1") + "Icon"

async function copy(text: string, label: string) {
  try {
    await navigator.clipboard.writeText(text)
    toast(`${label} copied to clipboard`)
  } catch {
    toast("Couldn’t access the clipboard")
  }
}

function download(href: string, filename: string) {
  const a = document.createElement("a")
  a.href = href
  a.download = filename
  a.click()
}

function downloadSvg(icon: Icon, fill: Fill) {
  const blob = new Blob([brandSvg(icon.slug, fillColor(icon, fill))], { type: "image/svg+xml" })
  const url = URL.createObjectURL(blob)
  download(url, `${icon.slug}.svg`)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function downloadPng(icon: Icon, fill: Fill, size = 512) {
  const svg = brandSvg(icon.slug, fillColor(icon, fill)).replace("<svg ", `<svg width="${size}" height="${size}" `)
  const img = new Image()
  img.onload = () => {
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = size
    canvas.getContext("2d")!.drawImage(img, 0, 0, size, size)
    download(canvas.toDataURL("image/png"), `${icon.slug}-${size}.png`)
  }
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export function IconLibrary() {
  const paramQ = useSearchParams().get("q") ?? ""
  const [query, setQuery] = useState(paramQ)
  // Follow the URL when it changes from outside, e.g. a popular icon picked in the navbar.
  useEffect(() => setQuery(paramQ), [paramQ])
  const [variant, setVariant] = useState<IconVariant>("color")
  const [selected, setSelected] = useState<Icon | null>(null)
  const deferred = useDeferredValue(query)

  const results = useMemo(() => {
    const q = deferred.trim().toLowerCase()
    return q ? icons.filter((i) => i.title.toLowerCase().includes(q) || i.slug.includes(q)) : icons
  }, [deferred])

  return (
    <>
      <div className="sticky top-14 z-30">
        <div className="glass border-y border-black/[0.06] dark:border-white/[0.07]">
          <div className="shell flex items-center gap-3 py-3">
            <label className="relative flex h-10 flex-1 items-center md:max-w-sm">
              <Search className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${icons.length} icons`}
                aria-label="Search icons"
                className="h-full w-full rounded-full bg-surface-2/80 pl-10 pr-4 text-[14px] outline-none ring-1 ring-inset ring-transparent transition-shadow placeholder:text-muted-foreground focus:ring-primary/60"
              />
            </label>
            <Segmented
              size="sm"
              value={variant}
              onChange={setVariant}
              options={[
                { value: "color", label: "Color" },
                { value: "mono", label: "Mono" },
              ]}
              className="ml-auto"
            />
          </div>
        </div>
      </div>

      <div className="shell min-h-[60vh] pb-28 pt-10">
        <p className="mb-6 text-[14px] text-muted-foreground">{results.length} icons · click any icon for SVG, JSX and PNG downloads.</p>
        {results.length === 0 ? (
          <p className="py-24 text-center text-[20px] font-semibold tracking-[-0.02em]">No icons match “{query}”.</p>
        ) : (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {results.map((icon, i) => (
              <motion.div
                key={icon.slug}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: (i % 8) * 0.025 }}
                className="group relative"
              >
                <button
                  onClick={() => setSelected(icon)}
                  className="card-surface card-lift flex aspect-square w-full flex-col items-center justify-center gap-3 p-3"
                >
                  <BrandIcon
                    slug={icon.slug}
                    name={icon.title}
                    variant={variant}
                    className="size-9 transition-transform duration-500 ease-apple group-hover:scale-110"
                  />
                  <span className="w-full truncate text-center text-[12px] text-muted-foreground">{icon.title}</span>
                </button>
                <button
                  onClick={() => copy(brandSvg(icon.slug), `${icon.title} SVG`)}
                  aria-label={`Copy ${icon.title} SVG`}
                  className="pressable absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-background/90 text-muted-foreground opacity-0 shadow-sm ring-1 ring-black/[0.06] transition-opacity hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100 dark:ring-white/10"
                >
                  <Copy className="size-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <IconSheet icon={selected} onClose={() => setSelected(null)} />
    </>
  )
}

function IconSheet({ icon, onClose }: { icon: Icon | null; onClose: () => void }) {
  const [fill, setFill] = useState<Fill>("brand")
  const [copiedHex, setCopiedHex] = useState(false)

  return (
    <Dialog.Root open={!!icon} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/30 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-black/60" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 z-[81] mx-auto max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] bg-popover shadow-2xl duration-500 ease-apple data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom sm:bottom-auto sm:top-1/2 sm:w-[calc(100%-2rem)] sm:-translate-y-1/2 sm:rounded-[28px] sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95 sm:data-[state=closed]:slide-out-to-bottom-0 sm:data-[state=open]:slide-in-from-bottom-0"
        >
          {icon && (
            <div className="grid sm:grid-cols-2">
              <div className="grid grid-cols-2 sm:grid-cols-1 sm:grid-rows-2">
                <div className="grid aspect-square place-items-center bg-white sm:aspect-auto sm:rounded-tl-[28px]">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-24"
                    fill={fill === "white" || (fill === "brand" && isVeryLight(icon.hex)) ? "#000" : fillColor(icon, fill)}
                  >
                    <path d={icon.path} />
                  </svg>
                </div>
                <div className="grid aspect-square place-items-center bg-[#0b0b0d] sm:aspect-auto sm:rounded-bl-[28px]">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-24"
                    fill={fill === "black" || (fill === "brand" && isVeryDark(icon.hex)) ? "#fff" : fillColor(icon, fill)}
                  >
                    <path d={icon.path} />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Dialog.Title className="text-[26px] font-semibold tracking-[-0.03em]">{icon.title}</Dialog.Title>
                    <button
                      onClick={() => {
                        copy(`#${icon.hex}`, "Hex")
                        setCopiedHex(true)
                        setTimeout(() => setCopiedHex(false), 1500)
                      }}
                      className="mt-2 inline-flex items-center gap-2 rounded-full bg-surface-2 py-1 pl-1 pr-3 font-mono text-[12px] text-muted-foreground hover:text-foreground"
                    >
                      <span className="size-5 rounded-full ring-1 ring-black/10" style={{ background: `#${icon.hex}` }} />#{icon.hex}
                      {copiedHex ? <Check className="size-3" /> : <Copy className="size-3" />}
                    </button>
                  </div>
                  <Dialog.Close
                    className="pressable grid size-8 place-items-center rounded-full bg-surface-2 text-muted-foreground hover:text-foreground"
                    aria-label="Close"
                  >
                    <X className="size-4" />
                  </Dialog.Close>
                </div>

                <p className="mt-6 text-[13px] font-medium text-muted-foreground">Fill</p>
                <Segmented
                  size="sm"
                  value={fill}
                  onChange={setFill}
                  className="mt-2 self-start"
                  options={[
                    { value: "brand", label: "Brand" },
                    { value: "black", label: "Black" },
                    { value: "white", label: "White" },
                  ]}
                />

                <div className="mt-8 grid grid-cols-3 gap-2">
                  <Action icon={Copy} label="Copy SVG" primary onClick={() => copy(brandSvg(icon.slug, fillColor(icon, fill)), "SVG")} />
                  <Action
                    icon={Code2}
                    label="JSX"
                    onClick={() =>
                      copy(brandJsx(icon.slug, componentName(icon.title)).replace(`#${icon.hex}`, fillColor(icon, fill)), "React component")
                    }
                  />
                  <Action icon={Download} label="SVG" onClick={() => downloadSvg(icon, fill)} />
                  <Action icon={ImageDown} label="PNG" onClick={() => downloadPng(icon, fill)} />
                </div>

                <p className="mt-auto pt-8 text-[12px] leading-relaxed text-muted-foreground">
                  Icon from Simple Icons (CC0). Brand marks are trademarks of their owners, so follow each brand’s usage guidelines.
                </p>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function Action({ icon: Icon, label, onClick, primary }: { icon: typeof Copy; label: string; onClick: () => void; primary?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "pressable flex h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2 text-[13px] font-medium",
        primary ? "col-span-3 bg-primary text-primary-foreground hover:brightness-110" : "bg-surface-2 hover:bg-foreground/10",
      )}
    >
      <Icon className="size-4" />
      {label}
    </button>
  )
}
