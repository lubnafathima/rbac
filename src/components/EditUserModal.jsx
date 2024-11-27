import { MdClose } from "react-icons/md";

const EditUserModal = ({
  selectedUserData,
  setSelectedUserData,
  roleOptions,
  statusOptions,
  handleEditUser,
  setShowModal,
}) => {
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const filteredRoleOptions = roleOptions.filter(
    (role) => role.value !== "all"
  );

  const filteredStatusOptions = statusOptions.filter(
    (status) => status !== "all"
  );

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={() => setShowModal(false)}
    >
      <div className="bg-white p-6 rounded-lg w-96" onClick={handleModalClick}>
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold mb-4">Edit Member</h2>
          <MdClose
            className="text-xl cursor-pointer hover:text-gray-600 transition-colors duration-300"
            onClick={() => setShowModal(false)}
          />
        </div>
        <form onSubmit={handleEditUser}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Member Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              value={selectedUserData.member_name}
              onChange={(e) =>
                setSelectedUserData({
                  ...selectedUserData,
                  member_name: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Member Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md"
              value={selectedUserData.member_email}
              onChange={(e) =>
                setSelectedUserData({
                  ...selectedUserData,
                  member_email: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Member Role
            </label>
            {filteredRoleOptions.map((role) => (
              <label key={role.value} className="inline-flex items-center mr-6">
                <input
                  type="radio"
                  name="role"
                  value={role.value}
                  checked={selectedUserData.member_role === role.value}
                  onChange={() =>
                    setSelectedUserData({
                      ...selectedUserData,
                      member_role: role.value,
                    })
                  }
                  className="form-radio"
                />
                <span className="ml-2">{role.label}</span>
              </label>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Member Status
            </label>
            {filteredStatusOptions.map((status) => (
              <label key={status} className="inline-flex items-center mr-6">
                <input
                  type="radio"
                  name="status"
                  value={status}
                  checked={selectedUserData.Status === status}
                  onChange={() =>
                    setSelectedUserData({
                      ...selectedUserData,
                      Status: status,
                    })
                  }
                  className="form-radio"
                />
                <span className="ml-2">{status}</span>
              </label>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Permissions
            </label>
            <div className="space-y-2 grid grid-cols-2">
              {["invite", "manage", "record", "delete"].map((permission) => (
                <label key={permission} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name={permission}
                    checked={selectedUserData.permissions[permission]} 
                    onChange={() =>
                      setSelectedUserData({
                        ...selectedUserData,
                        permissions: {
                          ...selectedUserData.permissions,
                          [permission]:
                            !selectedUserData.permissions[permission], 
                        },
                      })
                    }
                    className="form-checkbox"
                  />
                  <span className="ml-2 capitalize">{permission}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Update Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
