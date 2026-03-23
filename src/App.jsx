import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import About         from './components/About'
import Experience    from './components/Experience'
import Projects      from './components/Projects'
import Skills        from './components/Skills'
import Contact       from './components/Contact'
import Footer        from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import SocialSidebar from './components/SocialSidebar'
import PageLoader    from './components/PageLoader'
import Cursor        from './components/Cursor'

export default function App() {
  return (
    <>
      <PageLoader />
      <Cursor />
      <ScrollProgress />
      <SocialSidebar />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
