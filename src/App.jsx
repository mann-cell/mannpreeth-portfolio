import { useState, useEffect } from 'react'
import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import About           from './components/About'
import Experience      from './components/Experience'
import Projects        from './components/Projects'
import Skills          from './components/Skills'
import Contact         from './components/Contact'
import Footer          from './components/Footer'
import ScrollProgress  from './components/ScrollProgress'
import SocialSidebar   from './components/SocialSidebar'
import PageLoader      from './components/PageLoader'
import Cursor          from './components/Cursor'
import Terminal        from './components/Terminal'
import CommandPalette  from './components/CommandPalette'

export default function App() {
  const [terminal, setTerminal] = useState(false)
  const [palette,  setPalette]  = useState(false)

  // Backtick  → open terminal
  // Ctrl+K    → open palette
  useEffect(() => {
    const handler = (e) => {
      if (e.key === '`' && !e.ctrlKey && !e.metaKey && !['INPUT','TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault(); setTerminal(t => !t)
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); setPalette(p => !p)
      }
    }
    // Also listen for custom events from SocialSidebar / buttons
    const onOpenTerminal = () => setTerminal(true)
    window.addEventListener('keydown', handler)
    window.addEventListener('openTerminal', onOpenTerminal)
    return () => { window.removeEventListener('keydown', handler); window.removeEventListener('openTerminal', onOpenTerminal) }
  }, [])

  return (
    <>
      <PageLoader />
      <Cursor />
      <ScrollProgress />
      <SocialSidebar />
      <Navbar onOpenPalette={() => setPalette(true)} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />

      {terminal && <Terminal onClose={() => setTerminal(false)} />}
      {palette  && <CommandPalette onClose={() => setPalette(false)} onOpenTerminal={() => { setPalette(false); setTerminal(true) }} />}

      {/* Noise / film grain overlay */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[9990]" style={{ opacity: 0.032 }}>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Hint pill */}
      <div className="fixed bottom-6 right-6 z-50 hidden lg:flex items-center gap-3">
        <button onClick={() => setPalette(true)}
          className="flex items-center gap-2 bg-white/5 border border-white/10 text-gray-500 hover:text-teal-400 hover:border-teal-400/40 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300">
          <kbd className="bg-white/10 px-1 rounded">Ctrl</kbd>+<kbd className="bg-white/10 px-1 rounded">K</kbd>
          <span>Commands</span>
        </button>
        <button onClick={() => setTerminal(true)}
          className="flex items-center gap-2 bg-white/5 border border-white/10 text-gray-500 hover:text-teal-400 hover:border-teal-400/40 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300">
          <kbd className="bg-white/10 px-1 rounded">`</kbd>
          <span>Terminal</span>
        </button>
      </div>
    </>
  )
}
