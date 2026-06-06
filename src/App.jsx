import React, { lazy, Suspense, useEffect, useLayoutEffect, useState, createContext, useContext } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

export const TransitionContext = createContext();
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import Hero from './components/Hero/Hero'
import PageTransition from './components/Shared/PageTransition/PageTransition'

const Contents = lazy(() => import('./components/Contents/Contents'))
const AboutMePage = lazy(() => import('./components/AboutMe/AboutMe'))

const ExperiencePage = lazy(() => import('./components/Experience/Experience'))
const ProjectPage = lazy(() => import('./components/Project/Project'))
const CertificationsFinal = lazy(() => import('./components/Certifications/CertificationsFinal'))
const LeaveTracePage = lazy(() => import('./components/LeaveTrace/LeaveTrace'))

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
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
  const { exitState } = useContext(TransitionContext);
  
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition direction={exitState.direction}><Home /></PageTransition>} />
        <Route path="/about-me" element={<PageTransition direction={exitState.direction}><AboutMePage /></PageTransition>} />
        <Route path="/experience" element={<PageTransition direction={exitState.direction}><ExperiencePage /></PageTransition>} />
        <Route path="/project" element={<PageTransition direction={exitState.direction}><ProjectPage /></PageTransition>} />
        <Route path="/certifications" element={<PageTransition direction={exitState.direction}><CertificationsFinal /></PageTransition>} />
        <Route path="/trace" element={<PageTransition direction={exitState.direction}><LeaveTracePage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

import { HelmetProvider } from 'react-helmet-async';

function App() {
  const [exitState, setExitState] = useState({ direction: 'none' });

  return (
    <HelmetProvider>
      <TransitionContext.Provider value={{ exitState, setExitState }}>
        <Suspense fallback={<div style={{ height: '100vh', background: '#000' }} />}>
          <ScrollToTop />
          <LazyMotion features={domAnimation}>
            <AnimatedRoutes />
          </LazyMotion>
        </Suspense>
      </TransitionContext.Provider>
    </HelmetProvider>
  )
}

export default App
