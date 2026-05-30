// import React from "react";

// const ResultCard = ({ result }) => {
//   return (
//     <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         Analysis Report
//       </h2>

//       {/* AI Text Percentage */}
//       <div className="mb-5">
//         <p className="text-sm text-gray-400 mb-1 text-center">
//           {result.prediction}
//         </p>
//         <div className="w-full bg-gray-700 rounded-full h-4">
//           <div
//             className="h-4 rounded-full bg-yellow-500"
//             style={{ width: `${result.aiText}%` }}
//           ></div>
//         </div>
//         <p className="text-center mt-2 text-gray-300">
//           Confidence: {result.aiText}%
//         </p>
//       </div>

//       {/* AI Image Percentage */}
//       <div className="mb-5">
//         <p className="text-sm text-gray-400 mb-1 text-center">
//           AI-Generated Images
//         </p>
//         <div className="w-full bg-gray-700 rounded-full h-4">
//           <div
//             className="h-4 rounded-full bg-purple-500"
//             style={{ width: `${result.aiImage}%` }}
//           ></div>
//         </div>
//         <p className="text-center mt-2 text-gray-300">
//           {result.aiImage}%
//         </p>
//       </div>

//       {/* Overall Score */}
//       <div className="mt-6 text-center">
//         <h3 className="text-lg font-semibold mb-2">
//           Overall AI Content Score
//         </h3>

//         <span
//           className={`text-2xl font-bold ${
//             result.overallScore > 50 ? "text-red-500" : "text-green-500"
//           }`}
//         >
//           {result.overallScore}%
//         </span>

//         <p className="text-gray-400 text-sm mt-2">
//           Indicates the proportion of AI-generated content within the input data.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ResultCard;


import React from "react";

const ResultCard = ({ result }) => {
  if (!result) return null;

  const text = result.text;
  const image = result.image;

  // Overall Score Calculation
  // const overallScore = Math.round(
  //   ((text?.percentage || 0) + (image?.percentage || 0)) / 2
  // );
  let overallScore = 0;
  if (text?.percentage && image?.percentage) {
    overallScore = Math.round((text.percentage + image.percentage) / 2);
  } else if (text?.percentage) {
    overallScore = text.percentage;
  } else if (image?.percentage) {
    overallScore = image.percentage;
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Analysis Report
      </h2>

      {/* 📄 TEXT ANALYSIS */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-center mb-3">
          Text Analysis
        </h3>


        <p className="text-center text-sm text-gray-500 mb-2">
          {text.ai_lines} / {text.total_lines} lines detected as AI
        </p>

        <div className="w-full bg-gray-700 rounded-full h-4">
          <div
            className="h-4 rounded-full bg-yellow-500"
            style={{ width: `${text.percentage}%` }}
          ></div>
        </div>

        <p className="text-center mt-2 text-gray-300">
          {text.percentage}%
        </p>
        <p className="text-center text-gray-400 text-sm mb-1">
          Overall Text Content: {text.prediction}
        </p>
      </div>

      {/* 🖼 IMAGE ANALYSIS */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-center mb-3">
          Image Analysis
        </h3>

        <p className="text-center text-sm text-gray-500 mb-2">
          {image.ai_images} / {image.total_images} images detected as AI
        </p>

        <div className="w-full bg-gray-700 rounded-full h-4">
          <div
            className="h-4 rounded-full bg-purple-500"
            style={{ width: `${image.percentage}%` }}
          ></div>
        </div>

        <p className="text-center mt-2 text-gray-300">
          {image.percentage}%
        </p>
        <p className="text-center text-gray-400 text-sm mb-1">
          Overall Image Content: {image.prediction}
        </p>
      </div>

      {/* 📊 OVERALL SCORE */}
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold mb-2">
          Overall AI Content Score
        </h3>

        <span
          className={`text-2xl font-bold ${
            overallScore > 50 ? "text-red-500" : "text-green-500"
          }`}
        >
          {overallScore}%
        </span>

        <p className="text-gray-400 text-sm mt-2">
          Combined estimation of AI-generated content across text and images.
        </p>
      </div>
    </div>
  );
};

export default ResultCard;