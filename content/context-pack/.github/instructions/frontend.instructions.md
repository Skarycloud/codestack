---
applyTo: "src/components/**,src/app/**/*.tsx"
description: "Frontend conventions for UI components and pages"
---

# Frontend instructions

- Use design tokens from docs/DESIGN_SYSTEM.md. No hard-coded colors, sizes or shadows.
- Reuse components from src/components before creating new ones (see docs/COMPONENT_INVENTORY.md).
- Every screen handles loading, empty, error and success states (docs/UI_UX_SPEC.md).
- Semantic HTML first; every interactive element is keyboard accessible (docs/ACCESSIBILITY.md).
- [Framework-specific rule, e.g. server components by default; "use client" only when needed]
