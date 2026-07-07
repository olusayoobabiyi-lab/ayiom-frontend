const SectionTitle = ({ eyebrow, title, subtitle, align = "center", className = "" }) => {
  const alignClass = align === "left" ? "text-left" : "mx-auto text-center";

  return (
    <div className={`max-w-2xl mb-12 ${alignClass} ${className}`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wider text-brand mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className={`text-3xl md:text-4xl font-bold text-slate-900 mb-3 ${align === "left" ? "" : "mx-auto"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-slate-600 ${align === "left" ? "" : "mx-auto"}`}>{subtitle}</p>
      )}
    </div>
  );
};

export default SectionTitle;