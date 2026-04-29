import { useState, useEffect } from "react";
import { Phone, Menu, X, LogIn, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home",         href: "#home" },
  { label: "Services",     href: "#services" },
  { label: "Why Us",       href: "#why-us" },
  { label: "About",        href: "#about" },
  { label: "Our Team",     href: "#team" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ",          href: "#faq" },
  { label: "Contact",      href: "#contact" },
];

const Header = () => {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/92 backdrop-blur-xl shadow-[0_2px_24px_-4px_hsla(175,70%,28%,0.12)] border-b border-white/60"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-14 sm:h-16 md:h-20">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group" aria-label="Expert Physio Care home">
          <span className={`w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
            scrolled
              ? "bg-[hsl(175,70%,32%)] shadow-[0_0_16px_-2px_hsla(175,70%,32%,0.5)]"
              : "bg-white/20 backdrop-blur-sm border border-white/30"
          }`}>
            <Activity className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </span>
          <span className={`font-serif text-lg sm:text-xl md:text-2xl font-bold transition-all duration-300 ${
            scrolled ? "text-gradient-primary" : "text-white drop-shadow-sm"
          }`}>
            Expert Physio
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-lg group ${
                scrolled
                  ? "text-foreground/70 hover:text-primary hover:bg-primary/5"
                  : "text-white/85 hover:text-white hover:bg-white/10"
              }`}
            >
              {l.label}
              <span className={`absolute bottom-1 left-3 right-3 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                scrolled ? "bg-primary" : "bg-white"
              }`} />
            </a>
          ))}
          <div className="flex items-center gap-2 ml-3">
            <Button asChild variant="outline" size="sm" className={`transition-all duration-300 ${!scrolled && "border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"}`}>
              <Link to="/login"><LogIn className="w-4 h-4 mr-1.5" /> Dashboard</Link>
            </Button>
            <Button asChild size="sm" className="bg-[hsl(175,70%,32%)] hover:bg-[hsl(175,75%,28%)] text-white shadow-[0_0_20px_-4px_hsla(175,70%,32%,0.5)] transition-all duration-300">
              <a href="tel:+918309506151"><Phone className="w-4 h-4 mr-1.5" /> Call Now</a>
            </Button>
          </div>
        </nav>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile quick call icon */}
          <a
            href="tel:+918309506151"
            className={`flex items-center justify-center w-9 h-9 rounded-xl transition-colors ${
              scrolled ? "bg-[hsl(175,70%,32%)] text-white" : "bg-white/15 text-white border border-white/25"
            }`}
            aria-label="Call now"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            className={`p-2 rounded-xl transition-colors ${
              scrolled ? "text-foreground hover:bg-secondary" : "text-white hover:bg-white/10"
            }`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div className={`lg:hidden overflow-hidden transition-all duration-350 ease-in-out ${
        open ? "max-h-[90vh] opacity-100" : "max-h-0 opacity-0"
      } bg-white/97 backdrop-blur-2xl border-b border-border/20 shadow-[0_8px_32px_-8px_hsla(220,35%,10%,0.15)]`}>
        <nav className="flex flex-col py-2">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-5 py-3 text-sm font-medium text-foreground/70 hover:text-[hsl(175,70%,32%)] hover:bg-[hsla(175,70%,32%,0.05)] transition-colors flex items-center gap-3"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(175,70%,32%)] opacity-50" />
              {l.label}
            </a>
          ))}
          <div className="flex flex-col gap-2.5 px-5 py-4 border-t border-border/20 mt-1">
            <Button asChild variant="outline" className="w-full h-11 text-sm font-semibold rounded-xl" size="sm">
              <Link to="/login" onClick={() => setOpen(false)}>
                <LogIn className="w-4 h-4 mr-2" /> Dashboard
              </Link>
            </Button>
            <Button asChild className="w-full h-11 text-sm font-semibold rounded-xl bg-[hsl(175,70%,32%)]" size="sm">
              <a href="tel:+918309506151" onClick={() => setOpen(false)}>
                <Phone className="w-4 h-4 mr-2" /> Call Now
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
