import styles from './Certifications.module.css';
import ProfileHeader from '../Shared/ProfileHeader/ProfileHeader';
import RoleTypewriter from '../Shared/RoleTypewriter/RoleTypewriter';
import YearText from '../Shared/YearText/YearText';

export default function Certifications() {
  return (
    <section className={styles.pageContainer}>
      <div className={styles.leftColumn}>
        <ProfileHeader />
        
        <div className={styles.bottomLeft}>
          <RoleTypewriter />
        </div>
      </div>

      <div className={styles.middleColumn}>
        <h1 className={styles.pageTitle}>CERTIFICATIONS</h1>
        <p>Halaman ini belum dirancang...</p>
      </div>

      <div className={styles.rightColumn}>
        <YearText />
      </div>
    </section>
  );
}
