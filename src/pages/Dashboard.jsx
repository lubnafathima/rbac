import ProfileImg from "../assets/img/profile.jpg";
import { MdOutlineFileDownload } from "react-icons/md";
import Dropdown from "../components/Dropdown";

const data = [
  { id: 0, role: "Admin", member_count: 1 },
  { id: 1, role: "Creators", member_count: 0 },
  { id: 2, role: "Creator Lite", member_count: 1 },
];

const roleOptions = [
  { label: "All", value: "all" },
  { label: "Admin", value: "admin" },
  { label: "Creators", value: "creators" },
  { label: "Creator Lite", value: "creator_lite" },
];

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];
const Dashboard = () => {
  return (
    <div className="w-full flex flex-col mt-10 px-2 md:px-10 lg:px-20">
      <h1 className="text-4xl font-bold border-b-2 pb-6">Workspace Settings</h1>
      <h2 className="text-xl font-bold mt-10 mb-6">Members (2)</h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-blue-100 rounded-xl py-4">
        {data.map(({ id, member_count, role }) => (
          <div
            key={id}
            className="w-full flex justify-between items-end px-8 py-4 border-r border-gray-300 last:border-0"
          >
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
          <Dropdown label="Role" options={roleOptions} />
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
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="text-start py-2 px-4">
              <input type="checkbox" />
            </th>
            <th className="text-start text-xs text-gray-500 font-semibold py-2 px-4">
              Member
            </th>
            <th className="text-start text-xs text-gray-500 font-semibold py-2 px-4">
              Role
            </th>
            <th className="text-start text-xs text-gray-500 font-semibold py-2 px-4">
              Date added
            </th>
            <th className="text-start text-xs text-gray-500 font-semibold py-2 px-4">
              Email address
            </th>
            <th className="text-start text-xs text-gray-500 font-semibold py-2 px-4">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((member, index) => (
            <tr
              key={member.id}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="py-2 px-4">
                <input type="checkbox" />
              </td>
              <td className="py-2 px-4 text-sm text-black">{member.role}</td>
              <td className="py-2 px-4 text-sm text-gray-600">{member.role}</td>
              <td className="py-2 px-4 text-sm text-gray-600">29 July 2024</td>
              <td className="py-2 px-4 text-sm text-gray-600 underline">{`${member.role.toLowerCase()}@gmail.com`}</td>
              <td className="py-2 px-4 text-sm text-gray-600">Active</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
