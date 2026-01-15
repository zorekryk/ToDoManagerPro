import { useEffect, useRef } from "react";
import "./Dropdown.css";

const Dropdown = (props) => {
  const {
    isOpen,
    onClose,
    triggerRef,
    children,
    title,
    align = "right",
    width = "auto"
  } = props;

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div
      className={`dropdown dropdown-${align}`}
      ref={menuRef}
      style={{ width }}
    >
      {title && (
        <div className="dropdown-header">
          <span>{title}</span>
        </div>
      )}
      <div className="dropdown-content">
        {children}
      </div>
    </div>
  );
};

export default Dropdown;