#!/usr/bin/env node
/**
 * Postbuild: emit out/sitemap.xml and out/robots.txt.
 * Reads content/blog/ directly (no TS imports) so it works in CI without
 * a transpiler. Mirrors locale detection from lib/blog.ts.
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://juyoung.site'
const ROOT = process.cwd()
const BLOG_DIR = path.join(ROOT, 'content/blog')
const OUT_DIR = path.join(ROOT, 'out')

function slugFromFile(name) {
  return name.replace(/\.(?:ko\.)?mdx?$/, '')
}

function localeFromFile(name) {
  return /\.ko\.mdx?$/.test(name) ? 'ko' : 'en'
}

function collectPosts() {
  if (!fs.existsSync(BLOG_DIR)) return []
  const bySlug = new Map()
  for (const file of fs.readdirSync(BLOG_DIR)) {
    if (!/\.mdx?$/.test(file)) continue
    const slug = slugFromFile(file)
    const locale = localeFromFile(file)
    const source = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
    const { data } = matter(source)
    if (data.draft === true) continue
    const date = data.date
      ? new Date(data.date).toISOString().slice(0, 10)
      : null
    if (!date) continue
    const entry = bySlug.get(slug) ?? { slug, date, locales: [] }
    entry.locales.push(locale)
    // Use the most recent date if EN/KO disagree
    if (new Date(date) > new Date(entry.date)) entry.date = date
    bySlug.set(slug, entry)
  }
  return Array.from(bySlug.values()).sort((a, b) =>
    a.date < b.date ? 1 : -1
  )
}

function urlEntry(loc, lastmod, alternates = []) {
  const altLines = alternates
    .map(
      a =>
        `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`
    )
    .join('\n')
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    altLines || null,
    '  </url>',
  ]
    .filter(Boolean)
    .join('\n')
}

function buildSitemap(posts) {
  const today = new Date().toISOString().slice(0, 10)
  const urls = []

  urls.push(urlEntry(`${SITE_URL}/`, today))
  urls.push(urlEntry(`${SITE_URL}/blog/`, today))

  for (const post of posts) {
    const enUrl = `${SITE_URL}/blog/${post.slug}/`
    const koUrl = `${SITE_URL}/blog/ko/${post.slug}/`
    const hasEn = post.locales.includes('en')
    const hasKo = post.locales.includes('ko')

    const alternates = []
    if (hasEn) alternates.push({ hreflang: 'en', href: enUrl })
    if (hasKo) alternates.push({ hreflang: 'ko', href: koUrl })
    if (hasEn) alternates.push({ hreflang: 'x-default', href: enUrl })

    if (hasEn) urls.push(urlEntry(enUrl, post.date, alternates))
    if (hasKo) urls.push(urlEntry(koUrl, post.date, alternates))
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
}

function buildRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error(`build-sitemap: ${OUT_DIR} does not exist. Run next build first.`)
    process.exit(1)
  }
  const posts = collectPosts()
  fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), buildSitemap(posts))
  fs.writeFileSync(path.join(OUT_DIR, 'robots.txt'), buildRobots())
  console.log(
    `build-sitemap: wrote sitemap.xml (${posts.length} posts) and robots.txt`
  )
}

main()
