"use client";
import { useState, useEffect, useRef } from "react";
import ChevronDown from "@svg/chevron-down.svg";
const options = [
  "History",
  "Food",
  "Pets",
  "Health",
  "Fashion",
  "Exercise",
  "Others",
];
export default function DropdownPost({
  selected,
  onChange,
  placeholder = "Choose a community",
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
      onChange(options[focusedIndex]);
      setOpen(false);
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
        className="border border-gray-300 rounded px-2 py-2 w-full bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-success text-sm font-bold flex items-center justify-start gap-2 md:max-w-[195px]"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected || placeholder}</span>
        <img src={ChevronDown.src} className="w-4 h-4" alt="arrow" />
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow transition-all duration-150">
          {options.map((category, index) => (
            <div
              key={category}
              onClick={() => {
                console.log(category);

                onChange(category);
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
