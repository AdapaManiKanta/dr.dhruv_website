import { Home, Brain, Bone, Zap, HeartHandshake } from "lucide-react";
import { Reveal } from "@/hooks/useScrollReveal";

const services = [
  { icon: Home, title: "Home Physiotherapy", desc: "Personalized treatment at your home for maximum comfort and convenience.", color: "174 62% 38%" },
  { icon: Brain, title: "Stroke Rehabilitation", desc: "Improve mobility, speech & recovery with specialized stroke rehab programs.", color: "200 60% 45%" },
  { icon: Bone, title: "Post-Surgery Recovery", desc: "Faster healing support with expert post-operative physiotherapy care.", color: "32 90% 55%" },
  { icon: Zap, title: "Pain Relief Therapy", desc: "Effective relief for back pain, neck pain, joint pain & chronic conditions.", color: "174 50% 48%" },
  { icon: HeartHandshake, title: "Elderly Care", desc: "Safe, gentle & comfortable rehabilitation designed for senior patients.", color: "200 40% 40%" },
];

const ServicesSection = () => (
  <section id="services" className="py-20 md:py-28 section-gradient relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

    <div className="container relative">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Comprehensive Care at Home</h2>
          <p className="text-muted-foreground mt-4">Professional physiotherapy services tailored to your specific needs and delivered at your doorstep.</p>
        </div>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 100} direction={i % 2 === 0 ? "up" : "scale"}>
            <div className="group glass-card rounded-2xl p-7 hover:shadow-[var(--shadow-elevated)] transition-all duration-500 hover:-translate-y-2 h-full">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                style={{
                  background: `hsla(${s.color}, 0.12)`,
                  color: `hsl(${s.color})`,
                }}
              >
                <s.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground font-serif mb-2">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
