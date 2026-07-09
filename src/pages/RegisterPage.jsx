import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserPlus, FaHandshake, FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import headerBg from "@/assets/images/hero.png";
import api from "@/services/api";
import { useToast } from "@/context/ToastContext";

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState("member"); // member | partner

  const [memberForm, setMemberForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
    comments: "",
  });

  const [partnerForm, setPartnerForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    partnershipType: "financial",
    frequency: "monthly",
    comments: "",
  });

  const toast = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleMemberChange = (e) => {
    const { name, value } = e.target;
    setMemberForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePartnerChange = (e) => {
    const { name, value } = e.target;
    setPartnerForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload =
      activeTab === "member"
        ? { type: "member", ...memberForm }
        : { type: "partner", ...partnerForm };

    try {
      await api.post("/registrations", payload);
      setIsSubmitted(true);
      toast.success(
        activeTab === "member"
          ? "Membership application submitted successfully!"
          : "Partnership registration submitted successfully!"
      );
      setTimeout(() => {
        setIsSubmitted(false);
        setMemberForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          dob: "",
          gender: "",
          comments: "",
        });
        setPartnerForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          partnershipType: "financial",
          frequency: "monthly",
          comments: "",
        });
      }, 5000);
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to submit registration. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[300px] lg:h-[380px] bg-slate-950 flex items-center overflow-hidden pb-12 pt-16">
        <img
          src={headerBg}
          alt="Join Us Banner"
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
              — FELLOWSHIP & COVENANT
            </span>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider leading-none">
              JOIN OUR MINISTRY
            </h1>
            <p className="text-slate-300 text-xs md:text-sm xl:text-base leading-relaxed font-medium">
              Take the next step in your spiritual journey. Whether you wish to become a committed
              member of our local church family or partner with us to spread the gospel globally, we
              welcome you.
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

      {/* Forms Section */}
      <section className="w-full py-16 bg-white">
        <div className="w-full max-w-[1000px] mx-auto px-6">
          {/* Tab buttons */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-12 border-b border-slate-100 pb-8">
            <button
              onClick={() => {
                setActiveTab("member");
                setIsSubmitted(false);
              }}
              className={`py-4 px-6 rounded-xl text-xs md:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border ${
                activeTab === "member"
                  ? "bg-[#B91C1C] text-white border-[#B91C1C] shadow-md"
                  : "bg-slate-50 border-slate-200/60 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <FaUserPlus /> BECOME A MEMBER
            </button>
            <button
              onClick={() => {
                setActiveTab("partner");
                setIsSubmitted(false);
              }}
              className={`py-4 px-6 rounded-xl text-xs md:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border ${
                activeTab === "partner"
                  ? "bg-[#B91C1C] text-white border-[#B91C1C] shadow-md"
                  : "bg-slate-50 border-slate-200/60 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <FaHandshake /> BECOME A PARTNER
            </button>
          </div>

          {/* Form Content container */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-10 shadow-sm min-h-[500px]">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[350px] flex flex-col items-center justify-center text-center space-y-4 py-12"
              >
                <FaCheckCircle className="text-emerald-500 text-6xl animate-bounce" />
                <h3 className="font-extrabold text-xl md:text-2xl text-slate-800 uppercase tracking-wide">
                  Submission Successful!
                </h3>
                <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed max-w-md">
                  Thank you for taking this step to join hands with us! Our ministry team has
                  received your registration details for the{" "}
                  <strong>{activeTab === "member" ? "Membership" : "Partnership"}</strong> program.
                  We will contact you soon.
                </p>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                {activeTab === "member" ? (
                  <motion.form
                    key="member-form"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="border-b border-slate-200/60 pb-3 mb-6">
                      <h3 className="font-extrabold text-slate-800 text-base md:text-lg uppercase">
                        Membership Application Form
                      </h3>
                      <p className="text-slate-500 text-[11px] font-semibold mt-1">
                        Register as a regular member of Amend Your Ways outreach family.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={memberForm.firstName}
                          onChange={handleMemberChange}
                          placeholder="First Name"
                          className="w-full bg-white border border-slate-350 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={memberForm.lastName}
                          onChange={handleMemberChange}
                          placeholder="Last Name"
                          className="w-full bg-white border border-slate-350 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={memberForm.email}
                          onChange={handleMemberChange}
                          placeholder="your.email@example.com"
                          className="w-full bg-white border border-slate-350 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={memberForm.phone}
                          onChange={handleMemberChange}
                          placeholder="Phone Number"
                          className="w-full bg-white border border-slate-350 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dob"
                          required
                          value={memberForm.dob}
                          onChange={handleMemberChange}
                          className="w-full bg-white border border-slate-350 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Gender
                        </label>
                        <select
                          name="gender"
                          required
                          value={memberForm.gender}
                          onChange={handleMemberChange}
                          className="w-full bg-white border border-slate-350 rounded px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 font-medium"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Residential Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={memberForm.address}
                        onChange={handleMemberChange}
                        placeholder="House address, city, state"
                        className="w-full bg-white border border-slate-350 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Prayer Requests / Comments
                      </label>
                      <textarea
                        name="comments"
                        rows={4}
                        value={memberForm.comments}
                        onChange={handleMemberChange}
                        placeholder="Share any prayer requests or brief info about yourself..."
                        className="w-full bg-white border border-slate-350 rounded px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-[#B91C1C] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded flex items-center justify-center gap-2 transition shadow-sm"
                    >
                      <FaPaperPlane className="text-[10px]" /> SUBMIT MEMBERSHIP
                    </button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="partner-form"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="border-b border-slate-200/60 pb-3 mb-6">
                      <h3 className="font-extrabold text-slate-800 text-base md:text-lg uppercase">
                        Partnership Registration Form
                      </h3>
                      <p className="text-slate-500 text-[11px] font-semibold mt-1">
                        Partner with us financially, through prayer support, or as a field
                        volunteer.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={partnerForm.firstName}
                          onChange={handlePartnerChange}
                          placeholder="First Name"
                          className="w-full bg-white border border-slate-350 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={partnerForm.lastName}
                          onChange={handlePartnerChange}
                          placeholder="Last Name"
                          className="w-full bg-white border border-slate-350 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={partnerForm.email}
                          onChange={handlePartnerChange}
                          placeholder="your.email@example.com"
                          className="w-full bg-white border border-slate-350 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={partnerForm.phone}
                          onChange={handlePartnerChange}
                          placeholder="Phone Number"
                          className="w-full bg-white border border-slate-350 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Partnership Type
                        </label>
                        <select
                          name="partnershipType"
                          required
                          value={partnerForm.partnershipType}
                          onChange={handlePartnerChange}
                          className="w-full bg-white border border-slate-350 rounded px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 font-medium"
                        >
                          <option value="financial">Financial Partner (Sponsorship)</option>
                          <option value="prayer">Prayer Partner (Intercession)</option>
                          <option value="volunteer">Field Volunteer (Outreaches)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Partnership Frequency
                        </label>
                        <select
                          name="frequency"
                          required
                          value={partnerForm.frequency}
                          onChange={handlePartnerChange}
                          className="w-full bg-white border border-slate-350 rounded px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 font-medium"
                        >
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="one-time">One-time Support</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Message / Comments
                      </label>
                      <textarea
                        name="comments"
                        rows={4}
                        value={partnerForm.comments}
                        onChange={handlePartnerChange}
                        placeholder="Write down any notes or specific ways you would love to partner..."
                        className="w-full bg-white border border-slate-350 rounded px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-[#B91C1C] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded flex items-center justify-center gap-2 transition shadow-sm"
                    >
                      <FaPaperPlane className="text-[10px]" /> SUBMIT PARTNERSHIP
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
