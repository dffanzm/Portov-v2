import React from 'react'
import ProfileHeader from '../ProfileHeader/ProfileHeader'
import RoleTypewriter from '../RoleTypewriter/RoleTypewriter'
import YearText from '../YearText/YearText'
import styles from './PageLayout.module.css'
import defaultAboutImg from '../../../assets/about.jpeg'

export default function PageLayout({ children, rightContent, logoContent }) {
  const defaultRightContent = (
    <div className={styles.aboutImageWrapper}>
      <img 
        src={defaultAboutImg} 
        alt="Desk with lamp" 
        className={styles.aboutImage}
        draggable="false" 
        loading="lazy"
        decoding="async"
      />
    </div>
  );

  return (
    <section className={styles.pageSection}>
      <div className={styles.container}>
        
        {/* LEFT COLUMN */}
        <div className={styles.leftColumn}>
          <ProfileHeader />
          <div className={styles.bottomLeft}>
            <div className={styles.logo}>
              {logoContent || (
                <>
                  <span className={styles.logoFirstChar}>C</span>
                  <span className={styles.logoSuffix}>ontents</span>
                </>
              )}
            </div>
            <RoleTypewriter />
          </div>
        </div>

        {/* MIDDLE COLUMN */}
        <div className={styles.middleColumn}>
          {children}
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.rightColumn}>
          {rightContent || defaultRightContent}
          <YearText />
        </div>

      </div>
    </section>
  )
}
