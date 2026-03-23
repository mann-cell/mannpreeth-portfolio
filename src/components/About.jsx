import { useInView } from '../hooks/useInView'

const education = [
  {
    degree: 'MSc Cybersecurity & Artificial Intelligence',
    school: 'University of Sheffield',
    period: '2025 – 2026',
    flag: '🇬🇧',
  },
  {
    degree: 'B.Tech Computer Science Engineering',
    school: 'PES University',
    period: '2023 – 2025',
    flag: '🇮🇳',
  },
  {
    degree: 'Diploma in Mechatronics',
    school: 'Shree Jayachamarajendra Polytechnic',
    period: '2017 – 2022',
    flag: '🇮🇳',
  },
]

const certs = [
  'ISC2 – Access Control Concepts',
  'ISC2 – Incident Response',
  'ISC2 – Security Principles',
]

function SectionHeader({ sub, title }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`text-center mb-16 fade-up ${inView ? 'in-view' : ''}`}>
      <p className="text-teal-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">{sub}</p>
      <h2 className="text-4xl sm:text-5xl font-extrabold text-white">{title}</h2>
      <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto mt-4 rounded-full" />
    </div>
  )
}

export default function About() {
  const [bioRef, bioInView]   = useInView()
  const [eduRef, eduInView]   = useInView()

  return (
    <section id="about" className="py-28" style={{ background: '#081424' }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader sub="Who I Am" title="About Me" />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left – Bio */}
          <div
            ref={bioRef}
            className={`fade-up ${bioInView ? 'in-view' : ''}`}
            style={{ transitionDelay: '100ms' }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Building at the intersection of
              <span className="text-transparent bg-clip-text ml-2"
                style={{ backgroundImage: 'linear-gradient(90deg,#14b8a6,#67e8f9)' }}>
                security &amp; intelligence
              </span>
            </h3>

            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                I'm an MSc Cybersecurity &amp; AI student at the University of Sheffield,
                with a multidisciplinary background spanning software engineering, machine
                learning, and industrial embedded systems.
              </p>
              <p>
                My current research at Sheffield focuses on <strong className="text-teal-300">
                DRAM-based Physical Unclonable Functions (PUFs)</strong> within the RISE:
                Hardware Roots-of-Trust initiative, collaborating with WIZnet and
                Siemens Germany GmbH.
              </p>
              <p>
                From building RAG-powered chatbots and full-stack web platforms to
                programming fault-tolerant PLC architectures at Siemens, I thrive at
                the boundary between hardware and high-level software.
              </p>
            </div>

            {/* Hobbies */}
            <div className="mt-8 flex flex-wrap gap-2">
              {['Badminton', 'Cricket', 'Gym', 'Video Games'].map(h => (
                <span
                  key={h}
                  className="text-xs bg-teal-400/10 border border-teal-400/20 text-teal-300 px-3 py-1.5 rounded-full font-medium"
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
                Certifications
              </h4>
              <ul className="space-y-3">
                {certs.map(c => (
                  <li key={c} className="flex items-center gap-3 text-gray-400 text-sm">
                    <span className="w-5 h-5 rounded-full bg-teal-400/20 border border-teal-400/40 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {c}
                    <span className="text-gray-600 text-xs">(Aug 2025)</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right – Education */}
          <div
            ref={eduRef}
            className={`fade-up ${eduInView ? 'in-view' : ''}`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-6">
              Education
            </h3>
            <div className="relative space-y-6">
              {/* Vertical line */}
              <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-teal-400/60 via-teal-400/20 to-transparent" />

              {education.map((edu, i) => (
                <div key={i} className="relative flex gap-6 group">
                  {/* Dot */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0b2d45] border-2 border-teal-400/50 flex items-center justify-center text-base z-10 group-hover:border-teal-400 transition-colors duration-300">
                    {edu.flag}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-[#0b2d45]/60 border border-white/5 rounded-2xl px-5 py-4 group-hover:border-teal-400/30 transition-all duration-300">
                    <p className="text-gray-500 text-xs font-medium mb-1">{edu.period}</p>
                    <h4 className="text-white font-semibold text-sm leading-snug mb-1">
                      {edu.degree}
                    </h4>
                    <p className="text-teal-300 text-xs">{edu.school}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
