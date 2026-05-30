import React from "react";

const Loader = () => {
  return (
    <div className="mt-8 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-3 text-gray-400">Analyzing Document...</p>
    </div>
  );
};

export default Loader;