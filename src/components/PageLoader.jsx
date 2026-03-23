import { useState, useEffect } from 'react'

export default function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 1600)
    const t2 = setTimeout(() => setVisible(false), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{
        background: '#07111f',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated MK logo */}
        <div className="relative">
          <div
            className="text-6xl font-extrabold text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(135deg, #14b8a6, #67e8f9)',
              animation: 'pulse 1s ease-in-out infinite',
            }}
          >
            MK
          </div>
          {/* Spinning ring */}
          <div
            className="absolute -inset-4 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: '#14b8a6',
              borderRightColor: '#14b8a6',
              animation: 'spin 1s linear infinite',
            }}
          />
        </div>

        {/* Loading bar */}
        <div className="w-40 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(to right, #14b8a6, #67e8f9)',
              animation: 'loadBar 1.6s ease-out forwards',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loadBar {
          from { width: 0% }
          to   { width: 100% }
        }
        @keyframes spin {
          to { transform: rotate(360deg) }
        }
      `}</style>
    </div>
  )
}
