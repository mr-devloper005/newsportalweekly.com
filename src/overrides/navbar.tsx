'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X, ArrowRight } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'

export const NAVBAR_OVERRIDE_ENABLED = true

const NavbarAuthControls = dynamic(
  () => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls),
  { ssr: false, loading: () => null },
)

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Articles', href: '/articles' },
  { name: 'PDF Library', href: '/pdf' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function NavbarOverride() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-[#d3ee5d] text-[#0c1726]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] sm:px-6 lg:px-8">
          <span className="hidden sm:inline">Stay informed</span>
          <span className="hidden sm:inline">·</span>
          <span>Fresh weekly reports, articles & downloadable PDFs</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <img
              src="/favicon.png?v=20260420"
              alt={`${SITE_CONFIG.name} logo`}
              width={64}
              height={64}
              className="h-16 w-16 rounded-xl object-contain scale-125"
            />
            <span className="text-xl font-semibold tracking-tight text-[#0c1726]">{SITE_CONFIG.name}</span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    active ? 'text-[#0c1726]' : 'text-slate-600 hover:text-[#0c1726]',
                  )}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/search"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 hover:text-[#0c1726] md:inline-flex"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>

            {isAuthenticated ? (
              <NavbarAuthControls />
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Link
                  href="/login"
                  className="rounded-full px-4 py-2 text-sm font-semibold text-[#0c1726] hover:bg-slate-100"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-[#0c1726] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1a2538]"
                >
                  Get Started
                </Link>
              </div>
            )}

            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#0c1726] hover:bg-slate-100 lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {open ? (
          <div className="border-t border-slate-200 bg-white lg:hidden">
            <div className="space-y-1 px-4 py-4 sm:px-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-semibold text-[#0c1726] hover:bg-slate-100"
                >
                  {link.name}
                </Link>
              ))}
              {!isAuthenticated ? (
                <div className="flex gap-2 pt-2">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-[#0c1726]"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-full bg-[#0c1726] px-4 py-2.5 text-center text-sm font-semibold text-white"
                  >
                    Get Started
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}
