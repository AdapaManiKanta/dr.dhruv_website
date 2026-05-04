import { Phone, CalendarCheck, ArrowRight, Play, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15 + 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
];

const stats = [
  { value: "500+", label: "Patients Treated" },
  { value: "10+", label: "Years Experience" },
  { value: "98%", label: "Recovery Rate" },
];

const HeroSection = () => (
  <section id="home" className="relative bg-white overflow-hidden">
    {/* Subtle grid pattern background */}
    <div
      className="absolute inset-0 opacity-[0.025] pointer-events-none"
      style={{
        backgroundImage: "linear-gradient(hsl(175,70%,32%) 1px, transparent 1px), linear-gradient(90deg, hsl(175,70%,32%) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />

    <div className="container relative">
      <div className="min-h-screen flex flex-col justify-center pt-20 pb-10 md:pt-24 md:pb-16">

        {/* Main grid — text left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* ── Left Column — Content ── */}
          <div className="order-2 lg:order-1">

            {/* Section label */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <span className="text-[hsl(175,70%,32%)] text-sm font-semibold tracking-[0.2em] uppercase">
                01. Home Physiotherapy
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold text-gray-900 leading-[1.05] mt-4 mb-6 font-serif tracking-tight"
            >
              Expert{" "}
              <span className="relative inline-block">
                Physio
                <span className="text-[hsl(175,70%,32%)]">.</span>
              </span>
              <br />
              <span className="text-gray-400 font-light">Care</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-gray-500 text-base md:text-lg leading-relaxed max-w-md mb-8"
            >
              Personalised physiotherapy delivered at your doorstep —
              stroke rehabilitation, pain management &amp; post-surgery recovery
              by certified specialists in Hyderabad.
            </motion.p>

            {/* CTA row */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <Button asChild size="lg"
                className="bg-[hsl(175,70%,32%)] hover:bg-[hsl(175,75%,26%)] text-white rounded-full px-8 py-6 text-sm font-semibold tracking-wide shadow-[0_8px_30px_-6px_hsla(175,70%,32%,0.45)] transition-all duration-300 hover:shadow-[0_12px_40px_-6px_hsla(175,70%,32%,0.55)] group">
                <a href="#contact">
                  <CalendarCheck className="w-4 h-4 mr-2" />
                  Book Appointment
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <a
                href="tel:+919391376670"
                className="flex items-center gap-3 text-gray-600 hover:text-[hsl(175,70%,32%)] transition-colors group"
              >
                <span className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[hsla(175,70%,32%,0.08)] transition-colors">
                  <Phone className="w-4 h-4" />
                </span>
                <span className="text-sm font-medium">Call Now</span>
              </a>
            </motion.div>

            {/* Video CTA card */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <a href="#about" className="inline-flex items-center gap-4 bg-gray-50 hover:bg-gray-100 rounded-2xl px-5 py-3.5 transition-all duration-300 group border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow">
                  <Play className="w-4 h-4 text-[hsl(175,70%,32%)] ml-0.5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Learn More</p>
                  <p className="text-sm text-gray-700 font-semibold">Why Choose Home Physio?</p>
                </div>
              </a>
            </motion.div>
          </div>

          {/* ── Right Column — Hero Image ── */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Main image */}
              <div className="rounded-3xl overflow-hidden shadow-[0_32px_80px_-16px_rgba(0,0,0,0.12)] aspect-[4/5] lg:aspect-[3/4]">
                <img
                  src="/images/hero-main.png"
                  alt="Dr. Dhruva providing physiotherapy at home"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Floating stat cards */}
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className={`absolute bg-white rounded-2xl px-4 py-3 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] border border-gray-100 ${
                    i === 0
                      ? "top-6 -left-4 md:-left-8"
                      : i === 1
                      ? "bottom-24 -right-4 md:-right-8"
                      : "bottom-6 left-6"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + i * 0.15, duration: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <div className="text-xl font-bold text-gray-900 font-serif">{s.value}</div>
                  <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">{s.label}</div>
                </motion.div>
              ))}

              {/* Decorative plus icons */}
              <motion.div
                className="absolute top-1/3 -right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[hsl(175,70%,32%)] text-lg font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                +
              </motion.div>
              <motion.div
                className="absolute bottom-1/3 -left-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[hsl(175,70%,32%)] text-lg font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 }}
              >
                +
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar — social links + carousel dots + scroll */}
        <motion.div
          className="flex items-center justify-between mt-12 lg:mt-16 pt-6 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          {/* Social links — vertical text on desktop */}
          <div className="hidden md:flex items-center gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-gray-400 hover:text-[hsl(175,70%,32%)] uppercase tracking-[0.15em] font-medium transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-6 text-xs text-gray-400 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(175,70%,40%)]" />
              Certified Therapists
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(38,95%,52%)]" />
              Doorstep Service
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(200,65%,42%)]" />
              Affordable Pricing
            </span>
          </div>

          {/* Scroll down */}
          <a href="#services" className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors group">
            <span className="text-[11px] uppercase tracking-[0.15em] font-medium hidden sm:block">Scroll</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </div>

    {/* Bottom sticky bar — mobile only (Call + WhatsApp) */}
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-2 safe-bottom">
        <a href="tel:+919391376670" className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-[hsl(175,70%,32%)] hover:bg-gray-50 transition-colors">
          <Phone className="w-4 h-4" /> Call Now
        </a>
        <a href="https://wa.me/919391376670" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white bg-[hsl(145,63%,42%)]">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.607-.8-6.392-2.152l-.446-.352-3.17 1.062 1.063-3.17-.352-.446A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
          WhatsApp
        </a>
      </div>
    </div>
  </section>
);

export default HeroSection;
