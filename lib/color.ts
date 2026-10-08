/** Relative luminance (0–1) of a 6‑digit hex color, per WCAG. */
export function luminance(hex: string) {
  const channels = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

/** Brand colors that would vanish on a dark (or light) background. */
export const isVeryDark = (hex: string) => luminance(hex) < 0.045
export const isVeryLight = (hex: string) => luminance(hex) > 0.8
