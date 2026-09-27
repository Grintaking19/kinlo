import { Outlet } from "react-router-dom";

// The role of this layout is to authenticate the user and provide a common layout for all authenticated routes.
const ProtectedLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
