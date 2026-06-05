import { useState, useEffect, memo } from 'react'

const DEFAULT_TEXT = ["Mobile App Developer", "Full Stack Developer", "AI Engineer"];

const RoleTypewriter = memo(function RoleTypewriter({ 
  text = DEFAULT_TEXT, 
  typingSpeed = 75, 
  pauseDuration = 1500, 
  showCursor = true, 
  cursorCharacter = "|" 
}) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(showCursor);

  // Blinking cursor
  useEffect(() => {
    if (!showCursor) return;
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(interval);
  }, [showCursor]);

  // Typing logic
  useEffect(() => {
    const fullText = text[currentTextIndex];
    let typingTimer;

    if (isDeleting) {
      typingTimer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      }, typingSpeed / 2);
    } else {
      typingTimer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && currentText === fullText) {
      typingTimer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % text.length);
    }

    return () => clearTimeout(typingTimer);
  }, [currentText, isDeleting, currentTextIndex, text, typingSpeed, pauseDuration]);

  return (
    <span style={{ fontSize: '1rem', fontWeight: 500, color: '#e0e0e0' }}>
      {currentText}
      <span style={{ opacity: cursorVisible ? 1 : 0, transition: 'opacity 0.1s' }}>{cursorCharacter}</span>
    </span>
  );
});

export default RoleTypewriter;
