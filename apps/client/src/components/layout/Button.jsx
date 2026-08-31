
const GRADIENTS = {
  cta: "bg-gradient-to-r from-gradient-cta-start to-gradient-cta-end hover:from-gradient-cta-start-hover hover:to-gradient-cta-end-hover shadow-md hover:shadow-lg",
  save: "bg-gradient-to-r from-gradient-save-start to-gradient-save-end hover:from-gradient-save-start-hover hover:to-gradient-save-end-hover shadow-md hover:shadow-lg",
  follow:
    "bg-gradient-to-r from-gradient-follow-start to-gradient-follow-end hover:from-gradient-follow-start-hover hover:to-gradient-follow-end-hover shadow-md hover:shadow-lg",
};

/**
 * PRIMARY: Used for primary actions, such as "Save" or "Submit".
 * SECONDARY: Used for secondary/dismissive  actions, such as "Cancel" or "Back".
 * OUTLINE: No fill, But text with border and on hover darker surface color for background, lowest emphasis actoin on screen like log out.
 * GHOST: No fill, No border, just text and maybe icon, Styling is left to the developer at their discretion.
 * DANGER: Used for actions that are potentially destructive, such as "Delete" or "Remove".
 */
const VARIANTS = {
  primary: "text-white",
  secondary: "text-text bg-surface-2/97 hover:bg-surface-2 ",
  outline:
    "text-text bg-transparent border border-border hover:bg-surface-2 hover:border-border-strong",
  ghost: "bg-transparent",
  danger:
    "text-red-500 border border-red-500 border-2  bg-transparent hover:bg-red-500/30 ",
};

const SIZES = {
  sm: "text-sm px-3 py-1.5 rounded-md",
  md: "text-sm px-4 py-2 rounded-md",
  lg: "text-base px-6 py-2 rounded-lg",
};

const Button = ({
  variant = "primary",
  size = "md",
  gradient = "cta",
  icon = null,
  className = "",
  disabled = false,
  children,
  ...props
}) => {

  /*
   * Guarding against invalid logical combinations of variant and gradient.
   */

  if (gradient && !["primary"].includes(variant)) {
    if (import.meta.env.DEV) {
      console.error(
        `Gradient "${gradient}" is not supported for variant "${variant}". Gradients are only supported for the "primary" variant.`,
      );
    }
    gradient = null;
  }

  /*
   * Guarding against invalid variant and size values. If invalid -> switch to default values and log an error in development mode. This ensures that the Button component always has a valid variant and size, preventing unexpected styling issues.
   */
  if (!Object.keys(VARIANTS).includes(variant) && variant !== null) {
    if (import.meta.env.DEV) {
      console.error(
        `Invalid variant provided to Button component: ${variant}. Defaulting to "primary".`,
      );
    }
    variant = "primary";
    gradient = "cta";
  }

  if (!Object.keys(SIZES).includes(size) && size !== null) {
    if (import.meta.env.DEV) {
      console.error(
        `Invalid size provided to Button component: ${size}. Defaulting to "md".`,
      );
    }
    size = "md";
  }

  // Handle NULL values for variant, gradients and size.
  const variantClass = variant ? VARIANTS[variant] : "";
  const gradientClass =
    variant === "primary" ? GRADIENTS[gradient] || GRADIENTS["cta"] : "";
  const sizeClass = size ? SIZES[size] : "";

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center transition-all duration-250  
        ${variantClass} ${gradientClass} ${sizeClass} ${className}
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"}
        `}
      {...props}
    >
      {icon && <span className="mr-0.5">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
