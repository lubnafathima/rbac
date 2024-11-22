import {
  CiHome,
  CiBellOn,
  CiBookmark,
  CiClock2,
  CiSettings,
  CiSearch,
} from "react-icons/ci";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

const menuItems = {
  mainMenu: [
    { icon: <CiHome className="text-xl" />, label: "Home" },
    { icon: <MdOutlineVideoLibrary className="text-xl" />, label: "My library" },
    { icon: <CiBellOn className="text-xl" />, label: "Notifications" },
    { icon: <CiBookmark className="text-xl" />, label: "Watch Later" },
    { icon: <CiClock2 className="text-xl" />, label: "History" },
    { icon: <CiSettings className="text-xl" />, label: "Settings" },
  ],
  spaces: [
    { icon: <CiSearch className="text-xl" />, label: "Browse Spaces" },
    { icon: <CiSearch className="text-xl" />, label: "My Space" }, 
  ],
};

const SideBar = () => {
  return (
    <div className="fixed w-72 h-screen bg-gray-50 md:flex flex-col gap-2 p-4 hidden">
      
      <div className="flex flex-col gap-4">
        {menuItems.mainMenu.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {item.icon}
            <p>{item.label}</p>
          </div>
        ))}
      </div>

      <hr className="border-t border-gray-300 my-4" />

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Spaces</h2>
        <FaPlus className="text-xl cursor-pointer" />
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {menuItems.spaces.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {item.icon}
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
