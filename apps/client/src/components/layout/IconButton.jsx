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

const IconButton = ({
  icon,
  size = "md",
  active = false,
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

  const sizeClass = size ? SIZES[size] : SIZES["md"];
  const iconSizeClass = size ? ICON_SIZES[size] : ICON_SIZES["md"];

  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={active}
      aria-label={ariaLabel}
      className={`
        inline-flex items-center justify-center
        text-text
        ${active ? "bg-surface-2" : "bg-transparent hover:bg-surface-2/60"}
        hover:cursor-pointer
        disabled:cursor-not-allowed disabled:opacity-50
        transition-colors duration-200 ease-in-out
        ${sizeClass}
         ${className}

    `}
      {...props}
    >
      <span className={`${iconSizeClass}`}>{icon}</span>
    </button>
  );
};

export default IconButton;
