import { CheckCircle2, Award, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const highlights = [
  "10+ years of clinical experience",
  "Patient-first, evidence-based approach",
  "Certified & continuously trained team",
  "Comprehensive home visit programmes",
  "Personalised recovery tracking",
  "Post-session follow-up care",
];

const miniStats = [
  { val: "500+", label: "Patients"     },
  { val: "4",    label: "Specialists"  },
  { val: "98%",  label: "Satisfaction" },
];

const AboutSection = () => {
  const textRef  = useRef<HTMLDivElement>(null);
  const cardRef  = useRef<HTMLDivElement>(null);
  const listRef  = useRef<HTMLUListElement>(null);

  const textInView  = useInView(textRef,  { once: true, margin: "-80px" });
  const cardInView  = useInView(cardRef,  { once: true, margin: "-80px" });
  const listInView  = useInView(listRef,  { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      className="py-16 md:py-28 pb-20 md:pb-28 relative overflow-x-hidden"
      style={{ background: "var(--gradient-section)" }}
    >
      {/* Background orb */}
      <div
        className="hidden md:block absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full pointer-events-none animate-glow"
        style={{ background: "radial-gradient(circle, hsla(175,70%,50%,0.07) 0%, transparent 70%)", transform: "translate(35%,-50%)" }}
      />

      <div className="container relative">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">

          {/* ══ LEFT: Text column ══ */}
          <div ref={textRef}>
            {/* Heading block slides from left */}
            <motion.div
              initial={{ opacity: 0, x: -65 }}
              animate={textInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest text-[hsl(175,70%,32%)] mb-3 md:mb-4 px-3 md:px-4 py-1 rounded-full bg-[hsla(175,70%,32%,0.1)]"
                initial={{ opacity: 0, scale: 0.78, y: -10 }}
                animate={textInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1, ease: "backOut" }}
              >
                About Us
              </motion.span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4 md:mb-6 leading-tight">
                About{" "}
                <span className="text-gradient-primary">Expert Physio</span>{" "}
                Care
              </h2>

              <motion.p
                className="text-muted-foreground leading-relaxed mb-5 md:mb-6 text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={textInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                Expert Physio Care is Hyderabad's most trusted home physiotherapy
                service. Led by{" "}
                <strong className="text-foreground font-semibold">Dr. Dhruva</strong>,
                a Senior Physiotherapist with{" "}
                <strong className="text-foreground font-semibold">10+ years of clinical experience</strong>,
                our team brings professional, compassionate care directly to your doorstep.
              </motion.p>
            </motion.div>

            {/* Highlights list — each item slides from left with its own delay */}
            <ul
              ref={listRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-2.5"
            >
              {highlights.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-start gap-2 group"
                  initial={{ opacity: 0, x: -30 }}
                  animate={listInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 4, transition: { duration: 0.18 } }}
                >
                  <motion.span
                    whileHover={{ scale: 1.3, rotate: 10, transition: { type: "spring", stiffness: 350 } }}
                  >
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[hsl(175,70%,32%)] flex-shrink-0 mt-0.5" />
                  </motion.span>
                  <span className="text-foreground/80 text-xs md:text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ══ RIGHT: Stats card — slides from right ══ */}
          <div ref={cardRef} className="relative mt-8 md:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 65 }}
              animate={cardInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Gradient card */}
              <motion.div
                className="rounded-2xl md:rounded-3xl overflow-hidden relative"
                style={{ background: "var(--gradient-lead-card)" }}
                whileHover={{ scale: 1.015, transition: { duration: 0.3 } }}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 20%, white 0%, transparent 50%), radial-gradient(circle at 80% 80%, white 0%, transparent 50%)",
                  }}
                />
                <div className="relative z-10 p-7 md:p-12 flex flex-col items-center justify-center text-center">
                  {/* Award icon pops in */}
                  <motion.div
                    className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 md:mb-6 border-2 border-white/30"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={cardInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.2 }}
                    whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                  >
                    <Award className="w-8 h-8 md:w-12 md:h-12 text-white" />
                  </motion.div>

                  {/* Main number */}
                  <motion.div
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-serif leading-none"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={cardInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.35 }}
                  >
                    10+
                  </motion.div>
                  <motion.p
                    className="text-white/80 mt-2 md:mt-3 text-sm md:text-base font-medium"
                    initial={{ opacity: 0, y: 12 }}
                    animate={cardInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.45 }}
                  >
                    Years of Trusted Service
                  </motion.p>

                  {/* Mini stats — staggered */}
                  <div className="mt-5 md:mt-6 flex items-center gap-4 md:gap-6">
                    {miniStats.map((s, i) => (
                      <motion.div
                        key={s.label}
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={cardInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
                      >
                        <div className="text-xl md:text-2xl font-bold text-white font-serif">{s.val}</div>
                        <p className="text-white/65 text-[10px] md:text-xs mt-0.5 uppercase tracking-wider">{s.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Floating badge — slides in from bottom-left */}
              <motion.div
                className="absolute -bottom-4 -left-3 md:-bottom-5 md:-left-5 glass-card-strong rounded-xl md:rounded-2xl px-4 py-3 flex items-center gap-2.5 shadow-lg animate-float"
                initial={{ opacity: 0, x: -24, y: 20 }}
                animate={cardInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ type: "spring", stiffness: 140, damping: 18, delay: 0.65 }}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-[hsla(175,70%,32%,0.12)] flex items-center justify-center">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-[hsl(175,70%,32%)]" />
                </div>
                <div>
                  <p className="text-[11px] md:text-xs font-bold text-foreground">Team of Experts</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground">Certified Professionals</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
