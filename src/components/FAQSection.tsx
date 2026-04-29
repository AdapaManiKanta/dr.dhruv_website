import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/hooks/useScrollReveal";

const faqs = [
  {
    q: "Do you provide home visits?",
    a: "Yes — home visits are our core service. Our certified physiotherapists travel to your location at a time that suits you.",
    dir: "right" as const,
  },
  {
    q: "How do I book an appointment?",
    a: "Simply call us, send a WhatsApp message, or fill out the contact form. We confirm your appointment within a few hours.",
    dir: "left" as const,
  },
  {
    q: "What conditions do you treat?",
    a: "We treat stroke rehabilitation, post-surgery recovery, back/neck/joint pain, sports injuries, neurological conditions, and elderly mobility issues.",
    dir: "right" as const,
  },
  {
    q: "Are your physiotherapists certified?",
    a: "Absolutely. Every therapist holds valid professional certifications and undergoes continuous training to stay current with the latest clinical practices.",
    dir: "left" as const,
  },
  {
    q: "What are your charges?",
    a: "We offer transparent, affordable packages tailored to your treatment needs. Contact us for a personalised quote — there are no hidden fees.",
    dir: "right" as const,
  },
];

const FAQSection = () => (
  <section
    id="faq"
    className="py-16 md:py-28 pb-20 md:pb-28 relative overflow-hidden"
    style={{ background: "var(--gradient-section-alt)" }}
  >
    <div className="hidden md:block absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none animate-glow"
      style={{ background: "radial-gradient(circle, hsla(175,70%,50%,0.07) 0%, transparent 70%)", transform: "translate(30%,-30%)" }} />

    <div className="container max-w-3xl relative">
      {/* Heading */}
      <Reveal direction="up" duration={900} distance={45}>
        <div className="text-center mb-10 md:mb-14 px-2">
          <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest text-[hsl(175,70%,32%)] mb-3 px-3 md:px-4 py-1 rounded-full bg-[hsla(175,70%,32%,0.1)]">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            Frequently Asked{" "}
            <span className="text-gradient-primary">Questions</span>
          </h2>
        </div>
      </Reveal>

      <Accordion type="single" collapsible className="space-y-2.5 md:space-y-3">
        {faqs.map((f, i) => (
          <Reveal key={i} delay={i * 80} direction={f.dir} duration={800} distance={35}>
            <AccordionItem
              value={`faq-${i}`}
              className="glass-card rounded-xl md:rounded-2xl border-border/40 px-4 md:px-6 hover:shadow-[var(--shadow-card)] transition-shadow duration-300"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-[hsl(175,70%,32%)] text-sm md:text-base py-4 md:py-5 transition-colors duration-200">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-xs md:text-sm pb-4 md:pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          </Reveal>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
