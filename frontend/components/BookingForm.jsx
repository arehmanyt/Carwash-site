'use client'
import { useState } from 'react'
import Link from 'next/link'

const BRANCHES  = ['Downtown Branch', 'Westside Branch', 'Airport Branch']
const SERVICES  = ['Basic Wash ($15)', 'Interior Clean ($35)', 'Full Detail ($75)', 'Engine Clean ($50)', 'Premium Package ($99)']
const TIMESLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

export default function BookingForm({ preselectedBranch, preselectedService }) {
  const [form, setForm] = useState({
    name: '', phone: '',
    service: preselectedService || '',
    branch: preselectedBranch || '',
    date: '', time: '', notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState('')

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Booking failed')
      }
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  const input = {
    width: '100%', padding: '10px 12px', borderRadius: 8,
    border: '1px solid #d1d5db', fontSize: 14, marginBottom: 16,
    fontFamily: 'inherit', outline: 'none', transition: 'border 0.15s'
  }
  const label = { fontSize: 13, color: '#374151', display: 'block', marginBottom: 5, fontWeight: 500 }

  if (success) return (
    <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
      <div style={{ fontSize: 56 }}>✅</div>
      <h2 style={{ marginTop: 16, color: '#16a34a', marginBottom: 8 }}>Booking Received!</h2>
      <p style={{ color: '#6b7280', marginBottom: 8 }}>
        Thank you, <strong>{form.name}</strong>. We'll call you at <strong>{form.phone}</strong> to confirm.
      </p>
      <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 28 }}>
        {form.service} · {form.branch} · {form.date} at {form.time}
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn-primary" onClick={() => { setSuccess(false); setForm({ name:'', phone:'', service:'', branch:'', date:'', time:'', notes:'' }) }}>
          Book Another
        </button>
        <Link href="/" className="btn-secondary">Back to Home</Link>
      </div>
    </div>
  )

  return (
    <form onSubmit={submit} className="card">
      {error && (
        <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px 14px',
          borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
          ⚠️ {error}
        </div>
      )}

      <label style={label}>Full Name *</label>
      <input name="name" required placeholder="John Smith"
        style={input} value={form.name} onChange={handle} />

      <label style={label}>Phone Number *</label>
      <input name="phone" required placeholder="+1 555 000 0000" type="tel"
        style={input} value={form.phone} onChange={handle} />

      <label style={label}>Service *</label>
      <select name="service" required style={input} value={form.service} onChange={handle}>
        <option value="">Select a service...</option>
        {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <label style={label}>Branch *</label>
      <select name="branch" required style={input} value={form.branch} onChange={handle}>
        <option value="">Select a branch...</option>
        {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
      </select>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={label}>Preferred Date *</label>
          <input name="date" type="date" required min={today}
            style={input} value={form.date} onChange={handle} />
        </div>
        <div>
          <label style={label}>Preferred Time *</label>
          <select name="time" required style={input} value={form.time} onChange={handle}>
            <option value="">Select time...</option>
            {TIMESLOTS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <label style={label}>Notes (optional)</label>
      <textarea name="notes" placeholder="Any special requests or notes..."
        style={{ ...input, resize: 'vertical', minHeight: 80 }}
        value={form.notes} onChange={handle} />

      <button className="btn-primary" type="submit" disabled={loading}
        style={{ width: '100%', marginTop: 4, opacity: loading ? 0.7 : 1, fontSize: 16, padding: '13px' }}>
        {loading ? '⏳ Submitting...' : '✅ Confirm Booking'}
      </button>

      <p style={{ color: '#9ca3af', fontSize: 12, textAlign: 'center', marginTop: 12 }}>
        We'll call you to confirm. No payment required to book.
      </p>
    </form>
  )
}
