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
    id: 'nescafe',
    slug: 'nescafe-gold-dispenser',
    price: 24.99,
    image: '/product/nescafe-dispenser.jpeg',
    category: 'home'
  },
  {
    id: 'calendar',
    slug: 'birthday-calendar',
    price: 39.90,
    image: '/product/birthday-calendar.jpeg',
    category: 'decor'
  },
  {
    id: 'pikachu-stitch',
    slug: 'pikachu-stitch-figure',
    price: 34.90,
    image: '/product/pikachu-stitch.jpeg',
    category: 'decor'
  },
  {
    id: 'fitzek-gnome',
    slug: 'sebastian-fitzek-gnome',
    price: 49.90,
    image: '/product/fitzek-gnome.jpeg',
    category: 'decor'
  },
  {
    id: 'orko-bowl',
    slug: 'orko-popcorn-bowl',
    price: 34.50,
    image: '/product/orko-bowl.jpeg',
    category: 'home'
  }
];

export const getProductBySlug = (slug: string) => PRODUCTS.find(p => p.slug === slug);
export const getProductById = (id: string) => PRODUCTS.find(p => p.id === id);
