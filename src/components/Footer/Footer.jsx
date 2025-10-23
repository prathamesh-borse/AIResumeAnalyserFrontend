import React from "react";
import "./Footer.css";
import { useLocation } from "react-router-dom";

export default function Footer({ hide }) {
  const location = useLocation();

  if (
    hide ||
    location.pathname === "/contact" ||
    location.pathname === "/about" ||
    location.pathname === "/auth" ||
    location.pathname === "/results"
  ) {
    return null; // Do not render the footer on the /results page
  }

  return (
    <div className="app-footer-container">
      <footer className="app-footer">
        Built with ❤️ using Spring Boot + React + AI
      </footer>
    </div>
  );
}
