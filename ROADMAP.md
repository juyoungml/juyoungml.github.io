# ROADMAP

Strategy doc for what the site is and where it's going. For the
fine-grained task list with verify steps, see `TASKS.md`.

**Live at:** https://juyoung.site
**Audience:** ML researchers, recruiters, tech readers (HN/X), Korean readers.
**Goals:** classic SEO, AEO (LLM-citable + agent-navigable), social sharing, academic indexing.

---

## Shipped

Pre-launch foundation:

- Custom domain `juyoung.site` with HTTPS (Let's Encrypt, auto-renew). `juyoungml.github.io` 301s to the apex domain.
- Sitemap, robots.txt, hreflang on every bilingual URL, canonical URLs everywhere.
- RSS feeds — `/rss.xml` (EN) and `/rss.ko.xml` (KO), auto-discovered via `<link rel="alternate">`.
- Schema.org JSON-LD: `Person`, `WebSite`, `BlogPosting`, `Blog`, `BreadcrumbList`, `ScholarlyArticle`.
- Per-post OG images via Satori at build time (1200×630).
- llms.txt + llms-full.txt with an explicit "Actions" section for autonomous agents.
- Search-console verification meta wired (Google + Bing + Naver), env-driven.

Content & UX:

- Bilingual EN/KO blog posts with a per-post locale toggle.
- Tag pages (EN + KO), included in sitemap.
- Sticky table of contents and reading-progress bar on posts.
- Pagefind search on `/blog/`.
- KaTeX math, syntax-highlighted code, per-post React widgets via MDX.
- Citation block (BibTeX) and share buttons inside each post.
- Paper landing pages (`/papers/<slug>/`) with citation\_\* meta and BibTeX.
- `/now`, `/reading`, `/talks` content pages.
- Warm dark mode with no-flash inline theme script.
- Favicon set + web manifest (PWA-installable).

Infra:

- Self-hosted Umami on Railway with `umami.track()` events on key clicks (CV download, social outbound, share buttons, locale toggle).
- Giscus comments on every post, backed by repo Discussions.
- View counts pulled at build time from Umami's metrics API (graceful no-op when credentials are unset).
- CI workflow (`ci.yml`): lint, typecheck, format check, build on every PR and main push.
- Deploy workflow: builds and pushes `out/` to `gh-pages`. Pinned actions, concurrency, optional secret pass-through.

---

## In flight (waiting on author-side action)

- **T20 Newsletter (Buttondown)** — code is wired in `components/NewsletterSignup.tsx`; renders when `NEXT_PUBLIC_BUTTONDOWN_USERNAME` is set.
- **T24 Search consoles** — verification meta is in `SEO.tsx`; needs the user to register on each console and paste tokens as repo secrets.
- **T26 Uptime monitor** — pure browser setup. UptimeRobot.
- **T31 View counts** — code shipped; needs `UMAMI_USERNAME` + `UMAMI_PASSWORD` as repo secrets to actually populate `views.json`.

---

## Next

- Re-run Lighthouse with the Umami snippet in place; confirm no regression below 95.
- Sweep for additional `umami.track()` events worth capturing (newsletter signup once T20 is live, blog post category chips, etc.).
- Decide whether to surface the MS thesis publicly under `/thesis/` or keep it private (currently not served).

## Decisions still open

- **Korean site chrome** — currently soft-disabled via `SUPPORT_KO_CHROME = false` in `lib/site.ts`. Flip back to `true` once there's a steady KO audience.
- **Dark mode palette** — current warm-dark works; haven't done a designer pass.

## Out of scope (explicitly not doing)

- Cookie-based GA4 / Meta Pixel — privacy-hostile, off-brand.
- Heavy CMS — MDX in repo stays.
- App Router migration — Pages Router is fine for this scale.
