// src/components/TopBar.js
import React, { useState } from 'react';
import { Search, Menu as MenuIcon } from '@mui/icons-material';

const Header = ({ isOpen, toggleSidebar }) => {
  // State to track the active menu
  const [activeTab, setActiveTab] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-transparent shadow-none p-4">
      <div className="flex flex-col lg:flex-row justify-between">

        {/* Navigation Tabs */}
        <div className="flex flex-wrap text-left space-x-6 mt-4 lg:mt-0 lg:flex-nowrap">
          {/* Hamburger Icon for Mobile */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-white"
          >
            <MenuIcon />
          </button>
          <button
            onClick={() => handleTabClick('Music')}
            className={`text-m focus:outline-none ${activeTab==='Music'?'text-gray-400':'text-white'}  hover:text-gray-400`}
          >
            Music
          </button>
          <button
            onClick={() => handleTabClick('Podcast')}
            className={`text-m focus:outline-none ${activeTab==='Podcast'?'text-gray-400':'text-white'}  hover:text-gray-400`}
          >
            Podcast
          </button>
          <button
            onClick={() => handleTabClick('Live')}
            className={`text-m focus:outline-none ${activeTab==='Live'?'text-gray-400':'text-white'}  hover:text-gray-400`}
          >
            Live
          </button>
          <button
            onClick={() => handleTabClick('Radio')}
            className={`text-sm focus:outline-none  ${activeTab==='Radio'?'text-gray-400':'text-white'}  hover:text-gray-400`}
          >
            Radio
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mt-4 lg:mt-0 lg:ml-5 lg:flex">
          <input
            type="text"
            placeholder="Search"
            className="bg-[#2c0001] text-white rounded-full w-[360px] py-2 px-4 pr-10 focus:outline-none focus:ring-0 focus:border-transparent"
          />
          <Search className="absolute right-2 top-2 text-white lg:hidden" />
        </div>
      </div>
    </div>
  );
};

export default Header;
