'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

const BRANCHES = ['All', 'Downtown Branch', 'Westside Branch', 'Airport Branch']
const STATUSES = ['All', 'pending', 'confirmed', 'completed', 'cancelled']

const STATUS_STYLE = {
  pending:   { bg: '#fef3c7', color: '#d97706' },
  confirmed: { bg: '#dbeafe', color: '#1d4ed8' },
  completed: { bg: '#dcfce7', color: '#16a34a' },
  cancelled: { bg: '#fee2e2', color: '#dc2626' },
}

export default function AdminDashboard() {
  const [bookings, setBookings]   = useState([])
  const [branch, setBranch]       = useState('All')
  const [status, setStatus]       = useState('All')
  const [loading, setLoading]     = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm]   = useState({})
  const router = useRouter()

  const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null

  const load = useCallback(async () => {
    const token = getToken()
    if (!token) { router.push('/admin/login'); return }
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (branch !== 'All') params.set('branch', branch)
      if (status !== 'All') params.set('status', status)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.status === 401) { localStorage.clear(); router.push('/admin/login'); return }
      setBookings(await res.json())
    } finally { setLoading(false) }
  }, [branch, status, router])

  useEffect(() => { load() }, [load])

  const updateStatus = async (id, newStatus) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ status: newStatus })
    })
    load()
  }

  const saveEdit = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${editingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify(editForm)
    })
    setEditingId(null)
    load()
  }

  const deleteBooking = async id => {
    if (!confirm('Delete this booking? This cannot be undone.')) return
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    load()
  }

  const startEdit = booking => {
    setEditingId(booking._id)
    setEditForm({ name: booking.name, phone: booking.phone, service: booking.service, branch: booking.branch, date: booking.date, time: booking.time, notes: booking.notes })
  }

  const sel = { padding: '7px 10px', borderRadius: 7, border: '1px solid #d1d5db', fontSize: 13, background: '#fff', fontFamily: 'inherit' }
  const inp = { padding: '7px 10px', borderRadius: 7, border: '1px solid #d1d5db', fontSize: 13, fontFamily: 'inherit', width: '100%' }

  const statCounts = s => bookings.filter(b => b.status === s).length

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, marginBottom: 2 }}>📋 Bookings Dashboard</h1>
          <p style={{ color: '#6b7280', fontSize: 13 }}>Manage all appointments across branches</p>
        </div>
        <button
          onClick={() => { localStorage.clear(); router.push('/admin/login') }}
          style={{ ...sel, cursor: 'pointer', color: '#dc2626', borderColor: '#fca5a5' }}
        >
          Logout
        </button>
      </div>

      {/* Stats cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, marginBottom: 28 }}>
        {['pending', 'confirmed', 'completed', 'cancelled'].map(s => (
          <div key={s} className="card" style={{
            borderLeft: `4px solid ${STATUS_STYLE[s].color}`, padding: '14px 16px'
          }}>
            <p style={{ fontSize: 11, color: '#6b7280', textTransform: 'capitalize', marginBottom: 4 }}>{s}</p>
            <p style={{ fontSize: 28, fontWeight: 800, color: STATUS_STYLE[s].color }}>{statCounts(s)}</p>
          </div>
        ))}
        <div className="card" style={{ borderLeft: '4px solid #6b7280', padding: '14px 16px' }}>
          <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>Total</p>
          <p style={{ fontSize: 28, fontWeight: 800 }}>{bookings.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <select style={sel} value={branch} onChange={e => setBranch(e.target.value)}>
          {BRANCHES.map(b => <option key={b}>{b}</option>)}
        </select>
        <select style={sel} value={status} onChange={e => setStatus(e.target.value)}>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={load} style={{ ...sel, cursor: 'pointer' }}>🔄 Refresh</button>
        <span style={{ fontSize: 13, color: '#6b7280', marginLeft: 'auto' }}>
          {bookings.length} result{bookings.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Edit modal */}
      {editingId && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500, padding: 20
        }}>
          <div className="card" style={{ width: '100%', maxWidth: 480 }}>
            <h3 style={{ marginBottom: 20 }}>Edit Booking</h3>
            {[
              { key: 'name',    label: 'Name' },
              { key: 'phone',   label: 'Phone' },
              { key: 'service', label: 'Service' },
              { key: 'branch',  label: 'Branch' },
              { key: 'date',    label: 'Date' },
              { key: 'time',    label: 'Time' },
              { key: 'notes',   label: 'Notes' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 4 }}>{f.label}</label>
                <input style={inp} value={editForm[f.key] || ''} onChange={e => setEditForm(ef => ({ ...ef, [f.key]: e.target.value }))} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button className="btn-primary" onClick={saveEdit} style={{ flex: 1 }}>Save Changes</button>
              <button onClick={() => setEditingId(null)} style={{ ...sel, flex: 1, cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#6b7280' }}>Loading bookings…</div>
      ) : (
        <div style={{ overflowX: 'auto', borderRadius: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, background: '#fff' }}>
            <thead>
              <tr style={{ background: '#1e3a8a', color: '#fff' }}>
                {['Name', 'Phone', 'Service', 'Branch', 'Date', 'Time', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '13px 14px', textAlign: 'left', fontWeight: 600, fontSize: 12, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={b._id} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 500 }}>{b.name}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <a href={`tel:${b.phone}`} style={{ color: '#2563eb', textDecoration: 'none' }}>{b.phone}</a>
                  </td>
                  <td style={{ padding: '12px 14px', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.service}</td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>{b.branch}</td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>{b.date}</td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>{b.time}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <select
                      value={b.status}
                      onChange={e => updateStatus(b._id, e.target.value)}
                      style={{
                        ...sel, fontWeight: 600, fontSize: 12,
                        color: STATUS_STYLE[b.status]?.color,
                        background: STATUS_STYLE[b.status]?.bg,
                        border: 'none'
                      }}
                    >
                      {['pending', 'confirmed', 'completed', 'cancelled'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => startEdit(b)}
                        style={{ background: '#dbeafe', color: '#1d4ed8', border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', fontSize: 12 }}>
                        ✏️ Edit
                      </button>
                      <button onClick={() => deleteBooking(b._id)}
                        style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', fontSize: 12 }}>
                        🗑 Del
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ padding: 48, textAlign: 'center', color: '#9ca3af' }}>
                    No bookings found for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
