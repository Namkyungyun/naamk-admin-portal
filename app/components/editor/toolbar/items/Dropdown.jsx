import "../styles.scss";
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
      <div ref={dropdownRef} className="dropdown-warpper">
        {/* Dropdown button */}
        <button
          type="button"
          className={`${isSmall ? "rounded-lg" : "px-1 py-1 rounded-md"} dropdown-current-item`}
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}
        >
          {selectedItem}
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="dropdown-menu scrollable-content">
            {items.map((item, index) => (
              <button
                className="dropdown-menu-item "
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
