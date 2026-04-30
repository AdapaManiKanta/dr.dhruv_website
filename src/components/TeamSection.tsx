import { Reveal } from "@/hooks/useScrollReveal";
import { Crown, User, Award, Star } from "lucide-react";
import { doctorPhotos } from "@/config/images";

/* ─── Doctor Data ─── */
const doctors = [
  {
    id: "dhruva",
    photoKey: "dhruva" as keyof typeof doctorPhotos,
    name: "Dr. Dhruva",
    role: "Senior Physiotherapist",
    gender: "male" as const,
    experience: "10+ Years",
    isLead: true,
    initials: "DD",
    specializations: ["Stroke Rehabilitation", "Pain Management", "Post-Surgery Recovery", "Neuro Physio"],
    bio: "Dr. Dhruva is the principal lead of Expert Physio Care. With over a decade of clinical excellence, he has transformed the lives of 500+ patients through personalised, evidence-based home physiotherapy.",
    color: "175 70% 32%",
    gradientFrom: "hsl(175,70%,28%)",
    gradientTo: "hsl(185,65%,38%)",
  },
  {
    id: "raghavendra",
    photoKey: "raghavendra" as keyof typeof doctorPhotos,
    name: "Dr. Raghavendra",
    role: "Male Physiotherapist",
    gender: "male" as const,
    experience: "5+ Years",
    isLead: false,
    initials: "DR",
    specializations: ["Sports Injuries", "Orthopaedic Rehab", "Manual Therapy"],
    bio: "Dr. Raghavendra specialises in musculoskeletal and orthopaedic physiotherapy, combining manual therapy with targeted exercise for outstanding outcomes.",
    color: "200 65% 42%",
    gradientFrom: "hsl(200,65%,38%)",
    gradientTo: "hsl(210,60%,48%)",
  },
  {
    id: "prathyusha",
    photoKey: "prathyusha" as keyof typeof doctorPhotos,
    name: "Dr. Prathyusha",
    role: "Female Physiotherapist",
    gender: "female" as const,
    experience: "4+ Years",
    isLead: false,
    initials: "DP",
    specializations: ["Women's Health", "Elderly Care", "Post-Natal Rehab"],
    bio: "Dr. Prathyusha is a compassionate physiotherapist focused on women's health, elderly rehabilitation, and paediatric care with a patient-first approach.",
    color: "330 65% 48%",
    gradientFrom: "hsl(330,65%,44%)",
    gradientTo: "hsl(300,50%,52%)",
  },
  {
    id: "mahesh",
    photoKey: "mahesh" as keyof typeof doctorPhotos,
    name: "Dr. Mahesh",
    role: "Male Physiotherapist",
    gender: "male" as const,
    experience: "3+ Years",
    isLead: false,
    initials: "DM",
    specializations: ["Neurological Rehab", "Balance Training", "Paediatric Physio"],
    bio: "Dr. Mahesh brings focused expertise to neurological and paediatric physiotherapy, helping patients regain independence through structured movement re-education.",
    color: "38 90% 46%",
    gradientFrom: "hsl(38,90%,42%)",
    gradientTo: "hsl(20,85%,48%)",
  },
];

/* ─── Doctor Avatar — shows real photo OR initials fallback ─── */
const DoctorAvatar = ({
  doctor,
  size = "md",
}: {
  doctor: (typeof doctors)[0];
  size?: "sm" | "md" | "lg";
}) => {
  const config = doctorPhotos[doctor.photoKey];
  const sizeClasses = {
    sm: "w-12 h-12 md:w-16 md:h-16 text-base md:text-xl rounded-xl md:rounded-2xl",
    md: "w-16 h-16 md:w-20 md:h-20 text-xl md:text-2xl rounded-2xl",
    lg: "w-20 h-20 sm:w-28 md:w-36 sm:h-28 md:h-36 text-2xl sm:text-4xl md:text-5xl rounded-2xl md:rounded-3xl",
  };

  const cls = sizeClasses[size];

  if (config.hasPhoto) {
    return (
      <div
        className={`${cls} overflow-hidden flex-shrink-0 border-2 border-white/30 shadow-xl group-hover:scale-105 transition-transform duration-500`}
      >
        <img
          src={config.photo}
          alt={doctor.name}
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            // If photo fails, hide img and show initials fallback
            e.currentTarget.style.display = "none";
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.style.background = `linear-gradient(135deg, ${doctor.gradientFrom}, ${doctor.gradientTo})`;
              parent.innerHTML = `<span style="color:white;font-family:serif;font-weight:bold;font-size:inherit;display:flex;align-items:center;justify-content:center;width:100%;height:100%">${doctor.initials}</span>`;
            }
          }}
        />
      </div>
    );
  }

  // Initials avatar fallback
  return (
    <div
      className={`${cls} flex-shrink-0 flex items-center justify-center text-white font-serif font-bold shadow-xl group-hover:scale-105 transition-transform duration-500`}
      style={{ background: `linear-gradient(135deg, ${doctor.gradientFrom}, ${doctor.gradientTo})` }}
    >
      {doctor.initials}
    </div>
  );
};

/* ─── Lead Doctor Card ─── */
const LeadDoctorCard = ({ doctor }: { doctor: (typeof doctors)[0] }) => (
  <Reveal direction="up" duration={1000} distance={55}>
    <div
      className="relative rounded-2xl md:rounded-3xl overflow-hidden group cursor-default"
      style={{ background: `linear-gradient(140deg, ${doctor.gradientFrom} 0%, ${doctor.gradientTo} 55%, hsl(38,90%,48%) 100%)` }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 15% 15%, white 0%, transparent 50%), radial-gradient(circle at 85% 85%, white 0%, transparent 50%)" }} />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

      <div className="relative z-10 p-6 md:p-10">
        <div className="flex flex-col sm:flex-row gap-5 md:gap-8 items-start sm:items-center">
          {/* Avatar */}
          <div className="relative flex-shrink-0 self-center sm:self-auto">
            <DoctorAvatar doctor={doctor} size="lg" />
            {/* Crown badge */}
            <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-[hsl(38,95%,52%)] text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-lg animate-glow-accent z-10">
              <Crown className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div className="hidden md:block absolute inset-0 pointer-events-none">
              <div className="absolute w-3 h-3 rounded-full bg-white/40 animate-orbit" style={{ top: "50%", left: "50%" }} />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-[10px] md:text-xs font-bold uppercase tracking-wider border border-white/20">
                <Crown className="w-2.5 h-2.5 text-[hsl(38,95%,65%)]" />
                Main Lead
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/12 text-white/90 text-[10px] md:text-xs font-medium border border-white/15">
                <Award className="w-2.5 h-2.5" />
                {doctor.experience} Experience
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-serif mb-0.5">{doctor.name}</h3>
            <p className="text-white/75 text-sm md:text-base font-medium mb-3 md:mb-4">{doctor.role}</p>
            <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-4 max-w-2xl">{doctor.bio}</p>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {doctor.specializations.map((spec) => (
                <span key={spec} className="px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-white/15 text-white text-[10px] md:text-xs font-medium border border-white/15 backdrop-blur-sm">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Rating — desktop */}
          <div className="hidden lg:block flex-shrink-0">
            <div className="glass-dark rounded-2xl p-5 text-center">
              <div className="flex justify-center gap-0.5 mb-2">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-[hsl(38,95%,60%)] text-[hsl(38,95%,60%)]" />
                ))}
              </div>
              <p className="text-white font-bold text-xl">5.0</p>
              <p className="text-white/55 text-xs mt-0.5 uppercase tracking-wide">Rating</p>
            </div>
          </div>
        </div>

        {/* Mobile stars */}
        <div className="flex items-center gap-1 mt-4 sm:hidden">
          {[1,2,3,4,5].map((s) => (
            <Star key={s} className="w-3.5 h-3.5 fill-[hsl(38,95%,60%)] text-[hsl(38,95%,60%)]" />
          ))}
          <span className="text-white/70 text-xs ml-1">5.0 Rating</span>
        </div>
      </div>
    </div>
  </Reveal>
);

/* ─── Regular Doctor Card ─── */
const DoctorCard = ({ doctor, index }: { doctor: (typeof doctors)[0]; index: number }) => {
  const directions = ["right", "up", "left"] as const;
  const dir = directions[index % 3];

  return (
    <Reveal direction={dir} delay={index * 130} duration={850} distance={45}>
      <div className="group glass-card-strong rounded-2xl overflow-hidden hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[var(--shadow-card-hover)] transition-all duration-500 h-full cursor-default relative">
        <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${doctor.gradientFrom}, ${doctor.gradientTo})` }} />

        <div className="p-5 md:p-7">
          {/* Avatar + name row */}
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-5">
            <DoctorAvatar doctor={doctor} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                <h3 className="text-base md:text-lg font-bold text-foreground font-serif leading-tight">{doctor.name}</h3>
                <span
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: doctor.gender === "female" ? "hsla(330,65%,48%,0.15)" : "hsla(200,65%,42%,0.15)",
                    color: doctor.gender === "female" ? "hsl(330,65%,48%)" : "hsl(200,65%,42%)",
                  }}
                  title={`${doctor.gender === "female" ? "Female" : "Male"} Physiotherapist`}
                >
                  <User className="w-3 h-3 md:w-3.5 md:h-3.5" />
                </span>
              </div>
              <p className="text-xs md:text-sm font-medium leading-tight" style={{ color: `hsl(${doctor.color})` }}>
                {doctor.role}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold mb-3 md:mb-4"
            style={{ background: `hsla(${doctor.color}, 0.1)`, color: `hsl(${doctor.color})` }}>
            <Award className="w-2.5 h-2.5 md:w-3 md:h-3" />
            {doctor.experience} Experience
          </div>

          <p className="hidden sm:block text-muted-foreground text-xs md:text-sm leading-relaxed mb-4 md:mb-5">{doctor.bio}</p>

          <div className="flex flex-wrap gap-1">
            {doctor.specializations.map((spec) => (
              <span key={spec} className="px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium border"
                style={{ background: `hsla(${doctor.color}, 0.07)`, color: `hsl(${doctor.color})`, borderColor: `hsla(${doctor.color}, 0.2)` }}>
                {spec}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1 mt-4 pt-4 border-t border-border/40">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} className="w-3 h-3 md:w-3.5 md:h-3.5 fill-[hsl(38,95%,52%)] text-[hsl(38,95%,52%)]" />
            ))}
            <span className="text-[10px] md:text-xs text-muted-foreground ml-1">5.0</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

/* ─── Team Section ─── */
const TeamSection = () => {
  const lead = doctors[0];
  const rest = doctors.slice(1);

  return (
    <section id="team" className="py-16 md:py-28 pb-20 md:pb-28 relative overflow-hidden"
      style={{ background: "var(--gradient-section-alt)" }}>
      <div className="hidden md:block absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none animate-glow"
        style={{ background: "radial-gradient(circle, hsla(175,70%,50%,0.06) 0%, transparent 65%)", transform: "translate(35%,25%)" }} />

      <div className="container relative">
        <Reveal direction="up" duration={900} distance={45}>
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12 px-2">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest text-[hsl(175,70%,32%)] mb-3 px-3 md:px-4 py-1 rounded-full bg-[hsla(175,70%,32%,0.1)]">
              Our Team
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
              Meet Our <span className="text-gradient-primary">Expert</span> Specialists
            </h2>
            <p className="text-muted-foreground mt-3 md:mt-4 text-sm md:text-base leading-relaxed">
              A dedicated team of certified physiotherapists committed to your recovery, comfort, and long-term wellbeing.
            </p>
          </div>
        </Reveal>

        <div className="mb-5 md:mb-8">
          <LeadDoctorCard doctor={lead} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {rest.map((doc, i) => (
            <DoctorCard key={doc.id} doctor={doc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
