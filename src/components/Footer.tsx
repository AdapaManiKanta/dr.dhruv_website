import { Heart } from "lucide-react";
import { Reveal } from "@/hooks/useScrollReveal";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground py-12 relative overflow-hidden">
    <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

    <div className="container relative">
      <Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Expert Physio Care</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Professional physiotherapy at home — trusted, affordable, and compassionate care for your recovery.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 font-sans">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {["Home", "Services", "About", "Contact"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-primary-foreground transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 font-sans">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {["Home Physiotherapy", "Stroke Rehab", "Pain Relief", "Elderly Care"].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 font-sans">Contact Info</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>📧 expertsphysiotherapyhomecare@gmail.com</li>
            <li>📱 +91 83095 06151</li>
            <li>📍 Hyderabad, India</li>
            </ul>
          </div>
        </div>
      </Reveal>
      <div className="border-t border-primary-foreground/10 pt-6 text-center text-sm text-primary-foreground/50">
        <p className="flex items-center justify-center gap-1">
          © {new Date().getFullYear()} Expert Physio Care. Made with <Heart className="w-4 h-4 text-accent fill-accent" /> for better health.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
