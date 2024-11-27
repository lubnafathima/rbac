import { collection, addDoc, getDocs, Timestamp, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Fetch users from Firestore
export const fetchUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// Add new user
export const addUser = async (userData) => {
  try {
    await addDoc(collection(db, "users"), {
      ...userData,
      Status: "Active",
      date_added: Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

// Delete selected users
export const deleteUsers = async (selectedUsers) => {
  try {
    for (const userId of selectedUsers) {
      const userDocRef = doc(db, "users", userId);
      await deleteDoc(userDocRef);
    }
    return true;
  } catch (error) {
    console.error("Error deleting users:", error);
    return false;
  }
};

// Update user data
export const editUser = async (userId, updatedData) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, updatedData);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

// Filter users based on search, role, and status
export const filterUsers = (users, searchQuery, selectedRole, selectedStatus) => {
  let filtered = users;

  if (searchQuery) {
    filtered = filtered.filter(
      (user) =>
        user.member_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.member_email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedRole !== "all") {
    filtered = filtered.filter((user) => user.member_role.toLowerCase() === selectedRole);
  }

  if (selectedStatus !== "All") {
    filtered = filtered.filter((user) => user.Status === selectedStatus);
  }

  return filtered;
};

// Download CSV file
export const downloadCSV = (users) => {
  const headers = ["ID", "Name", "Email", "Role", "Status", "Date Added"];
  const rows = users.map((user) => [
    user.id,
    user.member_name,
    user.member_email,
    user.member_role,
    user.Status,
    new Date(user.date_added.seconds * 1000).toLocaleDateString(),
  ]);

  const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "users.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
