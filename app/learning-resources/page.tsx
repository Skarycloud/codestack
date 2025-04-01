"use client"
import { useState } from "react"
import { useTheme } from "@/context/theme-context"
import { ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LearningResourcesPage() {
  const { isDarkTheme } = useTheme()
  const [resourceType, setResourceType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Define resource categories
  const categories = [
    { id: "all", name: "All Resources" },
    { id: "tutorials", name: "Tutorials" },
    { id: "courses", name: "Courses" },
    { id: "documentation", name: "Documentation" },
    { id: "books", name: "Books" },
    { id: "youtube", name: "YouTube Channels" },
  ]

  // Define learning resources
  const learningResources = [
    // Frontend
    {
      name: "React Documentation",
      url: "https://react.dev",
      description: "Official React documentation with tutorials and API reference",
      type: "documentation",
      category: "frontend",
      free: true,
      level: "beginner-advanced",
    },
    {
      name: "Next.js Learn",
      url: "https://nextjs.org/learn",
      description: "Interactive Next.js course covering fundamentals to advanced patterns",
      type: "courses",
      category: "frontend",
      free: true,
      level: "beginner-intermediate",
    },
    {
      name: "Vue.js Guide",
      url: "https://vuejs.org/guide/introduction.html",
      description: "Comprehensive guide to Vue.js with examples and best practices",
      type: "documentation",
      category: "frontend",
      free: true,
      level: "beginner-advanced",
    },
    {
      name: "Tailwind CSS Screencasts",
      url: "https://www.youtube.com/c/TailwindLabs",
      description: "Official video tutorials from the Tailwind team",
      type: "youtube",
      category: "frontend",
      free: true,
      level: "beginner-advanced",
    },
    {
      name: "Frontend Masters",
      url: "https://frontendmasters.com",
      description: "In-depth courses on JavaScript, React, Vue, and more",
      type: "courses",
      category: "frontend",
      free: false,
      level: "intermediate-advanced",
    },

    // Backend
    {
      name: "Node.js Documentation",
      url: "https://nodejs.org/en/docs/",
      description: "Official Node.js documentation and API reference",
      type: "documentation",
      category: "backend",
      free: true,
      level: "beginner-advanced",
    },
    {
      name: "Django for Beginners",
      url: "https://djangoforbeginners.com/",
      description: "Step-by-step guide to building web applications with Django",
      type: "books",
      category: "backend",
      free: false,
      level: "beginner",
    },
    {
      name: "The Net Ninja",
      url: "https://www.youtube.com/c/TheNetNinja",
      description: "Tutorials on Node.js, Express, MongoDB, and more",
      type: "youtube",
      category: "backend",
      free: true,
      level: "beginner-intermediate",
    },

    // Database
    {
      name: "MongoDB University",
      url: "https://university.mongodb.com/",
      description: "Free courses on MongoDB from beginner to advanced",
      type: "courses",
      category: "database",
      free: true,
      level: "beginner-advanced",
    },
    {
      name: "PostgreSQL Tutorial",
      url: "https://www.postgresqltutorial.com/",
      description: "Comprehensive PostgreSQL tutorial with examples",
      type: "tutorials",
      category: "database",
      free: true,
      level: "beginner-intermediate",
    },

    // DevTools
    {
      name: "Git & GitHub Crash Course",
      url: "https://www.youtube.com/watch?v=RGOj5yH7evk",
      description: "Complete introduction to Git and GitHub workflow",
      type: "youtube",
      category: "devtools",
      free: true,
      level: "beginner",
    },
    {
      name: "Docker Documentation",
      url: "https://docs.docker.com/get-started/",
      description: "Official Docker getting started guide",
      type: "documentation",
      category: "devtools",
      free: true,
      level: "beginner-intermediate",
    },

    // Learning Paths
    {
      name: "The Odin Project",
      url: "https://www.theodinproject.com/",
      description: "Free full stack curriculum with projects and community support",
      type: "courses",
      category: "fullstack",
      free: true,
      level: "beginner-intermediate",
    },
    {
      name: "freeCodeCamp",
      url: "https://www.freecodecamp.org/",
      description: "Interactive learning platform with certifications",
      type: "courses",
      category: "fullstack",
      free: true,
      level: "beginner-intermediate",
    },
    {
      name: "Roadmap.sh",
      url: "https://roadmap.sh/",
      description: "Developer roadmaps for different tech stacks",
      type: "tutorials",
      category: "career",
      free: true,
      level: "all",
    },
  ]

  // Filter resources based on type and search query
  const filteredResources = learningResources.filter(
    (resource) =>
      (resourceType === "all" || resource.type === resourceType) &&
      (searchQuery === "" ||
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Group resources by category
  const groupedResources = filteredResources.reduce(
    (acc, resource) => {
      if (!acc[resource.category]) {
        acc[resource.category] = []
      }
      acc[resource.category].push(resource)
      return acc
    },
    {} as Record<string, typeof learningResources>,
  )

  return (
    <>
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-500 to-teal-400 bg-clip-text text-transparent">
          Developer Learning Resources
        </h1>
        <p className={`${isDarkTheme ? "text-gray-400" : "text-gray-600"} text-lg max-w-2xl mx-auto`}>
          Curated learning paths, tutorials, and documentation to help you master modern technologies.
        </p>
      </section>

      <div className="max-w-3xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <Input
            type="text"
            placeholder="Search resources..."
            className={`pl-10 ${isDarkTheme ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} h-12 ${isDarkTheme ? "text-gray-300" : "text-gray-700"} transition-colors`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setResourceType(category.id)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              resourceType === category.id
                ? isDarkTheme
                  ? "bg-blue-600 text-white"
                  : "bg-blue-500 text-white"
                : isDarkTheme
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {Object.keys(groupedResources).length === 0 ? (
        <div className="text-center py-12">
          <p className={`${isDarkTheme ? "text-gray-400" : "text-gray-600"} text-lg`}>
            No resources found matching your criteria. Try adjusting your search.
          </p>
        </div>
      ) : (
        Object.entries(groupedResources).map(([category, resources]) => (
          <section key={category} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold capitalize">
                {category === "fullstack" ? "Full Stack" : category === "devtools" ? "Development Tools" : category}{" "}
                Resources
              </h2>
              <div
                className={`h-px flex-1 ${isDarkTheme ? "bg-gradient-to-r from-purple-800 to-transparent" : "bg-gradient-to-r from-purple-400 to-transparent"} transition-colors`}
              ></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((resource, index) => (
                <ResourceCard key={`${category}-${index}`} resource={resource} isDarkTheme={isDarkTheme} />
              ))}
            </div>
          </section>
        ))
      )}

      <section className="mt-16 mb-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Want to contribute?</h2>
        <p className={`${isDarkTheme ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto mb-6`}>
          Help the community by suggesting learning resources for your favorite technologies.
        </p>
        <Button className={`${isDarkTheme ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"}`}>
          Suggest a Resource
        </Button>
      </section>
    </>
  )
}

function ResourceCard({
  resource,
  isDarkTheme,
}: {
  resource: {
    name: string
    url: string
    description: string
    type: string
    category: string
    free: boolean
    level: string
  }
  isDarkTheme: boolean
}) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group ${isDarkTheme ? "bg-gray-900 border-gray-800 hover:bg-gray-800" : "bg-white border-gray-200 hover:bg-gray-50"} border rounded-lg p-5 transition-all flex flex-col h-full`}
    >
      <div className="flex justify-between items-start mb-3">
        <div
          className={`text-xs font-medium px-2 py-1 rounded ${
            resource.type === "documentation"
              ? "bg-blue-500/10 text-blue-500"
              : resource.type === "courses"
                ? "bg-purple-500/10 text-purple-500"
                : resource.type === "tutorials"
                  ? "bg-green-500/10 text-green-500"
                  : resource.type === "books"
                    ? "bg-amber-500/10 text-amber-500"
                    : "bg-red-500/10 text-red-500"
          }`}
        >
          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
        </div>
        <div
          className={`text-xs font-medium px-2 py-1 rounded ${
            resource.free ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"
          }`}
        >
          {resource.free ? "Free" : "Paid"}
        </div>
      </div>

      <h3 className={`font-medium text-lg mb-2 group-hover:text-blue-400 transition-colors`}>{resource.name}</h3>

      <p className={`${isDarkTheme ? "text-gray-400" : "text-gray-600"} text-sm mb-3 flex-grow`}>
        {resource.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-dashed border-gray-700">
        <span className={`text-xs ${isDarkTheme ? "text-gray-500" : "text-gray-500"}`}>
          Level:{" "}
          {resource.level
            .split("-")
            .map((l) => l.charAt(0).toUpperCase() + l.slice(1))
            .join(" to ")}
        </span>
        <div className="flex items-center text-xs text-blue-400">
          <span>Visit resource</span>
          <ChevronRight className="h-3 w-3 ml-1" />
        </div>
      </div>
    </a>
  )
}

