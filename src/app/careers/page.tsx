import Link from 'next/link'
import { ArrowRight, Briefcase, Coffee, GraduationCap, Heart, Laptop, MapPin, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

const ROLES = [
  {
    title: 'Senior Reporter — Climate Desk',
    team: 'Editorial',
    location: 'Remote (Global)',
    type: 'Full-time',
    body: 'Lead a beat at the intersection of policy, science, and on-the-ground reporting. Five years of newsroom experience preferred.',
  },
  {
    title: 'Researcher — PDF Library',
    team: 'Research',
    location: 'London / Remote',
    type: 'Full-time',
    body: 'Curate, annotate, and publish primary-source PDFs. Strong document literacy and a love for reference material.',
  },
  {
    title: 'Product Designer',
    team: 'Product',
    location: 'Remote (EU)',
    type: 'Full-time',
    body: 'Design reading experiences that respect attention. Type-craft, layout, and interaction design fluency a must.',
  },
  {
    title: 'Newsletter Editor',
    team: 'Editorial',
    location: 'New York / Remote',
    type: 'Full-time',
    body: 'Own the weekly digest from rough draft to inbox. Sharp lines, plain language, no fluff.',
  },
  {
    title: 'Audio Producer (Contract)',
    team: 'Editorial',
    location: 'Remote',
    type: 'Contract',
    body: 'Produce a fortnightly companion podcast. Three published episodes required as part of the application.',
  },
  {
    title: 'Frontend Engineer',
    team: 'Product',
    location: 'Remote (Global)',
    type: 'Full-time',
    body: 'Ship a fast, accessible reading platform with our small product team. React, TypeScript, and Next.js daily.',
  },
]

const PERKS = [
  { icon: Laptop, title: 'Remote-first', body: 'Work from where you do your best thinking. We meet quarterly in person.' },
  { icon: GraduationCap, title: 'Learning budget', body: '£1,500 / year for books, courses, and conferences — no approvals needed.' },
  { icon: Coffee, title: 'Reading days', body: 'One paid day a month with no meetings. Read, research, or wander.' },
  { icon: Heart, title: 'Healthcare', body: 'Comprehensive medical, dental, and mental health support, wherever you live.' },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white text-[#0c1726]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          <Link href="/" className="hover:text-[#0c1726]">Homepage</Link>
          <span>/</span>
          <span className="text-[#0c1726]">Careers</span>
        </nav>

        <section className="overflow-hidden rounded-3xl bg-[#d3ee5d] p-10 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#0c1726] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#d3ee5d]">
                <Sparkles className="h-3 w-3" />
                We're hiring
              </span>
              <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-[#0c1726] sm:text-6xl">
                Build the publication you wish existed.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#0c1726]/80">
                We're a small, distributed team building a calmer, more thoughtful place to read on the
                internet. If that sounds good, take a look at our open roles.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white p-4 text-center">
                <p className="text-3xl font-bold text-[#0c1726]">{ROLES.length}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Open roles</p>
              </div>
              <div className="rounded-2xl bg-white p-4 text-center">
                <p className="text-3xl font-bold text-[#0c1726]">38</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Team size</p>
              </div>
              <div className="rounded-2xl bg-white p-4 text-center">
                <p className="text-3xl font-bold text-[#0c1726]">14</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Countries</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Open positions</p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em]">Find your next chapter</h2>
            </div>
            <span className="hidden text-xs font-bold uppercase tracking-[0.22em] text-slate-500 sm:inline">
              Updated weekly
            </span>
          </div>
          <ul className="mt-6 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white">
            {ROLES.map((role) => (
              <li key={role.title} className="group">
                <Link
                  href="/contact"
                  className="grid gap-3 p-6 transition hover:bg-slate-50 lg:grid-cols-[1.6fr_1fr_auto] lg:items-center"
                >
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-tight text-[#0c1726]">{role.title}</h3>
                    <p className="mt-1.5 text-sm leading-7 text-slate-600">{role.body}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700">
                      <Briefcase className="h-3 w-3" />
                      {role.team}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700">
                      <MapPin className="h-3 w-3" />
                      {role.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d3ee5d] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0c1726]">
                      {role.type}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#0c1726] group-hover:translate-x-0.5 group-hover:transition">
                    Apply
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">What we offer</p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em]">Benefits &amp; ways of working</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PERKS.map((perk) => (
              <div key={perk.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-[#0c1726]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d3ee5d] text-[#0c1726]">
                  <perk.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold uppercase tracking-tight text-[#0c1726]">{perk.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{perk.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl bg-[#0c1726] p-10 text-white">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-[-0.03em]">Don't see your role?</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/75">
                We'd still love to hear from you. Send us a short note about what you'd want to build, and a
                couple of links to your work.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#d3ee5d] px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#0c1726] hover:bg-[#c2dd4d]">
                Send a note
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
