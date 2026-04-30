import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Activity, Star, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const PhysioScrollShowcase = () => {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-dark)" }}>
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <ContainerScroll
        titleComponent={
          <div className="mb-6 md:mb-10 px-4">
            {/* Badge */}
            <div className="flex justify-center mb-4 md:mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs md:text-sm font-semibold border border-white/20 uppercase tracking-widest">
                <Activity className="w-3.5 h-3.5 text-[hsl(175,70%,50%)]" />
                How It Works
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-5xl lg:text-[5.5rem] font-bold text-white font-serif leading-tight">
              Recovery at Your
              <span
                className="block mt-1"
                style={{
                  background: "var(--gradient-warm)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Doorstep
              </span>
            </h2>

            <p className="text-white/60 mt-4 md:mt-5 text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
              Book once — our expert team arrives at your home, fully equipped for your treatment session.
            </p>

            {/* Mini stats row */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 mt-6 md:mt-8">
              {[
                { icon: "🏅", label: "10+ Years Experience" },
                { icon: "👥", label: "500+ Patients" },
                { icon: "⭐", label: "5.0 Star Rating" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-white/8 border border-white/12 text-white/70 text-xs md:text-sm font-medium"
                >
                  <span>{s.icon}</span>
                  {s.label}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex justify-center mt-6 md:mt-8">
              <Button
                asChild
                size="lg"
                className="font-semibold px-8 py-5 rounded-xl text-white shadow-[0_0_32px_-4px_hsla(175,70%,40%,0.5)] hover:shadow-[0_0_44px_-4px_hsla(175,70%,40%,0.7)] transition-all duration-300"
                style={{ background: "var(--gradient-primary)" }}
              >
                <a href="#contact">
                  <CalendarCheck className="w-5 h-5 mr-2" />
                  Book a Session
                </a>
              </Button>
            </div>
          </div>
        }
      >
        {/* The 3D scroll card content — real physio session image */}
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&h=900&fit=crop&q=85"
            alt="Expert physiotherapist conducting a home visit session"
            className="w-full h-full object-cover object-center"
            draggable={false}
          />

          {/* Overlay with floating info cards */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Bottom info bar */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
            <div className="glass-dark rounded-xl px-4 py-2.5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[hsl(175,70%,32%)] flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white text-xs font-bold">Dr. Dhruva</p>
                <p className="text-white/60 text-[10px]">Senior Physiotherapist</p>
              </div>
            </div>

            <div className="glass-dark rounded-xl px-4 py-2.5 flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3 h-3 fill-[hsl(38,95%,60%)] text-[hsl(38,95%,60%)]" />
              ))}
              <span className="text-white text-xs font-bold ml-1">5.0</span>
            </div>
          </div>

          {/* Top-left session badge */}
          <div className="absolute top-4 left-4 glass-dark rounded-full px-3 py-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white text-xs font-semibold">Live Home Session</span>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
};

export default PhysioScrollShowcase;
