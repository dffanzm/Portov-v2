import React from 'react';
import { m } from 'framer-motion';

export default function PageTransition({ children, animateY = true }) {
  return (
    <m.div
      initial={{ y: animateY ? 80 : 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: animateY ? -80 : 0, opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}
