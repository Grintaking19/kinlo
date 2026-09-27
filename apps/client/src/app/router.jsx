import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import SideBarLayout from "../layouts/SideBarLayout.jsx";
import ProtectedLayout from "../layouts/ProtectedLayout.jsx";
import RootIndex from "../layouts/RootIndex.jsx";
import { PATHS } from "./paths.js";
import FeedPage from "../features/feed/FeedPage.jsx";
import MessagesPage from "../features/messages/MessagesPage.jsx";
import NotificationsPage from "../features/notifications/NotificationsPage.jsx";
import ProfilePage from "../features/profile/ProfilePage.jsx";
import ReelsPage from "../features/reels/ReelsPage.jsx";
import StoryPage from "../features/stories/StoryPage.jsx";
import SettingsPage from "../features/settings/SettingsPage.jsx";
import DiscoverPage from "../features/discover/DiscoverPage.jsx";
import ChatsPage from "../features/messages/ChatsPage.jsx";
import ConnectionsPage from "../features/connections/ConnectionsPage.jsx";
import SignInPage from "../features/auth/SignInPage.jsx";
import SignUpPage from "../features/auth/SignUpPage.jsx";

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
