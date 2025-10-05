// src/layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* --- Navbar (fixed top) --- */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16">
        <Navbar />
      </header>

      {/* --- Main Content --- */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <Outlet />
      </main>

      {/* --- Footer --- */}
      <Footer />
    </div>
  );
};

export default MainLayout;
