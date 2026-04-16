'use client'

export default function FloatingButtons() {
  const wa    = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '12125550000'
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER   || '+12125550000'

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24,
      display: 'flex', flexDirection: 'column', gap: 12, zIndex: 999
    }}>
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${wa}`}
        target="_blank"
        rel="noreferrer"
        title="Chat on WhatsApp"
        style={{
          width: 54, height: 54, borderRadius: '50%',
          background: '#25D366', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(37,211,102,0.45)',
          textDecoration: 'none', fontSize: 26,
          animation: 'pulse 2.5s infinite'
        }}
      >
        💬
      </a>

      {/* Call */}
      <a
        href={`tel:${phone}`}
        title="Call us"
        style={{
          width: 54, height: 54, borderRadius: '50%',
          background: '#2563eb', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(37,99,235,0.4)',
          textDecoration: 'none', fontSize: 26
        }}
      >
        📞
      </a>
    </div>
  )
}
