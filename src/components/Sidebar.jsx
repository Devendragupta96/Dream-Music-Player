/* eslint-disable jsx-a11y/anchor-is-valid */
// Sidebar.js
import React from "react";
import Logo from '../assets/Logo.png';
import Home from '../assets/Home.png';
import Discover from '../assets/Discover.png';
import Trends from '../assets/Trends.png';
import Library from '../assets/Library.png';
import LogOut from '../assets/LogOut.png';
import Settings from '../assets/Settings.png';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const getImage = (text) => {
    switch (text) {
      case 'Home': return Home;
      case 'Discover': return Discover;
      case 'Trends': return Trends;
      case 'Log Out': return LogOut;
      case 'Settings': return Settings;
      default: return Library;
    }
  };

  return (
    <div className="relative">

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static top-0 left-0 w-[250px] bg-[#0e0e0f] h-full flex flex-col justify-between text-white transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Logo Section */}
        <div className="p-6">
          <div className="flex items-center text-2xl font-semibold mb-10">
            <img src={Logo} alt="logo" className="h-10 mr-3" />
            <span className="relative">
              <span className="text-red-500">Dream</span>
              Music
            </span>
          </div>

          {/* Menu Section */}
          <nav className="mt-10">
            <p className="text-xs text-white">MENU</p>
            {["Home", "Trends", "Library", "Discover"].map((text) => (
              <a
                key={text}
                href="#"
                className="flex gap-3 font-semibold items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-black"
              >
                <img src={getImage(text)} alt={`${text}`} className="h-5 w-5" />
                {text}
              </a>
            ))}
          </nav>
        </div>

        {/* General Section */}
        <div className="p-6 mb-5">
          <p className="text-xs text-white">GENERAL</p>
          {["Settings", "Log Out"].map((text) => (
              <a
                key={text}
                href="#"
                className="flex gap-3 font-semibold items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-black"
              >
                <img src={getImage(text)} alt={`${text}`} className="h-5 w-5" />
                {text}
              </a>
            ))}
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
        />
      )}
    </div>
  );
};

export default Sidebar;
