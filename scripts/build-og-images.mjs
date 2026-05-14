#!/usr/bin/env node
/**
 * Postbuild: emit out/og/<slug>.png (and out/og/<slug>.ko.png) for every
 * non-draft blog post. Renders 1200x630 editorial OG images via satori + resvg.
 *
 * Fonts are fetched once from jsDelivr's google/fonts mirror and cached under
 * node_modules/.cache/og-fonts/ so subsequent builds are offline-friendly.
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://juyoung.site'
const ROOT = process.cwd()
const BLOG_DIR = path.join(ROOT, 'content/blog')
const OUT_DIR = path.join(ROOT, 'out')
const OG_DIR = path.join(OUT_DIR, 'og')
const FONT_CACHE = path.join(ROOT, 'node_modules/.cache/og-fonts')

const FONTS = [
  {
    name: 'Newsreader',
    weight: 400,
    file: 'Newsreader-Regular.ttf',
    url: 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/newsreader/static/Newsreader-Regular.ttf',
  },
  {
    name: 'Newsreader',
    weight: 600,
    file: 'Newsreader-SemiBold.ttf',
    url: 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/newsreader/static/Newsreader-SemiBold.ttf',
  },
  {
    name: 'NotoSerifKR',
    weight: 400,
    file: 'NotoSerifKR-Regular.ttf',
    url: 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/notoserifkr/NotoSerifKR-Regular.ttf',
  },
  {
    name: 'NotoSerifKR',
    weight: 600,
    file: 'NotoSerifKR-SemiBold.ttf',
    url: 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/notoserifkr/NotoSerifKR-SemiBold.ttf',
  },
]

async function loadFont(spec) {
  fs.mkdirSync(FONT_CACHE, { recursive: true })
  const local = path.join(FONT_CACHE, spec.file)
  if (!fs.existsSync(local)) {
    const res = await fetch(spec.url)
    if (!res.ok) {
      throw new Error(`failed to fetch ${spec.url}: ${res.status}`)
    }
    const buf = Buffer.from(await res.arrayBuffer())
    fs.writeFileSync(local, buf)
  }
  return {
    name: spec.name,
    weight: spec.weight,
    style: 'normal',
    data: fs.readFileSync(local),
  }
}

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
    const parsed = matter(source)
    if (parsed.data.draft === true) continue
    const date = parsed.data.date
      ? new Date(parsed.data.date).toISOString().slice(0, 10)
      : null
    if (!date) continue
    const entry = bySlug.get(slug) ?? { slug, perLocale: {} }
    entry.perLocale[locale] = {
      title: String(parsed.data.title ?? slug),
      description: String(parsed.data.description ?? ''),
      tags: Array.isArray(parsed.data.tags) ? parsed.data.tags : [],
      date,
      readingTime: readingTime(parsed.content).text,
    }
    bySlug.set(slug, entry)
  }
  return Array.from(bySlug.values())
}

function formatDate(iso, locale) {
  const d = new Date(iso)
  if (locale === 'ko') {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(d)
  }
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d)
}

function ogTree({ title, description, date, readingTimeText, tags, locale }) {
  const serif = locale === 'ko' ? 'NotoSerifKR' : 'Newsreader'
  const label = locale === 'ko' ? '연구 노트' : 'Research note'
  const tagLine = tags.slice(0, 3).join(' · ')
  const metaParts = [formatDate(date, locale), readingTimeText].filter(Boolean)
  if (tagLine) metaParts.push(tagLine)

  return {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fafafa',
        padding: '72px 80px',
        fontFamily: serif,
        color: '#09090b',
        position: 'relative',
      },
      children: [
        // Top: byline
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              fontSize: '22px',
              color: '#52525b',
              letterSpacing: '0.01em',
            },
            children: [
              {
                type: 'span',
                props: {
                  style: { fontWeight: 600, color: '#09090b' },
                  children: 'Juyoung Suk',
                },
              },
              {
                type: 'span',
                props: {
                  style: { margin: '0 12px', color: '#a1a1aa' },
                  children: '·',
                },
              },
              { type: 'span', props: { children: label } },
            ],
          },
        },
        // Middle: title + description
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              marginTop: 'auto',
              marginBottom: 'auto',
              gap: '28px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '76px',
                    lineHeight: 1.1,
                    fontWeight: 600,
                    letterSpacing: '-0.015em',
                    color: '#09090b',
                    display: 'flex',
                  },
                  children: title,
                },
              },
              description
                ? {
                    type: 'div',
                    props: {
                      style: {
                        fontSize: '28px',
                        lineHeight: 1.45,
                        color: '#52525b',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        overflow: 'hidden',
                      },
                      children: description,
                    },
                  }
                : null,
            ].filter(Boolean),
          },
        },
        // Bottom: meta + URL
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '20px',
              color: '#71717a',
              borderTop: '1px solid #e4e4e7',
              paddingTop: '24px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center' },
                  children: metaParts.flatMap((part, i) =>
                    i === 0
                      ? [{ type: 'span', props: { children: part } }]
                      : [
                          {
                            type: 'span',
                            props: {
                              style: { margin: '0 10px', color: '#a1a1aa' },
                              children: '·',
                            },
                          },
                          { type: 'span', props: { children: part } },
                        ]
                  ),
                },
              },
              {
                type: 'div',
                props: {
                  style: { color: '#6366f1', fontWeight: 600 },
                  children: 'juyoung.site',
                },
              },
            ],
          },
        },
      ],
    },
  }
}

async function renderPng(tree, fonts) {
  const svg = await satori(tree, { width: 1200, height: 630, fonts })
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
    .render()
    .asPng()
  return png
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error(
      `build-og-images: ${OUT_DIR} does not exist. Run next build first.`
    )
    process.exit(1)
  }
  fs.mkdirSync(OG_DIR, { recursive: true })

  const fonts = await Promise.all(FONTS.map(loadFont))
  const posts = collectPosts()
  let written = 0

  for (const post of posts) {
    for (const [locale, meta] of Object.entries(post.perLocale)) {
      const tree = ogTree({
        title: meta.title,
        description: meta.description,
        date: meta.date,
        readingTimeText: meta.readingTime,
        tags: meta.tags,
        locale,
      })
      const png = await renderPng(tree, fonts)
      const fileName =
        locale === 'ko' ? `${post.slug}.ko.png` : `${post.slug}.png`
      fs.writeFileSync(path.join(OG_DIR, fileName), png)
      written++
    }
  }

  console.log(`build-og-images: wrote ${written} images to ${OG_DIR}`)
}

main().catch(err => {
  console.error('build-og-images: failed')
  console.error(err)
  process.exit(1)
})
