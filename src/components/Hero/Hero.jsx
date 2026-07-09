import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone, FaChevronRight } from "react-icons/fa";
import { ROUTES } from "@/constants/routes";
import heroImage from "@/assets/images/hero.png";

import api from "@/services/api";

const DEFAULT_SLIDES = [
  {
    image: heroImage,
    title: "AMEND YOUR WAYS INT'L OUTREACH MINISTRY",
    subtitle: "",
  },
];

const Hero = () => {
  const [slides, setSlides] = useState(DEFAULT_SLIDES);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await api.get("/homepage");
        const carousel = res.data.data?.heroCarousel || [];
        if (carousel.length > 0) {
          setSlides(carousel);
        }
      } catch (err) {
        console.error("Failed to load hero banner slides:", err);
      }
    }
    fetchSlides();
  }, []);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[600px] md:h-[750px] xl:h-[950px] overflow-hidden bg-slate-950 flex items-center">
      {/* Background Carousel */}
      <div className="absolute inset-0 w-full h-full z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={slides[current].image}
            alt="Carousel Background"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent z-10" />

      {/* Content Container */}
      <div className="relative z-20 w-full px-6 md:px-14 lg:px-24 flex flex-col xl:flex-row xl:items-center xl:justify-between h-full pt-[100px] pb-12 xl:py-0">
        {/* Left Side Content */}
        <div className="max-w-xl text-white flex flex-col justify-center h-full">
          <p className="font-script text-gold text-3xl md:text-4xl mb-2 font-medium tracking-wide">
            Welcome to
          </p>

          <h1 className="text-2xl md:text-3xl xl:text-4xl font-black leading-[1.1] uppercase tracking-wide">
            {slides[current].title}
            <span className="block mt-2 text-xl md:text-2xl xl:text-3xl font-bold tracking-normal text-slate-100">
              {slides[current].subtitle}
            </span>
          </h1>

          <div className="w-24 h-[3px] bg-gold my-5" />

          <p className="text-slate-200 text-xs md:text-sm xl:text-base leading-relaxed font-medium">
            We preach Christ, win souls, disciple believers, and show God's love through care for{" "}
            <span className="text-gold font-bold uppercase tracking-wider block sm:inline">
              WIDOWS AND LESS PRIVILEGE PEOPLE.
            </span>
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link to={ROUTES.ABOUT}>
              <button className="bg-red-700 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded flex items-center gap-2 transition duration-200">
                LEARN MORE <FaChevronRight className="text-[10px]" />
              </button>
            </Link>

            <Link to={ROUTES.CONTACT}>
              <button className="border-2 border-white hover:bg-white hover:text-slate-900 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded flex items-center gap-2 transition duration-200">
                <FaPhone className="text-xs" /> CONTACT US
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side Scripture Verse (only on xl screen) */}
        <div className="hidden xl:flex items-center justify-center relative px-4 mr-8">
          <div className="relative text-white max-w-[280px]">
            {/* Big gold double quotation marks */}
            <span className="absolute -left-8 -top-8 font-serif text-[90px] text-gold/30 leading-none select-none">
              “
            </span>
            <div className="relative z-10 pl-2">
              <p className="font-serif italic text-base leading-relaxed text-slate-100">
                I am the way, the truth, and the life. No one comes to the Father except through me.
              </p>
              <p className="font-sans font-bold text-gold text-right mt-3 tracking-wider text-sm">
                – John 14:6
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators (dots) */}
      <div className="absolute bottom-6 left-6 md:left-12 lg:left-16 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current ? "bg-gold w-6" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
