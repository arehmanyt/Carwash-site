'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [form, setForm]     = useState({ email: '', password: '' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const submit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      localStorage.setItem('adminToken', data.token)
      localStorage.setItem('adminEmail', data.email)
      router.push('/admin/dashboard')
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const inp = {
    width: '100%', padding: '11px 14px', borderRadius: 8,
    border: '1px solid #d1d5db', fontSize: 14, marginBottom: 16,
    fontFamily: 'inherit', outline: 'none'
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: '#f1f5f9', padding: 24
    }}>
      <div className="card" style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔐</div>
          <h1 style={{ fontSize: 22, marginBottom: 4 }}>Admin Login</h1>
          <p style={{ color: '#6b7280', fontSize: 14 }}>SparkWash Dashboard</p>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2', color: '#dc2626', padding: '10px 14px',
            borderRadius: 8, marginBottom: 16, fontSize: 14
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={submit}>
          <label style={{ fontSize: 13, color: '#374151', display: 'block', marginBottom: 5, fontWeight: 500 }}>
            Email
          </label>
          <input
            type="email" required placeholder="admin@sparkwash.com"
            style={inp} value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          />

          <label style={{ fontSize: 13, color: '#374151', display: 'block', marginBottom: 5, fontWeight: 500 }}>
            Password
          </label>
          <input
            type="password" required placeholder="••••••••"
            style={inp} value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          />

          <button
            className="btn-primary" type="submit" disabled={loading}
            style={{ width: '100%', padding: 13, fontSize: 15, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>

        <p style={{ color: '#9ca3af', fontSize: 12, textAlign: 'center', marginTop: 16 }}>
          First time? Visit <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: 4 }}>
            /api/auth/seed
          </code> on your backend to create the admin account.
        </p>
      </div>
    </div>
  )
}
