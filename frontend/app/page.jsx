'use client'

import Link from 'next/link'

const branches = [
  { name: 'Downtown Branch',  address: '123 Main St, City Center',  phone: '+1 555-0101', hours: 'Mon–Sat 8am–7pm' },
  { name: 'Westside Branch',  address: '456 West Ave, Westside Mall', phone: '+1 555-0202', hours: 'Mon–Sat 8am–7pm' },
  { name: 'Airport Branch',   address: '789 Airport Rd, Terminal B',  phone: '+1 555-0303', hours: 'Daily 7am–9pm' },
]

const services = [
  { icon: '🚿', name: 'Basic Wash',    desc: 'Exterior rinse, soap, dry' },
  { icon: '🪑', name: 'Interior Clean', desc: 'Vacuum, wipe, deodorise' },
  { icon: '✨', name: 'Full Detail',    desc: 'Inside + outside perfection' },
  { icon: '⚙️', name: 'Engine Clean',  desc: 'Degrease & clean engine bay' },
]

const stats = [
  { value: '10,000+', label: 'Happy Customers' },
  { value: '3',       label: 'Locations' },
  { value: '4.9★',   label: 'Average Rating' },
  { value: '15 min',  label: 'Average Wait Time' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        color: '#fff', textAlign: 'center', padding: '100px 24px 80px'
      }}>
        <p className="fade-up" style={{
          background: 'rgba(255,255,255,0.15)', display: 'inline-block',
          padding: '4px 16px', borderRadius: 999, fontSize: 13, marginBottom: 20
        }}>
          ⭐ Rated #1 Car Wash in the City
        </p>
        <h1 className="fade-up" style={{ color: '#fff', marginBottom: 20, animationDelay: '0.1s' }}>
          Premium Car Wash<br />& Detailing
        </h1>
        <p style={{ fontSize: 18, opacity: 0.85, marginBottom: 36, maxWidth: 500, margin: '0 auto 36px' }}>
          Book your appointment online at any of our 3 locations. Fast, affordable, spotless results.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/booking" className="btn-primary" style={{
            background: '#fff', color: '#1e3a8a', padding: '14px 36px', fontSize: 16
          }}>
            Book Now →
          </Link>
          <Link href="/services" className="btn-secondary" style={{
            color: '#fff', borderColor: 'rgba(255,255,255,0.6)', padding: '14px 32px', fontSize: 16
          }}>
            View Services
          </Link>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: '#1e3a8a', padding: '28px 24px' }}>
        <div className="container" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16
        }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center', color: '#fff' }}>
              <p style={{ fontSize: 26, fontWeight: 800 }}>{s.value}</p>
              <p style={{ fontSize: 13, opacity: 0.7, marginTop: 4 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 8 }}>Our Services</h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 40 }}>
            Everything your car needs, under one roof.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {services.map((s, i) => (
              <div key={s.name} className="card fade-up"
                style={{ textAlign: 'center', animationDelay: `${i * 0.1}s`, transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{s.icon}</div>
                <h3 style={{ marginBottom: 8 }}>{s.name}</h3>
                <p style={{ color: '#6b7280', fontSize: 14 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link href="/pricing" className="btn-secondary">See Pricing →</Link>
          </div>
        </div>
      </section>

      {/* Branches */}
      <section style={{ background: '#f1f5f9' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 8 }}>Our Locations</h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 40 }}>
            Find a branch near you.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {branches.map(b => (
              <div key={b.name} className="card" style={{ borderLeft: '4px solid #2563eb' }}>
                <h3 style={{ color: '#1e3a8a', marginBottom: 12 }}>{b.name}</h3>
                <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 6 }}>📍 {b.address}</p>
                <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 6 }}>📞 {b.phone}</p>
                <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 16 }}>🕐 {b.hours}</p>
                <Link href="/booking" className="btn-primary" style={{ fontSize: 13, padding: '8px 18px' }}>
                  Book at this branch
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
        color: '#fff', textAlign: 'center', borderRadius: 16,
        maxWidth: 900, margin: '0 auto 60px', padding: '60px 32px'
      }}>
        <h2 style={{ color: '#fff', marginBottom: 12 }}>Ready for a sparkling clean car?</h2>
        <p style={{ opacity: 0.85, marginBottom: 28, fontSize: 17 }}>
          Book online in 60 seconds. No account needed.
        </p>
        <Link href="/booking" className="btn-primary"
          style={{ background: '#fff', color: '#2563eb', fontSize: 16, padding: '14px 36px' }}>
          Book Your Appointment →
        </Link>
      </section>
    </div>
  )
}
