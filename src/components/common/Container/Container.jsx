const Container = ({ children, className = "", fluid = false }) => {
  return (
    <div
      className={`
        w-full
        ${fluid ? "" : "max-w-[1600px] mx-auto"}
        px-4
        sm:px-6
        lg:px-10
        xl:px-16
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;
