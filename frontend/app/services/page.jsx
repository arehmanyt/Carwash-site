import Link from 'next/link'

const services = [
  {
    icon: '🚿', name: 'Basic Wash', price: '$15',
    duration: '~20 min',
    features: ['Exterior rinse & soap wash', 'Hand-dry finish', 'Window clean', 'Tyre shine']
  },
  {
    icon: '🪑', name: 'Interior Clean', price: '$35',
    duration: '~45 min',
    features: ['Full vacuum (seats, boot, mats)', 'Dashboard & console wipe', 'Window interior clean', 'Air freshener']
  },
  {
    icon: '✨', name: 'Full Detail', price: '$75',
    duration: '~2 hrs', popular: true,
    features: ['Everything in Basic + Interior', 'Clay bar treatment', 'Hand wax & polish', 'Leather conditioning', 'Engine bay rinse']
  },
  {
    icon: '⚙️', name: 'Engine Clean', price: '$50',
    duration: '~1 hr',
    features: ['Engine bay degreaser', 'Pressure rinse', 'Plastic dressing', 'Air-dry finish']
  },
  {
    icon: '💎', name: 'Premium Package', price: '$99',
    duration: '~3 hrs',
    features: ['Everything in Full Detail', 'Paint sealant', 'Rim polish', 'Odour elimination', 'Free re-wash within 7 days']
  },
]

export default function ServicesPage() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1 style={{ marginBottom: 12 }}>Our Services</h1>
        <p style={{ color: '#6b7280', fontSize: 17, maxWidth: 500, margin: '0 auto' }}>
          Professional car care services at unbeatable prices. Choose what suits your car.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {services.map(s => (
          <div key={s.name} className="card" style={{
            position: 'relative',
            border: s.popular ? '2px solid #2563eb' : '1px solid #f1f5f9'
          }}>
            {s.popular && (
              <div style={{
                position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                background: '#2563eb', color: '#fff', fontSize: 12, fontWeight: 700,
                padding: '3px 14px', borderRadius: 999
              }}>Most Popular</div>
            )}
            <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
            <h3 style={{ marginBottom: 4 }}>{s.name}</h3>
            <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 12 }}>⏱ {s.duration}</p>
            <p style={{ fontSize: 28, fontWeight: 800, color: '#2563eb', marginBottom: 16 }}>{s.price}</p>
            <ul style={{ listStyle: 'none', marginBottom: 24 }}>
              {s.features.map(f => (
                <li key={f} style={{ fontSize: 14, color: '#374151', padding: '4px 0', display: 'flex', gap: 8 }}>
                  <span style={{ color: '#16a34a' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/booking" className="btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
              Book This Service
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
