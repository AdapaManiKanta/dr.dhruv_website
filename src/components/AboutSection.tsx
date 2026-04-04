import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/hooks/useScrollReveal";

const AboutSection = () => (
  <section id="about" className="py-20 md:py-28 section-gradient relative overflow-hidden">
    <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />

    <div className="container relative">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <Reveal direction="left">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">About Expert Physio Care</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Expert Physio Care is dedicated to providing high-quality physiotherapy services at home. Led by <strong className="text-foreground">Manikanta</strong>, we focus on personalized care, faster recovery, and patient comfort. Our mission is to bring professional healthcare to your doorstep with trust and compassion.
            </p>
            <ul className="space-y-3">
              {["Years of clinical experience", "Patient-first approach", "Evidence-based treatment methods", "Continuous care & follow-ups"].map((item, i) => (
                <Reveal key={item} delay={i * 80} direction="left" distance={20}>
                  <li className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal direction="right">
          <div className="relative">
            <div className="aspect-square rounded-3xl glass-card-strong flex items-center justify-center overflow-hidden">
              <div className="text-center p-8 relative z-10">
                <div className="text-7xl font-bold text-primary font-serif">5+</div>
                <p className="text-muted-foreground mt-2 text-lg">Years of Trusted Service</p>
              </div>
              {/* Decorative circles */}
              <div className="absolute w-40 h-40 rounded-full border border-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbit pointer-events-none opacity-50" />
            </div>
            <div className="absolute -bottom-4 -right-4 glass-card-strong w-28 h-28 rounded-2xl flex items-center justify-center text-foreground font-bold text-lg animate-float shadow-lg text-center p-3">
              <span>500+ Patients</span>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default AboutSection;
