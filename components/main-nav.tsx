"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sun, Moon, Code2, Menu, X } from "lucide-react"
import { useTheme } from "@/context/theme-context"

export default function ResponsiveNav() {
  const pathname = usePathname()
  const { isDarkTheme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== "undefined") {
      // Function to determine if viewport is mobile width
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }

      // Initial check
      checkIsMobile()

      // Listen for window resize events
      window.addEventListener("resize", checkIsMobile)

      // Cleanup
      return () => window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const navItems = [
    { name: "Tech Directory", path: "/" },
    { name: "Tech Icons", path: "/tech-icons" },
    { name: "Learning Resources", path: "/learning-resources" },
    { name: "Stack Builder", path: "/stack-builder" },
  ]

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b ${
        isDarkTheme ? "border-gray-800 bg-gray-950/90" : "border-gray-200 bg-gray-50/90"
      } backdrop-blur-sm transition-colors duration-200`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between md:justify-between">
          {/* Logo - Always visible */}
          <div className="flex items-center md:gap-2">
            <div
              className={`h-10 w-10 rounded-md ${
                isDarkTheme ? "bg-gray-800" : "bg-gray-200"
              } flex items-center justify-center overflow-hidden transition-colors`}
            >
              <Code2 className={`h-6 w-6 ${isDarkTheme ? "text-blue-400" : "text-blue-600"}`} />
            </div>
            {/* Only show text with logo on desktop */}
            <Link
              href="/"
              className="hidden md:inline-block text-xl font-mono font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-teal-400 bg-clip-text text-transparent"
            >
              &lt;CodeStack/&gt;
            </Link>
          </div>
          
          {/* Centered Brand Text - Mobile Only */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:hidden">
            <Link
              href="/"
              className="text-xl font-mono font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-teal-400 bg-clip-text text-transparent"
            >
              &lt;CodeStack/&gt;
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
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

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-2 md:hidden">
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
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md ${
                isDarkTheme
                  ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } transition-colors`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className={`md:hidden mt-4 pb-2 ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
            <ul className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`block py-2 px-3 rounded-md text-sm transition-colors ${
                      pathname === item.path
                        ? isDarkTheme
                          ? "bg-gray-800 text-blue-400"
                          : "bg-gray-200 text-blue-600"
                        : isDarkTheme
                          ? "text-gray-400 hover:bg-gray-800 hover:text-blue-400"
                          : "text-gray-600 hover:bg-gray-200 hover:text-blue-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}