import { useState, useEffect, useCallback } from "react";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import UserTable from "../components/UserTable";
import MemberStats from "../components/MemberStats";
import {
  MdOutlineFileDownload,
  MdOutlineAdd,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import Dropdown from "../components/Dropdown";
import Modal from "../components/Modal";
import { statusOptions, roleOptions } from "../utils/Helper";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    member_name: "",
    member_email: "",
    member_role: "Admin",
  });

  const [selectedUsers, setSelectedUsers] = useState([]); // Track selected users

  // Function to fetch users from Firestore
  const fetchUsers = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData); // Set users to state
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  }, []);

  // Function to apply filters based on search query, role, and status
  const filterUsers = () => {
    let filtered = users;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.member_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.member_email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply role filter
    if (selectedRole !== "all") {
      filtered = filtered.filter((user) => user.member_role.toLowerCase() === selectedRole);
    }

    // Apply status filter
    if (selectedStatus !== "All") {
      filtered = filtered.filter((user) => user.Status === selectedStatus);
    }

    setFilteredUsers(filtered); // Update filtered users state
  };

  // Fetch users on mount and filter users when dependencies change
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    filterUsers(); // Re-filter users whenever search, role, or status changes
  }, [searchQuery, selectedRole, selectedStatus, users]); // Dependencies include 'users'

  const handleRoleChange = (role) => setSelectedRole(role.toLowerCase());
  const handleStatusChange = (status) => setSelectedStatus(status);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedRole("all");
    setSelectedStatus("All");
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    const { member_name, member_email, member_role } = newUserData;

    if (member_name && member_email && member_role) {
      try {
        await addDoc(collection(db, "users"), {
          member_name,
          member_email,
          member_role,
          Status: "Active",
          date_added: Timestamp.fromDate(new Date()),
        });
        fetchUsers(); // Re-fetch users after adding
        setShowModal(false);
        setNewUserData({
          member_name: "",
          member_email: "",
          member_role: "Admin",
        });
      } catch (error) {
        console.error("Error adding user: ", error);
      }
    }
  };

  const handleCheckboxChange = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      setSelectedUsers(filteredUsers.map((user) => user.id)); // Select all users
    } else {
      setSelectedUsers([]); // Deselect all users
    }
  };

  const deleteUsers = async () => {
    try {
      if (Array.isArray(selectedUsers) && selectedUsers.length > 0) {
        for (const userId of selectedUsers) {
          const userDocRef = doc(db, "users", userId);
          await deleteDoc(userDocRef);
        }
        fetchUsers(); // Refresh after deletion
        setSelectedUsers([]); // Clear selected users
      } else {
        console.error("No users selected for deletion");
      }
    } catch (error) {
      console.error("Error deleting users: ", error);
    }
  };

  const downloadCSV = () => {
    const headers = ["ID", "Name", "Email", "Role", "Status", "Date Added"];
    const rows = filteredUsers.map((user) => [
      user.id,
      user.member_name,
      user.member_email,
      user.member_role,
      user.Status,
      new Date(user.date_added.seconds * 1000).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ]
      .map((e) => e.replace(/\n/g, ""))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "users.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full flex flex-col mt-10 px-2 md:px-10 lg:px-20">
      <h1 className="text-4xl font-bold border-b-2 pb-6">Workspace Settings</h1>
      <MemberStats />

      <div className="my-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-4">
          <input
            type="text"
            placeholder="Enter a name or email address"
            className="text-sm border rounded-full px-4 py-2 min-w-80 shadow-sm outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
          <Dropdown
            label="Role"
            options={roleOptions}
            selected={selectedRole}
            onChange={handleRoleChange} // Update role
          />
          <Dropdown
            label="Status"
            options={statusOptions}
            selected={selectedStatus}
            onChange={handleStatusChange} // Update status
          />
          <p
            className="text-sm text-blue-600 font-bold border-b-2 border-blue-600 cursor-pointer"
            onClick={handleClearFilters} // Clear filters
          >
            Clear
          </p>
        </div>
        <div className="flex items-center gap-x-2 gap-y-4">
          <button
            className="text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 px-2 py-2 rounded-full flex gap-2 items-center"
            onClick={downloadCSV}
          >
            <MdOutlineFileDownload className="text-xl" />
          </button>
          {selectedUsers.length === 1 && (
            <>
              <button className="text-sm font-semibold text-white bg-yellow-500 hover:bg-yellow-600 px-2 py-2 rounded-full flex gap-2 items-center">
                <MdEdit className="text-xl" />
              </button>
              <button
                onClick={deleteUsers}
                className="text-sm font-semibold text-white bg-red-500 hover:bg-red-600 px-2 py-2 rounded-full flex gap-2 items-center"
              >
                <MdDelete className="text-xl" />
              </button>
            </>
          )}
          {selectedUsers.length > 1 && (
            <button
              onClick={deleteUsers}
              className="text-sm font-semibold text-white bg-red-500 hover:bg-red-600 px-2 py-2 rounded-full flex gap-2 items-center"
            >
              <MdDelete className="text-xl" />
            </button>
          )}
          <button
            className="text-sm font-semibold text-white bg-green-500 hover:bg-green-600 px-2 py-2 rounded-full shadow-sm"
            onClick={() => setShowModal(true)}
          >
            <MdOutlineAdd className="text-xl" />
          </button>
        </div>
      </div>

      <UserTable
        users={filteredUsers}
        selectedUsers={selectedUsers}
        handleCheckboxChange={handleCheckboxChange}
        handleSelectAllChange={handleSelectAllChange}
      />

      {showModal && (
        <Modal
          newUserData={newUserData}
          setNewUserData={setNewUserData}
          roleOptions={roleOptions}
          handleAddUser={handleAddUser}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
