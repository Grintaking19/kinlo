
const ToggleButton = ({
  on = false,
  onChange,
  "aria-label": ariaLabel,
  disabled = false,
  className = "",
  ...props
}) => {
  if (import.meta.env.DEV && !ariaLabel) {
    console.error(
      "Toggle: `aria-label` is required — this control has no visible text label.",
    );
  }
  return (
    <button
      type="button"
      role="switch"
      disabled={disabled}
      onClick={()=>onChange?.(!on)}
      aria-checked={on}
      aria-label={ariaLabel}
      className={`
        relative inline-flex items-center justify-center
         w-10 h-5.5 rounded-full
        text-text
        ${on ? "bg-gradient-to-r from-gradient-cta-start to-gradient-cta-end" : "bg-avatar-fallback"}
        hover:cursor-pointer
        disabled:cursor-not-allowed disabled:opacity-50
        transition-colors duration-200
        ease-in-out
        ${className}
      `}
      {...props}
    >
      <span
        className={`
                absolute left-1
                w-4 h-4
                rounded-full
                bg-text
                transition-transform duration-200 ease-in-out
                ${on ? "translate-x-4.5" : "translate-x-0"}            `}
      />
    </button>
  );
};

export default ToggleButton;
