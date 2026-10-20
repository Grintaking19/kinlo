import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import LoadingPage from "../components/ui/LoadingPage.jsx";

// The role of this layout is to authenticate the user and provide a common layout for all authenticated routes.
const ProtectedLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <LoadingPage />;
  if (!isSignedIn) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default ProtectedLayout;
