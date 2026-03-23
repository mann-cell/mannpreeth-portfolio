import { useState, useEffect } from 'react'

export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const fn = () => {
      const el = document.documentElement
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-[3px] bg-white/5">
      <div
        className="h-full transition-[width] duration-75"
        style={{
          width: `${pct}%`,
          background: 'linear-gradient(to right, #14b8a6, #67e8f9)',
          boxShadow: '0 0 10px #14b8a6, 0 0 20px rgba(20,184,166,0.4)',
        }}
      />
    </div>
  )
}
