'use client'
import { useState, useRef, useEffect } from 'react'

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Hi there! 👋 I'm the SparkWash assistant. Ask me anything about our services, pricing, or locations!"
}

export default function ChatBot() {
  const [open, setOpen]         = useState(false)
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const bottomRef               = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated })
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Sorry, I had a hiccup! Please try again. 😅' }])
    } finally {
      setLoading(false)
    }
  }

  const quickQuestions = ['What services do you offer?', 'Where are your locations?', 'How much does a full detail cost?']

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Chat with AI assistant"
        style={{
          position: 'fixed', bottom: 24, left: 24,
          width: 54, height: 54, borderRadius: '50%',
          background: open ? '#6d28d9' : '#7c3aed',
          border: 'none', color: '#fff', fontSize: 24,
          cursor: 'pointer', zIndex: 999,
          boxShadow: '0 4px 16px rgba(124,58,237,0.45)',
          transition: 'background 0.2s, transform 0.2s',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
        }}
      >
        {open ? '✕' : '🤖'}
      </button>

      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 90, left: 24,
          width: 340, height: 480,
          background: '#fff', borderRadius: 18,
          boxShadow: '0 12px 48px rgba(0,0,0,0.18)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden', zIndex: 1000,
          animation: 'fadeUp 0.25s ease both'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg,#7c3aed,#4f46e5)',
            color: '#fff', padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 10
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
            }}>🤖</div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14 }}>SparkWash AI</p>
              <p style={{ fontSize: 11, opacity: 0.8 }}>● Online — ask me anything</p>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                background: m.role === 'user' ? '#2563eb' : '#f3f4f6',
                color: m.role === 'user' ? '#fff' : '#1a1a2e',
                padding: '9px 13px', borderRadius: m.role === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                maxWidth: '82%', fontSize: 13, lineHeight: 1.55
              }}>
                {m.content}
              </div>
            ))}

            {/* Quick questions (only at start) */}
            {messages.length === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
                {quickQuestions.map(q => (
                  <button key={q} onClick={() => { setInput(q); }}
                    style={{
                      background: '#ede9fe', color: '#5b21b6',
                      border: '1px solid #ddd6fe', borderRadius: 10,
                      padding: '7px 12px', fontSize: 12, cursor: 'pointer',
                      textAlign: 'left', fontFamily: 'inherit'
                    }}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div style={{
                alignSelf: 'flex-start', background: '#f3f4f6',
                padding: '9px 14px', borderRadius: '14px 14px 14px 2px', fontSize: 13
              }}>
                <span style={{ letterSpacing: 2 }}>●●●</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div style={{
            padding: '10px 12px', borderTop: '1px solid #f1f5f9',
            display: 'flex', gap: 8, alignItems: 'center'
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask a question..."
              style={{
                flex: 1, padding: '9px 12px', borderRadius: 10,
                border: '1px solid #e5e7eb', fontSize: 13,
                outline: 'none', fontFamily: 'inherit'
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              style={{
                background: '#7c3aed', color: '#fff', border: 'none',
                borderRadius: 10, padding: '9px 14px', cursor: 'pointer',
                fontSize: 16, opacity: (!input.trim() || loading) ? 0.5 : 1
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  )
}
