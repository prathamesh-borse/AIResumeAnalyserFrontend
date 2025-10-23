import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
// Fonts
import "@fontsource/inter";
import "@fontsource/noto-sans";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
