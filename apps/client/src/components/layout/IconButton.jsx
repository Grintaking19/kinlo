import styleIcon from "../../utils/sizedIcon.jsx";

const SIZES = {
  sm: "w-8 h-8", // 32px — composer bar (video/photo/reel)
  md: "w-9 h-9", // 36px — top bar (add/search/chat)
  lg: "w-10 h-10", // 40px — profile (avatar)
};

const ICON_SIZES = {
  sm: "w-[18px] h-[18px]", // 18px — composer bar (video/photo/reel)
  md: "w-[18px] h-[18px]", // 18px — top bar (add/search/chat)
  lg: "w-5 h-5", // 20px — profile (avatar)
};

const VARIANTS = {
  minimal: {
    active: "text-primary-400",
    inactive: "text-text-secondary hover:bg-surface-2",
  },
  pill: {
    active: "bg-surface-3 text-primary",
    inactive: "text-text-secondary hover:bg-surface-2",
  },
  nav_minimal: {
    active: "text-primary-400",
    inactive: "text-text hover:bg-surface-2",
  },
};


const IconButton = ({
  icon = null,
  size = "md",
  active = false,
  variant = "minimal",
  "aria-label": ariaLabel,
  className = "",
  disabled = false,
  ...props
}) => {
  /**
   * Guarding against missing inputs (icon and aria-label)
   */
  if (import.meta.env.DEV && !icon) {
    console.error(
      "IconButton: No icon provided. Please provide an icon prop to the IconButton component.",
    );
  }

  if (import.meta.env.DEV && !Object.keys(SIZES).includes(size)) {
    console.error(
      `IconButton: Invalid size provided: ${size}. Valid sizes are: ${Object.keys(SIZES).join(", ")}. Defaulting to "md".`,
    );
    size = "md";
  }

  if (import.meta.env.DEV && !ariaLabel) {
    console.error(
      "IconButton: No aria-label provided. Please provide an aria-label prop to the IconButton component.",
    );
  }

  if (import.meta.env.DEV && !Object.keys(VARIANTS).includes(variant)) {
    console.error(
      `IconButton: Invalid variant provided: ${variant}. Valid variants are: ${Object.keys(VARIANTS).join(", ")}. Defaulting to "minimal".`,
    );
    variant = "minimal";
  } 


  const sizeClass = size ? SIZES[size] : SIZES["md"];
  const iconSizeClass = size ? ICON_SIZES[size] : ICON_SIZES["md"];
  const stateClass = active ? VARIANTS[variant].active : VARIANTS[variant].inactive;

  // Since we are using lucide-react icons
  const styledIcon = styleIcon(icon, iconSizeClass);

  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={active}
      aria-label={ariaLabel}
      className={`
        inline-flex items-center justify-center
        text-text
        rounded-lg
        shrink-0
        ${stateClass}
        hover:cursor-pointer
        disabled:cursor-not-allowed disabled:opacity-50
        transition-colors duration-200 ease-in-out
        ${sizeClass}
         ${className}

    `}
      {...props}
    >
      {styledIcon}
    </button>
  );
};

export default IconButton;
