import Link from 'next/link'
import { ArrowRight, Linkedin, Mail, Sparkles, Twitter } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

const LEADERSHIP = [
  {
    name: 'Amelia Hart',
    role: 'Editor-in-Chief',
    bio: 'Leads our weekly reporting and oversees the editorial calendar. Twenty years across newsroom and policy desks.',
    initials: 'AH',
    accent: '#d3ee5d',
  },
  {
    name: 'Daniel Okafor',
    role: 'Managing Editor',
    bio: 'Shapes the long-form features and the rhythm of every issue. Believes good editing is invisible.',
    initials: 'DO',
    accent: '#0c1726',
  },
  {
    name: 'Priya Raman',
    role: 'Head of Research',
    bio: 'Runs the PDF library and the research desk. Turns raw data into briefings you can actually read.',
    initials: 'PR',
    accent: '#d3ee5d',
  },
]

const CONTRIBUTORS = [
  { name: 'Sara Lindqvist', role: 'Senior Reporter, Climate', initials: 'SL' },
  { name: 'Marco Bellini', role: 'Senior Reporter, Markets', initials: 'MB' },
  { name: 'Ife Adeyemi', role: 'Reporter, Technology', initials: 'IA' },
  { name: 'Hana Kim', role: 'Reporter, Health', initials: 'HK' },
  { name: 'Tom Fitzgerald', role: 'Data Journalist', initials: 'TF' },
  { name: 'Noor Hassan', role: 'Visual Storytelling', initials: 'NH' },
  { name: 'Lucas Wright', role: 'Audio Producer', initials: 'LW' },
  { name: 'Yui Tanaka', role: 'Fact-checker', initials: 'YT' },
]

const DESKS = [
  { title: 'Editorial', count: '14 reporters', body: 'Weekly reports, features, and analysis across global beats.' },
  { title: 'Research', count: '6 researchers', body: 'Primary-source briefings and the curated PDF library.' },
  { title: 'Product', count: '5 builders', body: 'Designers and engineers behind the reading experience.' },
]

function Avatar({ initials, accent }: { initials: string; accent: string }) {
  const isLight = accent === '#d3ee5d'
  return (
    <div
      className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold tracking-tight"
      style={{ backgroundColor: accent, color: isLight ? '#0c1726' : '#d3ee5d' }}
    >
      {initials}
    </div>
  )
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white text-[#0c1726]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          <Link href="/" className="hover:text-[#0c1726]">Homepage</Link>
          <span>/</span>
          <span className="text-[#0c1726]">Team</span>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#d3ee5d] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0c1726]">
              <Sparkles className="h-3 w-3" />
              Our People
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
              The reporters, researchers, and editors behind every issue.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
              A small team that takes its time. We hire for curiosity, clear writing, and the patience to do the
              second draft — then the third.
            </p>
          </div>

          <div className="grid gap-3">
            {DESKS.map((desk) => (
              <div key={desk.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-bold uppercase tracking-tight text-[#0c1726]">{desk.title}</h3>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{desk.count}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{desk.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Leadership</p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em]">Editorial leadership</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {LEADERSHIP.map((person) => (
              <article key={person.name} className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-[#0c1726]">
                <Avatar initials={person.initials} accent={person.accent} />
                <h3 className="mt-5 text-xl font-bold uppercase tracking-tight text-[#0c1726]">{person.name}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">{person.role}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{person.bio}</p>
                <div className="mt-5 flex gap-2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-[#0c1726] hover:text-[#0c1726]">
                    <Twitter className="h-4 w-4" />
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-[#0c1726] hover:text-[#0c1726]">
                    <Linkedin className="h-4 w-4" />
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-[#0c1726] hover:text-[#0c1726]">
                    <Mail className="h-4 w-4" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Newsroom</p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em]">Reporters &amp; contributors</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONTRIBUTORS.map((person) => (
              <article key={person.name} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d3ee5d] text-sm font-bold text-[#0c1726]">
                    {person.initials}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-tight text-[#0c1726]">{person.name}</h3>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{person.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 overflow-hidden rounded-3xl bg-[#0c1726] p-10 text-white">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d3ee5d]">Join us</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em]">We're always reading writing samples.</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/75">
                If you care about clear, careful reporting, we'd like to hear from you. Pitches, applications,
                and cold notes are welcome.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/careers" className="inline-flex items-center gap-2 rounded-full bg-[#d3ee5d] px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#0c1726] hover:bg-[#c2dd4d]">
                Open roles
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white hover:bg-white/10">
                Pitch us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
