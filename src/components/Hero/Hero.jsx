import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useInView } from 'framer-motion'
import styles from './Hero.module.css'
import profilePhoto from '../../assets/hero.png'
import project1 from '../../assets/1 (1).webp'
import project2 from '../../assets/2 (1).webp'
import SEO from '../Shared/SEO/SEO'
import { TransitionContext } from '../../App'

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1 });
  const navigate = useNavigate();
  const { setExitState } = useContext(TransitionContext);
  
  const [navLoaded, setNavLoaded] = useState(false);
  const [img1Loaded, setImg1Loaded] = useState(false);
  const [img2Loaded, setImg2Loaded] = useState(false);

  useEffect(() => {
    // Simulate loading for the text links so they have a skeleton effect
    const timer = setTimeout(() => setNavLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContents = (e) => {
    e.preventDefault();
    const contents = document.getElementById('contents');
    if (contents) {
      contents.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero} id="hero" ref={ref}>
      <SEO 
        title="Daffa Najmudin Hanif — Portfolio" 
        description="Creative full-stack developer and UI/UX designer. Explore my portfolio, projects, and professional journey."
      />
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
        <span className={styles.bgPortfolio}>PORTOFOLIO</span>
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
          <a href="#contents" onClick={scrollToContents} className={`${styles.navLink} ${!navLoaded ? styles.skeleton : ''}`}>CONTENTS</a>
          <Link to="/project" className={`${styles.navLink} ${!navLoaded ? styles.skeleton : ''}`}>PROJECT</Link>
          <Link to="/experience" className={`${styles.navLink} ${!navLoaded ? styles.skeleton : ''}`}>EXPERIENCE</Link>
        </nav>

        {/* Right column: Top Projects Placeholder (Images Only) */}
        <div className={styles.heroProjectsCol}>
          <a href="#" className={styles.heroProjectCard} aria-label="Project 1">
            <div className={styles.heroProjectImage}>
              {!img1Loaded && <div className={styles.skeletonImg} />}
              <img 
                src={project1}
                alt="Project 1"
                className={styles.projectImg}
                draggable="false"
                loading="lazy"
                decoding="async"
                onLoad={() => setImg1Loaded(true)}
                style={{ opacity: img1Loaded ? 1 : 0 }}
              />
            </div>
          </a>

          <a href="#" className={styles.heroProjectCard} aria-label="Project 2">
            <div className={styles.heroProjectImage}>
              {!img2Loaded && <div className={styles.skeletonImg} />}
              <img 
                src={project2}
                alt="Project 2"
                className={styles.projectImg}
                draggable="false"
                loading="lazy"
                decoding="async"
                onLoad={() => setImg2Loaded(true)}
                style={{ opacity: img2Loaded ? 1 : 0 }}
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
