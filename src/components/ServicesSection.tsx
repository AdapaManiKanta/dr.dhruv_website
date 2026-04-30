import { Home, Brain, Bone, Zap, HeartHandshake, Dumbbell } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  { icon: Home,         title: "Home Physiotherapy",    desc: "Personalised treatment at your home for maximum comfort and convenience.",                          color: "175 70% 32%" },
  { icon: Brain,        title: "Stroke Rehabilitation", desc: "Specialised programs to improve mobility, speech & cognitive recovery after stroke.",               color: "200 65% 42%" },
  { icon: Bone,         title: "Post-Surgery Recovery", desc: "Faster healing with expert post-operative physiotherapy and guided rehabilitation.",                color: "38 95% 52%"  },
  { icon: Zap,          title: "Pain Relief Therapy",   desc: "Effective, science-backed relief for back, neck, joint pain & chronic conditions.",                 color: "175 65% 42%" },
  { icon: HeartHandshake, title: "Elderly Care",        desc: "Safe, gentle rehabilitation designed specifically for senior patients.",                             color: "200 50% 40%" },
  { icon: Dumbbell,     title: "Sports Injury Rehab",   desc: "Get back in the game faster with tailored sports injury recovery plans.",                           color: "38 80% 48%"  },
];

/* directional entrance per card index: 0→left, 1→up, 2→right (repeating) */
const cardInitial = (i: number) => ({
  opacity: 0,
  x: i % 3 === 0 ? -60 : i % 3 === 2 ? 60 : 0,
  y: i % 3 === 1 ? 50 : 0,
});

const ServicesSection = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const gridInView    = useInView(gridRef,    { once: true, margin: "-60px" });

  return (
    <section
      id="services"
      className="py-16 md:py-28 pb-20 md:pb-28 relative overflow-x-hidden"
      style={{ background: "var(--gradient-section)" }}
    >
      {/* Background orb — decorative only */}
      <div
        className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none animate-glow"
        style={{ background: "radial-gradient(circle, hsla(175,70%,50%,0.07) 0%, transparent 65%)", transform: "translate(30%,-30%)" }}
      />

      <div className="container relative">

        {/* ── Heading — slides in from right ── */}
        <motion.div
          ref={headingRef}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-16 px-2"
          initial={{ opacity: 0, x: 70 }}
          animate={headingInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest text-[hsl(175,70%,32%)] mb-3 px-3 md:px-4 py-1 rounded-full bg-[hsla(175,70%,32%,0.1)]"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={headingInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.1, ease: "backOut" }}
          >
            Our Services
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            Comprehensive Care{" "}
            <span className="text-gradient-primary">at Home</span>
          </h2>
          <motion.p
            className="text-muted-foreground mt-3 md:mt-4 text-sm md:text-base leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.3 }}
          >
            Professional physiotherapy services tailored to your specific needs, delivered right to your doorstep.
          </motion.p>
        </motion.div>

        {/* ── Cards — staggered directional entrance ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={cardInitial(i)}
              animate={gridInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.22, ease: "easeOut" } }}
              className="group glass-card rounded-2xl p-5 md:p-7 hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300 h-full relative overflow-hidden cursor-default flex items-start gap-4 md:block"
            >
              {/* Hover tint */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `linear-gradient(135deg, hsla(${s.color},0.08) 0%, transparent 60%)` }}
              />

              {/* Icon */}
              <motion.div
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex-shrink-0 flex items-center justify-center md:mb-5"
                style={{ background: `hsla(${s.color}, 0.12)`, color: `hsl(${s.color})` }}
                whileHover={{ scale: 1.18, rotate: 8, transition: { type: "spring", stiffness: 300, damping: 15 } }}
              >
                <s.icon className="w-6 h-6 md:w-7 md:h-7" />
              </motion.div>

              <div className="flex-1 md:flex-none relative">
                <h3 className="text-base md:text-xl font-semibold text-foreground font-serif mb-1 md:mb-2.5 group-hover:text-[hsl(175,70%,28%)] transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>

              {/* Bottom bar on hover */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl origin-left"
                style={{ background: `linear-gradient(90deg, hsl(${s.color}), transparent)` }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.35 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
