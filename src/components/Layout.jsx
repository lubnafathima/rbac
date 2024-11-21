import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="relative flex w-full min-h-screen font-[Helvetica] tracking-wide">
      <SideBar />
      <div className="md:ml-72 w-full min-h-screen h-full p-6 bg-white">
        <Navbar />
        <div className="pt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
