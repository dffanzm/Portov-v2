import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { m } from 'framer-motion'
import styles from './Contents.module.css'
import aboutImg from '../../assets/about.jpeg'

import ProfileHeader from '../Shared/ProfileHeader/ProfileHeader'
import RoleTypewriter from '../Shared/RoleTypewriter/RoleTypewriter'
import YearText from '../Shared/YearText/YearText'

const menuItems = [
  { id: 'about', title: 'ABOUT ME', num: '01', path: '/about-me', desc: 'A little bit about me' },
  { id: 'experience', title: 'EXPERIENCE', num: '02', path: '/experience', desc: "See what I've been building" },
  { id: 'project', title: 'PROJECT', num: '03', path: '/project', desc: 'My recent works and projects' },
  { id: 'tools', title: 'TOOLS I USE', num: '04', path: '/tools', desc: 'The technologies and software I rely on' },
  { id: 'certifications', title: 'CERTIFICATIONS', num: '05', path: '/certifications', desc: 'My professional credentials' },
  { id: 'trace', title: 'LEAVE A TRACE', num: '06', path: '/trace', desc: 'Connect and leave a message' },
];

export default function Contents() {
  const navigate = useNavigate();
  const [hoveredMenu, setHoveredMenu] = useState(null);
  
  const hoveredIndex = menuItems.findIndex(item => item.id === hoveredMenu);
  const activeDesc = hoveredIndex !== -1 ? menuItems[hoveredIndex].desc : '';

  return (
    <section className={styles.contentsSection} id="contents">
      <div className={styles.container}>
        
        {/* LEFT COLUMN */}
        <m.div 
          className={styles.leftColumn}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProfileHeader />
          
          <div className={styles.bottomLeft}>
            <div className={styles.logo}>
              <span className={styles.logoC}>C</span>
              <span className={styles.logoOntent}>ontents</span>
            </div>
            <RoleTypewriter />
          </div>
        </m.div>

        {/* MIDDLE COLUMN */}
        <m.div 
          className={styles.middleColumn}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <ul className={styles.menuList} onMouseLeave={() => setHoveredMenu(null)}>
        {menuItems.map((item, index) => {
              const isActive = hoveredMenu === item.id;
              const isDimmed = hoveredMenu !== null && !isActive;

              return (
                <li 
                  key={item.id}
                  className={`${styles.menuItemWrapper} ${isActive ? styles.active : ''} ${isDimmed ? styles.dimmed : ''}`} 
                  onMouseEnter={() => setHoveredMenu(item.id)}
                >
                  <div className={styles.menuItem} onClick={() => navigate(item.path)}>
                    <span className={styles.menuText}>{item.title}</span>
                    <span className={styles.menuNumber}>{item.num}</span>
                  </div>
                  <div className={`${styles.aboutDescription} ${isActive ? styles.show : ''}`}>
                    {item.desc}
                  </div>
                </li>
              );
            })}
          </ul>
        </m.div>

        {/* RIGHT COLUMN */}
        <m.div 
          className={styles.rightColumn}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        >
          <div className={styles.topRightNav}>
            <span className={styles.navLink}>Get My CV</span>
            <span className={styles.navLink}>Github</span>
            <span className={styles.navLink}>LinkedIn</span>
          </div>

          <div className={styles.aboutImageWrapper}>
            <img 
              src={aboutImg} 
              alt="Desk with lamp" 
              className={styles.aboutImage}
              draggable="false" 
              loading="lazy"
              decoding="async"
            />
          </div>

          <YearText />
        </m.div>

      </div>
    </section>
  )
}
