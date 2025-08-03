import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Photo {
  _id: string;
  title: string;
  description?: string;
  url: string;
  album?: string;
}

const API_BASE = "http://147.93.181.97:3001/api";

const Portfolio = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`${API_BASE}/photos`);
        const data = await response.json();
        setPhotos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading photos:", error);
        setError("Failed to load photos");
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  // Get unique albums, including photos without albums
  const albums = Array.from(
    new Set(
      photos.map((photo) => photo.album || "Uncategorized").filter(Boolean)
    )
  );

  // Filter photos based on selected album, show all if no album is selected
  const filteredPhotos = selectedAlbum
    ? selectedAlbum === "Uncategorized"
      ? photos.filter((photo) => !photo.album)
      : photos.filter(
          (photo) => photo.album?.toLowerCase() === selectedAlbum.toLowerCase()
        )
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
      className="min-h-screen bg-gray-50 dark:bg-black pt-48"
    >
      <div className="container mx-auto px-8 ml-72">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-24"
        >
          <h1 className="text-[2.5rem] md:text-[4rem] font-extralight tracking-[0.2em] text-gray-900 dark:text-white mb-6">
            PORTFOLIO
          </h1>
          <p className="text-lg font-light text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my collection of photographs capturing moments, emotions,
            and the beauty of the world around us.
          </p>
        </motion.div>

        {/* Album Filter */}
        {albums.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setSelectedAlbum(null)}
                className={`px-6 py-2 text-sm tracking-[0.1em] uppercase transition-colors ${
                  selectedAlbum === null
                    ? "text-gray-900 dark:text-white border-b border-gray-900 dark:border-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                All Photos
              </button>
              {albums.map((album) => (
                <button
                  key={album}
                  onClick={() => setSelectedAlbum(album)}
                  className={`px-6 py-2 text-sm tracking-[0.1em] uppercase transition-colors ${
                    selectedAlbum === album
                      ? "text-gray-900 dark:text-white border-b border-gray-900 dark:border-white"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              className="space-y-6 group cursor-pointer"
            >
              <div className="overflow-hidden">
                <img
                  src={photo.url.startsWith('http') ? photo.url : `http://147.93.181.97:3001${photo.url}`}
                  alt={photo.title}
                  className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-extralight tracking-[0.2em] text-gray-900 dark:text-white uppercase mb-2">
                  {photo.title}
                </h3>
                {photo.description && (
                  <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                    {photo.description}
                  </p>
                )}
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
            <p className="text-gray-500 dark:text-gray-400 font-light text-lg">
              No photos found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Portfolio;
