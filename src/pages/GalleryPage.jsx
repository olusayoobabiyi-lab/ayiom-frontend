import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaImages, FaCalendarAlt } from "react-icons/fa";
import { GALLERY_ALBUMS } from "@/constants/gallery";
import headerBg from "@/assets/images/slide-outreach.png";

export default function GalleryPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[300px] lg:h-[380px] bg-slate-950 flex items-center overflow-hidden pb-12 pt-16">
        <img
          src={headerBg}
          alt="Gallery Banner"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60" />

        <div className="relative z-10 w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 text-white pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl space-y-3"
          >
            <span className="text-gold font-bold uppercase tracking-wider text-xs md:text-sm block">
              — PHOTO & MEDIA
            </span>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider leading-none">
              OUR MINISTRY GALLERY
            </h1>
            <p className="text-slate-300 text-xs md:text-sm xl:text-base leading-relaxed font-medium">
              Glance through our ministry's visual timeline. Experience the testimonies, joy, and relief captured during our outreaches, services, and community projects.
            </p>
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

      {/* Album List section */}
      <section className="w-full py-16 bg-white">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {GALLERY_ALBUMS.map((album) => (
              <motion.div
                key={album.id}
                variants={itemVariants}
                className="bg-white border border-slate-100/60 shadow-card hover:shadow-lg rounded-2xl overflow-hidden flex flex-col h-full group"
              >
                {/* Cover Image */}
                <div className="relative h-56 bg-slate-900 overflow-hidden shrink-0">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Photo count indicator */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-sm">
                    <FaImages className="text-gold" />
                    <span>{album.photosCount} Photos</span>
                  </div>
                </div>

                {/* Info details */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      <FaCalendarAlt />
                      <span>{album.date}</span>
                    </div>
                    <Link to={`/gallery/${album.id}`}>
                      <h3 className="font-extrabold text-slate-800 text-base md:text-lg uppercase hover:text-[#B91C1C] transition cursor-pointer">
                        {album.title}
                      </h3>
                    </Link>
                    <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
                      {album.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-50">
                    <Link
                      to={`/gallery/${album.id}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B91C1C] hover:opacity-80"
                    >
                      VIEW ALBUM &rarr;
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
