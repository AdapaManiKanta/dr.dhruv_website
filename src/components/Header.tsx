import { useState, useEffect } from "react";
import { Phone, Menu, X, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Our Team", href: "#team" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white ${
        scrolled
          ? "shadow-[0_1px_20px_-4px_rgba(0,0,0,0.08)] border-b border-gray-100"
          : ""
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#home" className="flex items-center group flex-shrink-0" aria-label="Dr. Dhruva Physiotherapy Home">
          <img
            src="/images/logo.png"
            alt="Dr. Dhruva Physiotherapy"
            className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </a>

        {/* Desktop nav — centered with dot separators */}
        <nav className="hidden lg:flex items-center gap-0">
          {navLinks.map((l, i) => (
            <div key={l.href} className="flex items-center">
              {i > 0 && (
                <span className="w-1 h-1 rounded-full bg-[hsl(175,70%,32%)] opacity-40 mx-1" />
              )}
              <a
                href={l.href}
                className="relative px-3 py-2 text-[13px] font-medium text-gray-600 hover:text-[hsl(175,70%,28%)] transition-colors duration-300 tracking-wide uppercase"
              >
                {l.label}
                <span className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-[hsl(175,70%,32%)] scale-x-0 group-hover:scale-x-100 hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            </div>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-2.5">
          <Button asChild variant="ghost" size="sm" className="text-gray-600 hover:text-[hsl(175,70%,28%)] hover:bg-[hsla(175,70%,32%,0.06)] text-[13px] font-medium tracking-wide">
            <Link to="/login"><LogIn className="w-4 h-4 mr-1.5" /> Dashboard</Link>
          </Button>
          <Button asChild size="sm" className="bg-[hsl(175,70%,32%)] hover:bg-[hsl(175,75%,26%)] text-white rounded-full px-5 text-[13px] font-semibold tracking-wide shadow-[0_4px_20px_-4px_hsla(175,70%,32%,0.4)] transition-all duration-300 hover:shadow-[0_6px_28px_-4px_hsla(175,70%,32%,0.5)]">
            <a href="tel:+919391376670"><Phone className="w-3.5 h-3.5 mr-1.5" /> Call Now</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="tel:+919391376670"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[hsl(175,70%,32%)] text-white shadow-md"
            aria-label="Call now"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
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
      } bg-white border-b border-gray-100 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1)]`}>
        <nav className="flex flex-col py-2">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-6 py-3.5 text-sm font-medium text-gray-600 hover:text-[hsl(175,70%,28%)] hover:bg-gray-50 transition-colors flex items-center gap-3"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <span className="w-1 h-1 rounded-full bg-[hsl(175,70%,32%)] opacity-40" />
              {l.label}
            </a>
          ))}
          <div className="flex flex-col gap-2.5 px-6 py-4 border-t border-gray-100 mt-1">
            <Button asChild variant="outline" className="w-full h-11 text-sm font-semibold rounded-full border-gray-200" size="sm">
              <Link to="/login" onClick={() => setOpen(false)}>
                <LogIn className="w-4 h-4 mr-2" /> Dashboard
              </Link>
            </Button>
            <Button asChild className="w-full h-11 text-sm font-semibold rounded-full bg-[hsl(175,70%,32%)]" size="sm">
              <a href="tel:+919391376670" onClick={() => setOpen(false)}>
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
