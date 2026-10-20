import { useAuth } from "@clerk/react";
import { Navigate } from "react-router-dom";
import LoadingPage from "../components/ui/LoadingPage.jsx";
import LandingPage from "../features/landing/LandingPage.jsx";
const RootIndex = () => {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <LoadingPage />;
  if (!isSignedIn) return <LandingPage />;
  return <Navigate to="/feed" replace />;
};

export default RootIndex;
