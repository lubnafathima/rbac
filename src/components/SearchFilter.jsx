import Dropdown from "./Dropdown";

const SearchFilter = ({ searchQuery, setSearchQuery, selectedRole, setSelectedRole, handleClearFilters }) => {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-4">
      <input
        type="text"
        placeholder="Enter a name or email address"
        className="text-sm border rounded-full px-4 py-2 min-w-80 shadow-sm outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Dropdown label="Role" options={roleOptions} selected={selectedRole} onChange={setSelectedRole} />
      <p
        className="text-sm text-blue-600 font-bold border-b-2 border-blue-600 cursor-pointer"
        onClick={handleClearFilters}
      >
        Clear
      </p>
    </div>
  );
};

export default SearchFilter;
