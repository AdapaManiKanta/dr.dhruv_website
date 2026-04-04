import { Phone, CalendarCheck, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParallax } from "@/hooks/useParallax";
import heroImg from "@/assets/hero-physio.jpg";

const HeroSection = () => {
  const parallaxOffset = useParallax(0.3);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <img
        src={heroImg}
        alt="Physiotherapist treating patient at home"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
        style={{ transform: `translateY(${parallaxOffset}px) scale(1.1)` }}
      />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      
      {/* Floating decorative orbs */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-glow pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-accent/10 blur-3xl animate-glow pointer-events-none" style={{ animationDelay: "1.5s" }} />

      <div className="container relative z-10 py-20">
        <div className="max-w-2xl animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 backdrop-blur-md text-primary-foreground text-sm font-medium mb-6 border border-primary-foreground/20">
            🏡 Professional Home Physiotherapy
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            Expert Physiotherapy
            <span className="block mt-2">
              at Your <span className="text-accent">Home</span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 leading-relaxed max-w-xl">
            Stroke Rehab, Pain Relief &amp; Post-Surgery Recovery — delivered with care right at your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-base shadow-lg group">
              <a href="#contact">
                <CalendarCheck className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" /> Book Appointment
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm">
              <a href="tel:+918309506151">
                <Phone className="w-5 h-5 mr-2" /> Call Now
              </a>
            </Button>
          </div>
          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 mt-10">
            {["✅ Certified Therapists", "🏠 Home Service", "💰 Affordable", "⭐ 500+ Patients"].map((b) => (
              <span key={b} className="px-3 py-1.5 rounded-full bg-primary-foreground/10 backdrop-blur-md text-primary-foreground text-sm font-medium border border-primary-foreground/15">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-primary-foreground/60 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 rounded-full bg-primary-foreground/60 animate-fade-in-up" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
