import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import BookTrip from "./pages/BookTrip";
import Navbar from "./components/Header"; 
import MyTrips from "./pages/MyTrips";
import "./App.css";
import NotFound from "./pages/NotFound";

function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation(); 

  
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {isAuthenticated && !hideNavbar && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-a-new-trip"
          element={
            <ProtectedRoute>
              <BookTrip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-trips"
          element={
            <ProtectedRoute>
              <MyTrips />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <NotFound />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
