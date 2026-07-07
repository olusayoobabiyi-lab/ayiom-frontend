import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaClock, FaMapMarkerAlt, FaCalendarCheck, FaPaperPlane } from "react-icons/fa";
import { EVENTS_DATA } from "@/constants/events";

export default function EventDetailPage() {
  const { id } = useParams();
  const event = EVENTS_DATA.find((e) => e.id === id);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);

  if (!event) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Event Not Found</h2>
        <p className="text-slate-600 mb-6">The event you are looking for does not exist or has passed.</p>
        <Link
          to="/events"
          className="bg-[#B91C1C] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded flex items-center gap-2 transition"
        >
          <FaArrowLeft /> BACK TO EVENTS
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register for event:", event.id, formData);
    setIsRegistered(true);
    setTimeout(() => {
      setIsRegistered(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 5000);
  };

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[280px] md:h-[350px] bg-slate-950 flex items-center overflow-hidden pb-12 pt-16">
        <img
          src={event.image}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60" />

        <div className="relative z-10 w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 text-white pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition"
            >
              <FaArrowLeft /> BACK TO EVENTS
            </Link>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-wider leading-tight">
              {event.title}
            </h1>
            <div className={`h-[3px] w-20 rounded ${event.monthColor}`} />
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

      {/* Main Body */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16">
          
          {/* Left Column: Event details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-slate-800">
                About this Event
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                {event.details}
              </p>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                We invite you, your friends, and your family to join us as we gather together to impact lives and share the love of Christ. If you would like to participate as a volunteer, please fill out the RSVP form on the right so our team can prepare for your arrival.
              </p>
            </div>

            {/* Quick Details Icons Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 ${event.monthColor}`}>
                  <FaCalendarCheck />
                </span>
                <div>
                  <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Date</span>
                  <span className="text-xs md:text-sm text-slate-800 font-bold">{event.month} {event.day}, {event.year}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 ${event.monthColor}`}>
                  <FaClock />
                </span>
                <div>
                  <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Time</span>
                  <span className="text-xs md:text-sm text-slate-800 font-bold">{event.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 ${event.monthColor}`}>
                  <FaMapMarkerAlt />
                </span>
                <div>
                  <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Venue</span>
                  <span className="text-xs md:text-sm text-slate-800 font-bold">{event.venue}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: RSVP registration form */}
          <div className="lg:col-span-4">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 sticky top-[120px] shadow-sm">
              <h3 className="font-extrabold text-lg md:text-xl text-slate-800 uppercase tracking-wide mb-2">
                RSVP FOR THIS EVENT
              </h3>
              <p className="text-xs text-slate-500 font-bold mb-6">
                Register to attend or volunteer at this program.
              </p>

              {isRegistered ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-6 text-center space-y-3"
                >
                  <h4 className="font-bold text-sm">RSVP Submitted!</h4>
                  <p className="text-xs leading-relaxed">
                    Thank you for registering to attend. We've reserved a spot for you and look forward to seeing you there!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="w-full bg-white border border-slate-300 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full bg-white border border-slate-300 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your Phone Number"
                      className="w-full bg-white border border-slate-300 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Message / Special Requests
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Volunteering interests or general queries..."
                      className="w-full bg-white border border-slate-300 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#B91C1C] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider py-4 rounded flex items-center justify-center gap-2 transition shadow-sm"
                  >
                    <FaPaperPlane className="text-[10px]" /> SUBMIT RSVP
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
