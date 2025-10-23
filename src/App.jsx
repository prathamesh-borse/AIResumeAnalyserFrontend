import React, { useState } from "react";
import "./App.css";
import UploadSection from "./components/UploadSection/UploadSection";
import ResultsScreen from "./components/ResultScreen/ResultsScreen";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import LoadingSpinner from "./components/LoadingScreen/LoadingSpinner";
import AuthScreen from "./components/AuthScreen/AuthScreen";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

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
                    <UploadSection setLoading={setLoading} fghrtegfer />
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
              <Route path="/" element={<Navigate to="/upload" />} />
            </Routes>
          </main>
        )}
      </div>
      <Footer hide={loading} />
    </Router>
  );
}

export default App;
