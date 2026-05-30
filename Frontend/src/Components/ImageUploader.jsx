import React from "react";

const ImageUploader = ({ onImageSelect }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div className="text-center">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        className="hidden"
        id="fileUpload"
      />

      <label
        htmlFor="fileUpload"
        className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl cursor-pointer transition"
      >
        Browse Documents
      </label>
    </div>
  );
};

export default ImageUploader;