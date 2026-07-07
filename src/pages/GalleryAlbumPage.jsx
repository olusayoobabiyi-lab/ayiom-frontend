import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaChevronLeft, FaChevronRight, FaTimes, FaCalendarAlt } from "react-icons/fa";
import { GALLERY_ALBUMS } from "@/constants/gallery";

export default function GalleryAlbumPage() {
  const { id } = useParams();
  const album = GALLERY_ALBUMS.find((a) => a.id === id);

  const [activePhotoIndex, setActivePhotoIndex] = useState(null); // null means closed

  // Handle keypress controls for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIndex === null) return;
      if (e.key === "Escape") setActivePhotoIndex(null);
      if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) => (prev + 1) % album.images.length);
      }
      if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) => (prev - 1 + album.images.length) % album.images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, album.images.length]);

  if (!album) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Album Not Found</h2>
        <p className="text-slate-600 mb-6">The photo album you are looking for does not exist or has been removed.</p>
        <Link
          to="/gallery"
          className="bg-[#B91C1C] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded flex items-center gap-2 transition"
        >
          <FaArrowLeft /> BACK TO GALLERY
        </Link>
      </div>
    );
  }

  const handleNextPhoto = () => {
    setActivePhotoIndex((prev) => (prev + 1) % album.images.length);
  };

  const handlePrevPhoto = () => {
    setActivePhotoIndex((prev) => (prev - 1 + album.images.length) % album.images.length);
  };

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Album Header Header Section */}
      <section className="relative w-full min-h-[260px] md:h-[300px] bg-slate-950 flex items-center overflow-hidden pb-12 pt-16">
        <img
          src={album.coverImage}
          alt={album.title}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/60" />

        <div className="relative z-10 w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 text-white pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition"
            >
              <FaArrowLeft /> BACK TO GALLERY
            </Link>
            
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                <FaCalendarAlt />
                <span>{album.date}</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-black uppercase tracking-wider leading-tight">
                {album.title}
              </h1>
              <p className="text-slate-350 text-xs md:text-sm font-medium leading-relaxed">
                {album.description}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[40px] md:h-[60px]"
          >
            <path fill="#B91C1C" d="M0,50 C320,118 1120,2 1440,60 L1440,120 L0,120Z" />
            <path fill="#ffffff" d="M0,60 C320,120 1120,10 1440,70 L1440,120 L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Photos Grid Section */}
      <section className="w-full py-16 bg-white">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {album.images.map((img, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActivePhotoIndex(index)}
                className="aspect-square bg-slate-100 rounded-xl overflow-hidden shadow-sm border border-slate-100 cursor-pointer relative group"
              >
                <img
                  src={img}
                  alt={`${album.title} - Photo ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 font-extrabold text-xs tracking-widest uppercase">
                  View Fullscreen
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Pop-up Overlay */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[99999] flex flex-col items-center justify-center p-6"
          >
            {/* Header / Close button */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white">
              <span className="text-xs font-bold uppercase tracking-widest">
                Photo {activePhotoIndex + 1} of {album.images.length}
              </span>
              <button
                onClick={() => setActivePhotoIndex(null)}
                className="text-white hover:text-red-500 transition p-2 bg-white/10 rounded-full"
                aria-label="Close Lightbox"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Navigation Left */}
            <button
              onClick={handlePrevPhoto}
              className="absolute left-6 text-white hover:text-gold transition p-3 bg-white/5 rounded-full select-none"
              aria-label="Previous Photo"
            >
              <FaChevronLeft size={24} />
            </button>

            {/* Main Image View */}
            <motion.div
              key={activePhotoIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-[85vw] max-h-[75vh] flex items-center justify-center overflow-hidden"
            >
              <img
                src={album.images[activePhotoIndex]}
                alt={`${album.title} - Lightbox Photo`}
                className="max-w-full max-h-full object-contain rounded-lg border border-slate-800 shadow-2xl"
              />
            </motion.div>

            {/* Navigation Right */}
            <button
              onClick={handleNextPhoto}
              className="absolute right-6 text-white hover:text-gold transition p-3 bg-white/5 rounded-full select-none"
              aria-label="Next Photo"
            >
              <FaChevronRight size={24} />
            </button>

            {/* Bottom Caption indicator */}
            <div className="absolute bottom-6 text-center text-slate-400 text-xs font-medium max-w-lg">
              {album.title} - use &larr; / &rarr; keys to browse, ESC to exit.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
