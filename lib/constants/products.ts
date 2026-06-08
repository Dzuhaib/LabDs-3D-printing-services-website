export interface Product {
  id: string;
  slug: string;
  price: number;
  image: string;
  category: 'decor' | 'home';
  pixabayQuery?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'planter',
    slug: 'geometric-planter',
    price: 19.99,
    image: '', // Will be filled by Pixabay or fallback
    category: 'decor',
    pixabayQuery: 'minimalist 3d printed planter'
  },
  {
    id: 'organizer',
    slug: 'desk-organizer',
    price: 24.50,
    image: '',
    category: 'home',
    pixabayQuery: 'minimalist 3d printed desk organizer'
  },
  {
    id: 'lamp',
    slug: 'minimalist-lamp',
    price: 45.00,
    image: '',
    category: 'decor',
    pixabayQuery: 'minimalist 3d printed lamp'
  },
  {
    id: 'dragon',
    slug: 'articulated-dragon',
    price: 29.00,
    image: '',
    category: 'decor',
    pixabayQuery: '3d printed articulated dragon'
  },
  {
    id: 'headphones',
    slug: 'headphone-stand',
    price: 32.99,
    image: '',
    category: 'home',
    pixabayQuery: '3d printed headphone stand'
  },
  {
    id: 'container',
    slug: 'kitchen-container',
    price: 15.75,
    image: '',
    category: 'home',
    pixabayQuery: '3d printed kitchen container'
  },
  {
    id: 'nescafe',
    slug: 'nescafe-gold-dispenser',
    price: 24.99,
    image: '/product/nescafe-dispenser.jpeg',
    category: 'home'
  }
];

export const getProductBySlug = (slug: string) => PRODUCTS.find(p => p.slug === slug);
export const getProductById = (id: string) => PRODUCTS.find(p => p.id === id);
