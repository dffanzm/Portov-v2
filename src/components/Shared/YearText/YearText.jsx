import { memo } from 'react'
import styles from './YearText.module.css'

const YearText = memo(function YearText() {
  return (
    <div className={styles.bottomRightYear}>
      <span className={styles.year}>2025</span>
    </div>
  );
});

export default YearText;
