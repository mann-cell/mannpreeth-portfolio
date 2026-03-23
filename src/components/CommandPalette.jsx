import { useState, useEffect, useRef } from 'react'

const items = [
  { label: 'Go to Home',       section: 'home',       icon: '⌂',  kbd: null },
  { label: 'Go to About',      section: 'about',      icon: '◈',  kbd: null },
  { label: 'Go to Experience', section: 'experience', icon: '◉',  kbd: null },
  { label: 'Go to Projects',   section: 'projects',   icon: '◇',  kbd: null },
  { label: 'Go to Skills',     section: 'skills',     icon: '◆',  kbd: null },
  { label: 'Go to Contact',    section: 'contact',    icon: '✉',  kbd: null },
  { label: 'Download CV',      action: 'download',    icon: '↓',  kbd: null },
  { label: 'Open Terminal',    action: 'terminal',    icon: '>_', kbd: '`'  },
  { label: 'Email me',         action: 'email',       icon: '@',  kbd: null },
  { label: 'LinkedIn',         action: 'linkedin',    icon: 'in', kbd: null },
  { label: 'GitHub',           action: 'github',      icon: '⌥',  kbd: null },
]

export default function CommandPalette({ onClose, onOpenTerminal }) {
  const [query,    setQuery]    = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef  = useRef()

  const filtered = items.filter(i => i.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => { setSelected(0) }, [query])

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)) }
      else if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
      else if (e.key === 'Enter')     { e.preventDefault(); execute(filtered[selected]) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [filtered, selected, onClose])

  const execute = (item) => {
    if (!item) return
    if (item.section) {
      document.getElementById(item.section)?.scrollIntoView({ behavior: 'smooth' })
    } else if (item.action === 'download') {
      const a = document.createElement('a')
      a.href = '/Mannpreeth_MK_ UK Resume.pdf'
      a.download = 'Mannpreeth_MK_Resume.pdf'
      a.click()
    } else if (item.action === 'terminal') {
      onOpenTerminal()
    } else if (item.action === 'email') {
      window.open('mailto:mannpreethuk@gmail.com')
    } else if (item.action === 'linkedin') {
      window.open('https://www.linkedin.com/in/mannpreeth-mk-19a197135/', '_blank')
    } else if (item.action === 'github') {
      window.open('https://github.com/mann-cell', '_blank')
    }
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[600] flex items-start justify-center pt-[15vh] px-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: '#0f1923',
          border: '1px solid rgba(20,184,166,0.3)',
          boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(20,184,166,0.08)',
          animation: 'paletteDrop 0.2s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Search bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5">
          <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search commands…"
            className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm outline-none"
          />
          <kbd className="text-gray-600 text-xs bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">Esc</kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">No results found</p>
          ) : (
            filtered.map((item, i) => (
              <button
                key={item.label}
                onClick={() => execute(item)}
                onMouseEnter={() => setSelected(i)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100"
                style={{ background: selected === i ? 'rgba(20,184,166,0.1)' : 'transparent' }}
              >
                <span className="w-7 h-7 rounded-lg bg-teal-400/10 text-teal-400 text-xs font-bold flex items-center justify-center flex-shrink-0 font-mono">
                  {item.icon}
                </span>
                <span className={`text-sm flex-1 ${selected === i ? 'text-white' : 'text-gray-400'}`}>
                  {item.label}
                </span>
                {item.kbd && (
                  <kbd className="text-gray-600 text-xs bg-white/5 border border-white/10 px-1.5 py-0.5 rounded font-mono">{item.kbd}</kbd>
                )}
                {selected === i && (
                  <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-white/5">
          {[['↑↓', 'Navigate'], ['↵', 'Select'], ['Esc', 'Close']].map(([key, label]) => (
            <div key={key} className="flex items-center gap-1.5">
              <kbd className="text-gray-500 text-xs bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">{key}</kbd>
              <span className="text-gray-600 text-xs">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes paletteDrop {
          from { transform: translateY(-16px) scale(0.97); opacity: 0; }
          to   { transform: translateY(0)     scale(1);    opacity: 1; }
        }
      `}</style>
    </div>
  )
}
