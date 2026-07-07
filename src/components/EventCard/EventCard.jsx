import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";

const EventCard = ({ id, day, month, title, venue, time, description, monthColor = "bg-red-700" }) => {
  // Extract border color mapping from background color class if possible
  const getBorderColor = (bgClass) => {
    if (bgClass.includes("red")) return "border-l-red-600";
    if (bgClass.includes("green")) return "border-l-green-600";
    if (bgClass.includes("blue")) return "border-l-blue-600";
    if (bgClass.includes("emerald")) return "border-l-emerald-600";
    return "border-l-red-700";
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`flex bg-white rounded-lg shadow-sm border border-slate-100 border-l-4 ${getBorderColor(monthColor)} overflow-hidden h-full`}
    >
      {/* Date Column (Left) */}
      <div className="w-[85px] bg-slate-50 flex flex-col items-center justify-center p-3 shrink-0 border-r border-slate-100">
        <span className={`text-[10px] font-extrabold text-white px-2 py-0.5 rounded uppercase tracking-wider ${monthColor}`}>
          {month}
        </span>
        <span className="text-3xl font-black text-slate-800 mt-1.5 leading-none">
          {day}
        </span>
      </div>

      {/* Details Column (Right) */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          {id ? (
            <Link to={`/events/${id}`}>
              <h4 className="font-bold text-slate-800 text-sm leading-tight hover:text-red-700 transition cursor-pointer">
                {title}
              </h4>
            </Link>
          ) : (
            <h4 className="font-bold text-slate-800 text-sm leading-tight hover:text-red-700 transition cursor-pointer">
              {title}
            </h4>
          )}
          
          {/* Time */}
          <div className="flex items-center gap-1.5 mt-1.5 text-slate-500 text-[11px] font-semibold">
            <FaClock className="text-slate-400 text-[10px]" />
            <span>{time}</span>
          </div>

          {/* Description */}
          <p className="text-slate-500 text-xs mt-2 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Venue (Bottom) */}
        <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-slate-50 text-[11px] font-bold text-red-700 uppercase tracking-wider">
          <FaMapMarkerAlt className="text-red-600" />
          <span>{venue}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
