import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Dropdown = ({ label, options, selected, onChange }) => {
  const handleOptionClick = (value) => {
    onChange(value);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex min-w-36 justify-between gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50">
        {label}
        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5" />
      </MenuButton>
      <MenuItems className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-md ring-1 ring-black/5">
        {options.map((option) => {
          const optionLabel = typeof option === "string" ? option : option.label;
          const optionValue = typeof option === "string" ? option : option.value;

          return (
            <MenuItem key={optionValue}>
              <a
                href="#"
                onClick={() => handleOptionClick(optionValue)}
                className={`block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 ${selected === optionValue ? 'bg-gray-100' : ''}`}
              >
                {optionLabel} 
              </a>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
};

export default Dropdown;
