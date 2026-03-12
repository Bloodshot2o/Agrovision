import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock, Phone, MapPin, Leaf, Key } from "lucide-react";
import farmBg from "../components/bg-image/image2.jpg";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
    role: "user",
    adminId: "",
    technicianId: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // ❌ Always reject admin
    if (form.role === "admin") {
      setError("❌ Wrong Admin ID");
      return;
    }

    // ❌ Always reject technician
    if (form.role === "technician") {
      setError("❌ Wrong Technician ID");
      return;
    }

    const payload = {
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      phone: form.phone.trim(),
      location: form.location.trim(),
      role: form.role,
    };

    try {
      await axios.post("https://agrovision-6cl7.onrender.com/api/auth/register", payload);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${farmBg})` }}
    >
      <div className="bg-black/60 min-h-screen w-full flex items-center justify-center px-6">

        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 w-full max-w-md space-y-5 text-white"
        >

          {/* Logo */}
          <div className="text-center">
            <h1 className="text-3xl font-bold flex justify-center items-center gap-2 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
              <Leaf /> AgroVision
            </h1>
            <p className="text-sm text-green-200 mt-2">
              Create your smart farming account
            </p>
          </div>

          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-green-300" size={18} />
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              value={form.username}
              onChange={handleChange}
              className="w-full pl-10 p-3 rounded-lg bg-white/20 border border-white/30"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-green-300" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 p-3 rounded-lg bg-white/20 border border-white/30"
              required
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-green-300" size={18} />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full pl-10 p-3 rounded-lg bg-white/20 border border-white/30"
            />
          </div>

          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-green-300" size={18} />
            <input
              type="text"
              name="location"
              placeholder="Farm Location"
              value={form.location}
              onChange={handleChange}
              className="w-full pl-10 p-3 rounded-lg bg-white/20 border border-white/30"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-green-300" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 p-3 rounded-lg bg-white/20 border border-white/30"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-green-300" size={18} />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 p-3 rounded-lg bg-white/20 border border-white/30"
              required
            />
          </div>

          {/* Role */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white"
          >
            <option value="user">Farmer / User</option>
            <option value="technician">Technician</option>
            <option value="admin">Admin</option>
          </select>

          {/* Technician ID */}
          {form.role === "technician" && (
            <div className="relative">
              <Key className="absolute left-3 top-3 text-green-300" size={18} />
              <input
                type="text"
                name="technicianId"
                placeholder="Technician ID"
                value={form.technicianId}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-lg bg-white/20 border border-white/30"
                required
              />
            </div>
          )}

          {/* Admin ID */}
          {form.role === "admin" && (
            <div className="relative">
              <Key className="absolute left-3 top-3 text-green-300" size={18} />
              <input
                type="text"
                name="adminId"
                placeholder="Admin ID"
                value={form.adminId}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-lg bg-white/20 border border-white/30"
                required
              />
            </div>
          )}

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-yellow-500 py-3 rounded-lg font-semibold hover:scale-105 transition shadow-lg"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-green-100">
            Already have an account?{" "}
            <a href="/login" className="text-yellow-300 hover:underline">
              Login
            </a>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Register;
