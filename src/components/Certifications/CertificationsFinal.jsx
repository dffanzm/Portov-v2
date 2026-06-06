import React, { useEffect } from 'react';
import styles from './CertificationsFinal.module.css';
import ProfileHeader from '../Shared/ProfileHeader/ProfileHeader';
import RoleTypewriter from '../Shared/RoleTypewriter/RoleTypewriter';

import cert1 from '../../assets/assets-sertif/1.webp';
import cert2 from '../../assets/assets-sertif/2.webp';
import cert3 from '../../assets/assets-sertif/3.webp';
import cert4 from '../../assets/assets-sertif/4.webp';
import StylishCarousel from '../Shared/StylishCarousel/StylishCarousel';
import SEO from '../Shared/SEO/SEO';

export default function Certifications() {
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = 'unset';
      document.body.style.overflow = 'unset';
    };
  }, []);

  const certificateItems = [
    { src: cert1, title: 'IT Competition Finalist', desc: 'IDTC Competition | Partisipasi aktif dalam kompetisi Information Technology mengasah problem solving.' },
    { src: cert2, title: 'Oracle Academy', desc: 'Database & SQL | Pemahaman mendalam tentang database, desain SQL, dan pemrograman berbasis Oracle.' },
    { src: cert3, title: 'Sertifikat Tahfidz', desc: 'Program Tahfidz | Penghargaan atas dedikasi dan penyelesaian program menghafal Al-Quran.' },
    { src: cert4, title: 'English Course', desc: 'Kampung Inggris Pare | Penyelesaian program intensif bahasa Inggris fokus pada speaking dan grammar.' },
  ];

  return (
    <section className={styles.pageContainer}>
      <SEO 
        title="Certifications | Daffa Najmudin Hanif" 
        description="View my professional credentials, IT competition awards, and certifications from Oracle Academy and more."
      />
      <div className={styles.leftColumn}>
        <ProfileHeader />
        
        <div className={styles.bottomLeft}>
          <RoleTypewriter />
        </div>
      </div>

      <div className={styles.middleColumn}>
        <h1 className={styles.pageTitle}>
          <span className={styles.alexBrushLetter}>C</span>
          <span className={styles.timesNewRomanText}>ertifications</span>
        </h1>
        <div style={{ marginTop: '0', display: 'flex', justifyContent: 'center' }}>
          <StylishCarousel 
            items={certificateItems} 
            slideSize="clamp(220px, 32vw, 360px)"
            rotationDegrees={15}
            inactiveScale={0.7}
            yOffsetPercent={15}
            showArrows={false}
            showDots={false}
            showCounter={false}
          />
        </div>
      </div>

      <div className={styles.rightColumn}>
        <div style={{
          textAlign: 'right',
          fontSize: '0.85rem',
          color: 'rgba(255, 255, 255, 0.4)',
          letterSpacing: '0.05em',
          lineHeight: '1.6',
          maxWidth: '200px',
          alignSelf: 'flex-end',
          marginBottom: '1rem',
          fontStyle: 'italic'
        }}>
          "A milestone of continuous growth."
        </div>
      </div>
    </section>
  );
}
