import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Photo {
  _id: string;
  title: string;
  description?: string;
  url: string;
  album?: string;
}

const Portfolio = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/photos');
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const albums = Array.from(new Set(photos.map(photo => photo.album).filter((album): album is string => album !== undefined)));

  const filteredPhotos = selectedAlbum
    ? photos.filter(photo => photo.album === selectedAlbum)
    : photos;

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-light mb-12">Portfolio</h1>
        
        {/* Album Filter */}
        {albums.length > 0 && (
          <div className="mb-12">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setSelectedAlbum(null)}
                className={`px-4 py-2 border ${
                  selectedAlbum === null
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-300 text-gray-600 hover:border-gray-900'
                } transition-colors`}
              >
                All
              </button>
              {albums.map((album) => (
                <button
                  key={album}
                  onClick={() => setSelectedAlbum(album)}
                  className={`px-4 py-2 border ${
                    selectedAlbum === album
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-300 text-gray-600 hover:border-gray-900'
                  } transition-colors`}
                >
                  {album}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <motion.div
              key={num}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="group relative overflow-hidden"
            >
              <img
                src={`/images/portfolio-${num}.jpg`}
                alt={`Portfolio Image ${num}`}
                className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <h3 className="text-xl font-light mb-2">Portfolio Image {num}</h3>
                  <p className="text-sm">Photography Collection</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Portfolio; 