import React, { useRef, useState, useEffect, memo } from 'react';
import { m, useScroll, useSpring, useInView, useTransform } from 'framer-motion';
import { GraduationCap, Briefcase, Calendar } from 'lucide-react';
import styles from './Experience.module.css';
import ProfileHeader from '../Shared/ProfileHeader/ProfileHeader';
import crownImg from '../../assets/crown.png';
import starImg from '../../assets/star.webp';

// --- DATA ---
const educationData = [
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
];

const experienceData = [
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
];

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
  return prevProps.isCurrent === nextProps.isCurrent && prevProps.isActive === nextProps.isActive;
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
            <span className={styles.alexBrush}>E</span>
            <span className={styles.timesNewRoman} style={{ marginLeft: '0.1em' }}>ducation & </span>
            <span className={styles.alexBrush}>E</span>
            <span className={styles.timesNewRoman} style={{ marginLeft: '0.1em' }}>xperience</span>
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
            Balancing my time between the classroom and technical projects, I focus on turning concepts into working software. Whether I am studying system logic or building applications for clients, my goal is always to connect what I learn with what I build.
          </p>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.starsContainer}>
              <img 
  src={starImg} 
  alt="Stars" 
  className={styles.starImg} 
  draggable="false" 
  loading="lazy" 
  decoding="async" 
/>
          </div>
        </div>
      </div>

      {/* TIMELINE CONTENT AREA */}
      <div className={styles.timelineArea}>
        <div className={styles.timelineGrid}>
          <TimelineColumn title="Education Arc" icon={GraduationCap} data={educationData} />
          <TimelineColumn title="Experience Arc" icon={Briefcase} data={experienceData} />
        </div>
      </div>

    </section>
  );
}
