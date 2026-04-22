import Link from 'next/link'
import { ArrowRight, Calendar, Clock, Download, FileText, Search, Sparkles } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import type { SitePost } from '@/lib/site-connector'
import { SITE_CONFIG } from '@/lib/site-config'

export const HOME_PAGE_OVERRIDE_ENABLED = true

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = (post?.content && typeof post.content === 'object' ? post.content : {}) as Record<string, unknown>
  const contentImage = Array.isArray(content.images)
    ? (content.images as unknown[]).find((url) => typeof url === 'string') as string | undefined
    : undefined
  const single = typeof content.image === 'string' ? (content.image as string) : undefined
  return mediaUrl || contentImage || single || '/placeholder.svg?height=900&width=1400'
}

function getPostCategory(post: SitePost) {
  const content = (post.content && typeof post.content === 'object' ? post.content : {}) as Record<string, unknown>
  if (typeof content.category === 'string' && content.category) return content.category
  if (Array.isArray(post.tags) && typeof post.tags[0] === 'string') return post.tags[0]
  return 'News'
}

function formatDate(value?: string | null) {
  if (!value) return 'TODAY'
  try {
    return new Date(value).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()
  } catch {
    return 'TODAY'
  }
}

function readingTime(post: SitePost) {
  const content = (post.content && typeof post.content === 'object' ? post.content : {}) as Record<string, unknown>
  const body = typeof content.body === 'string' ? content.body : ''
  const words = body.split(/\s+/).filter(Boolean).length || 600
  return `${Math.max(3, Math.round(words / 200))} MIN READ`
}

const CATEGORY_TABS = [
  { key: 'all', label: 'All News' },
  { key: 'reports', label: 'Weekly Reports' },
  { key: 'analysis', label: 'Analysis' },
  { key: 'features', label: 'Features' },
  { key: 'press', label: 'Press' },
  { key: 'pdf', label: 'PDF Library' },
]

export async function HomePageOverride() {
  const [articles, pdfs] = await Promise.all([
    fetchTaskPosts('article', 9, { allowMockFallback: true, fresh: true }),
    fetchTaskPosts('pdf', 6, { allowMockFallback: true, fresh: true }),
  ])

  const featured = articles[0]
  const list = articles.slice(1, 7)

  return (
    <div className="min-h-screen bg-white text-[#0c1726]">
      <NavbarShell />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          <Link href="/" className="hover:text-[#0c1726]">Homepage</Link>
          <span>/</span>
          <span className="text-[#0c1726]">News &amp; Media</span>
        </nav>

        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h1 className="text-5xl font-bold tracking-[-0.04em] text-[#0c1726] sm:text-6xl">NEWS &amp; MEDIA</h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
              {SITE_CONFIG.description}
            </p>
          </div>
          <form action="/search" className="flex w-full max-w-md items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              type="text"
              name="q"
              placeholder="Search for news"
              className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="rounded-full bg-[#0c1726] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#1a2538]"
            >
              Search
            </button>
          </form>
        </div>

        {featured ? (
          <section className="mt-10 overflow-hidden rounded-3xl">
            <Link href={`/articles/${featured.slug}`} className="group relative block aspect-[16/8] w-full overflow-hidden rounded-3xl">
              <ContentImage src={getPostImage(featured)} alt={featured.title} fill className="object-cover transition duration-500 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              <div className="absolute right-6 top-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d3ee5d] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0c1726]">
                  <Sparkles className="h-3 w-3" />
                  Featured
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 grid gap-3 p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
                <h2 className="max-w-xl text-2xl font-bold uppercase leading-tight tracking-[-0.01em] text-white sm:text-3xl lg:text-4xl">
                  {featured.title}
                </h2>
                <div className="text-white/85">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                    BY {featured.authorName?.toUpperCase() || 'EDITORIAL TEAM'} · {formatDate(featured.publishedAt || featured.createdAt)} · {readingTime(featured)}
                  </p>
                  <p className="mt-3 max-w-md text-sm leading-7">
                    {featured.summary || 'An in-depth analysis from our weekly editorial coverage of the stories that matter most.'}
                  </p>
                </div>
              </div>
            </Link>
          </section>
        ) : null}

        <section className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 py-4">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORY_TABS.map((tab, idx) => (
              <button
                key={tab.key}
                type="button"
                className={
                  idx === 0
                    ? 'rounded-full bg-[#d3ee5d] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0c1726]'
                    : 'rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-600 hover:bg-slate-100'
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <select className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
              <option>All Categories</option>
              <option>Reports</option>
              <option>Analysis</option>
              <option>Features</option>
            </select>
            <select className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
              <option>All Months</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
        </section>

        <section className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Today &nbsp;·&nbsp; {formatDate(new Date().toISOString())}</p>

            {list.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-500">
                No articles to show right now. Check back soon for fresh stories.
              </div>
            ) : null}

            {list.map((post) => (
              <Link
                key={post.id}
                href={`/articles/${post.slug}`}
                className="group grid gap-6 border-b border-slate-200 pb-8 last:border-b-0 sm:grid-cols-[1.4fr_1fr]"
              >
                <div>
                  <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                    <span>{getPostCategory(post)}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <Clock className="h-3 w-3" />
                    {readingTime(post)}
                  </div>
                  <h3 className="mt-3 text-xl font-bold uppercase leading-tight tracking-[-0.01em] text-[#0c1726] group-hover:text-[#1a2538] sm:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {post.summary || 'A look at the latest developments and stories shaping the week.'}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#0c1726]">
                    Read article
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                </div>
              </Link>
            ))}

            <div className="flex justify-center">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 rounded-full border border-[#0c1726] px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-[#0c1726] hover:bg-[#0c1726] hover:text-white"
              >
                View all articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-3xl bg-[#d3ee5d] p-6">
              <div className="flex h-32 items-center justify-center rounded-2xl bg-[#d3ee5d]">
                <svg viewBox="0 0 120 80" className="h-24 w-24 text-[#0c1726]" fill="none" stroke="currentColor" strokeWidth="3">
                  <rect x="20" y="20" width="60" height="42" rx="4" />
                  <path d="M20 28h60" />
                  <circle cx="90" cy="50" r="14" />
                  <path d="M90 50l8 4" />
                </svg>
              </div>
              <h3 className="mt-5 text-xl font-bold uppercase tracking-tight text-[#0c1726]">Stay updated!</h3>
              <p className="mt-2 text-sm leading-6 text-[#0c1726]/80">
                Get all of the company news &amp; insights straight into your inbox.
              </p>
              <form className="mt-4 space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="h-11 w-full rounded-full border border-[#0c1726]/20 bg-white px-4 text-sm outline-none placeholder:text-slate-400 focus:border-[#0c1726]"
                />
                <button
                  type="submit"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0c1726] text-xs font-bold uppercase tracking-[0.22em] text-white hover:bg-[#1a2538]"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#0c1726]" />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">PDF Library</p>
              </div>
              <h3 className="mt-3 text-lg font-bold uppercase tracking-tight text-[#0c1726]">Latest downloads</h3>
              <ul className="mt-4 space-y-3">
                {pdfs.length === 0 ? (
                  <li className="text-sm text-slate-500">No PDFs available yet.</li>
                ) : (
                  pdfs.slice(0, 5).map((post) => (
                    <li key={post.id}>
                      <Link
                        href={`/pdf/${post.slug}`}
                        className="group flex items-start gap-3 rounded-2xl p-2 hover:bg-slate-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d3ee5d] text-[#0c1726]">
                          <Download className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold leading-snug text-[#0c1726] group-hover:text-[#1a2538]">
                            {post.title}
                          </p>
                          <p className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.publishedAt || post.createdAt)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
              <Link
                href="/pdf"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[#0c1726] hover:underline"
              >
                Browse all PDFs
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  )
}
