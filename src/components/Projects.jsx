import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const projects = [
  {
    title: 'Crowd Density Estimation System', subtitle: 'B.Tech Capstone Project',
    description: 'Real-time crowd monitoring using YOLO object detection. Interactive React.js dashboard visualises live density analytics with smart recommendations.',
    tags: ['Flask', 'YOLO', 'TensorFlow', 'PyTorch', 'React.js', 'AWS', 'Docker'],
    category: 'AI / ML', categoryColor: 'purple', github: 'https://github.com/mann-cell', live: null,
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  },
  {
    title: 'Uber Clone Web App', subtitle: 'Full-Stack Development',
    description: 'Scalable ride-hailing platform with real-time location tracking via Google Maps API, user authentication, and complete booking flows.',
    tags: ['React.js', 'Node.js', 'Google Maps API', 'Docker', 'GitHub'],
    category: 'Full Stack', categoryColor: 'blue', github: 'https://github.com/mann-cell', live: null,
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>,
  },
  {
    title: 'Email Forensics Tool', subtitle: 'Cybersecurity Research',
    description: 'Python tool for forensic email analysis — traces origins, detects phishing using NLP-based metadata analysis and cybersecurity heuristics.',
    tags: ['Python', 'NLP', 'Metadata Analysis', 'Phishing Detection'],
    category: 'Cybersecurity', categoryColor: 'red', github: 'https://github.com/mann-cell', live: null,
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  },
  {
    title: 'Web App Security Assessment', subtitle: 'Penetration Testing',
    description: 'Comprehensive pentest covering OWASP Top 10 vulnerabilities using automated scanning and manual exploitation with detailed remediation reports.',
    tags: ['OWASP ZAP', 'Burp Suite', 'Python', 'Penetration Testing'],
    category: 'Cybersecurity', categoryColor: 'red', github: 'https://github.com/mann-cell', live: null,
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  },
]

const catColors = {
  purple: { bg: 'bg-purple-500/15', text: 'text-purple-300', border: 'border-purple-400/30', icon: 'bg-purple-400/15 text-purple-300', glow: 'rgba(168,85,247,0.15)' },
  blue:   { bg: 'bg-blue-500/15',   text: 'text-blue-300',   border: 'border-blue-400/30',   icon: 'bg-blue-400/15 text-blue-300',   glow: 'rgba(59,130,246,0.15)'  },
  red:    { bg: 'bg-red-500/15',    text: 'text-red-300',    border: 'border-red-400/30',    icon: 'bg-red-400/15 text-red-300',    glow: 'rgba(239,68,68,0.15)'   },
}

function TiltCard({ project, delay }) {
  const [ref, inView] = useInView()
  const [transform, setTransform] = useState('')
  const [glow,      setGlow]      = useState({ x: 50, y: 50 })
  const c = catColors[project.categoryColor]

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top)  / rect.height
    setTransform(`perspective(900px) rotateX(${(y - 0.5) * -14}deg) rotateY(${(x - 0.5) * 14}deg) scale3d(1.03,1.03,1.03)`)
    setGlow({ x: x * 100, y: y * 100 })
  }
  const onLeave = () => { setTransform(''); setGlow({ x: 50, y: 50 }) }

  return (
    <div ref={ref} className={`fade-up ${inView ? 'in-view' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <div
        className="h-full relative rounded-2xl p-6 flex flex-col cursor-default overflow-hidden"
        style={{
          background: 'rgba(11,45,69,0.4)',
          border: '1px solid rgba(255,255,255,0.05)',
          transform, transition: transform ? 'transform 0.08s ease' : 'transform 0.5s cubic-bezier(0.23,1,0.32,1)',
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {/* Mouse-follow glow */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{ background: `radial-gradient(250px at ${glow.x}% ${glow.y}%, ${c.glow}, transparent 70%)`, opacity: transform ? 1 : 0 }} />

        <div className="flex items-start justify-between mb-5 relative z-10">
          <div className={`w-14 h-14 rounded-xl ${c.icon} flex items-center justify-center`} style={{ transform: 'translateZ(20px)' }}>
            {project.icon}
          </div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${c.bg} ${c.text} ${c.border}`}>{project.category}</span>
        </div>

        <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mb-1 relative z-10">{project.subtitle}</p>
        <h3 className="text-white font-bold text-lg mb-3 leading-snug relative z-10" style={{ transform: 'translateZ(10px)' }}>{project.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5 relative z-10">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-5 relative z-10">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs bg-white/5 border border-white/10 text-gray-300 px-2.5 py-1 rounded-full font-medium">{tag}</span>
          ))}
        </div>

        <div className="flex items-center gap-3 border-t border-white/5 pt-4 relative z-10">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-gray-400 hover:text-teal-400 text-xs font-medium transition-colors duration-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [hdrRef, hdrInView] = useInView()
  return (
    <section id="projects" className="py-28" style={{ background: '#081424' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div ref={hdrRef} className={`text-center mb-16 fade-up ${hdrInView ? 'in-view' : ''}`}>
          <p className="text-teal-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">What I've Built</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">Projects</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto mt-4 rounded-full" />
        </div>
        <div className="grid sm:grid-cols-2 gap-6" style={{ perspective: '1000px' }}>
          {projects.map((p, i) => <TiltCard key={p.title} project={p} delay={i * 80} />)}
        </div>
      </div>
    </section>
  )
}
