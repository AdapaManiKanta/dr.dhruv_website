import { ShieldCheck, MapPin, IndianRupee, ClipboardList } from "lucide-react";
import { Reveal } from "@/hooks/useScrollReveal";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Certified Physiotherapists",
    desc: "All our therapists hold valid certifications with years of clinical experience.",
    color: "175 70% 32%",
    direction: "right" as const,
    delay: 0,
  },
  {
    icon: MapPin,
    title: "Doorstep Service",
    desc: "No travel required — we arrive at your home at a time that suits you.",
    color: "38 95% 52%",
    direction: "up" as const,
    delay: 100,
  },
  {
    icon: IndianRupee,
    title: "Affordable Packages",
    desc: "Quality healthcare that fits your budget with transparent pricing.",
    color: "175 60% 40%",
    direction: "up" as const,
    delay: 200,
  },
  {
    icon: ClipboardList,
    title: "Personalised Plans",
    desc: "Every treatment plan is custom-built around your unique recovery goals.",
    color: "200 65% 42%",
    direction: "left" as const,
    delay: 100,
  },
];

const WhyChooseUs = () => (
  <section
    id="why-us"
    className="py-16 md:py-28 pb-20 md:pb-28 relative overflow-hidden"
    style={{ background: "var(--gradient-section-alt)" }}
  >
    <div className="hidden md:block absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none animate-glow"
      style={{ background: "radial-gradient(circle, hsla(175,70%,50%,0.07) 0%, transparent 70%)", transform: "translate(-40%,30%)" }} />

    <div className="container relative">
      {/* Heading */}
      <Reveal direction="right" distance={50} duration={900}>
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16 px-2">
          <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest text-[hsl(175,70%,32%)] mb-3 px-3 md:px-4 py-1 rounded-full bg-[hsla(175,70%,32%,0.1)]">
            Why Choose Us
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            Trusted by{" "}
            <span className="text-gradient-primary">Families</span>{" "}
            Across the City
          </h2>
        </div>
      </Reveal>

      {/* 2-col on mobile, 4-col on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {reasons.map((r) => (
          <Reveal key={r.title} delay={r.delay} direction={r.direction} distance={40} duration={800}>
            <div className="text-center group glass-card rounded-2xl p-5 md:p-8 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[var(--shadow-card-hover)] transition-all duration-500 h-full relative overflow-hidden cursor-default">
              {/* Hover tint */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ background: `linear-gradient(135deg, hsla(${r.color},0.07) 0%, transparent 60%)` }}
              />

              <div
                className="relative w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl mx-auto flex items-center justify-center mb-3 md:mb-5 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `hsla(${r.color}, 0.12)`,
                  color: `hsl(${r.color})`,
                }}
              >
                <r.icon className="w-6 h-6 md:w-8 md:h-8" />
              </div>

              <h3 className="relative text-sm md:text-lg font-semibold text-foreground mb-1.5 md:mb-2.5 font-serif group-hover:text-[hsl(175,70%,28%)] transition-colors duration-300 leading-tight">
                {r.title}
              </h3>
              <p className="relative text-muted-foreground text-xs md:text-sm leading-relaxed hidden sm:block">
                {r.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
