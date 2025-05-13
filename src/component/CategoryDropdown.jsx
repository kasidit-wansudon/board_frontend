"use client";
import { useState, useEffect, useRef } from "react";

export default function CategoryDropdown({
  selected,
  onSelect,
  options,
  placeholder = "Select an option",
  currentPost,
}) {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleKeyDown(e) {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
    } else if (e.key === "Enter") {
      onSelect(options[focusedIndex]);
      setOpen(false);
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
        className="border border-gray-300 rounded px-4 py-2 w-full text-left bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected || placeholder} ▾
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow transition-all duration-150">
          {options.map((category, index) => (
            <div
              key={category}
              onClick={() => {
                onSelect(category);
                setOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer ${
                selected === category
                  ? "bg-green-500 text-white"
                  : "hover:bg-green-50"
              }`}
              role="option"
              aria-selected={selected === category}
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
