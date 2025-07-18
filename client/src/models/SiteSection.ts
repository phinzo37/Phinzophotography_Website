export interface SiteSection {
  id: string;
  name: string;
  description: string;
  currentPhotoUrl: string;
  path: string; // Path to the section in the site
}

export const defaultSections: SiteSection[] = [
  {
    id: 'couples',
    name: 'Couples & Engagements',
    description: 'Photo for the Couples & Engagements service',
    currentPhotoUrl: '/images/service-couples.jpg',
    path: '/services'
  },
  {
    id: 'weddings',
    name: 'Weddings & Elopements',
    description: 'Photo for the Weddings & Elopements service',
    currentPhotoUrl: '/images/service-weddings.jpg',
    path: '/services'
  },
  {
    id: 'maternity',
    name: 'Maternity & Baby Showers',
    description: 'Photo for the Maternity & Baby Showers service',
    currentPhotoUrl: '/images/service-maternity.jpg',
    path: '/services'
  },
  {
    id: 'events',
    name: 'Birthday Parties & Special Events',
    description: 'Photo for the Birthday Parties & Special Events service',
    currentPhotoUrl: '/images/service-events.jpg',
    path: '/services'
  },
  {
    id: 'graduations',
    name: 'Graduations',
    description: 'Photo for the Graduations service',
    currentPhotoUrl: '/images/service-graduations.jpg',
    path: '/services'
  },
  {
    id: 'family',
    name: 'Family & Group Portraits',
    description: 'Photo for the Family & Group Portraits service',
    currentPhotoUrl: '/images/service-family.jpg',
    path: '/services'
  },
  {
    id: 'featured1',
    name: 'Featured Work 1',
    description: 'First featured work on homepage',
    currentPhotoUrl: '/images/featured-1.jpg',
    path: '/'
  },
  {
    id: 'featured2',
    name: 'Featured Work 2',
    description: 'Second featured work on homepage',
    currentPhotoUrl: '/images/featured-2.jpg',
    path: '/'
  },
  {
    id: 'featured3',
    name: 'Featured Work 3',
    description: 'Third featured work on homepage',
    currentPhotoUrl: '/images/featured-3.jpg',
    path: '/'
  },
  {
    id: 'collection-nature',
    name: 'Nature Collection',
    description: 'Nature collection image on homepage',
    currentPhotoUrl: '/images/collection-nature.jpg',
    path: '/'
  },
  {
    id: 'collection-portrait',
    name: 'Portrait Collection',
    description: 'Portrait collection image on homepage',
    currentPhotoUrl: '/images/collection-portrait.jpg',
    path: '/'
  }
];