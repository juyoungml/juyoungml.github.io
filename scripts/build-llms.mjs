#!/usr/bin/env node
/**
 * Postbuild: emit out/llms-full.txt — a single markdown document
 * concatenating the homepage overview and every published English blog post
 * (frontmatter + body). Companion to the static public/llms.txt.
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://juyoung.site'
const ROOT = process.cwd()
const BLOG_DIR = path.join(ROOT, 'content/blog')
const PAPERS_DIR = path.join(ROOT, 'content/papers')
const OUT_DIR = path.join(ROOT, 'out')

const OVERVIEW = `# Juyoung Suk

Source of truth: ${SITE_URL}/

ML engineer at Trillion Labs (Seoul) working on foundation models.
Focus areas: long-context training, pretraining infrastructure, evaluation,
and post-training. Previously M.S. in AI at KAIST LK Lab, advised by
Minjoon Seo.

This document concatenates the public site so language models can read it
in one shot. The structured index lives at ${SITE_URL}/llms.txt.

## Selected work

- Tri-21B-Think — reasoning-enhanced 21B foundation model for agentic
  workflows, tool use, and long-horizon tasks.
  https://huggingface.co/trillionlabs/Tri-21B-Think
- Prometheus-Eval — open-source evaluator models and tools for language
  model assessment.
  https://github.com/prometheus-eval/prometheus-eval
- BiGGen Bench — fine-grained benchmark for evaluating language model
  generations.
  https://arxiv.org/abs/2406.05761

## Profiles

- GitHub: https://github.com/juyoungml
- Google Scholar: https://scholar.google.com/citations?user=mENsLCkAAAAJ
- LinkedIn: https://www.linkedin.com/in/juyoung-suk-b5175a192/
- CV: ${SITE_URL}/juyoung-cv.pdf
- RSS: ${SITE_URL}/rss.xml

## Contact

Email: juyoung.suk [at] trillionlabs.co
`

function collectPapers() {
  if (!fs.existsSync(PAPERS_DIR)) return []
  const papers = []
  for (const file of fs.readdirSync(PAPERS_DIR)) {
    if (!/\.mdx?$/.test(file)) continue
    const source = fs.readFileSync(path.join(PAPERS_DIR, file), 'utf8')
    const { data, content } = matter(source)
    if (data.draft === true) continue
    if (!data.title || !data.date) continue
    const slug = file.replace(/\.mdx?$/, '')
    const authors = Array.isArray(data.authors)
      ? data.authors.map(a => (typeof a === 'string' ? a : a.name)).join(', ')
      : ''
    papers.push({
      slug,
      title: data.title,
      date: new Date(data.date).toISOString().slice(0, 10),
      year: data.year ?? new Date(data.date).getUTCFullYear(),
      venue: data.venue ?? 'Preprint',
      award: data.award ?? '',
      description: data.description ?? '',
      authors,
      arxiv: data.arxiv ?? '',
      content: content.trim(),
    })
  }
  return papers.sort((a, b) => (a.date < b.date ? 1 : -1))
}

function renderPaper(paper) {
  const url = `${SITE_URL}/papers/${paper.slug}/`
  const arxivLine = paper.arxiv
    ? `arXiv: https://arxiv.org/abs/${paper.arxiv}`
    : null
  const header = [
    `# ${paper.title}`,
    '',
    `Source: ${url}`,
    `Venue: ${paper.venue}${paper.award ? ` (${paper.award})` : ''}`,
    `Date: ${paper.date}`,
    paper.authors ? `Authors: ${paper.authors}` : null,
    arxivLine,
    paper.description ? `Summary: ${paper.description}` : null,
  ]
    .filter(Boolean)
    .join('\n')
  return `${header}\n\n${paper.content}\n`
}

function collectPosts() {
  if (!fs.existsSync(BLOG_DIR)) return []
  const posts = []
  for (const file of fs.readdirSync(BLOG_DIR)) {
    if (!/\.mdx?$/.test(file)) continue
    if (/\.ko\.mdx?$/.test(file)) continue
    const source = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
    const { data, content } = matter(source)
    if (data.draft === true) continue
    if (!data.title || !data.date) continue
    const slug = file.replace(/\.mdx?$/, '')
    posts.push({
      slug,
      title: data.title,
      date: new Date(data.date).toISOString().slice(0, 10),
      description: data.description ?? '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      content: content.trim(),
    })
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

function renderPost(post) {
  const url = `${SITE_URL}/blog/${post.slug}/`
  const tagLine = post.tags.length ? `Tags: ${post.tags.join(', ')}` : null
  const header = [
    `# ${post.title}`,
    '',
    `Source: ${url}`,
    `Date: ${post.date}`,
    post.description ? `Summary: ${post.description}` : null,
    tagLine,
  ]
    .filter(Boolean)
    .join('\n')
  return `${header}\n\n${post.content}\n`
}

function buildDocument(posts, papers) {
  const generatedAt = new Date().toISOString()
  const parts = [
    OVERVIEW.trim(),
    '',
    `Generated: ${generatedAt}`,
    `Posts included: ${posts.length}`,
    `Papers included: ${papers.length}`,
    '',
    '---',
    '',
    '# Papers',
    '',
    'Reverse chronological. Each entry below corresponds to a canonical URL',
    `under ${SITE_URL}/papers/.`,
    '',
  ]
  for (const paper of papers) {
    parts.push('---', '', renderPaper(paper))
  }
  parts.push(
    '---',
    '',
    '# Blog posts',
    '',
    'Reverse chronological. Each post below corresponds to a canonical URL',
    `under ${SITE_URL}/blog/.`,
    ''
  )
  for (const post of posts) {
    parts.push('---', '', renderPost(post))
  }
  return parts.join('\n')
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error(
      `build-llms: ${OUT_DIR} does not exist. Run next build first.`
    )
    process.exit(1)
  }
  const posts = collectPosts()
  const papers = collectPapers()
  const doc = buildDocument(posts, papers)
  fs.writeFileSync(path.join(OUT_DIR, 'llms-full.txt'), doc)
  console.log(
    `build-llms: wrote llms-full.txt (${posts.length} posts, ${papers.length} papers)`
  )
}

main()
