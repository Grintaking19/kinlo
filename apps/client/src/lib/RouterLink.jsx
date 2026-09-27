import { forwardRef } from "react";
import { Link } from  "react-router-dom";
// A simple <a> wrapper that always accepts `href`.
export const RouterLink = forwardRef(({ href, ...props }, ref) => (
  <Link ref={ref} to={href} {...props} />
));
