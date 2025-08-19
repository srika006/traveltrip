import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("jwt_token") || null;

  const [token, setToken] = useState(storedToken);
  const [isAuthenticated, setIsAuthenticated] = useState(!!storedToken);

  const login = async (username, password) => {
    try {
      const BASE_URL = import.meta.env.VITE_API_BASE || "/api";

      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("jwt_token", data.jwt_token);
        setToken(data.jwt_token);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: data.error_msg || "Login failed" };
      }
    } catch (err) {
      return { success: false, error: "Something went wrong. Try again." };
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt_token");
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
