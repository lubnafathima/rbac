import { MdClose } from "react-icons/md";

const EditUserModal = ({
    selectedUserData,
    setSelectedUserData,
    roleOptions,
    handleEditUser,
    setShowModal,
  }) => {
    const handleModalClick = (e) => {
      e.stopPropagation(); // Prevent the modal from closing when clicking inside the modal
    };
  
    const filteredRoleOptions = roleOptions.filter((role) => role.value !== "all");
  
    return (
      <div
        className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
        onClick={() => setShowModal(false)} // Close modal on background click
      >
        <div className="bg-white p-6 rounded-lg w-96" onClick={handleModalClick}>
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold mb-4">Edit Member</h2>
            <MdClose
              className="text-xl cursor-pointer hover:text-gray-600 transition-colors duration-300"
              onClick={() => setShowModal(false)} // Close modal on close icon click
            />
          </div>
          <form onSubmit={handleEditUser}> {/* Handle submit */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Member Name</label>
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
              <label className="block text-sm font-semibold mb-2">Member Email</label>
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
              <label className="block text-sm font-semibold mb-2">Member Role</label>
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
  