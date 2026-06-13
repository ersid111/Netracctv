"use client";

import { useState, useEffect } from "react";

export function useExitIntent(delay = 3000) {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0 && !hasShown) {
          setShowPopup(true);
          setHasShown(true);
        }
      };

      document.addEventListener("mouseleave", handleMouseLeave);
      return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, hasShown]);

  const closePopup = () => setShowPopup(false);

  return { showPopup, closePopup };
}
