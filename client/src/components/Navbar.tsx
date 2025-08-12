import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24 lg:h-32">
          <Link to="/" className="flex items-center">
            <img
              src="/images/logo.png"
              alt="Phinzo Photography Logo"
              className="h-12 w-auto md:h-16 lg:h-20 xl:h-24 2xl:h-28"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link
              to="/"
              className={`text-sm tracking-[0.2em] uppercase ${
                location.pathname === "/"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              } transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-sm tracking-[0.2em] uppercase ${
                location.pathname === "/about"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              } transition-colors`}
            >
              About Me
            </Link>
            <Link
              to="/services"
              className={`text-sm tracking-[0.2em] uppercase ${
                location.pathname === "/services"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              } transition-colors`}
            >
              Services
            </Link>
            <Link
              to="/portfolio"
              className={`text-sm tracking-[0.2em] uppercase ${
                location.pathname === "/portfolio"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              } transition-colors`}
            >
              Portfolio
            </Link>
            <Link
              to="/contact"
              className={`text-sm tracking-[0.2em] uppercase ${
                location.pathname === "/contact"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              } transition-colors`}
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-400"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden py-6 border-t border-gray-100 dark:border-gray-800"
          >
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm tracking-[0.2em] uppercase ${
                  location.pathname === "/"
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400"
                } transition-colors`}
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm tracking-[0.2em] uppercase ${
                  location.pathname === "/about"
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400"
                } transition-colors`}
              >
                About Me
              </Link>
              <Link
                to="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm tracking-[0.2em] uppercase ${
                  location.pathname === "/services"
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400"
                } transition-colors`}
              >
                Services
              </Link>
              <Link
                to="/portfolio"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm tracking-[0.2em] uppercase ${
                  location.pathname === "/portfolio"
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400"
                } transition-colors`}
              >
                Portfolio
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm tracking-[0.2em] uppercase ${
                  location.pathname === "/contact"
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400"
                } transition-colors`}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
