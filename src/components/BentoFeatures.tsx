import { Clock, Shield, Heart, Stethoscope, Users, Sparkles } from "lucide-react";
import { Reveal } from "@/hooks/useScrollReveal";

const features = [
  { icon: Clock, title: "Flexible Scheduling", desc: "Book sessions at times that work for you — mornings, evenings, or weekends.", span: "md:col-span-2", height: "min-h-[200px]" },
  { icon: Shield, title: "Safe & Hygienic", desc: "Strict hygiene protocols followed for every home visit.", span: "", height: "min-h-[200px]" },
  { icon: Heart, title: "Compassionate Care", desc: "We treat every patient like family, with empathy and dedication.", span: "", height: "min-h-[200px]" },
  { icon: Stethoscope, title: "Expert Assessment", desc: "Thorough evaluation and customized treatment plans for optimal recovery.", span: "", height: "min-h-[200px]" },
  { icon: Users, title: "Family Involvement", desc: "We educate family members on exercises and care techniques for better outcomes.", span: "md:col-span-2", height: "min-h-[200px]" },
];

const BentoFeatures = () => (
  <section className="py-20 md:py-28 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

    <div className="container relative">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">What Makes Us Different</h2>
          <p className="text-muted-foreground mt-4">Experience healthcare reimagined for your comfort and convenience.</p>
        </div>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 100} direction="scale" className={f.span}>
            <div className={`group glass-card rounded-2xl p-8 ${f.height} flex flex-col justify-between hover:shadow-[var(--shadow-elevated)] transition-all duration-500 hover:-translate-y-1 h-full`}>
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground font-serif mb-2">{f.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default BentoFeatures;
