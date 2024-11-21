import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ProfileImg from "../assets/img/profile.jpg";
import { MdOutlineFileDownload } from "react-icons/md";

const data = [
  { id: 0, role: "Admin", member_count: 1 },
  { id: 1, role: "Creators", member_count: 0 },
  { id: 2, role: "Creator Lite", member_count: 1 },
];

const dropdownOptions = [
  { label: 'All', value: 'all' },
  { label: 'Admin', value: 'admin' },
  { label: 'Creators', value: 'creators' },
  { label: 'Creator Lite', value: 'creator_lite' },
];

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
];

const Dropdown = ({ label, options }) => (
  <Menu as="div" className="relative inline-block text-left">
    <div>
      <MenuButton className="inline-flex min-w-36 justify-between gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50">
        {label}
        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5" />
      </MenuButton>
    </div>
    <MenuItems className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-md ring-1 ring-black/5">
      {options.map(({ label, value }) => (
        <div key={value} className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100"
            >
              {label}
            </a>
          </MenuItem>
        </div>
      ))}
    </MenuItems>
  </Menu>
);

const Dashboard = () => {
  return (
    <div className="w-full flex flex-col mt-10 px-2 md:px-10 lg:px-20">
      <h1 className="text-4xl font-bold border-b-2 pb-6">Workspace Settings</h1>
      <h2 className="text-xl font-bold mt-10 mb-6">Members (2)</h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-blue-100 rounded-xl py-4">
        {data.map(({ id, member_count, role }) => (
          <div key={id} className="w-full flex justify-between items-end px-8 py-4 border-r border-gray-300 last:border-0">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold">{member_count}</h3>
              <p className="text-md font-medium">{role}</p>
            </div>
            <img
              src={ProfileImg}
              alt="Profile Img"
              className="w-10 h-auto border-2 border-white rounded-full"
            />
          </div>
        ))}
      </div>
      <div className="my-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-4">
          <input
            type="text"
            placeholder="Enter a name or email address"
            className="text-sm border rounded-full px-4 py-2 min-w-80 shadow-sm outline-none"
          />
          <Dropdown label="Role" options={dropdownOptions} />
          <Dropdown label="Status" options={statusOptions} />
          <p className="text-sm text-blue-600 font-bold border-b-2 border-blue-600 cursor-pointer">
            Clear
          </p>
        </div>
        <div className="flex items-center gap-x-2 gap-y-4">
          <button className="text-sm font-semibold hover:bg-gray-50 px-4 py-2 rounded-full border-2 flex gap-2 items-center">
            <MdOutlineFileDownload className="text-xl" />
            Download CSV
          </button>
          <button className="text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full shadow-sm">
            Invite Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
