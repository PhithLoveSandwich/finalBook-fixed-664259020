// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 py-10 mt-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {/* --- Services --- */}
        <div>
          <h6 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Services
          </h6>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Email
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Call Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* --- About Us --- */}
        <div>
          <h6 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            About Us
          </h6>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Jobs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Press Kit
              </a>
            </li>
          </ul>
        </div>

        {/* --- Legal --- */}
        <div>
          <h6 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Legal
          </h6>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* --- Bottom Bar --- */}
      <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-6">
        © {new Date().getFullYear()} BookShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
