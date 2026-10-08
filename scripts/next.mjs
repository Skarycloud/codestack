// Runs the Next.js CLI from the canonical project path.
//
// On Windows a terminal can report the project as `d:\…` while files resolve
// to `D:\…`. Next.js then fails with "Could not find the module … in the React
// Client Manifest" and pages return 500s. Normalising the working directory
// first avoids the mismatch. Usage: node scripts/next.mjs <dev|build|start> [...args]
import { spawn } from "node:child_process"
import { realpathSync } from "node:fs"
import { createRequire } from "node:module"

const cwd = realpathSync.native(process.cwd())
const nextBin = createRequire(`${cwd}/package.json`).resolve("next/dist/bin/next")

const child = spawn(process.execPath, [nextBin, ...process.argv.slice(2)], { cwd, stdio: "inherit" })
child.on("exit", (code, signal) => (signal ? process.kill(process.pid, signal) : process.exit(code ?? 0)))
for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => child.kill(sig))
