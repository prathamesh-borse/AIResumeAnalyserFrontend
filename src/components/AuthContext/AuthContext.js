import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    // Synchronous initialization from localStorage avoids initial null state
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    return { token: token || null, email: email || null };
  });

  // const [user, setUser] = useState(() => {
  //   const savedUser = localStorage.getItem("username");
  //   return savedUser ? { username: savedUser } : null;
  // });

  const login = (token, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setAuth({ token, email });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setAuth({ token: null, email: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
