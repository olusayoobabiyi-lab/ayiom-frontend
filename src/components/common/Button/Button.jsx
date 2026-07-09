const variants = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "bg-secondary text-white hover:bg-secondary-600",
  outline: "border-2 border-brand text-brand hover:bg-brand hover:text-white",
  ghost: "text-brand hover:bg-brand/10",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-12 px-7 text-base",
};

const base =
  "inline-flex items-center justify-center font-semibold rounded-button transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2";

const Button = ({
  variant = "primary",
  size = "md",
  as,
  href,
  children,
  className = "",
  ...rest
}) => {
  const cls = `${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  if (as === "a" || href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
};

export default Button;
