import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCrosshairs,
  FaBullseye,
  FaBible,
  FaHeart,
  FaUsers,
  FaHandHoldingHeart,
  FaGlobe,
  FaCheckCircle,
} from "react-icons/fa";

import MissionCard from "@/components/MissionCard/MissionCard";
import VisionCard from "@/components/VisionCard/VisionCard";
import headerBg from "@/assets/images/hero.png";
import missionBg from "@/assets/images/mission-bg.png";
import heroImg from "@/assets/images/hero.png";

const mission = {
  icon: <FaCrosshairs />,
  title: "OUR MISSION",
  description:
    "To preach the gospel of Jesus Christ, disciple believers and to demonstrate God's love to the word care for the",
  highlightText: "WIDOWS AND LESS PRIVILEGE PEOPLE.",
  iconBg: "bg-red-800",
  titleColor: "text-red-750",
};

const vision = {
  icon: <FaBullseye />,
  title: "OUR VISION",
  description: "To see lives transformed and nations impacted through the message of Christ.",
  iconBg: "bg-yellow-600",
  titleColor: "text-yellow-600",
};

const coreValues = [
  {
    icon: <FaBible />,
    title: "THE WORD",
    description: "We uphold and teach the uncompromised Word of God.",
    color: "bg-red-700",
  },
  {
    icon: <FaHeart />,
    title: "LOVE",
    description: "We demonstrate God's love through kindness and care.",
    color: "bg-yellow-600",
  },
  {
    icon: <FaUsers />,
    title: "DISCIPLESHIP",
    description: "We raise and equip believers to fulfill their God-given purpose.",
    color: "bg-red-700",
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "COMPASSION",
    description: "We care for widows, orphans, and less privileged people.",
    color: "bg-yellow-600",
  },
  {
    icon: <FaGlobe />,
    title: "OUTREACH",
    description: "We reach beyond our walls to impact communities and nations.",
    color: "bg-red-700",
  },
];

const whatWeDoList = [
  "Preach the Gospel and win souls",
  "Discipleship and spiritual growth",
  "Outreach to rural communities",
  "Support for widows and less privileged people",
  "Back to School Support for children",
  "Prayer, counseling and support services",
];

import api from "@/services/api";

const EVENT_SLIDES = [{ image: heroImg, caption: "Widows Support Outreach & Empowerment" }];

export default function AboutPage() {
  const [eventSlides, setEventSlides] = useState(EVENT_SLIDES);
  const [currentEventSlide, setCurrentEventSlide] = useState(0);

  useEffect(() => {
    async function loadAboutCarousel() {
      try {
        const res = await api.get("/about");
        const carousel = res.data.data?.carousel || [];
        if (carousel.length > 0) {
          const mapped = carousel.map((url, idx) => ({
            image: url,
            caption: `Amend Your Ways Outreach Photo ${idx + 1}`,
          }));
          setEventSlides(mapped);
        }
      } catch (err) {
        console.error("Failed to load about page carousel:", err);
      }
    }
    loadAboutCarousel();
  }, []);

  // Auto rotate the past events carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEventSlide((prev) => (prev + 1) % eventSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [eventSlides.length]);

  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. HERO HEADER BANNER (Curved Red & White Wave at the Bottom) */}
      <section className="relative w-full h-[360px] md:h-[440px] bg-slate-950 flex items-center overflow-hidden pt-[90px] pb-12">
        {/* Background Image */}
        <img
          src={headerBg}
          alt="About Us Banner"
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
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wide">ABOUT US</h1>
            <div className="w-20 h-[3px] bg-gold my-4" />
            <p className="text-slate-200 text-xs md:text-sm xl:text-base leading-relaxed font-medium max-w-2xl">
              We are a Christ-centered ministry committed to preaching the Gospel, discipling
              believers, and showing God's love through practical acts of kindness, especially to
              widows and less privileged people.
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
            <path fill="#B91C1C" d="M0,50 C320,118 1120,2 1440,60 L1440,120 L0,120Z" />
            {/* White wave matching body background */}
            <path fill="#ffffff" d="M0,60 C320,128 1120,12 1440,70 L1440,120 L0,120Z" />
          </svg>
        </div>
      </section>

      {/* 2. WHO WE ARE & MISSION/VISION SECTION */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Column: Who We Are Text Block (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-red-700 font-extrabold text-xs tracking-widest uppercase">
                WHO WE ARE
              </span>
              <h2 className="text-2xl md:text-3.5xl font-black text-slate-800 uppercase tracking-wide mt-2">
                OUR IDENTITY IN CHRIST
              </h2>
              <div className="w-14 h-[3px] bg-gold my-5" />

              <div className="space-y-4 text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                <p>
                  Amend Your Ways Int'l Outreach Ministry is a faith-based organization dedicated to
                  transforming lives and impacting nations with the love of Christ. We believe that
                  true religion is demonstrated through the Word of God and acts of compassion.
                </p>
                <p>
                  We reach out to communities, share the Gospel, support the less privileged, and
                  disciple believers to walk in purpose and power.
                </p>
              </div>

              {/* Scripture Mark 16:15 Quote block */}
              <div className="mt-8 border-l-4 border-gold pl-4 py-2 italic font-serif text-slate-700 text-sm md:text-base bg-slate-50/50 rounded-r">
                "Go into all the world and preach the gospel to all creation."
                <span className="block font-sans font-bold text-gold text-xs tracking-wider uppercase mt-2 not-italic">
                  – Mark 16:15
                </span>
              </div>
            </div>

            {/* Middle Column: Stacked Mission/Vision Cards (lg:col-span-4) */}
            <div className="lg:col-span-4 flex flex-col gap-6 justify-center">
              <MissionCard {...mission} />
              <VisionCard {...vision} />
            </div>

            {/* Right Column: Galatians Quote Card with Bg Image (lg:col-span-3) */}
            <div className="lg:col-span-3 flex items-center justify-center">
              <div className="relative overflow-hidden rounded-xl shadow-lg w-full h-full min-h-[250px] flex items-center justify-center p-8 bg-slate-900 text-white border border-slate-100">
                <img
                  src={missionBg}
                  alt="Scripture Background"
                  className="absolute inset-0 w-full h-full object-cover opacity-25"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />
                <div className="relative z-10 text-center max-w-xs">
                  <span className="text-gold font-serif text-5xl leading-none">“</span>
                  <p className="font-serif italic text-sm leading-relaxed text-slate-100 -mt-2">
                    Carry each other's burdens, and in this way you will fulfill the law of Christ.
                  </p>
                  <p className="font-sans font-bold text-gold text-right mt-4 text-xs tracking-wider">
                    – Galatians 6:2
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR CORE VALUES SECTION (5-column Row) */}
      <section className="w-full py-16 bg-slate-50 border-y border-slate-100">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-12">
            <span className="text-red-705 font-extrabold text-xs tracking-widest uppercase">
              FOUNDATIONAL PILLARS
            </span>
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-800 uppercase tracking-wide mt-2">
              OUR CORE VALUES
            </h2>
            <div className="w-16 h-[3px] bg-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col items-center text-center h-full"
              >
                {/* Value Icon */}
                <div
                  className={`w-14 h-14 rounded-full ${value.color} text-white flex items-center justify-center text-xl shadow-md`}
                >
                  {value.icon}
                </div>
                {/* Title */}
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mt-4">
                  {value.title}
                </h4>
                <div className="w-10 h-0.5 bg-yellow-500 rounded-full my-2.5" />
                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT WE DO SECTION (Checked list and past events image carousel side-by-side) */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left side: Checklist (lg:col-span-6) */}
            <div className="lg:col-span-6">
              <span className="text-red-700 font-extrabold text-xs tracking-widest uppercase">
                MINISTRY SERVICE
              </span>
              <h2 className="text-2xl md:text-3.5xl font-black text-slate-800 uppercase tracking-wide mt-2">
                WHAT WE DO
              </h2>
              <div className="w-14 h-[3px] bg-gold my-5" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {whatWeDoList.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="text-gold mt-1 shrink-0 text-sm" />
                    <span className="text-xs md:text-sm text-slate-700 font-bold leading-normal">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Joyful past events carousel card (lg:col-span-6) */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-2xl shadow-xl border border-slate-100 aspect-video lg:aspect-[1.7] bg-slate-950 group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentEventSlide}
                    src={eventSlides[currentEventSlide].image}
                    alt={eventSlides[currentEventSlide].caption}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 0.8, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Black Overlay at bottom for caption */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-5 z-10">
                  <p className="text-red-550 text-[10px] font-black uppercase tracking-widest">
                    Past Event
                  </p>
                  <p className="text-gold text-xs md:text-sm font-extrabold mt-1">
                    {eventSlides[currentEventSlide].caption}
                  </p>
                </div>

                {/* Carousel indicators (dots) */}
                <div className="absolute top-4 right-4 z-20 flex gap-1.5 bg-black/45 px-3 py-2 rounded-full backdrop-blur-sm">
                  {eventSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentEventSlide(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        index === currentEventSlide
                          ? "bg-gold scale-125"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
