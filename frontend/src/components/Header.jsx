import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/slices/userSlice";

import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import MobileSearchSidebar from "./Header_cmp/MobileSearchSidebar";
import MobileSidebarMenu from "./Header_cmp/MobileSidebarMenu";
import AuthSidebar from "./Header_cmp/AuthSidebar";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);

  const [mobileSearchSidebarOpen, setMobileSearchSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginPanelOpen, setLoginPanelOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <header className=" bg-indigo-600">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
      >
        <div className="flex lg:flex-1 ">
          <Link to="/" className="-m-1.5 p-1.5 ">
            <img alt="logo" src="./logo.png" className="h-10 w-auto" />
          </Link>
        </div>
        <div className="flex gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileSearchSidebarOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <span className="sr-only">Open mobile search sidebar</span>
            <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a href="#" className="text-[0.895rem] font-semibold text-white">
            Products
          </a>
          <a href="#" className="text-[0.895rem] font-semibold text-white">
            Features
          </a>
          <a href="#" className="text-[0.895rem] font-semibold text-white">
            Marketplace
          </a>
          <a href="#" className="text-[0.895rem] font-semibold text-white">
            Company
          </a>
        </PopoverGroup>

        {isAuthenticated ? (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Popover className="relative">
              <PopoverButton className="flex items-center outline-none gap-x-1 text-sm/6 font-semibold text-white">
                <div className="overflow-hidden rounded-full">
                  <img
                    className="w-7 h-7 object-cover scale-125"
                    src={user.profilePicture}
                    alt="profile"
                  />
                </div>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="h-5 w-5 flex-none text-gray-400"
                />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute -right-8 top-full z-10 mt-3 w-screen max-w-[14rem] overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="p-4 flex flex-col gap-3">
                  <ul className="flex flex-col gap-1">
                    <li className="text-sm cursor-default text-gray-700 font-semibold">
                      {user.name}
                    </li>
                    <li className="text-sm cursor-default text-gray-600">
                      {user.email}
                    </li>
                  </ul>
                  <hr />
                  <ul className="flex flex-col gap-2">
                    <Link to="/author/create_post">
                      <li className="text-sm hover:text-[#4338ca] cursor-pointer text-gray-800 font-semibold">
                        Dashboard
                      </li>
                    </Link>
                    <li
                      onClick={handleLogout}
                      className="text-sm hover:text-[#4338ca] cursor-pointer text-gray-800 font-semibold"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </PopoverPanel>
            </Popover>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <div
              onClick={() => setLoginPanelOpen(true)}
              className="text-[0.895rem]  font-semibold text-white cursor-pointer"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </div>
          </div>
        )}
      </nav>

      {/* -----------loginSide Panel--------- */}

      <AuthSidebar
        loginPanelOpen={loginPanelOpen}
        setLoginPanelOpen={setLoginPanelOpen}
      />

      {/* ---------Mobile Sidemenu--------- */}
      <MobileSidebarMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* ------------Mobile Search Sidebar--------- */}
      <MobileSearchSidebar
        mobileSearchSidebarOpen={mobileSearchSidebarOpen}
        setMobileSearchSidebarOpen={setMobileSearchSidebarOpen}
      />
      {/* </div> */}
    </header>
  );
};

export default Header;

{
  /* <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                      />
                    </div>
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className="block font-semibold text-gray-900"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    <item.icon
                      aria-hidden="true"
                      className="h-5 w-5 flex-none text-gray-400"
                    />
                    {item.name}
                  </a>
                ))}
              </div> */
}
