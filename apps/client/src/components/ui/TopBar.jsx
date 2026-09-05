import InputField from "../layout/InputField.jsx";
import IconButton from "../layout/IconButton.jsx";
import NavItem from "../layout/NavItem.jsx";
import { Bell, Search, MessageSquare } from "lucide-react";
import { topNavItems } from "../../config/Navigation.jsx";
import Avatar from "../layout/Avatar";

const TopBar = ({ currentPath = "/", className = "" }) => {
  return (
    <header
      className={`hidden  top-0  right-0 z-50 lg:flex flex-row items-center justify-between w-full py-3.5 px-8  bg-bg border-b border-border ${className}`}
    >
      <InputField
        placeholder="Search Kinlo"
        size="md"
        icon={<Search size={18} />}
        aria-label="Search Kinlo"
        className="w-90"
      />

      <nav className="flex flex-row gap-2">
        {topNavItems.map((item) => (
          <NavItem
            key={item.label}
            size="md"
            aria-label={item.label}
            href={item.href}
            icon={item.icon}
            active={currentPath === item.href}
          />
        ))}
      </nav>
      <div className="flex flex-row justify-center items-center gap-4.5">
        <IconButton
          aria-label="Messages"
          icon={<MessageSquare />}
          size="lg"
          variant="minimal"
        />
        <IconButton
          aria-label="Notifications"
          icon={<Bell />}
          size="lg"
          variant="minimal"
          className="hover:rounded-full"
        />
        <button
          type="button"
          aria-label="User Settings"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-2 hover:bg-surface-3 hover:cursor-pointer transition-colors duration-200 ease-in-out"
        >
          <Avatar
            size="md"
            wrapperClassName="hover:border-2 hover:border-primary"
          />{" "}
          {/* On Active = true, add border (FUTURE WORK) */}
        </button>
      </div>
    </header>
  );
};

export default TopBar;
