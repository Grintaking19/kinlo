import { Outlet } from "react-router-dom";
import TopNavBar from "../components/ui/TopNavBar.tsx";
import MobileTopNavBar from "../components/ui/MobileTopNavBar.tsx";
import MobileBottomNavBar from "../components/ui/MobileBottomNavBar.tsx";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <MobileTopNavBar />
      <main className="flex-1 min-w-0 pb-16 lg:pb-0">
        <Outlet />
      </main>
      <MobileBottomNavBar />
    </div>
  );
};

export default MainLayout;
