import React from "react";

const VARIANTS = {
  primary:
    "text-white bg-gradient-to-r from-gradient-cta-start to-gradient-cta-end hover:opacity-80 hover:cursor-pointer transition-all duration-300",
    secondary:
    "text-text bg-surface-2 hover:bg-surface-3 hover:cursor-pointer transition-all duration-300",

    outline:
    "text-text 
};

const SIZES = {
  sm: "text-sm px-3 py-1.5 rounded-md",
  md: "text-sm px-4 py-2 rounded-md",
  lg: "text-base px-6 py-2 rounded-lg",
};

const Button = ({
  variant = "secondary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      className={`${VARIANTS[variant]} ${SIZES[size]} ${className}` }
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
