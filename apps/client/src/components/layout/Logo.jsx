import { RouterLink } from "../../lib/router.jsx";
import LogoIcon from "../../assets/kinlo-logo.svg?react";
const Logo = ({ className="" }) => {
  return (
    <RouterLink
      href="/"
      aria-label="Home"
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      <LogoIcon className="w-10 h-10" />
      <span className="text-xl font-semibold leading-normal text-text">
        Kinlo
      </span>
    </RouterLink>
  );
};

export default Logo;
