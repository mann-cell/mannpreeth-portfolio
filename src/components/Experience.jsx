import { useRef, useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'

const experiences = [
  {
    title: 'Research Assistant (MSc Project)', company: 'University of Sheffield', location: 'Sheffield, UK', period: 'Dec 2025 – Present', type: 'Research', color: 'teal',
    bullets: [
      'RISE: Hardware Roots-of-Trust — developing reconfigurable hardware security primitives for RISC-V',
      'Researching DRAM-based Physical Unclonable Functions (PUFs) for secure key generation',
      'Analysing PUF quality metrics (entropy, reliability, BER) using Python & MATLAB',
      'Collaborating with WIZnet and Siemens Germany GmbH toward industry adoption',
    ],
  },
  {
    title: 'Research Assistant', company: 'Coacharya Foundation / PES University', location: 'Bengaluru, India', period: 'May 2025 – Aug 2025', type: 'Research', color: 'teal',
    bullets: [
      'Led cross-functional team building AI-enabled coaching platform with React.js, Node.js, Docker',
      'Engineered RAG-powered chatbot integrating OpenAI, Mistral, Gemini, and Llama 3.1',
      'Built data-driven CRM in Python/MySQL with natural language to SQL capabilities',
    ],
  },
  {
    title: 'Software Developer', company: 'Valenta AI', location: 'Bengaluru, India', period: 'Nov 2024 – Mar 2025', type: 'Industry', color: 'blue',
    bullets: [
      'Built AI-powered HR analytics platform (TensorFlow, PyTorch) integrated with ZOHO Portal',
      'Developed frontend with React.js/Next.js and backend with Node.js REST APIs',
      'Implemented deployment pipelines using AWS, Docker, and GitHub Actions',
    ],
  },
  {
    title: 'PLC Programmer', company: 'Siemens', location: 'Bengaluru, India', period: 'Aug 2021 – Mar 2022', type: 'Industry', color: 'blue',
    bullets: [
      'Designed fault-tolerant PLC architectures (TIA Portal, Ladder Logic) — increased uptime 60%',
      'Integrated PLCs with SCADA systems for industrial automation',
      'Applied cybersecurity best practices to safeguard automation systems',
    ],
  },
]

const typeStyle = {
  Research: 'bg-teal-400/15 text-teal-300 border border-teal-400/30',
  Industry: 'bg-blue-400/15 text-blue-300 border border-blue-400/30',
}
const dotColor = { teal: 'bg-teal-400 shadow-teal-400/50', blue: 'bg-blue-400 shadow-blue-400/50' }

function ExpCard({ exp, side, delay }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`fade-up ${inView ? 'in-view' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="relative flex flex-col md:flex-row gap-0 md:gap-8 items-start">
        {side === 'right' && <div className="hidden md:block md:w-1/2" />}
        {/* Dot */}
        <div className={`hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ${dotColor[exp.color]} shadow-lg mt-7 z-10 items-center justify-center`}>
          <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
        </div>
        {/* Card */}
        <div className={`w-full md:w-1/2 ${side === 'left' ? 'md:pr-12' : 'md:pl-12'}`}>
          <div className="bg-[#0b2d45]/50 border border-white/5 rounded-2xl p-6 hover:border-teal-400/40 hover:bg-[#0b2d45]/80 transition-all duration-300 group">
            <div className="flex items-start justify-between gap-3 mb-1 flex-wrap">
              <div>
                <h3 className="text-white font-bold text-base leading-snug group-hover:text-teal-300 transition-colors duration-300">{exp.title}</h3>
                <p className="text-teal-400 text-sm font-medium mt-0.5">{exp.company}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0 ${typeStyle[exp.type]}`}>{exp.type}</span>
            </div>
            <div className="flex items-center gap-4 mb-4 mt-2">
              <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {exp.period}
              </span>
              <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {exp.location}
              </span>
            </div>
            <ul className="space-y-2.5">
              {exp.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-gray-400 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0 mt-2" />{b}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {side === 'left' && <div className="hidden md:block md:w-1/2" />}
      </div>
    </div>
  )
}

// Animated timeline spine that draws itself on scroll
function TimelineSpine() {
  const ref       = useRef()
  const innerRef  = useRef()
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const full = ref.current?.parentElement?.offsetHeight || 600
        setHeight(full)
      }
    }, { threshold: 0.05 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-px" style={{ width: 1 }}>
      <div ref={innerRef} className="timeline-line" style={{ height }} />
    </div>
  )
}

export default function Experience() {
  const [hdrRef, hdrInView] = useInView()
  return (
    <section id="experience" className="py-28" style={{ background: 'linear-gradient(180deg,#0b1a2e 0%,#081424 100%)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div ref={hdrRef} className={`text-center mb-20 fade-up ${hdrInView ? 'in-view' : ''}`}>
          <p className="text-teal-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">My Journey</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">Experience</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto mt-4 rounded-full" />
        </div>
        <div className="relative">
          <TimelineSpine />
          <div className="space-y-14">
            {experiences.map((exp, i) => (
              <ExpCard key={i} exp={exp} side={i % 2 === 0 ? 'left' : 'right'} delay={100} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
