import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/hooks/useScrollReveal";

const faqs = [
  { q: "Do you provide home visits?", a: "Yes, we specialize in doorstep physiotherapy. Our therapists visit your home at a time that suits you." },
  { q: "How do I book an appointment?", a: "You can call us, WhatsApp us directly, or fill out the contact form on this website. We'll confirm your appointment within hours." },
  { q: "What conditions do you treat?", a: "We treat stroke rehabilitation, post-surgery recovery, back pain, neck pain, joint pain, sports injuries, and elderly mobility issues." },
  { q: "Are your physiotherapists certified?", a: "Absolutely. All our therapists hold valid certifications and have years of hands-on clinical experience." },
  { q: "What are your charges?", a: "We offer affordable packages tailored to your treatment needs. Contact us for a personalized quote." },
];

const FAQSection = () => (
  <section id="faq" className="py-20 md:py-28 section-gradient relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

    <div className="container max-w-3xl relative">
      <Reveal>
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Frequently Asked Questions</h2>
        </div>
      </Reveal>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <Reveal key={i} delay={i * 80}>
            <AccordionItem value={`faq-${i}`} className="glass-card rounded-2xl border-border/50 px-6">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
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
