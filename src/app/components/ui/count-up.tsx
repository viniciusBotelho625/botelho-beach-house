"use client";

import React, { useState, useEffect, useRef } from "react";

interface CountUpProps {
  start?: number;
  end: number;
  duration?: number; // in seconds
  delay?: number; // in seconds before starting
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string; // thousands separator
  decimalPoint?: string; // decimal point character
  onComplete?: () => void;
  className?: string;
  startCounting?: boolean; // Start counting when in viewport
}

const CountUp: React.FC<CountUpProps> = ({
  start = 0,
  end,
  duration = 2,
  delay = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ",",
  decimalPoint = ".",
  onComplete,
  className = "",
  startCounting = true,
}) => {
  const [value, setValue] = useState<number>(start);
  const [hasStarted, setHasStarted] = useState<boolean>(!startCounting);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const elementRef = useRef<HTMLSpanElement>(null);

  const formatNumber = (num: number) => {
    const parts = num.toFixed(decimals).split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1] ? `${decimalPoint}${parts[1]}` : "";
    const withSeparator = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      separator
    );
    return `${prefix}${withSeparator}${decimalPart}${suffix}`;
  };

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }
    const elapsed = (timestamp - startTimeRef.current) / 1000; // seconds
    const progress = Math.min(elapsed / duration, 1);
    const current = start + (end - start) * progress;
    setValue(current);

    if (progress < 1) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      // at end
      if (onComplete) onComplete();
    }
  };

  useEffect(() => {
    if (!startCounting || hasStarted) {
      // Start immediately if startCounting is false or already started
      const delayMs = delay * 1000;
      const timeout = setTimeout(() => {
        requestRef.current = requestAnimationFrame(animate);
      }, delayMs);

      return () => {
        clearTimeout(timeout);
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStarted, end, start, duration, delay, startCounting]);

  // Intersection Observer for viewport detection
  useEffect(() => {
    if (!startCounting || hasStarted || !elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1, // Start when 10% of the element is visible
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [startCounting, hasStarted]);

  return (
    <span ref={elementRef} className={className}>
      {formatNumber(value)}
    </span>
  );
};

export default CountUp;
export { CountUp };
