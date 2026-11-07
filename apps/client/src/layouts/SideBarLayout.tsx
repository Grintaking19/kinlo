import SideNavBar from "../components/ui/SideNavBar.tsx";
import { Outlet } from "react-router-dom";

const SideBarLayout = () => {
  return (
    <>
      <SideNavBar />
      {/** Page Content */}
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </>
  );
};

export default SideBarLayout;
