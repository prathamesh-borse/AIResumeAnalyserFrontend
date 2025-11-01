import React from "react";
import PropTypes from "prop-types";
import { LogOut } from "lucide-react";
import { Button } from "../../ui/Button";

export function Navbar({ auth, logout }) {
  const scrollToSection = (sectionId) => (e) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const Logo = () => (
    <div className="nav-logo">
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
      <span className="nav-logo-text">SkillMatch AI</span>
    </div>
  );

  const AuthRight = () => {
    if (auth?.token) {
      const name = auth.user?.name || "User";
      const initials = name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

      return (
        <div className="nav-actions">
          <div className="user-avatar">{initials}</div>
          <button
            onClick={logout}
            className="btn btn-outline"
            style={{ padding: "0.5rem" }}
          >
            <LogOut size={18} />
          </button>
        </div>
      );
    }

    return (
      <div className="nav-actions">
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/auth")}
        >
          Sign In
        </Button>
        <Button
          variant="primary"
          onClick={() => (window.location.href = "/auth")}
        >
          Get Started
        </Button>
      </div>
    );
  };

  return (
    <header className="navbar">
      <Logo />

      <nav className="nav-links">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Home
        </a>
        <a href="#features" onClick={scrollToSection("features")}>
          Features
        </a>
        <a href="#how-it-works" onClick={scrollToSection("how-it-works")}>
          How It Works
        </a>
        <a href="#about" onClick={scrollToSection("about")}>
          About
        </a>
        <a href="#contact" onClick={scrollToSection("contact")}>
          Contact
        </a>
      </nav>

      <AuthRight />
    </header>
  );
}

Navbar.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string,
    user: PropTypes.object,
  }),
  logout: PropTypes.func,
};
