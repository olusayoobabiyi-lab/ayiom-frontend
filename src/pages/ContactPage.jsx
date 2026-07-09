import { useState } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import headerBg from "@/assets/images/hero.png";
import api from "@/services/api";
import { useToast } from "@/context/ToastContext";

export default function ContactPage() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/contact", formData);
      setIsSubmitted(true);
      toast.success("Message sent! Thank you for contacting Amend Your Ways.");
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 5000);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to send message. Please try again.");
    }
  };

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[300px] lg:h-[380px] bg-slate-950 flex items-center overflow-hidden pb-12 pt-16">
        <img
          src={headerBg}
          alt="Contact Us Banner"
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
              — GET IN TOUCH
            </span>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider leading-none">
              CONTACT US
            </h1>
            <p className="text-slate-300 text-xs md:text-sm xl:text-base leading-relaxed font-medium">
              We would love to hear from you. Reach out to us for prayers, partnership inquiries, or
              general support requests.
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

      {/* Main Content Layout Grid */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16">
          {/* Left Column: Info & Google Maps placeholder (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-slate-800">
                Contact Information
              </h2>
              <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed max-w-sm">
                Have questions or need counsel? Get in touch with our ministry coordinators. We are
                ready to serve and stand with you.
              </p>
            </div>

            <div className="space-y-6 text-xs md:text-sm">
              <div className="flex gap-4 items-start bg-slate-50 border border-slate-100 rounded-xl p-5 shadow-sm">
                <span className="w-10 h-10 rounded-full bg-[#B91C1C]/10 text-[#B91C1C] flex items-center justify-center text-base shrink-0">
                  <FaPhone />
                </span>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Phone Numbers</h4>
                  <p className="text-slate-600 font-bold">+2348168804973</p>
                  <p className="text-slate-600 font-bold">+2348062862967</p>
                  <p className="text-slate-600 font-bold">+2349032598186</p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-slate-50 border border-slate-100 rounded-xl p-5 shadow-sm">
                <span className="w-10 h-10 rounded-full bg-[#B91C1C]/10 text-[#B91C1C] flex items-center justify-center text-base shrink-0">
                  <FaEnvelope />
                </span>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Email Address</h4>
                  <p className="text-slate-600 font-bold">amendyourwaysintl@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-slate-50 border border-slate-100 rounded-xl p-5 shadow-sm">
                <span className="w-10 h-10 rounded-full bg-[#B91C1C]/10 text-[#B91C1C] flex items-center justify-center text-base shrink-0">
                  <FaMapMarkerAlt />
                </span>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Office Location</h4>
                  <p className="text-slate-600 font-semibold leading-relaxed">
                    Retreat Centre, No 7, Road B, Olutosin Estate, Iloro Community, Ejioku, Ibadan,
                    Oyo State, Nigeria.
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Iframe Google Maps placeholder */}
            <div className="aspect-video w-full rounded-xl border border-slate-200 overflow-hidden shadow-sm relative bg-slate-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3955.9286811321645!2d4.1001601865081785!3d7.473128188528328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sng!4v1783436674086!5m2!1sen!2sng"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                title="Ministry Location Map"
              />
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm">
              <h3 className="font-extrabold text-lg md:text-xl text-slate-800 uppercase tracking-wide mb-2">
                SEND A MESSAGE
              </h3>
              <p className="text-xs text-slate-500 font-bold mb-8">
                Please fill out this form and our support team will reach back to you.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-8 text-center space-y-3"
                >
                  <h4 className="font-bold text-sm">Message Sent Successfully!</h4>
                  <p className="text-xs leading-relaxed max-w-sm mx-auto">
                    Thank you for reaching out. Your submission has been received, and we will get
                    back to you shortly. God bless you!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-white border border-slate-300 rounded px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
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
                        placeholder="john.doe@example.com"
                        className="w-full bg-white border border-slate-300 rounded px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Prayer Request / Inquiry"
                      className="w-full bg-white border border-slate-300 rounded px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Message Content
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Write your message details..."
                      className="w-full bg-white border border-slate-300 rounded px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#B91C1C] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded flex items-center justify-center gap-2 transition shadow-sm"
                  >
                    <FaPaperPlane className="text-[10px]" /> SEND MESSAGE
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
