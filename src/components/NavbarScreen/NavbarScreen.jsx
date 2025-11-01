import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";
import {
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
  ListItemIcon,
  Button as MuiButton,
} from "@mui/material";
import {
  Logout,
  Menu as MenuIcon,
  Home,
  Info,
  ContactPage,
  Assessment,
  Star,
  Build,
  CloudUpload,
} from "@mui/icons-material";
import "../LandingPage/LandingPage.css"; // Import your new CSS

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isResultsScreen = location.pathname === "/results";
  const isLandingPage = location.pathname === "/";

  const handleLogout = () => {
    logout();
    // Slight delay to ensure auth context updates before redirect
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 0);
  };

  const toggleMobile = (open) => () => setMobileOpen(open);

  // Scroll to section on landing page or navigate to landing page then scroll
  const handleNavClick = (path, sectionId) => (e) => {
    e.preventDefault();

    // If it's a section link and we're on landing page
    if (sectionId && isLandingPage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    // If it's a section link but we're NOT on landing page
    if (sectionId && !isLandingPage) {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return;
    }

    // Otherwise, just navigate
    if (path) {
      navigate(path);
    }
  };

  const Logo = () => (
    <div
      className="nav-logo"
      onClick={handleNavClick("/", null)}
      style={{ cursor: "pointer" }}
    >
      <svg
        width="32"
        height="32"
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
        <div className="nav-actions desktop-only">
          <div className="user-avatar">{initials}</div>
          <button
            onClick={handleLogout}
            className="btn btn-outline logout-btn"
            style={{ padding: "0.5rem 0.75rem" }}
          >
            <Logout style={{ width: "18px", height: "18px" }} />
          </button>
        </div>
      );
    }

    return (
      <div className="nav-actions desktop-only">
        <button className="btn btn-outline" onClick={() => navigate("/auth")}>
          Sign In
        </button>
        <button className="btn btn-primary" onClick={() => navigate("/auth")}>
          Get Started
        </button>
      </div>
    );
  };

  return (
    <>
      <header className="navbar">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="nav-links">
          <a href="#home" onClick={handleNavClick("/", null)}>
            Home
          </a>

          {auth?.token && (
            <a href="/upload" onClick={handleNavClick("/upload", null)}>
              Upload Resume
            </a>
          )}

          {isLandingPage && (
            <>
              <a href="#features" onClick={handleNavClick(null, "features")}>
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={handleNavClick(null, "how-it-works")}
              >
                How It Works
              </a>
            </>
          )}

          {isResultsScreen && (
            <a href="/results" onClick={handleNavClick("/results", null)}>
              Resume Analysis
            </a>
          )}

          <a
            href={isLandingPage ? "#about" : "/about"}
            onClick={
              isLandingPage
                ? handleNavClick(null, "about")
                : handleNavClick("/about", null)
            }
          >
            About
          </a>
          <a
            href={isLandingPage ? "#contact" : "/contact"}
            onClick={
              isLandingPage
                ? handleNavClick(null, "contact")
                : handleNavClick("/contact", null)
            }
          >
            Contact
          </a>
        </nav>

        {/* Desktop Auth Actions */}
        <AuthRight />

        {/* Mobile Hamburger */}
        <IconButton
          className="mobile-nav-trigger"
          aria-label="menu"
          onClick={toggleMobile(true)}
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </header>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleMobile(false)}>
        <Box
          sx={{ width: 260 }}
          role="presentation"
          onClick={toggleMobile(false)}
          onKeyDown={toggleMobile(false)}
        >
          <List>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>

            {auth?.token && (
              <ListItemButton onClick={() => navigate("/upload")}>
                <ListItemIcon>
                  <CloudUpload />
                </ListItemIcon>
                <ListItemText primary="Upload Resume" />
              </ListItemButton>
            )}

            {isLandingPage && (
              <>
                <ListItemButton
                  onClick={() => {
                    toggleMobile(false)();
                    setTimeout(() => {
                      const element = document.getElementById("features");
                      if (element)
                        element.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                >
                  <ListItemIcon>
                    <Star />
                  </ListItemIcon>
                  <ListItemText primary="Features" />
                </ListItemButton>

                <ListItemButton
                  onClick={() => {
                    toggleMobile(false)();
                    setTimeout(() => {
                      const element = document.getElementById("how-it-works");
                      if (element)
                        element.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                >
                  <ListItemIcon>
                    <Build />
                  </ListItemIcon>
                  <ListItemText primary="How It Works" />
                </ListItemButton>
              </>
            )}

            {isResultsScreen && (
              <ListItemButton onClick={() => navigate("/results")}>
                <ListItemIcon>
                  <Assessment />
                </ListItemIcon>
                <ListItemText primary="Resume Analysis" />
              </ListItemButton>
            )}

            <ListItemButton
              onClick={() => {
                if (isLandingPage) {
                  toggleMobile(false)();
                  setTimeout(() => {
                    const element = document.getElementById("about");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                } else {
                  navigate("/about");
                }
              }}
            >
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItemButton>

            <ListItemButton
              onClick={() => {
                if (isLandingPage) {
                  toggleMobile(false)();
                  setTimeout(() => {
                    const element = document.getElementById("contact");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                } else {
                  navigate("/contact");
                }
              }}
            >
              <ListItemIcon>
                <ContactPage />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItemButton>
          </List>

          <Divider />

          <Box sx={{ p: 2 }}>
            {!auth.token ? (
              <MuiButton
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#1E90FF",
                  "&:hover": { backgroundColor: "#1873CC" },
                }}
                onClick={() => navigate("/auth")}
              >
                Get Started
              </MuiButton>
            ) : (
              <MuiButton
                fullWidth
                variant="outlined"
                startIcon={<Logout />}
                sx={{
                  borderColor: "#1E90FF",
                  color: "#1E90FF",
                  "&:hover": {
                    borderColor: "#1873CC",
                    backgroundColor: "rgba(30, 144, 255, 0.04)",
                  },
                }}
                onClick={handleLogout}
              >
                Logout
              </MuiButton>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
