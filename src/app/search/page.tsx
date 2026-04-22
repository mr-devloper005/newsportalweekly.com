import Link from 'next/link'
import { ArrowRight, Calendar, FileText, Search as SearchIcon, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { fetchSiteFeed, type SitePost } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG } from '@/lib/site-config'

export const revalidate = 3

const matchText = (value: string, query: string) => value.toLowerCase().includes(query)
const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => {
  if (typeof value !== 'string') return ''
  return stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase()
}

const QUICK_TAGS = ['Climate', 'Markets', 'Technology', 'Health', 'Policy', 'Reports']

function getImage(post: SitePost) {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = (post.content && typeof post.content === 'object' ? post.content : {}) as Record<string, unknown>
  const contentImages = Array.isArray(content.images)
    ? (content.images as unknown[]).find((url) => typeof url === 'string') as string | undefined
    : undefined
  const single = typeof content.image === 'string' ? (content.image as string) : undefined
  return mediaUrl || contentImages || single || '/placeholder.svg?height=600&width=900'
}

function getCategory(post: SitePost) {
  const content = (post.content && typeof post.content === 'object' ? post.content : {}) as Record<string, unknown>
  if (typeof content.category === 'string' && content.category) return content.category
  if (Array.isArray(post.tags) && typeof post.tags[0] === 'string') return post.tags[0]
  return 'Article'
}

function formatDate(value?: string | null) {
  if (!value) return ''
  try {
    return new Date(value).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()
  } catch {
    return ''
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>
}) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'

  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined,
  )
  const posts = feed?.posts?.length
    ? feed.posts
    : useMaster
      ? []
      : SITE_CONFIG.tasks.flatMap((t) => getMockPostsForTask(t.key))

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === 'object' ? post.content : {}
    const typeText = compactText((content as any).type)
    if (typeText === 'comment') return false
    const description = compactText((content as any).description)
    const body = compactText((content as any).body)
    const excerpt = compactText((content as any).excerpt)
    const categoryText = compactText((content as any).category)
    const tags = Array.isArray(post.tags) ? post.tags.join(' ') : ''
    const tagsText = compactText(tags)
    const derivedCategory = categoryText || tagsText
    if (category && !derivedCategory.includes(category)) return false
    if (task && typeText && typeText !== task) return false
    if (!normalized.length) return true
    return (
      matchText(compactText(post.title || ''), normalized) ||
      matchText(compactText(post.summary || ''), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    )
  })

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24)

  return (
    <div className="min-h-screen bg-white text-[#0c1726]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          <Link href="/" className="hover:text-[#0c1726]">Homepage</Link>
          <span>/</span>
          <span className="text-[#0c1726]">Search</span>
        </nav>

        <section className="overflow-hidden rounded-3xl bg-[#0c1726] p-10 text-white lg:p-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#d3ee5d] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0c1726]">
            <Sparkles className="h-3 w-3" />
            Search the publication
          </div>
          <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
            {query ? <>Results for <span className="text-[#d3ee5d]">"{query}"</span></> : 'Search articles & PDFs'}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-white/80">
            Search every weekly report, feature, and downloadable PDF in the {SITE_CONFIG.name} archive.
          </p>

          <form action="/search" className="mt-8 flex w-full flex-col gap-2 rounded-2xl bg-white p-2 sm:flex-row sm:items-center">
            <input type="hidden" name="master" value="1" />
            {category ? <input type="hidden" name="category" value={category} /> : null}
            {task ? <input type="hidden" name="task" value={task} /> : null}
            <div className="flex w-full flex-1 items-center gap-3 px-3">
              <SearchIcon className="h-5 w-5 text-slate-500" />
              <input
                name="q"
                defaultValue={query}
                placeholder="Search articles, reports, PDFs..."
                className="h-11 w-full bg-transparent text-sm text-[#0c1726] outline-none placeholder:text-slate-400"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0c1726] px-6 text-xs font-bold uppercase tracking-[0.22em] text-white hover:bg-[#1a2538]"
            >
              Search
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/60">Try</span>
            {QUICK_TAGS.map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag.toLowerCase())}&master=1`}
                className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/85 hover:border-[#d3ee5d] hover:text-[#d3ee5d]"
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                {query ? 'Search results' : 'Latest from the archive'}
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em]">
                {results.length} {results.length === 1 ? 'result' : 'results'}
              </h2>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-14 text-center">
              <FileText className="mx-auto h-8 w-8 text-slate-400" />
              <p className="mt-4 text-base font-semibold text-[#0c1726]">No matches yet.</p>
              <p className="mt-1 text-sm text-slate-600">
                Try a different keyword, or browse{' '}
                <Link href="/articles" className="font-semibold text-[#0c1726] underline">
                  all articles
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((post) => {
                const taskKey = getPostTaskKey(post)
                const href = taskKey ? buildPostUrl(taskKey, post.slug) : `/posts/${post.slug}`
                return (
                  <Link
                    key={post.id}
                    href={href}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:border-[#0c1726] hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <ContentImage
                        src={getImage(post)}
                        alt={post.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                      <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#d3ee5d] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0c1726]">
                        {getCategory(post)}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.publishedAt || post.createdAt) || 'Recent'}
                      </div>
                      <h3 className="mt-3 text-lg font-bold uppercase leading-tight tracking-tight text-[#0c1726] group-hover:text-[#1a2538]">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-7 text-slate-600">
                        {post.summary || 'A look at the latest reporting from our weekly editorial coverage.'}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#0c1726]">
                        Read more
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
