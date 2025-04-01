"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sun, Moon, Code2 } from "lucide-react"
import { useTheme } from "@/context/theme-context"

export default function MainNav() {
  const pathname = usePathname()
  const { isDarkTheme, toggleTheme } = useTheme()

  const navItems = [
    { name: "Tech Directory", path: "/" },
    { name: "Tech Icons", path: "/tech-icons" },
    { name: "Learning Resources", path: "/learning-resources" },
    { name: "Stack Builder", path: "/stack-builder" },
  ]

  return (
    <header
      className={`sticky top-0 z-10 border-b ${isDarkTheme ? "border-gray-800 bg-gray-950/80" : "border-gray-200 bg-gray-50/80"} backdrop-blur-sm transition-colors duration-200`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`h-10 w-10 rounded-md ${isDarkTheme ? "bg-gray-800" : "bg-gray-200"} flex items-center justify-center overflow-hidden transition-colors`}
          >
            <Code2 className={`h-6 w-6 ${isDarkTheme ? "text-blue-400" : "text-blue-600"}`} />
          </div>
          <Link
            href="/"
            className="text-xl font-mono font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-teal-400 bg-clip-text text-transparent"
          >
            &lt;CodeStack/&gt;
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <nav>
            <ul className="flex gap-6">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`text-sm transition-colors ${
                      pathname === item.path
                        ? "text-blue-400"
                        : isDarkTheme
                          ? "text-gray-400 hover:text-blue-400"
                          : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              isDarkTheme
                ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-colors`}
            aria-label="Toggle theme"
          >
            {isDarkTheme ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}

