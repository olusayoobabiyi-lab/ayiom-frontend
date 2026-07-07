import {
  FaCrosshairs,
  FaBullseye,
  FaCalendarAlt,
  FaBible,
  FaUsers,
  FaHeart,
  FaHandHoldingHeart,
} from "react-icons/fa";

import Hero from "@/components/Hero/Hero";
import MissionCard from "@/components/MissionCard/MissionCard";
import VisionCard from "@/components/VisionCard/VisionCard";
import FocusCard from "@/components/FocusCard/FocusCard";
import EventCard from "@/components/EventCard/EventCard";
import CalendarWidget from "@/components/CalendarWidget/CalendarWidget";
import missionBg from "@/assets/images/mission-bg.png";

const mission = {
  icon: <FaCrosshairs />,
  title: "OUR MISSION",
  description:
    "To preach the gospel of Jesus Christ, disciple believers and to demonstrate God's love to the word care for the",
  highlightText: "WIDOWS AND LESS PRIVILEGE PEOPLE.",
  iconBg: "bg-red-800",
  titleColor: "text-red-700",
};


const vision = {
  icon: <FaBullseye />,
  title: "OUR VISION",
  description:
    "To see lives transformed and nations impacted through the message of Christ.",
  iconBg: "bg-yellow-600",
  titleColor: "text-yellow-600",
};

const focusCards = [
  {
    icon: <FaBible />,
    title: "PREACHING THE GOSPEL",
    description: "Taking the message of Christ to every heart.",
  },
  {
    icon: <FaUsers />,
    title: "DISCIPLING BELIEVERS",
    description: "Raising strong believers grounded in God's Word.",
  },
  {
    icon: <FaHeart />,
    title: "SHOWING GOD'S LOVE",
    description: "Demonstrating love to the world through kindness and care.",
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "CARING FOR THE LESS PRIVILEGED",
    description: "Supporting widows and less privileged people in our communities.",
  },
];

const events = [
  {
    day: 18,
    month: "MAY",
    monthColor: "bg-green-600",
    title: "Outreach to Rural Community",
    venue: "Rural Community",
    time: "9:00 AM - 2:00 PM",
    description: "Reaching out with the gospel, food, clothes and love.",
  },
  {
    day: 29,
    month: "MAY",
    monthColor: "bg-yellow-500",
    title: "Prayer Meeting",
    venue: "Church Prayer Room",
    time: "6:00 PM - 7:30 PM",
    description: "A time of prayer and intercession for families and nations.",
  },
  {
    day: 15,
    month: "JUN",
    monthColor: "bg-red-600",
    title: "Outreach to Widows",
    venue: "Community Outreach",
    time: "10:00 AM - 2:00 PM",
    description: "Reaching out in love to widows and less privileged.",
  },
  {
    day: 23,
    month: "AUG",
    monthColor: "bg-blue-600",
    title: "Back to School Support",
    venue: "Community Center",
    time: "10:00 AM - 2:00 PM",
    description: "Providing school materials and support for children.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION (Full viewport width carousel banner) */}
      <Hero />

      {/* 2. MISSION & VISION SECTION (Grid with 3 cards: Mission, Vision, and Scripture) */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <MissionCard {...mission} />
            <VisionCard {...vision} />
            
            {/* Scripture Graphic Card */}
            <div className="relative overflow-hidden rounded-xl shadow-lg min-h-[250px] flex items-center justify-center p-8 bg-slate-900 text-white border border-slate-100">
              <img
                src={missionBg}
                alt="Scripture Background"
                className="absolute inset-0 w-full h-full object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />
              <div className="relative z-10 text-center max-w-xs">
                <span className="text-gold font-serif text-5xl leading-none">“</span>
                <p className="font-serif italic text-sm md:text-base leading-relaxed text-slate-100 -mt-2">
                  Carry each other's burdens, and in this way you will fulfill the law of Christ.
                </p>
                <p className="font-sans font-bold text-gold text-right mt-4 text-xs tracking-wider">
                  – Galatians 6:2
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOCUS PILLARS SECTION (Maroon horizontal banner strip) */}
      <section className="w-full bg-maroon py-8 md:py-10 shadow-inner">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8">
            {focusCards.map((card, index) => (
              <FocusCard key={index} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. UPCOMING EVENTS & CALENDAR SECTION (Side-by-side grid) */}
      <section className="w-full bg-[#F8FAFC] py-16 md:py-24">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Events Title and 2x2 Event Cards Grid */}
            <div className="xl:col-span-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-red-750 text-xl" />
                    <h3 className="text-sm md:text-base font-extrabold uppercase tracking-widest text-slate-800">
                      UPCOMING EVENTS
                    </h3>
                  </div>
                  <button className="text-[10px] md:text-xs font-bold uppercase tracking-wider border border-slate-300 hover:bg-white text-slate-600 px-4 py-2 rounded transition shadow-sm">
                    VIEW ALL EVENTS
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {events.map((event, index) => (
                    <EventCard key={index} {...event} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Calendar Widget */}
            <div className="xl:col-span-4 h-full">
              <CalendarWidget />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
