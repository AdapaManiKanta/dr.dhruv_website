import { CheckCircle2, Award, Users } from "lucide-react";
import { Reveal } from "@/hooks/useScrollReveal";

const highlights = [
  "10+ years of clinical experience",
  "Patient-first, evidence-based approach",
  "Certified & continuously trained team",
  "Comprehensive home visit programmes",
  "Personalised recovery tracking",
  "Post-session follow-up care",
];

const AboutSection = () => (
  <section
    id="about"
    className="py-16 md:py-28 pb-20 md:pb-28 relative overflow-hidden"
    style={{ background: "var(--gradient-section)" }}
  >
    <div className="hidden md:block absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full pointer-events-none animate-glow"
      style={{ background: "radial-gradient(circle, hsla(175,70%,50%,0.07) 0%, transparent 70%)", transform: "translate(35%,-50%)" }} />

    <div className="container relative">
      <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">

        {/* Left: Text */}
        <Reveal direction="left" distance={50} duration={900}>
          <div>
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest text-[hsl(175,70%,32%)] mb-3 md:mb-4 px-3 md:px-4 py-1 rounded-full bg-[hsla(175,70%,32%,0.1)]">
              About Us
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4 md:mb-6 leading-tight">
              About{" "}
              <span className="text-gradient-primary">Expert Physio</span>{" "}
              Care
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5 md:mb-6 text-sm md:text-base">
              Expert Physio Care is Hyderabad's most trusted home physiotherapy
              service. Led by{" "}
              <strong className="text-foreground font-semibold">Dr. Dhruva</strong>,
              a Senior Physiotherapist with{" "}
              <strong className="text-foreground font-semibold">10+ years of clinical experience</strong>,
              our team brings professional, compassionate care directly to your doorstep.
            </p>

            {/* Highlights — 2-col grid on mobile */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-2.5">
              {highlights.map((item, i) => (
                <Reveal key={item} delay={i * 60} direction="right" distance={20} duration={700}>
                  <li className="flex items-start gap-2 group">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[hsl(175,70%,32%)] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-foreground/80 text-xs md:text-sm leading-relaxed">{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Right: Stats card */}
        <Reveal direction="right" distance={50} duration={900}>
          <div className="relative mt-4 md:mt-0">
            {/* Main gradient card */}
            <div className="rounded-2xl md:rounded-3xl overflow-hidden relative" style={{ background: "var(--gradient-lead-card)" }}>
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "radial-gradient(circle at 20% 20%, white 0%, transparent 50%), radial-gradient(circle at 80% 80%, white 0%, transparent 50%)",
                }} />
              <div className="relative z-10 p-7 md:p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 md:mb-6 border-2 border-white/30">
                  <Award className="w-8 h-8 md:w-12 md:h-12 text-white" />
                </div>
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-serif leading-none">10+</div>
                <p className="text-white/80 mt-2 md:mt-3 text-sm md:text-base font-medium">Years of Trusted Service</p>

                {/* Mini stats row */}
                <div className="mt-5 md:mt-6 flex items-center gap-4 md:gap-6">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-white font-serif">500+</div>
                    <p className="text-white/65 text-[10px] md:text-xs mt-0.5 uppercase tracking-wider">Patients</p>
                  </div>
                  <div className="w-px h-8 bg-white/20" />
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-white font-serif">4</div>
                    <p className="text-white/65 text-[10px] md:text-xs mt-0.5 uppercase tracking-wider">Specialists</p>
                  </div>
                  <div className="w-px h-8 bg-white/20" />
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-white font-serif">98%</div>
                    <p className="text-white/65 text-[10px] md:text-xs mt-0.5 uppercase tracking-wider">Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-3 md:-bottom-5 md:-left-5 glass-card-strong rounded-xl md:rounded-2xl px-4 py-3 flex items-center gap-2.5 animate-float shadow-lg">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-[hsla(175,70%,32%,0.12)] flex items-center justify-center">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-[hsl(175,70%,32%)]" />
              </div>
              <div>
                <p className="text-[11px] md:text-xs font-bold text-foreground">Team of Experts</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">Certified Professionals</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default AboutSection;
