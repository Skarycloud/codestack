import { Instrument_Sans, Instrument_Serif } from "next/font/google"

// Display type for headlines that need character: a crisp grotesk paired with an editorial
// serif italic. Shared so each font is only bundled once.
export const display = Instrument_Sans({ subsets: ["latin"], weight: ["400", "600"], display: "swap" })
export const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", display: "swap" })
