import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";
import SideBarLayout from "../layouts/SideBarLayout.tsx";
import ProtectedLayout from "../layouts/ProtectedLayout.tsx";
import RootIndex from "../layouts/RootIndex.tsx";
import { PATHS } from "./paths.ts";
import FeedPage from "../features/feed/FeedPage.tsx";
import MessagesPage from "../features/messages/MessagesPage.tsx";
import NotificationsPage from "../features/notifications/NotificationsPage.tsx";
import ProfilePage from "../features/profile/ProfilePage.tsx";
import ReelsPage from "../features/reels/ReelsPage.tsx";
import StoryPage from "../features/stories/StoryPage.tsx";
import SettingsPage from "../features/settings/SettingsPage.tsx";
import DiscoverPage from "../features/discover/DiscoverPage.tsx";
import ChatsPage from "../features/messages/ChatsPage.tsx";
import ConnectionsPage from "../features/connections/ConnectionsPage.tsx";
import SignInPage from "../features/auth/SignInPage.tsx";
import SignUpPage from "../features/auth/SignUpPage.tsx";

const router = createBrowserRouter([
  // it renders "/" route based on if the user is authenticated (Feed Page) or not authenticated (Landing page)
  {
    path: PATHS.ROOT,
    element: <RootIndex />,
  },
  {
    // Public routes that doesn't require authentication
    children: [
      {
        path: PATHS.SIGN_IN,
        element: <SignInPage />,
      },
      {
        path: PATHS.SIGN_UP,
        element: <SignUpPage />,
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          // Elements that renders SideBarLayout
          {
            element: <SideBarLayout />,
            children: [
              { path: PATHS.FEED, element: <FeedPage /> },
              { path: PATHS.MESSAGES, element: <MessagesPage /> },
              { path: PATHS.NOTIFICATIONS, element: <NotificationsPage /> },
              { path: PATHS.CONNECTIONS, element: <ConnectionsPage /> },
              { path: PATHS.DISCOVER, element: <DiscoverPage /> },
              { path: PATHS.PROFILE, element: <ProfilePage /> },
              { path: PATHS.SETTINGS, element: <SettingsPage /> },
            ],
          },
          // Elements that renders MainLayout without SideBarLayout
          { path: PATHS.CHATS, element: <ChatsPage /> },
          { path: PATHS.STORIES, element: <StoryPage /> },
          { path: PATHS.REELS, element: <ReelsPage /> },
        ],
      },
    ],
  },
]);

export default router;
