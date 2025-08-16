import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import BackToTop from '../components/BackToTop'
import { portfolioData } from '../data/portfolio'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  slug: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Evaluating Language Models: Beyond Traditional Benchmarks",
    excerpt: "How BiGGen-Bench and Prometheus are reshaping how we evaluate LLMs with fine-grained, instance-specific criteria.",
    date: "2024-12-15",
    readTime: "5 min read",
    tags: ["LLM Evaluation", "Research", "Benchmarks"],
    slug: "evaluating-language-models-beyond-traditional-benchmarks"
  },
  {
    id: 2,
    title: "Building Multilingual AI: Lessons from Trillion-7B",
    excerpt: "Key insights from developing a compute-efficient multilingual frontier model and the challenges of cross-lingual knowledge transfer.",
    date: "2024-11-20",
    readTime: "8 min read",
    tags: ["Multilingual AI", "LLM", "Efficiency"],
    slug: "building-multilingual-ai-lessons-from-trillion-7b"
  },
  {
    id: 3,
    title: "The Future of Dynamic LLM Evaluation",
    excerpt: "Introducing LLM-as-an-Interviewer: a novel paradigm for evaluating language models through interactive, multi-turn conversations.",
    date: "2024-10-10",
    readTime: "6 min read",
    tags: ["Dynamic Evaluation", "Research", "LLM"],
    slug: "future-of-dynamic-llm-evaluation"
  }
]

const Blog: NextPage = () => {
  const { personal } = portfolioData

  return (
    <>
      <Head>
        <title>Blog - {personal.name}</title>
        <meta name="description" content="Thoughts and insights on AI research, language models, and machine learning from Juyoung Suk" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" type="application/rss+xml" title="Juyoung Suk - Blog" href="/rss.xml" />
      </Head>

      <div className="min-h-screen bg-background">
        <Navigation name={personal.name} />

        {/* Main Content */}
        <main className="max-width-container section-padding py-16">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-foreground">
                  Blog
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Thoughts and insights on AI research, language models, and the future of machine learning.
                </p>
              </div>
              <a 
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                title="Subscribe to RSS feed"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248S0 22.546 0 20.752s1.456-3.248 3.252-3.248 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z"/>
                </svg>
                RSS
              </a>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-card border border-border rounded-lg p-6 card-hover">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-3 hover:text-accent cursor-pointer transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-md font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="text-sm text-accent hover:text-accent/80 cursor-pointer transition-colors">
                      Coming Soon →
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-muted/20 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Follow my research journey and get notified when new posts are published.
              </p>
              <div className="flex justify-center gap-3">
                <Link 
                  href={personal.github}
                  className="px-4 py-2 bg-accent text-accent-foreground rounded text-sm font-medium hover:bg-accent/90 transition-colors"
                >
                  Follow on GitHub
                </Link>
                <Link 
                  href="/"
                  className="px-4 py-2 border border-border text-foreground rounded text-sm font-medium hover:bg-muted transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-muted/20">
          <div className="max-width-container section-padding py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} {personal.name}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                Built with Next.js & deployed on GitHub Pages
              </div>
            </div>
          </div>
        </footer>
        
        {/* Back to Top Button */}
        <BackToTop />
      </div>
    </>
  )
}

export default Blog