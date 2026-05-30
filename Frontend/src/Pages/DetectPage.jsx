import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import DragDropZone from "../Components/DragDropZone";
import ImageUploader from "../Components/ImageUploader";
import ResultCard from "../Components/ResultCard";
import Loader from "../Components/Loader";

const DetectPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [highlightedPreview, setHighlightedPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState(null);
  const [aiImages, setAiImages] = useState([]);

  // Handle image selection
  const handleImageSelect = (file) => {
    if (!file) return;

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleDetect = async () => {
    if (!selectedImage) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedImage); // important key = "file"

      const statsResponse = await fetch("http://127.0.0.1:5000/process", {
        method: "POST",
        body: formData,
      });
      const statsData = await statsResponse.json();

      const predictionResponse = await fetch("http://127.0.0.1:5000/predict", {
        method: "GET",
      });
      const predictionData = await predictionResponse.json();
      const highlightedResponse = await fetch(
        "http://127.0.0.1:5000/highlight-pdf",
        {
          method: "POST",
          body: formData,
        },
      );
      const blob = await highlightedResponse.blob();

      const url = URL.createObjectURL(blob);
      setHighlightedPreview(url);

      const imageResponse = await fetch(
        "http://127.0.0.1:5000/images-predict",
        {
          method: "GET",
        },
      );
      const imageData = await imageResponse.json();
      // console.log("Image Prediction:", imageData);

      // You can map backend response to your UI
      setStats({
        total_text_lines: statsData.text_lines,
        total_images: statsData.images_extracted,
      });
      setResult({
        text: {
          ai_lines: predictionData.ai_lines,
          total_lines: predictionData.total_lines,
          percentage: predictionData.percentage,
          prediction: predictionData.prediction,
        },
        image: {
          ai_images: imageData.ai_images,
          total_images: imageData.total_images,
          percentage: imageData.percentage,
          prediction: imageData.prediction,
        },
      });
      setAiImages(imageData.ai_detected_images || []);
      // console.log("Stats:", statsData);
      // console.log("Prediction:", predictionData);
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Title Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">
            AI-Generated Content Detection Module
          </h1>
          <p className="text-gray-400">
            Provide digital content to evaluate whether it is synthetically
            generated or authentic.
          </p>
        </div>

        {/* Upload Section */}
        <div className="space-y-6">
          <DragDropZone onImageSelect={handleImageSelect} />

          <ImageUploader onImageSelect={handleImageSelect} />
        </div>

        {/* Preview Section */}
        {preview && selectedImage && (
          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Input Preview</h2>
            <iframe
              src={preview}
              title="PDF Preview"
              className="mx-auto w-full h-125 rounded-xl border border-gray-700"
            />
            <div className="mt-6 text-center">
              <button
                onClick={handleDetect}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition duration-300"
              >
                Execute Detection
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && <Loader />}
        {/* Statistics */}
        {stats && !loading && (
          <div className="mt-10 bg-gray-900 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Content Statistics
            </h2>

            <div className="space-y-6">
              {/* Total Text Lines */}
              <div>
                <p className="text-sm text-gray-400 mb-1 text-center">
                  Total Text Lines
                </p>
                <div className="bg-gray-800 p-3 rounded-lg text-center text-lg font-semibold">
                  {stats.total_text_lines}
                </div>
              </div>

              {/* Total Images */}
              <div>
                <p className="text-sm text-gray-400 mb-1 text-center">
                  Total Images
                </p>
                <div className="bg-gray-800 p-3 rounded-lg text-center text-lg font-semibold">
                  {stats.total_images}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Result */}
        {result && !loading && (
          <div className="mt-10">
            <ResultCard result={result} />
          </div>
        )}
        {/* Highlighted Preview Section */}
        {highlightedPreview && (
          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Highlighted Preview</h2>
            <iframe
              src={highlightedPreview}
              title="PDF Preview"
              className="mx-auto w-full h-125 rounded-xl border border-gray-700"
            />
          </div>
        )}
        {/* AI Detected Images Preview */}
        {aiImages.length > 0 && !loading && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-red-400">
              AI Generated Images Detected
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {aiImages.map((img, index) => (
                <div
                  key={index}
                  className="bg-gray-900 p-3 rounded-xl shadow-lg border border-red-500"
                >
                  <img
                    src={"http://127.0.0.1:5000/images/" + img.filename}
                    alt={img.filename}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <p className="text-sm text-center text-gray-300">
                    {img.filename}
                  </p>
                  <p className="text-sm text-center text-red-400 font-semibold">
                    {img.confidence}% AI
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetectPage;
