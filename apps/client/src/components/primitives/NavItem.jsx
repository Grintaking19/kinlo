import { RouterLink } from "../../lib/router.jsx";
import styleIcon from "../../utils/styleIcon.jsx";
const SIZES = {
  sm: "w-9 h-9", // TopBar NavItem (Mobile)
  md: "w-11 h-11", // TopBar NavItem (Desktop)
  lg: "w-16 h-13.5", // BottomBar NavItem (Mobile)
};

const ICONS_SIZES = {
  sm: "w-4.5 h-4.5", // TopBar NavItem (Mobile)
  md: "w-5.5 h-5.5", // TopBar NavItem (Desktop)
  lg: "w-7 h-7", // BottomBar NavItem (Mobile)
};

const VARIANTS = {
  pill: {
    active: "bg-surface-3 text-primary",
    inactive: "text-text-secondary hover:bg-surface-2",
  },
  minimal: {
    active: "text-primary-400",
    inactive: "text-text-secondary hover:bg-surface-2",
  },
  nav_minimal: {
    active: "text-primary-400",
    inactive: "text-text hover:bg-surface-2",
  },
};

const NavItem = ({
  href = "#",
  size = "sm",
  icon = null,
  className = "",
  active = false,
  variant = "minimal",
  "aria-label": ariaLabel,
  ...props
}) => {
  /**
   * Guarding against Missing/Invalid Props
   */
  if (!Object.keys(SIZES).includes(size)) {
    if (import.meta.env.DEV) {
      console.warn(
        `Invalid size prop value: ${size}. Valid values are: ${Object.keys(SIZES).join(", ")}`,
      );
    }
    size = "sm"; // Default to 'sm' if invalid size is provided
  }

  if (!Object.keys(VARIANTS).includes(variant)) {
    if (import.meta.env.DEV) {
      console.warn(
        `Invalid variant prop value: ${variant}. Valid values are: ${Object.keys(VARIANTS).join(", ")}`,
      );
    }
    variant = "pill"; // Default to 'pill' if invalid variant is provided
  }

  if (import.meta.env.DEV && !ariaLabel) {
    console.warn(
      "NavItem: `aria-label` is required — this control has no visible text label.",
    );
  }

  const sizeClass = size ? SIZES[size] : SIZES.sm;
  const iconSizeClass = size ? ICONS_SIZES[size] : ICONS_SIZES.sm;
  const variantClass = variant ? VARIANTS[variant] : VARIANTS.pill;
  const stateClass = active ? variantClass.active : variantClass.inactive;

  const styledIcon = styleIcon(icon, iconSizeClass);

  return (
    <RouterLink
      href={href}
      className={`flex items-center justify-center 
            rounded-lg transition-colors duration-200  ease-in-out
            focus:outline-none 
            ${sizeClass} 
            ${stateClass}
            ${className}`}
      {...props}
      aria-current={active ? "page" : undefined}
      aria-label={ariaLabel}
    >
      {styledIcon}
    </RouterLink>
  );
};

export default NavItem;
