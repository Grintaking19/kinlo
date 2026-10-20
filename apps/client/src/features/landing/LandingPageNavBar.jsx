import { RouterLink } from "../../lib/RouterLink.jsx";
import Logo from "../../components/primitives/Logo.jsx";
import Button from "../../components/primitives/Button.jsx";
import NavItem from "../../components/primitives/NavItem.jsx";
import { useLocation } from "react-router-dom";
import { landingPageNavItems } from "../../config/navigation.jsx";

const LandingPageNavBar = () => {
  const location = useLocation();
  return (
    <header className="flex flex-row justify-between items-center w-full px-16 py-5 border-b border-border top-0 left-0 right-0 z-50 bg-background">
      <Logo />
      <nav className="flex flex-row gap-6 items-center justify-center">
        {landingPageNavItems.map((item) => (
          <NavItem
            key={item.label}
            href={item.href}
            variant="text"
            aria-label={item.label}
            active={location.hash === item.href}
            className={`relative  after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 hover:after:w-full after:bg-primary-500 after:transition-all after:duration-300 after:ease-in-out ${location.hash === item.href ? "after:w-full text-primary-500/80" : "text-text-secondary"}`}
          >
            {item.label}
          </NavItem>
        ))}
      </nav>
      <div className="flex flex-row gap-4 items-center justify-center">
        <Button as={RouterLink} href="/sign-in" variant="ghost">
          Log In
        </Button>
        <Button as={RouterLink} href="/sign-up" variant="primary">
          Sign Up
        </Button>
      </div>
    </header>
  );
};

export default LandingPageNavBar;
