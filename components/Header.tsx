"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { LibraryBig } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-[100]">
      <nav
        className={`border-gray-700 ${
          pathname === "/" ? "bg-gray-100" : "bg-gray-900"
        }`}
      >
        <div className="lg:px-[14px] flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <i className="fa-solid fa-feather text-purple-500 text-3xl"></i>
            <span
              className={`self-center text-2xl font-semibold whitespace-nowrap ${
                pathname === "/" ? "text-black " : "text-white"
              }`}
            >
              Quilly
            </span>
          </Link>
          <div className="flex md:order-2 gap-[10px]">
            <Link href="/#create-story">
              <div className="relative flex items-center justify-center">
                <i className="fa-solid text-[20px] fa-feather w-[40px] h-[40px] text-gray-400 bg-gray-800 p-2 rounded-lg border-gray-400 border-2 hover:ring-2 ring-purple-500 cursor-pointer duration-150"></i>
              </div>
            </Link>
            <Link href="/stories">
              <div className="relative flex items-center justify-center">
                <LibraryBig className="fa-solid text-[20px] fa-book-open w-[40px] h-[40px] text-gray-400 bg-gray-800 p-2 rounded-lg border-gray-400 border-2 hover:ring-2 ring-purple-500 cursor-pointer duration-150" />
              </div>
            </Link>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-700 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <Link
                  href="/"
                  className={`block py-2 px-3  md:bg-transparent md:hover:text-gray-400 md:p-0  ${
                    pathname === "/" ? "text-gray-700 " : "text-white"
                  }`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className={`block py-2 px-3  md:bg-transparent md:hover:text-gray-400 md:p-0  ${
                    pathname === "/" ? "text-gray-700 " : "text-white"
                  }`}
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
