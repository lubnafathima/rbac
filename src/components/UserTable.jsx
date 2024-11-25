import UserRow from "./UserRow";
import { CgArrowsExchangeAltV } from "react-icons/cg";

const UserTable = ({ users }) => {
  return (
    <table className="table-auto w-full border-collapse">
      <thead>
        <tr>
          <th className="text-start py-2 px-4">
            <input type="checkbox" />
          </th>
          <th className="text-start text-xs text-gray-500 font-semibold py-2 px-4">
            <div className="flex gap-1 items-center">
              Member
              <CgArrowsExchangeAltV className="text-xl" />
            </div>
          </th>
          <th className="text-start text-xs text-gray-500 font-semibold py-2 px-4">
            <div className="flex gap-1 items-center">
              Role
              <CgArrowsExchangeAltV className="text-xl" />
            </div>
          </th>
          <th className="text-start text-xs text-gray-500 font-semibold py-2 px-4">
            <div className="flex gap-1 items-center">
              Date Added
              <CgArrowsExchangeAltV className="text-xl" />
            </div>
          </th>
          <th className="text-start text-xs text-gray-500 font-semibold py-2 px-4">
            <div className="flex gap-1 items-center">
              Email Address
              <CgArrowsExchangeAltV className="text-xl" />
            </div>
          </th>
          <th className="text-start text-xs text-gray-500 font-semibold py-2 px-4">
            <div className="flex gap-1 items-center">
              Status
              <CgArrowsExchangeAltV className="text-xl" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
