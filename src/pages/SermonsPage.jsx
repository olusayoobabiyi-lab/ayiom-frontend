import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlay, FaSearch, FaUser, FaBook, FaCalendarAlt, FaClock } from "react-icons/fa";
import { SERMONS_DATA } from "@/constants/sermons";
import headerBg from "@/assets/images/hero.png";
import api from "@/services/api";

export default function SermonsPage() {
  const [sermons, setSermons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadSermons() {
      try {
        const res = await api.get("/sermons");
        const mapped = (res.data.data || []).map((s) => ({
          ...s,
          id: s._id,
        }));
        setSermons(mapped);
      } catch (err) {
        console.error("Failed to load sermons:", err);
        setSermons([]);
      }
    }
    loadSermons();
  }, []);

  const filteredSermons = sermons.filter((sermon) => {
    const query = searchQuery.toLowerCase();
    return (
      sermon.title.toLowerCase().includes(query) ||
      sermon.speaker.toLowerCase().includes(query) ||
      sermon.scripture.toLowerCase().includes(query)
    );
  });

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
          alt="Sermons Banner"
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
              — MEDIA LIBRARY
            </span>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider leading-none">
              SERMONS & MESSAGES
            </h1>
            <p className="text-slate-300 text-xs md:text-sm xl:text-base leading-relaxed font-medium">
              Listen to life-transforming sermons, biblical teachings, and spiritual messages
              designed to build your faith and guide your spiritual walk.
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

      {/* Main Catalog & Search */}
      <section className="w-full py-16 bg-white">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 space-y-12">
          {/* Search bar row */}
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search sermons by title, speaker, or scripture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-full py-4 pl-12 pr-6 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 font-medium"
            />
            <FaSearch className="absolute left-5 top-5 text-slate-400" />
          </div>

          {/* Grid of Sermon cards */}
          {filteredSermons.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {filteredSermons.map((sermon) => (
                <motion.div
                  key={sermon.id}
                  variants={itemVariants}
                  className="bg-white border border-slate-100/60 shadow-card hover:shadow-lg rounded-2xl overflow-hidden flex flex-col h-full group"
                >
                  {/* Thumbnail Cover */}
                  <div className="relative h-48 bg-slate-950 overflow-hidden shrink-0">
                    <img
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      className="w-full h-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

                    {/* Centered Play Button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Link
                        to={`/sermons/${sermon.id}`}
                        className="w-14 h-14 rounded-full bg-[#B91C1C] hover:bg-red-800 text-white flex items-center justify-center text-sm shadow-md transition-transform duration-300 group-hover:scale-110 pl-1"
                      >
                        <FaPlay />
                      </Link>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <FaCalendarAlt /> {sermon.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FaClock /> {sermon.duration}
                        </span>
                      </div>
                      <Link to={`/sermons/${sermon.id}`}>
                        <h3 className="font-extrabold text-slate-800 text-base md:text-lg leading-snug hover:text-[#B91C1C] transition cursor-pointer">
                          {sermon.title}
                        </h3>
                      </Link>
                      <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed line-clamp-2">
                        {sermon.description}
                      </p>
                    </div>

                    <div className="border-t border-slate-50 pt-4 flex flex-col gap-1.5 text-xs font-bold text-slate-600">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-slate-400 text-[10px]" />
                        <span>
                          Speaker: <strong className="text-slate-800">{sermon.speaker}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaBook className="text-[#D4AF37] text-[10px]" />
                        <span>
                          Scripture:{" "}
                          <strong className="text-slate-800 font-serif italic">
                            {sermon.scripture}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <p className="text-slate-500 font-medium">No sermons found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
