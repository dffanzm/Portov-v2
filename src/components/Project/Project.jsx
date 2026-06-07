import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import styles from './Project.module.css';
import ProfileHeader from '../Shared/ProfileHeader/ProfileHeader';
import ContactModal from '../Shared/ContactModal/ContactModal';

import project1 from '../../assets/assets-project/project1.webp';
import project2 from '../../assets/assets-project/project2.webp';
import project3 from '../../assets/assets-project/project3.webp';
import project4 from '../../assets/assets-project/project4.webp';
import project5 from '../../assets/assets-project/project5.webp';
import project6 from '../../assets/assets-project/project6.webp';
import project7 from '../../assets/assets-project/project7.webp';

const projectsData = [
  {
    id: 1,
    title: "Kim Holiday",
    brand: "Company Profile",
    description: "Clean, intuitive website for Kim Holiday that makes exploring destinations and finding travel info effortless.",
    tags: ["React", "TailwindCSS", "HTML/CSS"],
    githubUrl: null,
    liveUrl: "https://kimholidaytravel.id/",
    image: project1,
    gridClass: styles.itemWide,
  },
  {
    id: 2,
    title: "1Slab",
    brand: "Startup Company",
    description: "1s Labs menyediakan jasa pembuatan website profesional dengan harga terjangkau dan aktivasi seumur hidup. Berbasis di Jakarta, kami membantu UMKM bertransformasi digital.",
    tags: ["React", "Vite", "TailwindCSS"],
    githubUrl: null,
    liveUrl: "https://1s-labs.vercel.app/",
    image: project2,
    gridClass: styles.itemWide,
  },
  {
    id: 3,
    title: "Lansia-Friendly 2.0",
    brand: "Browser Extension",
    description: "Accessibility tool featuring hover-to-speech, text zoom, and custom cursors to help elderly users navigate the web.",
    tags: ["Go", "JavaScript", "Extension API"],
    githubUrl: "https://github.com/dffanzm/Lansia-Friendly2.0",
    liveUrl: null,
    image: project3,
    gridClass: styles.itemSquare,
  },
  {
    id: 4,
    title: "Silayan Mobile",
    brand: "Diskominfo Jabar",
    description: "Built an internal infrastructure service information system (Sistem Informasi Layanan Infrastruktur) to help streamline daily operations and reporting at Diskominfo Jabar.",
    tags: ["React Native", "Laravel", "Mobile Development"],
    githubUrl: null,
    playstoreUrl: "https://play.google.com/store/apps/details?id=com.silayan.app&hl=id",
    liveUrl: null,
    image: project4,
    gridClass: styles.itemTall,
  },
  {
    id: 5,
    title: "RunEase",
    brand: "Health & Fitness",
    description: "A fitness app designed to help users track their runs and analyze performance metrics in real-time.",
    tags: ["React Native", "Supabase", "Expo", "TypeScript"],
    githubUrl: "https://github.com/dffanzm/Running-Management.git",
    liveUrl: null,
    image: project5,
    gridClass: styles.itemLarge,
  },
  {
    id: "info",
    type: "info_block",
    gridClass: `${styles.itemSquare} ${styles.infoBlock}`,
  },
  {
    id: 6,
    title: "Manage Your Life",
    brand: "Productivity System",
    description: "Comprehensive task management system featuring deadline tracking and PWA offline capabilities.",
    tags: ["Laravel", "Blade", "Tailwind", "SCSS"],
    githubUrl: "https://github.com/dffanzm/Manage-Your-Activity-Development.git",
    liveUrl: "https://manageyourlife.web.id/",
    image: project6,
    gridClass: styles.itemSquare,
  },
  {
    id: 7,
    title: "Bosh Parfume",
    brand: "E-Commerce App",
    description: "A modern mobile marketplace for fragrance enthusiasts with seamless checkout and product discovery.",
    tags: ["React Native", "Supabase", "Expo", "Zustand"],
    githubUrl: "https://github.com/dffanzm/Bosh-Parfume-Production.git",
    playstoreUrl: "https://play.google.com/store/apps/details?id=com.bosh.parfume&hl=id",
    liveUrl: null,
    image: project7,
    gridClass: styles.itemTall,
  }
];

import SEO from '../Shared/SEO/SEO';

export default function Project() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Animasi masuk untuk baris per baris
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
    },
  };

  // Animasi Modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 300 } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <section className={styles.pageContainer}>
      <SEO 
        title="Projects | Daffa Najmudin Hanif" 
        description="Explore my recent projects, including web applications, browser extensions, and mobile apps built with React, Tailwind, and more."
      />
      
      {/* HEADER SECTION */}
      <div className={styles.topBar}>
        <ProfileHeader />
        <div className={styles.clickDetail}>
          CLICK TO DETAIL <span className={styles.arrowIcon}>↗</span>
        </div>
      </div>

      {/* TITLE AREA */}
      <m.div 
        className={styles.titleArea}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className={styles.projectTitle}>
          <span className={styles.alexBrushLetter}>P</span>
          <span className={styles.timesNewRomanText}>roject</span>
          <span className={styles.alexBrushLetter} style={{ marginLeft: '1.5rem' }}>H</span>
          <span className={styles.timesNewRomanText}>ighlights</span>
        </h1>
      </m.div>

      {/* DESC AREA */}
      <div className={styles.descArea}>
        <m.p 
          className={styles.descLeft}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Blending clean code,<br />
          system logic, and a focus<br />
          on building reliable solutions.
        </m.p>
        <m.p 
          className={styles.descRight}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Blending clean code,<br />
          system logic, and a focus<br />
          on building reliable solutions.
        </m.p>
      </div>

      {/* GRID MASONRY/BENTO LAYOUT */}
      <m.div 
        className={styles.gridContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projectsData.map((project) => {
          if (project.type === "info_block") {
            return (
              <m.div key={project.id} className={`${styles.gridItem} ${project.gridClass}`} variants={itemVariants} onClick={() => setIsContactOpen(true)} style={{ cursor: 'pointer' }}>
                <div className={styles.infoContent}>
                  <span className={styles.infoTitle}>Looking for More?</span>
                  <div className={styles.infoAccent}></div>
                  <span className={styles.infoText}>Let's discuss and build your next big idea together.</span>
                </div>
              </m.div>
            );
          }

          return (
            <m.div 
              key={project.id} 
              className={`${styles.gridItem} ${project.gridClass}`} 
              variants={itemVariants}
              onClick={() => setSelectedProject(project)}
              style={{ cursor: 'pointer' }}
            >
              <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
              <div className={styles.itemOverlay}>
                <h3 className={styles.overlayTitle}>{project.title}</h3>
              </div>
            </m.div>
          );
        })}
      </m.div>

      {/* GLASSMORPHISM MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <m.div 
            className={styles.modalOverlay}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedProject(null)}
          >
            <m.div 
              className={styles.modalContent}
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing the modal
            >
              <button 
                className={styles.closeBtn} 
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>

              <div className={styles.modalHeader}>
                <p className={styles.modalBrand}>{selectedProject.brand}</p>
                <h2 className={styles.modalTitle}>{selectedProject.title}</h2>
              </div>

              <div className={styles.modalTags}>
                {selectedProject.tags.map((tag, idx) => (
                  <span key={idx} className={styles.tagPill}>{tag}</span>
                ))}
              </div>

              <p className={styles.modalDesc}>{selectedProject.description}</p>

              <div className={styles.modalActions}>
                {selectedProject.liveUrl && (
                  <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className={styles.primaryBtn}>
                    ↗ Live Site
                  </a>
                )}
                {selectedProject.playstoreUrl && (
                  <a href={selectedProject.playstoreUrl} target="_blank" rel="noreferrer" className={styles.primaryBtn}>
                    ▶ Play Store
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className={styles.secondaryBtn}>
                    &lt;/&gt; Source Code
                  </a>
                )}
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
