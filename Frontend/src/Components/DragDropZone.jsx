import React from "react";

const DragDropZone = ({ onImageSelect }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (
      file &&
      (file.type.startsWith("image/") || file.type === "application/pdf")
    ) {
      onImageSelect(file);
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition duration-300"
    >
      <p className="text-lg font-medium mb-2">
        Provide Input Data (Drag & Drop)
      </p>
      <p className="text-sm text-gray-400">
        Supported formats:  PDF
      </p>
    </div>
  );
};

export default DragDropZone;