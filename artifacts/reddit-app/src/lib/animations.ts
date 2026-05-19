/**
 * Framer Motion Animation Presets & Utilities
 * Reusable animation variants for consistent UX
 */

// ─── Page Transitions ─────────────────────────────────────
export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: "easeOut" } as any,
};

export const pageSlideIn = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.25, ease: "easeOut" } as any,
};

// ─── Fade Variants ────────────────────────────────────────
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 } as any,
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" } as any,
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" } as any,
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3, ease: "easeOut" } as any,
};

// ─── Stagger Containers ──────────────────────────────────
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    } as any,
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" } as any,
};

export const staggerFadeItem = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 } as any,
};

// ─── Card Animations ──────────────────────────────────────
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.01, y: -2, transition: { duration: 0.2, ease: "easeOut" } as any },
  tap: { scale: 0.99, transition: { duration: 0.1 } as any },
};

export const cardReveal = {
  initial: { opacity: 0, y: 24, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.4, ease: "easeOut" } as any,
};

// ─── Modal/Dialog ─────────────────────────────────────────
export const modalOverlay = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 } as any,
};

export const modalContent = {
  initial: { opacity: 0, scale: 0.95, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 5 },
  transition: { duration: 0.25, ease: "easeOut" } as any,
};

// ─── Slide Panels ─────────────────────────────────────────
export const slideInRight = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
  transition: { type: "spring", damping: 30, stiffness: 300 } as any,
};

export const slideInLeft = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { type: "spring", damping: 30, stiffness: 300 } as any,
};

export const slideInBottom = {
  initial: { y: "100%" },
  animate: { y: 0 },
  exit: { y: "100%" },
  transition: { type: "spring", damping: 30, stiffness: 300 } as any,
};

// ─── Micro-interactions ───────────────────────────────────
export const buttonPress = {
  whileTap: { scale: 0.97 },
  transition: { duration: 0.1 },
};

export const iconSpin = {
  animate: { rotate: 360 },
  transition: { duration: 1, repeat: Infinity, ease: "linear" },
};

export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
  },
  transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
};

export const shimmer = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
  },
  transition: { duration: 1.5, repeat: Infinity, ease: "linear" },
};

// ─── Vote Animation ──────────────────────────────────────
export const voteUp = {
  initial: { scale: 1 },
  animate: { scale: [1, 1.4, 1], y: [0, -4, 0] },
  transition: { duration: 0.3 },
};

export const voteDown = {
  initial: { scale: 1 },
  animate: { scale: [1, 1.4, 1], y: [0, 4, 0] },
  transition: { duration: 0.3 },
};

// ─── Notification Badge ──────────────────────────────────
export const notificationPop = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: "spring", damping: 15, stiffness: 400 },
};

// ─── Skeleton Shimmer ─────────────────────────────────────
export const skeletonShimmer = {
  animate: {
    opacity: [0.4, 0.7, 0.4],
  },
  transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
};

// ─── Reduced Motion Support ──────────────────────────────
export function getReducedMotionVariant(variant: Record<string, any>) {
  if (typeof window === "undefined") return variant;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.01 },
    };
  }
  return variant;
}

// ─── Spring Configs ───────────────────────────────────────
export const springs = {
  gentle: { type: "spring" as const, damping: 20, stiffness: 100 },
  snappy: { type: "spring" as const, damping: 25, stiffness: 300 },
  bouncy: { type: "spring" as const, damping: 10, stiffness: 200 },
  smooth: { type: "spring" as const, damping: 30, stiffness: 200 },
};
