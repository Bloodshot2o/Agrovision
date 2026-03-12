import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Mail, Lock, Leaf } from "lucide-react";
import farmBg from "../components/bg-image/image2.jpg";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://agrovision-6cl7.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      login(data);

      const routeMap = {
        admin: "/dashboard/admin",
        technician: "/dashboard/technician",
        user: "/dashboard/user",
      };

      navigate(routeMap[data.role] || "/unauthorized");
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${farmBg})` }}
    >
      <div className="bg-black/60 min-h-screen w-full flex items-center justify-center px-6">

        <form
          onSubmit={handleLogin}
          className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 w-full max-w-md space-y-6 text-white"
        >

          {/* Logo */}
          <div className="text-center">
            <h1 className="text-3xl font-bold flex justify-center items-center gap-2 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
              <Leaf /> AgroVision
            </h1>
            <p className="text-sm text-green-200 mt-2">
              Smart Agriculture Monitoring System
            </p>
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-green-300" size={18} />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 p-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-green-300" size={18} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 p-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button
            className="w-full bg-gradient-to-r from-green-500 to-yellow-500 py-3 rounded-lg font-semibold hover:scale-105 transition shadow-lg"
          >
            Login
          </button>

          {/* Register */}
          <p className="text-center text-sm text-green-100">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-yellow-300 hover:underline"
            >
              Register
            </a>
          </p>

        </form>

      </div>
    </div>
  );
};

export default Login;
