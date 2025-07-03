"use client";

import React, { ReactNode } from "react";

type ButtonProps = {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function Button({ onClick, children, className = "", type = "button" }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-sky-800 text-white text-sm font-semibold px-3 py-1 rounded-full hover:bg-sky-700 transition max-w-[90px] text-center ${className}`}
    >
      {children}
    </button>
  );
}
