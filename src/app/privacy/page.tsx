import Link from 'next/link'
import { Database, Eye, FileText, Lock, Mail, ShieldCheck, UserCheck } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const SECTIONS = [
  {
    icon: Database,
    title: '1. Information we collect',
    body: 'We collect information you give us directly — your email when you subscribe, your name when you create an account, and any messages you send us. We also collect basic, anonymized usage data so we can improve the reading experience.',
  },
  {
    icon: Eye,
    title: '2. How we use it',
    body: 'Your information powers exactly two things: delivering the publication you signed up for, and making the site work better. We do not sell your data. We do not share it with advertisers.',
  },
  {
    icon: Lock,
    title: '3. How we protect it',
    body: 'Account data is encrypted in transit and at rest. We follow industry-standard security practices and review them quarterly. If anything ever goes wrong, we will tell you directly within 72 hours.',
  },
  {
    icon: UserCheck,
    title: '4. Your rights',
    body: 'You can request a copy of your data, correct it, or delete it at any time — just write to privacy@newsportalweekly.com. EU and UK readers have full GDPR rights; California readers have CCPA rights. We honour all of them.',
  },
  {
    icon: FileText,
    title: '5. Third-party services',
    body: 'We use a small number of carefully chosen vendors for hosting, email delivery, and analytics. Each is bound by data-processing agreements. The full list is available on request.',
  },
  {
    icon: Mail,
    title: '6. Communications',
    body: 'We will only email you the publication you opted into. You can unsubscribe from any email with a single click. Account-related notices (password resets, security alerts) are not promotional and will continue.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-[#0c1726]">
      <NavbarShell />
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          <Link href="/" className="hover:text-[#0c1726]">Homepage</Link>
          <span>/</span>
          <span className="text-[#0c1726]">Privacy</span>
        </nav>

        <header className="overflow-hidden rounded-3xl bg-[#0c1726] p-10 text-white lg:p-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#d3ee5d] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0c1726]">
            <ShieldCheck className="h-3 w-3" />
            Privacy Policy
          </div>
          <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
            We treat your data the way you'd want.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/80">
            Plain English. No tracking pixels in our newsletter. No selling your information. This is exactly
            what {SITE_CONFIG.name} collects, why we collect it, and what you can do about it.
          </p>
          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-[#d3ee5d]">
            Last updated · April 2026
          </p>
        </header>

        <section className="mt-12 space-y-4">
          {SECTIONS.map((section) => (
            <article key={section.title} className="rounded-3xl border border-slate-200 bg-white p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d3ee5d] text-[#0c1726]">
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

        <section className="mt-12 rounded-3xl bg-[#d3ee5d] p-8">
          <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#0c1726]">Questions about your data?</h2>
          <p className="mt-2 text-sm leading-7 text-[#0c1726]/80">
            Write to our privacy team and we'll respond within five working days.
          </p>
          <a
            href="mailto:privacy@newsportalweekly.com"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0c1726] px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white hover:bg-[#1a2538]"
          >
            <Mail className="h-4 w-4" />
            privacy@newsportalweekly.com
          </a>
        </section>
      </main>
      <Footer />
    </div>
  )
}
