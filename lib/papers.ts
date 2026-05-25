import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const PAPERS_DIR = path.join(process.cwd(), 'content/papers')

export interface PaperAuthor {
  name: string
  url?: string
}

export interface PaperLinks {
  arxiv?: string
  pdf?: string
  code?: string
  hf?: string
  slides?: string
  openreview?: string
  paper?: string
  blog?: string
  project?: string
}

export interface PaperMeta {
  slug: string
  title: string
  date: string
  year: number
  venue: string
  award?: string
  description: string
  authors: PaperAuthor[]
  arxiv?: string
  links: PaperLinks
  bibtex: string
  tags: string[]
  draft?: boolean
}

export interface Paper {
  meta: PaperMeta
  content: string
}

interface PaperFrontmatter {
  title?: string
  date?: string | Date
  year?: number
  venue?: string
  award?: string
  description?: string
  authors?: Array<string | PaperAuthor>
  arxiv?: string
  pdf?: string
  links?: PaperLinks
  bibtex?: string
  tags?: string[]
  draft?: boolean
}

function ensurePapersDir() {
  if (!fs.existsSync(PAPERS_DIR)) {
    fs.mkdirSync(PAPERS_DIR, { recursive: true })
  }
}

function normalizeDate(date: string | Date | undefined, slug: string): string {
  if (date instanceof Date) return date.toISOString().slice(0, 10)
  if (typeof date === 'string' && date.trim()) {
    const trimmed = date.trim()
    if (Number.isNaN(Number(new Date(trimmed)))) {
      throw new Error(`Invalid paper date for ${slug}: ${trimmed}`)
    }
    return trimmed
  }
  throw new Error(`Missing paper date: ${slug}`)
}

function normalizeAuthors(
  authors: Array<string | PaperAuthor> | undefined,
  slug: string
): PaperAuthor[] {
  if (!authors || authors.length === 0) {
    throw new Error(`Missing authors for paper: ${slug}`)
  }
  return authors.map(a => (typeof a === 'string' ? { name: a } : a))
}

// getStaticProps cannot serialize `undefined` to JSON; drop absent keys.
function compact<T extends object>(obj: T): T {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) out[k] = v
  }
  return out as T
}

function normalizeFrontmatter(slug: string, data: PaperFrontmatter): PaperMeta {
  const title = data.title?.trim()
  if (!title) throw new Error(`Missing paper title: ${slug}`)
  const date = normalizeDate(data.date, slug)
  const year = data.year ?? Number(date.slice(0, 4))
  const venue = data.venue?.trim() ?? 'Preprint'
  const bibtex = data.bibtex?.trim() ?? ''
  if (!bibtex) throw new Error(`Missing bibtex for paper: ${slug}`)

  const links = compact({
    ...(data.links ?? {}),
    pdf: data.pdf?.trim() || data.links?.pdf,
  })

  return compact({
    slug,
    title,
    date,
    year,
    venue,
    award: data.award?.trim() || undefined,
    description: data.description?.trim() ?? '',
    authors: normalizeAuthors(data.authors, slug),
    arxiv: data.arxiv?.trim() || undefined,
    links,
    bibtex,
    tags: Array.isArray(data.tags) ? data.tags : [],
    draft: data.draft === true ? true : undefined,
  }) as PaperMeta
}

let papersCache: PaperMeta[] | null = null

function loadAllPapers(): PaperMeta[] {
  if (papersCache) return papersCache
  ensurePapersDir()
  const files = fs.readdirSync(PAPERS_DIR).filter(f => /\.mdx?$/.test(f))
  papersCache = files
    .map(file => {
      const slug = file.replace(/\.mdx?$/, '')
      const raw = fs.readFileSync(path.join(PAPERS_DIR, file), 'utf8')
      const { data } = matter(raw)
      return normalizeFrontmatter(slug, data as PaperFrontmatter)
    })
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
  return papersCache
}

export function getAllPapers({ includeDrafts = false } = {}): PaperMeta[] {
  const all = loadAllPapers()
  return includeDrafts ? all : all.filter(p => !p.draft)
}

export function getPaper(slug: string): Paper {
  ensurePapersDir()
  const filePath = ['mdx', 'md']
    .map(ext => path.join(PAPERS_DIR, `${slug}.${ext}`))
    .find(p => fs.existsSync(p))
  if (!filePath) throw new Error(`Paper not found: ${slug}`)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return {
    meta: normalizeFrontmatter(slug, data as PaperFrontmatter),
    content,
  }
}
