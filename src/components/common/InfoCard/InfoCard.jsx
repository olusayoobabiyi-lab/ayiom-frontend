import { motion } from "framer-motion";

const InfoCard = ({
  icon,
  title,
  description,
  highlightText,
  background = "bg-white",
  iconBg = "bg-red-700",
  titleColor = "text-red-700",
}) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className={`${background} rounded-xl shadow-lg p-8 h-full border border-gray-100 flex flex-col md:flex-row items-start gap-6`}
    >
      {/* Icon Circle (Left) */}
      <div
        className={`${iconBg} w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl shadow-md shrink-0`}
      >
        {icon}
      </div>

      {/* Content (Right) */}
      <div className="flex-grow">
        <h3 className={`text-xl md:text-2xl font-black uppercase tracking-wide ${titleColor}`}>
          {title}
        </h3>

        {/* Gold Underline Divider */}
        <div className="mt-2 h-1 w-14 bg-yellow-500 rounded-full" />

        {/* Description Body */}
        <p className="mt-4 text-xs md:text-sm leading-relaxed text-slate-600 font-medium">
          {description}
        </p>

        {/* Highlight Text (if provided) */}
        {highlightText && (
          <p className="mt-4 text-xs font-black italic uppercase tracking-wider text-[#D4AF37]">
            {highlightText}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default InfoCard;
