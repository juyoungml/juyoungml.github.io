#!/usr/bin/env node
/**
 * Postbuild: emit out/rss.xml (EN) and out/rss.ko.xml (KO).
 * RSS 2.0. Description-only items — full content lives on the canonical URL.
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://juyoung.site'
const ROOT = process.cwd()
const BLOG_DIR = path.join(ROOT, 'content/blog')
const OUT_DIR = path.join(ROOT, 'out')

const FEED_INFO = {
  en: {
    file: 'rss.xml',
    title: 'Juyoung Suk',
    description:
      'Research notes and technical writing on foundation models, evaluation, and training systems.',
    language: 'en',
    pathFor: slug => `/blog/${slug}/`,
  },
  ko: {
    file: 'rss.ko.xml',
    title: 'Juyoung Suk (한국어)',
    description:
      '파운데이션 모델, 평가, 학습 시스템에 관한 연구 노트와 기술 글.',
    language: 'ko',
    pathFor: slug => `/blog/ko/${slug}/`,
  },
}

function escape(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function rfc822(dateStr) {
  return new Date(dateStr).toUTCString()
}

function collectPosts(locale) {
  if (!fs.existsSync(BLOG_DIR)) return []
  const suffix = locale === 'ko' ? '.ko' : ''
  const posts = []
  for (const file of fs.readdirSync(BLOG_DIR)) {
    if (!/\.mdx?$/.test(file)) continue
    if (locale === 'en' && /\.ko\.mdx?$/.test(file)) continue
    if (locale === 'ko' && !/\.ko\.mdx?$/.test(file)) continue
    const source = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
    const { data } = matter(source)
    if (data.draft === true) continue
    if (!data.title || !data.date) continue
    const slug = file.replace(new RegExp(`${suffix}\\.mdx?$`), '')
    posts.push({
      slug,
      title: data.title,
      description: data.description ?? '',
      date: new Date(data.date).toISOString(),
      tags: Array.isArray(data.tags) ? data.tags : [],
    })
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

function buildFeed(locale) {
  const info = FEED_INFO[locale]
  const posts = collectPosts(locale)
  const lastBuild = rfc822(posts[0]?.date ?? new Date().toISOString())
  const feedUrl = `${SITE_URL}/${info.file}`
  const homeUrl = `${SITE_URL}/blog/`

  const items = posts
    .map(post => {
      const link = `${SITE_URL}${info.pathFor(post.slug)}`
      const categories = post.tags
        .map(t => `      <category>${escape(t)}</category>`)
        .join('\n')
      return [
        '    <item>',
        `      <title>${escape(post.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${rfc822(post.date)}</pubDate>`,
        `      <description>${escape(post.description)}</description>`,
        categories || null,
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n')
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(info.title)}</title>
    <link>${homeUrl}</link>
    <description>${escape(info.description)}</description>
    <language>${info.language}</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error(
      `build-feeds: ${OUT_DIR} does not exist. Run next build first.`
    )
    process.exit(1)
  }
  for (const locale of /** @type {const} */ (['en', 'ko'])) {
    const xml = buildFeed(locale)
    fs.writeFileSync(path.join(OUT_DIR, FEED_INFO[locale].file), xml)
    console.log(`build-feeds: wrote ${FEED_INFO[locale].file}`)
  }
}

main()
