import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/hooks/useScrollReveal";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const contactItems = [
  {
    icon: Mail,
    title: "Email",
    content: (
      <a href="mailto:expertsphysiotherapyhomecare@gmail.com"
        className="text-muted-foreground hover:text-[hsl(175,70%,32%)] transition-colors text-xs md:text-sm break-all">
        expertsphysiotherapyhomecare@gmail.com
      </a>
    ),
    color: "175 70% 32%",
  },
  {
    icon: Phone,
    title: "Phone",
    content: (
      <a href="tel:+919110786670"
        className="text-muted-foreground hover:text-[hsl(175,70%,32%)] transition-colors font-medium text-sm md:text-base">
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

const ContactSection = () => {
  const [form, setForm]       = useState({ name: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      toast.error("Please fill in your name and message.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name:    form.name.trim(),
      phone:   form.phone.trim() || null,
      email:   form.email.trim() || null,
      message: form.message.trim(),
      status:  "new",
    });

    if (error) {
      toast.error("Something went wrong. Please try WhatsApp or call us directly.");
      console.error(error);
    } else {
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you shortly.");
      setForm({ name: "", phone: "", email: "", message: "" });
    }
    setSubmitting(false);
  };

  return (
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

          {/* Left — contact info + form */}
          <Reveal direction="left" duration={900} distance={50}>
            <div className="space-y-4">
              {/* Contact info cards */}
              {contactItems.map((item) => (
                <div key={item.title}
                  className="flex items-start gap-3 md:gap-4 group glass-card rounded-xl md:rounded-2xl p-4 md:p-5 hover:shadow-[var(--shadow-card)] transition-all duration-300">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `hsla(${item.color}, 0.12)`, color: `hsl(${item.color})` }}>
                    <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground mb-0.5 text-sm md:text-base">{item.title}</h3>
                    {item.content}
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <Button asChild size="lg"
                className="w-full font-semibold py-5 md:py-6 rounded-xl text-white transition-all duration-300"
                style={{ background: "var(--gradient-warm)" }}>
                <a href="https://wa.me/919110786670" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </Reveal>

          {/* Right — enquiry form */}
          <Reveal direction="right" duration={900} distance={50}>
            <div className="glass-card rounded-xl md:rounded-2xl p-5 md:p-7 shadow-[var(--shadow-elevated)]">
              {submitted ? (
                /* Success state */
                <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-[hsla(175,70%,32%,0.12)] flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-[hsl(175,70%,32%)]" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Message Received!</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Thank you, we'll contact you shortly to confirm your session.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)} className="mt-2">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-1">Send Us a Message</h3>
                  <p className="text-xs text-muted-foreground mb-4">We'll call you back to confirm your appointment.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground">Name *</label>
                      <Input name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground">Phone</label>
                      <Input name="phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Email</label>
                    <Input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Message / Condition *</label>
                    <textarea
                      name="message"
                      placeholder="Briefly describe your condition or what you need help with…"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={submitting}
                    style={{ background: "var(--gradient-primary)" }}>
                    {submitting ? (
                      <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Sending…</>
                    ) : (
                      <><Send className="w-4 h-4 mr-2" />Send Message</>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
