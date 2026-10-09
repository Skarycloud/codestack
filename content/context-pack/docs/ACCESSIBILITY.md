# Accessibility

Target: WCAG 2.2 level AA.

## Rules

- Semantic HTML first; ARIA only when no native element fits.
- Everything works with a keyboard; focus order follows the visual order.
- Visible focus on every interactive element.
- Text contrast at least 4.5:1 (3:1 for large text and UI parts).
- Images have meaningful alt text, or empty alt if decorative.
- Form fields have labels; errors are announced and linked to fields.
- Respect prefers-reduced-motion.
- Touch targets at least 24 by 24 CSS pixels.

## Testing

- Automated: [axe, Lighthouse] in CI.
- Manual: keyboard pass and a screen reader pass ([VoiceOver, NVDA]) on key flows before release.
