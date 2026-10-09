# Design system

<!-- Agents: use these tokens and components. Never hard-code colors, sizes or shadows. -->

## Color tokens

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| background | [#FFFFFF] | [#0B0B0D] | Page background |
| foreground | [#111111] | [#F5F5F7] | Body text |
| muted | [#6B7280] | [#A1A1AA] | Secondary text |
| primary | [#0A66FF] | [#4C8DFF] | Primary actions, links |
| danger | [#DC2626] | [#F87171] | Errors, destructive actions |
| border | [#E5E7EB] | [#27272A] | Dividers, inputs |

## Typography

| Style | Size / line height | Weight | Tracking |
| --- | --- | --- | --- |
| Display | [48/52] | [700] | [-0.02em] |
| Title | [24/30] | [600] | [-0.01em] |
| Body | [16/24] | [400] | [0] |
| Small | [13/18] | [400] | [0.01em] |

Font: [family], fallback [stack].

## Spacing, radius, shadow

- Spacing scale: [4, 8, 12, 16, 24, 32, 48, 64]
- Radius: [sm 6, md 10, lg 16, full]
- Shadows: [sm, md, lg values]

## Components

| Component | Path | Use for | Don't use for |
| --- | --- | --- | --- |
| Button | [src/components/button] | Actions | Navigation (use Link) |

## Motion

- Durations: [150 ms small, 250 ms medium]. Easing: [curve].
- Respect prefers-reduced-motion: fade instead of move.

## Accessibility

- Text contrast at least 4.5:1; large text 3:1.
- Visible focus ring on every interactive element.
