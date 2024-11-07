import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../redux/slices/userSlice";
import axios from "axios";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginPanelOpen, setLoginPanelOpen] = useState(false);
  const [signupForm, setSignupForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    countryCode: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signin",
        formData
      );

      dispatch(setUser(res.data));

      if (res) {
        setLoginPanelOpen(false);
      }

      setFormData({
        name: "",
        email: "",
        password: "",
        countryCode: "",
        phoneNumber: "",
      });
    } catch (e) {
      setFormData({
        name: "",
        email: "",
        password: "",
        countryCode: "",
        phoneNumber: "",
      });
      console.log(e);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(clearUser());
    navigate("/");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData
      );

      if (res.status == 200) {
        console.log(res.data.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          countryCode: "",
          phoneNumber: "",
        });
        setSignupForm(false);
      }
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const panelRef = useRef(null);

  // Effect to detect clicks outside of the login panel
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the panelRef element
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setLoginPanelOpen(false); // Close login panel
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setLoginPanelOpen]);

  const [mobileSearchSidebarOpen, setMobileSearchSidebarOpen] = useState(false);

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
                    src="./profile.png"
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

      <div
        ref={panelRef}
        className={`fixed inset-y-0 right-0 z-20 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10 
      transform transition-transform duration-300 ease-in-out ${
        loginPanelOpen ? "translate-x-0" : "translate-x-full"
      }`}
      >
        <div className="flex items-center justify-between">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="" src="./logo-black.png" className="h-8 w-auto" />
          </a>
          <button
            type="button"
            onClick={() => setLoginPanelOpen(false)}
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className=" mt-16 px-5 flex gap-10 overflow-hidden">
          {/* -----------LOGIN FORM------------- */}
          <form
            onSubmit={(e) => handleLogin(e)}
            className={`space-y-4 transform transition-transform duration-300 ease-in-out min-w-72 py-12  ${
              signupForm ? "-translate-x-[116%]" : "translate-x-2"
            }`}
          >
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="login_email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="login_password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="w-full mt-5 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log In
              </button>
            </div>

            {/* Links for Forgot Password and Sign Up */}
            <div className="text-sm text-center space-y-2">
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
              <p className="mt-2">
                Don't have an account?{" "}
                <a
                  onClick={() => setSignupForm(true)}
                  href="#"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Sign up
                </a>
              </p>
            </div>
          </form>

          {/* ----------SIGN UP FORM --------------- */}

          <form
            onSubmit={(e) => handleSignup(e)}
            className={`space-y-4 transform transition-transform duration-300 ease-in-out min-w-72   ${
              signupForm ? "-translate-x-[111%]" : "translate-x-10"
            }`}
          >
            {/* Name Input  */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Contact No.
              </label>
              <div className="flex items-center mt-1">
                {/* Country Code Selector */}
                <select
                  id="country-code"
                  name="countryCode"
                  onChange={handleChange}
                  value={formData.countryCode}
                  className="mr-2 flex-1 px-1 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="+1">+1 (USA)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+91">+91 (IN)</option>
                  <option value="+61">+61 (AU)</option>
                  {/* Add more country codes as needed */}
                </select>

                {/* Contact Number Input */}
                <input
                  type="number"
                  id="phone"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="block flex-auto w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="w-full mt-5 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>

            {/* Links for Forgot Password and Sign Up */}
            <div className="text-sm text-center space-y-2">
              <p className="mt-2">
                Have an account?{" "}
                <a
                  onClick={() => setSignupForm(false)}
                  href="#"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Log In
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* ---------Mobile Sidemenu--------- */}
      <div
        className={`fixed inset-y-0 right-0 z-20 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10 
      transform transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
      >
        <div className="flex items-center justify-between">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt="logo-black"
              src="/logo-black.png"
              className="h-8 w-auto"
            />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <Disclosure as="div" className="-mx-3">
                <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                  Product
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                  />
                </DisclosureButton>
                <DisclosurePanel className="mt-2 space-y-2">
                  {[...products, ...callsToAction].map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </DisclosurePanel>
              </Disclosure>
              <a
                href="#"
                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >
                Features
              </a>
              <a
                href="#"
                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >
                Marketplace
              </a>
              <a
                href="#"
                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >
                Company
              </a>
            </div>
            <div className="py-6">
              <a
                href="#"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ------------Mobile Search Sidebar--------- */}
      <div
        className={`fixed inset-y-0 right-0 z-20 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10 
      transform transition-transform duration-300 ease-in-out ${
        mobileSearchSidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
      >
        <div className="flex items-center justify-between">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt="logo-black"
              src="/logo-black.png"
              className="h-8 w-auto"
            />
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
        <div className="mt-6 flow-root">hi</div>
      </div>

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
