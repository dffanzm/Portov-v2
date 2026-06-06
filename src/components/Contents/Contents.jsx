import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TransitionContext } from '../../App'
import { m, AnimatePresence } from 'framer-motion'
import styles from './Contents.module.css'
import aboutImg from '../../assets/about.webp'

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

const iconDeckData = [
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "Canva", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
  { name: "Claude Code", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwtra0-rW66z5d7Il_SLN_3Af1a6ZS4meQTQ&s" },
  { name: "Google AI", icon: "https://jvcrzxkmgvnnhrsvqmds.supabase.co/storage/v1/object/public/linkgo-images/tools/logos/original-google_ai_stuio_logo-large-1759571969167.webp" },
  { name: "Codex", icon: "https://store-images.s-microsoft.com/image/apps.44278.14314868180609929.f8c49912-5781-408f-8963-10487f629f2d.8ac35a1c-f121-477f-9d70-d37926d2aeb5?h=210" }
];

const IconDeck = React.memo(({ data }) => {
  return (
    <div className={styles.iconDeckContainer}>
      {data.map((tool, idx) => {
        const midIndex = (data.length - 1) / 2;
        const rotate = (idx - midIndex) * 4.5; // Perfect slight angle
        const yOffset = Math.pow(idx - midIndex, 2) * 2.5; // True quadratic rainbow curve!
        
        return (
          <m.div 
            key={tool.name}
            className={styles.toolIconWrapper}
            initial={{ opacity: 0, y: 100, rotate: 0, zIndex: 1 }}
            animate={{ opacity: 1, y: yOffset, rotate: rotate, zIndex: 1 }}
            whileHover={{ 
              y: yOffset - 50, // Jump higher to clear the bigger cards
              scale: 1.25, 
              rotate: 0,
              zIndex: 50,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              delay: idx * 0.05
            }}
            style={{ 
              transformOrigin: "bottom center"
            }}
          >
            <div className={styles.toolIconCard}>
              <span className={styles.tooltip}>{tool.name}</span>
              <img src={tool.icon} alt={tool.name} className={styles.cardIcon} loading="lazy" decoding="async" />
            </div>
          </m.div>
        )
      })}
    </div>
  )
});

import SEO from '../Shared/SEO/SEO'

export default function Contents() {
  const navigate = useNavigate();
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [isToolsModalOpen, setIsToolsModalOpen] = useState(false);
  const [isExpandingTrace, setIsExpandingTrace] = useState(false);
  const { setExitState } = useContext(TransitionContext);
  
  const hoveredIndex = menuItems.findIndex(item => item.id === hoveredMenu);
  const activeDesc = hoveredIndex !== -1 ? menuItems[hoveredIndex].desc : '';

  const handleNavigate = (path, id) => {
    if (id === 'tools') {
      setIsToolsModalOpen(true);
      return;
    }
    
    if (id === 'trace') {
      setExitState({ direction: 'none' });
      setIsExpandingTrace(true);
      return;
    }
    
    let direction = 'none';
    if (id === 'about') direction = 'up';
    if (id === 'experience') direction = 'right';
    if (id === 'project') direction = 'left';
    if (id === 'certifications') direction = 'down';
    
    setExitState({ direction });
    
    // Tiny delay to ensure state sets before navigation triggers unmount
    setTimeout(() => {
      navigate(path);
    }, 10);
  };

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
                  <div className={styles.menuItem} onClick={() => handleNavigate(item.path, item.id)}>
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

      {/* TOOLS MODAL */}
      <AnimatePresence>
        {isToolsModalOpen && (
          <m.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsToolsModalOpen(false)}
          >
            <m.div
              className={styles.modalContent}
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeBtn}
                onClick={() => setIsToolsModalOpen(false)}
              >
                ✕
              </button>

              <h2 className={styles.modalTitle}>
                <span className={styles.alexBrushLetter}>T</span>
                <span className={styles.timesNewRomanText}>OOLS</span>
                <span className={styles.alexBrushLetter} style={{ marginLeft: '1rem' }}>I</span>
                <span className={styles.alexBrushLetter} style={{ marginLeft: '1rem' }}>U</span>
                <span className={styles.timesNewRomanText}>SE</span>
              </h2>
              <p className={styles.modalSubtitle}>
                The tools I reach for when designing and building digital products.
              </p>

              <div className={styles.modalDecksWrapper}>
                <IconDeck data={iconDeckData} />
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {/* TRACE EXPAND ANIMATION */}
      <AnimatePresence>
        {isExpandingTrace && (
          <m.div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              width: '100px',
              height: '100px',
              backgroundColor: '#000000',
              borderRadius: '50%',
              zIndex: 9999,
              pointerEvents: 'none',
            }}
            initial={{ x: '-50%', y: '-50%', scale: 0 }}
            animate={{ x: '-50%', y: '-50%', scale: 40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => {
              navigate('/trace');
            }}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
