import { RouterLink } from "../../lib/router";
import LogoIcon from "../../assets/kinlo-logo.svg?react";
const Logo = () => {
  return (
    <RouterLink
      href="/"
      aria-label="Home"
      className="flex items-center justify-center gap-2 "
    >
      <LogoIcon className="w-10 h-10" />
      <span className="text-xl font-semibold leading-normal text-text">
        Kinlo
      </span>
    </RouterLink>
  );
};

export default Logo;
