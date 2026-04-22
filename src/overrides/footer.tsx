import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Articles', href: '/articles' },
      { name: 'PDF Library', href: '/pdf' },
      { name: 'Search', href: '/search' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Team', href: '/team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
      { name: 'Cookies', href: '/cookies' },
      { name: 'Licenses', href: '/licenses' },
    ],
  },
]

export function FooterOverride() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src="/favicon.png?v=20260420"
                alt={`${SITE_CONFIG.name} logo`}
                width={64}
                height={64}
                className="h-16 w-16 rounded-xl object-contain scale-125"
              />
              <span className="text-xl font-semibold tracking-tight text-[#0c1726]">{SITE_CONFIG.name}</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">{SITE_CONFIG.description}</p>
            <Link
              href="/register"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#d3ee5d] px-5 py-2.5 text-sm font-semibold text-[#0c1726] hover:bg-[#c2dd4d]"
            >
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{column.title}</p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-700 hover:text-[#0c1726]">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <p>Articles & PDF library · Updated weekly</p>
        </div>
      </div>
    </footer>
  )
}
