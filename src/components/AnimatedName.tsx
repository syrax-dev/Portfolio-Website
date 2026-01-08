import { useState, useEffect } from "react";

const names = ["SyraxDev", "Nayan Patel"];

export function AnimatedName() {
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentName = names[currentNameIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentName.length) {
          setDisplayText(currentName.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentNameIndex((prev) => (prev + 1) % names.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentNameIndex]);

  return (
    <span className="text-gradient font-bold">
      {displayText}
      <span className="text-primary animate-pulse-soft">|</span>
    </span>
  );
}
