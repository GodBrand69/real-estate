import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  Home,
  Search,
  Building,
  Users,
  MessageCircle,
} from "lucide-react";
import { cyberpunkTheme } from "../styles/cyberpunk-theme";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
  const dropdownRef = useRef(null);
  const location = useLocation();

  const [user, setUser] = useState({
    name: "Demo User",
    email: "demo@example.com"
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleDemoLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('demoAuth', 'true');
    localStorage.setItem('demoUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    localStorage.removeItem('demoAuth');
    localStorage.removeItem('demoUser');
  };

  useEffect(() => {
    const demoAuth = localStorage.getItem('demoAuth');
    const demoUser = localStorage.getItem('demoUser');
    if (demoAuth && demoUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(demoUser));
    }
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const toggleAdmin = () => {
    const newAdminStatus = !isAdmin;
    setIsAdmin(newAdminStatus);
    localStorage.setItem('isAdmin', newAdminStatus.toString());
    setIsDropdownOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1a1a2e]/95 shadow-[0_0_15px_rgba(0,255,159,0.3)] backdrop-blur-lg"
          : "bg-[#1a1a2e]/80 backdrop-blur-md border-b border-[#2a2a3a]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            
            <span className="text-2xl font-bold bg-gradient-to-r from-[#00ff9f] to-[#00ffff] bg-clip-text text-transparent group-hover:from-[#00ffff] group-hover:to-[#00ff9f] transition-all duration-300">
              Real Estate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks currentPath={location.pathname} />
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-white hover:text-[#00ff9f] transition-colors"
                >
                  Sign in
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-gradient-to-r from-[#00ff9f] to-[#00ffff] text-[#0a0a0f] rounded-lg font-medium hover:shadow-[0_0_15px_rgba(0,255,159,0.5)] transition-all duration-300"
                  >
                    Create account
                  </Link>
                </motion.div>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#2a2a3a] text-white rounded-lg hover:bg-[#3a3a4a] transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-[#00ff9f] to-[#00ffff] rounded-full flex items-center justify-center text-[#0a0a0f] font-bold">
                    {getInitials(user.name)}
                  </div>
                  <span>{user.name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-[#1a1a2e] border border-[#2a2a3a] rounded-lg shadow-lg overflow-hidden"
                    >
                      <div className="py-1">
                        <button
                          onClick={toggleAdmin}
                          className="w-full px-4 py-2 text-left text-white hover:bg-[#2a2a3a] transition-colors duration-200 flex items-center space-x-2"
                        >
                          <Users className="w-4 h-4" />
                          <span>{isAdmin ? 'Remove Admin' : 'Make Admin'}</span>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-white hover:bg-[#2a2a3a] transition-colors duration-200 flex items-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-white hover:bg-[#2a2a3a] transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#1a1a2e] border-t border-[#2a2a3a] overflow-hidden"
          >
            <div className="px-2 pt-3 pb-4">
              <MobileNavLinks
                setMobileMenuOpen={setIsMobileMenuOpen}
                isLoggedIn={isLoggedIn}
                user={user}
                handleLogout={handleLogout}
                currentPath={location.pathname}
                handleDemoLogin={handleDemoLogin}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const NavLinks = ({ currentPath }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Properties", path: "/properties", icon: Search },
  ];

  // Add Property link for admin users
  if (isAdmin) {
    navLinks.push({ name: "Add Property", path: "/add-property", icon: Building });
  }

  return (
    <div className="flex space-x-6 items-center">
      {navLinks.map(({ name, path, icon: Icon }) => {
        const isActive = currentPath === path;

        return (
          <Link
            key={name}
            to={path}
            className={`relative font-medium transition-colors duration-200 flex items-center gap-1.5 px-2 py-1 rounded-md
              ${
                isActive
                  ? "text-[#00ff9f] bg-[#2a2a3a]"
                  : "text-white hover:text-[#00ff9f] hover:bg-[#2a2a3a]/50"
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span>{name}</span>
          </Link>
        );
      })}
    </div>
  );
};

const MobileNavLinks = ({
  setMobileMenuOpen,
  isLoggedIn,
  user,
  handleLogout,
  currentPath,
  handleDemoLogin
}) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  const toggleAdmin = () => {
    const newAdminStatus = !isAdmin;
    localStorage.setItem('isAdmin', newAdminStatus.toString());
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Properties", path: "/properties", icon: Search },
  ];

  // Add Property link for admin users
  if (isAdmin) {
    navLinks.push({ name: "Add Property", path: "/add-property", icon: Building });
  }

  return (
    <div className="space-y-1">
      {navLinks.map(({ name, path, icon: Icon }) => {
        const isActive = currentPath === path;
        return (
          <Link
            key={name}
            to={path}
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
              isActive
                ? "text-[#00ff9f] bg-[#2a2a3a]"
                : "text-white hover:text-[#00ff9f] hover:bg-[#2a2a3a]/50"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{name}</span>
          </Link>
        );
      })}

      {/* Auth Buttons for Mobile */}
      <div className="pt-4 mt-2 border-t border-[#2a2a3a]">
        {isLoggedIn ? (
          <div className="space-y-3 px-3">
            <div className="flex items-center space-x-3 p-2 bg-[#2a2a3a] rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00ff9f] to-[#00ffff] flex items-center justify-center text-[#0a0a0f] font-medium text-sm shadow-[0_0_15px_rgba(0,255,159,0.3)]">
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={toggleAdmin}
              className="w-full flex items-center gap-3 px-4 py-3 text-[#00ff9f] hover:bg-[#2a2a3a] rounded-lg transition-colors"
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">{isAdmin ? 'Remove Admin' : 'Make Admin'}</span>
            </button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-[#ff4d4d] hover:bg-[#2a2a3a] rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign out</span>
            </motion.button>
          </div>
        ) : (
          <div className="flex flex-col space-y-3 px-3">
            <motion.div whileTap={{ scale: 0.97 }}>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center px-4 py-3 border border-[#2a2a3a] text-white rounded-lg hover:bg-[#2a2a3a] transition-all font-medium"
              >
                Sign in
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.97 }}>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#00ff9f] to-[#00ffff] text-[#0a0a0f] rounded-lg hover:shadow-[0_0_15px_rgba(0,255,159,0.5)] transition-all font-medium"
              >
                Create account
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;