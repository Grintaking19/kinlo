import { forwardRef } from "react";

// A simple <a> wrapper that always accepts `href`.
export const RouterLink = forwardRef(({ href, ...props }, ref) => (
  <a ref={ref} href={href} {...props} />
));
