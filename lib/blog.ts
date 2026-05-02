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
  date?: string
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

function normalizeFrontmatter(
  slug: string,
  frontmatter: BlogFrontmatter,
  content: string
): BlogPostMeta {
  return {
    slug,
    title: frontmatter.title ?? slug,
    date: frontmatter.date ?? new Date().toISOString().slice(0, 10),
    description: frontmatter.description ?? '',
    tags: frontmatter.tags ?? [],
    readingTime: readingTime(content).text,
    draft: frontmatter.draft,
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
