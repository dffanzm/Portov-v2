import styles from './Hero.module.css'
import profilePhoto from '../../assets/hero.png'
import project1 from '../../assets/1 (1).webp'
import project2 from '../../assets/2 (1).webp'

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      {/* Ambient vignette overlay */}
      <div className={styles.vignette} aria-hidden="true" />

      {/* Red ambient glow behind photo */}
      <div className={styles.glow} aria-hidden="true" />

      {/* ── Layer 1: Name text BEHIND photo ── */}
      <div className={styles.nameLayer} aria-hidden="true">
        <span className={styles.bgNameTop}>DAFFA NAJMUDIN HANIF</span>
      </div>

      {/* ── Layer 2: Profile Photo ── */}
      <div className={styles.photoWrapper}>
        <img
          src={profilePhoto}
          alt="Daffa Najmudin Hanif"
          className={styles.photo}
          draggable="false"
          fetchPriority="high"
          decoding="sync"
        />
      </div>

      {/* ── Layer 3: PORTFOLIO text IN FRONT of photo ── */}
      <div className={styles.portfolioLayer} aria-hidden="true">
        <span className={styles.bgPortfolio}>PORTFOLIO</span>
      </div>

      {/* ── Bottom Fade for smooth transition into black ── */}
      <div className={styles.bottomFade} aria-hidden="true" />

      {/* ── Foreground UI elements ── */}
      <div className={styles.ui}>
        {/* Top-left label */}
        <div className={styles.label} aria-label="Role label">
          <span className={styles.labelLine} />
          <span className={styles.labelText}>HOLA, UN GUSTO CONOCERTE!</span>
        </div>

        {/* Top-right navigation */}
        <nav className={styles.nav} aria-label="Main navigation">
          <a href="#about" className={styles.navLink}>ABOUT</a>
          <a href="#project" className={styles.navLink}>PROJECT</a>
        </nav>

        {/* Right column: Top Projects Placeholder (Images Only) */}
        <div className={styles.heroProjectsCol}>
          <a href="#" className={styles.heroProjectCard} aria-label="Project 1">
            <div className={styles.heroProjectImage}>
              <img 
                src={project1}
                alt="Project 1"
                className={styles.projectImg}
                draggable="false"
                fetchPriority="low"
                decoding="async"
              />
            </div>
          </a>

          <a href="#" className={styles.heroProjectCard} aria-label="Project 2">
            <div className={styles.heroProjectImage}>
              <img 
                src={project2}
                alt="Project 2"
                className={styles.projectImg}
                draggable="false"
                fetchPriority="low"
                decoding="async"
              />
            </div>
          </a>
        </div>

        {/* Scroll trigger */}
        <a href="#about" className={styles.scrollTrigger} aria-label="Scroll to About section">
          <span className={styles.scrollTriggerText}>SCROLL</span>
        </a>
      </div>
    </section>
  )
}
