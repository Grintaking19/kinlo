import {
  Home,
  MessageCircle,
  Bell,
  Users,
  Compass,
  User,
  Settings,
  SquarePlay,
} from "lucide-react";

export const sideNavItems = [
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

export const topNavItems = [
  {
    label: "Feed",
    href: "/",
    icon: <Home />,
  },
  {
    label: "Reels",
    href: "/reels",
    icon: <SquarePlay />,
  },
  {
    label: "Groups",
    href: "/groups",
    icon: <Users />,
  },
];
