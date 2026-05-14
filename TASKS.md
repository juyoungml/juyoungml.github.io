# TASKS

Actionable breakdown of `ROADMAP.md` with dependencies and verification steps.

**Legend**

- **Effort:** XS (<30min) · S (<2h) · M (half day) · L (>1 day)
- **Status:** `[ ]` todo · `[~]` in progress · `[x]` done
- **Deps:** task IDs that must finish first. `—` = no deps.

---

## Phase 0 — Pre-launch must-haves

### T01 · Commit CNAME + bump site URL to custom domain

- [x] **Effort:** XS · **Deps:** —
- **Do:**
  - Commit `public/CNAME` (already on disk) and `.env`/`.env.example`.
  - Replace hardcoded `https://juyoungml.github.io` in `pages/index.tsx:58,61` with `process.env.NEXT_PUBLIC_SITE_URL`.
  - Grep for `juyoungml.github.io` everywhere; swap to the new domain in user-facing strings.
- **Verify:**
  - `git grep -n juyoungml.github.io -- ':!*.md' ':!*.yml' ':!CLAUDE.md'` returns nothing user-facing.
  - After deploy, `curl -s https://juyoung.site | grep og:url` shows `juyoung.site`.

### T02 · Reusable `<SEO>` component

- [ ] **Effort:** S · **Deps:** T01
- **Do:**
  - `components/SEO.tsx` with props: `title`, `description`, `path`, `ogImage`, `ogType`, `locale`, `alternateLocales`.
  - Renders `<title>`, description, canonical, OG, Twitter card, `hreflang` siblings.
  - Use in `pages/index.tsx`, `pages/blog/index.tsx`, `pages/blog/[slug].tsx`, `pages/blog/ko/[slug].tsx`.
- **Verify:**
  - View source on `/`, `/blog/`, `/blog/fused-lce/` — each has unique `<title>` and canonical.
  - `curl -s https://juyoung.site/blog/fused-lce/ | grep -E 'canonical|hreflang'` shows post-specific URLs.

### T03 · Sitemap + robots.txt

- [ ] **Effort:** S · **Deps:** T01
- **Do:**
  - Add a `scripts/build-sitemap.mjs` invoked from `postbuild` in `package.json`.
  - Emit `out/sitemap.xml` listing `/`, `/blog/`, every post (EN + KO variants with `<xhtml:link rel="alternate">`).
  - Emit `out/robots.txt` with `User-agent: *`, `Allow: /`, `Sitemap: https://juyoung.site/sitemap.xml`.
- **Verify:**
  - `curl -s https://juyoung.site/sitemap.xml | head -20` — well-formed XML, includes all blog slugs.
  - `curl -s https://juyoung.site/robots.txt` — points to the sitemap.

### T04 · Rebuild RSS / Atom feed (EN + KO)

- [ ] **Effort:** S · **Deps:** T01
- **Do:**
  - `scripts/build-feeds.mjs` postbuild step using `lib/blog.ts`.
  - Generate `out/rss.xml` (EN) and `out/rss.ko.xml` (KO). Include full content or excerpt + canonical URL.
  - Add `<link rel="alternate" type="application/rss+xml">` in `<SEO>` so feed readers auto-discover.
- **Verify:**
  - `curl -s https://juyoung.site/rss.xml | xmllint --noout -` exits 0.
  - Paste URL into Feedly/NetNewsWire — feed loads with current posts.

### T05 · `hreflang` correctness across locales

- [ ] **Effort:** XS · **Deps:** T02
- **Do:**
  - On every blog post with both locales: emit `hreflang="en"`, `hreflang="ko"`, `hreflang="x-default"` pointing to the right URLs.
  - On EN-only or KO-only posts: emit only the available locale + `x-default`.
- **Verify:**
  - `curl -s https://juyoung.site/blog/fused-lce/ | grep hreflang` shows 3 lines.
  - Google's [Rich Results Test](https://search.google.com/test/rich-results) shows no hreflang errors.

### T06 · Per-post OG images

- [ ] **Effort:** M · **Deps:** T02
- **Do:**
  - Pick approach: (a) static SVG-to-PNG generated at build via `satori` + `@resvg/resvg-js`, or (b) commit one OG image per post manually.
  - For (a): `scripts/build-og-images.mjs` reads each post's frontmatter (title, date, author) and writes `out/og/<slug>.png` (1200×630).
  - Wire `<SEO ogImage={...}>` to use per-post path.
- **Verify:**
  - Share `https://juyoung.site/blog/fused-lce/` on X — preview shows post-specific image.
  - Twitter [Card Validator](https://cards-dev.twitter.com/validator) renders correctly.

### T07 · Favicon set + web manifest

- [ ] **Effort:** XS · **Deps:** —
- **Do:**
  - Generate `apple-touch-icon.png` (180×180), `icon-192.png`, `icon-512.png` from the existing favicon source.
  - Add `public/site.webmanifest` referencing them; reference in `_document.tsx`.
- **Verify:**
  - Lighthouse "Installable PWA" warning gone.
  - Add to iOS home screen — correct icon appears.

### T08 · `/llms.txt` + `/llms-full.txt`

- [ ] **Effort:** S · **Deps:** T01
- **Do:**
  - Static `public/llms.txt`: short bio, one-line per major page, links to CV / GitHub / Scholar.
  - Postbuild script writes `out/llms-full.txt`: concatenated markdown of homepage content + every published blog post (frontmatter + body).
- **Verify:**
  - `curl -s https://juyoung.site/llms.txt | head` reads cleanly as markdown.
  - Ask ChatGPT/Claude: "Read https://juyoung.site/llms-full.txt and summarize Juyoung Suk's work." — coherent answer.

### T09 · Schema.org JSON-LD

- [ ] **Effort:** S · **Deps:** T02
- **Do:**
  - Homepage: `Person` JSON-LD block (name, jobTitle, affiliation, sameAs links to GitHub/X/Scholar/ORCID).
  - Blog posts: `BlogPosting` (author, datePublished, dateModified, inLanguage, headline).
  - Emit inside `<SEO>` as `<script type="application/ld+json">`.
- **Verify:**
  - Each page passes [Schema.org Validator](https://validator.schema.org/).
  - Google Rich Results Test detects `Person` on `/` and `Article` on each post.

### T10 · Semantic HTML + a11y pass

- [ ] **Effort:** S · **Deps:** —
- **Do:**
  - Audit pages for real `<article>`, `<section>`, `<nav>`, `<time dateTime>`, `<address>`.
  - Add skip-to-content link at top of `_app.tsx` layout.
  - Run `axe` DevTools on `/`, `/blog/`, `/blog/fused-lce/`.
  - Verify keyboard tab order is sensible; focus rings visible.
  - Spot-check WCAG AA contrast on body text + links + secondary text.
- **Verify:**
  - Lighthouse Accessibility ≥ 95 on each route.
  - axe reports 0 critical/serious issues.

### T11 · Citation block on blog posts

- [ ] **Effort:** XS · **Deps:** T02
- **Do:**
  - End-of-post component rendering BibTeX block + "Copy" button (Suk, year, title, URL).
  - Pull data from post frontmatter; no per-post boilerplate.
- **Verify:**
  - Renders below post body on `/blog/fused-lce/`.
  - Copy button works; pasted BibTeX is valid (try `bibtex-parser` or paste into Overleaf).

### T12 · Image + font perf audit

- [ ] **Effort:** S · **Deps:** —
- **Do:**
  - Convert `public/profile.jpeg` to AVIF + WebP at appropriate sizes; serve via `<picture>` or Next `<Image>` (note: `unoptimized: true` means manual variants).
  - Confirm Pretendard isn't loading on EN-only pages (check `_document.tsx` script behavior).
  - Audit any blog post images; compress and resize.
- **Verify:**
  - Lighthouse Performance ≥ 95 on `/` and `/blog/fused-lce/`.
  - DevTools Network panel: profile image < 50KB on mobile breakpoint.

### T13 · Self-host Umami

- [ ] **Effort:** M · **Deps:** —
- **Do:**
  - Pick host (Railway free tier or Fly.io with SQLite recommended).
  - Deploy Umami container; create site for `juyoung.site`; grab script URL + website ID.
  - Fill in `NEXT_PUBLIC_UMAMI_SCRIPT_URL` and `NEXT_PUBLIC_UMAMI_WEBSITE_ID` in `.env`.
  - Document setup in `docs/analytics-setup.md`.
- **Verify:**
  - Umami dashboard reachable at chosen URL.
  - `aws route53 list-resource-record-sets` (if subdomain'd to `analytics.juyoung.site`) shows record. Otherwise dashboard URL responds 200.

### T14 · Add Umami snippet + custom events

- [ ] **Effort:** XS · **Deps:** T13
- **Do:**
  - Add `<script defer data-website-id={env} src={env} />` to `_document.tsx`.
  - Track events: CV download, GitHub outbound, X outbound, language toggle, newsletter signup (later).
- **Verify:**
  - Open `https://juyoung.site` in incognito; Umami dashboard shows the pageview within 30s.
  - Click CV download; event appears in Umami.

### T15 · Lighthouse + Core Web Vitals baseline

- [ ] **Effort:** XS · **Deps:** T02, T06, T09, T10, T12, T14
- **Do:**
  - Run Lighthouse (mobile) on `/`, `/blog/`, `/blog/fused-lce/`. Capture scores.
  - Note any LCP/CLS/INP regressions; fix.
- **Verify:**
  - All four Lighthouse categories ≥ 95.
  - PageSpeed Insights shows green CWV after 28-day field data accumulates (defer).

### T16 · Verify GitHub Pages 301 from old URL

- [ ] **Effort:** XS · **Deps:** T01
- **Do:**
  - After the next deploy, check that `juyoungml.github.io` redirects to `juyoung.site`.
- **Verify:**
  - `curl -sI https://juyoungml.github.io/ | grep -i location` shows `https://juyoung.site/`.

---

## Phase 1 — Ship soon after launch

### T17 · Translate site chrome to Korean

- [ ] **Effort:** M · **Deps:** —
- **Do:**
  - Extract user-facing strings from `Navigation`, hero, about, projects, contact into a small i18n map.
  - Add KO translations; gate by locale.
- **Verify:**
  - `/` shows English; `/ko/` shows Korean (after T18).
  - No untranslated strings on the Korean side.

### T18 · Locale switcher + `/ko/` homepage

- [ ] **Effort:** M · **Deps:** T17
- **Do:**
  - Global locale toggle in `Navigation`, persisted to `localStorage['site-locale']`.
  - Build `/ko/index.tsx` mirroring `/` with Korean strings.
  - Extend the `_document.tsx` pre-hydration redirect to cover `/` as well as `/blog/<slug>/`.
- **Verify:**
  - Toggle on `/` flips to `/ko/` and persists across reloads.
  - Korean browsers land on `/ko/` directly (test with `Accept-Language: ko` via `curl -H` and DevTools sensor emulation).

### T19 · Giscus comments

- [ ] **Effort:** S · **Deps:** —
- **Do:**
  - Enable GitHub Discussions on the repo; create a "Comments" category.
  - Configure giscus at https://giscus.app; copy IDs into `.env`.
  - `components/Comments.tsx`, lazy-loaded under blog post body.
- **Verify:**
  - Visit `/blog/fused-lce/`; comments widget loads below content.
  - Post a test comment; appears in Discussions tab.

### T20 · Newsletter (Buttondown)

- [ ] **Effort:** S · **Deps:** —
- **Do:**
  - Create Buttondown account; enable RSS-to-email pointing at `/rss.xml`.
  - Embed signup form: inline at end of each post, small block on homepage.
  - Track signup as Umami event.
- **Verify:**
  - Submit a test email; confirmation arrives.
  - Publish a new post; subscriber inbox receives it.

### T21 · Share buttons on posts

- [ ] **Effort:** XS · **Deps:** T02
- **Do:**
  - Plain `<a>` links (no SDK): X intent URL, LinkedIn share URL, copy-link button.
  - Inline below citation block.
- **Verify:**
  - Each link opens correct compose screen with prefilled title + URL.
  - Copy button copies the canonical URL.

### T22 · Tags / categories pages

- [ ] **Effort:** S · **Deps:** T03
- **Do:**
  - Generate `/blog/tag/[tag]/` and `/blog/ko/tag/[tag]/` from frontmatter `tags`.
  - Add tag chips on `/blog/` index linking to those pages.
  - Include tag pages in sitemap.
- **Verify:**
  - Visit `/blog/tag/<existing-tag>/` — lists matching posts.
  - Sitemap includes tag URLs.

### T23 · Paper landing pages

- [ ] **Effort:** L · **Deps:** T09
- **Do:**
  - Schema: `content/papers/<slug>.mdx` with frontmatter (authors, venue, year, links to PDF/arXiv/HF/code, BibTeX).
  - Build `pages/papers/[slug].tsx` rendering them with `ScholarlyArticle` JSON-LD.
  - Replace the publications list cards with links to the new pages.
- **Verify:**
  - `/papers/biggen-bench/` (example) loads with abstract + BibTeX + JSON-LD.
  - Google Rich Results Test detects `ScholarlyArticle`.
  - Author profile on Google Scholar links back to these pages (after a few weeks).

### T24 · Search consoles (Google + Bing + Naver)

- [ ] **Effort:** S · **Deps:** T03
- **Do:**
  - Add ownership-verification meta tags to `<SEO>`.
  - Submit sitemap to each console.
  - For Naver: also register at Naver Search Advisor and add `naver-site-verification` meta.
- **Verify:**
  - Each console shows "Verified" and "Sitemap: Success".
  - Coverage report (after ~1 week) shows ≥80% of submitted URLs indexed.

### T25 · Academic profile links

- [ ] **Effort:** XS · **Deps:** T09
- **Do:**
  - Add ORCID + Semantic Scholar URLs to `Person` JSON-LD `sameAs` and to the visible contact section.
  - Add `citation_*` meta tags on paper landing pages (T23).
- **Verify:**
  - `curl -s https://juyoung.site | grep sameAs` shows all profiles.
  - Google Scholar crawler picks up `citation_*` (check Scholar profile after a few weeks).

### T26 · Uptime monitor

- [ ] **Effort:** XS · **Deps:** —
- **Do:**
  - UptimeRobot free monitor pinging `https://juyoung.site` every 5 minutes.
  - Email alert to `juyoung.suk@trillionlabs.co`.
- **Verify:**
  - UptimeRobot dashboard shows green; force a test alert via "Test" feature.

---

## Phase 2 — Growth / nice-to-have

### T27 · Dark mode

- [ ] **Effort:** M · **Deps:** —
- **Do:**
  - Design a dark palette that respects the warm aesthetic (not just inverted).
  - `prefers-color-scheme` default + manual toggle, persisted to `localStorage`.
- **Verify:**
  - Toggle works; choice persists across reloads.
  - No FOUC; contrast AA in both modes.

### T28 · Blog search (Pagefind)

- [ ] **Effort:** S · **Deps:** T03
- **Do:**
  - Add Pagefind as a postbuild step; emit `out/pagefind/`.
  - Search UI on `/blog/` page.
- **Verify:**
  - Type a known word from a post; result appears with snippet.
  - Search bundle < 100KB transferred.

### T29 · TOC + reading progress

- [ ] **Effort:** S · **Deps:** —
- **Do:**
  - Use `extractHeadings` (already in `lib/blog.ts`) to render sticky TOC on desktop blog posts.
  - Top-of-page progress bar based on scroll.
- **Verify:**
  - TOC items scroll to anchors and highlight active section.
  - Progress bar reaches 100% at bottom.

### T30 · `/now`, reading list, talks pages

- [ ] **Effort:** M · **Deps:** —
- **Do:**
  - Three small content-driven pages: `/now/`, `/reading/`, `/talks/`.
  - Each is MDX-backed for fast updates.
- **Verify:**
  - All three reachable from nav; included in sitemap.

### T31 · View counts

- [ ] **Effort:** S · **Deps:** T13
- **Do:**
  - Use Umami's stats API server-side at build time, OR a client fetch with caching.
  - Display under post title as "N views".
- **Verify:**
  - Number matches Umami dashboard within ~1 day.

---

## Dependency graph (P0 critical path)

```
T01 ──┬─▶ T02 ──┬─▶ T05
      │        ├─▶ T06 ─┐
      │        ├─▶ T09 ─┼─▶ T15
      │        ├─▶ T11  │
      │        └─▶ T21  │
      ├─▶ T03 ─▶ T22    │
      ├─▶ T04           │
      ├─▶ T08           │
      ├─▶ T16           │
      └─▶ T25           │
T07 ─────────────────────┤
T10 ─────────────────────┤
T12 ─────────────────────┤
T13 ─▶ T14 ──────────────┘
```

**Critical path to launch:** T01 → T02 → T09 → T15 (everything else can be parallelized).
