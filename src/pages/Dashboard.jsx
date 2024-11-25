import { useState, useEffect, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Dropdown from "../components/Dropdown";
import { MdOutlineFileDownload } from "react-icons/md";
import UserTable from "../components/UserTable";
import MemberStats from "../components/MemberStats";
import { roleOptions } from "../utils/Helper";

// Helper function to format Firestore timestamp to MM/DD/YYYY
const formatDate = (timestamp) => {
  if (!timestamp) return ""; // If no timestamp, return empty string
  const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`; // Format as MM/DD/YYYY
};

const Dashboard = () => {
  const [users, setUsers] = useState([]); // Store all users from Firestore
  const [filteredUsers, setFilteredUsers] = useState([]); // Store filtered users based on search and role
  const [searchQuery, setSearchQuery] = useState(""); // Store the search query
  const [selectedRole, setSelectedRole] = useState("all"); // Store selected role filter

  // Fetch users from Firestore and store them
  const fetchUsers = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Firestore document ID
        ...doc.data(), // Firestore document data
      }));
      setUsers(usersData);
      setFilteredUsers(usersData); // Initially, show all users
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const filtered = users.filter(user => {
      const matchesSearch = user.member_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.member_email?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = selectedRole === "all" || 
                          user.member_role?.toLowerCase() === selectedRole.toLowerCase();

      return matchesSearch && matchesRole;
    });
    setFilteredUsers(filtered);
  }, [searchQuery, selectedRole, users]);

  const handleRoleChange = (role) => setSelectedRole(role.toLowerCase());
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedRole("all");
  };

  // Function to download the entire Firestore data (no filtering)
  const downloadCSV = () => {
    const csvRows = [];
    const headers = ["id", "member_name", "member_email", "date_added", "member_role", "status"]; // Columns in exact case-sensitive order
    csvRows.push(headers.join(","));

    users.forEach(user => {
      const row = [
        user.id || "", // Firestore ID
        user.member_name || "",
        user.member_email || "",
        formatDate(user.date_added) || "", // Format the timestamp
        user.member_role || "",
        user.Status || "" // Make sure to use "status" key here (as per Firestore)
      ];
      csvRows.push(row.join(","));
    });

    // Create a downloadable link
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    URL.revokeObjectURL(url); // Clean up the URL object after the download
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Dropdown 
            label="Role" 
            options={roleOptions} 
            selected={selectedRole}
            onChange={handleRoleChange}
          />
          <p
            className="text-sm text-blue-600 font-bold border-b-2 border-blue-600 cursor-pointer"
            onClick={handleClearFilters}
          >
            Clear
          </p>
        </div>
        <div className="flex items-center gap-x-2 gap-y-4">
          <button
            className="text-sm font-semibold hover:bg-gray-50 px-4 py-2 rounded-full border-2 flex gap-2 items-center"
            onClick={downloadCSV} // Trigger CSV download
          >
            <MdOutlineFileDownload className="text-xl" />
            Download CSV
          </button>
          <button className="text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full shadow-sm">
            Invite Member
          </button>
        </div>
      </div>

      <UserTable users={filteredUsers} />
    </div>
  );
};

export default Dashboard;
