"use client"

import { Check, Copy, Download, Eye, EyeOff, FolderDown } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { saveFile, zip } from "@/lib/zip"
import { cn } from "@/lib/utils"

// Templates are bundled separately and fetched the first time someone needs one.
const loadTemplates = () => import("@/data/context-templates").then((m) => m.templates)

const btn = "nb-box-sm nb-press inline-flex items-center gap-1.5 bg-[var(--nb-card)] px-2.5 py-1 text-[13px] font-bold"

async function copy(text: string, label: string) {
  try {
    await navigator.clipboard.writeText(text)
    toast.success(`Copied ${label}`)
    return true
  } catch {
    toast.error("Couldn't copy. Select the text and copy it instead.")
    return false
  }
}

/** Copies a block of text, such as a prompt. */
export function CopyText({ text, label, className }: { text: string; label: string; className?: string }) {
  const [done, setDone] = useState(false)
  return (
    <button
      onClick={async () => {
        if (await copy(text, label)) {
          setDone(true)
          setTimeout(() => setDone(false), 1500)
        }
      }}
      className={cn(btn, className)}
      aria-label={`Copy ${label}`}
    >
      {done ? <Check className="size-3.5" strokeWidth={3} /> : <Copy className="size-3.5" />}
      {done ? "Copied" : "Copy"}
    </button>
  )
}

/** Copy, download and preview for one Context Pack template. */
export function TemplateActions({ path }: { path: string }) {
  const [preview, setPreview] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const name = path.split("/").pop()!

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          className={btn}
          onClick={async () => {
            const t = await loadTemplates()
            if (await copy(t[path], name)) {
              setCopied(true)
              setTimeout(() => setCopied(false), 1500)
            }
          }}
        >
          {copied ? <Check className="size-3.5" strokeWidth={3} /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy template"}
        </button>
        <button className={btn} onClick={async () => saveFile(name, (await loadTemplates())[path])}>
          <Download className="size-3.5" />
          Download
        </button>
        <button
          className={btn}
          aria-expanded={preview !== null}
          onClick={async () => setPreview(preview === null ? (await loadTemplates())[path] : null)}
        >
          {preview === null ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
          {preview === null ? "Preview" : "Hide"}
        </button>
      </div>
      {preview !== null && (
        <pre className="mt-3 max-h-[420px] overflow-auto border-2 border-[var(--nb-line)] bg-[var(--nb-bg)] p-3.5 font-mono text-[12.5px] leading-relaxed">
          {preview}
        </pre>
      )}
    </div>
  )
}

/** Downloads a whole pack as a .zip, folders included, ready to unzip into a project. */
export function PackDownload({ id, files }: { id: string; files: string[] }) {
  const [busy, setBusy] = useState(false)
  return (
    <button
      disabled={busy}
      onClick={async () => {
        setBusy(true)
        const t = await loadTemplates()
        saveFile(`context-pack-${id}.zip`, zip(files.map((p) => ({ path: p, content: t[p] }))))
        toast.success(`Downloaded ${files.length} files`)
        setBusy(false)
      }}
      className="nb-box nb-press nb-alt-shadow inline-flex w-full items-center justify-center gap-2 bg-[var(--nb-yellow)] px-4 py-2.5 text-[15px] font-bold text-black"
    >
      <FolderDown className="size-4" />
      {busy ? "Preparing…" : `Download ${files.length} files (.zip)`}
    </button>
  )
}
