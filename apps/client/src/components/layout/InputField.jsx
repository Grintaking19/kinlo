import React from "react";

const SIZES = {
  sm: "text-sm px-3 py-1 rounded-md",
  md: "text-sm px-4 py-2 rounded-md",
  lg: "text-base px-6 py-2 rounded-lg",
};

const InputField = ({
  label,
  placeholder,
  size = "md",
  icon,
  className = "",
  ...props
}) => {
  /**
   * Guarding against invalid size values.
   */
  if (!Object.keys(SIZES).includes(size) && size !== null) {
    if (import.meta.env.DEV) {
      console.error(
        `Invalid size provided to InputField component: ${size}. Defaulting to "md".`,
      );
    }
    size = "md";
  }

  const sizeClass = size ? SIZES[size] : "";

  const id = React.useId();
  const inputId = `${label?.toLowerCase().replace(/\s+/g, "-")}-${id}-input`;

  return (
    <div className={`flex flex-col gap-1  text-text`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute text-text-muted inset-y-0 left-1 flex items-center  pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          placeholder={placeholder}
          className={`${sizeClass} bg-surface-2 border border-border focus:outline-none 
            focus:ring-2 focus:ring-primary/40 focus:border-transparent 
            text-text
            ${icon ? "pl-5" : ""}
            ${className}
            `}
          {...props}
        />
      </div>
    </div>
  );
};

export default InputField;
