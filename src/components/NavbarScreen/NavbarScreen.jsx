import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";
import "./NavbarScreen.css";
import {
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
  ListItemIcon,
  Button,
} from "@mui/material";
import {
  Logout,
  Menu as MenuIcon,
  Home,
  Info,
  ContactPage,
  Assessment,
} from "@mui/icons-material";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext); // consume context
  // const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isResultsScreen = location.pathname === "/results";

  // helper to highlight active tab
  const isActive = (path) =>
    location.pathname === path ? "active-link" : "text-slate-600";

  const handleNavigateToAuthScreen = () => {
    navigate("/auth");
  };

  const handleLogout = () => {
    logout();
    navigate("/auth"); // redirect to login after logout
  };

  const toggleMobile = (open) => () => setMobileOpen(open);

  return (
    <header className="w-full h-16 flex items-center justify-between border-b border-slate-200 bg-white px-4 md:px-8 box-shadow navbar-sticky">
      {/* Logo + Title */}
      <div className="flex flex-nowrap items-center gap-3 text-slate-800">
        <svg className="text-[#137fec] logo" fill="none" viewBox="0 0 48 48">
          <path
            d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
            fill="currentColor"
          />
        </svg>
        <h2 className="navbar-title text-style text-slate-900 text-xl font-bold">
          SkillMatch AI
        </h2>
      </div>

      {/* Desktop Menu */}
      <nav className="desktop-nav items-center gap-6 menu-style">
        <Link
          className={`${isActive(
            "/"
          )} hover:text-[#137fec] text-sm font-medium leading-normal`}
          to="/"
        >
          Home
        </Link>

        {isResultsScreen && (
          <Link
            className={`${isActive(
              "/results"
            )} hover:text-[#137fec] text-sm font-medium leading-normal`}
            to="/results"
          >
            Resume Analysis
          </Link>
        )}

        <Link
          className={`${isActive(
            "/about"
          )} hover:text-[#137fec] text-sm font-medium leading-normal`}
          to="/about"
        >
          About
        </Link>
        <Link
          className={`${isActive(
            "/contact"
          )} hover:text-[#137fec] text-sm font-medium leading-normal`}
          to="/contact"
        >
          Contact
        </Link>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-4 logout-style">
        {/* Mobile hamburger */}
        <IconButton
          className="mobile-nav-trigger"
          aria-label="menu"
          onClick={toggleMobile(true)}
        >
          <MenuIcon />
        </IconButton>
        {!auth.token ? (
          <button
            className="button-21 desktop-only"
            onClick={handleNavigateToAuthScreen}
          >
            Get Started
          </button>
        ) : (
          <>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0MTHR08RYrY5Ef2VcfyZ-Hn3DnI2miNmU3ObJ_02hP4oM3lXis6W5OhuES_FgCIEHRYdva182pHywKxrQy_oISXr3m6Zpcky7BIMPwsJXY7Tj2PhMsBv9K6EwhpUXMh6W_HHu6V5JZgv7yoPY5nBQwcCwOgrlKpyNHfCFbWZy3VweebiwkKP11xr73PqbkW8I8-5PnEgczLhjdmr0nJkTX7P9mXHk4Z6zS9pEfhPmHFZLX7igdGR6Loqg2jl93GcObpMHrHF-MsUu"
              alt="User"
              className="profile-avatar desktop-only"
            />
            <IconButton
              aria-label="Logout"
              onClick={handleLogout}
              className="logout-btn desktop-only"
            >
              <Logout />
            </IconButton>
          </>
        )}
      </div>

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
            {isResultsScreen && (
              <ListItemButton onClick={() => navigate("/results")}>
                <ListItemIcon>
                  <Assessment />
                </ListItemIcon>
                <ListItemText primary="Resume Analysis" />
              </ListItemButton>
            )}
            <ListItemButton onClick={() => navigate("/about")}>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/contact")}>
              <ListItemIcon>
                <ContactPage />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItemButton>
          </List>
          <Divider />
          <Box sx={{ p: 2 }}>
            {!auth.token ? (
              <Button
                fullWidth
                variant="contained"
                onClick={handleNavigateToAuthScreen}
              >
                Get Started
              </Button>
            ) : (
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Logout />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </Box>
        </Box>
      </Drawer>
    </header>
  );
}
