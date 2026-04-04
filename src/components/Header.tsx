import { useState, useEffect } from "react";
import { Phone, Menu, X, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-card/90 backdrop-blur-lg shadow-[var(--shadow-card)] border-b border-border/50" : "bg-transparent"}`}>
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#home" className={`font-serif text-xl md:text-2xl font-bold transition-colors ${scrolled ? "text-primary" : "text-primary-foreground"}`}>
          Expert Physio Care
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className={`text-sm font-medium transition-colors ${scrolled ? "text-muted-foreground hover:text-primary" : "text-primary-foreground/80 hover:text-primary-foreground"}`}>
              {l.label}
            </a>
          ))}
          <Button asChild variant="outline" size="sm">
            <Link to="/login">
              <LogIn className="w-4 h-4 mr-1" /> Dashboard
            </Link>
          </Button>
          <Button asChild size="sm">
            <a href="tel:+918309506151">
              <Phone className="w-4 h-4 mr-1" /> Call Now
            </a>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button className={`lg:hidden p-2 ${scrolled ? "text-foreground" : "text-primary-foreground"}`} onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="lg:hidden bg-card/95 backdrop-blur-lg border-b border-border pb-4">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="px-6 pt-2 space-y-2">
            <Button asChild variant="outline" className="w-full" size="sm">
              <Link to="/login">
                <LogIn className="w-4 h-4 mr-1" /> Dashboard
              </Link>
            </Button>
            <Button asChild className="w-full" size="sm">
              <a href="tel:+918309506151">
                <Phone className="w-4 h-4 mr-1" /> Call Now
              </a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
