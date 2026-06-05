import React, { useRef, useState, useEffect, memo } from 'react';
import { m, useScroll, useSpring, useInView, useTransform } from 'framer-motion';
import { GraduationCap, Briefcase, Calendar } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import styles from './Experience.module.css';
import ProfileHeader from '../Shared/ProfileHeader/ProfileHeader';
import crownImg from '../../assets/crown.png';

// --- DATA ---
const contentData = {
  en: {
    title: { e1: "E", e1Rest: "ducation & ", e2: "E", e2Rest: "xperience" },
    desc: "Balancing my time between the classroom and technical projects, I focus on turning concepts into working software. Whether I am studying system logic or building applications for clients, my goal is always to connect what I learn with what I build.",
    arc1Title: "Education Arc",
    arc2Title: "Experience Arc",
    education: [
      {
        year: "2020 - 2023",
        title: "Science Student (MIPA)",
        subtitle: "MAN 1 Kota Bandung",
        description: "Studied science at MAN 1 Bandung from 2020 to 2023. Spent those years exploring, learning, and growing — keeping the spirit of seeking knowledge alive.",
      },
      {
        year: "2021 - 2023",
        title: "Pesantren Al Murabby",
        subtitle: "Al Murabby Boarding Program Committee",
        description: "Extracurricular Committee focused on student development and religious activities in the boarding school environment. Successfully memorized 2 Juz of the Al-Qur'an.",
      },
      {
        year: "2023 - Present",
        title: "Informatics Engineering Student",
        subtitle: "UIN Sunan Gunung Djati Bandung",
        description: "Always learning, always leveling up — exploring tech, building stuff, fixing what breaks, and improving a bit every day. Current GPA: 3.85.",
      },
    ],
    experience: [
      {
        year: "2024 - Present",
        title: "Esports Community Leader",
        subtitle: "Senior Himatif",
        description: "Managing and developing the esports division, focusing on growth, teamwork, and continuous improvement.",
      },
      {
        year: "18 October 2025 - Present",
        title: "Project Manager",
        subtitle: "1Slab",
        description: "Directed end-to-end web development projects at 1Slab, a Jakarta-based agency focused on digital transformation for MSMEs. Managed cross-functional workflows between clients and developers to deliver high-quality, scalable websites. Ensured optimal resource allocation and strict timeline adherence to provide cost-effective solutions with maximum quality.",
      },
      {
        year: "18 October 2025 - Present",
        title: "Full Stack Developer",
        subtitle: "Kim Holiday",
        description: "Built a fresh, modern, and responsive company profile website from scratch — from frontend polish to backend logic. Maintaining and improving the platform with clean code, scalable structure, and consistent UI/UX vibes.",
      },
      {
        year: "10 November 2025 - Present",
        title: "Backend Developer",
        subtitle: "Yuk-Mari Project",
        description: "Developing dynamic admin pages powered by secure API keys — making content management seamless and real-time. Continuously refining the backend architecture for speed, clarity, and long-term scalability.",
      },
      {
        year: "9 December 2025 - 11 July 2026",
        title: "Full Stack Mobile Developer",
        subtitle: "Intern Diskominfo Jawa Barat",
        description: "Spearheaded the development of the 'Silayan' mobile application with a highly structured and scalable architecture. Mentored and led a team of fellow interns, driving the project from conception to a successful deployment on the Google Play Store.",
      },
      {
        year: "15 December 2025 - Present",
        title: "Full Stack Mobile Developer",
        subtitle: "Bosh Parfume",
        description: "Engineered a high-end e-commerce application utilizing a decoupled system architecture with React Native and Expo. Seamlessly integrated RESTful APIs to bridge the mobile client and backend server, ensuring real-time content delivery and system scalability.",
      },
      {
        year: "29 April 2026 - 9 July 2026",
        title: "Organizing Committee Chairman",
        subtitle: "IT FAIR XIV V2",
        description: "Directed the end-to-end execution of IT FAIR XIV V2. Led and coordinated a committee of 59 members, ensuring seamless operational workflows. Architected major event concepts including IT bootcamps and core competitions (UI/UX Design, Hackathon, and Capture The Flag). Successfully secured and collaborated with top-tier industry experts as keynote speakers.",
      },
    ]
  },
  id: {
    title: { e1: "P", e1Rest: "endidikan & ", e2: "P", e2Rest: "engalaman" },
    desc: "Menyeimbangkan waktu antara ruang kelas dan proyek teknis, saya berfokus pada mengubah konsep menjadi perangkat lunak yang fungsional. Baik saat mempelajari logika sistem maupun membangun aplikasi untuk klien, tujuan saya selalu menghubungkan apa yang saya pelajari dengan apa yang saya bangun.",
    arc1Title: "Jalur Pendidikan",
    arc2Title: "Jalur Pengalaman",
    education: [
      {
        year: "2020 - 2023",
        title: "Siswa MIPA",
        subtitle: "MAN 1 Kota Bandung",
        description: "Belajar sains di MAN 1 Bandung dari 2020 hingga 2023. Menghabiskan tahun-tahun tersebut untuk bereksplorasi, belajar, dan berkembang — menjaga semangat menuntut ilmu tetap hidup.",
      },
      {
        year: "2021 - 2023",
        title: "Pesantren Al Murabby",
        subtitle: "Komite Program Asrama Al Murabby",
        description: "Komite Ekstrakurikuler yang berfokus pada pengembangan siswa dan kegiatan keagamaan di lingkungan pesantren. Berhasil menghafal 2 Juz Al-Qur'an.",
      },
      {
        year: "2023 - Sekarang",
        title: "Mahasiswa Teknik Informatika",
        subtitle: "UIN Sunan Gunung Djati Bandung",
        description: "Selalu belajar, selalu meningkatkan kemampuan — mengeksplorasi teknologi, membangun sesuatu, memperbaiki yang rusak, dan berkembang sedikit demi sedikit setiap hari. IPK Saat ini: 3.85.",
      },
    ],
    experience: [
      {
        year: "2024 - Sekarang",
        title: "Esports Community Leader",
        subtitle: "Senior Himatif",
        description: "Mengelola dan mengembangkan divisi esports, berfokus pada pertumbuhan, kerja sama tim, dan perbaikan berkelanjutan.",
      },
      {
        year: "18 Oktober 2025 - Sekarang",
        title: "Project Manager",
        subtitle: "1Slab",
        description: "Memimpin proyek pengembangan web dari hulu ke hilir di 1Slab, agensi asal Jakarta yang berfokus pada transformasi digital untuk UMKM. Mengelola alur kerja lintas fungsi antara klien dan pengembang untuk menghasilkan situs web berkualitas tinggi dan dapat diskalakan. Memastikan alokasi sumber daya yang optimal dan kepatuhan tenggat waktu yang ketat untuk memberikan solusi hemat biaya dengan kualitas maksimal.",
      },
      {
        year: "18 Oktober 2025 - Sekarang",
        title: "Full Stack Developer",
        subtitle: "Kim Holiday",
        description: "Membangun website profil perusahaan yang segar, modern, dan responsif dari awal — mulai dari tampilan frontend hingga logika backend. Memelihara dan meningkatkan platform dengan kode yang bersih, struktur yang skalabel, dan konsistensi UI/UX.",
      },
      {
        year: "10 November 2025 - Sekarang",
        title: "Backend Developer",
        subtitle: "Yuk-Mari Project",
        description: "Mengembangkan halaman admin dinamis yang ditenagai oleh API keys yang aman — membuat manajemen konten menjadi mulus dan real-time. Terus menyempurnakan arsitektur backend untuk kecepatan, kejelasan, dan skalabilitas jangka panjang.",
      },
      {
        year: "9 Desember 2025 - 11 Juli 2026",
        title: "Full Stack Mobile Developer",
        subtitle: "Intern Diskominfo Jawa Barat",
        description: "Memelopori pengembangan aplikasi seluler 'Silayan' dengan arsitektur yang sangat terstruktur dan skalabel. Membimbing dan memimpin tim sesama pemagang, mendorong proyek dari tahap konsep hingga berhasil di-deploy di Google Play Store.",
      },
      {
        year: "15 Desember 2025 - Sekarang",
        title: "Full Stack Mobile Developer",
        subtitle: "Bosh Parfume",
        description: "Membangun aplikasi e-commerce high-end dengan arsitektur Decoupled System menggunakan React Native & Expo. Mengintegrasikan RESTful API secara mulus sebagai jembatan antara klien seluler dan server backend, memastikan pengiriman konten real-time dan skalabilitas sistem.",
      },
      {
        year: "29 April 2026 - 9 Juli 2026",
        title: "Organizing Committee Chairman",
        subtitle: "IT FAIR XIV V2",
        description: "Memimpin pelaksanaan IT FAIR XIV V2 dari awal hingga akhir. Memimpin dan mengoordinasikan panitia yang berjumlah 59 orang, memastikan alur kerja operasional yang mulus. Merancang konsep acara besar termasuk bootcamp IT dan kompetisi inti (Desain UI/UX, Hackathon, dan Capture The Flag). Berhasil mengundang dan berkolaborasi dengan pakar industri terkemuka sebagai pembicara utama.",
      },
    ]
  }
};

// --- TIMELINE ITEM COMPONENT ---
const TimelineItem = memo(({ data, isCurrent, isActive }) => {
  const dotVariants = {
    inactive: {
      scale: 1,
      backgroundColor: "rgba(192, 57, 43, 0.2)",
      borderColor: "#c0392b",
      boxShadow: "0 0 0px rgba(192, 57, 43, 0)",
    },
    active: {
      scale: 1,
      backgroundColor: "#c0392b",
      borderColor: "#c0392b",
      boxShadow: "0 0 15px 2px rgba(192, 57, 43, 0.5)",
      transition: { duration: 0.5, ease: "easeOut" },
    },
    continuous: {
      scale: [1.2, 1.4, 1.2],
      backgroundColor: "#c0392b",
      borderColor: "#ffffff",
      boxShadow: [
        "0 0 15px rgba(192, 57, 43, 0.8)",
        "0 0 35px rgba(192, 57, 43, 1)",
        "0 0 15px rgba(192, 57, 43, 0.8)",
      ],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-50px" }}
      className={styles.timelineItem}
    >
      <m.div 
        className={styles.timelineDot} 
        variants={dotVariants}
        initial="inactive"
        animate={isCurrent ? "continuous" : isActive ? "active" : "inactive"}
      >
        {/* Inner glow for active state */}
        {isActive && (
          <m.div
            className={styles.innerDotGlow}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </m.div>
      <m.div 
        className={styles.timelineCard}
        animate={{
          borderColor: isCurrent ? "rgba(192, 57, 43, 1)" : isActive ? "rgba(192, 57, 43, 0.6)" : "rgba(255, 255, 255, 0.05)",
          boxShadow: isCurrent ? "0 0 30px rgba(192, 57, 43, 0.4)" : isActive ? "0 0 15px rgba(192, 57, 43, 0.15)" : "0 0 0px rgba(0,0,0,0)",
          background: isActive ? "rgba(25, 15, 15, 0.95)" : "rgba(20, 20, 20, 0.6)",
          scale: isCurrent ? 1.03 : 1
        }}
        whileHover={{
          y: -8,
          scale: 1.03,
          borderColor: "rgba(192, 57, 43, 1)",
          boxShadow: "0 0 40px rgba(192, 57, 43, 0.4)",
          transition: { duration: 0.3 }
        }}
        transition={{ duration: 0.4 }}
      >
        <m.div 
          className={styles.timelineYear}
          animate={{
            backgroundColor: isActive ? "#c0392b" : "rgba(192, 57, 43, 0.2)",
            color: isActive ? "#ffffff" : "#ffcccc",
            boxShadow: isActive ? "0 0 15px rgba(192, 57, 43, 0.6)" : "0 0 0px rgba(0,0,0,0)"
          }}
          transition={{ duration: 0.4 }}
        >
          <Calendar size={14} />
          {data.year}
        </m.div>
        
        <m.h4 
          className={styles.timelineTitle}
          animate={{ color: isActive ? "#ff6b6b" : "#ffffff" }}
          transition={{ duration: 0.4 }}
        >
          {data.title}
        </m.h4>
        
        <div className={styles.timelineSubtitle}>{data.subtitle}</div>
        <m.p 
          className={styles.timelineDesc}
          animate={{ color: isActive ? "#ffffff" : "#dddddd" }}
          transition={{ duration: 0.4 }}
        >
          {data.description}
        </m.p>
      </m.div>
    </m.div>
  );
}, (prevProps, nextProps) => {
  return prevProps.isCurrent === nextProps.isCurrent && prevProps.isActive === nextProps.isActive && prevProps.data.description === nextProps.data.description;
});

// --- TIMELINE COLUMN WITH SCROLL PROGRESS ---
const TimelineColumn = ({ title, icon: Icon, data }) => {
  const ref = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const segmentHeight = 1 / data.length;
      let newIndex = Math.floor(latest / segmentHeight);
      if (latest >= 1) newIndex = data.length - 1;
      else if (latest <= 0) newIndex = -1;
      else newIndex = Math.min(newIndex, data.length - 1);

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress, data.length, activeIndex]);

  return (
    <div className={styles.timelineSection} ref={ref}>
      <div className={styles.timelineHeader}>
        <Icon size={28} />
        <span>{title}</span>
      </div>
      <div className={styles.timelineContainer}>
        <div className={styles.timelineLineWrapper}>
          <div className={styles.timelineLineBg} />
          <m.div 
            className={styles.timelineLineProgress} 
            style={{ height: progressHeight }} 
          />
          <m.div
            className={styles.travelingGlow}
            style={{ top: progressHeight }}
          >
            <m.div
              className={styles.travelingGlowInner}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </m.div>
        </div>
        
        {data.map((item, index) => (
          <TimelineItem 
            key={index} 
            data={item} 
            isCurrent={index === activeIndex}
            isActive={index <= activeIndex}
          />
        ))}
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function Experience() {
  const containerRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get('lang') === 'id' ? 'id' : 'en';
  const t = contentData[lang];
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100, damping: 30, restDelta: 0.001
  });

  const scrollLineHeight = useTransform(smoothProgress, [0, 1], ["0px", "80px"]);

  return (
    <section className={styles.pageContainer} ref={containerRef}>
      
      {/* SIDEBAR SCROLL TRIGGER */}
      <div className={styles.sidebarWrapper}>
        <div className={styles.sidebarTrigger}>
          <div className={styles.sidebarText}>EXPLORE MY JOURNEY</div>
          <div className={styles.sidebarLineContainer}>
            <m.div 
              className={styles.sidebarLineFill} 
              style={{ height: scrollLineHeight }} 
            />
          </div>
        </div>
      </div>

      {/* TOP HEADER AREA */}
      <div className={styles.headerArea}>
        <div className={styles.headerLeft}>
          <ProfileHeader />
          <div className={styles.experienceTitle}>
            <span className={styles.alexBrush}>{t.title.e1}</span>
            <span className={styles.timesNewRoman} style={{ marginLeft: '0.1em' }}>{t.title.e1Rest}</span>
            <span className={styles.alexBrush}>{t.title.e2}</span>
            <span className={styles.timesNewRoman} style={{ marginLeft: '0.1em' }}>{t.title.e2Rest}</span>
            <img 
              src={crownImg} 
              alt="Crown" 
              className={styles.crownImg} 
              draggable="false" 
              loading="lazy" 
              decoding="async" 
            />
          </div>
          <p className={styles.experienceDesc}>
            {t.desc}
          </p>
        </div>

        {/* RIGHT HEADER FOR LANGUAGE TOGGLE */}
        <div className={styles.headerRight}>
          <div className={styles.langToggleContainer}>
            <button 
              className={`${styles.langBtn} ${lang === 'en' ? styles.activeLang : ''}`}
              onClick={() => setSearchParams({ lang: 'en' })}
            >
              EN
            </button>
            <span className={styles.langDivider}>/</span>
            <button 
              className={`${styles.langBtn} ${lang === 'id' ? styles.activeLang : ''}`}
              onClick={() => setSearchParams({ lang: 'id' })}
            >
              ID
            </button>
          </div>
        </div>
      </div>

      {/* TIMELINE CONTENT AREA */}
      <div className={styles.timelineArea}>
        <div className={styles.timelineGrid}>
          <TimelineColumn 
            title={t.arc1Title} 
            icon={GraduationCap} 
            data={t.education} 
          />
          <TimelineColumn 
            title={t.arc2Title} 
            icon={Briefcase} 
            data={t.experience} 
          />
        </div>
      </div>

    </section>
  );
}
