import React, { useState, useCallback, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./StylishCarousel.module.css";

const StylishCarousel = ({
  items = [],
  initialIndex = 0,
  slideSize = "clamp(180px, 75vmin, 380px)",
  rotationDegrees = 28,
  inactiveScale = 0.62,
  yOffsetPercent = 48,
  springBounce = 0.15,
  springDuration = 0.8,
  showArrows = true,
  showDots = true,
  showCounter = true,
  clickToNavigate = true,
  autoPlay = 0,
  className = "",
  onIndexChange,
  borderRadius = "1rem",
}) => {
  const clampedInitial = Math.max(0, Math.min(initialIndex, items.length - 1));
  const [activeIndex, setActiveIndex] = useState(clampedInitial);
  const autoPlayRef = useRef(null);
  const containerRef = useRef(null);

  const goTo = useCallback(
    (index) => {
      const clamped = Math.max(0, Math.min(index, items.length - 1));
      setActiveIndex(clamped);
      if (onIndexChange) onIndexChange(clamped);
    },
    [items.length, onIndexChange]
  );

  const toPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const toNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") toPrev();
      if (e.key === "ArrowRight") toNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toPrev, toNext]);

  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) toNext();
      else toPrev();
    }
    touchStartX.current = null;
  };

  // --- Mouse Drag Logic ---
  const dragStartX = useRef(null);
  
  const handleMouseDown = (e) => {
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    if (dragStartX.current === null) return;
    const delta = dragStartX.current - e.clientX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) toNext();
      else toPrev();
    }
    dragStartX.current = null;
  };

  // --- Mouse Wheel Logic ---
  const lastWheelTime = useRef(0);
  
  useEffect(() => {
    const handleGlobalWheel = (e) => {
      // Prevent the page from scrolling up or down
      e.preventDefault();
      
      const now = Date.now();
      if (now - lastWheelTime.current < 400) return; // Debounce
      
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        if (e.deltaX > 20) { toNext(); lastWheelTime.current = now; }
        else if (e.deltaX < -20) { toPrev(); lastWheelTime.current = now; }
      } else {
        if (e.deltaY > 20) { toNext(); lastWheelTime.current = now; }
        else if (e.deltaY < -20) { toPrev(); lastWheelTime.current = now; }
      }
    };

    window.addEventListener('wheel', handleGlobalWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleGlobalWheel);
  }, [toNext, toPrev]);

  useEffect(() => {
    if (!autoPlay) return;
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev + 1 >= items.length ? 0 : prev + 1;
        if (onIndexChange) onIndexChange(next);
        return next;
      });
    }, autoPlay);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay, items.length, onIndexChange]);

  const spring = {
    type: "spring",
    bounce: springBounce,
    duration: springDuration,
  };

  if (!items.length) return null;

  return (
    <div
      ref={containerRef}
      className={`${styles.carouselRoot} ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // treating mouse leave as mouse up to complete the drag
      aria-label="Stylish Carousel"
      role="region"
    >
      <div
        style={{ width: slideSize, aspectRatio: "4 / 3" }}
        className={styles.slideContainer}
      >
        <m.div
          className={styles.slideStrip}
          animate={{ x: `${(-activeIndex * 100) / items.length}%` }}
          transition={spring}
        >
          {items.map((item, i) => {
            const offset = i - activeIndex;
            const isActive = offset === 0;

            return (
              <m.div
                key={i}
                style={{ width: slideSize, aspectRatio: "4 / 3" }}
                className={styles.slideWrapper}
                animate={{
                  rotate: offset * rotationDegrees,
                  scale: isActive ? 1 : inactiveScale,
                  y: `${offset * yOffsetPercent}%`,
                }}
                transition={spring}
              >


                <div
                  className={styles.imageContainer}
                  style={{ borderRadius }}
                >
                  <img
                    src={item.src}
                    alt={item.alt ?? item.title ?? `Slide ${i + 1}`}
                    draggable={false}
                    onClick={() => clickToNavigate && goTo(i)}
                    className={`${styles.slideImage} ${!isActive ? styles.inactiveSlide : ""} ${clickToNavigate && !isActive ? styles.clickable : ""}`}
                    loading="lazy"
                    decoding="async"
                  />

                  {isActive && (
                    <m.div
                      layoutId="glow-ring"
                      className={styles.glowRing}
                      style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        boxShadow: "0 0 0 3px rgba(192, 57, 43, 0.7)",
                        borderRadius,
                      }}
                      transition={spring}
                    />
                  )}
                </div>

                <AnimatePresence>
                  <div className={styles.textContainer}>
                    {item.title && (
                      <m.span
                        key={`title-${i}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className={styles.titleLabel}
                      >
                        {item.title}
                      </m.span>
                    )}
                    {item.desc && (
                      <m.span
                        key={`desc-${i}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                        className={styles.descLabel}
                      >
                        {item.desc}
                      </m.span>
                    )}
                  </div>
                </AnimatePresence>
              </m.div>
            );
          })}
        </m.div>
      </div>

      {(showArrows || showDots) && (
        <div className={styles.controls}>
          {showArrows && (
            <button
              aria-label="Previous slide"
              onClick={toPrev}
              disabled={activeIndex === 0}
              className={styles.arrowButton}
            >
              <ChevronLeft className={styles.arrowIcon} />
            </button>
          )}

          {showDots && (
            <div className={styles.dotsContainer}>
              {items.map((_, i) => (
                <m.button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  animate={{
                    width: activeIndex === i ? 28 : 8,
                    opacity: activeIndex === i ? 1 : 0.35,
                  }}
                  transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                  className={styles.dot}
                />
              ))}
            </div>
          )}

          {showArrows && (
            <button
              aria-label="Next slide"
              onClick={toNext}
              disabled={activeIndex === items.length - 1}
              className={styles.arrowButton}
            >
              <ChevronRight className={styles.arrowIcon} />
            </button>
          )}
        </div>
      )}

      {showCounter && (
        <p className={styles.counter}>
          {activeIndex + 1} / {items.length}
        </p>
      )}
    </div>
  );
};

export default StylishCarousel;
