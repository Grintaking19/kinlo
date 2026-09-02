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

  return (
    <a
      href={href}
      className={`flex flex-row items-center justify-start px-3.5 py-2.75 gap-3.5 transition-all duration-300 ease-in-out rounded-lg
        ${stateClasses} ${className}
        `}
      {...props}
    >
      <span className={`w-5 h-5 shrink-0`}>{icon}</span>
      <span className={`flex text-base font-semibold leading-normal  w-full`}>
        {label}
      </span>
      {notificationCount > 0 && (
        <span className="flex justify-center items-center ml-auto text-xs font-semibold bg-pink-500 text-text  rounded-full px-2 py-0.5">
          {notificationCount}
        </span>
      )}
    </a>
  );
};

export default SideNavItem;
