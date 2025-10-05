// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  const menuItems = [
    { name: "Search", url: "/" },
    { name: "Add New Book", url: "/add-book" },
    { name: "About Us", url: "/about" },
  ];

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* --- Left: Logo --- */}
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
            >
              📚 BOOKS
            </Link>
          </div>

          {/* --- Center: Desktop Menu --- */}
          <div className="hidden lg:flex space-x-6">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.url}
                className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* --- Right: Mobile Menu Button --- */}
          <div className="lg:hidden dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle"
              aria-label="menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 dark:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 right-0 w-52 rounded-box bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg z-10"
            >
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.url}
                    className="text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
