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

import { PATHS } from "../app/paths.js";

export const sideNavItems = [
  {
    label: "Feed",
    href: PATHS.FEED,
    icon: <Home />,
  },
  {
    label: "Messages",
    href: PATHS.MESSAGES,
    icon: <MessageCircle />,
  },
  {
    label: "Notifications",
    href: PATHS.NOTIFICATIONS,
    icon: <Bell />,
  },
  {
    label: "Groups",
    href: PATHS.GROUPS,
    icon: <Users />,
  },
  {
    label: "Discover",
    href: PATHS.DISCOVER,
    icon: <Compass />,
  },
  {
    label: "Profile",
    href: PATHS.PROFILE,
    icon: <User />,
  },
  {
    label: "Settings",
    href: PATHS.SETTINGS,
    icon: <Settings />,
  },
];

export const topNavItems = [
  {
    label: "Feed",
    href: PATHS.FEED,
    icon: <Home />,
  },
  {
    label: "Reels",
    href: PATHS.REELS,
    icon: <SquarePlay />,
  },
  {
    label: "Groups",
    href: PATHS.GROUPS,
    icon: <Users />,
  },
];

export const bottomMobileNavItems = [
  {
    label: "Home",
    icon: <Home />,
    href: PATHS.FEED,
  },
  {
    label: "reels",
    icon: <SquarePlay />,
    href: PATHS.REELS,
  },
  {
    label: "groups",
    icon: <Users />,
    href: PATHS.GROUPS,
  },
  {
    label: "notifications",
    icon: <Bell />,
    href: PATHS.NOTIFICATIONS,
  },
];
