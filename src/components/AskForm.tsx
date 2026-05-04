'use client'

import { useState } from 'react'

export default function AskForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [question, setQuestion] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, question }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="p-8 bg-amber-50 rounded-xl border border-amber-100 text-center">
        <p className="text-amber-800 font-medium text-lg">Question sent!</p>
        <p className="text-sm text-amber-700 mt-2">
          We&apos;ll reply to {email} as soon as we can. Thank you for asking.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-stone-600 mb-1" htmlFor="ask-name">Your name</label>
          <input
            id="ask-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>
        <div>
          <label className="block text-sm text-stone-600 mb-1" htmlFor="ask-email">Email address</label>
          <input
            id="ask-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-stone-600 mb-1" htmlFor="ask-question">Your question</label>
        <textarea
          id="ask-question"
          required
          rows={5}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. I don't have lemongrass — what can I use instead?"
          className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none"
        />
      </div>
      {status === 'error' && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-2.5 rounded-lg bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 disabled:opacity-50 transition-colors"
      >
        {status === 'loading' ? 'Sending…' : 'Send Question'}
      </button>
    </form>
  )
}
