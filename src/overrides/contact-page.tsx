'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { ArrowRight, FileText, Loader2, Mail, MapPin, MessageSquare, Newspaper, Phone, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useToast } from '@/components/ui/use-toast'
import { SITE_CONFIG } from '@/lib/site-config'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const CHANNELS = [
  { icon: Newspaper, title: 'Editorial pitches', body: 'Story ideas, drafts, and tips. We read every pitch.', value: 'editors@newsportalweekly.com' },
  { icon: FileText, title: 'PDF library', body: 'Suggest a document, request a briefing, or report an issue.', value: 'library@newsportalweekly.com' },
  { icon: MessageSquare, title: 'Reader support', body: 'Account help, newsletter delivery, and feedback.', value: 'hello@newsportalweekly.com' },
]

const OFFICES = [
  { city: 'London', address: '14 Hatton Garden, EC1N 8AT', tz: 'GMT' },
  { city: 'New York', address: '110 Wall Street, NY 10005', tz: 'EST' },
  { city: 'Singapore', address: '20 Collyer Quay, 049319', tz: 'SGT' },
]

export function ContactPageOverride() {
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('Editorial pitch')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({ title: 'Almost there', description: 'Please complete every field before sending.' })
      return
    }
    setSending(true)
    await new Promise((resolve) => setTimeout(resolve, 900))
    setSending(false)
    toast({ title: 'Message sent', description: `Thanks ${name.split(' ')[0]} — we'll be in touch within two working days.` })
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-white text-[#0c1726]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          <Link href="/" className="hover:text-[#0c1726]">Homepage</Link>
          <span>/</span>
          <span className="text-[#0c1726]">Contact</span>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#d3ee5d] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0c1726]">
              <Sparkles className="h-3 w-3" />
              Get in touch
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
              We'd love to hear from you.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
              Pitch a story, suggest a PDF, or just say hello. Pick the lane that fits — we'll route your note to
              the right desk at {SITE_CONFIG.name}.
            </p>

            <div className="mt-8 space-y-3">
              {CHANNELS.map((channel) => (
                <div key={channel.title} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d3ee5d] text-[#0c1726]">
                    <channel.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold uppercase tracking-tight text-[#0c1726]">{channel.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-slate-600">{channel.body}</p>
                    <a href={`mailto:${channel.value}`} className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0c1726] hover:underline">
                      <Mail className="h-3.5 w-3.5" />
                      {channel.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Send a message</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-[#0c1726]">Fill out the form</h2>

            <form onSubmit={onSubmit} className="mt-6 grid gap-4">
              <label className="grid gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">Your name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Reader"
                  className="h-12 rounded-full border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#0c1726]"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-12 rounded-full border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#0c1726]"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">Topic</span>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="h-12 rounded-full border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#0c1726]"
                >
                  <option>Editorial pitch</option>
                  <option>PDF library</option>
                  <option>Reader support</option>
                  <option>Press &amp; partnerships</option>
                </select>
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">Message</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us a bit more so we can route your note to the right desk."
                  className="min-h-[160px] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0c1726]"
                />
              </label>
              <button
                type="submit"
                disabled={sending}
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0c1726] px-6 text-sm font-bold uppercase tracking-[0.18em] text-white hover:bg-[#1a2538] disabled:opacity-70"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Visit us</p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em]">Newsroom locations</h2>
            </div>
            <Phone className="hidden h-8 w-8 text-[#0c1726] sm:block" />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {OFFICES.map((office) => (
              <div key={office.city} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                  <MapPin className="h-3.5 w-3.5" />
                  {office.tz}
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#0c1726]">{office.city}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{office.address}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
