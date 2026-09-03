import React from "react";
import Logo from "../layout/Logo.jsx";
import SideNavItem from "../layout/SideNavItem.jsx";
import Button from "../layout/Button.jsx";
import UserRow from "../ui/UserRow.jsx";
import {
  Home,
  MessageCircle,
  Bell,
  Users,
  Compass,
  User,
  Settings,
  Plus,
} from "lucide-react";

const navItems = [
  {
    label: "Feed",
    href: "/",
    icon: <Home />,
  },
  {
    label: "Messages",
    href: "/messages",
    icon: <MessageCircle />,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: <Bell />,
  },
  {
    label: "Groups",
    href: "/groups",
    icon: <Users />,
  },
  {
    label: "Discover",
    href: "/discover",
    icon: <Compass />,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: <User />,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings />,
  },
];

const SideNavBar = ({ currentPath = "/" }) => {
  const id = React.useId();
  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen px-5 py-6 gap-1 justify-start items-start bg-bg border-r border-border">
      <Logo className="mb-10" />
      <nav className="flex flex-col gap-1 w-full mb-3">
        {navItems.map((item) => (
          <SideNavItem
            key={`${id}-${item.label}`}
            href={item.href}
            icon={item.icon}
            iconClassName="w-5 h-5"
            label={item.label}
            aria-label={item.label}
            active={currentPath === item.href}
          />
        ))}
      </nav>
      <Button
        variant="primary"
        gradient="save"
        className="flex flex-row gap-2  w-full text-text font-semibold text-base leading-4.5 rounded-[10px] py-3.25"
        icon={<Plus />}
        aria-label="Create Post"
      >
        Create a Post
      </Button>
      <div className="flex-1" />{" "}
      {/* this one genuinely IS a flex-spacer — pushes UserRow down */}
      <div className="border-t border-border self-stretch shrink-0" />
      <UserRow fullName="John Doe" username="@johndoe" />
    </aside>
  );
};

export default SideNavBar;
