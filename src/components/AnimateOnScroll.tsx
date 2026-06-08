"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";

type Variant = "fade-up" | "fade-left" | "fade-right" | "scale" | "fade";

interface AnimateOnScrollProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  once?: boolean;
}

const variants = {
  "fade-up":    { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } },
  "fade-left":  { hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0 } },
  "fade-right": { hidden: { opacity: 0, x: 32 }, visible: { opacity: 1, x: 0 } },
  "scale":      { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1 } },
  "fade":       { hidden: { opacity: 0 }, visible: { opacity: 1 } },
};

export default function AnimateOnScroll({
  children,
  variant = "fade-up",
  delay = 0,
  className = "",
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Stagger container — wraps children that stagger in */
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: staggerDelay } } }}
    >
      {children}
    </motion.div>
  );
}

/* Child item used inside StaggerContainer */
export function StaggerItem({
  children,
  className = "",
  variant = "fade-up",
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: variants[variant].hidden,
        visible: { ...variants[variant].visible, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* Counter animation */
export function CountUp({
  end,
  suffix = "",
  duration = 2,
  className = "",
}: {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, end, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [isInView, end, duration, count]);

  return (
    <span ref={ref} className={className}>
      {display}{suffix}
    </span>
  );
}
