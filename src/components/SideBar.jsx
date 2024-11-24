import {
  CiHome,
  CiGrid42,
  CiBellOn,
  CiBookmark,
  CiClock2,
  CiSettings,
  CiSearch,
} from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";

const menuItems = {
  mainMenu: [
    { icon: <CiHome className="text-xl" />, label: "Home" },
    {
      icon: <CiGrid42 className="text-xl" />,
      label: "My library",
    },
    { icon: <CiBellOn className="text-xl" />, label: "Notifications" },
    { icon: <CiBookmark className="text-xl" />, label: "Watch Later" },
    { icon: <CiClock2 className="text-xl" />, label: "History" },
    { icon: <CiSettings className="text-xl" />, label: "Settings" },
  ],
  spaces: [
    { icon: <CiSearch className="text-xl" />, label: "Browse Spaces" },
    { icon: null, label: "My Space" }, 
  ],
};

const SideBar = ({ isVisible }) => {
  return (
    <div
      className={`z-50 fixed w-72 h-screen bg-gray-50 md:flex flex-col gap-2 p-4 ${isVisible ? "flex" : "hidden"} md:block`}
    >
      <h1 className="text-xl font-extrabold flex flex-wrap items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full">
        <FaUserFriends className="text-2xl" /> RBAC
      </h1>
      <hr className="border-t border-gray-300 my-4" />

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
            {item.icon === null ? (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-semibold">
                {item.label.charAt(0)}
              </div>
            ) : (
              item.icon
            )}
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
