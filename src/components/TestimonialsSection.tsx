import { Star, Quote } from "lucide-react";
import { Reveal } from "@/hooks/useScrollReveal";

const testimonials = [
  { name: "Rajesh K.", text: "Excellent home service, helped my father recover quickly after stroke. Very professional and caring.", rating: 5, location: "Hyderabad" },
  { name: "Priya S.", text: "Professional and caring physiotherapist. My mother's mobility improved significantly within weeks.", rating: 5, location: "Secunderabad" },
  { name: "Suresh M.", text: "Affordable and effective. The home visits made it so convenient for our family. Highly recommended!", rating: 5, location: "Kukatpally" },
];

const TestimonialsSection = () => (
  <section id="testimonials" className="py-20 md:py-28 relative overflow-hidden">
    <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full bg-accent/5 blur-3xl -translate-x-1/2 pointer-events-none" />

    <div className="container relative">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">What Our Patients Say</h2>
        </div>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 150} direction="up">
            <div className="glass-card-strong rounded-2xl p-7 hover:-translate-y-2 transition-all duration-500 relative h-full">
              <Quote className="w-10 h-10 text-primary/10 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-5 italic relative z-10">"{t.text}"</p>
              <div>
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-muted-foreground text-sm">{t.location}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
