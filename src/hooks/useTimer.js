import { useState, useEffect } from 'react';

export const useTimer = (isActive, hasWon) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive && !hasWon) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, hasWon]);

  const resetTimer = () => setSeconds(0);

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return { seconds, formatTime, resetTimer };
};