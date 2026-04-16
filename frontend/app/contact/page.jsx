const branches = [
  {
    name: 'Downtown Branch',
    address: '123 Main St, City Center',
    phone: '+1 555-0101',
    email: 'downtown@sparkwash.com',
    hours: 'Mon–Sat: 8am–7pm\nSun: 9am–5pm',
    wa: '15550101'
  },
  {
    name: 'Westside Branch',
    address: '456 West Ave, Westside',
    phone: '+1 555-0202',
    email: 'westside@sparkwash.com',
    hours: 'Mon–Sat: 8am–7pm\nSun: 9am–5pm',
    wa: '15550202'
  },
  {
    name: 'Airport Branch',
    address: '789 Airport Rd, Terminal B',
    phone: '+1 555-0303',
    email: 'airport@sparkwash.com',
    hours: 'Daily: 7am–9pm',
    wa: '15550303'
  },
]

export default function ContactPage() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1 style={{ marginBottom: 12 }}>Contact Us</h1>
        <p style={{ color: '#6b7280', fontSize: 17 }}>
          Reach us by phone, WhatsApp, or email. We're always happy to help.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {branches.map(b => (
          <div key={b.name} className="card">
            <h3 style={{ color: '#1e3a8a', marginBottom: 16, fontSize: 17 }}>{b.name}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              <p style={{ fontSize: 14, color: '#374151' }}>📍 {b.address}</p>
              <p style={{ fontSize: 14, color: '#374151' }}>📞 <a href={`tel:${b.phone}`} style={{ color: '#2563eb' }}>{b.phone}</a></p>
              <p style={{ fontSize: 14, color: '#374151' }}>✉️ <a href={`mailto:${b.email}`} style={{ color: '#2563eb' }}>{b.email}</a></p>
              <p style={{ fontSize: 14, color: '#374151', whiteSpace: 'pre-line' }}>🕐 {b.hours}</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href={`https://wa.me/${b.wa}`} target="_blank" rel="noreferrer"
                style={{ flex: 1, background: '#25D366', color: '#fff', textAlign: 'center',
                  padding: '10px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
                💬 WhatsApp
              </a>
              <a href={`tel:${b.phone}`}
                style={{ flex: 1, background: '#2563eb', color: '#fff', textAlign: 'center',
                  padding: '10px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
                📞 Call
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
