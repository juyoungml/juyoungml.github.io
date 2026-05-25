# CLAUDE.md

Guidance for Claude Code when working in this repo.

## Project

Personal site at [juyoung.site](https://juyoung.site) for Juyoung Suk, ML engineer at Trillion Labs. Static Next.js 14 (Pages Router) build, bilingual (EN + KO), hosted on GitHub Pages from the `gh-pages` branch.

The general aesthetic is quiet, text-forward, research-blog. Iowan Old Style / Georgia serif body, lowercase headings, warm light + warm dark palette. Read `components/blog/BlogPostView.tsx` to feel the voice.

## Commands

```bash
npm run dev              # localhost:3000
npm run build            # static export → /out (postbuild generates sitemap/feeds/llms/og/views, then Pagefind)
npm run lint
npm run typecheck
npm run format           # prettier write
npm run format:check     # prettier check (CI uses this)
```

CI runs lint, typecheck, build on every push and PR. Deploy runs the same plus pushes `out/` to `gh-pages`. Don't bypass either.

## Where things live

- `pages/` — routes. `index.tsx` (EN home), `ko/index.tsx` (KO home), `blog/`, `blog/ko/`, `papers/`, `now`, `reading`, `talks`, `404.tsx`, `_app.tsx`, `_document.tsx`.
- `components/` — UI.
  - `HomeView.tsx`: locale-aware home; both `pages/index.tsx` and `pages/ko/index.tsx` are thin wrappers passing locale.
  - `Navigation.tsx`: nav + site-level locale toggle + theme toggle. Trimmed to Home / Blog by design.
  - `SEO.tsx`: title, OG, Twitter card, canonical, hreflang, search-console verification meta (env-driven), JSON-LD graph (Person + BlogPosting).
  - `blog/BlogPostView.tsx`: the post template. Reading progress + sticky TOC + post body + Citation + NewsletterSignup + Comments.
  - `blog/Comments.tsx`: Giscus iframe; script injected client-side.
  - `blog/ViewCount.tsx`: reads `/views.json`; renders nothing if a slug isn't in the map.
  - `blog/ShareButtons.tsx`, `blog/TableOfContents.tsx`, `blog/ReadingProgress.tsx`, `blog/Citation.tsx`, `blog/Callout.tsx`, `blog/Figure.tsx`, `blog/Video.tsx`.
  - `blog/BlogTagListView.tsx`: shared by `/blog/tag/[tag]` and `/blog/ko/tag/[tag]`.
  - `ContentPageView.tsx`: shared by `/now`, `/reading`, `/talks`.
  - `NewsletterSignup.tsx`: Buttondown embed; renders nothing when `NEXT_PUBLIC_BUTTONDOWN_USERNAME` is unset.
  - `papers/`: AuthorList, PaperLinks, PaperCitation.
  - `ThemeToggle.tsx`, `LanguageToggle.tsx` (post-level locale flip).
- `content/` — MDX. `blog/<slug>.mdx`, `blog/ko/<slug>.mdx`, `papers/<slug>.mdx`, `now.mdx`, `reading.mdx`, `talks.mdx`.
- `lib/` — non-UI.
  - `site.ts`: SITE_URL, SITE_AUTHOR, SiteLocale type, `absoluteUrl()`.
  - `i18n.ts`: STRINGS map for site chrome. Bio prose lives here too.
  - `blog.ts`: post discovery, frontmatter parsing, TOC extraction, `getAllBlogPosts({ includeDrafts })`, `getTagIndex(locale)`. Module-scope cache; `loadAllPosts()` populates it once per build.
  - `papers.ts`: same pattern for `content/papers/`.
  - `content.ts`: helper for the three one-off pages.
  - `tags.ts`: `tagSlug()` slug helper.
  - `analytics.ts`: `track()` wrapper around `window.umami?.track()` — safe no-op when umami isn't loaded.
- `scripts/` — postbuild generators (all `.mjs`, no transpiler).
  - `build-sitemap.mjs`, `build-feeds.mjs`, `build-llms.mjs`, `build-og-images.mjs`, `build-views.mjs`.
- `data/portfolio.ts` — name, contacts, profile image, social URLs.
- `.github/workflows/` — `ci.yml`, `deploy.yml`, `build-cv.yml`, `update-publications.yml`.

## Stack and choices that matter

- **Static export** (`next.config.js: output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`). No SSR at request time, no API routes. All data is collected at build time. `getStaticProps`/`getStaticPaths` only.
- **MDX** via `next-mdx-remote/serialize`, plugins: `remarkGfm`, `remarkMath`, `rehypeSlug`, `rehypeKatex`, `rehypeAutolinkHeadings`. Per-post custom React components live in `components/blog/posts/<slug>/` and are registered via `components/blog/posts/index.ts`.
- **TailwindCSS** with `darkMode: 'class'`. Palette uses CSS variables (`--background`, `--foreground`, etc.) defined in `styles/globals.css`; `.dark` overrides them.
- **No-flash theme**: synchronous inline script in `_document.tsx` reads `localStorage['theme']` (or `prefers-color-scheme` fallback) and toggles the `.dark` class before first paint.
- **i18n redirect**: inline script in `_document.tsx` redirects `/` → `/ko/` and `/blog/<slug>/` → `/blog/ko/<slug>/` when the visitor has stored a `ko` preference or `Accept-Language` starts with `ko`. KO post variants are detected at build time and embedded as a slug list in the script.
- **Pretendard** (Korean font) loads only on `/ko/*` and `/blog/ko/*` routes, with a non-blocking print-media trick to avoid FOUC.
- **KaTeX** is loaded via a CDN `<link>` in `BlogPostView.tsx`. Math rendering needs that stylesheet — keep it.
- **Pagefind** indexes `out/` as a postbuild step. Search UI is `components/blog/PagefindSearch.tsx`, gated by `data-pagefind-body` on the post `<article>` and `data-pagefind-ignore` on share/comments/newsletter/citation blocks.
- **OG images**: Satori + `@resvg/resvg-js` render per-post 1200×630 PNGs into `out/og/<slug>.png` and `out/og/<slug>.ko.png`. The script reads frontmatter, no per-post boilerplate needed.

## Analytics, comments, newsletter

- **Umami** (self-hosted on Railway). Script URL and website ID are hardcoded public constants in `pages/_document.tsx`. The snippet is gated to `NODE_ENV === 'production'` so dev sessions don't pollute stats. Custom events: see callers of `track()` in `lib/analytics.ts`.
- **Giscus**. Hardcoded repo, repo ID, and category ("General") in `components/blog/Comments.tsx`. Discussions must stay enabled on the repo and the Giscus GitHub App must remain installed.
- **Buttondown**. Off until `NEXT_PUBLIC_BUTTONDOWN_USERNAME` is set on the build env.
- **View counts**. Build-time fetch via `scripts/build-views.mjs` against Umami's `/api/websites/<id>/metrics`. Needs `UMAMI_USERNAME` and `UMAMI_PASSWORD` envs. Writes `out/views.json` (`{}` if unset or fetch fails). `<ViewCount>` reads that JSON.
- **Search consoles**. `<SEO>` emits `google/bing/naver` verification meta when their `NEXT_PUBLIC_*_SITE_VERIFICATION` envs are set.

All four degrade gracefully — if the env is missing, the feature is invisible, build still passes.

## Conventions

- **Comments**: default to none. Add a one-liner only when the WHY is non-obvious (a hidden constraint or a workaround). Don't explain WHAT. Don't reference current task or callers. Re-read recent commits before adding a comment — most aren't needed.
- **Korean tone**: bio prose in `lib/i18n.ts` is 합니다체 (formal). Don't switch registers. English brand names (GitHub, LinkedIn, Google Scholar, Semantic Scholar) on the KO page — not hangul transliterations.
- **No emojis in source**. The existing site has zero in user-facing copy; keep it that way.
- **Static export-safe**. Don't add `getServerSideProps`, API routes, dynamic imports without `ssr: false` for browser-only components, or `next/image` with optimization (it's off).
- **Visual changes**: take a screenshot via headless Chrome before reporting done. Don't claim "looks good" without verifying.

## Deployment

- Push to `main` → `.github/workflows/deploy.yml` builds, lints, typechecks, and pushes `out/` to `gh-pages`. JamesIves' action handles the publish.
- GitHub Pages serves from **`gh-pages` branch root** with `juyoung.site` as the custom domain. CNAME lives at `public/CNAME` and is copied into the build. `juyoungml.github.io` 301s to `juyoung.site`.
- Deploy secrets (all optional): `UMAMI_USERNAME`, `UMAMI_PASSWORD`, `NEXT_PUBLIC_BUTTONDOWN_USERNAME`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`, `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`.

## CV pipeline

```bash
cd cv && ./build.sh         # writes ../public/juyoung-cv.pdf
```

Typst required (`cargo install --git https://github.com/typst/typst --locked typst-cli`). `.github/workflows/build-cv.yml` rebuilds the PDF when anything under `cv/` changes and commits it back.

## Common pitfalls

- **Adding a feature that touches `_document.tsx` SSR scripts**: read the existing redirect script before editing. The static `koSlugs` array is computed in `getInitialProps`; new locales need similar handling.
- **Tags**: `getTagIndex(locale)` is the only public API for tag listing — don't re-walk the filesystem from page code.
- **Caches in lib/blog and lib/papers**: module-scope. They populate once per build. If a test or script reads them in an unusual order, the cache may be stale on hot reload — restart `npm run dev`.
- **Custom domain breaks**: if `juyoung.site` 404s but `juyoungml.github.io` works, check Pages config (`gh api repos/juyoungml/juyoungml.github.io/pages`) — `cname` and `source.branch` should be `juyoung.site` / `gh-pages`.

## Don't do

- Don't introduce abstractions for hypothetical future variants. Three similar lines is better than a wrong abstraction.
- Don't add backwards-compat shims for code that has no live callers — delete it.
- Don't write planning/decision/analysis docs unless explicitly asked.
- Don't force-push `main`.
