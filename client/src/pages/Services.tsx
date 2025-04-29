import { motion } from 'framer-motion';

const Services = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white dark:bg-black pt-32"
    >
      <div className="container mx-auto px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-24"
          >
            <h1 className="text-[2.5rem] md:text-[4rem] font-extralight tracking-[0.2em] text-gray-900 dark:text-white mb-6">
              SERVICES
            </h1>
            <p className="text-lg font-light text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Capturing life's precious moments with an artistic and timeless approach.
            </p>
          </motion.div>

          {/* Photography Services */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-24"
          >
            <div className="space-y-16">
              <h2 className="text-2xl font-extralight tracking-[0.2em] text-gray-900 dark:text-white uppercase text-center">
                Photography Services
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-6">
                  <div className="aspect-w-16 aspect-h-9 mb-8 overflow-hidden">
                    <img
                      src="/images/service-couples.jpg"
                      alt="Couples & Engagements"
                      className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-extralight tracking-[0.2em] text-gray-900 dark:text-white uppercase">
                    Couples & Engagements
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                    Timeless portraits capturing the genuine connection between you and your partner.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="aspect-w-16 aspect-h-9 mb-8 overflow-hidden">
                    <img
                      src="/images/service-weddings.jpg"
                      alt="Weddings & Elopements"
                      className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-extralight tracking-[0.2em] text-gray-900 dark:text-white uppercase">
                    Weddings & Elopements
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                    Artistic storytelling that preserves every beautiful moment of your special day.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="aspect-w-16 aspect-h-9 mb-8 overflow-hidden">
                    <img
                      src="/images/service-maternity.jpg"
                      alt="Maternity & Baby Showers"
                      className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-extralight tracking-[0.2em] text-gray-900 dark:text-white uppercase">
                    Maternity & Baby Showers
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                    Heartfelt images celebrating new beginnings and growing families.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="aspect-w-16 aspect-h-9 mb-8 overflow-hidden">
                    <img
                      src="/images/service-events.jpg"
                      alt="Birthday Parties & Special Events"
                      className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-extralight tracking-[0.2em] text-gray-900 dark:text-white uppercase">
                    Birthday Parties & Special Events
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                    Vibrant, candid, and posed photos that turn celebrations into lasting memories.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="aspect-w-16 aspect-h-9 mb-8 overflow-hidden">
                    <img
                      src="/images/service-graduations.jpg"
                      alt="Graduations"
                      className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-extralight tracking-[0.2em] text-gray-900 dark:text-white uppercase">
                    Graduations
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                    Professional portraits and event coverage honoring your milestones and achievements.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="aspect-w-16 aspect-h-9 mb-8 overflow-hidden">
                    <img
                      src="/images/service-family.jpg"
                      alt="Family & Group Portraits"
                      className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-extralight tracking-[0.2em] text-gray-900 dark:text-white uppercase">
                    Family & Group Portraits
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                    Natural, joyful photos perfect for holiday cards, home displays, and keepsakes.
                  </p>
                </div>

                <div className="space-y-6 md:col-span-2">
                  <h3 className="text-xl font-extralight tracking-[0.2em] text-gray-900 dark:text-white uppercase">
                    Lifestyle Photography
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                    Authentic, everyday moments captured creatively for social media, announcements, and personal branding.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Services */}
            <div className="space-y-16">
              <h2 className="text-2xl font-extralight tracking-[0.2em] text-gray-900 dark:text-white uppercase text-center">
                Additional Services
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <ul className="space-y-6">
                    <li className="flex items-start space-x-4">
                      <span className="text-gray-400 dark:text-gray-500">✨</span>
                      <span className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                        Professional Photo Editing & Retouching
                      </span>
                    </li>
                    <li className="flex items-start space-x-4">
                      <span className="text-gray-400 dark:text-gray-500">✨</span>
                      <span className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                        Online Private Gallery for Easy Viewing and Downloading
                      </span>
                    </li>
                    <li className="flex items-start space-x-4">
                      <span className="text-gray-400 dark:text-gray-500">✨</span>
                      <span className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                        High-Resolution and Web-Optimized Images
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-8">
                  <ul className="space-y-6">
                    <li className="flex items-start space-x-4">
                      <span className="text-gray-400 dark:text-gray-500">✨</span>
                      <span className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                        Custom Albums and Fine Art Prints
                      </span>
                    </li>
                    <li className="flex items-start space-x-4">
                      <span className="text-gray-400 dark:text-gray-500">✨</span>
                      <span className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                        Flexible Location Options (Studio or Outdoor)
                      </span>
                    </li>
                    <li className="flex items-start space-x-4">
                      <span className="text-gray-400 dark:text-gray-500">✨</span>
                      <span className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                        Fast Turnaround Times
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center pt-8"
            >
              <a
                href="/contact"
                className="inline-block text-sm tracking-[0.2em] uppercase text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                Book Your Session
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Services; 