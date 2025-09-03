import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./Test.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}