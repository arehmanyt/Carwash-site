import BookingForm from '@/components/BookingForm'

export const metadata = {
  title: 'Book an Appointment — SparkWash',
  description: 'Book your car wash appointment online in 60 seconds.',
}

export default function BookingPage() {
  return (
    <div style={{ maxWidth: 620, margin: '60px auto', padding: '0 24px' }}>
      <h1 style={{ marginBottom: 8 }}>Book an Appointment</h1>
      <p style={{ color: '#6b7280', marginBottom: 36, fontSize: 16 }}>
        Fill in your details below and we'll confirm your slot shortly via phone.
      </p>
      <BookingForm />
    </div>
  )
}
