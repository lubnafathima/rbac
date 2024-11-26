import { useState, useEffect } from "react";
import { CgArrowsExchangeAltV } from "react-icons/cg";

const UserTable = ({ users, selectedUsers, handleCheckboxChange, handleSelectAllChange }) => {
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
            <th className="px-4 py-4 text-start">
              <p className="flex gap-1 items-center">
                Name
                <CgArrowsExchangeAltV
                  className="text-xl text-blue-500 hover:text-blue-400 cursor-pointer transition duration-200"
                  onClick={() => handleSort("member_name")}
                />
              </p>
            </th>
            <th className="px-4 py-4 text-start">
              <p className="flex gap-1 items-center">
                Email
                <CgArrowsExchangeAltV
                  className="text-xl text-blue-500 hover:text-blue-400 cursor-pointer transition duration-200"
                  onClick={() => handleSort("member_email")}
                />
              </p>
            </th>
            <th className="px-4 py-4 text-start">Role</th>
            <th className="px-4 py-4 text-start">
              <p className="flex gap-1 items-center">
                Date Added
                <CgArrowsExchangeAltV
                  className="text-xl text-blue-500 hover:text-blue-400 cursor-pointer transition duration-200"
                  onClick={() => handleSort("date_added")}
                />
              </p>
            </th>
            <th className="px-4 py-4 text-start">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
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
              <td className="px-4 py-4">{user.date_added.toDate().toLocaleDateString()}</td>
              <td className="px-4 py-4">{user.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="p-2 border rounded-md"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={15}>15 per page</option>
          </select>
        </div>
        <div className="flex items-center gap-4">
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
