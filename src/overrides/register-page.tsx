'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, FileText, Loader2, Lock, Mail, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'
import { SITE_CONFIG } from '@/lib/site-config'

export const REGISTER_PAGE_OVERRIDE_ENABLED = true

export function RegisterPageOverride() {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const { toast } = useToast()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields.')
      return
    }
    if (password.length < 4) {
      setError('Password should be at least 4 characters.')
      return
    }

    try {
      await signup(name.trim(), email.trim(), password)
      toast({ title: 'Account created', description: `Welcome to ${SITE_CONFIG.name}!` })
      router.push('/')
    } catch (err) {
      console.error(err)
      setError('Could not create your account. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#0c1726]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="rounded-[2rem] border border-slate-200 bg-[#d3ee5d] p-10 text-[#0c1726]">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0c1726] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#d3ee5d]">
              <FileText className="h-3.5 w-3.5" />
              Join the publication
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
              Create your {SITE_CONFIG.name} account
            </h1>
            <p className="mt-5 text-sm leading-7 text-[#0c1726]/80">
              Get full access to weekly reports, the PDF library, and a personalized reading list — all in one place.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                'Free, unlimited reading',
                'One-click PDF downloads',
                'Personalized weekly digest',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-[#0c1726]/15 bg-white/40 px-4 py-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0c1726]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Get started</p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-[#0c1726]">Create an account</h2>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
              <label className="grid gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">Full name</span>
                <div className="flex h-12 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 focus-within:border-[#0c1726]">
                  <User className="h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Reader"
                    required
                    className="h-full w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>

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
                    placeholder="At least 4 characters"
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
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-[#0c1726] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
