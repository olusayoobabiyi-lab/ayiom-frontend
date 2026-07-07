const FocusCard = ({ icon, title, description }) => {
  return (
    <div className="flex items-center gap-4 text-white">
      {/* Icon Circle */}
      <div className="w-12 h-12 rounded-full bg-gold text-white flex items-center justify-center text-xl shrink-0 shadow-md">
        {icon}
      </div>

      {/* Title & Description */}
      <div>
        <h4 className="text-sm font-extrabold uppercase tracking-wider text-white leading-tight">
          {title}
        </h4>
        <p className="text-xs text-slate-200 mt-1 leading-snug">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FocusCard;
