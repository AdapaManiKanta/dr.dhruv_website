/**
 * ═══════════════════════════════════════════════════════════════
 *   EXPERT PHYSIO CARE — PHOTO CONFIGURATION
 *   Edit this file to update all photos across the website
 * ═══════════════════════════════════════════════════════════════
 *
 * HOW TO ADD REAL PHOTOS:
 * 1. Put your photo files in: public/images/doctors/ or public/images/gallery/
 * 2. Set photo: "/images/doctors/your-file.jpg"  (the path starts with /)
 * 3. Set hasPhoto: true
 *
 * HOW TO REMOVE A PHOTO (use initials avatar):
 * - Set hasPhoto: false  →  shows colored initials automatically
 * ═══════════════════════════════════════════════════════════════
 */

// ─── DOCTOR PHOTOS ────────────────────────────────────────────
export const doctorPhotos = {
  dhruva: {
    photo: "/images/doctors/dr-dhruva.jpg",
    hasPhoto: true,   // ✅ Photo added
  },
  raghavendra: {
    photo: "/images/doctors/dr-raghavendra.jpg",
    hasPhoto: true,   // ✅ Photo added
  },
  prathyusha: {
    photo: "/images/doctors/dr-prathyusha.jpg",
    hasPhoto: true,   // ✅ Photo added
  },
  mahesh: {
    photo: "/images/doctors/dr-mahesh.jpg",
    hasPhoto: true,   // ✅ Photo added
  },
};

// ─── GALLERY PHOTOS ───────────────────────────────────────────
export const galleryPhotos = [
  {
    local: "/images/gallery/gallery-1.jpg",
    fallback: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    hasPhoto: true,   // ✅ Photo added
    alt: "Expert physiotherapy session at home",
    span: "col-span-2 row-span-2",
    dir: "left" as const,
  },
  {
    local: "/images/gallery/gallery-2.jpg",
    fallback: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop",
    hasPhoto: true,   // ✅ Photo added
    alt: "Home rehabilitation session",
    span: "",
    dir: "up" as const,
  },
  {
    local: "/images/gallery/gallery-3.jpg",
    fallback: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    hasPhoto: true,   // ✅ Photo added
    alt: "Exercise therapy session",
    span: "",
    dir: "right" as const,
  },
  {
    local: "/images/gallery/gallery-4.jpg",
    fallback: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
    hasPhoto: true,   // ✅ Photo added
    alt: "Patient care at home",
    span: "",
    dir: "left" as const,
  },
  {
    local: "/images/gallery/gallery-5.jpg",
    fallback: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=300&fit=crop",
    hasPhoto: true,   // ✅ Photo added
    alt: "Elderly physiotherapy session",
    span: "",
    dir: "right" as const,
  },
];
