import { Home, Brain, Bone, Zap, HeartHandshake, Dumbbell } from "lucide-react";
import { Reveal } from "@/hooks/useScrollReveal";

const services = [
  {
    icon: Home,
    title: "Home Physiotherapy",
    desc: "Personalised treatment at your home for maximum comfort and convenience.",
    color: "175 70% 32%",
    delay: 0,
    direction: "left" as const,
  },
  {
    icon: Brain,
    title: "Stroke Rehabilitation",
    desc: "Specialised programs to improve mobility, speech & cognitive recovery after stroke.",
    color: "200 65% 42%",
    delay: 100,
    direction: "up" as const,
  },
  {
    icon: Bone,
    title: "Post-Surgery Recovery",
    desc: "Faster healing with expert post-operative physiotherapy and guided rehabilitation.",
    color: "38 95% 52%",
    delay: 200,
    direction: "right" as const,
  },
  {
    icon: Zap,
    title: "Pain Relief Therapy",
    desc: "Effective, science-backed relief for back, neck, joint pain & chronic conditions.",
    color: "175 65% 42%",
    delay: 0,
    direction: "left" as const,
  },
  {
    icon: HeartHandshake,
    title: "Elderly Care",
    desc: "Safe, gentle rehabilitation designed specifically for senior patients.",
    color: "200 50% 40%",
    delay: 100,
    direction: "up" as const,
  },
  {
    icon: Dumbbell,
    title: "Sports Injury Rehab",
    desc: "Get back in the game faster with tailored sports injury recovery plans.",
    color: "38 80% 48%",
    delay: 200,
    direction: "right" as const,
  },
];

const ServicesSection = () => (
  <section
    id="services"
    className="py-16 md:py-28 pb-20 md:pb-28 relative overflow-hidden"
    style={{ background: "var(--gradient-section)" }}
  >
    {/* Orbs */}
    <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none animate-glow"
      style={{ background: "radial-gradient(circle, hsla(175,70%,50%,0.07) 0%, transparent 65%)", transform: "translate(30%,-30%)" }} />

    <div className="container relative">
      {/* Heading */}
      <Reveal direction="left" distance={50} duration={900}>
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16 px-2">
          <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest text-[hsl(175,70%,32%)] mb-3 px-3 md:px-4 py-1 rounded-full bg-[hsla(175,70%,32%,0.1)]">
            Our Services
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            Comprehensive Care{" "}
            <span className="text-gradient-primary">at Home</span>
          </h2>
          <p className="text-muted-foreground mt-3 md:mt-4 text-sm md:text-base leading-relaxed">
            Professional physiotherapy services tailored to your specific needs, delivered right to your doorstep.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {services.map((s) => (
          <Reveal key={s.title} delay={s.delay} direction={s.direction} distance={40} duration={800}>
            <div className="group glass-card rounded-2xl p-5 md:p-7 hover:shadow-[var(--shadow-card-hover)] transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 h-full relative overflow-hidden cursor-default flex items-start gap-4 md:block">
              {/* Mobile: side-by-side icon + text; Desktop: stacked */}
              <div
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex-shrink-0 flex items-center justify-center md:mb-5 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `hsla(${s.color}, 0.12)`,
                  color: `hsl(${s.color})`,
                }}
              >
                <s.icon className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div className="flex-1 md:flex-none">
                <h3 className="text-base md:text-xl font-semibold text-foreground font-serif mb-1 md:mb-2.5 group-hover:text-[hsl(175,70%,28%)] transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
              {/* Bottom bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"
                style={{ background: `linear-gradient(90deg, hsl(${s.color}), transparent)` }}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
