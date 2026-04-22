import Link from 'next/link'
import { AlertTriangle, FileCheck, Gavel, Mail, Scale, ScrollText, ShieldCheck, UserCheck } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const SECTIONS = [
  {
    icon: FileCheck,
    title: '1. Acceptance of terms',
    body: `By visiting or using ${SITE_CONFIG.name}, you agree to these terms. They form a contract between you and the publication. If you do not agree, please don't use the service.`,
  },
  {
    icon: UserCheck,
    title: '2. Your account',
    body: 'You are responsible for the activity on your account and for keeping your password safe. Tell us straight away if you spot anything suspicious. One person, one account — sharing is not allowed.',
  },
  {
    icon: ScrollText,
    title: '3. Editorial content',
    body: 'All articles, reports, and PDFs are protected by copyright. You may share single articles for personal use and quote short excerpts with attribution. Republishing in full requires written permission.',
  },
  {
    icon: ShieldCheck,
    title: '4. Acceptable use',
    body: "Don't scrape the site, don't try to break it, and don't use it to harass anyone. We reserve the right to suspend accounts that abuse the service — with notice, where the situation allows.",
  },
  {
    icon: AlertTriangle,
    title: '5. Disclaimers',
    body: 'Our reporting is published in good faith but is not legal, financial, or medical advice. Always seek a qualified professional before acting on anything you read here.',
  },
  {
    icon: Scale,
    title: '6. Liability',
    body: 'To the extent permitted by law, our liability is limited to the amount you have paid us in the previous twelve months. Nothing in these terms excludes liability we cannot legally exclude.',
  },
  {
    icon: Gavel,
    title: '7. Governing law',
    body: 'These terms are governed by the laws of England and Wales. Any dispute will be resolved by the courts of London, unless local consumer-protection laws give you a stronger right.',
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-[#0c1726]">
      <NavbarShell />
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          <Link href="/" className="hover:text-[#0c1726]">Homepage</Link>
          <span>/</span>
          <span className="text-[#0c1726]">Terms</span>
        </nav>

        <header className="overflow-hidden rounded-3xl bg-[#d3ee5d] p-10 lg:p-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#0c1726] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#d3ee5d]">
            <ScrollText className="h-3 w-3" />
            Terms of Service
          </div>
          <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-[#0c1726] sm:text-6xl">
            The agreement between us, in plain English.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#0c1726]/80">
            Boring legal text matters, but it doesn't have to be impossible to read. Here's what using
            {' '}{SITE_CONFIG.name} means in practice — for you and for us.
          </p>
          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0c1726]/70">
            Effective · April 2026
          </p>
        </header>

        <section className="mt-12 space-y-4">
          {SECTIONS.map((section) => (
            <article key={section.title} className="rounded-3xl border border-slate-200 bg-white p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0c1726] text-[#d3ee5d]">
                  <section.icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-tight text-[#0c1726]">{section.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{section.body}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-3xl bg-[#0c1726] p-8 text-white">
          <h2 className="text-2xl font-bold tracking-[-0.03em]">Need clarity on something?</h2>
          <p className="mt-2 text-sm leading-7 text-white/75">
            Our legal team will help — no jargon, no runaround.
          </p>
          <a
            href="mailto:legal@newsportalweekly.com"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#d3ee5d] px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#0c1726] hover:bg-[#c2dd4d]"
          >
            <Mail className="h-4 w-4" />
            legal@newsportalweekly.com
          </a>
        </section>
      </main>
      <Footer />
    </div>
  )
}
