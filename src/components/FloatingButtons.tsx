import { MessageCircle, Phone } from "lucide-react";

const FloatingButtons = () => (
  <>
    {/* WhatsApp floating button */}
    <a
      href="https://wa.me/919110786670"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg animate-pulse-gentle transition-transform hover:scale-110"
      style={{ background: "hsl(120, 70%, 45%)" }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-primary-foreground" />
    </a>

    {/* Mobile call button */}
    <a
      href="tel:+919110786670"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg md:hidden transition-transform hover:scale-110"
      aria-label="Call now"
    >
      <Phone className="w-6 h-6 text-primary-foreground" />
    </a>
  </>
);

export default FloatingButtons;
