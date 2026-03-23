import { useInView } from '../hooks/useInView'

// Radar chart data
const radarAxes = [
  { label: 'Web Dev',       score: 90 },
  { label: 'AI / ML',       score: 82 },
  { label: 'Cybersecurity', score: 85 },
  { label: 'Languages',     score: 88 },
  { label: 'Embedded',      score: 76 },
  { label: 'Cloud',         score: 72 },
]

function RadarChart({ animate }) {
  const cx = 160, cy = 160, r = 120
  const levels = [0.25, 0.5, 0.75, 1]
  const n = radarAxes.length

  const angleOf = i => (i * 2 * Math.PI) / n - Math.PI / 2
  const point   = (ratio, i) => ({
    x: cx + r * ratio * Math.cos(angleOf(i)),
    y: cy + r * ratio * Math.sin(angleOf(i)),
  })

  const gridPolygon = (ratio) =>
    radarAxes.map((_, i) => { const p = point(ratio, i); return `${p.x},${p.y}` }).join(' ')

  const dataPolygon = radarAxes
    .map((ax, i) => { const p = point((animate ? ax.score : 0) / 100, i); return `${p.x},${p.y}` })
    .join(' ')

  return (
    <svg viewBox="0 0 320 320" className="w-full max-w-xs mx-auto">
      {/* Grid rings */}
      {levels.map((l, li) => (
        <polygon key={li} points={gridPolygon(l)}
          fill="none" stroke="rgba(20,184,166,0.12)" strokeWidth="1" />
      ))}
      {/* Axis lines */}
      {radarAxes.map((_, i) => {
        const p = point(1, i)
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(20,184,166,0.15)" strokeWidth="1" />
      })}
      {/* Data polygon */}
      <polygon points={dataPolygon}
        fill="rgba(20,184,166,0.15)" stroke="#14b8a6" strokeWidth="2"
        style={{ transition: animate ? 'all 1.2s cubic-bezier(0.34,1.56,0.64,1)' : 'none' }} />
      {/* Data dots */}
      {radarAxes.map((ax, i) => {
        const p = point((animate ? ax.score : 0) / 100, i)
        return <circle key={i} cx={p.x} cy={p.y} r="4" fill="#14b8a6"
          style={{ transition: animate ? `all 1.2s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.08}s` : 'none' }} />
      })}
      {/* Labels */}
      {radarAxes.map((ax, i) => {
        const p = point(1.22, i)
        return (
          <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
            fill="#94a3b8" fontSize="11" fontFamily="Poppins, sans-serif" fontWeight="500">
            {ax.label}
          </text>
        )
      })}
    </svg>
  )
}

const groups = [
  { title: 'Languages', color: 'teal',   skills: ['Python', 'JavaScript', 'Java', 'Go', 'C', 'HTML', 'CSS', 'MATLAB'],
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> },
  { title: 'AI / Machine Learning', color: 'purple', skills: ['RAG', 'LLMs', 'OpenAI API', 'Mistral', 'Gemini', 'Llama 3.1', 'YOLO', 'TensorFlow', 'PyTorch', 'CrewAI'],
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" /></svg> },
  { title: 'Web Development', color: 'blue', skills: ['React.js', 'Next.js', 'Node.js', 'REST APIs', 'Docker', 'Git', 'GitHub Actions'],
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg> },
  { title: 'Cloud & Databases', color: 'cyan', skills: ['AWS', 'MongoDB', 'MySQL'],
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg> },
  { title: 'Embedded Systems', color: 'orange', skills: ['FPGA', 'Raspberry Pi', 'Microcontrollers', 'PLC', 'TIA Portal', 'SCADA'],
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" /></svg> },
  { title: 'Cybersecurity', color: 'red', skills: ['Penetration Testing', 'OWASP ZAP', 'Burp Suite', 'PUFs', 'SCADA Security', 'Email Forensics'],
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
]

const palette = {
  teal:   { icon: 'bg-teal-400/15 text-teal-400',    pill: 'bg-teal-400/10 text-teal-300 border-teal-400/25'   },
  purple: { icon: 'bg-purple-400/15 text-purple-400', pill: 'bg-purple-400/10 text-purple-300 border-purple-400/25' },
  blue:   { icon: 'bg-blue-400/15 text-blue-400',    pill: 'bg-blue-400/10 text-blue-300 border-blue-400/25'   },
  cyan:   { icon: 'bg-cyan-400/15 text-cyan-400',    pill: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/25'   },
  orange: { icon: 'bg-orange-400/15 text-orange-400', pill: 'bg-orange-400/10 text-orange-300 border-orange-400/25' },
  red:    { icon: 'bg-red-400/15 text-red-400',      pill: 'bg-red-400/10 text-red-300 border-red-400/25'     },
}

function SkillCard({ group, delay }) {
  const [ref, inView] = useInView()
  const p = palette[group.color]
  return (
    <div ref={ref} className={`fade-up ${inView ? 'in-view' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="h-full bg-[#0b2d45]/40 border border-white/5 rounded-2xl p-6 hover:border-teal-400/30 hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-10 h-10 rounded-xl ${p.icon} flex items-center justify-center flex-shrink-0`}>{group.icon}</div>
          <h3 className="font-bold text-white text-sm">{group.title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {group.skills.map(s => (
            <span key={s} className={`text-xs px-3 py-1.5 rounded-full border font-medium hover:scale-105 transition-transform duration-200 cursor-default ${p.pill}`}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const [hdrRef, hdrInView] = useInView()
  const [radarRef, radarInView] = useInView()

  return (
    <section id="skills" className="py-28" style={{ background: 'linear-gradient(180deg,#0b1a2e 0%,#081424 100%)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div ref={hdrRef} className={`text-center mb-16 fade-up ${hdrInView ? 'in-view' : ''}`}>
          <p className="text-teal-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">My Toolkit</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">Skills</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Radar chart + skill cards side by side */}
        <div className="grid lg:grid-cols-3 gap-10 items-center mb-14">
          <div ref={radarRef} className={`fade-up ${radarInView ? 'in-view' : ''} lg:col-span-1`}>
            <div className="bg-[#0b2d45]/40 border border-white/5 rounded-2xl p-6">
              <p className="text-center text-gray-500 text-xs uppercase tracking-widest mb-4">Skill Radar</p>
              <RadarChart animate={radarInView} />
            </div>
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {groups.slice(0, 4).map((g, i) => <SkillCard key={g.title} group={g} delay={i * 60} />)}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {groups.slice(4).map((g, i) => <SkillCard key={g.title} group={g} delay={i * 60} />)}
        </div>
      </div>
    </section>
  )
}
