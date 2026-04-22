import Link from 'next/link'
import { BarChart3, Cookie, Settings, ShieldCheck, ToggleRight, Wrench } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

const TABLE = [
  {
    name: 'Strictly necessary',
    icon: ShieldCheck,
    purpose: 'Keeps you signed in and remembers your reading preferences. The site cannot work without these.',
    duration: 'Session — 12 months',
    optional: false,
  },
  {
    name: 'Performance',
    icon: BarChart3,
    purpose: 'Anonymized analytics so we can see which articles work and where the site is slow.',
    duration: '24 months',
    optional: true,
  },
  {
    name: 'Functional',
    icon: Wrench,
    purpose: 'Remembers smaller things like your dark-mode choice or saved filter on the PDF library.',
    duration: '12 months',
    optional: true,
  },
]

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white text-[#0c1726]">
      <NavbarShell />
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          <Link href="/" className="hover:text-[#0c1726]">Homepage</Link>
          <span>/</span>
          <span className="text-[#0c1726]">Cookies</span>
        </nav>

        <header className="overflow-hidden rounded-3xl bg-[#0c1726] p-10 text-white lg:p-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#d3ee5d] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0c1726]">
            <Cookie className="h-3 w-3" />
            Cookie Policy
          </div>
          <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
            Just three kinds of cookies. No tracking maze.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/80">
            Cookies are small files your browser stores so the site can remember things between visits. Here is
            exactly which ones we use, why, and how to control them.
          </p>
          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-[#d3ee5d]">
            Last updated · April 2026
          </p>
        </header>

        <section className="mt-12">
          <div className="rounded-3xl border border-slate-200 bg-white p-2">
            <div className="hidden grid-cols-[1.4fr_2.4fr_1fr_0.8fr] gap-4 border-b border-slate-200 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500 lg:grid">
              <span>Category</span>
              <span>Purpose</span>
              <span>Duration</span>
              <span className="text-right">Status</span>
            </div>
            {TABLE.map((row) => (
              <div
                key={row.name}
                className="grid gap-3 border-b border-slate-100 px-6 py-5 last:border-b-0 lg:grid-cols-[1.4fr_2.4fr_1fr_0.8fr] lg:items-center lg:gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d3ee5d] text-[#0c1726]">
                    <row.icon className="h-5 w-5" />
                  </div>
                  <span className="text-base font-bold uppercase tracking-tight text-[#0c1726]">{row.name}</span>
                </div>
                <p className="text-sm leading-7 text-slate-600">{row.purpose}</p>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">{row.duration}</p>
                <div className="lg:text-right">
                  {row.optional ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d3ee5d] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0c1726]">
                      <ToggleRight className="h-3 w-3" />
                      Optional
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-700">
                      Always on
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-7">
            <Settings className="h-6 w-6 text-[#0c1726]" />
            <h2 className="mt-4 text-xl font-bold uppercase tracking-tight text-[#0c1726]">Manage in your browser</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Every modern browser lets you block, clear, or limit cookies. Look in Settings → Privacy. Doing
              this is fine — but signing back in will be a bit slower.
            </p>
          </div>
          <div className="rounded-3xl bg-[#d3ee5d] p-7">
            <ToggleRight className="h-6 w-6 text-[#0c1726]" />
            <h2 className="mt-4 text-xl font-bold uppercase tracking-tight text-[#0c1726]">Manage on this site</h2>
            <p className="mt-2 text-sm leading-7 text-[#0c1726]/80">
              You can update your optional cookie choices any time from your account settings. We respect every
              opt-out within 24 hours.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
