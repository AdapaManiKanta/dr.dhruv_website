import { Clock, Shield, Heart, Stethoscope, Users } from "lucide-react";
import { Reveal } from "@/hooks/useScrollReveal";

const features = [
  {
    icon: Clock,
    title: "Flexible Scheduling",
    desc: "Book sessions at times that work for you — mornings, evenings, or weekends.",
    span: "md:col-span-2",
    color: "175 70% 32%",
    dir: "left" as const,
  },
  {
    icon: Shield,
    title: "Safe & Hygienic",
    desc: "Strict hygiene protocols followed for every home visit.",
    span: "",
    color: "200 65% 42%",
    dir: "up" as const,
  },
  {
    icon: Heart,
    title: "Compassionate Care",
    desc: "We treat every patient like family, with empathy and dedication.",
    span: "",
    color: "330 65% 48%",
    dir: "right" as const,
  },
  {
    icon: Stethoscope,
    title: "Expert Assessment",
    desc: "Thorough evaluation and customised treatment plans for optimal recovery.",
    span: "",
    color: "38 90% 46%",
    dir: "left" as const,
  },
  {
    icon: Users,
    title: "Family Involvement",
    desc: "We educate family members on exercises and care techniques for better outcomes.",
    span: "md:col-span-2",
    color: "175 65% 42%",
    dir: "right" as const,
  },
];

const BentoFeatures = () => (
  <section
    className="py-16 md:py-28 pb-20 md:pb-28 relative overflow-hidden"
    style={{ background: "var(--gradient-section)" }}
  >
    <div className="hidden md:block absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none animate-glow"
      style={{ background: "radial-gradient(circle, hsla(38,95%,52%,0.06) 0%, transparent 70%)" }} />

    <div className="container relative">
      <Reveal direction="up" distance={45} duration={900}>
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 px-2">
          <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest text-[hsl(175,70%,32%)] mb-3 px-3 md:px-4 py-1 rounded-full bg-[hsla(175,70%,32%,0.1)]">
            Features
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            What Makes Us{" "}
            <span className="text-gradient-primary">Different</span>
          </h2>
          <p className="text-muted-foreground mt-3 md:mt-4 text-sm md:text-base leading-relaxed">
            Experience healthcare reimagined for your comfort and convenience.
          </p>
        </div>
      </Reveal>

      {/* Mobile: 1-col; md: bento 3-col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 90} direction={f.dir} distance={40} duration={800} className={f.span}>
            <div className="group glass-card rounded-xl md:rounded-2xl p-5 md:p-8 min-h-[140px] md:min-h-[200px] flex flex-col justify-between hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1 transition-all duration-500 h-full relative overflow-hidden cursor-default">
              {/* Hover tint */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl md:rounded-2xl"
                style={{ background: `linear-gradient(135deg, hsla(${f.color},0.06) 0%, transparent 60%)` }}
              />
              <div className="relative">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `hsla(${f.color},0.12)`, color: `hsl(${f.color})` }}
                >
                  <f.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-sm md:text-lg font-semibold text-foreground font-serif mb-1.5 md:mb-2 group-hover:text-[hsl(175,70%,28%)] transition-colors duration-300">
                  {f.title}
                </h3>
              </div>
              <p className="relative text-muted-foreground text-xs md:text-sm leading-relaxed">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default BentoFeatures;
