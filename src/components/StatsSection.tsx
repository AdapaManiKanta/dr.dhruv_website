import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { value: 500,  suffix: "+", label: "Patients Treated",    icon: "👥", delay: 0   },
  { value: 10,   suffix: "+", label: "Years Experience",    icon: "🏅", delay: 150 },
  { value: 98,   suffix: "%", label: "Satisfaction",        icon: "⭐", delay: 300 },
  { value: 1200, suffix: "+", label: "Home Visits",         icon: "🏠", delay: 450 },
];

const StatItem = ({
  value, suffix, label, icon, isVisible, delay,
}: {
  value: number; suffix: string; label: string; icon: string; isVisible: boolean; delay: number;
}) => {
  const count = useCountUp(value, 2200, isVisible);
  return (
    <div
      className="text-center group px-2"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <div className="text-2xl md:text-4xl mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif leading-none">
        {count}
        <span className="text-[hsl(38,95%,65%)]">{suffix}</span>
      </div>
      <p className="text-white/65 mt-2 md:mt-3 text-[10px] md:text-xs font-semibold uppercase tracking-widest leading-tight">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      className="py-14 md:py-24 relative overflow-hidden"
      style={{ background: "var(--gradient-primary-vivid, var(--gradient-primary))" }}
    >
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-white/5 blur-3xl" />
        <div className="hidden md:block absolute top-0 right-0 w-48 h-48 rounded-full animate-glow"
          style={{ background: "radial-gradient(circle, hsla(38,95%,60%,0.2) 0%, transparent 70%)" }} />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(hsla(0,0%,100%,0.8) 1px, transparent 1px), linear-gradient(90deg, hsla(0,0%,100%,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div ref={ref} className="container relative">
        {/* 2-col on mobile, 4-col on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          {stats.map((s) => (
            <StatItem key={s.label} {...s} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
