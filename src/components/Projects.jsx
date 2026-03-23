import { useInView } from '../hooks/useInView'

const projects = [
  {
    title: 'Crowd Density Estimation System',
    subtitle: 'B.Tech Capstone Project',
    description:
      'Real-time crowd monitoring system using YOLO object detection. Interactive React.js dashboard visualises live density analytics with smart recommendations.',
    tags: ['Flask', 'YOLO', 'TensorFlow', 'PyTorch', 'React.js', 'AWS', 'Docker'],
    category: 'AI / ML',
    categoryColor: 'purple',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Uber Clone Web App',
    subtitle: 'Full-Stack Development',
    description:
      'Scalable ride-hailing platform with real-time location tracking via Google Maps API, user authentication, and complete booking flows.',
    tags: ['React.js', 'Node.js', 'Google Maps API', 'Docker', 'GitHub'],
    category: 'Full Stack',
    categoryColor: 'blue',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    title: 'Email Forensics Tool',
    subtitle: 'Cybersecurity Research',
    description:
      'Python tool for forensic email analysis — traces origins, detects phishing using NLP-based metadata analysis and cybersecurity heuristics.',
    tags: ['Python', 'NLP', 'Metadata Analysis', 'Phishing Detection'],
    category: 'Cybersecurity',
    categoryColor: 'red',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Web App Security Assessment',
    subtitle: 'Penetration Testing',
    description:
      'Comprehensive pentest covering OWASP Top 10 vulnerabilities using automated scanning and manual exploitation with detailed remediation reports.',
    tags: ['OWASP ZAP', 'Burp Suite', 'Python', 'Penetration Testing'],
    category: 'Cybersecurity',
    categoryColor: 'red',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
]

const catColors = {
  purple: {
    bg:     'bg-purple-500/15',
    text:   'text-purple-300',
    border: 'border-purple-400/30',
    icon:   'bg-purple-400/15 text-purple-300',
  },
  blue: {
    bg:     'bg-blue-500/15',
    text:   'text-blue-300',
    border: 'border-blue-400/30',
    icon:   'bg-blue-400/15 text-blue-300',
  },
  red: {
    bg:     'bg-red-500/15',
    text:   'text-red-300',
    border: 'border-red-400/30',
    icon:   'bg-red-400/15 text-red-300',
  },
}

function ProjectCard({ project, delay }) {
  const [ref, inView] = useInView()
  const c = catColors[project.categoryColor]

  return (
    <div
      ref={ref}
      className={`fade-up ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="h-full bg-[#0b2d45]/40 border border-white/5 rounded-2xl p-6 flex flex-col hover:border-teal-400/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-900/30 transition-all duration-400 group">
        {/* Top row */}
        <div className="flex items-start justify-between mb-5">
          <div className={`w-14 h-14 rounded-xl ${c.icon} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            {project.icon}
          </div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${c.bg} ${c.text} ${c.border}`}>
            {project.category}
          </span>
        </div>

        {/* Text */}
        <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mb-1">{project.subtitle}</p>
        <h3 className="text-white font-bold text-lg mb-3 group-hover:text-teal-300 transition-colors duration-300 leading-snug">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-xs bg-white/5 border border-white/10 text-gray-300 px-2.5 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
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
        {/* Header */}
        <div ref={hdrRef} className={`text-center mb-16 fade-up ${hdrInView ? 'in-view' : ''}`}>
          <p className="text-teal-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">What I've Built</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">Projects</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}
