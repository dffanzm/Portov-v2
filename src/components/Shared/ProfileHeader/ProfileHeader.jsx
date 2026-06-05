import { memo, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TransitionContext } from '../../../App'
import styles from './ProfileHeader.module.css'

const ProfileHeader = memo(function ProfileHeader() {
  const location = useLocation();
  const { setExitState } = useContext(TransitionContext);

  const handleHomeClick = () => {
    if (location.pathname === '/about-me') {
      setExitState({ direction: 'down' });
    } else if (location.pathname === '/experience') {
      setExitState({ direction: 'left' });
    } else if (location.pathname === '/project') {
      setExitState({ direction: 'right' });
    } else {
      setExitState({ direction: 'none' });
    }
  };

  return (
    <div className={styles.topLeft}>
      <Link to="/" className={styles.homeLink} onClick={handleHomeClick}>
        <h1 className={styles.name}>Daffa Najmudin Hanif</h1>
      </Link>
    </div>
  );
});

export default ProfileHeader;
