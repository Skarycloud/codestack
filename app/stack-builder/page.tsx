"use client"
import { useState } from "react"
import { useTheme } from "@/context/theme-context"
import { Button } from "@/components/ui/button"
import { techIcons } from "@/data/tech-icons"
import { Check, Info, Code2 } from "lucide-react"

// Define popular tech stacks
const popularStacks = [
  {
    name: "MERN Stack",
    description: "MongoDB, Express.js, React, Node.js - Full JavaScript stack for web applications",
    components: {
      frontend: ["React"],
      backend: ["Node.js", "Express.js"],
      database: ["MongoDB"],
    },
  },
  {
    name: "MEAN Stack",
    description: "MongoDB, Express.js, Angular, Node.js - Full JavaScript stack with Angular",
    components: {
      frontend: ["Angular"],
      backend: ["Node.js", "Express.js"],
      database: ["MongoDB"],
    },
  },
  {
    name: "MEVN Stack",
    description: "MongoDB, Express.js, Vue.js, Node.js - Full JavaScript stack with Vue.js",
    components: {
      frontend: ["Vue.js"],
      backend: ["Node.js", "Express.js"],
      database: ["MongoDB"],
    },
  },
  {
    name: "LAMP Stack",
    description: "Linux, Apache, MySQL, PHP - Traditional web development stack",
    components: {
      frontend: [],
      backend: ["PHP"],
      database: ["MySQL"],
    },
  },
  {
    name: "JAMstack",
    description: "JavaScript, APIs, Markup - Modern web development architecture",
    components: {
      frontend: ["React", "Next.js", "Gatsby"],
      backend: [],
      database: [],
    },
  },
  {
    name: "T3 Stack",
    description: "TypeScript, tRPC, Tailwind, Next.js, Prisma - Modern full-stack development",
    components: {
      frontend: ["Next.js", "Tailwind CSS"],
      backend: ["Node.js"],
      database: ["Prisma"],
    },
  },
]

export default function StackBuilderPage() {
  const { isDarkTheme } = useTheme()
  const [selectedTech, setSelectedTech] = useState<Record<string, string[]>>({
    frontend: [],
    backend: [],
    database: [],
    devtools: [],
  })
  const [recommendedStack, setRecommendedStack] = useState<null | (typeof popularStacks)[0]>(null)
  const [customStack, setCustomStack] = useState<null | { name: string; description: string }>(null)

  const handleTechSelect = (category: string, techName: string) => {
    setSelectedTech((prev) => {
      const newSelection = { ...prev }

      if (newSelection[category].includes(techName)) {
        // Remove if already selected
        newSelection[category] = newSelection[category].filter((name) => name !== techName)
      } else {
        // Add if not selected
        newSelection[category] = [...newSelection[category], techName]
      }

      return newSelection
    })

    // Reset recommendations when selection changes
    setRecommendedStack(null)
    setCustomStack(null)
  }

  const generateRecommendation = () => {
    // First check if the selection matches any popular stack
    for (const stack of popularStacks) {
      const frontendMatch = stack.components.frontend.every((tech) => selectedTech.frontend.includes(tech))
      const backendMatch = stack.components.backend.every((tech) => selectedTech.backend.includes(tech))
      const databaseMatch = stack.components.database.every((tech) => selectedTech.database.includes(tech))

      if (frontendMatch && backendMatch && databaseMatch) {
        setRecommendedStack(stack)
        setCustomStack(null)
        return
      }
    }

    // If no match, generate a custom recommendation
    let stackName = ""
    let description = "Custom stack with "

    if (selectedTech.frontend.length > 0) {
      stackName += selectedTech.frontend[0].substring(0, 1)
      description += `${selectedTech.frontend.join(", ")} for frontend`
    }

    if (selectedTech.backend.length > 0) {
      stackName += selectedTech.backend[0].substring(0, 1)
      description +=
        selectedTech.frontend.length > 0
          ? `, ${selectedTech.backend.join(", ")} for backend`
          : `${selectedTech.backend.join(", ")} for backend`
    }

    if (selectedTech.database.length > 0) {
      stackName += selectedTech.database[0].substring(0, 1)
      description +=
        selectedTech.frontend.length > 0 || selectedTech.backend.length > 0
          ? `, and ${selectedTech.database.join(", ")} for database`
          : `${selectedTech.database.join(", ")} for database`
    }

    stackName += " Stack"

    setCustomStack({
      name: stackName,
      description: description,
    })
    setRecommendedStack(null)
  }

  const clearSelection = () => {
    setSelectedTech({
      frontend: [],
      backend: [],
      database: [],
      devtools: [],
    })
    setRecommendedStack(null)
    setCustomStack(null)
  }

  const selectPopularStack = (stack: (typeof popularStacks)[0]) => {
    // Set the selected technologies based on the popular stack
    const newSelection = {
      frontend: [...stack.components.frontend],
      backend: [...stack.components.backend],
      database: [...stack.components.database],
      devtools: [],
    }

    setSelectedTech(newSelection)
    setRecommendedStack(stack)
    setCustomStack(null)
  }

  return (
    <div>
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-500 to-teal-400 bg-clip-text text-transparent">
          <Code2 className="inline-block mr-2 mb-1" /> Tech Stack Builder
        </h1>
        <p className={`${isDarkTheme ? "text-gray-400" : "text-gray-600"} text-lg max-w-2xl mx-auto`}>
          Select technologies from each category to build your ideal tech stack or get recommendations based on industry
          standards.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Build Your Stack</h2>
            <p className={`${isDarkTheme ? "text-gray-400" : "text-gray-600"} mb-6`}>
              Select technologies from each category to create your custom tech stack.
            </p>

            {/* Frontend Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4">Frontend</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {techIcons
                  .filter((icon) => icon.category === "frontend")
                  .map((tech) => (
                    <TechSelectCard
                      key={tech.name}
                      name={tech.name}
                      svg={tech.svg}
                      isSelected={selectedTech.frontend.includes(tech.name)}
                      onClick={() => handleTechSelect("frontend", tech.name)}
                      isDarkTheme={isDarkTheme}
                    />
                  ))}
              </div>
            </div>

            {/* Backend Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4">Backend</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {techIcons
                  .filter((icon) => icon.category === "backend")
                  .map((tech) => (
                    <TechSelectCard
                      key={tech.name}
                      name={tech.name}
                      svg={tech.svg}
                      isSelected={selectedTech.backend.includes(tech.name)}
                      onClick={() => handleTechSelect("backend", tech.name)}
                      isDarkTheme={isDarkTheme}
                    />
                  ))}
              </div>
            </div>

            {/* Database Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4">Database</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {techIcons
                  .filter((icon) => icon.category === "database")
                  .map((tech) => (
                    <TechSelectCard
                      key={tech.name}
                      name={tech.name}
                      svg={tech.svg}
                      isSelected={selectedTech.database.includes(tech.name)}
                      onClick={() => handleTechSelect("database", tech.name)}
                      isDarkTheme={isDarkTheme}
                    />
                  ))}
              </div>
            </div>

            {/* DevTools Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4">Development Tools</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {techIcons
                  .filter((icon) => icon.category === "devtools")
                  .map((tech) => (
                    <TechSelectCard
                      key={tech.name}
                      name={tech.name}
                      svg={tech.svg}
                      isSelected={selectedTech.devtools.includes(tech.name)}
                      onClick={() => handleTechSelect("devtools", tech.name)}
                      isDarkTheme={isDarkTheme}
                    />
                  ))}
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Button
                onClick={generateRecommendation}
                className={`${isDarkTheme ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"}`}
                disabled={Object.values(selectedTech).every((arr) => arr.length === 0)}
              >
                Generate Stack
              </Button>
              <Button
                variant="outline"
                onClick={clearSelection}
                disabled={Object.values(selectedTech).every((arr) => arr.length === 0)}
              >
                Clear Selection
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Popular Stacks</h2>
          <p className={`${isDarkTheme ? "text-gray-400" : "text-gray-600"} mb-6`}>
            Choose from industry-standard tech stacks or get recommendations based on your selections.
          </p>

          <div className="space-y-4">
            {popularStacks.map((stack) => (
              <div
                key={stack.name}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isDarkTheme
                    ? "bg-gray-900 border-gray-800 hover:bg-gray-800"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => selectPopularStack(stack)}
              >
                <h3 className="font-medium text-lg">{stack.name}</h3>
                <p className={`text-sm ${isDarkTheme ? "text-gray-400" : "text-gray-600"} mt-1`}>{stack.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendation Results */}
      {(recommendedStack || customStack) && (
        <div
          className={`p-6 rounded-xl border mb-12 ${
            isDarkTheme ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">{recommendedStack ? recommendedStack.name : customStack?.name}</h2>
          <p className={`${isDarkTheme ? "text-gray-400" : "text-gray-600"} mb-6`}>
            {recommendedStack ? recommendedStack.description : customStack?.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-3">Frontend</h3>
              <ul className="space-y-2">
                {selectedTech.frontend.length > 0 ? (
                  selectedTech.frontend.map((tech) => (
                    <li key={tech} className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span>{tech}</span>
                    </li>
                  ))
                ) : (
                  <li className={`text-sm ${isDarkTheme ? "text-gray-500" : "text-gray-400"}`}>No frontend selected</li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3">Backend</h3>
              <ul className="space-y-2">
                {selectedTech.backend.length > 0 ? (
                  selectedTech.backend.map((tech) => (
                    <li key={tech} className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span>{tech}</span>
                    </li>
                  ))
                ) : (
                  <li className={`text-sm ${isDarkTheme ? "text-gray-500" : "text-gray-400"}`}>No backend selected</li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3">Database</h3>
              <ul className="space-y-2">
                {selectedTech.database.length > 0 ? (
                  selectedTech.database.map((tech) => (
                    <li key={tech} className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span>{tech}</span>
                    </li>
                  ))
                ) : (
                  <li className={`text-sm ${isDarkTheme ? "text-gray-500" : "text-gray-400"}`}>No database selected</li>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 text-blue-500">
            <Info size={20} className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm">
                This stack is {recommendedStack ? "a popular industry standard" : "a custom combination"} that works
                well for
                {selectedTech.frontend.length > 0 ? " frontend web applications" : ""}
                {selectedTech.backend.length > 0
                  ? selectedTech.frontend.length > 0
                    ? " with server-side functionality"
                    : " backend services"
                  : ""}
                {selectedTech.database.length > 0 ? " and data persistence" : ""}.
              </p>
              <p className="text-sm mt-2">
                {recommendedStack
                  ? "This is a well-documented stack with strong community support and plenty of learning resources."
                  : "Consider exploring tutorials and documentation for each technology to understand how they work together."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TechSelectCard({
  name,
  svg,
  isSelected,
  onClick,
  isDarkTheme,
}: {
  name: string
  svg: string
  isSelected: boolean
  onClick: () => void
  isDarkTheme: boolean
}) {
  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-xl border cursor-pointer transition-all ${
        isSelected
          ? isDarkTheme
            ? "bg-blue-900/30 border-blue-500"
            : "bg-blue-50 border-blue-300"
          : isDarkTheme
            ? "bg-gray-900 border-gray-800 hover:bg-gray-800"
            : "bg-white border-gray-200 hover:bg-gray-50"
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={`w-12 h-12 mb-2 rounded-xl ${isDarkTheme ? "bg-gray-800" : "bg-gray-100"} p-2 flex items-center justify-center transition-colors`}
        >
          {svg ? (
            <div dangerouslySetInnerHTML={{ __html: svg }} />
          ) : (
            <div
              className={`w-8 h-8 ${isDarkTheme ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-600"} rounded-md flex items-center justify-center text-xs transition-colors`}
            >
              {name.substring(0, 2)}
            </div>
          )}
        </div>
        <p className={`text-sm ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>{name}</p>
        {isSelected && (
          <div className="mt-1 text-blue-500">
            <Check size={16} />
          </div>
        )}
      </div>
    </div>
  )
}

