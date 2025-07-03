"use client";
import { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useApp } from "@/context/AppContext";

export default function DesktopHeader() {
  const [showSearch, setShowSearch] = useState(false);
  const { search, setSearch, setShowFavorites, toggleSortOrder } = useApp();
  const searchRef = useRef<HTMLDivElement>(null);

  // Stäng sökrutan när man klickar utanför
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    }

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);


  const handleReset = () => {
    setSearch("");
    setShowFavorites(false);
    setShowSearch(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
   <header className="hidden md:flex justify-between items-center px-8 py-4 bg-white sticky top-0 z-50 w-full max-w-screen mx-auto border-b border-gray-200">
  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
    Bergviks <span className="text-sky-800 uppercase">blogg</span>
  </h1>

  <nav className="flex items-center gap-6 text-gray-700 text-sm">
    <button
      onClick={handleReset}
      className="hover:text-sky-800 hover:underline transition-colors duration-200"
    >
      Hem
    </button>

    <button
      onClick={toggleSortOrder}
      className="hover:text-sky-800 hover:underline transition-colors duration-200"
    >
      Sortera
    </button>

    <button
      onClick={() => setShowFavorites((prev) => !prev)}
      className="hover:text-sky-800 hover:underline transition-colors duration-200"
    >
      Favoriter
    </button>

    <button
      onClick={() => setShowSearch((prev) => !prev)}
      className="flex items-center gap-1 hover:text-sky-800 hover:underline transition-colors duration-200"
    >
      <FaSearch />
      <span>Sök</span>
    </button>
  </nav>

  {showSearch && (
    <div
      ref={searchRef}
      className="absolute right-8 top-20 bg-white border px-4 py-2 shadow-md rounded-md"
    >
      <input
        type="text"
        placeholder="Sök inlägg..."
        className="border p-2 rounded w-64"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )}
</header>

  );
}
