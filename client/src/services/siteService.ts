import { SiteSection, defaultSections } from '../models/SiteSection';

// Load site sections from localStorage or use defaults
export const loadSiteSections = (): SiteSection[] => {
  try {
    const savedSections = localStorage.getItem('siteSections');
    if (savedSections) {
      return JSON.parse(savedSections);
    }
  } catch (error) {
    console.error('Error loading site sections:', error);
  }
  return defaultSections;
};

// Save site sections to localStorage
export const saveSiteSections = (sections: SiteSection[]): void => {
  try {
    localStorage.setItem('siteSections', JSON.stringify(sections));
  } catch (error) {
    console.error('Error saving site sections:', error);
  }
};

// Get a specific section by ID
export const getSectionById = (id: string): SiteSection | undefined => {
  const sections = loadSiteSections();
  return sections.find(section => section.id === id);
};

// Update a section's photo URL
export const updateSectionPhoto = (id: string, photoUrl: string): boolean => {
  try {
    const sections = loadSiteSections();
    const updatedSections = sections.map(section => 
      section.id === id ? { ...section, currentPhotoUrl: photoUrl } : section
    );
    saveSiteSections(updatedSections);
    return true;
  } catch (error) {
    console.error('Error updating section photo:', error);
    return false;
  }
};