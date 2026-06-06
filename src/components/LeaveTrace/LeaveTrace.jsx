import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransitionContext } from '../../App';
import styles from './LeaveTrace.module.css';
import SEO from '../Shared/SEO/SEO';

export default function LeaveTrace() {
  const navigate = useNavigate();
  const { setExitState } = useContext(TransitionContext);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.documentElement.style.overflow = 'unset';
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackToHome = () => {
    setExitState({ direction: 'up' });
    setTimeout(() => {
      navigate('/');
    }, 10);
  };

  return (
    <div className={styles.pageContainer}>
      <SEO 
        title="Leave a Trace | Daffa Najmudin Hanif" 
        description="Connect with me or leave a message. Coming soon!"
      />
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.alexBrushLetter}>C</span>
          <span className={styles.timesNewRomanText}>oming </span>
          <span className={styles.alexBrushLetter}>S</span>
          <span className={styles.timesNewRomanText}>oon</span>
        </h1>
        
        <button onClick={handleBackToHome} className={styles.backButton}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
