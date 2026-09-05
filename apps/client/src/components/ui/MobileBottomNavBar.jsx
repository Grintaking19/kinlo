import React from "react";
import { RouterLink } from "../../lib/router.jsx";
import NavItem from "../layout/NavItem";
import Avatar from "../layout/Avatar";
import {bottomMobileNavItems as navItems} from "../../config/Navigation.jsx";

const MobileBottomNavBar = ({ currentPath = "/" }) => {
  const id = React.useId();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 flex flex-row justify-between items-center px-2 pt-2.5 pb-3.5 bg-bg border-t border-border overflow-hidden z-50">
      {navItems.map((item) => (
        <NavItem
          key={`${id}-${item.label}`}
          size="lg"
          icon={item.icon}
          href={item.href}
          active={currentPath === item.href}
          aria-label={item.label}
          className="md:w-20 md:h-17" // Adjust for medium screens
        />
      ))}

      <RouterLink
        href="/profile"
        active={currentPath === "/profile"}
        aria-label="Profile"
        aria-current={"/profile" === currentPath ? "page" : undefined}
        className={`flex items-center justify-center 
            w-16 h-13.5  
            md:w-20 md:h-17
         hover:bg-surface-2 rounded-lg transition-colors duration-200 
         ease-in-out 
         focus:outline-none
         `}
      >
        <Avatar
          size="md"
          wrapperClassName={`${currentPath === "/profile" ? "ring-2 ring-primary-500" : ""}`}
        />
      </RouterLink>
    </nav>
  );
};

export default MobileBottomNavBar;
