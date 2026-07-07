import { useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaChevronRight } from "react-icons/fa";
import { EVENTS_DATA } from "@/constants/events";
import "react-calendar/dist/Calendar.css";

import headerBg from "@/assets/images/slide-worship.png";

export default function CalendarPage() {
  // Start calendar in May 2025 to match our mock data
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 4, 18));

  // Find events on selected date
  const selectedEvents = EVENTS_DATA.filter((event) => {
    return (
      event.day === selectedDate.getDate() &&
      event.year === selectedDate.getFullYear() &&
      (event.month === "MAY" && selectedDate.getMonth() === 4 ||
       event.month === "JUN" && selectedDate.getMonth() === 5 ||
       event.month === "AUG" && selectedDate.getMonth() === 7)
    );
  });

  const getTileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    if (year === 2025) {
      const match = EVENTS_DATA.find((e) => {
        return (
          e.day === day &&
          (e.month === "MAY" && month === 4 ||
           e.month === "JUN" && month === 5 ||
           e.month === "AUG" && month === 7)
        );
      });

      if (match) {
        let dotColor = "bg-[#16A34A]"; // outreach
        if (match.category === "prayer") dotColor = "bg-[#D4AF37]";
        if (match.category === "widows") dotColor = "bg-[#DC2626]";
        if (match.category === "school") dotColor = "bg-[#2563EB]";

        return (
          <div className="flex justify-center mt-1">
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
          </div>
        );
      }
    }
    return null;
  };

  const getTileClassName = ({ date, view }) => {
    if (view !== "month") return "";
    
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const match = EVENTS_DATA.find((e) => {
      return (
        e.day === day &&
        e.year === year &&
        (e.month === "MAY" && month === 4 ||
         e.month === "JUN" && month === 5 ||
         e.month === "AUG" && month === 7)
      );
    });

    if (match) {
      return "font-bold text-red-750";
    }
    return "";
  };

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[300px] lg:h-[380px] bg-slate-950 flex items-center overflow-hidden pb-12 pt-16">
        <img
          src={headerBg}
          alt="Calendar Banner"
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
              — STAY UPDATED
            </span>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider leading-none">
              EVENT CALENDAR
            </h1>
            <p className="text-slate-300 text-xs md:text-sm xl:text-base leading-relaxed font-medium">
              View our complete calendar of events. Click on marked dates to see scheduled ministries, programs, and outreach activities.
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

      {/* Main Grid */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
          
          {/* Calendar Widget Column (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200/60 pb-4">
              <FaCalendarAlt className="text-red-750 text-xl" />
              <h3 className="font-extrabold text-sm md:text-base text-slate-800 uppercase tracking-widest">
                SELECT A DATE
              </h3>
            </div>
            
            <div className="calendar-large-container bg-white rounded-xl border border-slate-100 p-4 shadow-inner">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileContent={getTileContent}
                tileClassName={getTileClassName}
                className="w-full border-0 font-sans"
              />
            </div>

            {/* Legend block */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-600 border-t border-slate-200/60 pt-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a]" />
                <span>Outreach</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                <span>Prayer & Revival</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" />
                <span>Widows Welfare</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
                <span>School Support</span>
              </div>
            </div>
          </div>

          {/* Events Sidebar Column (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-white border border-slate-100 shadow-card rounded-2xl p-6 md:p-8 space-y-6 min-h-[400px]">
            <h3 className="font-black text-slate-800 text-base md:text-lg uppercase tracking-wider pb-4 border-b border-slate-100">
              Schedule for {selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </h3>

            <AnimatePresence mode="wait">
              {selectedEvents.length > 0 ? (
                <motion.div
                  key="events-list"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {selectedEvents.map((event) => (
                    <div key={event.id} className="group border border-slate-150 rounded-xl p-5 hover:bg-slate-50 transition shadow-sm">
                      <span className={`inline-block text-[9px] font-extrabold text-white px-2 py-0.5 rounded uppercase tracking-wider mb-3 ${event.monthColor}`}>
                        {event.category}
                      </span>
                      <h4 className="font-bold text-slate-800 text-sm md:text-base mb-3 leading-snug">
                        {event.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">
                        {event.details}
                      </p>
                      <div className="flex flex-col gap-2 border-t border-slate-100 pt-3 text-[11px] font-bold text-slate-500">
                        <div className="flex items-center gap-2">
                          <FaClock className="text-slate-400" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-red-600" />
                          <span className="uppercase tracking-wider">{event.venue}</span>
                        </div>
                      </div>
                      <Link
                        to={`/events/${event.id}`}
                        className="mt-4 flex items-center justify-between font-bold text-[10px] uppercase tracking-widest text-[#B91C1C] hover:opacity-80 pt-3 border-t border-slate-50"
                      >
                        VIEW FULL DETAILS <FaChevronRight className="text-[8px]" />
                      </Link>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-events"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center py-16 text-slate-400 space-y-3"
                >
                  <FaCalendarAlt size={36} className="text-slate-350" />
                  <p className="text-xs font-semibold max-w-xs leading-relaxed">
                    No ministry events scheduled on this day. Please select highlighted dates on the calendar to see upcoming programs.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>
    </div>
  );
}
