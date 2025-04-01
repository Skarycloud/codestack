"use client"
import { useState } from "react"
import { useTheme } from "@/context/theme-context"
import { Copy, Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { techIcons } from "@/data/tech-icons"

export default function TechIconsPage() {
  const { isDarkTheme } = useTheme()
  const [iconTheme, setIconTheme] = useState("dark")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div>
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-500 to-teal-400 bg-clip-text text-transparent">
          Tech Stack & Design Stack Icons
        </h1>
        <p className={`${isDarkTheme ? "text-gray-400" : "text-gray-600"} text-lg max-w-2xl mx-auto`}>
          Free, high-quality icons for your projects. Download or copy SVG code directly.
        </p>

        {/* <div className="flex justify-center gap-4 mt-8">
          <div
            className={`flex items-center gap-2 ${isDarkTheme ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-gray-200"} px-4 py-2 rounded-xl border transition-colors`}
            >
            <span className="text-red-500">📦</span>
            <span className={isDarkTheme ? "text-gray-300" : "text-gray-700"}>NPM</span>
          </div>
          <div
            className={`flex items-center gap-2 ${isDarkTheme ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-gray-200"} px-4 py-2 rounded-xl border transition-colors`}
            >
            <span className="text-blue-500">🔌</span>
            <span className={isDarkTheme ? "text-gray-300" : "text-gray-700"}>Drag & Drop Plugin</span>
          </div>
          <div
            className={`flex items-center gap-2 ${isDarkTheme ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-gray-200"} px-4 py-2 rounded-xl border transition-colors`}
          >
            <span className="text-purple-500">🎨</span>
            <span className={isDarkTheme ? "text-gray-300" : "text-gray-700"}>Tech Stack Icons</span>
          </div>
        </div> */}

        {/* <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <span>npm i @codestack/tech-icons</span>
          <button
            className={`p-1 ${isDarkTheme ? "hover:bg-gray-800" : "hover:bg-gray-200"} rounded transition-colors`}
          >
            <Copy size={14} />
          </button>
        </div> */}
      </section>

      <div className="max-w-3xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <Input
            type="text"
            placeholder="Search 251 icons..."
            className={`pl-10 ${isDarkTheme ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} h-12 ${isDarkTheme ? "text-gray-300" : "text-gray-700"} transition-colors`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="max-w-xs mx-auto mb-12">
        <Tabs defaultValue="dark" className="w-full" onValueChange={setIconTheme}>
          <TabsList
            className={`grid w-full grid-cols-3 ${isDarkTheme ? "bg-gray-900" : "bg-gray-200"} transition-colors`}
          >
            <TabsTrigger value="dark">Dark</TabsTrigger>
            <TabsTrigger value="light">Light</TabsTrigger>
            <TabsTrigger value="grayscale">Grayscale</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Dark Theme Icons */}
      {iconTheme === "dark" && (
        <>
          <h3 className="text-xl font-medium mb-6">Dark Theme Icons</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
            {techIcons
              .filter((icon) => searchQuery === "" || icon.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((icon) => (
                <IconCard
                  key={`dark-${icon.name}`}
                  name={icon.name}
                  svg={icon.svg}
                  theme="dark"
                  isDarkTheme={isDarkTheme}
                />
              ))}
          </div>
        </>
      )}

      {/* Light Theme Icons */}
      {iconTheme === "light" && (
        <>
          <h3 className="text-xl font-medium mb-6">Light Theme Icons</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
            {techIcons
              .filter((icon) => searchQuery === "" || icon.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((icon) => (
                <IconCard
                  key={`light-${icon.name}`}
                  name={icon.name}
                  svg={icon.svg}
                  theme="light"
                  isDarkTheme={isDarkTheme}
                />
              ))}
          </div>
        </>
      )}

      {/* Grayscale Theme Icons */}
      {iconTheme === "grayscale" && (
        <>
          <h3 className="text-xl font-medium mb-6">Grayscale Theme Icons</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
            {techIcons
              .filter((icon) => searchQuery === "" || icon.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((icon) => (
                <IconCard
                  key={`grayscale-${icon.name}`}
                  name={icon.name}
                  svg={icon.svg}
                  theme="grayscale"
                  isDarkTheme={isDarkTheme}
                />
              ))}
          </div>
        </>
      )}
    </div>
  )
}

function IconCard({
  name,
  svg,
  theme,
  isDarkTheme,
}: {
  name: string
  svg: string
  theme: string
  isDarkTheme: boolean
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    try {
      // Check if we're in a browser environment and clipboard API is available
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(svg || "<!-- SVG placeholder -->")
          .then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          })
          .catch(err => {
            console.error('Failed to copy: ', err)
          })
      } else {
        // Fallback for environments where clipboard API isn't available
        console.warn('Clipboard API not available in this environment')
        // You could implement a fallback copy mechanism here or show a different UI
        
        // For example, you could create a temporary textarea element
        const textarea = document.createElement('textarea')
        textarea.value = svg || "<!-- SVG placeholder -->"
        textarea.style.position = 'fixed'  // Avoid scrolling to bottom
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        
        try {
          const successful = document.execCommand('copy')
          if (successful) {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          } else {
            console.error('Fallback copying failed')
          }
        } catch (err) {
          console.error('Fallback copying error:', err)
        }
        
        document.body.removeChild(textarea)
      }
    } catch (error) {
      console.error('Copy operation failed:', error)
    }
  }

  const handleDownload = () => {
    try {
      const svgContent =
        svg ||
        `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" fill="#ccc"/><text x="20" y="20" textAnchor="middle" dominantBaseline="middle" fill="#666">${name.substring(0, 2)}</text></svg>`
      
      // Check if we're in a browser environment
      if (typeof window !== 'undefined') {
        const blob = new Blob([svgContent], { type: "image/svg+xml" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${name}-${theme}.svg`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } else {
        console.warn('Download not available in this environment')
      }
    } catch (error) {
      console.error('Download operation failed:', error)
    }
  }

  return (
    <div
      className={`${isDarkTheme ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} border rounded-xl p-4 flex flex-col items-center transition-colors`}
    >
      <div className="w-16 h-16 mb-3 flex items-center justify-center">
        {svg ? (
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        ) : (
          <div
            className={`w-12 h-12 ${isDarkTheme ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"} rounded-md flex items-center justify-center text-sm transition-colors`}
          >
            {name.substring(0, 2)}
          </div>
        )}
      </div>
      <p className={`text-sm ${isDarkTheme ? "text-gray-400" : "text-gray-600"} mb-3 transition-colors`}>{name}</p>
      <div className="flex gap-2 mt-auto">
        <Button
          variant="outline"
          size="sm"
          className={`h-8 w-8 p-0 ${isDarkTheme ? "" : "border-gray-300 bg-gray-50"}`}
          onClick={handleCopy}
          title="Copy SVG"
        >
          {copied ? <span className="text-green-500">✓</span> : <Copy size={14} />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`h-8 w-8 p-0 ${isDarkTheme ? "" : "border-gray-300 bg-gray-50"}`}
          onClick={handleDownload}
          title="Download SVG"
        >
          <Download size={14} />
        </Button>
      </div>
    </div>
  )
}