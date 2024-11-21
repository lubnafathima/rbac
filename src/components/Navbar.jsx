import { FiSearch } from "react-icons/fi";
import ProfileImg from "../assets/img/profile.jpg";
const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center px-2 gap-4 md:px-10 md:gap-10 lg:px-20 lg:gap-20">
      <div className="w-full flex items-center gap-4 border rounded-full shadow-sm py-2 px-4">
        <FiSearch className="cursor-pointer text-2xl font-extrabold hover:scale-110 transition-all duration-300 ease-in-out" />
        <input
          type="text"
          placeholder="Search for people, tags, folders, Spaces, and Looms"
          className="w-full outline-none"
        />
      </div>
      <img src={ProfileImg} className="w-10 h-10 text-4xl rounded-full text-white bg-blue-600 hover:bg-blue-500 cursor-pointer transition-all duration-300 ease-in-out" />
    </div>
  );
};

export default Navbar;
