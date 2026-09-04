import styleIcon from "../../utils/sizedIcon.jsx";
import { RouterLink } from "../../lib/router.jsx";

const VARIANTS = {
  minimal: {
    active: "bg-surface-2 text-primary-300",
    inactive: "bg-transparent text-text-secondary hover:bg-surface-2/60",
  },
};

const SideNavItem = ({
  href = "#",
  icon = null,
  label = null,
  className = "",
  iconClassName = "",
  active = false,
  variant = "minimal",
  "aria-label": ariaLabel,
  notificationCount = 0,
  ...props
}) => {
  /**
   * Guarding against Missing/Invalid Props
   */

  if (import.meta.env.DEV && !ariaLabel) {
    console.warn(
      "NavItem: `aria-label` is required — this control has no visible text label.",
    );
  }

  if (import.meta.env.DEV && !label) {
    console.error(
      "NavItem: `label` is required — this control has no visible text label.",
    );
  }

  if (import.meta.env.DEV && !VARIANTS[variant]) {
    console.error(
      `NavItem: \`variant\` must be one of ${Object.keys(VARIANTS).join(", ")}. Received: ${variant}`,
    );
  }

  if (import.meta.env.DEV && !icon) {
    console.error(
      "NavItem: `icon` is required — this control has no visible icon.",
    );
  }

  const stateClasses = active
    ? VARIANTS[variant].active
    : VARIANTS[variant].inactive;

  const styledIcon = styleIcon(icon)

  return (
    <RouterLink
      href={href}
      className={`flex flex-row items-center justify-start px-3.5 py-2.75 gap-3.5 transition-all duration-300 ease-in-out rounded-lg
        ${stateClasses} ${className}
        `}
      {...props}
    >
      <span
        className={`shrink-0 [&>svg]:w-full [&>svg]:h-full ${iconClassName}`}
      >
        {styledIcon}
      </span>
      <span className={`flex text-base font-normal leading-normal  w-full`}>
        {label}
      </span>
      {notificationCount > 0 && (
        <span className="flex justify-center items-center ml-auto text-xs font-bold bg-pink-500 text-text  rounded-full px-2 py-0.5">
          {notificationCount}
        </span>
      )}
    </RouterLink>
  );
};

export default SideNavItem;
