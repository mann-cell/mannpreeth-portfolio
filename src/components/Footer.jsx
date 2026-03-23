const links = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact']

export default function Footer() {
  return (
    <footer style={{ background: '#050e1a' }} className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <a href="#home" className="text-white font-bold text-lg tracking-tight">
              <span className="text-teal-400">M</span>annpreeth
              <span className="text-teal-400">.</span>
            </a>
            <p className="text-gray-600 text-xs mt-1">MSc Cybersecurity & AI · University of Sheffield</p>
          </div>

          {/* Nav */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map(l => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-gray-500 hover:text-teal-400 text-xs font-medium tracking-wide transition-colors duration-200"
              >
                {l}
              </a>
            ))}
          </div>

          {/* Email */}
          <a
            href="mailto:mannpreethuk@gmail.com"
            className="text-gray-500 hover:text-teal-400 text-xs transition-colors duration-200"
          >
            mannpreethuk@gmail.com
          </a>
        </div>

        <div className="border-t border-white/5 mt-8 pt-6 text-center">
          <p className="text-gray-700 text-xs">
            &copy; {new Date().getFullYear()} Mannpreeth Mohankumar Krishnachari. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
