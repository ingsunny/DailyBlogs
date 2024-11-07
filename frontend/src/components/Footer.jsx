import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the email submission logic (API call, etc.)
    alert("Subscribed with email: " + email);
  };

  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="container mx-auto px-6">
        {/* Newsletter Section */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-4">Email Newsletter</h2>
          <p className="text-md mb-4">
            Sign up for our email newsletter to stay up to date.
          </p>
          <form
            onSubmit={handleSubmit}
            className="sm:flex space-y-4 sm:space-y-0 justify-center items-center"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
              className="p-3 w-52 sm:w-64 md:w-96 mr-2 rounded-md border-2 border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-400">
            We will never send any spam emails. Promise.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-10 mb-6">
          <a href="#" className="text-white hover:text-indigo-400">
            About
          </a>
          <a href="#" className="text-white hover:text-indigo-400">
            Code
          </a>
          <a href="#" className="text-white hover:text-indigo-400">
            Contact
          </a>
          <a href="#" className="text-white hover:text-indigo-400">
            Privacy
          </a>
          <a href="#" className="text-white hover:text-indigo-400">
            Setup
          </a>
          <a href="#" className="text-white hover:text-indigo-400">
            Sitemap
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400">
          <p>© 2004 — 2024 Daily Blogs® All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
