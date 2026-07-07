import { motion } from "framer-motion";
import {
  FaCrosshairs,
  FaBible,
  FaUsers,
  FaHeart,
  FaBullseye,
  FaCross,
  FaGlobe,
  FaHandHoldingHeart,
} from "react-icons/fa";

import VisionCard from "@/components/VisionCard/VisionCard";
import headerBg from "@/assets/images/slide-bible.png";
import missionBg from "@/assets/images/mission-bg.png";
import heroImg from "@/assets/images/hero.png";

const vision = {
  icon: <FaBullseye />,
  title: "OUR VISION",
  description:
    "To see lives transformed and nations impacted through the message of Christ.",
  iconBg: "bg-yellow-600",
  titleColor: "text-yellow-600",
};

const pointsList = [
  {
    icon: <FaBible />,
    title: "WE PREACH",
    text: "We proclaim the Gospel of Jesus Christ with boldness and truth to every soul.",
    iconBg: "bg-red-750",
  },
  {
    icon: <FaUsers />,
    title: "WE DISCIPLE",
    text: "We teach and equip believers to grow in faith, character, and purpose.",
    iconBg: "bg-yellow-650",
  },
  {
    icon: <FaHeart />,
    title: "WE DEMONSTRATE",
    text: "We show God's love through practical acts of kindness, especially to widows and less privileged people.",
    iconBg: "bg-blue-600",
  },
];

const focusPillars = [
  {
    icon: <FaCross />,
    title: "JESUS CENTERED",
    description: "We keep Jesus at the center of everything we do.",
    color: "bg-red-750",
  },
  {
    icon: <FaUsers />,
    title: "PEOPLE FOCUSED",
    description: "We value people and are committed to their growth and well-being.",
    color: "bg-yellow-650",
  },
  {
    icon: <FaHeart />,
    title: "COMPASSION DRIVEN",
    description: "We demonstrate Christ's love through care, support, and acts of compassion.",
    color: "bg-blue-600",
  },
  {
    icon: <FaGlobe />,
    title: "KINGDOM MINDED",
    description: "We are committed to seeing lives changed and nations impacted for God's glory.",
    color: "bg-red-750",
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "SERVICE ORIENTED",
    description: "We exist to serve others and make a positive difference in our world.",
    color: "bg-yellow-650",
  },
];

export default function MissionPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      
      {/* 1. HERO HEADER BANNER (Curved Red & White Wave at the Bottom) */}
      <section className="relative w-full h-[360px] md:h-[440px] bg-slate-950 flex items-center overflow-hidden pt-[90px] pb-12">
        {/* Background Image */}
        <img
          src={headerBg}
          alt="Our Mission Banner"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/55" />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wide">
              OUR MISSION
            </h1>
            <div className="w-20 h-[3px] bg-gold my-4" />
            <p className="text-slate-200 text-xs md:text-sm xl:text-base leading-relaxed font-medium max-w-2xl">
              We are called to make a difference by sharing the love of Christ,
              building strong disciples, and extending compassion to those in need.
            </p>
          </motion.div>
        </div>

        {/* Curved Wave Bottom SVG (Red outline wave overlaid by White wave) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[60px] md:h-[90px]"
          >
            {/* Red border wave */}
            <path
              fill="#B91C1C"
              d="M0,50 C320,118 1120,2 1440,60 L1440,120 L0,120Z"
            />
            {/* White wave matching body background */}
            <path
              fill="#ffffff"
              d="M0,60 C320,128 1120,12 1440,70 L1440,120 L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* 2. CAPSULE MISSION GRID (Red Card Left, Center Circular Image Overlapping, White Card Right) */}
      <section className="w-full py-16 md:py-24 bg-white overflow-hidden">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-stretch">
            
            {/* Left Card: Red background Mission card (lg:col-span-5) */}
            <div className="lg:col-span-5 z-10 flex">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-red-800 text-white rounded-2xl lg:rounded-l-2xl lg:rounded-r-none shadow-xl lg:shadow-none p-8 md:p-10 w-full flex flex-col justify-center border border-red-900 lg:border-r-0 relative"
              >
                {/* Visual cutout overlay placeholder to connect shape */}
                <div className="hidden lg:block absolute -right-[1px] top-1/2 -translate-y-1/2 w-4 h-24 bg-red-800 z-20 border-y border-red-900" />
                
                <div className="w-16 h-16 rounded-full bg-white/10 text-white flex items-center justify-center text-3xl mb-6">
                  <FaCrosshairs className="text-gold" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wide">
                  OUR MISSION
                </h3>
                <div className="mt-3 h-[3px] w-16 bg-yellow-500 rounded-full" />
                <p className="mt-6 text-sm md:text-base leading-relaxed text-slate-100 font-medium">
                  To preach the gospel of Jesus Christ, disciple believers and to demonstrate God's love to the word care for the{" "}
                  <span className="text-gold font-bold italic uppercase tracking-wider block sm:inline mt-2 sm:mt-0">
                    WIDOWS AND LESS PRIVILEGE PEOPLE.
                  </span>
                </p>
              </motion.div>
            </div>

            {/* Center overlap: Sunset cross cropped in a circle (lg:col-span-2) */}
            <div className="lg:col-span-2 -mx-6 lg:-mx-12 xl:-mx-16 z-20 flex items-center justify-center py-6 lg:py-0 relative">
              
              {/* Left Connection Red Dot */}
              <div className="absolute left-6 lg:left-1/4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-red-750 border-2 border-white rounded-full shadow z-30 hidden lg:block" />
              
              {/* Right Connection Gold Dot */}
              <div className="absolute right-6 lg:right-1/4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-gold border-2 border-white rounded-full shadow z-30 hidden lg:block" />
              
              <div className="relative w-56 h-56 md:w-60 md:h-60 rounded-full overflow-hidden border-[6px] border-white shadow-2xl outline outline-2 outline-gold shrink-0 bg-slate-900">
                <img
                  src={heroImg}
                  alt="Sunset Cross Circle"
                  className="w-full h-full object-cover object-center scale-110"
                />
              </div>
            </div>

            {/* Right Card: White background card housing the 3 points (lg:col-span-5) */}
            <div className="lg:col-span-5 z-10 flex">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white text-slate-800 rounded-2xl lg:rounded-r-2xl lg:rounded-l-none shadow-xl p-8 md:p-10 w-full flex flex-col justify-center border border-slate-100 lg:border-l-0"
              >
                <div className="space-y-6 md:space-y-8">
                  {pointsList.map((point, index) => (
                    <div key={index} className="flex items-start gap-4">
                      {/* Point Icon */}
                      <div className={`w-11 h-11 rounded-full ${point.iconBg} text-white flex items-center justify-center text-lg shrink-0 shadow-md`}>
                        {point.icon}
                      </div>
                      {/* Point details */}
                      <div>
                        <h4 className="font-extrabold text-slate-800 text-xs md:text-sm tracking-wide uppercase leading-tight">
                          {point.title}
                        </h4>
                        <p className="text-xs md:text-sm text-slate-500 mt-1.5 leading-relaxed font-medium">
                          {point.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. OUR VISION & SCRIPTURE SECTION (Grid of 2 columns) */}
      <section className="w-full py-16 bg-slate-50 border-t border-slate-100">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Vision Card */}
            <div>
              <VisionCard {...vision} />
            </div>
            
            {/* Scripture Graphic Card */}
            <div className="relative overflow-hidden rounded-xl shadow-lg flex items-center justify-center p-8 bg-slate-900 text-white border border-slate-100 min-h-[220px]">
              <img
                src={missionBg}
                alt="Scripture Background"
                className="absolute inset-0 w-full h-full object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />
              <div className="relative z-10 text-center max-w-md">
                <span className="text-gold font-serif text-5xl leading-none">“</span>
                <p className="font-serif italic text-base leading-relaxed text-slate-100 -mt-2">
                  Go into all the world and preach the gospel to all creation.
                </p>
                <p className="font-sans font-bold text-gold text-right mt-4 text-xs tracking-wider">
                  – Mark 16:15
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR CORE FOCUS SECTION (5 columns horizontal layout: icon-left, text-right) */}
      <section className="w-full py-16 bg-white border-t border-slate-100">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-12">
            <span className="text-red-700 font-extrabold text-xs tracking-widest uppercase">
              MINISTRY PILLARS
            </span>
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-800 uppercase tracking-wide mt-2">
              OUR CORE FOCUS
            </h2>
            <div className="w-16 h-[3px] bg-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {focusPillars.map((pillar, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-2"
              >
                {/* Focus Icon (Circle badge left) */}
                <div className={`w-12 h-12 rounded-full ${pillar.color} text-white flex items-center justify-center text-lg shrink-0 shadow`}>
                  {pillar.icon}
                </div>
                {/* Focus text (right) */}
                <div className="flex-grow">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider leading-snug">
                    {pillar.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-medium">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
