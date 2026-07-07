import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

import Button from "@/components/common/Button/Button";
import { ROUTES } from "@/constants/routes";

const navItems = [
  { label: "HOME", to: ROUTES.HOME },
  { label: "ABOUT US", to: ROUTES.ABOUT },
  { label: "OUR MISSION", to: ROUTES.MISSION },
  { label: "MINISTRIES", to: ROUTES.MINISTRY },
  { label: "EVENTS", to: ROUTES.EVENTS },
  { label: "CALENDAR", to: ROUTES.CALENDAR },
  { label: "SERMONS", to: ROUTES.SERMONS },
  { label: "GALLERY", to: ROUTES.GALLERY },
  { label: "CONTACT", to: ROUTES.CONTACT },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const { pathname } = useLocation();

  // Scroll listener to toggle solid state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (route) =>
    route === ROUTES.HOME ? pathname === route : pathname.startsWith(route);

  // Navbar is solid if scrolled, hovered, or mobile drawer is open
  const isSolid = isScrolled || isHovered || isOpen;

  return (
    <>
      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
          isSolid
            ? "bg-slate-50/95 backdrop-blur-md shadow-md py-4 text-slate-800 border-b border-slate-200/50"
            : "bg-transparent py-5 text-white"
        }`}
      >
        <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="h-[50px] flex items-center justify-between">
            
            {/* Logo Group */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img
                src="/amend-logo.png"
                alt="Ministry Seal Logo"
                className="w-14 h-14 object-contain rounded-full bg-white p-0.5"
              />
              <div>
                <h2 className={`font-black uppercase tracking-wider text-base md:text-lg leading-tight transition-colors duration-300 ${
                  isSolid ? "text-slate-850" : "text-white"
                }`}>
                  AMEND YOUR WAYS
                </h2>
                <p className={`uppercase text-[9px] font-bold tracking-wider transition-colors duration-300 ${
                  isSolid ? "text-slate-500" : "text-slate-300"
                }`}>
                  INT'L OUTREACH MINISTRY
                </p>
                <span className="text-[10px] italic font-extrabold text-red-650 tracking-wide mt-0.5 block">
                  Changing Lives, Impacting Nations
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative font-bold text-xs uppercase tracking-wider transition-colors duration-300 py-2 ${
                    isActive(item.to)
                      ? isSolid ? "text-red-700 font-extrabold" : "text-gold font-extrabold"
                      : isSolid ? "text-slate-650 hover:text-red-700" : "text-slate-200 hover:text-gold"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 bottom-0 h-[2px] transition-all duration-300 ${
                      isActive(item.to)
                        ? "w-full bg-gold"
                        : `w-0 hover:w-full ${isSolid ? "bg-red-700" : "bg-gold"}`
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Desktop CTA Group */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to={ROUTES.REGISTER}>
                <Button className={`border font-bold text-xs uppercase tracking-wider px-5 py-3 rounded transition-all duration-300 ${
                  isSolid
                    ? "border-slate-300 hover:bg-slate-100 hover:text-red-700 text-slate-700"
                    : "border-white/30 hover:bg-white/10 text-white"
                }`}>
                  JOIN US
                </Button>
              </Link>
              <Link to={ROUTES.GIVE}>
                <Button className="bg-[#B91C1C] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded flex items-center gap-2 shadow-sm">
                  <FaHeart className="text-white text-xs" /> GIVE NOW
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              className={`lg:hidden p-2 transition-colors duration-300 ${
                isSolid ? "text-slate-700" : "text-white"
              }`}
              onClick={() => setIsOpen(true)}
              aria-label="Open navigation"
            >
              <FiMenu size={26} />
            </button>

          </div>
        </div>
      </header>

      {/* spacer removed to allow content below to take full screen height from top-0 */}

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[9998]"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: 350 }}
              animate={{ x: 0 }}
              exit={{ x: 350 }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 right-0 h-screen w-[300px] bg-white z-[9999] shadow-2xl flex flex-col text-slate-800"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-slate-100">
                <h3 className="font-extrabold text-slate-800 uppercase tracking-widest text-sm">
                  Navigation
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation"
                  className="text-slate-500 hover:text-slate-850 p-1"
                >
                  <FiX size={26} />
                </button>
              </div>

              {/* Links */}
              <nav className="p-6 flex flex-col gap-4 overflow-y-auto flex-grow">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={`font-bold text-xs uppercase tracking-wider py-2 border-b border-slate-50 ${
                      isActive(item.to) ? "text-red-700 font-extrabold" : "text-slate-650 hover:text-red-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                <Link to={ROUTES.REGISTER} onClick={() => setIsOpen(false)} className="mt-6 w-full">
                  <Button className="border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider py-3.5 w-full flex items-center justify-center">
                    JOIN US
                  </Button>
                </Link>

                <Link to={ROUTES.GIVE} onClick={() => setIsOpen(false)} className="w-full">
                  <Button
                    className="bg-[#B91C1C] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider py-3.5 w-full flex items-center justify-center gap-2"
                  >
                    <FaHeart className="text-white text-xs" /> GIVE NOW
                  </Button>
                </Link>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
