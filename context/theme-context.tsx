"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type ThemeContextType = {
  isDarkTheme: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  useEffect(() => {
    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDarkTheme(savedTheme === "dark")
    }

    // Apply theme to document
    applyTheme(savedTheme === "dark" || (savedTheme === null && true))
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkTheme
    setIsDarkTheme(newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
    applyTheme(newTheme)
  }

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add("dark")
      document.body.style.backgroundColor = "#09090b"
      document.body.style.color = "#f1f5f9"
    } else {
      document.documentElement.classList.remove("dark")
      document.body.style.backgroundColor = "#ffffff"
      document.body.style.color = "#1e293b"
    }
  }

  return <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

