'use client';

import { useState, useEffect } from 'react';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calculateTimeLeft = (timestamp: number): TimeLeft => {
  const difference = timestamp * 1000 - Date.now();
  let timeLeft: TimeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const useCountdown = (timestamp: number, refresh: number = 1000, splitChar: string = ':') => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(timestamp));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(timestamp));
    }, refresh);

    return () => clearInterval(timer);
  }, [timestamp, refresh]);

  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return 'end';
  }
  return `${timeLeft.days}d${splitChar} ${timeLeft.hours}h${splitChar} ${timeLeft.minutes}m${splitChar} ${timeLeft.seconds}s`;
};

export default useCountdown;
