import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const About = () => {
  const [activeImage, setActiveImage] = useState(1);

  const toggleImage = () => {
    setActiveImage(activeImage === 1 ? 2 : 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-black pt-32"
    >
      <div className="container mx-auto px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-24"
          >
            {/* Header */}
            <div className="text-center">
              <h1 className="text-[2.5rem] md:text-[4rem] font-extralight tracking-[0.2em] text-gray-900 dark:text-white mb-6">
                CAPTURING MOMENTS,
                <br />
                <span className="text-gray-500 dark:text-gray-500">TELLING STORIES</span>
              </h1>
            </div>

            {/* Content and Image Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Text Content */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-12"
              >
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-lg font-light text-gray-600 dark:text-gray-400 leading-relaxed">
                    Hey there! I'm Anil Gurung – your friendly neighborhood photographer, 25 years young and totally in love with my camera. I didn't choose photography; it kinda chose me. One day I was snapping random pictures of sunsets, and the next thing I knew, I was hooked. There's something magical about capturing moments that are here one second and gone the next. It's like time travel, but with better filters.
                  </p>
                  
                  <p className="text-lg font-light text-gray-600 dark:text-gray-400 leading-relaxed mt-8">
                    I love photography because it allows me to tell stories without words. Whether it's a spontaneous laugh, the perfect light hitting just the right spot, or that unplanned candid shot, my goal is to capture not just what you look like, but who you are in that moment. I believe a great photo should make you feel something – even if it's just a little "wow" or "that's awesome!"
                  </p>

                  <p className="text-lg font-light text-gray-600 dark:text-gray-400 leading-relaxed mt-8">
                    So, if you want to work with someone who's equal parts professional and part "Can I sneak in a goofy pose?" – you're in the right place. Thanks for checking out my work, and I can't wait to capture something memorable for you!
                  </p>
                </div>

                {/* Contact CTA */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-8"
                >
                  <a
                    href="/contact"
                    className="inline-block text-sm tracking-[0.2em] uppercase text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    Let's Work Together
                  </a>
                </motion.div>
              </motion.div>

              {/* Images Column */}
              <div className="relative aspect-[3/4] cursor-pointer w-96 mx-auto" onClick={toggleImage}>
                <div className="relative w-full h-full">
                  <AnimatePresence mode="wait">
                    {activeImage === 1 && (
                      <motion.div
                        key="image1"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        <img
                          src="/images/grg.jpeg"
                          alt="Anil Gurung - Photographer"
                          className="w-full h-full object-cover shadow-2xl"
                        />
                      </motion.div>
                    )}
                    {activeImage === 2 && (
                      <motion.div
                        key="image2"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        <img
                          src="/images/getty-images-e7jB9IZqznQ-unsplash-683x1024.jpg"
                          alt="Photography in Action"
                          className="w-full h-full object-cover shadow-2xl"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Image Toggle Indicator */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    <button
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        activeImage === 1 
                          ? 'bg-white' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      onClick={() => setActiveImage(1)}
                      aria-label="Show first image"
                    />
                    <button
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        activeImage === 2 
                          ? 'bg-white' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      onClick={() => setActiveImage(2)}
                      aria-label="Show second image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default About; 