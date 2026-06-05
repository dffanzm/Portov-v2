import React, { useRef, useContext } from 'react';
import { m, useIsPresent } from 'framer-motion';
import { TransitionContext } from '../../../App';

let globalScrollY = 0;
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    globalScrollY = window.scrollY;
  }, { passive: true });
}

export default function PageTransition({ children, direction = 'up' }) {
  const isPresent = useIsPresent();
  const [isAnimating, setIsAnimating] = React.useState(true);
  const { exitState } = useContext(TransitionContext);
  const exitTopRef = useRef(null);

  if (!isPresent && exitTopRef.current === null) {
    exitTopRef.current = globalScrollY;
  }

  const topPos = !isPresent ? -(exitTopRef.current || 0) : 0;
  const variants = {
    up: {
      initial: { y: "100vh" },
      animate: { y: 0 },
      exit: { y: "-100vh" }
    },
    down: {
      initial: { y: "-100vh" },
      animate: { y: 0 },
      exit: { y: "100vh" }
    },
    right: {
      initial: { x: "-100vw" },
      animate: { x: 0 },
      exit: { x: "100vw" }
    },
    left: {
      initial: { x: "100vw" },
      animate: { x: 0 },
      exit: { x: "-100vw" }
    },
    none: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    }
  };

  const selectedVariant = variants[direction] || variants.up;

  return (
    <m.div
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      exit={selectedVariant.exit}
      onAnimationComplete={() => setIsAnimating(false)}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      style={{ 
        position: (!isPresent || isAnimating) ? "fixed" : "relative", 
        top: topPos, 
        left: 0, 
        width: "100%", 
        minHeight: "100vh",
        backgroundColor: "var(--color-bg)",
        overflowX: "hidden",
        zIndex: !isPresent ? 0 : 1
      }}
    >
      {children}
    </m.div>
  );
}
