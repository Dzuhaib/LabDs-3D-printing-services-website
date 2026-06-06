export interface Filament {
  id: string;
  name: string;
  hex: string;
  category: 'Matte' | 'Basic' | 'Silk';
}

export const BAMBU_FILAMENTS: Filament[] = [
  { id: 'matte-charcoal', name: 'Matte Charcoal', hex: '#2B2B2B', category: 'Matte' },
  { id: 'matte-marine', name: 'Matte Marine Blue', hex: '#1E3A5F', category: 'Matte' },
  { id: 'matte-grass', name: 'Matte Grass Green', hex: '#4F7942', category: 'Matte' },
  { id: 'matte-sand', name: 'Matte Desert Sand', hex: '#D2B48C', category: 'Matte' },
  { id: 'matte-ash', name: 'Matte Ash Grey', hex: '#7F8C8D', category: 'Matte' },
  { id: 'matte-ivory', name: 'Matte Ivory White', hex: '#F5F5F0', category: 'Matte' },
];
