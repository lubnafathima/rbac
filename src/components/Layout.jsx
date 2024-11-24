import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Navbar from "./Navbar";

const Layout = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="relative flex w-full min-h-screen font-[Helvetica] tracking-wide">
      <SideBar isVisible={isSidebarVisible} />
      <div className="md:ml-72 w-full min-h-screen h-full p-6 bg-white">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="pt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
