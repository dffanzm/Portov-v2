import styles from './Project.module.css';
import ProfileHeader from '../Shared/ProfileHeader/ProfileHeader';
import RoleTypewriter from '../Shared/RoleTypewriter/RoleTypewriter';
import YearText from '../Shared/YearText/YearText';

export default function Project() {
  return (
    <section className={styles.pageContainer}>
      <div className={styles.leftColumn}>
        <ProfileHeader />
        
        <div className={styles.bottomLeft}>
          <RoleTypewriter />
        </div>
      </div>

      <div className={styles.middleColumn}>
        <h1 className={styles.pageTitle}>PROJECT</h1>
        <p>Halaman ini belum dirancang...</p>
      </div>

      <div className={styles.rightColumn}>
        <YearText />
      </div>
    </section>
  );
}
