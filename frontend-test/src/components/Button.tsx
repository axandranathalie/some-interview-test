"use client";

import React, { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

export default function Button({
  href,
  children,
  className = "",
  target = "_blank",
  rel = "noopener noreferrer",
}: ButtonProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`bg-sky-800 text-white text-sm font-semibold px-3 py-1 rounded-full hover:bg-sky-700 transition max-w-[90px] text-center ${className}`}
    >
      {children}
    </a>
  );
}
