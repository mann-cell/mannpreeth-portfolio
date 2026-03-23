import { useInView } from '../hooks/useInView'

const groups = [
  {
    title: 'Languages',
    color: 'teal',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    skills: ['Python', 'JavaScript', 'Java', 'Go', 'C', 'HTML', 'CSS', 'MATLAB'],
  },
  {
    title: 'AI / Machine Learning',
    color: 'purple',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
      </svg>
    ),
    skills: ['RAG', 'LLMs', 'OpenAI API', 'Mistral', 'Gemini', 'Llama 3.1', 'YOLO', 'TensorFlow', 'PyTorch', 'CrewAI'],
  },
  {
    title: 'Web Development',
    color: 'blue',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
      </svg>
    ),
    skills: ['React.js', 'Next.js', 'Node.js', 'REST APIs', 'Docker', 'Git', 'GitHub Actions'],
  },
  {
    title: 'Cloud & Databases',
    color: 'cyan',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    skills: ['AWS', 'MongoDB', 'MySQL'],
  },
  {
    title: 'Embedded Systems',
    color: 'orange',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    skills: ['FPGA', 'Raspberry Pi', 'Microcontrollers', 'PLC', 'TIA Portal', 'SCADA', 'Hardware-SW Co-Design'],
  },
  {
    title: 'Cybersecurity',
    color: 'red',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    skills: ['Penetration Testing', 'OWASP ZAP', 'Burp Suite', 'PUFs', 'SCADA Security', 'Email Forensics'],
  },
]

const palette = {
  teal:   { icon: 'bg-teal-400/15 text-teal-400',    pill: 'bg-teal-400/10 text-teal-300 border-teal-400/25',   bar: 'from-teal-500 to-teal-300'   },
  purple: { icon: 'bg-purple-400/15 text-purple-400', pill: 'bg-purple-400/10 text-purple-300 border-purple-400/25', bar: 'from-purple-500 to-purple-300' },
  blue:   { icon: 'bg-blue-400/15 text-blue-400',    pill: 'bg-blue-400/10 text-blue-300 border-blue-400/25',   bar: 'from-blue-500 to-blue-300'   },
  cyan:   { icon: 'bg-cyan-400/15 text-cyan-400',    pill: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/25',   bar: 'from-cyan-500 to-cyan-300'   },
  orange: { icon: 'bg-orange-400/15 text-orange-400', pill: 'bg-orange-400/10 text-orange-300 border-orange-400/25', bar: 'from-orange-500 to-orange-300' },
  red:    { icon: 'bg-red-400/15 text-red-400',      pill: 'bg-red-400/10 text-red-300 border-red-400/25',     bar: 'from-red-500 to-red-300'     },
}

function SkillCard({ group, delay }) {
  const [ref, inView] = useInView()
  const p = palette[group.color]
  return (
    <div
      ref={ref}
      className={`fade-up ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="h-full bg-[#0b2d45]/40 border border-white/5 rounded-2xl p-6 hover:border-teal-400/30 hover:-translate-y-1 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-10 h-10 rounded-xl ${p.icon} flex items-center justify-center flex-shrink-0`}>
            {group.icon}
          </div>
          <h3 className="font-bold text-white text-sm">{group.title}</h3>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          {group.skills.map(s => (
            <span
              key={s}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium cursor-default hover:scale-105 transition-transform duration-200 ${p.pill}`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const [hdrRef, hdrInView] = useInView()
  return (
    <section id="skills" className="py-28" style={{ background: 'linear-gradient(180deg,#0b1a2e 0%,#081424 100%)' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={hdrRef} className={`text-center mb-16 fade-up ${hdrInView ? 'in-view' : ''}`}>
          <p className="text-teal-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">My Toolkit</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">Skills</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((g, i) => (
            <SkillCard key={g.title} group={g} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  )
}
