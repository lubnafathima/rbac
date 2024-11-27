import { MdEdit, MdDelete } from "react-icons/md";

const UserTable = ({
  users,
  selectedUsers,
  handleCheckboxChange,
  handleSelectAllChange,
  deleteUser,
  openEditModal
}) => {
  return (
    <div>
      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-4 text-start">
              <input
                type="checkbox"
                className="form-checkbox"
                onChange={handleSelectAllChange}
                checked={selectedUsers.length === users.length}
              />
            </th>
            <th className="px-4 py-4 text-start">Name</th>
            <th className="px-4 py-4 text-start">Email</th>
            <th className="px-4 py-4 text-start">Role</th>
            <th className="px-4 py-4 text-start">Date Added</th>
            <th className="px-4 py-4 text-start">Status</th>
            <th className="px-4 py-4 text-start">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-4">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
              </td>
              <td className="px-4 py-4">{user.member_name}</td>
              <td className="px-4 py-4">{user.member_email}</td>
              <td className="px-4 py-4">{user.member_role}</td>
              <td className="px-4 py-4">
                {user.date_added.toDate().toLocaleDateString()}
              </td>
              <td className="px-4 py-4">{user.Status}</td>
              <td className="px-4 py-4 flex items-center gap-2">
                {/* Edit Button */}
                <MdEdit
                  className="text-blue-500 hover:text-blue-400 transition-all transition-200 text-xl cursor-pointer"
                  onClick={() => openEditModal(user)} // Open the Edit Modal with the selected user
                />
                {/* Delete Button */}
                <MdDelete
                  onClick={() => deleteUser(user.id)} // Delete the selected user
                  className="text-red-500 hover:text-red-400 transition-all transition-200 text-xl cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
