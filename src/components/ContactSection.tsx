import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/hooks/useScrollReveal";

const ContactSection = () => (
  <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
    <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

    <div className="container relative">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Book Your Physiotherapy Session Today
          </h2>
          <p className="text-muted-foreground mt-4">
            Get in touch and start your recovery journey with Expert Physio
            Care.
          </p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-10">
        <Reveal direction="left">
          <div className="space-y-6">
            {[
              {
                icon: Mail,
                title: "Email",
                content: (
                  <a
                    href="mailto:expertsphysiotherapyhomecare@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm break-all"
                  >
                    expertsphysiotherapyhomecare@gmail.com
                  </a>
                ),
              },
              {
                icon: Phone,
                title: "Phone",
                content: (
                  <a
                    href="tel:+919110786670"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +91 91107 86670
                  </a>
                ),
              },
              {
                icon: MapPin,
                title: "Location",
                content: (
                  <p className="text-muted-foreground">Hyderabad, India</p>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  {item.content}
                </div>
              </div>
            ))}
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto mt-4"
              style={{ background: "var(--gradient-warm)" }}
            >
              <a
                href="https://wa.me/919110786670"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" /> Chat on WhatsApp
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal direction="right">
          <div className="rounded-2xl overflow-hidden glass-card h-80 md:h-auto">
            <iframe
              title="Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3170424507!2d78.24323199453882!3d17.412608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000"
              className="w-full h-full min-h-[300px]"
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
