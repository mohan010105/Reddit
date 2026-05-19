/**
 * Skip to Content — Accessibility Navigation Component
 */

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-6 focus:py-3 focus:rounded-xl focus:bg-primary focus:text-primary-foreground focus:text-sm focus:font-semibold focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
    >
      Skip to main content
    </a>
  );
}

/**
 * Accessibility Announcer — Screen Reader Live Region
 * Used to announce dynamic content changes to screen readers
 */
import { useState, useCallback, createContext, useContext } from "react";

interface A11yAnnouncerContextValue {
  announce: (message: string, priority?: "polite" | "assertive") => void;
}

const A11yAnnouncerContext = createContext<A11yAnnouncerContextValue>({
  announce: () => {},
});

export function A11yAnnouncerProvider({ children }: { children: React.ReactNode }) {
  const [politeMessage, setPoliteMessage] = useState("");
  const [assertiveMessage, setAssertiveMessage] = useState("");

  const announce = useCallback((message: string, priority: "polite" | "assertive" = "polite") => {
    if (priority === "assertive") {
      setAssertiveMessage("");
      // Force re-render to trigger screen reader
      requestAnimationFrame(() => setAssertiveMessage(message));
    } else {
      setPoliteMessage("");
      requestAnimationFrame(() => setPoliteMessage(message));
    }
  }, []);

  return (
    <A11yAnnouncerContext.Provider value={{ announce }}>
      {children}
      {/* Visually hidden live regions */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {politeMessage}
      </div>
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {assertiveMessage}
      </div>
    </A11yAnnouncerContext.Provider>
  );
}

export function useAnnounce() {
  return useContext(A11yAnnouncerContext);
}

/**
 * Focus Trap Hook — Traps keyboard focus within a container
 * Used for modals, dialogs, and dropdown menus
 */
import { useEffect, useRef } from "react";

export function useFocusTrap<T extends HTMLElement>(active: boolean = true) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    // Focus the first element
    firstFocusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [active]);

  return containerRef;
}

/**
 * Keyboard Navigation Hook — Handles arrow key navigation in lists
 */
export function useKeyboardNavigation(
  items: HTMLElement[],
  options: { orientation?: "vertical" | "horizontal"; loop?: boolean } = {},
) {
  const { orientation = "vertical", loop = true } = options;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const current = document.activeElement as HTMLElement;
      const currentIndex = items.indexOf(current);
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;
      const prev = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
      const next = orientation === "vertical" ? "ArrowDown" : "ArrowRight";

      if (e.key === next) {
        e.preventDefault();
        nextIndex = currentIndex + 1;
        if (nextIndex >= items.length) nextIndex = loop ? 0 : items.length - 1;
      } else if (e.key === prev) {
        e.preventDefault();
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) nextIndex = loop ? items.length - 1 : 0;
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        nextIndex = items.length - 1;
      }

      items[nextIndex]?.focus();
    };

    items.forEach((item) => item.addEventListener("keydown", handleKeyDown));
    return () => items.forEach((item) => item.removeEventListener("keydown", handleKeyDown));
  }, [items, orientation, loop]);
}

/**
 * Reduced Motion Hook — Respects user's motion preferences
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}
