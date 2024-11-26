const RoleRadioButtons = ({ roleOptions, selectedRole, setSelectedRole }) => {
  return (
    <div className="flex gap-4">
      {roleOptions.map((option) => (
        <label key={option.value} className="flex items-center">
          <input
            type="radio"
            value={option.value}
            checked={selectedRole === option.value}
            onChange={() => setSelectedRole(option.value)}
            className="mr-2"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RoleRadioButtons;
