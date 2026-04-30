import { Phone, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AetherFlowHero, fadeUpVariants } from "@/components/ui/aether-flow-hero";

const trustBadges = [
  "✅ Certified Therapists",
  "🏠 Doorstep Service",
  "💰 Affordable",
  "⭐ 500+ Patients",
  "🏥 10+ Years",
];

const HeroSection = () => (
  <section id="home">
    <AetherFlowHero className="min-h-screen">
      {/* All content — canvas gradient is the background */}
      <div className="container flex flex-col justify-center min-h-screen pt-16 pb-28 md:pb-20 relative">
        <div className="max-w-2xl">

          {/* Pill badge */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs md:text-sm font-medium mb-4 md:mb-6 border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(175,70%,50%)] animate-pulse" />
              🏡 Professional Home Physiotherapy · Hyderabad
            </span>
          </motion.div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-4 md:mb-6 tracking-tight font-serif">
            <motion.span className="block" custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
              Expert
            </motion.span>
            <motion.span className="block" custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
              Physiotherapy
            </motion.span>
            <motion.span className="block" custom={3} variants={fadeUpVariants} initial="hidden" animate="visible">
              at Your{" "}
              <span style={{
                background: "linear-gradient(90deg, hsl(38,95%,65%), hsl(38,95%,52%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Home
              </span>
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-base md:text-lg text-white/70 mb-6 md:mb-8 leading-relaxed max-w-xl"
          >
            Stroke Rehab, Pain Relief & Post-Surgery Recovery — delivered with
            compassion right at your doorstep.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={5}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col xs:flex-row gap-3"
          >
            <Button asChild size="lg"
              className="text-sm md:text-base font-semibold px-6 md:px-8 py-5 md:py-6 rounded-xl bg-[hsl(175,70%,32%)] hover:bg-[hsl(175,75%,28%)] text-white shadow-[0_0_32px_-4px_hsla(175,70%,40%,0.6)] transition-all duration-300 group w-full xs:w-auto">
              <a href="#contact">
                <CalendarCheck className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:scale-110 transition-transform" />
                Book Appointment
              </a>
            </Button>
            <Button asChild size="lg" variant="outline"
              className="text-sm md:text-base font-semibold px-6 md:px-8 py-5 md:py-6 rounded-xl border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 w-full xs:w-auto">
              <a href="tel:+918309506151">
                <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Call Now
              </a>
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            custom={6}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2 mt-6 md:mt-10"
          >
            {trustBadges.map((badge, i) => (
              <motion.span
                key={badge}
                className="px-2.5 md:px-3.5 py-1 md:py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[11px] md:text-xs font-medium border border-white/15"
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + i * 0.1, duration: 0.4, ease: "backOut" }}
                whileHover={{ scale: 1.08 }}
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Floating stat cards — desktop only */}
        <div className="hidden lg:flex absolute right-8 bottom-20 flex-col items-center gap-4">
          {[
            { num: "10+",  label: "Years Exp." },
            { num: "500+", label: "Patients"   },
            { num: "98%",  label: "Satisfied"  },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              className="backdrop-blur-md rounded-2xl px-5 py-3.5 text-center border border-white/15"
              style={{ background: "rgba(56,220,190,0.08)" }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.06, transition: { duration: 0.2 } }}
            >
              <div className="text-2xl font-bold text-white font-serif">{s.num}</div>
              <div className="text-white/55 text-xs mt-0.5 uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
        >
          <span className="text-white/40 text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-2.5 rounded-full bg-[hsl(175,70%,60%)]"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </AetherFlowHero>
  </section>
);

export default HeroSection;
