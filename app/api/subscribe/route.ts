import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    const res = await fetch('https://api.resend.com/audiences/b1e4ae83-4fa2-4653-9f13-43a1fc2a70b2/contacts', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer re_LFjSqrdv_HhpWtxL2YE2fcJRwncJQRKSd',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    })
    if (!res.ok) {
      const err = await res.json()
      return NextResponse.json({ error: err.message || 'Failed' }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
