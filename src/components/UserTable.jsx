import { useState } from "react";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { MdEdit, MdDelete } from "react-icons/md";
import EmptyImg from "../assets/img/empty.jpg";

const UserTable = ({
  users,
  selectedUsers,
  handleCheckboxChange,
  handleSelectAllChange,
  deleteUser,
  openEditModal,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    column: null,
    direction: "ascending",
  });

  const totalPages = Math.ceil(users.length / rowsPerPage);

  const handleSort = (column) => {
    let direction = "ascending";
    if (sortConfig.column === column && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ column, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortConfig.column) return 0;

    const aValue = a[sortConfig.column];
    const bValue = b[sortConfig.column];

    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentUsers = sortedUsers.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="w-full">
        <div className="bg-gray-100 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-12 items-center lg:gap-1 p-2 md:p-0">
          <p className="w-full p-1 lg:p-4 text-start">
            <input
              type="checkbox"
              className="form-checkbox"
              onChange={handleSelectAllChange}
              checked={selectedUsers.length === users.length}
            />
          </p>
          <p className="w-full xl:col-span-2 p-1 lg:p-4 text-start">
            <p className="flex gap-1 items-center">
              Name
              <CgArrowsExchangeAltV
                className="text-xl text-blue-500 hover:text-blue-400 cursor-pointer transition duration-200"
                onClick={() => handleSort("member_name")}
              />
            </p>
          </p>
          <p className="w-full xl:col-span-2 p-1 lg:p-4 text-start">
            <p className="flex gap-1 items-center">
              Email
              <CgArrowsExchangeAltV
                className="text-xl text-blue-500 hover:text-blue-400 cursor-pointer transition duration-200"
                onClick={() => handleSort("member_email")}
              />
            </p>
          </p>
          <p className="w-full xl:col-span-2 p-1 lg:p-4 lg::text-center">Role</p>
          <p className="w-full xl:col-span-2 p-1 lg:p-4 lg::text-center">
            <p className="flex gap-1 items-center">
              Date Added
              <CgArrowsExchangeAltV
                className="text-xl text-blue-500 hover:text-blue-400 cursor-pointer transition duration-200"
                onClick={() => handleSort("date_added")}
              />
            </p>
          </p>
          <p className="w-full p-1 lg:p-4 lg::text-center">Status</p>
          <p className="w-full xl:col-span-2 p-1 lg:p-4 lg:text-center">Action</p>
        </div>
        <div>
          {currentUsers.length === 0 ? (
            <div className="p-1 lg:p-4 lg::text-center text-gray-500">
              <p className="w-full flex flex-col items-center">
                <img
                  src={EmptyImg}
                  alt="No Data Found"
                  className="w-1/2 h-auto"
                />
                <p className="text-xl font-semibold text-blue-500">
                  Looks like you&#39;re off to a fresh start!
                </p>
                <p className="mt-2">
                  There&#39;s no data here yet. Start adding users and watch
                  your list grow!
                </p>
              </p>
            </div>
          ) : (
            currentUsers.map((user) => (
              <div
                key={user.id}
                className="border-b w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-12 items-center gap-1 p-2 md:p-0"
              >
                <p className="w-full p-1 lg:p-4">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                </p>
                <p className="w-full xl:col-span-2 p-1 lg:p-4 text-gray-600 font-semibold text-sm">
                  {user.member_name}
                </p>
                <p className="w-full xl:col-span-2 p-1 lg:p-4 text-gray-600 text-sm">
                  {user.member_email}
                </p>
                <p className="w-full xl:col-span-2 p-1 lg:p-4 text-gray-600 text-sm xl:text-center">
                  {user.member_role}
                </p>

                <p className="w-full xl:col-span-2 p-1 lg:p-4 text-gray-600 text-sm">
                  {user.date_added.toDate().toLocaleDateString()}
                </p>
                <p className="w-full">
                  <p
                    className={`p-1 rounded-full text-center border-2 text-sm font-semibold ${
                      user.Status === "Active"
                        ? "border-green-500 bg-green-100 text-green-500"
                        : user.Status === "Inactive"
                        ? "border-red-500 bg-red-100 text-red-500"
                        : ""
                    }`}
                  >
                    {user.Status}
                  </p>
                </p>
                <p className="w-full xl:col-span-2 p-1 lg:p-4 flex items-center xl:justify-center gap-2">
                  <MdEdit
                    className="text-blue-500 hover:text-blue-400 transition-all transition-200 text-xl cursor-pointer"
                    onClick={() => openEditModal(user)}
                  />

                  <MdDelete
                    onClick={() => deleteUser(user.id)}
                    className="text-red-500 hover:text-red-400 transition-all transition-200 text-xl cursor-pointer"
                  />
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="p-2 border rounded-md"
          >
            <option value={5}>5 </option>
            <option value={10}>10 </option>
            <option value={15}>15 </option>
          </select>
          per page
        </div>
        <div className="flex items-center gap-1 lg:p-4">
          <button
            onClick={handlePreviousPage}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
