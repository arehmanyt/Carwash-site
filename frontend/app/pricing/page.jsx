import Link from 'next/link'

const pricingTable = [
  { service: 'Basic Wash',      downtown: '$15', westside: '$15', airport: '$18' },
  { service: 'Interior Clean',  downtown: '$35', westside: '$35', airport: '$40' },
  { service: 'Full Detail',     downtown: '$75', westside: '$70', airport: '$80' },
  { service: 'Engine Clean',    downtown: '$50', westside: '$50', airport: '$55' },
  { service: 'Premium Package', downtown: '$99', westside: '$95', airport: '$110' },
]

export default function PricingPage() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1 style={{ marginBottom: 12 }}>Transparent Pricing</h1>
        <p style={{ color: '#6b7280', fontSize: 17 }}>
          No hidden fees. Prices vary slightly by location.
        </p>
      </div>

      {/* Pricing table */}
      <div className="card" style={{ overflowX: 'auto', padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#1e3a8a', color: '#fff' }}>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: 600 }}>Service</th>
              <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 600 }}>Downtown</th>
              <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 600 }}>Westside</th>
              <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 600 }}>Airport</th>
            </tr>
          </thead>
          <tbody>
            {pricingTable.map((row, i) => (
              <tr key={row.service} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px 20px', fontWeight: 500 }}>{row.service}</td>
                <td style={{ padding: '14px 20px', textAlign: 'center', color: '#2563eb', fontWeight: 700 }}>{row.downtown}</td>
                <td style={{ padding: '14px 20px', textAlign: 'center', color: '#2563eb', fontWeight: 700 }}>{row.westside}</td>
                <td style={{ padding: '14px 20px', textAlign: 'center', color: '#2563eb', fontWeight: 700 }}>{row.airport}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ color: '#9ca3af', fontSize: 13, marginTop: 12, textAlign: 'center' }}>
        * Airport branch prices reflect longer operating hours (daily 7am–9pm)
      </p>

      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <Link href="/booking" className="btn-primary" style={{ fontSize: 16, padding: '14px 40px' }}>
          Book Now →
        </Link>
      </div>
    </div>
  )
}
