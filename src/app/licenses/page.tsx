import Link from 'next/link'
import { BookOpen, Camera, Code2, ExternalLink, FileText, Type } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const CONTENT_LICENSES = [
  {
    icon: BookOpen,
    title: 'Editorial articles',
    license: 'CC BY-NC 4.0',
    body: 'You may share and adapt our articles for non-commercial use with credit to the original author and a link back. Commercial reuse requires permission.',
  },
  {
    icon: FileText,
    title: 'PDF library',
    license: 'Mixed — see document',
    body: 'Each PDF lists its own licence on the cover page. Most original briefings are CC BY 4.0; archival material follows the licence of the source.',
  },
  {
    icon: Camera,
    title: 'Imagery & illustration',
    license: 'Editorial use only',
    body: 'Photographs and illustrations are licensed for editorial use on this site only and may not be redistributed without written consent.',
  },
]

const TECH = [
  { name: 'Next.js', license: 'MIT', url: 'https://github.com/vercel/next.js' },
  { name: 'React', license: 'MIT', url: 'https://github.com/facebook/react' },
  { name: 'Tailwind CSS', license: 'MIT', url: 'https://github.com/tailwindlabs/tailwindcss' },
  { name: 'Radix UI', license: 'MIT', url: 'https://github.com/radix-ui/primitives' },
  { name: 'Lucide Icons', license: 'ISC', url: 'https://github.com/lucide-icons/lucide' },
  { name: 'Framer Motion', license: 'MIT', url: 'https://github.com/framer/motion' },
  { name: 'Recharts', license: 'MIT', url: 'https://github.com/recharts/recharts' },
  { name: 'date-fns', license: 'MIT', url: 'https://github.com/date-fns/date-fns' },
]

export default function LicensesPage() {
  return (
    <div className="min-h-screen bg-white text-[#0c1726]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          <Link href="/" className="hover:text-[#0c1726]">Homepage</Link>
          <span>/</span>
          <span className="text-[#0c1726]">Licenses</span>
        </nav>

        <header className="overflow-hidden rounded-3xl bg-[#d3ee5d] p-10 lg:p-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#0c1726] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#d3ee5d]">
            <Type className="h-3 w-3" />
            Licenses &amp; Attribution
          </div>
          <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-[#0c1726] sm:text-6xl">
            Open knowledge, properly attributed.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#0c1726]/80">
            {SITE_CONFIG.name} is built with — and built on top of — open work. Here is how our content is
            licensed and who we owe credit to for the technology behind the site.
          </p>
        </header>

        <section className="mt-12">
          <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Editorial</p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em]">Content licensing</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {CONTENT_LICENSES.map((item) => (
              <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0c1726] text-[#d3ee5d]">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold uppercase tracking-tight text-[#0c1726]">{item.title}</h3>
                <p className="mt-2 inline-flex rounded-full bg-[#d3ee5d] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0c1726]">
                  {item.license}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Open source</p>
              <h2 className="mt-2 flex items-center gap-3 text-3xl font-bold tracking-[-0.03em]">
                <Code2 className="h-7 w-7" />
                Built with these libraries
              </h2>
            </div>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TECH.map((dep) => (
              <li key={dep.name}>
                <a
                  href={dep.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#0c1726]"
                >
                  <div>
                    <p className="text-sm font-bold uppercase tracking-tight text-[#0c1726]">{dep.name}</p>
                    <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                      {dep.license}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-500" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-6 text-slate-500">
            A complete dependency list with full licence texts is available in our public repository's
            <span className="font-mono"> LICENSES </span> directory.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
