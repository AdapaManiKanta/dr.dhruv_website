import React from "react";
import { motion } from "framer-motion";

// ─── Types ─────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

// ─── Exported fade-up variants (used by HeroSection) ──────────
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.18 + 0.4, duration: 0.75, ease: "easeOut" as const },
  }),
};

export interface AetherFlowHeroProps {
  children?: React.ReactNode;
  className?: string;
}

// ─── Component ─────────────────────────────────────────────────
const AetherFlowHero: React.FC<AetherFlowHeroProps> = ({ children, className = "" }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let rafId: number;
    let particles: Particle[] = [];
    let mouse = { x: -9999, y: -9999 };
    const MOUSE_RADIUS = 180;

    /* ── size canvas to full viewport ── */
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    /* ── create particles ── */
    const initParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x:    Math.random() * canvas.width,
          y:    Math.random() * canvas.height,
          vx:   (Math.random() - 0.5) * 0.6,
          vy:   (Math.random() - 0.5) * 0.6,
          size: Math.random() * 2.5 + 1,
        });
      }
    };

    /* ── draw gradient background ── */
    const drawBg = () => {
      const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      g.addColorStop(0,   "hsl(220,40%,5%)");
      g.addColorStop(0.4, "hsl(185,60%,8%)");
      g.addColorStop(1,   "hsl(220,40%,6%)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    /* ── update & draw one particle ── */
    const updateParticle = (p: Particle) => {
      /* bounce off walls */
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      /* repel from mouse */
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
        p.x += (dx / dist) * force * 4;
        p.y += (dy / dist) * force * 4;
      }

      p.x += p.vx;
      p.y += p.vy;

      /* draw particle */
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(56, 220, 190, 0.9)";   /* bright teal */
      ctx.fill();
    };

    /* ── draw connecting lines ── */
    const connectParticles = () => {
      const maxDist = 140;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.55;

            /* gold lines near mouse, teal elsewhere */
            const mdx = particles[a].x - mouse.x;
            const mdy = particles[a].y - mouse.y;
            const nearMouse = Math.sqrt(mdx * mdx + mdy * mdy) < MOUSE_RADIUS;

            ctx.strokeStyle = nearMouse
              ? `rgba(255, 200, 80, ${opacity + 0.25})`
              : `rgba(56, 220, 190, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    /* ── animation loop ── */
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      drawBg();
      particles.forEach(updateParticle);
      connectParticles();
    };

    /* ── event listeners ── */
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("resize",    resize,      { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseout",  onMouseLeave);

    resize();   // sets canvas size + creates particles
    animate();  // starts loop

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout",  onMouseLeave);
    };
  }, []);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Canvas IS the background — renders gradient + particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Content sits above canvas */}
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export { AetherFlowHero };
export default AetherFlowHero;
