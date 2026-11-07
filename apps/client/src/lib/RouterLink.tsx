import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";

type RouterLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "to"> & {
  href?: string;
};

// A simple <a> wrapper that always accepts `href`.
export const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  ({ href, ...props }, ref) => <Link ref={ref} to={href ?? "/"} {...props} />,
);
