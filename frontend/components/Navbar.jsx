'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/',        label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/pricing',  label: 'Pricing' },
  { href: '/booking',  label: 'Book Now', highlight: true },
  { href: '/contact',  label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const path = usePathname()

  return (
    <nav style={{
      background: '#fff', borderBottom: '1px solid #e5e7eb',
      padding: '0 24px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', height: 64,
      position: 'sticky', top: 0, zIndex: 200,
      boxShadow: '0 1px 8px rgba(0,0,0,0.06)'
    }}>
      <Link href="/" style={{
        fontWeight: 800, fontSize: 20, color: '#1e3a8a',
        textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8
      }}>
        💧 SparkWash
      </Link>

      {/* Desktop */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {links.map(l => (
          <Link key={l.href} href={l.href} style={{
            padding: '8px 14px', borderRadius: 8, textDecoration: 'none',
            fontSize: 14, fontWeight: 500, transition: 'all 0.15s',
            ...(l.highlight
              ? { background: '#2563eb', color: '#fff' }
              : { color: path === l.href ? '#2563eb' : '#374151' }
            )
          }}>
            {l.label}
          </Link>
        ))}
        <Link href="/admin/login" style={{
          padding: '6px 12px', borderRadius: 6, color: '#9ca3af',
          textDecoration: 'none', fontSize: 12
        }}>
          Admin
        </Link>
      </div>
    </nav>
  )
}
