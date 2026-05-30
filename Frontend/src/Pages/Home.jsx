// import React from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gray-950 text-white flex flex-col">
//       <Navbar />

//       {/* Hero Section */}
//       <section className="flex-1 flex items-center justify-center px-6 py-20">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

//           {/* Left Content */}
//           <div>
//             <h1 className="text-5xl font-bold leading-tight mb-6">
//               Detect AI Generated Contents <br />
//               <span className="text-blue-500">With Confidence</span>
//             </h1>

//             <p className="text-gray-400 mb-8 text-lg">
//               Upload an image and our deep learning model will analyze it
//               to determine whether it is AI-generated or real — instantly.
//             </p>

//             <div className="flex space-x-4">
//               <Link
//                 to="/detect"
//                 className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition duration-300"
//               >
//                 Start Detection
//               </Link>

//               <Link
//                 to="/about"
//                 className="border border-gray-600 hover:border-white px-6 py-3 rounded-xl transition duration-300"
//               >
//                 Learn More
//               </Link>
//             </div>
//           </div>

//           {/* Right Side Card */}
//           <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800">
//             <h3 className="text-xl font-semibold mb-4 text-center">
//               Why This Matters?
//             </h3>

//             <ul className="text-gray-400 space-y-4 text-sm">
//               <li>✔ Rising AI-generated misinformation</li>
//               <li>✔ Fake profile image detection</li>
//               <li>✔ Deepfake awareness</li>
//               <li>✔ Digital content authenticity</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="bg-gray-900 py-16 px-6">
//         <div className="max-w-6xl mx-auto text-center mb-12">
//           <h2 className="text-3xl font-bold mb-4">
//             Powerful AI Detection System
//           </h2>
//           <p className="text-gray-400">
//             Built using modern deep learning architecture
//           </p>
//         </div>

//         <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
//           <div className="bg-gray-950 p-6 rounded-xl border border-gray-800">
//             <h3 className="font-semibold mb-3">⚡ Fast Processing</h3>
//             <p className="text-gray-400 text-sm">
//               Instant image analysis using optimized backend API.
//             </p>
//           </div>

//           <div className="bg-gray-950 p-6 rounded-xl border border-gray-800">
//             <h3 className="font-semibold mb-3">📊 Confidence Score</h3>
//             <p className="text-gray-400 text-sm">
//               Get probability-based results with clear visualization.
//             </p>
//           </div>

//           <div className="bg-gray-950 p-6 rounded-xl border border-gray-800">
//             <h3 className="font-semibold mb-3">🎯 High Accuracy</h3>
//             <p className="text-gray-400 text-sm">
//               Trained using real and AI-generated image datasets.
//             </p>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Detection of AI-Generated Content <br />
              <span className="text-blue-500">Using Deep Learning Techniques</span>
            </h1>

            <p className="text-gray-400 mb-8 text-lg">
              This project presents a deep learning-based approach to analyze and
              classify digital content as either AI-generated or authentic,
              ensuring reliability and integrity in modern digital ecosystems.
            </p>

            <div className="flex space-x-4">
              <Link
                to="/detect"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition duration-300"
              >
                Run Detection Module
              </Link>

              <Link
                to="/about"
                className="border border-gray-600 hover:border-white px-6 py-3 rounded-xl transition duration-300"
              >
                View Methodology
              </Link>
            </div>
          </div>

          {/* Right Side Card */}
          <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Research Significance
            </h3>

            <ul className="text-gray-400 space-y-4 text-sm">
              <li>✔ Increasing prevalence of AI-generated content</li>
              <li>✔ Challenges in digital content authentication</li>
              <li>✔ Need for deepfake and synthetic media detection</li>
              <li>✔ Ensuring trust in online information systems</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-900 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Proposed Detection Framework
          </h2>
          <p className="text-gray-400">
            Developed using advanced deep learning architectures
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-gray-950 p-6 rounded-xl border border-gray-800">
            <h3 className="font-semibold mb-3">⚡ Efficient Processing</h3>
            <p className="text-gray-400 text-sm">
              Optimized model pipeline for fast and scalable analysis.
            </p>
          </div>

          <div className="bg-gray-950 p-6 rounded-xl border border-gray-800">
            <h3 className="font-semibold mb-3">📊 Probabilistic Output</h3>
            <p className="text-gray-400 text-sm">
              Provides confidence scores for classification decisions.
            </p>
          </div>

          <div className="bg-gray-950 p-6 rounded-xl border border-gray-800">
            <h3 className="font-semibold mb-3">🎯 Model Accuracy</h3>
            <p className="text-gray-400 text-sm">
              Trained on diverse datasets containing real and synthetic content.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;