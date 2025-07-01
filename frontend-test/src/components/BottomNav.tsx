// components/BottomNav.tsx
"use client";

import { FaHome, FaSearch, FaSyncAlt, FaHeart } from "react-icons/fa";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center py-2 shadow-md sm:hidden">
      <button className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
        <FaHome size={20} />
        <span className="text-xs">Hem</span>
      </button>
      <button className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
        <FaSearch size={20} />
        <span className="text-xs">Sök</span>
      </button>
      <button className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
        <FaSyncAlt size={20} />
        <span className="text-xs">Sortera</span>
      </button>
      <button className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
        <FaHeart size={20} />
        <span className="text-xs">Favoriter</span>
      </button>
    </nav>
  );
}
