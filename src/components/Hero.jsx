import { useState, useEffect } from 'react'
import profileImg from '../assets/profile.jpg'

const roles = [
  'Software Developer',
  'Cybersecurity Researcher',
  'AI / ML Engineer',
  'Hardware Security Specialist',
]

function useTypewriter(words) {
  const [text, setText]       = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    const delay = deleting ? 50 : 110
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), 2000)
      return () => clearTimeout(t)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
      return
    }
    const t = setTimeout(() => {
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, wordIdx, words])

  return text
}

function TextContent({ typed }) {
  return (
    <div className="max-w-xl">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-teal-400/10 border border-teal-400/30 text-teal-400 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-8">
        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
        Available for Opportunities
      </div>

      <p className="text-gray-400 text-lg font-medium mb-2">Hello, I'm</p>

      <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.0] mb-4 tracking-tight">
        Mannpreeth
        <br />
        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,#14b8a6,#67e8f9)' }}>
          MK
        </span>
        <span className="cursor-blink text-teal-400 ml-1">|</span>
      </h1>

      <div className="flex items-center gap-2 mb-6 h-8">
        <span className="text-gray-400 text-base">a</span>
        <span className="text-teal-300 font-semibold text-base sm:text-lg">
          {typed}<span className="cursor-blink text-teal-400">|</span>
        </span>
      </div>

      <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
        MSc Cybersecurity &amp; AI student at the University of Sheffield,
        researching hardware security primitives. Experienced in AI/ML,
        full-stack development, and industrial automation.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <a href="#projects" className="inline-flex items-center justify-center gap-2 bg-teal-400 text-[#07111f] px-8 py-3.5 rounded-full font-bold text-sm hover:bg-teal-300 hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-400/30">
          See My Work
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
        <a href="#contact" className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:border-teal-400 hover:text-teal-400 hover:scale-105 transition-all duration-300">
          Contact Me
        </a>
      </div>
    </div>
  )
}

export default function Hero() {
  const typed = useTypewriter(roles)

  return (
    <section id="home" className="overflow-hidden" style={{ background: '#07111f' }}>

      {/* ═══════════════ MOBILE layout ═══════════════ */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* Photo top half */}
        <div className="relative w-full" style={{ height: '52vw', minHeight: 220, maxHeight: 340 }}>
          <img
            src={profileImg}
            alt="Mannpreeth"
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 5%' }}
          />
          {/* bottom fade into dark bg */}
          <div className="absolute inset-x-0 bottom-0 h-24"
            style={{ background: 'linear-gradient(to top, #07111f, transparent)' }} />
          {/* top fade behind navbar */}
          <div className="absolute inset-x-0 top-0 h-20"
            style={{ background: 'linear-gradient(to bottom, #07111f 20%, transparent)' }} />
        </div>

        {/* Text below photo */}
        <div className="flex-1 px-6 pb-16 pt-4">
          <TextContent typed={typed} />
        </div>
      </div>

      {/* ═══════════════ DESKTOP layout ═══════════════ */}
      <div className="hidden md:flex relative min-h-screen items-center">
        {/* Photo — right side */}
        <div className="absolute right-0 top-0 h-full w-[52%]">
          <img
            src={profileImg}
            alt="Mannpreeth"
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 5%' }}
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, #07111f 0%, rgba(7,17,31,0.45) 30%, transparent 65%)' }} />
          <div className="absolute inset-x-0 bottom-0 h-40"
            style={{ background: 'linear-gradient(to top, #07111f, transparent)' }} />
          <div className="absolute inset-x-0 top-0 h-16"
            style={{ background: 'linear-gradient(to bottom, #07111f, transparent)' }} />
        </div>

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(#14b8a6 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        {/* Text */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pt-28 pb-20">
          <TextContent typed={typed} />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <span className="text-gray-600 text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

    </section>
  )
}
