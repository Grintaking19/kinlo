import React from "react";

const useSizedIcon = (
  icon: React.ReactNode,
  sizeClass: string = "",
  className: string = "",
): React.ReactNode => {
  if (!React.isValidElement(icon)) {
    return <span className={sizeClass}>{icon}</span>;
  }

  const element = icon as React.ReactElement<{ className?: string }>;

  return React.cloneElement(element, {
    className:
      `${sizeClass} ${element.props.className ?? ""} ${className} inherit`.trim(),
  });
};

export default useSizedIcon;
