import { Reveal } from "@/hooks/useScrollReveal";
import { galleryPhotos } from "@/config/images";

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
          <p className="text-muted-foreground mt-3 text-sm md:text-base">
            Real physiotherapy sessions — care delivered at your doorstep.
          </p>
        </div>
      </Reveal>

      {/* Mobile: 2-col grid; md+: bento masonry */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[180px]">
        {galleryPhotos.map((img, i) => {
          // Use local photo if marked as added, otherwise fall back to stock
          const src = img.hasPhoto ? img.local : img.fallback;

          return (
            <Reveal
              key={img.alt}
              delay={i * 70}
              direction={img.dir}
              distance={35}
              duration={800}
              className={img.span}
            >
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden group h-full cursor-pointer shadow-[var(--shadow-card)]">
                {src ? (
                  <img
                    src={src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => {
                      // If local photo fails to load, show fallback
                      const target = e.currentTarget;
                      if (target.src !== img.fallback) {
                        target.src = img.fallback;
                      }
                    }}
                  />
                ) : (
                  // Placeholder when no image at all
                  <div
                    className="absolute inset-0 flex items-center justify-center text-white/40 text-sm font-medium"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    📷 Add Photo
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsla(220,40%,10%,0.6)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-3 md:p-4">
                  <span className="text-white text-xs md:text-sm font-medium translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {img.alt}
                  </span>
                </div>

                {/* "Real photo" badge when using local image */}
                {img.hasPhoto && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[hsl(175,70%,32%)] text-white text-[9px] font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Our Clinic
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Info banner — only shown when using stock photos */}
      {galleryPhotos.every((img) => !img.hasPhoto) && (
        <div className="mt-6 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-[hsla(38,95%,52%,0.1)] text-[hsl(38,90%,46%)] text-xs font-medium border border-[hsla(38,95%,52%,0.2)]">
            📷 Add your real clinic photos in <code className="font-mono">public/images/gallery/</code> and update <code className="font-mono">src/config/images.ts</code>
          </span>
        </div>
      )}
    </div>
  </section>
);

export default GallerySection;
