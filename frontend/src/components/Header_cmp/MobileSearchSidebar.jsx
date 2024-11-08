import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const MobileSearchSidebar = ({
  mobileSearchSidebarOpen,
  setMobileSearchSidebarOpen,
}) => {
  return (
    <div
      className={`fixed inset-y-0 right-0 z-20 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10 
  transform transition-transform duration-300 ease-in-out ${
    mobileSearchSidebarOpen ? "translate-x-0" : "translate-x-full"
  }`}
    >
      <div className="flex items-center justify-between">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img alt="logo-black" src="/logo-black.png" className="h-8 w-auto" />
        </a>
        <button
          type="button"
          onClick={() => setMobileSearchSidebarOpen(false)}
          className="-m-2.5 rounded-md p-2.5 text-gray-700"
        >
          <span className="sr-only">Close menu</span>
          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
        </button>
      </div>
      <div className="mt-6 flow-root">mobile side search bar</div>
    </div>
  );
};

export default MobileSearchSidebar;
