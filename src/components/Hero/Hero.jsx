import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from 'framer-motion'
import styles from './Hero.module.css'
import profilePhoto from '../../assets/hero.png'
import project1 from '../../assets/1 (1).webp'
import project2 from '../../assets/2 (1).webp'

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1 });

  const scrollToContents = (e) => {
    e.preventDefault();
    const contents = document.getElementById('contents');
    if (contents) {
      contents.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero} id="hero" ref={ref}>
      {/* Ambient vignette overlay */}
      <div className={styles.vignette} aria-hidden="true" />

      {/* Red ambient glow behind photo */}
      <div className={styles.glow} aria-hidden="true" />

      <React.Fragment key={isInView ? 'visible' : 'hidden'}>

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
          <a href="#contents" onClick={scrollToContents} className={styles.navLink}>CONTENTS</a>
          <Link to="/project" className={styles.navLink}>PROJECT</Link>
          <Link to="/experience" className={styles.navLink}>EXPERIENCE</Link>
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
                loading="lazy"
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
                loading="lazy"
                decoding="async"
              />
            </div>
          </a>
        </div>

        {/* Scroll trigger */}
        <a href="#contents" onClick={scrollToContents} className={styles.scrollTrigger} aria-label="Scroll to Contents section">
          <span className={styles.scrollTriggerText}>SCROLL</span>
          <span className={styles.scrollArrow}></span>
        </a>
      </div>
      </React.Fragment>
    </section>
  )
}
