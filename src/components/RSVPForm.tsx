'use client'

import { useState } from 'react'

export default function RSVPForm({ eventSlug, eventTitle }: { eventSlug: string; eventTitle: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, eventSlug, eventTitle }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="p-6 bg-amber-50 rounded-xl border border-amber-100 text-center">
        <p className="text-amber-800 font-medium">You&apos;re registered!</p>
        <p className="text-sm text-amber-700 mt-1">We&apos;ll send a confirmation to {email}.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-xl border border-stone-200">
      <h3 className="font-semibold text-stone-900">Register for this session</h3>
      <div>
        <label className="block text-sm text-stone-600 mb-1" htmlFor="rsvp-name">Your name</label>
        <input
          id="rsvp-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
      </div>
      <div>
        <label className="block text-sm text-stone-600 mb-1" htmlFor="rsvp-email">Email address</label>
        <input
          id="rsvp-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
      </div>
      {status === 'error' && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-2.5 rounded-lg bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 disabled:opacity-50 transition-colors"
      >
        {status === 'loading' ? 'Registering…' : 'Register'}
      </button>
    </form>
  )
}
