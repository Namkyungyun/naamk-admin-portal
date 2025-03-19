import { useState } from "react";

export function Dropdown({ size, autoClose = true, items, selectedItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`relative inline-block text-left`}>
        {/* Dropdown button */}
        <button
          type="button"
          className={`${size ? "size-5  rounded-lg" : "px-1 py-1 rounded-md"} inline-flex items-center justify-center w-full border border-gray-300 shadow-sm  hover:bg-gray-50`}
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}
        >
          {selectedItem}
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="z-40 grid grid-cols-1 place-items-center absolute mt-0 rounded-md shadow-sm bg-white focus:outline-none">
            {items.map((item, index) => (
              <button
                className="px-3 py-1 flex col-span-1"
                key={index}
                onClick={autoClose ? toggleDropdown : null}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
