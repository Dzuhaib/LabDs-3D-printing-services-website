import { Filament } from './filaments';

export interface Product {
  id: string;
  slug: string;
  price: number;
  image: string;
  gallery?: string[];
  category: 'decor' | 'home';
  pixabayQuery?: string;
}

const NESCAFE_IMAGE_OVERRIDES: Record<string, string> = {
  'Blue': '/product/nescafe-dispenser Blue.jpg',
  'Cobalt Blue': '/product/nescafe-dispenser Cobalt Blue.jpg',
  'Cocoa Brown': '/product/nescafe-dispenser Cocoa Brown.jpg',
  'Cyan': '/product/nescafe-dispenser Cyan.jpg',
  'Hot Pink': '/product/nescafe-dispenser Hot Pink.jpg',
  'Light Gray': '/product/nescafe-dispenser Light Gray.jpg',
  'Magenta': '/product/nescafe-dispenser Magenta.jpg',
  'Maroon Red': '/product/nescafe-dispenser Maroon Red.jpg',
  'Purple': '/product/nescafe-dispenser Purple.jpg',
  'Turquoise': '/product/nescafe-dispenser Turquoise.jpg',
};

export function getProductImage(product: { id: string; image: string }, filament: Filament): string {
  if (product.id === 'nescafe') {
    if (filament.id === 'black') return product.image;
    const colorName = filament.name.replace(/\s*\(.*?\)\s*$/, '');
    return NESCAFE_IMAGE_OVERRIDES[colorName] ?? `/product/nescafe-dispenser ${colorName}.png`;
  }
  return product.image;
}

export const PRODUCTS: Product[] = [
  {
    id: 'nescafe',
    slug: 'nescafe-gold-dispenser',
    price: 24.99,
    image: '/product/nescafe-dispenser.png',
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
  },
  {
    id: 'shelf',
    slug: 'modular-wall-shelf',
    price: 29.90,
    image: '/product/shelf-main.jpeg',
    gallery: [
      '/product/shelf-main.jpeg',
      '/product/shelf-1.jpeg',
      '/product/shelf-2.jpeg',
      '/product/shelf-3.jpeg',
      '/product/shelf-4.jpeg',
      '/product/shelf-5.jpeg',
      '/product/shelf-6.jpeg',
      '/product/shelf-7.jpeg',
      '/product/shelf-8.jpeg',
      '/product/shelf-9.jpeg'
    ],
    category: 'home'
  },
  {
    id: 'lithophane',
    slug: 'lithophane-photo-frame-lamp',
    price: 34.90,
    image: '/product/lithophane-main.jpeg',
    gallery: [
      '/product/lithophane-main.jpeg',
      '/product/lithophane-1.jpeg',
      '/product/lithophane-2.jpeg',
      '/product/lithophane-3.jpeg',
      '/product/lithophane-4.jpeg'
    ],
    category: 'decor'
  },
  {
    id: 'zelda-lights',
    slug: 'zelda-christmas-led-lights',
    price: 44.90,
    image: '/product/zelda-lights-main.jpeg',
    gallery: [
      '/product/zelda-lights-main.jpeg',
      '/product/zelda-lights-1.jpeg',
      '/product/zelda-lights-2.jpeg',
      '/product/zelda-lights-3.jpeg'
    ],
    category: 'decor'
  }
];

export const getProductBySlug = (slug: string) => PRODUCTS.find(p => p.slug === slug);
export const getProductById = (id: string) => PRODUCTS.find(p => p.id === id);
