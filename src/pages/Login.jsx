
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login, isAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(username, password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Invalid credentials!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700 italic">
          Travel Trip
        </h1>

        

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />

          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <div className="relative mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
              required
            />
            {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}
            
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
