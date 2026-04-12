'use client'
import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p style={{ color: '#22c55e', fontWeight: 700, fontSize: '1rem', textAlign: 'center' }}>
        ✓ You're subscribed! Welcome aboard.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', maxWidth: '460px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
      <input
        className="newsletter-input"
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'loading'}
        required
      />
      <button className="newsletter-btn" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Subscribing...' : status === 'error' ? 'Try again →' : 'Subscribe →'}
      </button>
    </form>
  )
}
