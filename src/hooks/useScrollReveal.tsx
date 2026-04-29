import { useEffect, useRef, useState, CSSProperties } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  distance?: number;
  duration?: number;
}

export const useScrollReveal = (options: ScrollRevealOptions = {}) => {
  const {
    threshold = 0.12,
    rootMargin = "0px 0px -60px 0px",
    delay = 0,
    direction = "up",
    distance = 48,
    duration = 800,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const getTransform = (): string => {
    switch (direction) {
      case "up":    return `translateY(${distance}px)`;
      case "down":  return `translateY(-${distance}px)`;
      case "left":  return `translateX(${distance}px)`;   // slides in from right
      case "right": return `translateX(-${distance}px)`;  // slides in from left
      case "scale": return "scale(0.88)";
      case "fade":  return "scale(1.02)";
      default:      return `translateY(${distance}px)`;
    }
  };

  const style: CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? "translateY(0) translateX(0) scale(1)"
      : getTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: "opacity, transform",
  };

  return { ref, style, isVisible };
};

// Component wrapper for easy use
interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  distance?: number;
  duration?: number;
}

export const Reveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 48,
  duration = 800,
}: RevealProps) => {
  const { ref, style } = useScrollReveal({ delay, direction, distance, duration });
  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
};
