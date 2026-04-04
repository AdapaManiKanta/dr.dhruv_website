import { Reveal } from "@/hooks/useScrollReveal";

const team = [
  { name: "Manikanta", role: "Lead Physiotherapist & Founder", emoji: "👨‍⚕️", bio: "5+ years of clinical experience specializing in stroke rehabilitation and home care." },
  { name: "Dr. Priya", role: "Senior Physiotherapist", emoji: "👩‍⚕️", bio: "Expert in post-surgery recovery and pain management with a patient-first approach." },
  { name: "Dr. Ravi", role: "Sports Physiotherapist", emoji: "🏃‍♂️", bio: "Specialized in sports injuries and elderly care rehabilitation programs." },
];

const TeamSection = () => (
  <section id="team" className="py-20 md:py-28 section-gradient relative overflow-hidden">
    <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

    <div className="container relative">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Team</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Meet Our Experts</h2>
          <p className="text-muted-foreground mt-4">Dedicated professionals committed to your recovery and well-being.</p>
        </div>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((t, i) => (
          <Reveal key={t.name} delay={i * 150} direction="up">
            <div className="glass-card-strong rounded-2xl p-8 text-center hover:-translate-y-2 transition-all duration-500 group h-full">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 text-5xl group-hover:scale-110 transition-transform duration-300">
                {t.emoji}
              </div>
              <h3 className="text-xl font-semibold text-foreground font-serif">{t.name}</h3>
              <p className="text-primary text-sm font-medium mt-1 mb-3">{t.role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.bio}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
