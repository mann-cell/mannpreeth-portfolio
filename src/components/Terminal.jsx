import { useState, useEffect, useRef, useCallback } from 'react'

const PROMPT = 'mannpreeth@portfolio:~$'

const BANNER = `
 ███╗   ███╗██╗  ██╗    ██████╗  ██████╗ ██████╗ ████████╗
 ████╗ ████║██║ ██╔╝    ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝
 ██╔████╔██║█████╔╝     ██████╔╝██║   ██║██████╔╝   ██║
 ██║╚██╔╝██║██╔═██╗     ██╔═══╝ ██║   ██║██╔══██╗   ██║
 ██║ ╚═╝ ██║██║  ██╗    ██║     ╚██████╔╝██║  ██║   ██║
 ╚═╝     ╚═╝╚═╝  ╚═╝    ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝
`

const COMMANDS = {
  help: () => [
    { t: 'sys', v: '╔══════════════════════════════════════╗' },
    { t: 'sys', v: '║         Available Commands           ║' },
    { t: 'sys', v: '╠══════════════════════════════════════╣' },
    { t: 'out', v: '  whoami          → About me'            },
    { t: 'out', v: '  ls              → List sections'       },
    { t: 'out', v: '  ls projects     → My projects'         },
    { t: 'out', v: '  cat skills.txt  → All skills'          },
    { t: 'out', v: '  cat resume.txt  → Education & exp'     },
    { t: 'out', v: '  contact         → Get in touch'        },
    { t: 'out', v: '  clear           → Clear terminal'      },
    { t: 'out', v: '  exit            → Close terminal'      },
    { t: 'sys', v: '╚══════════════════════════════════════╝' },
  ],
  whoami: () => [
    { t: 'sys', v: '┌───────────────────────────────────────────────┐' },
    { t: 'out', v: '  Name:     Mannpreeth Mohankumar Krishnachari'   },
    { t: 'out', v: '  Role:     MSc Cybersecurity & AI Student'       },
    { t: 'out', v: '  Uni:      University of Sheffield, UK'          },
    { t: 'out', v: '  Research: DRAM PUFs, Hardware Security'         },
    { t: 'out', v: '  Email:    mannpreethuk@gmail.com'               },
    { t: 'sys', v: '└───────────────────────────────────────────────┘' },
  ],
  ls: () => [
    { t: 'out', v: 'drwxr-xr-x  home/' },
    { t: 'out', v: 'drwxr-xr-x  about/' },
    { t: 'out', v: 'drwxr-xr-x  experience/' },
    { t: 'out', v: 'drwxr-xr-x  projects/' },
    { t: 'out', v: 'drwxr-xr-x  skills/' },
    { t: 'out', v: 'drwxr-xr-x  contact/' },
  ],
  'ls projects': () => [
    { t: 'out', v: 'drwxr-xr-x  crowd-density-estimation/  [AI/ML]'      },
    { t: 'out', v: 'drwxr-xr-x  uber-clone-webapp/          [Full Stack]'  },
    { t: 'out', v: 'drwxr-xr-x  email-forensics-tool/       [Cybersecurity]' },
    { t: 'out', v: 'drwxr-xr-x  web-app-security-assessment/[Pentest]'    },
  ],
  'cat skills.txt': () => [
    { t: 'sys', v: '── Languages ───────────────────────────────' },
    { t: 'out', v: '   Python  JavaScript  Java  Go  C  MATLAB'   },
    { t: 'sys', v: '── AI / ML ─────────────────────────────────' },
    { t: 'out', v: '   RAG  LLMs  OpenAI  YOLO  TensorFlow  PyTorch' },
    { t: 'sys', v: '── Web Dev ─────────────────────────────────' },
    { t: 'out', v: '   React.js  Next.js  Node.js  REST APIs  Docker' },
    { t: 'sys', v: '── Cybersecurity ───────────────────────────' },
    { t: 'out', v: '   Pen Testing  OWASP ZAP  Burp Suite  PUFs' },
    { t: 'sys', v: '── Embedded ────────────────────────────────' },
    { t: 'out', v: '   FPGA  Raspberry Pi  PLC  SCADA  TIA Portal' },
  ],
  'cat resume.txt': () => [
    { t: 'sys', v: '── EDUCATION ───────────────────────────────────────' },
    { t: 'out', v: '  MSc Cybersecurity & AI  │ Sheffield   │ 2025-2026'  },
    { t: 'out', v: '  BTech Computer Science  │ PES Univ.   │ 2023-2025'  },
    { t: 'out', v: '  Diploma Mechatronics    │ SJP         │ 2017-2022'  },
    { t: 'sys', v: '── EXPERIENCE ──────────────────────────────────────' },
    { t: 'out', v: '  Research Asst (MSc)     │ Sheffield   │ Dec 2025-Now' },
    { t: 'out', v: '  Research Asst           │ Coacharya   │ May-Aug 2025' },
    { t: 'out', v: '  Software Developer      │ Valenta AI  │ Nov24-Mar25'  },
    { t: 'out', v: '  PLC Programmer          │ Siemens     │ Aug21-Mar22'  },
  ],
  contact: () => [
    { t: 'out', v: '  Email:    mannpreethuk@gmail.com'                         },
    { t: 'out', v: '  Phone:    07387 528 252'                                   },
    { t: 'out', v: '  LinkedIn: linkedin.com/in/mannpreeth-mk-19a197135'         },
    { t: 'out', v: '  GitHub:   github.com/mann-cell'                            },
    { t: 'out', v: '  Location: Sheffield, UK'                                   },
  ],
  'sudo rm -rf /':  () => [{ t: 'err', v: 'Permission denied. Nice try though 😄' }],
  'sudo rm -rf *':  () => [{ t: 'err', v: 'Permission denied. Nice try though 😄' }],
  hack:             () => [
    { t: 'sys', v: 'Initialising hack sequence...' },
    { t: 'sys', v: '> Loading exploit framework...' },
    { t: 'sys', v: '> ACCESS GRANTED — just kidding 😄' },
    { t: 'out', v: "  I'm the security researcher. You can't hack me." },
  ],
  ping:             () => [
    { t: 'sys', v: 'PING mannpreeth.dev: 56 data bytes' },
    { t: 'out', v: '64 bytes from mannpreeth.dev: icmp_seq=0 ttl=64 time=1.337 ms' },
    { t: 'out', v: '64 bytes from mannpreeth.dev: icmp_seq=1 ttl=64 time=1.337 ms' },
    { t: 'sys', v: '--- 2 packets: 2 received, 0% packet loss ---' },
  ],
  'ssh mannpreeth': () => [
    { t: 'sys', v: 'Connecting to mannpreeth@sheffield.ac.uk...' },
    { t: 'out', v: 'Connection established!' },
    { t: 'out', v: "But I'm busy researching PUFs right now 🔬" },
  ],
  matrix:  () => [{ t: 'sys', v: 'Follow the white rabbit... 🐇' }],
  date:    () => [{ t: 'out', v: new Date().toString() }],
  uname:   () => [{ t: 'out', v: 'MannpreethOS v1.0.0 #1 SMP Portfolio Edition' }],
  'uptime':() => [{ t: 'out', v: 'up 4 years, grinding code, 0 regrets' }],
  'cat about.txt': () => [
    { t: 'out', v: "  I'm a multidisciplinary engineer at the intersection" },
    { t: 'out', v: '  of cybersecurity, AI, and embedded systems.'          },
    { t: 'out', v: '  Currently researching DRAM-based PUFs at Sheffield.'  },
    { t: 'out', v: ''                                                        },
    { t: 'sys', v: '  Interests: Badminton 🏸 | Cricket 🏏 | Gym 💪 | Gaming 🎮' },
  ],
}

const INIT = [
  { t: 'banner', v: BANNER },
  { t: 'sys', v: "Welcome to Mannpreeth's Portfolio Terminal v1.0.0" },
  { t: 'out', v: 'Type "help" to see available commands. Press Esc or click outside to close.' },
  { t: 'out', v: '' },
]

export default function Terminal({ onClose }) {
  const [lines,   setLines]   = useState(INIT)
  const [input,   setInput]   = useState('')
  const [history, setHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef = useRef()
  const endRef   = useRef()

  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [lines])
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const run = useCallback((cmd) => {
    const raw = cmd.trim()
    const key = raw.toLowerCase()
    const echo = { t: 'inp', v: `${PROMPT} ${cmd}` }

    if (key === '') { setLines(l => [...l, echo]); return }
    if (key === 'clear') { setLines(INIT); return }
    if (key === 'exit' || key === 'quit') { onClose(); return }

    const handler = COMMANDS[key]
    const result  = handler
      ? handler()
      : [{ t: 'err', v: `command not found: ${raw}. Type "help" for available commands.` }]

    setLines(l => [...l, echo, ...result])
    setHistory(h => [raw, ...h.filter(x => x !== raw)])
    setHistIdx(-1)
  }, [onClose])

  const onKeyDown = (e) => {
    if (e.key === 'Enter') { run(input); setInput('') }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); const i = Math.min(histIdx + 1, history.length - 1); setHistIdx(i); setInput(history[i] ?? '') }
    else if (e.key === 'ArrowDown') { e.preventDefault(); const i = Math.max(histIdx - 1, -1);                  setHistIdx(i); setInput(i === -1 ? '' : history[i]) }
    else if (e.key === 'Tab')       { e.preventDefault()
      const matches = Object.keys(COMMANDS).filter(k => k.startsWith(input.toLowerCase()))
      if (matches.length === 1) setInput(matches[0])
    }
  }

  const lineColor = (t) => {
    if (t === 'inp')    return 'text-teal-300'
    if (t === 'err')    return 'text-red-400'
    if (t === 'sys')    return 'text-teal-500'
    if (t === 'banner') return 'text-teal-400'
    return 'text-gray-300'
  }

  return (
    <div
      className="fixed inset-0 z-[500] flex items-end justify-center p-4 sm:p-10"
      style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(6px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-3xl rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: '#0d1117',
          border: '1px solid rgba(20,184,166,0.35)',
          boxShadow: '0 0 60px rgba(20,184,166,0.12)',
          maxHeight: '72vh',
          animation: 'termSlideUp 0.3s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 flex-shrink-0" style={{ background: '#161b22', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center gap-1.5">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-gray-500 text-xs font-mono">mannpreeth@portfolio — bash</span>
          <div className="w-16" />
        </div>

        {/* Output */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs sm:text-sm leading-relaxed" style={{ minHeight: 0 }} onClick={() => inputRef.current?.focus()}>
          {lines.map((line, i) => (
            <pre key={i} className={`${lineColor(line.t)} whitespace-pre-wrap break-words`}>{line.v}</pre>
          ))}
          {/* Input row */}
          <div className="flex items-center gap-2 text-teal-300 mt-1">
            <span className="flex-shrink-0 text-teal-500">{PROMPT}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 bg-transparent outline-none text-teal-200 caret-teal-400 font-mono text-xs sm:text-sm"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <div ref={endRef} />
        </div>
      </div>

      <style>{`
        @keyframes termSlideUp {
          from { transform: translateY(60px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  )
}
