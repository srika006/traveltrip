import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("jwt_token") || null);

  useEffect(() => {
    if (token) setIsAuthenticated(true);
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await fetch("/api/login", {
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
        return { success: false, error: data.error_msg };
      }
    } catch {
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
