import React from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import styles from './AboutMe.module.css'
import ProfileHeader from '../Shared/ProfileHeader/ProfileHeader'
import RoleTypewriter from '../Shared/RoleTypewriter/RoleTypewriter'
import YearText from '../Shared/YearText/YearText'

export default function AboutMe() {
  const [searchParams, setSearchParams] = useSearchParams()
  const lang = searchParams.get('lang') === 'id' ? 'id' : 'en'

  const content = {
    en: {
      title1: { first: 'A', rest: 'bout' },
      title2: { first: 'M', rest: 'e' },
      desc1: "I'm a software developer who loves crafting practical and functional digital solutions. With a focus on system logic and a passion for problem-solving, I ensure every project I have built connects seamlessly with its users.",
      desc2: "The solutions I have built blend technical logic with practical structure, balancing performance and clarity to deliver applications that solve real problems. Passionate about teamwork and continuous learning, I approach every project as an opportunity to build something genuinely useful",
      timeline1: "Turning ideas into functional code",
      timeline2: "Based in Indonesia",
      timeline3: "Open to freelance & collaborations",
      button: "Discuss a Project"
    },
    id: {
      title1: { first: 'T', rest: 'entang' },
      title2: { first: 'S', rest: 'aya' },
      desc1: "Saya adalah seorang software developer yang gemar meracik solusi digital fungsional dan praktis. Berfokus pada logika sistem dan pemecahan masalah, saya memastikan setiap proyek yang saya rancang mampu memberikan pengalaman yang mulus bagi penggunanya.",
      desc2: "Solusi yang saya bangun memadukan logika teknis dengan struktur praktis, menyeimbangkan performa dan kejelasan untuk menghasilkan aplikasi yang mampu memecahkan masalah nyata. Berbekal semangat dalam kerja sama tim dan keinginan untuk terus belajar, saya memandang setiap proyek sebagai kesempatan untuk membangun sesuatu yang benar-benar bermanfaat.",
      timeline1: "Mengubah ide menjadi kode fungsional",
      timeline2: "Berbasis di Indonesia",
      timeline3: "Terbuka untuk freelance & kolaborasi",
      button: "Diskusikan Proyek"
    }
  }

  const t = content[lang]

  return (
    <section className={styles.aboutMeSection}>
      {/* Language Toggle Button */}
      <div className={styles.langToggleContainer}>
        <button 
          className={`${styles.langBtn} ${lang === 'en' ? styles.activeLang : ''}`}
          onClick={() => setSearchParams({ lang: 'en' })}
        >
          EN
        </button>
        <span className={styles.langDivider}>/</span>
        <button 
          className={`${styles.langBtn} ${lang === 'id' ? styles.activeLang : ''}`}
          onClick={() => setSearchParams({ lang: 'id' })}
        >
          ID
        </button>
      </div>

      <div className={styles.container}>
        
        {/* LEFT COLUMN */}
        <m.div 
          className={styles.leftColumn}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProfileHeader />
          <div className={styles.bottomLeft}>
            <div className={styles.aboutTitleWrapper}>
              <AnimatePresence mode="wait">
                <m.div
                  key={lang}
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4 }}
                >
                  <div className={styles.aboutTitle}>
                    <span className={styles.word}>
                      <span className={styles.alexBrush}>{t.title1.first}</span>
                      <span className={styles.timesNewRoman} style={{ marginLeft: '0.15em' }}>{t.title1.rest}</span>
                    </span>
                    <span className={styles.word}>
                      <span className={styles.alexBrush}>{t.title2.first}</span>
                      <span className={styles.timesNewRoman}>{t.title2.rest}</span>
                    </span>
                  </div>
                  <p className={styles.description}>
                    {t.desc1}
                  </p>
                </m.div>
              </AnimatePresence>
            </div>
            <RoleTypewriter />
          </div>
        </m.div>

        {/* MIDDLE COLUMN (EMPTY) */}
        <div className={styles.middleColumn}></div>

        {/* RIGHT COLUMN */}
        <m.div 
          className={styles.rightColumn}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        >
          <div className={styles.rightContentTop}>
            <div className={styles.descriptionBlock}>
              <AnimatePresence mode="wait">
                <m.div
                  key={lang}
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4 }}
                  style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <p className={styles.descriptionText}>
                    {t.desc2}
                  </p>
                  
                  <div className={styles.timelineList}>
                    <div className={styles.timelineItem}>
                      <div className={styles.iconContainer}>
                        <div className={styles.iconBox}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                          </svg>
                        </div>
                        <div className={styles.timelineLine}></div>
                      </div>
                      <div className={styles.timelineText}>{t.timeline1}</div>
                    </div>

                    <div className={styles.timelineItem}>
                      <div className={styles.iconContainer}>
                        <div className={styles.iconBox}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                        </div>
                        <div className={styles.timelineLine}></div>
                      </div>
                      <div className={styles.timelineText}>{t.timeline2}</div>
                    </div>

                    <div className={styles.timelineItem}>
                      <div className={styles.iconContainer}>
                        <div className={styles.iconBox}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                          </svg>
                        </div>
                      </div>
                      <div className={styles.timelineText}>{t.timeline3}</div>
                    </div>
                  </div>

                  <div className={styles.buttonWrapper}>
                    <button className={styles.discussBtn}>
                      <span>{t.button}</span>
                      <svg 
                        width="18" height="18" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className={styles.btnIcon}
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </m.div>
              </AnimatePresence>
            </div>
          </div>
          <YearText />
        </m.div>

      </div>
    </section>
  )
}
