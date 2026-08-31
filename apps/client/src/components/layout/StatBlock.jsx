const SIZES = {
  sm: {
    number: "text-base font-bold",
    label: "text-xs font-normal text-text-muted",
  },
  md: {
    number: "text-xl font-bold",
    label: "text-sm font-normal text-text-muted",
  },
  lg: {
    number: "text-4xl font-bold",
    label: "text-sm font-normal text-text-secondary",
  },
};

const VARIANTS = {
  horizontal: "inline-flex flex-row items-end justify-center gap-3",
  vertical: "inline-flex flex-col items-center justify-center gap-1",
};

const StatBlock = ({
  size = "sm",
  orientation = "horizontal",
  gradient = false,
  number,
  label,
  className = "",
}) => {
  /**
   * Guarding against Missing/Invalid Props
   */

  if (
    import.meta.env.DEV &&
    !Object.keys(SIZES).includes(size) &&
    size !== null
  ) {
    console.warn(
      `Invalid size prop: ${size}. Please use one of the following: ${Object.keys(SIZES).join(", ")}, defaulting to "sm".`,
    );
    size = "sm";
  }

  if (
    import.meta.env.DEV &&
    !Object.keys(VARIANTS).includes(orientation) &&
    orientation !== null
  ) {
    console.warn(
      `Invalid orientation prop: ${orientation}. Please use one of the following: ${Object.keys(VARIANTS).join(", ")}, defaulting to "horizontal".`,
    );
    orientation = "horizontal";
  }

  if (
    import.meta.env.DEV &&
    typeof gradient !== "boolean" &&
    gradient !== null
  ) {
    console.warn(
      `Invalid gradient prop: ${gradient}. Please use a boolean value (true or false), defaulting to false.`,
    );
    gradient = false;
  }

  if (import.meta.env.DEV && (number === undefined || label === undefined)) {
    console.error(
      `Missing required props: number and label are required for StatBlock component.`,
    );
  }

  const sizeClasses = size ? SIZES[size] : SIZES.sm;
  const orientationClasses = orientation
    ? VARIANTS[orientation]
    : VARIANTS.horizontal;
  const gradientClasses = gradient
    ? "bg-gradient-to-r from-gradient-cta-start to-gradient-cta-end bg-clip-text text-transparent"
    : "text-text";

  return (
    <div className={`${className} ${orientationClasses}`}>
      <span className={`${sizeClasses.number} ${gradientClasses}`}>
        {number}
      </span>
      <span className={`${sizeClasses.label}`}>{label}</span>
    </div>
  );
};

export default StatBlock;
