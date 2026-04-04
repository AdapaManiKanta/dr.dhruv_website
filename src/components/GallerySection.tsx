import { Reveal } from "@/hooks/useScrollReveal";

const images = [
  { src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop", alt: "Physiotherapy session", span: "md:col-span-2 md:row-span-2" },
  { src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop", alt: "Home rehabilitation", span: "" },
  { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", alt: "Exercise therapy", span: "" },
  { src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop", alt: "Patient care", span: "" },
  { src: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=300&fit=crop", alt: "Elderly physiotherapy", span: "" },
];

const GallerySection = () => (
  <section className="py-20 md:py-28 relative overflow-hidden">
    <div className="container">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Gallery</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Our Work in Action</h2>
        </div>
      </Reveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
        {images.map((img, i) => (
          <Reveal key={img.alt} delay={i * 80} direction="scale" className={img.span}>
            <div className="relative rounded-2xl overflow-hidden group h-full cursor-pointer">
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300 flex items-end p-4">
                <span className="text-primary-foreground text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  {img.alt}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default GallerySection;
