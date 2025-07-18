import { useState, useEffect } from 'react';
import { SiteSection, defaultSections } from '../models/SiteSection';

interface Photo {
  _id: string;
  title: string;
  url: string;
  description?: string;
  album?: string;
}

interface SiteSectionManagerProps {
  photos: Photo[];
}

const SiteSectionManager: React.FC<SiteSectionManagerProps> = ({ photos }) => {
  const [sections, setSections] = useState<SiteSection[]>([]);
  const [selectedSection, setSelectedSection] = useState<SiteSection | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);
  const [filterPath, setFilterPath] = useState<string | null>(null);

  useEffect(() => {
    // Load sections from localStorage or use defaults
    const savedSections = localStorage.getItem('siteSections');
    if (savedSections) {
      setSections(JSON.parse(savedSections));
    } else {
      setSections(defaultSections);
    }
  }, []);

  const handleSectionSelect = (section: SiteSection) => {
    setSelectedSection(section);
    setSelectedPhoto(null);
    setUpdateMessage(null);
  };

  const handlePhotoSelect = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleUpdateSection = () => {
    if (!selectedSection || !selectedPhoto) return;

    const updatedSections = sections.map(section => 
      section.id === selectedSection.id 
        ? { ...section, currentPhotoUrl: selectedPhoto.url }
        : section
    );

    setSections(updatedSections);
    localStorage.setItem('siteSections', JSON.stringify(updatedSections));
    setUpdateMessage(`Updated ${selectedSection.name} with new photo`);
    
    // Reset selection
    setSelectedSection(null);
    setSelectedPhoto(null);
    
    // Show message for 3 seconds
    setTimeout(() => {
      setUpdateMessage(null);
    }, 3000);
  };

  const filteredSections = filterPath 
    ? sections.filter(section => section.path === filterPath)
    : sections;

  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-700 mb-16">
      <h2 className="text-2xl font-light mb-8 text-white tracking-tight">
        Manage Site Photos
      </h2>
      
      {updateMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded">
          {updateMessage}
        </div>
      )}
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Filter by Page
        </label>
        <select 
          className="w-full px-4 py-2 rounded border border-gray-600 focus:border-gray-400 focus:ring-0 bg-gray-800 text-white"
          value={filterPath || ''}
          onChange={(e) => setFilterPath(e.target.value || null)}
        >
          <option value="">All Pages</option>
          <option value="/">Home Page</option>
          <option value="/services">Services Page</option>
          <option value="/about">About Page</option>
          <option value="/contact">Contact Page</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Section List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-medium text-white mb-4">Site Sections</h3>
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {filteredSections.map(section => (
              <div 
                key={section.id}
                className={`p-4 rounded cursor-pointer transition-colors ${
                  selectedSection?.id === section.id 
                    ? 'bg-gray-700 border-l-4 border-blue-500' 
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
                onClick={() => handleSectionSelect(section)}
              >
                <h4 className="font-medium text-white">{section.name}</h4>
                <p className="text-sm text-gray-300 mt-1">{section.description}</p>
                <p className="text-xs text-gray-400 mt-2">Page: {section.path}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Current and New Photo Selection */}
        <div className="lg:col-span-2">
          {selectedSection ? (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-white">
                Update {selectedSection.name}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Photo */}
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Current Photo</h4>
                  <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded overflow-hidden">
                    <img 
                      src={selectedSection.currentPhotoUrl} 
                      alt={selectedSection.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* New Photo Selection */}
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">
                    {selectedPhoto ? 'Selected New Photo' : 'Select New Photo'}
                  </h4>
                  {selectedPhoto ? (
                    <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded overflow-hidden">
                      <img 
                        src={selectedPhoto.url} 
                        alt={selectedPhoto.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded flex items-center justify-center">
                      <p className="text-gray-500">No photo selected</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Update Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleUpdateSection}
                  disabled={!selectedPhoto}
                  className={`py-2 px-6 rounded transition-colors ${
                    selectedPhoto
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Update Section Photo
                </button>
              </div>
              
              {/* Photo Selection Grid */}
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-4">Choose from your photos</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[300px] overflow-y-auto p-2">
                  {photos.map(photo => (
                    <div
                      key={photo._id}
                      onClick={() => handlePhotoSelect(photo)}
                      className={`aspect-w-1 aspect-h-1 rounded overflow-hidden cursor-pointer ${
                        selectedPhoto?._id === photo._id
                          ? 'ring-2 ring-blue-500'
                          : 'hover:opacity-80'
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">Select a section to update its photo</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SiteSectionManager;