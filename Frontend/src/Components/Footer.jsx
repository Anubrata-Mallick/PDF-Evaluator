import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-8">

        {/* Project Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            AI Document Detector
          </h3>
          <p className="text-gray-400 text-sm">
            A deep learning powered system to detect AI-generated content in documents, ensuring transparency and enhance digital authenticity.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Quick Links
          </h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li className="hover:text-white cursor-pointer transition">
              Home
            </li>
            <li className="hover:text-white cursor-pointer transition">
              About
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Detection
            </li>
          </ul>
        </div>

        {/* Credits */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Developed By
          </h3>
          <p className="text-gray-400 text-sm">
            Kartick Shaw <br />
            Final Year Engineering Project
          </p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs py-4 border-t border-gray-800">
        © {new Date().getFullYear()} AI Document Detector. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;