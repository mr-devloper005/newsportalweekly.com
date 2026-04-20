'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, FileText, Loader2, Lock, Mail } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'
import { SITE_CONFIG } from '@/lib/site-config'

export const LOGIN_PAGE_OVERRIDE_ENABLED = true

export function LoginPageOverride() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, isLoading } = useAuth()
  const { toast } = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.')
      return
    }

    try {
      await login(email.trim(), password)
      toast({ title: 'Welcome back', description: 'You are now signed in.' })
      const redirect = searchParams?.get('redirect') || '/'
      router.push(redirect)
    } catch (err) {
      console.error(err)
      setError('Could not sign you in. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#0c1726]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="rounded-[2rem] border border-slate-200 bg-[#0c1726] p-10 text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#d3ee5d] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0c1726]">
              <FileText className="h-3.5 w-3.5" />
              Reader Workspace
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
              Sign in to {SITE_CONFIG.name}
            </h1>
            <p className="mt-5 text-sm leading-7 text-white/75">
              Pick up where you left off. Save articles, download PDFs, and follow weekly reports tailored to your interests.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/85">
              {[
                'Bookmark stories and read them later',
                'Download our PDF library on any device',
                'Get personalized weekly briefings',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#d3ee5d]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Welcome back</p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-[#0c1726]">Sign in to your account</h2>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
              <label className="grid gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">Email</span>
                <div className="flex h-12 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 focus-within:border-[#0c1726]">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="h-full w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">Password</span>
                <div className="flex h-12 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 focus-within:border-[#0c1726]">
                  <Lock className="h-4 w-4 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    required
                    minLength={4}
                    className="h-full w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>

              {error ? (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0c1726] px-6 text-sm font-bold uppercase tracking-[0.18em] text-white hover:bg-[#1a2538] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
              <Link href="/forgot-password" className="hover:underline">Forgot password?</Link>
              <Link href="/register" className="font-semibold text-[#0c1726] hover:underline">
                Create an account
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
