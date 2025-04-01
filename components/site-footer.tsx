"use client"
import { useTheme } from "@/context/theme-context"
import Link from "next/link"
import { useState } from "react"
import { Code2, Github, X, Linkedin, Mail, Heart, XCircle } from "lucide-react"

// Custom scrollbar styles
const scrollbarStyles = `
  /* For Webkit browsers like Chrome/Safari */
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: rgba(155, 155, 155, 0.5);
    border-radius: 20px;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background-color: rgba(155, 155, 155, 0.7);
  }
  
  /* For Firefox */
  .scrollbar-thin {
    scrollbar-width: thin;
    scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
  }
`

export default function SiteFooter() {
  const { isDarkTheme } = useTheme()
  const [showGuidelines, setShowGuidelines] = useState(false)
  const [showCodeOfConduct, setShowCodeOfConduct] = useState(false)

  return (
    <>
      <style jsx global>{scrollbarStyles}</style>
      <footer
      className={`${isDarkTheme ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-gray-200"} border-t py-12 transition-colors relative`}
    >
      {/* Contribution Guidelines Popup */}
      {showGuidelines && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className={`${isDarkTheme ? "bg-gray-800" : "bg-white"} rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto scrollbar-thin`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold ${isDarkTheme ? "text-white" : "text-gray-800"}`}>
                  Contribution Guidelines
                </h2>
                <button 
                  onClick={() => setShowGuidelines(false)}
                  className={`${isDarkTheme ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}
                >
                  <XCircle size={24} />
                </button>
              </div>
              
              <div className={`${isDarkTheme ? "text-gray-300" : "text-gray-700"} space-y-4`}>
                <h3 className="text-lg font-semibold">How to Contribute to CodeStack</h3>
                
                <p>Thank you for your interest in contributing to CodeStack! Here's how you can help:</p>
                
                <h4 className="font-medium">Getting Started</h4>
                <ol className="list-decimal ml-5 space-y-2">
                  <li>Fork the repository on GitHub</li>
                  <li>Clone your fork: <code className={`${isDarkTheme ? "bg-gray-700" : "bg-gray-100"} px-2 py-1 rounded`}>git clone https://github.com/your-username/codestack.git</code></li>
                  <li>Create a new branch: <code className={`${isDarkTheme ? "bg-gray-700" : "bg-gray-100"} px-2 py-1 rounded`}>git checkout -b feature/your-feature-name</code></li>
                  <li>Make your changes</li>
                  <li>Commit your changes: <code className={`${isDarkTheme ? "bg-gray-700" : "bg-gray-100"} px-2 py-1 rounded`}>git commit -m "Add your feature description"</code></li>
                  <li>Push to the branch: <code className={`${isDarkTheme ? "bg-gray-700" : "bg-gray-100"} px-2 py-1 rounded`}>git push origin feature/your-feature-name</code></li>
                  <li>Open a Pull Request</li>
                </ol>
                
                <h4 className="font-medium">Pull Request Guidelines</h4>
                <ul className="list-disc ml-5 space-y-2">
                  <li>Ensure your code follows the project's coding standards</li>
                  <li>Include tests for new features or bug fixes</li>
                  <li>Update documentation for any changes to the API</li>
                  <li>Keep your PR focused on a single topic</li>
                  <li>Be open to feedback and be responsive during the review process</li>
                </ul>
                
                <h4 className="font-medium">Development Setup</h4>
                <p>To set up the project for local development:</p>
                <pre className={`${isDarkTheme ? "bg-gray-700" : "bg-gray-100"} p-3 rounded overflow-x-auto`}>
                  {`# Install dependencies
npm install

# Start the development server
npm run dev`}
                </pre>
                
                <h4 className="font-medium">Reporting Bugs</h4>
                <p>When reporting bugs, please include:</p>
                <ul className="list-disc ml-5 space-y-2">
                  <li>Your operating system and browser</li>
                  <li>Steps to reproduce the issue</li>
                  <li>Expected behavior and actual behavior</li>
                  <li>Screenshots if applicable</li>
                </ul>
                
                <p>We appreciate all contributions and look forward to your help in making CodeStack better!</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Code of Conduct Popup */}
      {showCodeOfConduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className={`${isDarkTheme ? "bg-gray-800" : "bg-white"} rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto scrollbar-thin`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold ${isDarkTheme ? "text-white" : "text-gray-800"}`}>
                  Code of Conduct
                </h2>
                <button 
                  onClick={() => setShowCodeOfConduct(false)}
                  className={`${isDarkTheme ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}
                >
                  <XCircle size={24} />
                </button>
              </div>
              
              <div className={`${isDarkTheme ? "text-gray-300" : "text-gray-700"} space-y-4`}>
                <h3 className="text-lg font-semibold">CodeStack Community Code of Conduct</h3>
                
                <h4 className="font-medium">Our Pledge</h4>
                <p>
                  In the interest of fostering an open and welcoming environment, we as contributors 
                  and maintainers pledge to make participation in our project and our community a 
                  harassment-free experience for everyone, regardless of age, body size, disability, 
                  ethnicity, gender identity and expression, level of experience, nationality, personal 
                  appearance, race, religion, or sexual identity and orientation.
                </p>
                
                <h4 className="font-medium">Our Standards</h4>
                <p>Examples of behavior that contributes to creating a positive environment include:</p>
                <ul className="list-disc ml-5 space-y-2">
                  <li>Using welcoming and inclusive language</li>
                  <li>Being respectful of differing viewpoints and experiences</li>
                  <li>Gracefully accepting constructive criticism</li>
                  <li>Focusing on what is best for the community</li>
                  <li>Showing empathy towards other community members</li>
                </ul>
                
                <p>Examples of unacceptable behavior include:</p>
                <ul className="list-disc ml-5 space-y-2">
                  <li>The use of sexualized language or imagery and unwelcome sexual attention or advances</li>
                  <li>Trolling, insulting/derogatory comments, and personal or political attacks</li>
                  <li>Public or private harassment</li>
                  <li>Publishing others' private information without explicit permission</li>
                  <li>Other conduct which could reasonably be considered inappropriate in a professional setting</li>
                </ul>
                
                <h4 className="font-medium">Enforcement</h4>
                <p>
                  Instances of abusive, harassing, or otherwise unacceptable behavior may be reported 
                  by contacting the project team at conduct@codestack.dev. All complaints will be 
                  reviewed and investigated promptly and fairly. The project team is obligated to 
                  maintain confidentiality with regard to the reporter of an incident.
                </p>
                
                <h4 className="font-medium">Attribution</h4>
                <p>
                  This Code of Conduct is adapted from the Contributor Covenant, version 2.0, available at 
                  <a 
                    href="https://www.contributor-covenant.org/version/2/0/code_of_conduct.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${isDarkTheme ? "text-blue-400" : "text-blue-600"} ml-1`}
                  >
                    contributor-covenant.org
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className={`h-8 w-8 rounded-md ${isDarkTheme ? "bg-gray-800" : "bg-gray-200"} flex items-center justify-center overflow-hidden transition-colors`}
              >
                <Code2 className={`h-5 w-5 ${isDarkTheme ? "text-blue-400" : "text-blue-600"}`} />
              </div>
              <h1 className="text-xl font-mono font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-teal-400 bg-clip-text text-transparent">
                &lt;CodeStack/&gt;
              </h1>
            </div>
            <p className={`${isDarkTheme ? "text-gray-400" : "text-gray-600"} text-sm mb-4 transition-colors`}>
              Your comprehensive guide to modern development technologies, frameworks, and tools.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Skarycloud"
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDarkTheme ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"} transition-colors`}
              >
                <Github size={20} />
              </a>
              <a
                href="https://x.com/SumanthKum75525"
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDarkTheme ? "text-gray-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-500"} transition-colors`}
              >
                <X size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/sumanth-kumar-230194294"
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDarkTheme ? "text-gray-400 hover:text-blue-600" : "text-gray-600 hover:text-blue-700"} transition-colors`}
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:sumanth.k.0202@gmail.com"
                className={`${isDarkTheme ? "text-gray-400 hover:text-red-400" : "text-gray-600 hover:text-red-500"} transition-colors`}
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`font-semibold text-lg mb-4 ${isDarkTheme ? "text-gray-200" : "text-gray-800"}`}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className={`text-sm ${isDarkTheme ? "text-gray-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"} transition-colors`}
                >
                  Tech Directory
                </Link>
              </li>
              <li>
                <Link
                  href="/tech-icons"
                  className={`text-sm ${isDarkTheme ? "text-gray-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"} transition-colors`}
                >
                  Tech Icons
                </Link>
              </li>
              <li>
                <Link
                  href="/learning-resources"
                  className={`text-sm ${isDarkTheme ? "text-gray-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"} transition-colors`}
                >
                  Learning Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/stack-builder"
                  className={`text-sm ${isDarkTheme ? "text-gray-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"} transition-colors`}
                >
                  Stack Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* Contribute Section */}
          <div>
            <h3 className={`font-semibold text-lg mb-4 ${isDarkTheme ? "text-gray-200" : "text-gray-800"}`}>
              Contribute
            </h3>
            <p className={`text-sm ${isDarkTheme ? "text-gray-400" : "text-gray-600"} mb-4`}>
              Join our open-source community and help us make CodeStack better.
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/Skarycloud/codestack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm flex items-center gap-2 ${
                    isDarkTheme ? "text-gray-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"
                  } transition-colors`}
                >
                  <Github size={16} />
                  <span>Fork on GitHub</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => setShowGuidelines(true)}
                  className={`text-sm ${isDarkTheme ? "text-gray-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"} transition-colors`}
                >
                  Contribution Guidelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowCodeOfConduct(true)}
                  className={`text-sm ${isDarkTheme ? "text-gray-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"} transition-colors`}
                >
                  Code of Conduct
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/Skarycloud/codestack/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm ${isDarkTheme ? "text-gray-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"} transition-colors`}
                >
                  Submit an Issue
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className={`font-semibold text-lg mb-4 ${isDarkTheme ? "text-gray-200" : "text-gray-800"}`}>
              Stay Updated
            </h3>
            <p className={`text-sm ${isDarkTheme ? "text-gray-400" : "text-gray-600"} mb-4`}>
              Subscribe to our newsletter for the latest tech updates and resources.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className={`px-3 py-2 text-sm rounded-l-md w-full ${
                  isDarkTheme ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-800"
                } border focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              <button
                className={`px-3 py-2 rounded-r-md ${
                  isDarkTheme ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
                } text-white text-sm transition-colors`}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className={`text-sm ${isDarkTheme ? "text-gray-500" : "text-gray-600"} mb-4 md:mb-0`}>
            © {new Date().getFullYear()} &lt;CodeStack/&gt;. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${isDarkTheme ? "text-gray-500" : "text-gray-600"}`}>
            Made for developers
            </span>
            <Code2 className={`h-4 w-4 ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`} />
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}