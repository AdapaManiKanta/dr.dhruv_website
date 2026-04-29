import { Reveal } from "@/hooks/useScrollReveal";

const images = [
  {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    alt: "Physiotherapy session",
    span: "col-span-2 row-span-2",
    dir: "left" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop",
    alt: "Home rehabilitation",
    span: "",
    dir: "up" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    alt: "Exercise therapy",
    span: "",
    dir: "right" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
    alt: "Patient care",
    span: "",
    dir: "left" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=300&fit=crop",
    alt: "Elderly physiotherapy",
    span: "",
    dir: "right" as const,
  },
];

const GallerySection = () => (
  <section
    className="py-16 md:py-28 pb-20 md:pb-28 relative overflow-hidden"
    style={{ background: "var(--gradient-section-alt)" }}
  >
    <div className="container">
      <Reveal direction="up" distance={45} duration={900}>
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 px-2">
          <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest text-[hsl(175,70%,32%)] mb-3 px-3 md:px-4 py-1 rounded-full bg-[hsla(175,70%,32%,0.1)]">
            Gallery
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            Our Work{" "}
            <span className="text-gradient-primary">in Action</span>
          </h2>
        </div>
      </Reveal>

      {/* Mobile: simple 2-col grid; md+: bento masonry */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[180px]">
        {images.map((img, i) => (
          <Reveal
            key={img.alt}
            delay={i * 70}
            direction={img.dir}
            distance={35}
            duration={800}
            className={img.span}
          >
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden group h-full cursor-pointer shadow-[var(--shadow-card)]">
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[hsla(220,40%,10%,0.6)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-3 md:p-4">
                <span className="text-white text-xs md:text-sm font-medium translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
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
