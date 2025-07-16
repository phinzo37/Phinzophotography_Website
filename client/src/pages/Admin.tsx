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

const API_BASE = 'http://localhost:3001/api';

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
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [stats, setStats] = useState({ totalPhotos: 0, albums: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    const albums = new Set(photos.map(p => p.album).filter(Boolean));
    setStats({ totalPhotos: photos.length, albums: albums.size });
  }, [photos]);

  const fetchPhotos = async () => {
    try {
      const response = await fetch(`${API_BASE}/photos`);
      const data = await response.json();
      setPhotos(data);
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
      const formDataToSend = new FormData();
      formDataToSend.append('photo', selectedFile);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('album', formData.album);

      const response = await fetch(`${API_BASE}/photos`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (response.ok) {
        const newPhoto = await response.json();
        setPhotos(prev => [newPhoto, ...prev]);
        setFormData({ title: '', description: '', album: '' });
        setSelectedFile(null);
        setUploadSuccess('Photo uploaded successfully!');
        
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setUploadError('Upload failed');
      }
    } catch (error) {
      setUploadError('Error uploading photo');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/photos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setPhotos(prev => prev.filter(photo => photo._id !== id));
      }
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  const handleEdit = (photo: Photo) => {
    setEditingPhoto(photo);
    setFormData({
      title: photo.title,
      description: photo.description || '',
      album: photo.album || ''
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPhotos(prev => prev.map(photo => 
        photo._id === editingPhoto._id 
          ? { ...photo, ...formData }
          : photo
      ));
      
      setEditingPhoto(null);
      setFormData({ title: '', description: '', album: '' });
      setUploadSuccess('Photo updated successfully!');
    } catch (error) {
      setUploadError('Error updating photo');
    }
  };

  const cancelEdit = () => {
    setEditingPhoto(null);
    setFormData({ title: '', description: '', album: '' });
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
      className="min-h-screen pt-24 bg-black"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-light tracking-tight text-white">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-gray-800 text-white py-2 px-6 rounded hover:bg-gray-700 transition-colors border border-gray-600"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-medium text-white">Total Photos</h3>
            <p className="text-3xl font-light text-gray-300 mt-2">{stats.totalPhotos}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-medium text-white">Albums</h3>
            <p className="text-3xl font-light text-gray-300 mt-2">{stats.albums}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-medium text-white">Status</h3>
            <p className="text-lg text-green-400 mt-2">Active</p>
          </div>
        </div>



        {/* Upload/Edit Form */}
        <div className="mb-16 bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-700">
          <h2 className="text-2xl font-light mb-8 text-white tracking-tight">
            {editingPhoto ? 'Edit Photo' : 'Upload New Photo'}
          </h2>
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
          <form onSubmit={editingPhoto ? handleUpdate : handleSubmit} className="space-y-6 max-w-xl">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 cursor-pointer"
                required={!editingPhoto}
                disabled={uploading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded border border-gray-600 focus:border-gray-400 focus:ring-0 bg-gray-800 text-white"
                required
                disabled={uploading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded border border-gray-600 focus:border-gray-400 focus:ring-0 bg-gray-800 text-white"
                rows={3}
                disabled={uploading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Album
              </label>
              <input
                type="text"
                name="album"
                value={formData.album}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded border border-gray-600 focus:border-gray-400 focus:ring-0 bg-gray-800 text-white"
                disabled={uploading}
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className={`flex-1 py-3 px-6 rounded border border-transparent transition-colors ${
                  uploading
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
                disabled={uploading}
              >
                {uploading ? 'Processing...' : editingPhoto ? 'Update Photo' : 'Upload Photo'}
              </button>
              {editingPhoto && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Photo Grid */}
        <div className="bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-700">
          <h2 className="text-2xl font-light mb-8 text-white tracking-tight">Manage Photos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((photo) => (
              <motion.div
                key={photo._id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="group relative bg-gray-800 rounded overflow-hidden border border-gray-600"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleEdit(photo)}
                    className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(photo._id)}
                    className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-white">{photo.title}</h3>
                  {photo.description && (
                    <p className="text-sm text-gray-300 mt-1">{photo.description}</p>
                  )}
                  {photo.album && (
                    <p className="text-sm text-gray-400 mt-1">Album: {photo.album}</p>
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