# CodeStack

An open source, hand‑picked directory of the best tools, brand icons and learning resources for designers and developers, all in one place.

## Features

- **Explore:** 160+ curated tools across 17 categories, filterable by design or development.
- **Icon library:** brand logos you can copy as SVG or JSX, or export as PNG.
- **Learn:** the best docs, courses, books and channels, grouped by track.
- **Stack Builder:** pick a stack, compare it to proven presets, share it or copy it as Markdown.
- **Agent Skills:** 190 skills for Claude Code, Codex, Cursor and more, by field.
- **⌘K search:** jump to any tool, category or page from anywhere.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```

## Deploying

Set `NEXT_PUBLIC_SITE_URL` to your public URL (for example `https://codestack.dev`) so the sitemap,
robots.txt and social share images use absolute links. On Vercel this falls back to the production URL automatically.

## Adding a tool

1. Add an entry to [`data/catalog.ts`](data/catalog.ts).
2. If the brand exists on [Simple Icons](https://simpleicons.org), set `icon` to its slug and run `npm run icons`.
   This regenerates the logo sprite (`public/brand-icons.svg`) and its metadata, so logos never ship inside JavaScript.
3. Open a pull request.

Learning resources live in [`data/resources.ts`](data/resources.ts), agent skills in [`data/skills.ts`](data/skills.ts) and stack presets in [`data/stacks.ts`](data/stacks.ts).

## Stack

Next.js 15 (App Router) · React 19 · Tailwind CSS · Framer Motion · Radix Dialog · cmdk · Simple Icons
