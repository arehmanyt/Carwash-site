import './globals.css'
import Navbar from '@/components/Navbar'
import FloatingButtons from '@/components/FloatingButtons'
import ChatBot from '@/components/ChatBot'

export const metadata = {
  title: 'SparkWash — Premium Car Wash',
  description: 'Book your car wash appointment online at any of our 3 locations.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <FloatingButtons />
        <ChatBot />
        <footer style={{
          background: '#1e3a8a', color: '#fff', textAlign: 'center',
          padding: '32px 24px', marginTop: 80
        }}>
          <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>💧 SparkWash</p>
          <p style={{ opacity: 0.7, fontSize: 14 }}>
            © {new Date().getFullYear()} SparkWash. All rights reserved.
          </p>
          <p style={{ opacity: 0.6, fontSize: 13, marginTop: 8 }}>
            Downtown · Westside · Airport
          </p>
        </footer>
      </body>
    </html>
  )
}
