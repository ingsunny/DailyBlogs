import React, { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div
      className={` fixed bg-[#161825] text-white py-3 transition-all delay-100 duration-300 ease-in-out px-4 lg:translate-x-0 w-60 h-screen flex-shrink-0 ${
        isOpen ? "translate-x-0" : "-translate-x-[200%]"
      }`}
    >
      {/* <button
        onClick={toggleSidebar}
        className="lg:hidden absolute  top-0 left-0 p-4"
      >
        {isOpen ? "Close" : "Open"}
      </button> */}

      <div className="flex flex-col justify-between h-full">
        {/* // Logo  */}
        <div>
          <div className="">
            <h1 className="text-[1.6rem]">
              Blogger<span className=" text-orange-500">.</span>
            </h1>
            <p className="text-md text-zinc-500">Tell you own story.</p>
          </div>

          <ul className="uppercase text-xs font-semibold flex flex-col mt-6">
            <li className="border-b py-3 border-zinc-600">Home</li>
            <li className="border-b py-3 border-zinc-600">About</li>
            <li className="border-b py-3 border-zinc-600">Contact</li>
            <li className="border-b py-3 border-zinc-600">Login / Register</li>
          </ul>
        </div>

        <div>
          {/* <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              id="instagram"
              className="w-4"
            >
              <path
                fill="currentColor"
                d="M11 0H5a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zm3.5 11c0 1.93-1.57 3.5-3.5 3.5H5c-1.93 0-3.5-1.57-3.5-3.5V5c0-1.93 1.57-3.5 3.5-3.5h6c1.93 0 3.5 1.57 3.5 3.5v6z"
              ></path>
              <path
                fill="currentColor"
                d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6.5A2.503 2.503 0 0 1 5.5 8c0-1.379 1.122-2.5 2.5-2.5s2.5 1.121 2.5 2.5c0 1.378-1.122 2.5-2.5 2.5z"
              ></path>
              <circle fill="currentColor" cx="12.3" cy="3.7" r=".533"></circle>
            </svg>
          </div> */}
          <p className="text-xs">&copy; 2024 Design By Sunny Patel</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
