import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import { MINISTRIES_DATA } from "@/constants/ministries";

// Additional detailed data for each ministry (focus areas, objectives, etc.)
const DETAILS_MAP = {
  evangelism: {
    objectives: [
      "Organize regular city-wide revival crusades and community outreach programs.",
      "Train believers in practical personal evangelism and soul-winning techniques.",
      "Establish active street-preaching groups and neighborhood outreach teams.",
      "Distribute Bibles and gospel literature to individuals in need.",
    ],
    faqs: [
      {
        q: "How can I join the evangelism team?",
        a: "You can sign up using the form below. We conduct training sessions for all new members before field deployments.",
      },
      {
        q: "Do you organize outreaches outside the city?",
        a: "Yes, we regularly visit neighboring towns, villages, and schools as part of our rural missions.",
      },
    ],
  },

  "vocational-training": {
    objectives: [
      "Provide training in practical skills such as tailoring, carpentry, and computer literacy.",
      "Conduct workshops and seminars to enhance participants' professional capabilities.",
      "Facilitate job placement services for trained individuals.",
      "Develop resource materials and study guides for vocational development.",
    ],
    faqs: [
      {
        q: "When do the vocational training classes hold?",
        a: "We run trainings based on the needs of the community and the availability of instructors.",
      },
      {
        q: "Are the study materials free?",
        a: "Yes, all study materials are provided free of charge.",
      },
    ],
  },
  // discipleship: {
  //   objectives: [
  //     "Provide weekly systematic Bible studies for believers of all levels.",
  //     "Conduct foundational classes for new converts and baptism candidates.",
  //     "Facilitate one-on-one mentorship programs and life coaching.",
  //     "Develop resource materials and study guides for spiritual development.",
  //   ],
  //   faqs: [
  //     { q: "When do the discipleship classes hold?", a: "We run several classes throughout the week: Sundays at 8:00 AM and Wednesdays at 6:00 PM." },
  //     { q: "Are the study materials free?", a: "Yes, all our foundational study manuals and guides are provided free of charge." }
  //   ]
  // },
  outreach: {
    objectives: [
      "Partner with medical professionals to provide free healthcare checkups and treatments.",
      "Distribute relief packages containing food items, clean water, and clothing.",
      "Support local pastors and build basic infrastructure in rural missions.",
      "Conduct vocational training workshops to empower community members.",
    ],
    faqs: [
      {
        q: "Can non-medical professionals volunteer for medical outreaches?",
        a: "Absolutely! We need volunteers for registration, distribution of relief materials, crowd management, and prayer support.",
      },
      {
        q: "Where does the funding for these outreaches come from?",
        a: "Our rural outreach missions are fully funded through donations from members and partners of the ministry.",
      },
    ],
  },
  "school-support": {
    objectives: [
      "Sponsor tuition fees for children from low-income or vulnerable families.",
      "Distribute school bags, notebooks, uniforms, and shoes at the start of school terms.",
      "Host academic coaching camps and motivational seminars for teenagers.",
      "Renovate and equip community school libraries and classrooms.",
    ],
    faqs: [
      {
        q: "How are the beneficiary children selected?",
        a: "We work directly with community leaders, local schools, and social workers to identify children who are genuinely in need.",
      },
      {
        q: "Can I sponsor a specific child's education?",
        a: "Yes! Please indicate 'Education Sponsorship' in your inquiry message below, and our team will get in touch with the details.",
      },
    ],
  },
  "widows-care": {
    objectives: [
      "Distribute monthly food rations and household welfare packages.",
      "Provide medical checkups and subsidize prescription drugs for elderly widows.",
      "Offer counseling sessions, peer support circles, and spiritual encouragement.",
      "Provide startup capital and business training for sustainable micro-enterprises.",
    ],
    faqs: [
      {
        q: "How often do you distribute food packages?",
        a: "We host our widows' welfare distribution on the second Saturday of every month.",
      },
      {
        q: "How can I donate food or clothes?",
        a: "You can drop off donations at our outreach center, or reach out to us using the contact form to arrange a pickup.",
      },
    ],
  },
  "orphans-care": {
    objectives: [
      "Supply orphanages with food supplies, toiletries, bedding, and clean water systems.",
      "Provide full scholarship programs covering primary through secondary school.",
      "Organize holiday camps, mentoring activities, and recreational outings for kids.",
      "Provide counseling services to support child development and mental wellbeing.",
    ],
    faqs: [
      {
        q: "Do you operate an orphanage home directly?",
        a: "We partner with and support existing licensed orphanage homes and host community-based care projects.",
      },
      {
        q: "Can I host a birthday or celebration with the children?",
        a: "Yes, we facilitate community visits. Please contact our coordinator via the form below.",
      },
    ],
  },
  "prayer-intercession": {
    objectives: [
      "Maintain round-the-clock prayer chains for urgent requests and needs.",
      "Host weekly corporate prayer and intercession services.",
      "Organize intensive prayer retreats, vigils, and fasts.",
      "Compile prayer guides and revival scriptures for the church community.",
    ],
    faqs: [
      {
        q: "How can I submit a prayer request?",
        a: "You can send it through the form below or drop it in our physical prayer box at the center. Every request is prayed over.",
      },
      {
        q: "Can anyone attend the prayer vigils?",
        a: "Yes! Our prayer vigils are open to all believers seeking a deeper prayer life.",
      },
    ],
  },
  "volunteer-partnership": {
    objectives: [
      "Coordinate volunteer placements across various ministry departments.",
      "Provide orientation and skills training for prospective volunteers.",
      "Build long-term partnerships with corporate bodies and global organizations.",
      "Maintain active communication with financial partners and sponsors.",
    ],
    faqs: [
      {
        q: "Is there a minimum commitment for volunteering?",
        a: "No, you can volunteer based on your availability—whether for one-off events or regular weekly service.",
      },
      {
        q: "How do I become a financial partner?",
        a: "You can make a donation using the 'GIVE NOW' button at the top, or write to us for structured partnership options.",
      },
    ],
  },
};

export default function MinistryDetailPage() {
  const { id } = useParams();
  const ministry = MINISTRIES_DATA.find((m) => m.id === id);
  const extraDetails = DETAILS_MAP[id] || { objectives: [], faqs: [] };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: id || "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!ministry) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Ministry Not Found</h2>
        <p className="text-slate-600 mb-6">The ministry page you are looking for does not exist.</p>
        <Link
          to="/ministry"
          className="bg-brand hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded flex items-center gap-2 transition"
        >
          <FaArrowLeft /> BACK TO MINISTRIES
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
    // In a real application, this would dispatch to the API
    console.log("Submit volunteer request:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", interest: id || "", message: "" });
    }, 5000);
  };

  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. HERO HEADER BANNER */}
      <section className="relative w-full h-[280px] md:h-[350px] bg-slate-950 flex items-center overflow-hidden pb-12 pt-16">
        <img
          src={ministry.image}
          alt={ministry.title}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
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
              to="/ministry"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition"
            >
              <FaArrowLeft /> BACK TO MINISTRIES
            </Link>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-wider leading-tight">
              {ministry.title}
            </h1>
            <div className={`h-[3px] w-20 rounded ${ministry.lineColor}`} />
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

      {/* 2. BODY CONTENT SECTION */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16">
          {/* Left Column: Description & Focus areas (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <div className="space-y-6">
              <h2 className="text-xl md:text-3xl font-extrabold uppercase tracking-wide text-slate-800">
                Ministry Overview
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                {ministry.description}
              </p>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                We believe that every believer is called to make a difference. Through{" "}
                {ministry.title.toLowerCase()}, we provide structured opportunities for community
                growth, service, and evangelism, ensuring that the love of Jesus is demonstrated in
                both word and deed.
              </p>
            </div>

            {/* Core Objectives */}
            {extraDetails.objectives.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-xl md:text-3xl font-extrabold uppercase tracking-wide text-slate-800">
                  Key Focus Areas
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {extraDetails.objectives.map((obj, i) => (
                    <li
                      key={i}
                      className="flex gap-3 items-start bg-slate-50 rounded-xl p-5 border border-slate-100"
                    >
                      <FaCheckCircle className={`text-xl shrink-0 mt-0.5 ${ministry.titleColor}`} />
                      <span className="text-xs md:text-sm text-slate-700 font-bold leading-normal">
                        {obj}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* FAQs */}
            {extraDetails.faqs.length > 0 && (
              <div className="space-y-6 pt-4">
                <h2 className="text-xl md:text-3xl font-extrabold uppercase tracking-wide text-slate-800">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {extraDetails.faqs.map((faq, i) => (
                    <div key={i} className="space-y-2">
                      <h4 className="text-slate-800 font-bold text-sm md:text-base">Q: {faq.q}</h4>
                      <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed pl-5 border-l-2 border-slate-200">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar Inquiry Form (lg:col-span-4) */}
          <div className="lg:col-span-4">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 sticky top-[120px] shadow-sm">
              <h3 className="font-extrabold text-lg md:text-xl text-slate-800 uppercase tracking-wide mb-2">
                GET INVOLVED
              </h3>
              <p className="text-xs text-slate-500 font-bold mb-6">
                Fill the form below to volunteer, partner, or request support.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-6 text-center space-y-3"
                >
                  <h4 className="font-bold text-sm">Thank you for reaching out!</h4>
                  <p className="text-xs leading-relaxed">
                    Your message has been received. Our team will contact you shortly regarding the{" "}
                    <strong>{ministry.title}</strong> program.
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
                      Area of Interest
                    </label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-300 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 font-medium"
                    >
                      {MINISTRIES_DATA.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      How would you like to participate?
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Write your message here..."
                      className="w-full bg-white border border-slate-300 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#B91C1C] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider py-4 rounded flex items-center justify-center gap-2 transition shadow-sm"
                  >
                    <FaPaperPlane className="text-[10px]" /> SEND INQUIRY
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
