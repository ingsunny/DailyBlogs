import React, { useEffect, useRef, useState } from "react";
import { setUser } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/outline";

const AuthSidebar = ({ loginPanelOpen, setLoginPanelOpen }) => {
  const dispatch = useDispatch();
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:4000/api/auth/signin`,
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

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/signup",
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
      setFormData({
        name: "",
        email: "",
        password: "",
        countryCode: "",
        phoneNumber: "",
      });
    }
  };

  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the panelRef element
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setLoginPanelOpen(false); // Close login panel
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setLoginPanelOpen]);

  return (
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
          <div>
            <label
              htmlFor="login_email"
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

          <div>
            <label
              htmlFor="login_password"
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
            signupForm ? "-translate-x-[111%]" : "translate-x-0"
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
  );
};

export default AuthSidebar;
