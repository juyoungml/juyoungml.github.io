import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  readingTime: string
  draft?: boolean
}

export interface BlogPost extends BlogPostMeta {
  content: string
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
  return fileName.replace(/\.mdx?$/, '')
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
  content: string
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
  }
}

export function getAllBlogPosts({
  includeDrafts = false,
} = {}): BlogPostMeta[] {
  ensureBlogDir()

  return fs
    .readdirSync(BLOG_DIR)
    .filter(fileName => /\.mdx?$/.test(fileName))
    .map(fileName => {
      const slug = getPostSlug(fileName)
      const source = fs.readFileSync(path.join(BLOG_DIR, fileName), 'utf8')
      const { data, content } = matter(source)
      return normalizeFrontmatter(slug, data, content)
    })
    .filter(post => includeDrafts || !post.draft)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
}

export function getBlogPost(slug: string): BlogPost {
  ensureBlogDir()

  const filePath = ['mdx', 'md']
    .map(extension => path.join(BLOG_DIR, `${slug}.${extension}`))
    .find(candidate => fs.existsSync(candidate))

  if (!filePath) {
    throw new Error(`Blog post not found: ${slug}`)
  }

  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)

  return {
    ...normalizeFrontmatter(slug, data, content),
    content,
  }
}
