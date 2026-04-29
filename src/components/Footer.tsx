import { Heart, Activity, Mail, Phone, MapPin } from "lucide-react";
import { Reveal } from "@/hooks/useScrollReveal";

const quickLinks = ["Home", "Services", "About", "Team", "Contact"];
const services = ["Home Physiotherapy", "Stroke Rehab", "Pain Relief", "Post-Surgery Care", "Elderly Care"];

const Footer = () => (
  <footer className="relative overflow-hidden text-white pb-16 md:pb-0" style={{ background: "var(--gradient-dark)" }}>
    {/* Decorative */}
    <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full pointer-events-none animate-glow"
      style={{ background: "radial-gradient(circle, hsla(175,70%,50%,0.08) 0%, transparent 70%)" }} />
    <div className="hidden md:block absolute bottom-0 right-1/4 w-64 h-64 rounded-full pointer-events-none animate-glow"
      style={{ background: "radial-gradient(circle, hsla(38,95%,52%,0.06) 0%, transparent 70%)", animationDelay: "2s" }} />
    {/* Grid */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

    <div className="container relative pt-12 md:pt-14 pb-6 md:pb-8">
      <Reveal direction="up" duration={900} distance={40}>
        {/* Main grid — 2-col on mobile (brand + links), 4-col on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand — spans full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <span className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-[hsl(175,70%,32%)] flex items-center justify-center shadow-lg">
                <Activity className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </span>
              <span className="font-serif text-lg md:text-xl font-bold">Expert Physio Care</span>
            </div>
            <p className="text-white/55 text-xs md:text-sm leading-relaxed mb-4">
              Hyderabad's trusted home physiotherapy service — professional, compassionate care delivered right to your doorstep.
            </p>
            <div className="flex flex-wrap gap-2">
              {["★ 5.0 Rated", "500+ Patients"].map((badge) => (
                <span key={badge} className="px-2 py-0.5 rounded-full bg-white/8 text-white/55 text-[10px] md:text-xs border border-white/10">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 md:mb-5 text-xs md:text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="text-white/55 text-xs md:text-sm hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[hsl(175,70%,50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services — hidden on mobile to save space */}
          <div className="hidden md:block">
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s} className="text-white/55 text-sm">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-3 md:mb-5 text-xs md:text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2.5 md:space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-[hsl(175,70%,50%)] flex-shrink-0 mt-0.5" />
                <a href="mailto:expertsphysiotherapyhomecare@gmail.com" className="text-white/55 text-[10px] md:text-xs hover:text-white transition-colors break-all">
                  expertsphysiotherapyhomecare@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-[hsl(175,70%,50%)] flex-shrink-0" />
                <a href="tel:+918309506151" className="text-white/55 text-xs md:text-sm hover:text-white transition-colors">
                  +91 83095 06151
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-[hsl(38,95%,52%)] flex-shrink-0" />
                <span className="text-white/55 text-xs md:text-sm">Hyderabad, India</span>
              </li>
            </ul>
          </div>
        </div>
      </Reveal>

      {/* Bottom bar */}
      <div className="border-t border-white/8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] md:text-xs text-white/35">
        <p className="flex items-center gap-1">
          © {new Date().getFullYear()} Expert Physio Care. Made with{" "}
          <Heart className="w-3 h-3 text-[hsl(330,65%,55%)] fill-[hsl(330,65%,55%)]" />{" "}
          for better health.
        </p>
        <p>All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
