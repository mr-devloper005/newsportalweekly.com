import Link from 'next/link'
import { ArrowRight, BookOpen, Compass, FileText, Globe2, Newspaper, Sparkles, Target, Users } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const STATS = [
  { value: '1.2M+', label: 'Monthly readers' },
  { value: '850+', label: 'Weekly reports' },
  { value: '420+', label: 'Downloadable PDFs' },
  { value: '60+', label: 'Countries covered' },
]

const VALUES = [
  {
    icon: Newspaper,
    title: 'Independent reporting',
    body: 'No paywalls on facts. We publish weekly reports that prioritize accuracy and context over speed.',
  },
  {
    icon: BookOpen,
    title: 'Long-form, slow reading',
    body: 'A reading-first publication that respects your time with calmer pacing and substantive analysis.',
  },
  {
    icon: FileText,
    title: 'Open knowledge',
    body: 'Our PDF library puts research, briefings, and primary sources one click away — for everyone.',
  },
  {
    icon: Globe2,
    title: 'Global perspective',
    body: 'Stories that connect local context to the wider world without losing nuance along the way.',
  },
]

const MILESTONES = [
  { year: '2019', title: 'A weekly newsletter is born', body: 'Three writers, one mailing list, and a promise to publish carefully every Sunday.' },
  { year: '2021', title: 'The PDF library opens', body: 'Readers asked for source material — so we made every report downloadable and searchable.' },
  { year: '2023', title: '1 million readers', body: 'A community of curious readers across more than 50 countries discovers the publication.' },
  { year: '2026', title: 'A redesigned home', body: 'A calmer, faster, and more readable platform built around weekly reporting.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[#0c1726]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          <Link href="/" className="hover:text-[#0c1726]">Homepage</Link>
          <span>/</span>
          <span className="text-[#0c1726]">About</span>
        </nav>

        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#d3ee5d] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0c1726]">
              <Sparkles className="h-3 w-3" />
              About us
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
              We publish weekly reporting that's worth your attention.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
              {SITE_CONFIG.name} is an independent publication built around two simple ideas — careful weekly
              reporting and an open library of downloadable PDFs. No infinite feed, no chasing the algorithm,
              just stories and source material we think you'll actually use.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/articles" className="inline-flex items-center gap-2 rounded-full bg-[#0c1726] px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white hover:bg-[#1a2538]">
                Read this week
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[#0c1726] px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#0c1726] hover:bg-[#0c1726] hover:text-white">
                Get in touch
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-3xl font-bold tracking-tight text-[#0c1726]">{stat.value}</p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">What we believe</p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em]">Our editorial values</h2>
            </div>
            <Compass className="hidden h-8 w-8 text-[#0c1726] sm:block" />
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div key={value.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-[#0c1726]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d3ee5d] text-[#0c1726]">
                  <value.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold uppercase tracking-tight text-[#0c1726]">{value.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{value.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-3xl bg-[#0c1726] p-10 text-white">
            <Target className="h-8 w-8 text-[#d3ee5d]" />
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.03em]">Our mission</h2>
            <p className="mt-4 text-sm leading-8 text-white/80">
              To make rigorous weekly reporting and primary-source PDFs accessible to anyone who's curious. We
              think a calmer, more deliberate publication can do more for readers than ten newsletters fighting
              for the same minute of attention.
            </p>
            <Link href="/team" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d3ee5d] px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#0c1726] hover:bg-[#c2dd4d]">
              <Users className="h-4 w-4" />
              Meet the team
            </Link>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">How we got here</p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em]">A short timeline</h2>
            <ol className="mt-8 space-y-4">
              {MILESTONES.map((m) => (
                <li key={m.year} className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#d3ee5d] text-sm font-bold text-[#0c1726]">
                    {m.year}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-tight text-[#0c1726]">{m.title}</h3>
                    <p className="mt-1.5 text-sm leading-7 text-slate-600">{m.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
