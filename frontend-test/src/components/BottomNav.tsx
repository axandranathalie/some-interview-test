"use client";
import { useEffect, useRef } from "react";
import { FaHome, FaSearch, FaSyncAlt, FaHeart } from "react-icons/fa";
import { useApp } from "@/context/AppContext";

export default function BottomNav() {
  const {
    search,
    setSearch,
    showSearch,
    setShowSearch,
    setShowFavorites,
    toggleSortOrder,
  } = useApp();

  const searchRef = useRef<HTMLDivElement | null>(null);

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
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

  }, [showSearch, setShowSearch]);

  const handleHomeClick = () => {
    setSearch("");
    setShowFavorites(false);
    setShowSearch(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex justify-around items-center py-2 shadow-md md:hidden">
        <button
          onClick={handleHomeClick}
          className="flex flex-col items-center text-gray-600 hover:text-sky-800"
          aria-label="Home"
        >
          <FaHome size={20} />
          <span className="text-xs">Hem</span>
        </button>

        <button
          onClick={toggleSortOrder}
          className="flex flex-col items-center text-gray-600 hover:text-sky-800"
          aria-label="Sort"
        >
          <FaSyncAlt size={20} />
          <span className="text-xs">Sortera</span>
        </button>

        <button
          onClick={() => setShowFavorites((prev) => !prev)}
          className="flex flex-col items-center text-gray-600 hover:text-sky-800"
          aria-label="Favorites"
        >
          <FaHeart size={20} />
          <span className="text-xs">Favoriter</span>
        </button>

        <button
          onClick={() => setShowSearch((prev) => !prev)}
          className="flex flex-col items-center text-gray-600 hover:text-sky-800"
          aria-label="Search"
        >
          <FaSearch size={20} />
          <span className="text-xs">Sök</span>
        </button>
      </nav>

      {showSearch && (
        <div
          ref={searchRef}
          className="fixed bottom-16 left-4 right-4 z-50 bg-white border shadow-lg rounded-md p-2 animate-fade-slide-up sm:hidden"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Sök inlägg..."
            className="w-full p-2 border rounded text-sm"
            autoFocus
            aria-label="Search posts"
          />
        </div>
      )}
    </>
  );
}
