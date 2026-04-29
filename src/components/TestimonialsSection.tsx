import { Star, Quote } from "lucide-react";
import { Reveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    name: "Rajesh K.",
    text: "Excellent home service! Helped my father recover quickly after a stroke. Dr. Dhruva's expertise made all the difference.",
    rating: 5,
    location: "Hyderabad",
    initial: "R",
  },
  {
    name: "Priya S.",
    text: "My mother's mobility improved significantly within just three weeks. The personalised care plan and home visits made therapy so convenient.",
    rating: 5,
    location: "Secunderabad",
    initial: "P",
  },
  {
    name: "Suresh M.",
    text: "Affordable, effective, and incredibly professional. The home visits removed all barriers to regular physiotherapy. Highly recommended!",
    rating: 5,
    location: "Kukatpally",
    initial: "S",
  },
];

const directions = ["left", "right", "left"] as const;

const TestimonialsSection = () => (
  <section
    id="testimonials"
    className="py-16 md:py-28 pb-20 md:pb-28 relative overflow-hidden"
    style={{ background: "var(--gradient-section)" }}
  >
    <div className="hidden md:block absolute top-1/2 left-0 w-72 h-72 rounded-full pointer-events-none animate-glow"
      style={{ background: "radial-gradient(circle, hsla(38,95%,52%,0.06) 0%, transparent 70%)", transform: "translate(-40%,-50%)" }} />

    <div className="container relative">
      {/* Heading */}
      <Reveal direction="left" duration={900} distance={50}>
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 px-2">
          <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest text-[hsl(175,70%,32%)] mb-3 px-3 md:px-4 py-1 rounded-full bg-[hsla(175,70%,32%,0.1)]">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            What Our{" "}
            <span className="text-gradient-primary">Patients</span> Say
          </h2>
        </div>
      </Reveal>

      {/* 1-col mobile, 3-col desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 130} direction={directions[i]} duration={850} distance={45}>
            <div className="glass-card-strong rounded-2xl p-5 md:p-7 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[var(--shadow-card-hover)] transition-all duration-500 relative h-full group overflow-hidden cursor-default">
              {/* Quote icon */}
              <div className="absolute top-4 right-4 opacity-8 group-hover:opacity-15 transition-opacity duration-300">
                <Quote className="w-8 h-8 md:w-12 md:h-12 text-[hsl(175,70%,32%)]" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-3 md:mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-[hsl(38,95%,52%)] text-[hsl(38,95%,52%)]" />
                ))}
              </div>

              <p className="relative text-foreground/75 leading-relaxed mb-4 md:mb-6 italic text-sm md:text-base">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[hsl(175,70%,32%)] flex items-center justify-center text-white font-bold text-xs md:text-sm flex-shrink-0">
                  {t.initial}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-xs md:text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-[10px] md:text-xs">{t.location}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
