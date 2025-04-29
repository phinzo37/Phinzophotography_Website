import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isDark, setIsDark] = useState(true); // Default to dark theme
  const location = useLocation();

  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') !== 'light'; // Default to dark
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-md"
    >
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-24">
          <Link 
            to="/" 
            className="text-2xl font-extralight tracking-[0.2em] text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            GURUNG
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm tracking-[0.2em] uppercase ${
                location.pathname === '/'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              } transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`text-sm tracking-[0.2em] uppercase ${
                location.pathname === '/services'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              } transition-colors`}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className={`text-sm tracking-[0.2em] uppercase ${
                location.pathname === '/contact'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              } transition-colors`}
            >
              Contact
            </Link>
            <Link
              to="/portfolio"
              className={`text-sm tracking-[0.2em] uppercase ${
                location.pathname === '/portfolio'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              } transition-colors`}
            >
              Portfolio
            </Link>
            <Link
              to="/about"
              className={`text-sm tracking-[0.2em] uppercase ${
                location.pathname === '/about'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              } transition-colors`}
            >
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-sm tracking-[0.2em] uppercase text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 