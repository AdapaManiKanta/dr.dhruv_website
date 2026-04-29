import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/hooks/useScrollReveal";

const contactItems = [
  {
    icon: Mail,
    title: "Email",
    content: (
      <a
        href="mailto:expertsphysiotherapyhomecare@gmail.com"
        className="text-muted-foreground hover:text-[hsl(175,70%,32%)] transition-colors text-xs md:text-sm break-all"
      >
        expertsphysiotherapyhomecare@gmail.com
      </a>
    ),
    color: "175 70% 32%",
  },
  {
    icon: Phone,
    title: "Phone",
    content: (
      <a
        href="tel:+919110786670"
        className="text-muted-foreground hover:text-[hsl(175,70%,32%)] transition-colors font-medium text-sm md:text-base"
      >
        +91 91107 86670
      </a>
    ),
    color: "200 65% 42%",
  },
  {
    icon: MapPin,
    title: "Location",
    content: <p className="text-muted-foreground text-sm md:text-base">Hyderabad, Telangana, India</p>,
    color: "38 90% 48%",
  },
];

const ContactSection = () => (
  <section
    id="contact"
    className="py-16 md:py-28 pb-28 md:pb-28 relative overflow-hidden"
    style={{ background: "var(--gradient-section)" }}
  >
    <div className="hidden md:block absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none animate-glow"
      style={{ background: "radial-gradient(circle, hsla(175,70%,50%,0.07) 0%, transparent 70%)", transform: "translate(-35%,30%)" }} />

    <div className="container relative">
      {/* Heading */}
      <Reveal direction="up" duration={900} distance={45}>
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 px-2">
          <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest text-[hsl(175,70%,32%)] mb-3 px-3 md:px-4 py-1 rounded-full bg-[hsla(175,70%,32%,0.1)]">
            Contact Us
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            Book Your{" "}
            <span className="text-gradient-primary">Session</span> Today
          </h2>
          <p className="text-muted-foreground mt-3 md:mt-4 text-sm md:text-base leading-relaxed">
            Get in touch and start your recovery journey with Expert Physio Care.
          </p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start">
        {/* Left — contact info */}
        <Reveal direction="left" duration={900} distance={50}>
          <div className="space-y-3 md:space-y-5">
            {contactItems.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 md:gap-4 group glass-card rounded-xl md:rounded-2xl p-4 md:p-5 hover:shadow-[var(--shadow-card)] transition-all duration-300"
              >
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `hsla(${item.color}, 0.12)`,
                    color: `hsl(${item.color})`,
                  }}
                >
                  <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground mb-0.5 text-sm md:text-base">{item.title}</h3>
                  {item.content}
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <Button
              asChild
              size="lg"
              className="w-full font-semibold py-5 md:py-6 rounded-xl text-white transition-all duration-300"
              style={{ background: "var(--gradient-warm)" }}
            >
              <a
                href="https://wa.me/919110786670"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </Reveal>

        {/* Right — map */}
        <Reveal direction="right" duration={900} distance={50}>
          <div className="rounded-xl md:rounded-2xl overflow-hidden glass-card h-56 sm:h-72 md:h-[420px] shadow-[var(--shadow-elevated)]">
            <iframe
              title="Expert Physio Care Location — Hyderabad"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3170424507!2d78.24323199453882!3d17.412608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000"
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default ContactSection;
