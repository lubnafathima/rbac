import { useState, useEffect, useCallback } from "react";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  Timestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import UserTable from "../components/UserTable";
import MemberStats from "../components/MemberStats";
import { MdOutlineFileDownload, MdOutlineAdd, MdDelete } from "react-icons/md";
import Dropdown from "../components/Dropdown";
import Modal from "../components/Modal";
import EditUserModal from "../components/EditUserModal";
import { statusOptions, roleOptions } from "../utils/Helper";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    member_name: "",
    member_email: "",
    member_role: "Admin",
  });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  }, []);

  const filterUsers = () => {
    let filtered = users;

    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.member_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.member_email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedRole !== "all") {
      filtered = filtered.filter(
        (user) => user.member_role.toLowerCase() === selectedRole
      );
    }

    if (selectedStatus !== "All") {
      filtered = filtered.filter((user) => user.Status === selectedStatus);
    }

    setFilteredUsers(filtered);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    filterUsers();
  }, [searchQuery, selectedRole, selectedStatus, users]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);

  const handleRoleChange = (role) => setSelectedRole(role.toLowerCase());
  const handleStatusChange = (status) => setSelectedStatus(status);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedRole("all");
    setSelectedStatus("All");
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const { member_name, member_email, member_role, permissions } = newUserData;

    if (member_name && member_email && member_role) {
      try {
        await addDoc(collection(db, "users"), {
          member_name,
          member_email,
          member_role,
          Status: "Active",
          date_added: Timestamp.fromDate(new Date()),
          permissions: permissions,
        });
        fetchUsers();
        setShowAddModal(false);
        setNewUserData({
          member_name: "",
          member_email: "",
          member_role: "Admin",
          permissions: {
            invite: false,
            manage: false,
            record: false,
            delete: false,
          },
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
      setSelectedUsers(filteredUsers.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      await deleteDoc(userDocRef);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  const deleteUsers = async () => {
    try {
      if (Array.isArray(selectedUsers) && selectedUsers.length > 0) {
        for (const userId of selectedUsers) {
          const userDocRef = doc(db, "users", userId);
          await deleteDoc(userDocRef);
        }
        fetchUsers();
        setSelectedUsers([]);
      } else {
        console.error("No users selected for deletion");
      }
    } catch (error) {
      console.error("Error deleting users: ", error);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    const { member_name, member_email, member_role, permissions, Status } =
      selectedUserData;

    if (member_name && member_email && member_role) {
      try {
        await updateDoc(doc(db, "users", selectedUserData.id), {
          member_name,
          member_email,
          member_role,
          Status,
          permissions, 
        });
        fetchUsers(); 
        setShowEditModal(false); 
      } catch (error) {
        console.error("Error updating user: ", error);
      }
    }
  };

  const openEditModal = (user) => {
    setSelectedUserData(user);
    setShowEditModal(true);
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
    ].join("\n");

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
      <MemberStats users={filteredUsers} />

      <div className="my-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-4">
          <input
            type="text"
            placeholder="Enter a name or email address"
            className="text-sm border rounded-full px-4 py-2 min-w-80 shadow-sm outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Dropdown
            label="Role"
            options={roleOptions}
            selected={selectedRole}
            onChange={handleRoleChange}
          />
          <Dropdown
            label="Status"
            options={statusOptions}
            selected={selectedStatus}
            onChange={handleStatusChange}
          />
          <p
            className="text-sm text-blue-600 font-bold border-b-2 border-blue-600 cursor-pointer"
            onClick={handleClearFilters}
          >
            Clear
          </p>
        </div>
        <div className="flex items-center gap-x-2 gap-y-4">
          {selectedUsers.length > 0 && (
            <button
              onClick={deleteUsers}
              className="text-sm font-semibold text-white bg-red-500 hover:bg-red-600 px-2 py-2 rounded-full flex gap-2 items-center"
            >
              <MdDelete className="text-xl" />
            </button>
          )}
          <button
            className="text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 px-2 py-2 rounded-full flex gap-2 items-center"
            onClick={downloadCSV}
          >
            <MdOutlineFileDownload className="text-xl" />
          </button>
          <button
            className="text-sm font-semibold text-white bg-green-500 hover:bg-green-600 px-2 py-2 rounded-full shadow-sm"
            onClick={() => setShowAddModal(true)}
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
        deleteUser={handleDeleteUser}
        openEditModal={openEditModal}
      />

      {showAddModal && (
        <Modal
          newUserData={newUserData}
          setNewUserData={setNewUserData}
          roleOptions={roleOptions}
          handleAddUser={handleAddUser}
          setShowModal={setShowAddModal}
        />
      )}

      {showEditModal && selectedUserData && (
        <EditUserModal
          selectedUserData={selectedUserData}
          setSelectedUserData={setSelectedUserData}
          statusOptions={statusOptions}
          roleOptions={roleOptions}
          handleEditUser={handleEditUser}
          setShowModal={setShowEditModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
