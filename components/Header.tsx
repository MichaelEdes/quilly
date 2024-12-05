import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header>
      <nav className="border-gray-700 bg-gray-900">
        <div className="lg:px-[14px] flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <i className="fa-solid fa-feather text-white text-3xl"></i>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Quilly
            </span>
          </Link>
          <div className="flex md:order-2 gap-[10px]">
            <Link href="#create-story">
              <div className="relative flex items-center justify-center">
                <i className="fa-solid text-[20px] fa-feather w-[40px] h-[40px] text-gray-400 bg-gray-800 p-2 rounded-lg border-gray-400 border-2 hover:ring-2 ring-gray-200 cursor-pointer duration-150"></i>
              </div>
            </Link>
            <Link href="/stories">
              <div className="relative flex items-center justify-center">
                <i className="fa-solid text-[20px] fa-book-open w-[40px] h-[40px] text-gray-400 bg-gray-800 p-2 rounded-lg border-gray-400 border-2 hover:ring-2 ring-gray-200 cursor-pointer duration-150"></i>
              </div>
            </Link>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-700 rounded-lg bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-900">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-white bg-gray-800 rounded hover:bg-gray-700 md:bg-transparent md:hover:text-gray-400 md:p-0"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-400 rounded hover:bg-gray-700 hover:text-white md:p-0"
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
