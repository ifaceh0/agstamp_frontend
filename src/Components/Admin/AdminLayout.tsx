import { Outlet } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SideBar from "./SideBar";
import ScrollToTop from "../Scroll/ScrollToTop";

const AdminLayout = () => {
  return (
    <ProtectedRoute>
      <div className="flex w-screen">
        <ScrollToTop/>
        <SideBar />
        <div className="flex-1 p-4 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
