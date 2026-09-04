import MobileNavDrawer from "./MobileNavDrawer.jsx";
import Logo from "../layout/Logo.jsx";
import IconButton from "../layout/IconButton.jsx";
import NavItem from "../layout/NavItem.jsx";
import { SquarePlus, Search, MessageSquare } from "lucide-react";

const MobileTopNavBar = ({ currentPath = "/" }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full h-14 px-4 bg-bg border-b border-border lg:hidden">
      <div className="flex flex-row items-center gap-3">
        <MobileNavDrawer />
        <Logo className="h-8" />
      </div>
      <div className="flex flex-row gap-2">
        <IconButton
          icon={<SquarePlus />}
          size="md"
          aria-label="Create a Post"
        />
        <IconButton icon={<Search />} size="md" aria-label="Search" />
        <nav className="flex flex-row gap-2">
          <NavItem
            size="sm"
            variant="nav_minimal"
            icon={<MessageSquare />}
            aria-label="Messages"
            href="/messages"
            active={currentPath === "/messages"}
          />
        </nav>
      </div>
    </header>
  );
};

export default MobileTopNavBar;
