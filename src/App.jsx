import { lazy, Suspense } from 'react'
import Hero from './components/Hero/Hero'

const About = lazy(() => import('./components/About/About'))
import './App.css'

function App() {
  return (
    <main>
      <Hero />
      <Suspense fallback={<div style={{ height: '100vh', background: '#180d0c' }} />}>
        <About />
      </Suspense>
    </main>
  )
}

export default App
