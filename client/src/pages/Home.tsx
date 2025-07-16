import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white dark:bg-black pt-32"
    >
      {/* Hero Section */}
      <div className="container mx-auto px-8">
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-5xl"
          >
            <h1 className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-extralight tracking-[0.2em] text-gray-900 dark:text-white mb-6 leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="inline-block"
              >
                HELLO, I'M ANIL,{' '}
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-gray-500 dark:text-gray-500 inline-block"
              >
                PHOTOGRAPHER BASED IN DMV
              </motion.span>
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-16">
              <Link
                to="/portfolio"
                className="text-sm tracking-[0.2em] uppercase text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                View Portfolio
              </Link>
              <Link
                to="/collections"
                className="text-sm tracking-[0.2em] uppercase text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                View Collections
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Recent Work Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="py-32"
        >
          <h2 className="text-4xl font-extralight tracking-[0.2em] text-gray-900 dark:text-white mb-24 text-center uppercase">
            Recent Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {/* Featured Image 1 */}
            <div className="group relative overflow-hidden">
              <img
                src="/images/featured-1.jpg"
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
                src="/images/featured-2.jpg"
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
                src="/images/featured-3.jpg"
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
          className="py-32 border-t border-gray-100 dark:border-gray-800"
        >
          <h2 className="text-4xl font-extralight tracking-[0.2em] text-gray-900 dark:text-white mb-24 text-center uppercase">
            Collections
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div className="group">
              <div className="aspect-w-16 aspect-h-9 mb-8 overflow-hidden">
                <img
                  src="/images/collection-nature.jpg"
                  alt="Nature Collection"
                  className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-extralight tracking-[0.2em] text-gray-900 dark:text-white uppercase">
                  Nature Collection
                </h3>
                <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                  A curated collection of landscape and nature photography spanning multiple seasons and locations.
                </p>
                <Link
                  to="/collections/nature"
                  className="inline-block text-sm tracking-[0.2em] uppercase text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  View Collection
                </Link>
              </div>
            </div>
            <div className="group">
              <div className="aspect-w-16 aspect-h-9 mb-8 overflow-hidden">
                <img
                  src="/images/collection-portrait.jpg"
                  alt="Portrait Collection"
                  className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-extralight tracking-[0.2em] text-gray-900 dark:text-white uppercase">
                  Portrait Collection
                </h3>
                <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                  An intimate exploration of human expressions and stories through portraiture.
                </p>
                <Link
                  to="/collections/portrait"
                  className="inline-block text-sm tracking-[0.2em] uppercase text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  View Collection
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home; 