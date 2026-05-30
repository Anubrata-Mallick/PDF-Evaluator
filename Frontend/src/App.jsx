import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import DetectPage from "./Pages/DetectPage";

const App = () => {
  return (
    <div className="app">
        {/* <Navbar setShowLogin={setShowLogin} /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/detect" element={<DetectPage />} />
        </Routes>
      </div>
  )
}

export default App
