import { Phone, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParallax } from "@/hooks/useParallax";
import heroImg from "@/assets/hero-physio.jpg";

const trustBadges = [
  "✅ Certified Therapists",
  "🏠 Doorstep Service",
  "💰 Affordable",
  "⭐ 500+ Patients",
  "🏥 10+ Years",
];

const HeroSection = () => {
  const parallaxOffset = useParallax(0.2);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden"
    >
      {/* Background */}
      <img
        src={heroImg}
        alt="Expert physiotherapist providing home physiotherapy treatment"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
        style={{ transform: `translateY(${parallaxOffset}px) scale(1.1)` }}
      />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />

      {/* Orbs — hidden on small mobile for performance */}
      <div className="hidden sm:block absolute top-24 right-8 md:right-16 w-48 md:w-80 h-48 md:h-80 rounded-full pointer-events-none animate-glow"
        style={{ background: "radial-gradient(circle, hsla(175,70%,50%,0.18) 0%, transparent 70%)" }} />
      <div className="hidden sm:block absolute bottom-24 left-8 md:left-12 w-40 md:w-56 h-40 md:h-56 rounded-full pointer-events-none animate-glow"
        style={{ background: "radial-gradient(circle, hsla(38,95%,52%,0.18) 0%, transparent 70%)", animationDelay: "1.5s" }} />

      {/* Content */}
      <div className="container relative z-10 py-10 md:py-20 pb-24 md:pb-20">
        <div className="max-w-2xl">

          {/* Pill */}
          <div className="animate-fade-in-right" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs md:text-sm font-medium mb-4 md:mb-6 border border-white/20">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[hsl(175,70%,50%)] animate-pulse-gentle" />
              🏡 Professional Home Physiotherapy · Hyderabad
            </span>
          </div>

          {/* Heading — words cascade right to left */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-4 md:mb-6 tracking-tight">
            <span className="block animate-fade-in-right" style={{ animationDelay: "0.25s", animationFillMode: "both" }}>
              Expert
            </span>
            <span className="block animate-fade-in-right" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
              Physiotherapy
            </span>
            <span className="block animate-fade-in-right" style={{ animationDelay: "0.55s", animationFillMode: "both" }}>
              at Your{" "}
              <span
                style={{
                  background: "var(--gradient-warm)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Home
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-base md:text-lg lg:text-xl text-white/80 mb-6 md:mb-8 leading-relaxed max-w-xl animate-fade-in-up"
            style={{ animationDelay: "0.7s", animationFillMode: "both" }}
          >
            Stroke Rehab, Pain Relief & Post-Surgery Recovery — delivered with
            compassion right at your doorstep.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col xs:flex-row gap-3 animate-fade-in-up"
            style={{ animationDelay: "0.85s", animationFillMode: "both" }}
          >
            <Button
              asChild
              size="lg"
              className="text-sm md:text-base font-semibold px-6 md:px-8 py-5 md:py-6 rounded-xl bg-[hsl(175,70%,32%)] hover:bg-[hsl(175,75%,28%)] text-white shadow-[0_0_28px_-4px_hsla(175,70%,40%,0.6)] transition-all duration-300 group w-full xs:w-auto"
            >
              <a href="#contact">
                <CalendarCheck className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:scale-110 transition-transform" />
                Book Appointment
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-sm md:text-base font-semibold px-6 md:px-8 py-5 md:py-6 rounded-xl border-white/30 text-white bg-white/10 hover:bg-white/18 backdrop-blur-sm transition-all duration-300 w-full xs:w-auto"
            >
              <a href="tel:+918309506151">
                <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Call Now
              </a>
            </Button>
          </div>

          {/* Trust badges — cascade */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-10">
            {trustBadges.map((badge, i) => (
              <span
                key={badge}
                className="px-2.5 md:px-3.5 py-1 md:py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[11px] md:text-xs font-medium border border-white/15 animate-badge-pop"
                style={{ animationDelay: `${1.0 + i * 0.12}s`, animationFillMode: "both" }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Floating stat cards — desktop only */}
        <div
          className="hidden lg:flex absolute right-8 bottom-24 flex-col items-center gap-4 animate-float"
          style={{ animationDelay: "0.5s" }}
        >
          {[
            { num: "10+", label: "Years Exp." },
            { num: "500+", label: "Patients" },
            { num: "98%", label: "Satisfaction" },
          ].map((s, i) => (
            <div
              key={s.label}
              className="glass-dark rounded-2xl px-5 py-3.5 text-center border border-white/10 animate-fade-in-left"
              style={{ animationDelay: `${1.3 + i * 0.15}s`, animationFillMode: "both" }}
            >
              <div className="text-2xl font-bold text-white font-serif">{s.num}</div>
              <div className="text-white/60 text-xs mt-0.5 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-white/50 text-[10px] md:text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-white/25 flex items-start justify-center p-1">
          <div className="w-1 h-2.5 md:w-1.5 md:h-3 rounded-full bg-white/50 animate-fade-in-up" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
