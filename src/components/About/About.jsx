import styles from './About.module.css'
import aboutImg from '../../assets/about.jpeg'

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        
        {/* --- LEFT COLUMN: PROFILE --- */}
        <div className={styles.profileCol}>
          <div className={styles.header}>
            <div className={styles.photoWrapper}>
              <img 
                src={aboutImg} 
                alt="Daffa Najmudin Hanif" 
                className={styles.photo} 
                draggable="false"
              />
            </div>
            <h2 className={styles.name}>Daffa Najmudin Hanif</h2>
          </div>

          <p className={styles.bio}>
            Informatic Engineer I build things people actually use
          </p>

          <div className={styles.actions}>
            <a href="#contact" className={styles.btnPrimary}>
              <svg 
                width="18" height="18" viewBox="0 0 24 24" 
                fill="none" stroke="currentColor" strokeWidth="2" 
                strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              Discuss a project
            </a>
            
            <a href="#cv" className={styles.btnSecondary}>
              Curriculum vitae
            </a>
          </div>
        </div>

        {/* --- RIGHT COLUMN: TOP PROJECTS --- */}
        <div className={styles.projectsCol}>
          
          <a href="#" className={styles.projectCard}>
            <div className={styles.projectImagePlaceholder}>
              <span>Project Preview 1</span>
            </div>
            <div className={styles.projectInfo}>
              <h3 className={styles.projectTitle}>Generate 3D icons</h3>
              <p className={styles.projectDesc}>
                A web application to generate 3D matching icons.
              </p>
            </div>
          </a>

          <a href="#" className={styles.projectCard}>
            <div className={styles.projectImagePlaceholder}>
              <span>Project Preview 2</span>
            </div>
            <div className={styles.projectInfo}>
              <h3 className={styles.projectTitle}>Bikin Absen</h3>
              <p className={styles.projectDesc}>
                Absensi online yang bikin kerja jadi lebih efisien.
              </p>
            </div>
          </a>

        </div>

      </div>
    </section>
  )
}
