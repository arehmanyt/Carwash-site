import { NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are a friendly and helpful customer assistant for SparkWash, a premium car wash business.

BUSINESS INFO:
- 3 locations: Downtown Branch (123 Main St), Westside Branch (456 West Ave), Airport Branch (789 Airport Rd)
- Hours: Downtown & Westside: Mon–Sat 8am–7pm, Sun 9am–5pm. Airport: Daily 7am–9pm.

SERVICES & PRICING:
- Basic Wash: $15 (~20 min) — exterior rinse, soap, dry, window clean, tyre shine
- Interior Clean: $35 (~45 min) — full vacuum, dashboard wipe, window interior, air freshener
- Full Detail: $75 (~2 hrs) — exterior + interior + clay bar + hand wax + leather conditioning
- Engine Clean: $50 (~1 hr) — degreaser, pressure rinse, dressing
- Premium Package: $99 (~3 hrs) — everything + paint sealant + rim polish + free re-wash within 7 days

Airport branch prices are slightly higher due to extended hours.

BOOKING: Customers can book online at /booking or call any branch directly.

RULES:
- Be friendly, concise, and helpful
- If you don't know something specific, say you'll connect them with the team
- Always end with an offer to help book an appointment
- Keep replies under 3 sentences unless listing details`

export async function POST(req) {
  try {
    const { messages } = await req.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        reply: "I'm not configured yet — please add your OpenAI API key to .env.local to enable AI chat!"
      })
    }

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.slice(-10) // keep last 10 messages to avoid token overflow
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.error?.message || 'OpenAI error')

    return NextResponse.json({ reply: data.choices[0].message.content })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json({
      reply: 'Sorry, I\'m having trouble right now. Please call us directly or use the booking form!'
    }, { status: 500 })
  }
}
