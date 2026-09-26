import React from "react";
import styleIcon from "../../utils/styleIcon.jsx";
import { AlertCircle } from "lucide-react";

const SIZES = {
  sm: "text-sm px-3 py-1 rounded-md",
  md: "text-sm px-4 py-2 rounded-md",
  lg: "text-base px-6 py-2 rounded-lg",
};

const InputField = ({
  label,
  placeholder,
  size = "md",
  icon = null,
  className = "",
  error = false,
  errorMessage = "Error",
  disabled = false,
  "aria-label": ariaLabel,
  ...props
}) => {
  /**
   * Guarding against invalid or missing values
   */
  if (!Object.keys(SIZES).includes(size) && size !== null) {
    if (import.meta.env.DEV) {
      console.error(
        `Invalid size provided to InputField component: ${size}. Defaulting to "md".`,
      );
    }
    size = "md";
  }

  if (import.meta.env.DEV && !label && !ariaLabel) {
    console.error(
      "InputField: provide either `label` or `aria-label` so the input has an accessible name.",
    );
  }

  const isRenderable = (val) =>
    val === null ||
    typeof val === "string" ||
    typeof val === "number" ||
    React.isValidElement(val);

  if (icon !== null && !isRenderable(icon)) {
    if (import.meta.env.DEV) {
      console.error(
        `Invalid icon provided to InputField component: ${icon}. Icon should be a React element, string, or null.`,
      );
    }
    icon = null;
  }

  const sizeClass = size ? SIZES[size] : "";

  const id = React.useId();
  const inputId = `input-${id}`;
  const errorId = `${inputId}-error`;

  const styledIcon = styleIcon(icon, "w-4 h-4 text-text-muted");

  return (
    <div className={`flex flex-col gap-1  text-text py-1 mb-2`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium">
          {label}
        </label>
      )}
      <div
        className={`flex items-center gap-2 rounded-md bg-surface-2 border
          ${error ? "border-red-500" : "border-border"}
          focus-within:ring-2 ${error ? "focus-within:ring-red-500" : "focus-within:ring-primary/40"}
          focus-within:border-transparent
          transition-colors duration-200
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${sizeClass}
          ${className}`}
      >
        {icon && (
          <span className="text-text-muted shrink-0 flex items-center">
            {styledIcon}
          </span>
        )}

        <input
          {...props}
          id={inputId}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={!label ? ariaLabel : undefined}
          className="flex-1 bg-transparent outline-none placeholder:text-text-placeholder disabled:cursor-not-allowed"
          aria-invalid={error}
          aria-describedby={error ? errorId : undefined}
        />
        {error && (
          <p
            className="absolute top-full left-0  text-sm text-red-400"
            role="alert"
          >
            <AlertCircle className="inline-block mr-1 " size={16} />
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default InputField;
