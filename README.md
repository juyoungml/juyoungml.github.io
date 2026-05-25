# juyoung.site

Personal site for Juyoung Suk — ML engineer at Trillion Labs, Seoul. Source for [juyoung.site](https://juyoung.site).

Static Next.js 14 (Pages Router) build hosted on GitHub Pages with a custom domain. Bilingual (EN + KO), self-hosted analytics, comments via GitHub Discussions.

## Quickstart

```bash
npm install
npm run dev                 # localhost:3000
npm run build               # static export → /out
npm run lint                # eslint
npm run typecheck           # tsc --noEmit
npm run format              # prettier write
npm run format:check        # prettier check (CI uses this)
```

## What's in here

- `pages/` — routes. `index.tsx`, `ko/index.tsx`, `blog/`, `blog/ko/`, `papers/`, `now`, `reading`, `talks`.
- `components/` — UI. Notable: `HomeView.tsx` (locale-aware), `Navigation.tsx`, `blog/BlogPostView.tsx`, `blog/Comments.tsx` (Giscus), `blog/ViewCount.tsx`, `NewsletterSignup.tsx`, `ThemeToggle.tsx`.
- `content/` — MDX. `blog/` and `blog/ko/` for posts, `papers/` for papers, `now.mdx` / `reading.mdx` / `talks.mdx` for one-off pages.
- `lib/` — non-UI logic. `site.ts` (constants), `i18n.ts` (chrome strings), `blog.ts`, `papers.ts`, `content.ts`, `tags.ts`, `analytics.ts`.
- `scripts/` — postbuild generators: `build-sitemap.mjs`, `build-feeds.mjs`, `build-llms.mjs`, `build-og-images.mjs`, `build-views.mjs`.
- `cv/` — Typst source; `npm run cv:build` outputs `public/juyoung-cv.pdf`.
- `.github/workflows/` — `ci.yml` (lint/typecheck/build on every push and PR), `deploy.yml` (build + push `out/` to `gh-pages`), `build-cv.yml`, `update-publications.yml`.

## Stack

| Layer      | Choice                                                                         |
| ---------- | ------------------------------------------------------------------------------ |
| Framework  | Next.js 14 Pages Router, `output: 'export'`                                    |
| Language   | TypeScript strict                                                              |
| Styling    | TailwindCSS + CSS variables; warm light + warm dark                            |
| Content    | MDX via `next-mdx-remote/serialize`                                            |
| Math       | KaTeX (rehype-katex + remark-math)                                             |
| Search     | Pagefind (postbuild)                                                           |
| Analytics  | Self-hosted Umami on Railway                                                   |
| Comments   | Giscus (GitHub Discussions)                                                    |
| Newsletter | Buttondown (RSS-to-email)                                                      |
| OG images  | Satori + resvg-js                                                              |
| Fonts      | Iowan Old Style / Georgia (serif body); Pretendard for KO glyphs (lazy-loaded) |

## i18n

Two locales — `en` and `ko`. Strings for site chrome live in `lib/i18n.ts`. Blog posts are dual-rendered: `content/blog/<slug>.mdx` ⇒ `/blog/<slug>/`, `content/blog/ko/<slug>.mdx` ⇒ `/blog/ko/<slug>/`. A pre-hydration script in `pages/_document.tsx` redirects `/` → `/ko/` and `/blog/<slug>/` → `/blog/ko/<slug>/` when the visitor has stored a `ko` preference or `Accept-Language` starts with `ko`.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`:

1. `npm ci`
2. `npm run lint && npm run typecheck`
3. `npm run build` (Next.js export → `out/`)
4. Postbuild generates sitemap, RSS, llms-full.txt, OG images, view counts, Pagefind index
5. JamesIves/github-pages-deploy-action pushes `out/` to the `gh-pages` branch
6. GitHub Pages serves from `gh-pages` branch root with `juyoung.site` as custom domain

CNAME lives at `public/CNAME` and is copied into `out/` on every build.

## Secrets

Optional GitHub Actions secrets — when present, the build picks them up; when missing, the relevant feature degrades gracefully (no build break).

| Secret                                 | Used by                           | Effect when unset                     |
| -------------------------------------- | --------------------------------- | ------------------------------------- |
| `UMAMI_USERNAME` / `UMAMI_PASSWORD`    | `scripts/build-views.mjs`         | View counts hidden under post titles  |
| `NEXT_PUBLIC_BUTTONDOWN_USERNAME`      | `components/NewsletterSignup.tsx` | Newsletter form hidden                |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | `components/SEO.tsx`              | Google site verification meta omitted |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION`   | `components/SEO.tsx`              | Bing site verification meta omitted   |
| `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`  | `components/SEO.tsx`              | Naver site verification meta omitted  |

The Umami script URL and website ID are hardcoded in `pages/_document.tsx` (public values; no secret).

## CV pipeline

```bash
cd cv && ./build.sh         # writes ../public/juyoung-cv.pdf
```

Typst CLI required (`cargo install --git https://github.com/typst/typst --locked typst-cli`). `.github/workflows/build-cv.yml` rebuilds on any change under `cv/`.

## Adding a blog post

1. `content/blog/<slug>.mdx` with frontmatter: `title`, `date`, `description`, `tags`, optional `draft: true`.
2. (Optional) `content/blog/ko/<slug>.mdx` for the Korean variant — same frontmatter, Korean prose.
3. `npm run dev` → preview at `/blog/<slug>/` and `/blog/ko/<slug>/`.
4. Commit. The post auto-appears in the sitemap, RSS, llms-full.txt, and OG-image bundle.

## License

© 2026 Juyoung Suk.
