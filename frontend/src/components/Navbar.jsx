import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, X, Leaf } from "lucide-react";
import { getToken, removeToken } from "../utils/auth";
import farmBg from "../components/bg-image/image5.jpeg";

export default function Navbar() {
  const navigate = useNavigate();
  const token = getToken();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 
      w-[95%] max-w-6xl px-6 py-3 rounded-full backdrop-blur-xl border
      ${
        isScrolled
          ? "bg-white/40 shadow-lg border-white/30"
          : "bg-white/20 border-transparent"
      }
      transition-all duration-300 flex justify-between items-center`}
    >
      {/* Clickable Logo + Brand */}
      <Link to="/" className="flex items-center gap-3 cursor-pointer">
        <img
          src={farmBg}
          alt="logo"
          className="h-10 w-10 rounded-full border border-white shadow-md object-cover"
        />

        <h1 className="text-xl md:text-2xl font-bold tracking-wide bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent flex items-center gap-1">
          <Leaf size={20} />
          AgroVision
        </h1>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-base font-medium">

        <Link
          to="/about"
          className="relative group transition"
        >
          About
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-500 transition-all group-hover:w-full"></span>
        </Link>

        {!token ? (
          <Link
            to="/login"
            className="px-4 py-1.5 rounded-full border border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        )}
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-4 bg-white/90 backdrop-blur-lg text-black rounded-xl shadow-xl p-5 w-56 flex flex-col gap-4">

          <Link to="/about" onClick={toggleMobileMenu} className="hover:text-green-600">
            About
          </Link>

          {!token ? (
            <Link
              to="/login"
              onClick={toggleMobileMenu}
              className="hover:text-green-600"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                toggleMobileMenu();
              }}
              className="flex items-center gap-2 text-red-500"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}