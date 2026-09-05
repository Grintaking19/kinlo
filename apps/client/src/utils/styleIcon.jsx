import React from "react";

const useSizedIcon = (icon, sizeClass="", className="") => {
  return React.isValidElement(icon) ? (
    React.cloneElement(icon, {
      className: `${sizeClass} ${icon.props.className || ""} ${className} inherit`.trim(),
    })
  ) : (
    <span className={sizeClass}>{icon}</span>
  );
};

export default useSizedIcon;
