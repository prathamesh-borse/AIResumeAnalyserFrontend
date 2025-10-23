import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthScreen.css";
import { AuthContext } from "../AuthContext/AuthContext";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";

export default function AuthScreen({ mode = "login" }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Build API base so it works from localhost and LAN (phone)
  const API_BASE =
    process.env.REACT_APP_API_BASE_URL ||
    `${window.location.protocol}//${window.location.hostname}:8081`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const endpoint = isLogin
      ? `${API_BASE}/api/auth/login`
      : `${API_BASE}/api/auth/register`;

    const payload = isLogin
      ? { email, password }
      : { username, email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.errorDescription || "Failed request");
      }

      const data = await response.json();
      login(data.token, data.email);
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      setUsername("");
      setPassword("");
      setEmail("");
      navigate("/upload");
    } catch (err) {
      setError(err.message);
      setShowError(true);
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-main-auth">
      <Container maxWidth="xs">
        <Card className="auth-card box-shadow">
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h5" fontWeight={700} textAlign="center">
                {isLogin ? "Welcome Back" : "Create an Account"}
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                {isLogin
                  ? "Login to analyze your resume and skills."
                  : "Sign up to get personalized role recommendations."}
              </Typography>
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  {!isLogin && (
                    <TextField
                      label="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      fullWidth
                    />
                  )}
                  <TextField
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                  />
                  <TextField
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={submitting}
                  >
                    {submitting ? (isLogin ? "Logging in..." : "Creating account...") : isLogin ? "Login" : "Register"}
                  </Button>
                </Stack>
              </form>
              <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  {isLogin ? "Don’t have an account?" : "Already registered?"}
                </Typography>
                <Button variant="text" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Sign up" : "Login"}
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Container>
      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setShowError(false)} severity="error" variant="filled" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}
