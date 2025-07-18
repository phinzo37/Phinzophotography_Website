import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') !== 'light';
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Add a subtle flash animation
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = newTheme ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)';
    overlay.style.zIndex = '9999';
    overlay.style.pointerEvents = 'none';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 300ms ease';
    document.body.appendChild(overlay);
    
    // Trigger animation
    setTimeout(() => {
      overlay.style.opacity = '1';
      document.documentElement.classList.toggle('dark', newTheme);
      
      setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => document.body.removeChild(overlay), 300);
      }, 100);
    }, 10);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-50/95 dark:bg-black/95 backdrop-blur-md"
    >
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-24">
          <Link 
            to="/" 
            className="flex items-center"
          >
            <img 
              src="/images/logo.png" 
              alt="Gurung Photography Logo" 
              className="h-24 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-sm tracking-[0.2em] uppercase ${location.pathname === '/' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'} transition-colors`}>Home</Link>
            <Link to="/services" className={`text-sm tracking-[0.2em] uppercase ${location.pathname === '/services' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'} transition-colors`}>Services</Link>
            <Link to="/contact" className={`text-sm tracking-[0.2em] uppercase ${location.pathname === '/contact' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'} transition-colors`}>Contact</Link>
            <Link to="/portfolio" className={`text-sm tracking-[0.2em] uppercase ${location.pathname === '/portfolio' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'} transition-colors`}>Portfolio</Link>
            <Link to="/about" className={`text-sm tracking-[0.2em] uppercase ${location.pathname === '/about' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'} transition-colors`}>About</Link>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 flex items-center space-x-2 text-sm tracking-[0.2em] uppercase text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300" 
              aria-label="Toggle theme"
            >
              <span className="relative inline-block w-10 h-5 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300">
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform duration-300 ${isDark ? 'translate-x-0 bg-gray-500' : 'translate-x-5 bg-yellow-400'}`}></span>
              </span>
              <span>{isDark ? 'Light' : 'Dark'}</span>
            </button>
            <button onClick={toggleMobileMenu} className="md:hidden p-2 text-gray-600 dark:text-gray-400" aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-col space-y-4">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`text-sm tracking-[0.2em] uppercase ${location.pathname === '/' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'} transition-colors`}>Home</Link>
              <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className={`text-sm tracking-[0.2em] uppercase ${location.pathname === '/services' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'} transition-colors`}>Services</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`text-sm tracking-[0.2em] uppercase ${location.pathname === '/contact' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'} transition-colors`}>Contact</Link>
              <Link to="/portfolio" onClick={() => setIsMobileMenuOpen(false)} className={`text-sm tracking-[0.2em] uppercase ${location.pathname === '/portfolio' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'} transition-colors`}>Portfolio</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`text-sm tracking-[0.2em] uppercase ${location.pathname === '/about' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'} transition-colors`}>About</Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar; 