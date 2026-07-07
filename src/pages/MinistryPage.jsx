import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaCross,
  FaUsers,
  FaHandHoldingHeart,
  FaGraduationCap,
  FaHeart,
  FaChild,
  FaPrayingHands,
  FaHandshake,
  FaBook,
} from "react-icons/fa";

import headerBg from "@/assets/images/slide-worship.png";
import { MINISTRIES_DATA } from "@/constants/ministries";

const getMinistryIcon = (iconName) => {
  switch (iconName) {
    case "cross":
      return <FaCross />;
    case "users":
      return <FaUsers />;
    case "outreach":
      return <FaHandHoldingHeart />;
    case "school":
      return <FaGraduationCap />;
    case "widows":
      return <FaHeart />;
    case "orphans":
      return <FaChild />;
    case "prayer":
      return <FaPrayingHands />;
    case "volunteer":
      return <FaHandshake />;
    default:
      return null;
  }
};

export default function MinistryPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. HERO HEADER BANNER */}
      <section className="relative w-full min-h-[380px] lg:h-[450px] bg-slate-950 flex items-center overflow-hidden pb-16 pt-12">
        {/* Background Image overlayed */}
        <img
          src={headerBg}
          alt="Ministries Banner"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/60" />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-4"
          >
            <span className="text-gold font-bold uppercase tracking-wider text-xs md:text-sm block">
              — OUR
            </span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider leading-none">
              MINISTRIES
            </h1>
            <p className="text-slate-300 text-xs md:text-sm xl:text-base leading-relaxed font-medium max-w-xl">
              Through these ministries, we fulfill our mission to preach the Gospel, disciple
              believers, and demonstrate God's love by reaching out to widows, orphans and less
              privileged people.
            </p>
          </motion.div>

          {/* 1 Peter Scripture Block (Right Column) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 bg-gradient-to-br from-slate-900/60 to-slate-950/80 border border-slate-800 rounded-xl p-6 md:p-8 flex items-start gap-4 shadow-xl"
          >
            <span className="text-gold font-serif text-5xl leading-none select-none">“</span>
            <div className="-mt-1">
              <p className="font-serif italic text-sm md:text-base leading-relaxed text-slate-100">
                Each one should use whatever gift he has received to serve others, faithfully
                administering God's grace in its various forms.
              </p>
              <p className="font-sans font-bold text-gold text-right mt-3 text-xs tracking-wider">
                — 1 Peter 4:10
              </p>
            </div>
          </motion.div>
        </div>

        {/* Wave Bottom SVG Overlay */}
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

      {/* 2. MINISTRIES GRID SECTION */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-16"
          >
            {MINISTRIES_DATA.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="relative bg-white rounded-xl shadow-card border border-slate-100/60 flex flex-col h-full group"
              >
                {/* Card Image Cover */}
                <div className="relative h-44 overflow-hidden rounded-t-xl shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                </div>

                {/* Card Content with Overlapping Badge */}
                <div className="relative p-6 pt-12 flex-1 flex flex-col justify-between">
                  {/* Circular Icon Badge */}
                  <div
                    className={`absolute left-6 -top-8 w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl shadow-md border-4 border-white ${item.iconColor}`}
                  >
                    {getMinistryIcon(item.iconName)}
                  </div>

                  {/* Text Details */}
                  <div className="space-y-3">
                    <h3
                      className={`font-black text-sm md:text-base uppercase tracking-wider leading-tight ${item.titleColor}`}
                    >
                      {item.title}
                    </h3>
                    <div className={`h-[3px] w-12 rounded ${item.lineColor}`} />
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>

                  {/* Read More link */}
                  <div className="mt-8 pt-4 border-t border-slate-50">
                    <Link
                      to={`/ministry/${item.id}`}
                      className={`inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider transition ${item.titleColor} hover:opacity-85`}
                    >
                      READ MORE <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. RED BANNER CALL-TO-ACTION */}
      <section className="w-full bg-[#7F1D1D] text-white py-8 md:py-10 shadow-lg">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#7F1D1D] text-2xl shrink-0 shadow-md">
            <FaBook />
          </div>
          <div className="space-y-1">
            <h2 className="font-serif italic text-lg md:text-2xl leading-snug">
              "Go into all the world and preach the gospel to all creation."
            </h2>
            <p className="font-sans font-bold text-gold text-sm tracking-wider uppercase md:text-right">
              — Mark 16:15
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
