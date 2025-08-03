import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loadSiteSections } from '../services/siteService';
import { SiteSection } from '../models/SiteSection';

const Home = () => {
  const [sections, setSections] = useState<Record<string, SiteSection>>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    // Load site sections and convert to a map for easy lookup
    const siteData = loadSiteSections();
    const sectionsMap: Record<string, SiteSection> = {};
    
    siteData.forEach(section => {
      sectionsMap[section.id] = section;
    });
    
    setSections(sectionsMap);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-black pt-32"
    >
      {/* Hero Section */}
      <div className="container mx-auto px-8 ml-24">
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-5xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <p className="text-xl md:text-2xl font-light tracking-[0.15em] text-gray-700 dark:text-gray-300 relative inline-block">
                <span className="relative z-10 px-2">WELCOME TO MY SITE</span>
                <span className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent bottom-0 left-0"></span>
              </p>
            </motion.div>
            <h1 className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-extralight tracking-[0.2em] text-gray-900 dark:text-white mb-6 leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="inline-block"
              >
                PHINZO PHOTOGRAPHY{' '}
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-gray-500 dark:text-gray-500 inline-block"
              >
                BASED IN THE DMV
              </motion.span>
            </h1>

          </motion.div>
        </div>

        {/* Recent Work Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="pt-8 pb-32"
        >
          <h2 className="text-4xl font-extralight tracking-[0.2em] text-gray-900 dark:text-white mb-24 text-center uppercase">
            Recent Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {/* Featured Image 1 */}
            <div className="group relative overflow-hidden">
              <img
                src={(sections.featured1?.currentPhotoUrl?.startsWith('http') ? sections.featured1.currentPhotoUrl : `http://147.93.181.97:3001${sections.featured1?.currentPhotoUrl}`) || "/images/featured-1.jpg"}
                alt="Featured Work 1"
                className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <h3 className="text-xl font-light mb-2">Mountain Landscape</h3>
                  <p className="text-sm">Nature Photography</p>
                </div>
              </div>
            </div>

            {/* Featured Image 2 */}
            <div className="group relative overflow-hidden">
              <img
                src={(sections.featured2?.currentPhotoUrl?.startsWith('http') ? sections.featured2.currentPhotoUrl : `http://147.93.181.97:3001${sections.featured2?.currentPhotoUrl}`) || "/images/featured-2.jpg"}
                alt="Featured Work 2"
                className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <h3 className="text-xl font-light mb-2">Urban Portrait</h3>
                  <p className="text-sm">Portrait Photography</p>
                </div>
              </div>
            </div>

            {/* Featured Image 3 */}
            <div className="group relative overflow-hidden">
              <img
                src={(sections.featured3?.currentPhotoUrl?.startsWith('http') ? sections.featured3.currentPhotoUrl : `http://147.93.181.97:3001${sections.featured3?.currentPhotoUrl}`) || "/images/featured-3.jpg"}
                alt="Featured Work 3"
                className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <h3 className="text-xl font-light mb-2">Sunset Scene</h3>
                  <p className="text-sm">Landscape Photography</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Collections Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-8 pb-32 border-t border-gray-100 dark:border-gray-800"
        >
          <h2 className="text-4xl font-extralight tracking-[0.2em] text-gray-900 dark:text-white mb-24 text-center uppercase">
            Collections
          </h2>
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{transform: `translateX(-${currentSlide * 100}%)`}}>
              <div className="w-full flex-shrink-0">
                <img
                  src={(sections['collection-nature']?.currentPhotoUrl?.startsWith('http') ? sections['collection-nature'].currentPhotoUrl : `http://147.93.181.97:3001${sections['collection-nature']?.currentPhotoUrl}`) || "/images/collection-nature.jpg"}
                  alt="Collection Image 1"
                  className="w-full h-[700px] object-cover"
                />
              </div>
              <div className="w-full flex-shrink-0">
                <img
                  src={(sections['collection-portrait']?.currentPhotoUrl?.startsWith('http') ? sections['collection-portrait'].currentPhotoUrl : `http://147.93.181.97:3001${sections['collection-portrait']?.currentPhotoUrl}`) || "/images/collection-portrait.jpg"}
                  alt="Collection Image 2"
                  className="w-full h-[700px] object-cover"
                />
              </div>
              <div className="w-full flex-shrink-0">
                <img
                  src={(sections.featured1?.currentPhotoUrl?.startsWith('http') ? sections.featured1.currentPhotoUrl : `http://147.93.181.97:3001${sections.featured1?.currentPhotoUrl}`) || "/images/featured-1.jpg"}
                  alt="Collection Image 3"
                  className="w-full h-[700px] object-cover"
                />
              </div>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              to="/portfolio"
              className="inline-block text-sm tracking-[0.2em] uppercase text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              View Collection
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home; 