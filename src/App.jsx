import React, { useState } from "react";
import "./App.css";
import UploadSection from "./components/UploadSection/UploadSection";
import ResultsScreen from "./components/ResultScreen/ResultsScreen";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingSpinner from "./components/LoadingScreen/LoadingSpinner";
import AuthScreen from "./components/AuthScreen/AuthScreen";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <div className="app-container">
        {loading ? (
          <LoadingSpinner text="Analyzing Resume, please wait..." />
        ) : (
          <main className="app-content-wrapper">
            <Routes>
              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <UploadSection setLoading={setLoading} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/results"
                element={
                  <ProtectedRoute>
                    <ResultsScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/auth"
                element={<AuthScreen setLoading={setLoading} />}
              />
              <Route path="/" element={<LandingPage />} />
            </Routes>
          </main>
        )}
      </div>
    </Router>
  );
}

export default App;
