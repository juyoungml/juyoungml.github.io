import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export type PostLocale = 'en' | 'ko'

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  readingTime: string
  draft?: boolean
  availableLocales: PostLocale[]
}

export interface BlogPostContent {
  meta: BlogPostMeta
  content: string
}

export interface BlogPost {
  slug: string
  availableLocales: PostLocale[]
  byLocale: Partial<Record<PostLocale, BlogPostContent>>
}

export interface TocHeading {
  id: string
  text: string
  level: number
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function extractHeadings(content: string): TocHeading[] {
  const lines = content.split('\n')
  const headings: TocHeading[] = []
  const seen = new Map<string, number>()
  let inFence = false

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line)
    if (!match) continue

    const level = match[1].length
    const text = match[2]
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim()

    const base = slugify(text)
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    const id = count === 0 ? base : `${base}-${count}`

    headings.push({ id, text, level })
  }

  return headings
}

interface BlogFrontmatter {
  title?: string
  date?: string | Date
  description?: string
  tags?: string[]
  draft?: boolean
}

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true })
  }
}

function getPostSlug(fileName: string) {
  return fileName.replace(/\.(?:ko\.)?mdx?$/, '')
}

function getLocaleFromFileName(fileName: string): PostLocale {
  return /\.ko\.mdx?$/.test(fileName) ? 'ko' : 'en'
}

function readPostFile(slug: string, locale: PostLocale) {
  const suffix = locale === 'ko' ? '.ko' : ''
  const filePath = ['mdx', 'md']
    .map(ext => path.join(BLOG_DIR, `${slug}${suffix}.${ext}`))
    .find(p => fs.existsSync(p))
  if (!filePath) return null
  const source = fs.readFileSync(filePath, 'utf8')
  return matter(source)
}

function normalizeDate(date: string | Date | undefined, slug: string) {
  if (date instanceof Date) {
    return date.toISOString().slice(0, 10)
  }

  if (typeof date === 'string' && date.trim()) {
    const normalizedDate = date.trim()
    const timestamp = Number(new Date(normalizedDate))

    if (Number.isNaN(timestamp)) {
      throw new Error(`Invalid blog post date for ${slug}: ${normalizedDate}`)
    }

    return normalizedDate
  }

  return ''
}

function normalizeFrontmatter(
  slug: string,
  frontmatter: BlogFrontmatter,
  content: string,
  availableLocales: PostLocale[]
): BlogPostMeta {
  const draft = frontmatter.draft === true
  const title = frontmatter.title?.trim()
  const date = normalizeDate(frontmatter.date, slug)

  if (!draft && !title) {
    throw new Error(`Missing blog post title: ${slug}`)
  }

  if (!draft && !date) {
    throw new Error(`Missing blog post date: ${slug}`)
  }

  return {
    slug,
    title: title ?? slug,
    date,
    description: frontmatter.description?.trim() ?? '',
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    readingTime: readingTime(content).text,
    draft,
    availableLocales,
  }
}

function listSlugs(): string[] {
  ensureBlogDir()
  const slugs = new Set<string>()
  for (const fileName of fs.readdirSync(BLOG_DIR)) {
    if (!/\.mdx?$/.test(fileName)) continue
    if (getLocaleFromFileName(fileName) !== 'en') continue
    slugs.add(getPostSlug(fileName))
  }
  return Array.from(slugs)
}

function availableLocalesFor(slug: string): PostLocale[] {
  const locales: PostLocale[] = []
  if (readPostFile(slug, 'en')) locales.push('en')
  if (readPostFile(slug, 'ko')) locales.push('ko')
  return locales
}

export function getAllBlogPosts({
  includeDrafts = false,
} = {}): BlogPostMeta[] {
  ensureBlogDir()

  return listSlugs()
    .map(slug => {
      const parsed = readPostFile(slug, 'en')
      if (!parsed) {
        throw new Error(`Blog post not found for slug: ${slug}`)
      }
      return normalizeFrontmatter(
        slug,
        parsed.data,
        parsed.content,
        availableLocalesFor(slug)
      )
    })
    .filter(post => includeDrafts || !post.draft)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
}

export function getBlogPost(slug: string): BlogPost {
  ensureBlogDir()
  const availableLocales = availableLocalesFor(slug)
  if (availableLocales.length === 0) {
    throw new Error(`Blog post not found: ${slug}`)
  }

  const byLocale: BlogPost['byLocale'] = {}
  for (const loc of availableLocales) {
    const parsed = readPostFile(slug, loc)
    if (!parsed) continue
    byLocale[loc] = {
      meta: normalizeFrontmatter(
        slug,
        parsed.data,
        parsed.content,
        availableLocales
      ),
      content: parsed.content,
    }
  }

  return { slug, availableLocales, byLocale }
}
