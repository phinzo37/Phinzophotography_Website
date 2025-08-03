import { motion } from 'framer-motion';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('http://147.93.181.97:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errorText = await response.text();
        console.error('Server error:', response.status, errorText);
        setError(`Server error: ${response.status}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setError('Network error. Check if backend is running.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-black pt-40"
    >
      <div className="container mx-auto px-8 ml-40">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-24"
          >
            <h1 className="text-[2.5rem] md:text-[4rem] font-extralight tracking-[0.2em] text-gray-900 dark:text-white mb-6">
              GET IN TOUCH
            </h1>
            <p className="text-lg font-light text-gray-500 dark:text-gray-400 max-w-2xl mx-auto whitespace-nowrap">
              Let's create something beautiful together. Feel free to reach out through any of the following channels.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* Contact Information */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-12"
            >
              <div className="space-y-8">
                <h2 className="text-2xl font-extralight tracking-[0.2em] text-gray-900 dark:text-white uppercase text-center">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <a
                    href="mailto:phinzophotography@gmail.com"
                    className="flex items-center justify-center space-x-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm tracking-[0.1em]">phinzophotography@gmail.com</span>
                  </a>
                  <a
                    href="tel:+14435277259"
                    className="flex items-center justify-center space-x-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm tracking-[0.1em]">(443) 527-7259</span>
                  </a>
                  <div className="flex items-center justify-center space-x-4 text-gray-500 dark:text-gray-400 group">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm tracking-[0.1em]">Baltimore/DMV Area</span>
                  </div>
                  <a
                    href="https://wa.me/+14435277259"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8s8 3.59 8 8c0 4.41-3.59 8-8 8zm-1-6h2v2h-2v-2zm0-8h2v6h-2V6z" />
                    </svg>
                    <span className="text-sm tracking-[0.1em]">WhatsApp Available</span>
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-extralight tracking-[0.2em] text-gray-900 dark:text-white uppercase text-center">
                  Working Hours
                </h3>
                <p className="text-sm tracking-[0.1em] text-gray-500 dark:text-gray-400 text-center">
                  Available Daily<br />
                  8:00 AM - 8:00 PM
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-12"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {success && (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-600 rounded text-center">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded text-center">
                    {error}
                  </div>
                )}
                <div className="space-y-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="YOUR NAME"
                    className="w-full px-4 py-4 bg-gray-50 dark:bg-transparent border-0 border-b border-gray-200 dark:border-gray-800 text-sm tracking-[0.2em] uppercase focus:ring-0 focus:border-gray-400 dark:focus:border-gray-600 transition-colors"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="YOUR EMAIL"
                    className="w-full px-4 py-4 bg-gray-50 dark:bg-transparent border-0 border-b border-gray-200 dark:border-gray-800 text-sm tracking-[0.2em] uppercase focus:ring-0 focus:border-gray-400 dark:focus:border-gray-600 transition-colors"
                    required
                  />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="SUBJECT"
                    className="w-full px-4 py-4 bg-gray-50 dark:bg-transparent border-0 border-b border-gray-200 dark:border-gray-800 text-sm tracking-[0.2em] uppercase focus:ring-0 focus:border-gray-400 dark:focus:border-gray-600 transition-colors"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="YOUR MESSAGE"
                    rows={6}
                    className="w-full px-4 py-4 bg-gray-50 dark:bg-transparent border-0 border-b border-gray-200 dark:border-gray-800 text-sm tracking-[0.2em] uppercase resize-none focus:ring-0 focus:border-gray-400 dark:focus:border-gray-600 transition-colors"
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-8 py-3 text-sm tracking-[0.2em] uppercase transition-colors rounded-sm ${
                      loading 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-gray-100 dark:bg-transparent text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:text-gray-300'
                    }`}
                  >
                    {loading ? 'SENDING...' : 'SEND MESSAGE'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact; 