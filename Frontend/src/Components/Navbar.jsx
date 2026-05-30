import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">
          AI Document Detector
        </h1>

        <div className="space-x-6 text-gray-400">
          <button className="hover:text-white transition duration-200" onClick={() => navigate("/")}>
            Home
          </button>
          <button className="hover:text-white transition duration-200" onClick={() => navigate("/about")}>
            About
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;