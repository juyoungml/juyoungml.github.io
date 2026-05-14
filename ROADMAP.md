# ROADMAP

A prioritized backlog for getting the site ready for public launch and growing it after.

**Live at:** https://juyoung.site
**Audience:** ML researchers, recruiters, tech readers (HN/X), Korean readers.
**Goals:** classic SEO, AEO (LLM-citable), social sharing, academic indexing.
**Format:** P0 = pre-launch must-have, P1 = ship soon after, P2 = nice-to-have.

---

## Done

- [x] **Custom domain `juyoung.site`** — registered at GoDaddy, DNS managed on AWS Route 53 (zone `Z01780641VKW3AE79IUDB`). Apex A records → GitHub Pages IPs (`185.199.108-111.153`), `www` CNAME → `juyoungml.github.io`, both with TTL 300. Existing AWS SES email records (MX, DKIM, autodiscover) preserved.
- [x] **GitHub Pages custom domain + HTTPS** — `CNAME` file in `public/`, Let's Encrypt cert covers apex + `www` (auto-renews), HTTPS enforced, HTTP redirects to HTTPS, `www` 301s to apex.
- [x] **`.env` / `.env.example` scaffolding** — placeholders for Umami, Giscus, newsletter. AWS keys deliberately not in `.env` (they live in `~/.aws/credentials` via `aws configure`).

---

## P0 — Pre-launch must-haves

### Discoverability foundations

- [ ] **Sitemap** (`/sitemap.xml`) — auto-generated at build time from pages + blog posts (EN and KO). Use `next-sitemap` or a custom postbuild script (static export friendly).
- [ ] **robots.txt** — allow all, link to sitemap.
- [ ] **RSS / Atom feed** (`/rss.xml`, `/feed.ko.xml`) — separate feeds per locale. The previous RSS was removed (`d421e91`); rebuild it cleanly against the current `lib/blog.ts`.
- [ ] **Per-page metadata** — every page (not just `index.tsx`) needs unique `<title>`, `description`, canonical URL, OG tags, Twitter card. Extract a `<SEO>` component to enforce this.
- [ ] **Canonical URLs** — set canonical on every page, especially blog posts with KO/EN variants.
- [ ] **`hreflang` tags** — on every bilingual blog post: `<link rel="alternate" hreflang="en" ...>`, `<link rel="alternate" hreflang="ko" ...>`, `<link rel="alternate" hreflang="x-default" ...>`. Required for Google to serve the right locale.
- [ ] **OG image generation** — per-post OG images (1200×630). Use `@vercel/og` at build time or pre-render static images. Generic profile.jpeg is not enough for shares to look good.
- [ ] **Favicon set** — currently just `.ico` and `.svg`. Add 180×180 apple-touch-icon, 192/512 PNGs, and a `site.webmanifest`.

### AEO (LLM answer engine optimization)

- [ ] **`/llms.txt`** — top-level index of your site for LLMs: who you are, one-liner per major page, links to canonical resources (CV, papers, blog).
- [ ] **`/llms-full.txt`** — full markdown dump of your bio + paper abstracts + blog posts. Lets LLMs ingest cleanly without scraping HTML.
- [ ] **Schema.org JSON-LD** on every page:
  - Homepage: `Person` (name, jobTitle, affiliation, sameAs links to GitHub/X/Scholar/ORCID)
  - Blog posts: `BlogPosting` / `Article` with author, datePublished, inLanguage
  - Paper pages (P1): `ScholarlyArticle` with authors, citation count, DOI
- [ ] **Semantic HTML audit** — make sure every page uses real `<article>`, `<section>`, `<nav>`, `<time datetime=...>`, `<address>`. LLMs (and screen readers) prefer this over generic divs.
- [ ] **Citation-friendly content** — each blog post should have a "Cite this post" block with BibTeX. Same for papers.

### Performance & accessibility

- [ ] **Lighthouse audit** — target 95+ across Performance / Accessibility / Best Practices / SEO. Fix issues until green.
- [ ] **Core Web Vitals baseline** — measure LCP, CLS, INP on real pages. The Pretendard font-swap script is good; check the LCP impact of the hero image.
- [ ] **Image optimization** — `profile.jpeg` is 236KB; serve a smaller WebP/AVIF version. Audit any blog post images for the same.
- [ ] **Font subsetting** — Pretendard dynamic subset is already loaded; verify it's not double-loading on EN-only pages.
- [ ] **Skip-to-content link + keyboard nav check** — accessibility basics; needed for Lighthouse a11y score and screen readers.
- [ ] **Color contrast** — verify the warm palette hits WCAG AA on body text and links.

### Analytics

- [ ] **Self-host Umami** — pick a host (Railway / Fly.io / a small VPS / Vercel + Postgres). Cheapest path: Railway free tier or Fly.io with SQLite. Document the deploy in `cv/` or a new `docs/analytics-setup.md`.
- [ ] **Add tracking snippet** — drop the script in `_document.tsx`. No cookie banner needed since Umami is cookieless, but verify your jurisdiction.
- [ ] **Set up basic event tracking** — CV download click, GitHub/X outbound clicks, language toggle usage, newsletter signup.

### Domain follow-ups

- [ ] **Add 301 redirect from `juyoungml.github.io` → `juyoung.site`** — GitHub Pages does this automatically once the custom domain is set, but verify after the next deploy.
- [ ] **Decide whether to migrate Route 53 → Cloudflare** — current DNS works fine. Moving to Cloudflare would save ~$0.50/mo and give free CDN/analytics, but requires updating GoDaddy nameservers and re-creating the AWS SES records on Cloudflare. Not urgent.
- [ ] **Update `NEXT_PUBLIC_SITE_URL` references** — anywhere in the codebase that hardcodes `juyoungml.github.io` (e.g., the OG image URL in `pages/index.tsx`) should switch to `juyoung.site`.

---

## P1 — Ship soon after launch

### Engagement

- [ ] **Giscus comments** on blog posts — enable GitHub Discussions on the repo, configure giscus, add a `<Comments>` component below post content. Lazy-load it (don't block initial paint).
- [ ] **Newsletter signup** — Buttondown (recommended for indie writers, cheap, has RSS-to-email) or Substack embed. Add a subtle inline CTA at the end of each post and a small block on the homepage.
- [ ] **Share buttons** — X/Twitter, LinkedIn, copy-link. Inline at the end of each post. No third-party scripts; build them as plain `<a>` links with intent URLs.
- [ ] **View counts** — needs a tiny serverless function or a third-party (e.g., Umami custom event + display, or a `Counter API`). Optional; can ship without.

### Korean parity

- [ ] **Translate site chrome** — Navigation, homepage hero/about/experience/projects, Contact section. Currently only blog posts have KO.
- [ ] **Locale switcher in navigation** (not just on blog posts) — global toggle that respects `localStorage['blog-locale']` like the blog redirect does.
- [ ] **KO homepage at `/ko/`** — mirrors EN structure. Update sitemap, hreflang, RSS.
- [ ] **Naver Search Advisor** — submit sitemap to Naver (the Google of Korea). Distinct from Google Search Console.
- [ ] **Naver-friendly meta** — Naver values `<meta name="naver-site-verification">` and clean OG tags. Verify ownership.

### Academic indexing

- [ ] **Google Scholar metadata** — add `citation_*` meta tags on paper landing pages (once those exist) and on the homepage publications list.
- [ ] **ORCID linking** — add ORCID iD to schema.org `Person`, link from homepage, claim publications on ORCID.
- [ ] **Semantic Scholar profile** — claim your author profile, link from site.

### Content organization

- [ ] **Tags / categories pages** — `/blog/tag/[tag]/` (and `/ko/blog/tag/[tag]/`). Helps SEO clustering and reader navigation as the blog grows.
- [ ] **Paper landing pages** — one URL per publication: `/papers/[slug]/`. Each includes abstract, authors, BibTeX, links to PDF / arXiv / HF / code, JSON-LD `ScholarlyArticle`. Massive AEO/SEO win — LLMs and Scholar both love these.

### Monitoring

- [ ] **Google Search Console** — verify ownership, submit sitemap, monitor coverage + Core Web Vitals.
- [ ] **Bing Webmaster Tools** — same. Bing also powers ChatGPT search, so this matters for AEO.
- [ ] **Uptime monitoring** — UptimeRobot free tier or Cloudflare. Ping `juyoungml.github.io` every 5 min.

---

## P2 — Nice-to-have / growth phase

### UX polish

- [ ] **Dark mode** — `prefers-color-scheme` + manual toggle persisted to localStorage. The warm palette will need a parallel dark palette designed; don't just invert.
- [ ] **Blog post search** — Pagefind (build-time static index, perfect for static export) or FlexSearch. Pagefind is the right pick for GH Pages.
- [ ] **Reading progress bar** on blog posts.
- [ ] **TOC sticky on desktop** for long posts — looks like `extractHeadings` is already there in `lib/blog.ts`; wire it up.
- [ ] **Series support** — when you write multi-part posts, link them as a series.

### Content scale

- [ ] **Now page** (`/now/`) — what you're working on this month. nownownow.com style.
- [ ] **Reading list / annotated bibliography** — papers you've read with one-line takes. Big AEO value.
- [ ] **Talks / media page** — if you give talks, a dedicated `/talks/` page with slides, video embeds.

### Infrastructure

- [ ] **Move off GH Pages to Cloudflare Pages or Vercel** — only if you outgrow it. Pros: better analytics, faster CDN, easier preview deploys. Cons: vendor lock-in.
- [ ] **Edge functions for OG images / view counts** — only after moving off GH Pages.
- [ ] **Automated link checking in CI** — catch broken outbound links on PR.

### Long-tail SEO experiments

- [ ] **Internal linking audit** — link from blog posts to relevant papers/projects and vice versa.
- [ ] **Anchor link IDs on every paper title** in publications list — makes citations linkable.
- [ ] **`research-note-template.mdx` cleanup** — either flesh it out as a real authoring guide or remove it from the visible build.

---

## Decisions still open

- **Newsletter provider** — Buttondown vs Substack (default to Buttondown for control + RSS-to-email).
- **Umami hosting target** — Railway vs Fly vs VPS.
- **Dark mode palette** — needs design pass, not just code.
- **Route 53 → Cloudflare migration** — defer until there's a real reason.

## Out of scope (explicitly not doing)

- Cookie-based GA4 / Meta Pixel — privacy-hostile, not aligned with audience.
- Heavy CMS — MDX in repo stays.
- App Router migration — Pages Router works fine for this scale.
