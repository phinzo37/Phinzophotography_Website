import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  }
];

const Admin = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    album: '',
  });
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin-login');
        return;
      }

      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      setPhotos(mockPhotos);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin-login');
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(null);
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a mock photo entry
      const newPhoto: Photo = {
        _id: Date.now().toString(),
        title: formData.title,
        description: formData.description || '',
        url: URL.createObjectURL(selectedFile), // Use local blob URL for preview
        album: formData.album || ''
      };

      // Add to photos list
      setPhotos(prev => [newPhoto, ...prev]);
      
      // Reset form
      setFormData({ title: '', description: '', album: '' });
      setSelectedFile(null);
      setUploadSuccess('Photo uploaded successfully! (Mock upload)');
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Error uploading photo:', error);
      setUploadError('Error uploading photo. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin-login');
      return;
    }

    try {
      // Simulate delete delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Remove from photos list
      setPhotos(prev => prev.filter(photo => photo._id !== id));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

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
      className="min-h-screen pt-24 bg-[#f8f8f8]"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-16">
          <h1 className="text-4xl font-light tracking-tight text-gray-900">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-white text-gray-900 py-2 px-6 rounded hover:bg-gray-50 transition-colors border border-gray-200"
          >
            Logout
          </button>
        </div>

        {/* Development Notice */}
        <div className="mb-8 bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-lg">
          <strong>Development Mode:</strong> This is a mock admin panel. Uploads and deletions are simulated and won't persist.
        </div>

        {/* Upload Form */}
        <div className="mb-16 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-light mb-8 text-gray-900 tracking-tight">Upload New Photo</h2>
          {uploadError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded">
              {uploadError}
            </div>
          )}
          {uploadSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded">
              {uploadSuccess}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 cursor-pointer"
                required
                disabled={uploading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded border border-gray-200 focus:border-gray-900 focus:ring-0 bg-white text-gray-900"
                required
                disabled={uploading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded border border-gray-200 focus:border-gray-900 focus:ring-0 bg-white text-gray-900"
                rows={3}
                disabled={uploading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Album
              </label>
              <input
                type="text"
                name="album"
                value={formData.album}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded border border-gray-200 focus:border-gray-900 focus:ring-0 bg-white text-gray-900"
                disabled={uploading}
              />
            </div>
            <button
              type="submit"
              className={`w-full py-3 px-6 rounded border border-transparent transition-colors ${
                uploading
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Photo'}
            </button>
          </form>
        </div>

        {/* Photo Grid */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-light mb-8 text-gray-900 tracking-tight">Manage Photos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((photo) => (
              <motion.div
                key={photo._id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="group relative bg-white rounded overflow-hidden border border-gray-100"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(photo._id)}
                    className="bg-white text-gray-900 py-2 px-6 rounded hover:bg-gray-50 transition-colors border border-transparent"
                  >
                    Delete
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">{photo.title}</h3>
                  {photo.description && (
                    <p className="text-sm text-gray-600 mt-1">{photo.description}</p>
                  )}
                  {photo.album && (
                    <p className="text-sm text-gray-500 mt-1">Album: {photo.album}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Admin; 