import { ShieldCheck, MapPin, IndianRupee, ClipboardList } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const reasons = [
  { icon: ShieldCheck,   title: "Certified Physiotherapists", desc: "All our therapists hold valid certifications with years of clinical experience.", color: "175 70% 32%" },
  { icon: MapPin,        title: "Doorstep Service",           desc: "No travel required — we arrive at your home at a time that suits you.",           color: "38 95% 52%"  },
  { icon: IndianRupee,   title: "Affordable Packages",        desc: "Quality healthcare that fits your budget with transparent pricing.",               color: "175 60% 40%" },
  { icon: ClipboardList, title: "Personalised Plans",         desc: "Every treatment plan is custom-built around your unique recovery goals.",           color: "200 65% 42%" },
];

/* Fan-in pattern: left-rotate | scale-up | scale-up | right-rotate */
const cardInitials = [
  { opacity: 0, x: -70, rotate: -5 },
  { opacity: 0, y:  60, scale: 0.88 },
  { opacity: 0, y:  60, scale: 0.88 },
  { opacity: 0, x:  70, rotate:  5 },
];

const WhyChooseUs = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const gridInView    = useInView(gridRef,    { once: true, margin: "-60px" });

  return (
    <section
      id="why-us"
      className="py-16 md:py-28 pb-20 md:pb-28 relative overflow-x-hidden"
      style={{ background: "var(--gradient-section-alt)" }}
    >
      {/* Background orb */}
      <div
        className="hidden md:block absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none animate-glow"
        style={{ background: "radial-gradient(circle, hsla(175,70%,50%,0.07) 0%, transparent 70%)", transform: "translate(-40%,30%)" }}
      />

      <div className="container relative">

        {/* ── Heading — slides from left ── */}
        <motion.div
          ref={headingRef}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-16 px-2"
          initial={{ opacity: 0, x: -70 }}
          animate={headingInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest text-[hsl(175,70%,32%)] mb-3 px-3 md:px-4 py-1 rounded-full bg-[hsla(175,70%,32%,0.1)]"
            initial={{ opacity: 0, y: -14, scale: 0.8 }}
            animate={headingInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.12, ease: "backOut" }}
          >
            Why Choose Us
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            Trusted by{" "}
            <span className="text-gradient-primary">Families</span>{" "}
            Across the City
          </h2>
          <motion.p
            className="text-muted-foreground mt-3 md:mt-4 text-sm md:text-base leading-relaxed"
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Four pillars of care that set Expert Physio Care apart from the rest.
          </motion.p>
        </motion.div>

        {/* ── Cards — fan-in stagger ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={cardInitials[i]}
              animate={
                gridInView
                  ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }
                  : {}
              }
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.22, ease: "easeOut" } }}
              className="text-center group glass-card rounded-2xl p-5 md:p-8 hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300 h-full relative overflow-hidden cursor-default"
            >
              {/* Radial hover tint */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `radial-gradient(ellipse at 50% 0%, hsla(${r.color},0.12), transparent 70%)` }}
              />

              {/* Icon — spring shake on hover */}
              <motion.div
                className="relative w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl mx-auto flex items-center justify-center mb-3 md:mb-5"
                style={{ background: `hsla(${r.color}, 0.12)`, color: `hsl(${r.color})` }}
                whileHover={{
                  scale: 1.2,
                  rotate: [0, -8, 8, 0],
                  transition: { duration: 0.45, type: "spring", stiffness: 280, damping: 14 },
                }}
              >
                <r.icon className="w-6 h-6 md:w-8 md:h-8" />
              </motion.div>

              <h3 className="relative text-sm md:text-lg font-semibold text-foreground mb-1.5 md:mb-2.5 font-serif group-hover:text-[hsl(175,70%,28%)] transition-colors duration-300 leading-tight">
                {r.title}
              </h3>
              <p className="relative text-muted-foreground text-xs md:text-sm leading-relaxed hidden sm:block">
                {r.desc}
              </p>

              {/* Accent line grows on hover */}
              <motion.div
                className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full origin-left"
                style={{ background: `hsl(${r.color})` }}
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

export default WhyChooseUs;
