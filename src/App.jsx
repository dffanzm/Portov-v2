import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import Hero from './components/Hero/Hero'
import PageTransition from './components/Shared/PageTransition/PageTransition'

const Contents = lazy(() => import('./components/Contents/Contents'))
const AboutMePage = lazy(() => import('./components/AboutMe/AboutMe'))

const ExperiencePage = lazy(() => import('./components/Experience/Experience'))
const ProjectPage = lazy(() => import('./components/Project/Project'))
const ToolsPage = lazy(() => import('./components/Tools/Tools'))
const CertificationsPage = lazy(() => import('./components/Certifications/Certifications'))

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Home() {
  return (
    <main>
      <Hero />
      <Suspense fallback={<div style={{ height: '100vh', background: '#180d0c' }} />}>
        <Contents />
      </Suspense>
    </main>
  )
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition animateY={false}><Home /></PageTransition>} />
        <Route path="/about-me" element={<PageTransition><AboutMePage /></PageTransition>} />
        <Route path="/experience" element={<PageTransition><ExperiencePage /></PageTransition>} />
        <Route path="/project" element={<PageTransition><ProjectPage /></PageTransition>} />
        <Route path="/tools" element={<PageTransition><ToolsPage /></PageTransition>} />
        <Route path="/certifications" element={<PageTransition><CertificationsPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Suspense fallback={<div style={{ height: '100vh', background: '#000' }} />}>
      <ScrollToTop />
      <LazyMotion features={domAnimation}>
        <AnimatedRoutes />
      </LazyMotion>
    </Suspense>
  )
}

export default App
