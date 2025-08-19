import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);
 

  return (
    <header className="bg-[#2d4669] shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <div className="text-white font-semibold italic text-lg">
          Travel Trip
        </div>

        
        <nav className="flex space-x-8 text-white">
          <Link
            to="/"
            className="hover:underline hover:text-gray-200 transition"
          >
            Home
          </Link>
          <Link
            to="/my-trips"
            className="hover:underline hover:text-gray-200 transition"
          >
            My Trips
          </Link>
        </nav>

        
        {isAuthenticated && (
          <button
            onClick={logout }
            className="bg-white text-[#2d4669] px-4 py-1.5 rounded-md font-medium shadow-sm hover:bg-gray-100"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
