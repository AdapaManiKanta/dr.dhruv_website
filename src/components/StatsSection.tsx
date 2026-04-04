import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { Reveal } from "@/hooks/useScrollReveal";

const stats = [
  { value: 500, suffix: "+", label: "Patients Treated", icon: "👥" },
  { value: 5, suffix: "+", label: "Years Experience", icon: "📅" },
  { value: 98, suffix: "%", label: "Patient Satisfaction", icon: "⭐" },
  { value: 1000, suffix: "+", label: "Home Visits", icon: "🏠" },
];

const StatItem = ({ value, suffix, label, icon, isVisible }: { value: number; suffix: string; label: string; icon: string; isVisible: boolean }) => {
  const count = useCountUp(value, 2000, isVisible);
  return (
    <div className="text-center">
      <span className="text-3xl mb-3 block">{icon}</span>
      <div className="text-4xl md:text-5xl font-bold text-primary-foreground font-serif">
        {count}{suffix}
      </div>
      <p className="text-primary-foreground/70 mt-2 text-sm font-medium uppercase tracking-wider">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  const { ref, style, isVisible } = useScrollReveal({ threshold: 0.3 });

  return (
    <section className="py-16 md:py-20 relative overflow-hidden" style={{ background: "var(--gradient-primary)" }}>
      {/* Glass decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary-foreground/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-primary-foreground/5 blur-3xl" />
      </div>

      <div ref={ref} style={style} className="container relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((s) => (
            <StatItem key={s.label} {...s} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
