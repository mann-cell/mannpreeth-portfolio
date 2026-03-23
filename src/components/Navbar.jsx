import { useState, useEffect } from 'react'

const links = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [active,   setActive]     = useState('home')
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const ids = links.map(l => l.href.slice(1))
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(ids[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#081424]/95 backdrop-blur-md shadow-2xl shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="text-white font-bold text-xl tracking-tight group"
        >
          <span className="text-teal-400">M</span>annpreeth
          <span className="text-teal-400 ml-0.5">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map(({ label, href }) => {
            const id = href.slice(1)
            return (
              <li key={href}>
                <a
                  href={href}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 rounded-md ${
                    active === id
                      ? 'text-teal-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {label}
                  {active === id && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-teal-400 rounded-full" />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <a
          href="mailto:mannpreethuk@gmail.com"
          className="hidden md:inline-flex items-center gap-2 border border-teal-400 text-teal-400 px-5 py-2 rounded-full text-sm font-semibold hover:bg-teal-400 hover:text-[#081424] transition-all duration-300"
        >
          Hire Me
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#081424]/98 backdrop-blur-md border-t border-white/10 px-6 pt-4 pb-6 space-y-1">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-teal-400 hover:bg-teal-400/10 rounded-lg transition-all duration-200"
            >
              {label}
            </a>
          ))}
          <a
            href="mailto:mannpreethuk@gmail.com"
            className="block mt-3 text-center border border-teal-400 text-teal-400 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-teal-400 hover:text-[#081424] transition-all duration-300"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  )
}
