/**
 * Page Transition Wrapper Component
 * Provides smooth page transitions using Framer Motion
 */
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { pageTransition } from "@/lib/animations";
import { useReducedMotion } from "@/components/Accessibility";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger Container — Animates children in sequence
 */
import { staggerContainer, staggerItem } from "@/lib/animations";

interface StaggerListProps {
  children: ReactNode;
  className?: string;
}

export function StaggerList({ children, className = "" }: StaggerListProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Animated Counter — Smoothly counts up to a target number
 */
import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  formatter?: (n: number) => string;
}

export function AnimatedCounter({
  target,
  duration = 1000,
  className = "",
  prefix = "",
  suffix = "",
  formatter,
}: AnimatedCounterProps) {
  const [current, setCurrent] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setCurrent(target);
      return;
    }

    const startTime = Date.now();
    const startValue = current;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(startValue + (target - startValue) * eased);
      setCurrent(value);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [target, duration]);

  const display = formatter ? formatter(current) : current.toLocaleString();

  return (
    <span className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
