import React from "react";
import Navbar from "../Components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About This Project</h1>
          <p className="text-gray-400">
            Detection of AI-Generated Content Using Deep Learning
          </p>
        </div>

        {/* Project Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">📌 Project Overview</h2>
          <p className="text-gray-400 leading-relaxed">
            This project focuses on the detection of AI-generated content
            using advanced deep learning techniques. With the rapid growth
            of generative models, distinguishing between synthetic and
            authentic digital content has become increasingly challenging.
            The proposed system utilizes a trained neural network to analyze
            patterns and features within input data and generate a
            probability-based classification indicating whether the content
            is AI-generated or genuine.
          </p>
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">⚙️ Methodology</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="font-semibold mb-2">1️⃣ Data Input</h3>
              <p className="text-gray-400 text-sm">
                The user provides digital content (e.g., image) as input to the system.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="font-semibold mb-2">2️⃣ Feature Extraction</h3>
              <p className="text-gray-400 text-sm">
                The deep learning model processes the input and extracts
                significant features for classification.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="font-semibold mb-2">3️⃣ Classification Output</h3>
              <p className="text-gray-400 text-sm">
                The system produces a classification result along with
                a confidence score indicating prediction reliability.
              </p>
            </div>
          </div>
        </section>

        {/* Technologies Used */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">🛠 Technologies Used</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="font-semibold mb-3">Frontend</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• React (JavaScript)</li>
                <li>• Tailwind CSS</li>
                <li>• Axios (API communication)</li>
              </ul>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="font-semibold mb-3">Backend & AI</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Python (Flask / FastAPI)</li>
                <li>• TensorFlow / PyTorch</li>
                <li>• Convolutional Neural Networks (CNN)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">🚀 Key Contributions</h2>

          <div className="bg-gray-900 p-6 rounded-xl">
            <ul className="text-gray-400 space-y-3">
              <li>✔ Automated detection of AI-generated content</li>
              <li>✔ Real-time analysis using deep learning models</li>
              <li>✔ Probability-based confidence scoring</li>
              <li>✔ Scalable and user-friendly interface</li>
              <li>✔ Support for standard digital content formats</li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;