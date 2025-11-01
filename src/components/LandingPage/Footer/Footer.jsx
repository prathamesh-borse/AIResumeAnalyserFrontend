import React from "react";
import PropTypes from "prop-types";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";

export function Footer({ hide }) {
  if (hide) return null;

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <svg
            width="50"
            height="50"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
              fill="#137fec"
            />
          </svg>
          <span className="footer-logo-text">SkillMatch AI</span>
        </div>

        <p className="footer-tagline">
          Empowering careers with AI-driven resume analysis and personalized
          insights.
        </p>

        <div className="footer-social">
          <a href="https://x.com/imprathamesh01" aria-label="Twitter">
            <Twitter />
          </a>
          <a
            href="https://www.linkedin.com/in/prathameshborse/"
            aria-label="LinkedIn"
          >
            <Linkedin />
          </a>
          <a href="http://github.com/prathamesh-borse" aria-label="GitHub">
            <Github />
          </a>
          <a href="prathameshborse.official@gmail.com" aria-label="Email">
            <Mail />
          </a>
        </div>

        <div className="footer-tech">
          Built with ❤️ using Spring Boot + React + AI
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} SkillMatch AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  hide: PropTypes.bool,
};
