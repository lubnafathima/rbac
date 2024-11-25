const formatDate = (timestamp) => {
  return timestamp?.toDate().toLocaleDateString() || "N/A";
};

const UserRow = ({ user }) => (
  <tr>
    <td className="py-2 px-4">
      <input type="checkbox" />
    </td>
    <td className="py-2 px-4 text-sm text-gray-600">{user.member_name}</td>
    <td className="py-2 px-4 text-sm text-gray-600">{user.member_role}</td>
    <td className="py-2 px-4 text-sm text-gray-600">
      {formatDate(user.date_added)}
    </td>
    <td className="py-2 px-4 text-sm text-gray-600">{user.member_email}</td>
    <td className="py-2 px-4 text-sm text-gray-600">{user.Status}</td>
  </tr>
);

export default UserRow;
