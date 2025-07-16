import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Photo {
  _id: string;
  title: string;
  description?: string;
  url: string;
  album?: string;
}

// Mock data for development without backend
const mockPhotos: Photo[] = [
  {
    _id: '1',
    title: 'Mountain Landscape',
    description: 'Beautiful mountain scenery',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    album: 'Landscapes'
  },
  {
    _id: '2',
    title: 'Portrait Session',
    description: 'Professional portrait photography',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop',
    album: 'Portraits'
  },
  {
    _id: '3',
    title: 'Street Photography',
    description: 'Urban life captured',
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    album: 'Street'
  },
  {
    _id: '4',
    title: 'Nature Close-up',
    description: 'Macro photography of flowers',
    url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop',
    album: 'Nature'
  },
  {
    _id: '5',
    title: 'Architecture',
    description: 'Modern building design',
    url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop',
    album: 'Architecture'
  },
  {
    _id: '6',
    title: 'Abstract Art',
    description: 'Creative abstract composition',
    url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop'
  }
];

const Portfolio = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call with mock data
    const fetchPhotos = async () => {
      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setPhotos(mockPhotos);
        setLoading(false);
      } catch (error) {
        console.error('Error loading photos:', error);
        setError('Failed to load photos');
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  // Get unique albums, including photos without albums
  const albums = Array.from(new Set(photos.map(photo => photo.album || 'Uncategorized').filter(Boolean)));

  // Filter photos based on selected album, show all if no album is selected
  const filteredPhotos = selectedAlbum
    ? selectedAlbum === 'Uncategorized'
      ? photos.filter(photo => !photo.album)
      : photos.filter(photo => photo.album?.toLowerCase() === selectedAlbum.toLowerCase())
    : photos;

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white dark:bg-black pt-24"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-light tracking-tight text-gray-900 dark:text-white mb-4">
            Portfolio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my collection of photographs capturing moments, emotions, and the beauty of the world around us.
          </p>
        </motion.div>

        {/* Album Filter */}
        {albums.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setSelectedAlbum(null)}
                className={`px-6 py-2 rounded-full border transition-colors ${
                  selectedAlbum === null
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 hover:border-gray-900'
                }`}
              >
                All Photos
              </button>
              {albums.map((album) => (
                <button
                  key={album}
                  onClick={() => setSelectedAlbum(album)}
                  className={`px-6 py-2 rounded-full border transition-colors ${
                    selectedAlbum === album
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 hover:border-gray-900'
                  }`}
                >
                  {album}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Photo Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-4">
                    <h3 className="text-xl font-medium mb-2">{photo.title}</h3>
                    {photo.description && (
                      <p className="text-sm">{photo.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredPhotos.length === 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-600 text-lg">No photos found in this category.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Portfolio; 