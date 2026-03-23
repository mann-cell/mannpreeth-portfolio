import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { useInView } from '../hooks/useInView'

// ── EmailJS config ── fill these in after creating your account at emailjs.com
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

const contactItems = [
  {
    label: 'Email',
    value: 'mannpreethuk@gmail.com',
    href:  'mailto:mannpreethuk@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '07387 528 252',
    href:  'tel:07387528252',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/mannpreeth-mk-19a197135',
    href:  'https://www.linkedin.com/in/mannpreeth-mk-19a197135/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'Sheffield, UK',
    href:  null,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export default function Contact() {
  const formRef = useRef()
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [hdrRef, hdrInView] = useInView()
  const [lRef,   lInView]   = useInView()
  const [rRef,   rInView]   = useInView()

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-28" style={{ background: '#081424' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div ref={hdrRef} className={`text-center mb-16 fade-up ${hdrInView ? 'in-view' : ''}`}>
          <p className="text-teal-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Get In Touch</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">Contact</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div ref={lRef} className={`fade-up ${lInView ? 'in-view' : ''}`} style={{ transitionDelay: '100ms' }}>
            <h3 className="text-2xl font-bold text-white mb-4">
              Let's build something
              <span className="text-transparent bg-clip-text ml-2" style={{ backgroundImage: 'linear-gradient(90deg,#14b8a6,#67e8f9)' }}>
                great together
              </span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              I'm open to research collaborations, full-time roles, internships, and interesting
              projects. Whether you're a recruiter, researcher, or fellow developer — I'd love to hear from you.
            </p>

            <div className="space-y-3">
              {contactItems.map(item => {
                const el = (
                  <div className="flex items-center gap-4 p-4 bg-[#0b2d45]/50 border border-white/5 rounded-2xl hover:border-teal-400/40 hover:bg-[#0b2d45]/80 transition-all duration-300 group">
                    <div className="w-11 h-11 rounded-xl bg-teal-400/15 text-teal-400 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-400/25 transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-500 text-xs uppercase tracking-widest font-medium">{item.label}</p>
                      <p className="text-white font-medium text-sm mt-0.5 truncate">{item.value}</p>
                    </div>
                    {item.href && (
                      <svg className="w-4 h-4 text-teal-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                )
                return item.href ? (
                  <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    {el}
                  </a>
                ) : (
                  <div key={item.label}>{el}</div>
                )
              })}
            </div>
          </div>

          {/* Right — form */}
          <div ref={rRef} className={`fade-up ${rInView ? 'in-view' : ''}`} style={{ transitionDelay: '200ms' }}>
            <div className="bg-[#0b2d45]/50 border border-white/5 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-white mb-6">Send a Message</h3>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <div className="w-16 h-16 rounded-full bg-teal-400/15 flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-white font-semibold text-lg">Message Sent!</p>
                  <p className="text-gray-400 text-sm text-center">Thanks for reaching out. I'll get back to you soon.</p>
                  <button onClick={() => setStatus('idle')} className="text-teal-400 text-sm hover:underline mt-2">
                    Send another
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-500 text-xs uppercase tracking-widest mb-1.5">Name</label>
                      <input name="from_name" type="text" required placeholder="Your name"
                        className="w-full bg-[#081424] border border-white/8 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-teal-400/60 transition-colors duration-200" />
                    </div>
                    <div>
                      <label className="block text-gray-500 text-xs uppercase tracking-widest mb-1.5">Email</label>
                      <input name="reply_to" type="email" required placeholder="your@email.com"
                        className="w-full bg-[#081424] border border-white/8 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-teal-400/60 transition-colors duration-200" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-500 text-xs uppercase tracking-widest mb-1.5">Subject</label>
                    <input name="subject" type="text" required placeholder="What's this about?"
                      className="w-full bg-[#081424] border border-white/8 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-teal-400/60 transition-colors duration-200" />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-xs uppercase tracking-widest mb-1.5">Message</label>
                    <textarea name="message" rows={5} required placeholder="Your message..."
                      className="w-full bg-[#081424] border border-white/8 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-teal-400/60 transition-colors duration-200 resize-none" />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-400 text-xs">Something went wrong. Please email me directly at mannpreethuk@gmail.com</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide hover:opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-teal-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
