import { ShieldCheck, MapPin, IndianRupee, ClipboardList } from "lucide-react";
import { Reveal } from "@/hooks/useScrollReveal";

const reasons = [
  { icon: ShieldCheck, title: "Certified Physiotherapists", desc: "All our therapists are licensed and experienced professionals.", gradient: "from-primary/10 to-primary/5" },
  { icon: MapPin, title: "Doorstep Service", desc: "No travel needed — we come to your home at your convenience.", gradient: "from-accent/10 to-accent/5" },
  { icon: IndianRupee, title: "Affordable Packages", desc: "Quality healthcare that fits your budget with flexible plans.", gradient: "from-primary/10 to-secondary/50" },
  { icon: ClipboardList, title: "Personalized Care Plans", desc: "Every treatment plan is custom-built for your recovery goals.", gradient: "from-accent/10 to-primary/5" },
];

const WhyChooseUs = () => (
  <section id="why-us" className="py-20 md:py-28 relative overflow-hidden">
    <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

    <div className="container relative">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Trusted by Families Across the City</h2>
        </div>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((r, i) => (
          <Reveal key={r.title} delay={i * 120} direction="up">
            <div className={`text-center group glass-card rounded-2xl p-8 hover:-translate-y-2 transition-all duration-500 h-full bg-gradient-to-br ${r.gradient}`}>
              <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center bg-primary/10 text-primary mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <r.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{r.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
