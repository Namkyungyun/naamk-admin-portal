import { useState, useRef, useEffect } from "react";

export function Dropdown({
  isSmall = false,
  closeAuto = true,
  items,
  selectedItem,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // 드롭다운 요소 참조
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div ref={dropdownRef} className={`relative inline-block text-left`}>
        {/* Dropdown button */}
        <button
          type="button"
          className={`${isSmall ? "rounded-lg" : "px-1 py-1 rounded-md"} inline-flex items-center justify-center w-full shadow-sm dropdown-item`}
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}
        >
          {selectedItem}
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="z-40 py-1 px-4 grid grid-cols-1 place-items-center absolute mt-0 rounded-md shadow-sm bg-white focus:outline-none">
            {items.map((item, index) => (
              <button
                className="gap-4 flex col-span-1 dropdown-item"
                key={index}
                onClick={closeAuto ? toggleDropdown : null}
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
