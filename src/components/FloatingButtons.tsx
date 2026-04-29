import { MessageCircle, Phone } from "lucide-react";

const FloatingButtons = () => (
  <>
    {/* Bottom mobile CTA bar — only on mobile */}
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-bottom">
      <div className="flex border-t border-white/10 shadow-[0_-4px_24px_-4px_hsla(220,35%,10%,0.18)]"
        style={{ background: "var(--gradient-dark, hsl(220,40%,10%))" }}>
        <a
          href="tel:+919110786670"
          className="flex-1 flex items-center justify-center gap-2.5 py-4 text-white font-semibold text-sm transition-colors active:bg-white/10"
          aria-label="Call Expert Physio Care"
        >
          <span className="w-8 h-8 rounded-full bg-[hsl(175,70%,32%)] flex items-center justify-center flex-shrink-0">
            <Phone className="w-4 h-4 text-white" />
          </span>
          Call Now
        </a>
        <div className="w-px bg-white/10" />
        <a
          href="https://wa.me/919110786670"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2.5 py-4 text-white font-semibold text-sm transition-colors active:bg-white/10"
          aria-label="Chat on WhatsApp"
        >
          <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "hsl(142,70%,40%)" }}>
            <MessageCircle className="w-4 h-4 text-white" />
          </span>
          WhatsApp
        </a>
      </div>
    </div>

    {/* Desktop floating WhatsApp only */}
    <a
      href="https://wa.me/919110786670"
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full items-center justify-center shadow-xl animate-pulse-gentle transition-transform hover:scale-110"
      style={{ background: "hsl(142,70%,40%)" }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  </>
);

export default FloatingButtons;
