import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Download,
  FileText,
  Filter,
  Plus,
  Search,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { fetchTaskPosts } from '@/lib/task-data'
import type { SitePost } from '@/lib/site-connector'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

function getImage(post: SitePost) {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = (post.content && typeof post.content === 'object' ? post.content : {}) as Record<string, unknown>
  const contentImage = Array.isArray(content.images)
    ? ((content.images as unknown[]).find((url) => typeof url === 'string') as string | undefined)
    : undefined
  const single = typeof content.image === 'string' ? (content.image as string) : undefined
  return mediaUrl || contentImage || single || '/placeholder.svg?height=900&width=1400'
}

function getCategory(post: SitePost) {
  const content = (post.content && typeof post.content === 'object' ? post.content : {}) as Record<string, unknown>
  if (typeof content.category === 'string' && content.category) return content.category
  if (Array.isArray(post.tags) && typeof post.tags[0] === 'string') return post.tags[0]
  return ''
}

function formatDate(value?: string | null) {
  if (!value) return 'RECENT'
  try {
    return new Date(value)
      .toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
      .toUpperCase()
  } catch {
    return 'RECENT'
  }
}

function readingTime(post: SitePost) {
  const content = (post.content && typeof post.content === 'object' ? post.content : {}) as Record<string, unknown>
  const body = typeof content.body === 'string' ? content.body : ''
  const words = body.split(/\s+/).filter(Boolean).length || 600
  return `${Math.max(3, Math.round(words / 200))} MIN READ`
}

function fileMeta(post: SitePost) {
  const content = (post.content && typeof post.content === 'object' ? post.content : {}) as Record<string, unknown>
  const pages = typeof content.pages === 'number' ? `${content.pages} PAGES` : '24 PAGES'
  const size = typeof content.size === 'string' ? content.size : '2.4 MB'
  return { pages, size }
}

function CategoryFilters({ task, active }: { task: TaskKey; active: string }) {
  const route = task === 'pdf' ? '/pdf' : '/articles'
  const filters = [{ name: 'All', slug: 'all' }, ...CATEGORY_OPTIONS.slice(0, 9)]
  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((cat) => {
        const isActive = active === cat.slug
        const href = cat.slug === 'all' ? route : `${route}?category=${cat.slug}`
        return (
          <Link
            key={cat.slug}
            href={href}
            className={
              isActive
                ? 'rounded-full bg-[#d3ee5d] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0c1726]'
                : 'rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-600 hover:bg-slate-100'
            }
          >
            {cat.name}
          </Link>
        )
      })}
    </div>
  )
}

function ArticlesView({ posts, activeCategory }: { posts: SitePost[]; activeCategory: string }) {
  const featured = posts[0]
  const secondary = posts.slice(1, 3)
  const list = posts.slice(3)

  return (
    <>
      <section className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#d3ee5d] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0c1726]">
            <BookOpen className="h-3 w-3" />
            Articles &amp; Reports
          </span>
          <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
            Weekly reporting, in long form.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
            Carefully edited stories, analysis, and features from the {SITE_CONFIG.name} newsroom. Updated every
            week — no algorithmic feed, no filler.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto lg:flex-col lg:items-stretch">
          <form action="/search" className="flex w-full items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm sm:flex-1 lg:w-80">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              type="text"
              name="q"
              placeholder="Search articles..."
              className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
            <input type="hidden" name="task" value="article" />
            <button
              type="submit"
              className="rounded-full bg-[#0c1726] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#1a2538]"
            >
              Search
            </button>
          </form>
          <Link
            href="/create/article"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d3ee5d] px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-[#0c1726] hover:bg-[#c2dd4d]"
          >
            <Plus className="h-4 w-4" />
            Write article
          </Link>
        </div>
      </section>

      {featured ? (
        <section className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Link
            href={`/articles/${featured.slug}`}
            className="group relative block aspect-[16/10] overflow-hidden rounded-3xl"
          >
            <ContentImage src={getImage(featured)} alt={featured.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-[#d3ee5d] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0c1726]">
              <Sparkles className="h-3 w-3" />
              Featured
            </span>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 text-white">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/75">
                {getCategory(featured) || 'Editorial'} · {formatDate(featured.publishedAt || featured.createdAt)}
              </p>
              <h2 className="mt-3 max-w-2xl text-2xl font-bold uppercase leading-tight tracking-[-0.01em] sm:text-3xl lg:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/85">
                {featured.summary || 'A flagship report from this week — read in full.'}
              </p>
            </div>
          </Link>

          <div className="grid gap-4">
            {secondary.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
                More stories arriving soon.
              </div>
            ) : null}
            {secondary.map((post) => (
              <Link
                key={post.id}
                href={`/articles/${post.slug}`}
                className="group grid grid-cols-[1fr_120px] gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-[#0c1726]"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
                    {getCategory(post) || 'Article'}
                  </p>
                  <h3 className="mt-2 text-base font-bold uppercase leading-snug tracking-tight text-[#0c1726] group-hover:text-[#1a2538]">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-6 text-slate-600">
                    {post.summary || 'Read the full report.'}
                  </p>
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <ContentImage src={getImage(post)} alt={post.title} fill className="object-cover" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-12 flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 py-4">
        <CategoryFilters task="article" active={activeCategory} />
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
          <Filter className="h-3.5 w-3.5" />
          {posts.length} stories
        </div>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-8">
          {list.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-500">
              No more articles in this view.
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
                  <span>{getCategory(post) || 'Article'}</span>
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
                <ContentImage src={getImage(post)} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
              </div>
            </Link>
          ))}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#0c1726]" />
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Most read</p>
            </div>
            <ol className="mt-5 space-y-4">
              {posts.slice(0, 5).map((post, idx) => (
                <li key={post.id}>
                  <Link href={`/articles/${post.slug}`} className="group flex items-start gap-3">
                    <span className="text-2xl font-bold leading-none text-[#d3ee5d]">{String(idx + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="text-sm font-semibold leading-snug text-[#0c1726] group-hover:text-[#1a2538]">
                        {post.title}
                      </p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
                        {getCategory(post) || 'Article'}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl bg-[#d3ee5d] p-6">
            <h3 className="text-xl font-bold uppercase tracking-tight text-[#0c1726]">Stay updated</h3>
            <p className="mt-2 text-sm leading-6 text-[#0c1726]/80">
              The week's reporting, summarized. Every Sunday.
            </p>
            <form className="mt-4 space-y-2">
              <input
                type="email"
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
        </aside>
      </section>
    </>
  )
}

function PdfView({ posts, activeCategory }: { posts: SitePost[]; activeCategory: string }) {
  const featured = posts[0]
  const list = posts.slice(1)

  return (
    <>
      <section className="overflow-hidden rounded-3xl bg-[#0c1726] p-10 text-white lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#d3ee5d] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0c1726]">
              <FileText className="h-3 w-3" />
              PDF Library
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
              Reports, briefings, and primary sources.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80">
              Download original research, weekly briefings, and reference material from the {SITE_CONFIG.name}
              archive. All free, all annotated, all searchable.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3">
            <form action="/search" className="flex w-full items-center gap-2 rounded-full bg-white px-4 py-2">
              <Search className="h-4 w-4 text-slate-500" />
              <input
                type="text"
                name="q"
                placeholder="Search the library..."
                className="h-9 w-full bg-transparent text-sm text-[#0c1726] outline-none placeholder:text-slate-400"
              />
              <input type="hidden" name="task" value="pdf" />
              <button
                type="submit"
                className="rounded-full bg-[#0c1726] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#1a2538]"
              >
                Search
              </button>
            </form>
            <Link
              href="/create/pdf"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d3ee5d] px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-[#0c1726] hover:bg-[#c2dd4d]"
            >
              <Plus className="h-4 w-4" />
              Upload PDF
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { value: `${posts.length}+`, label: 'Documents' },
            { value: '12+', label: 'Topics' },
            { value: '100%', label: 'Free' },
            { value: 'Weekly', label: 'New uploads' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-2xl font-bold text-[#d3ee5d]">{stat.value}</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {featured ? (
        <section className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[320px] overflow-hidden bg-slate-100">
              <ContentImage src={getImage(featured)} alt={featured.title} fill className="object-cover" />
            </div>
            <div className="p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#d3ee5d] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0c1726]">
                <Sparkles className="h-3 w-3" />
                Featured Download
              </div>
              <h2 className="mt-4 text-3xl font-bold uppercase leading-tight tracking-[-0.02em] text-[#0c1726] sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {featured.summary ||
                  'An in-depth briefing from our research desk — fully sourced and ready to download.'}
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-1">{getCategory(featured) || 'Briefing'}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">{fileMeta(featured).pages}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">{fileMeta(featured).size}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  <Calendar className="mr-1 inline h-3 w-3" />
                  {formatDate(featured.publishedAt || featured.createdAt)}
                </span>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={`/pdf/${featured.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0c1726] px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white hover:bg-[#1a2538]"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </Link>
                <Link
                  href={`/pdf/${featured.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#0c1726] px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-[#0c1726] hover:bg-[#0c1726] hover:text-white"
                >
                  Preview
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mt-12 flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 py-4">
        <CategoryFilters task="pdf" active={activeCategory} />
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
          <Filter className="h-3.5 w-3.5" />
          {posts.length} documents
        </div>
      </section>

      <section className="mt-10">
        {list.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-500">
            No documents to show right now. Check back soon.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((post) => {
              const meta = fileMeta(post)
              return (
                <article
                  key={post.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:border-[#0c1726] hover:shadow-lg"
                >
                  <Link href={`/pdf/${post.slug}`} className="relative block aspect-[5/3] overflow-hidden bg-slate-100">
                    <ContentImage
                      src={getImage(post)}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#d3ee5d] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0c1726]">
                      PDF
                    </span>
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                      {getCategory(post) || 'Briefing'} · {formatDate(post.publishedAt || post.createdAt)}
                    </p>
                    <h3 className="mt-2 text-lg font-bold uppercase leading-snug tracking-tight text-[#0c1726] group-hover:text-[#1a2538]">
                      <Link href={`/pdf/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                      {post.summary || 'Download the full document — fully sourced and annotated.'}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1">{meta.pages}</span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1">{meta.size}</span>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <Link
                        href={`/pdf/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#0c1726]"
                      >
                        Preview
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        href={`/pdf/${post.slug}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#d3ee5d] text-[#0c1726] hover:bg-[#c2dd4d]"
                        aria-label="Download"
                      >
                        <Download className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}

export async function TaskListPageOverride({ task, category }: { task: TaskKey; category?: string }) {
  if (task !== 'article' && task !== 'pdf') {
    return null
  }

  const limit = task === 'pdf' ? 24 : 30
  const posts = await fetchTaskPosts(task, limit, { allowMockFallback: true, fresh: true })
  const activeCategory = category ? normalizeCategory(category) : 'all'

  const breadcrumb = task === 'pdf' ? 'PDF Library' : 'Articles'

  return (
    <div className="min-h-screen bg-white text-[#0c1726]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          <Link href="/" className="hover:text-[#0c1726]">Homepage</Link>
          <span>/</span>
          <span className="text-[#0c1726]">{breadcrumb}</span>
        </nav>

        {task === 'pdf' ? (
          <PdfView posts={posts} activeCategory={activeCategory} />
        ) : (
          <ArticlesView posts={posts} activeCategory={activeCategory} />
        )}
      </main>
      <Footer />
    </div>
  )
}
