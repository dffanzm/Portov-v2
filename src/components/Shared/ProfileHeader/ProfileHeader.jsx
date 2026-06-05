import { memo } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProfileHeader.module.css'

const ProfileHeader = memo(function ProfileHeader() {
  return (
    <div className={styles.topLeft}>
      <Link to="/" className={styles.homeLink}>
        <h1 className={styles.name}>Daffa Najmudin Hanif</h1>
      </Link>
    </div>
  );
});

export default ProfileHeader;
