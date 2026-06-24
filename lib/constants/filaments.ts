export interface Filament {
  id: string;
  name: string;
  hex: string;
  category: 'Matte' | 'Basic' | 'Silk';
}

export const BAMBU_FILAMENTS: Filament[] = [
  { id: 'jade-white', name: 'Jade White (10100)', hex: '#FFFFFF', category: 'Basic' },
  { id: 'beige', name: 'Beige (10201)', hex: '#F7E6DE', category: 'Basic' },
  { id: 'light-gray', name: 'Light Gray (10104)', hex: '#D1D3D5', category: 'Basic' },
  { id: 'yellow', name: 'Yellow (10400)', hex: '#F4EE2A', category: 'Basic' },
  { id: 'sunflower-yellow', name: 'Sunflower Yellow (10402)', hex: '#FEC600', category: 'Basic' },
  { id: 'gold', name: 'Gold (10401)', hex: '#E4BD68', category: 'Basic' },
  { id: 'pumpkin-orange', name: 'Pumpkin Orange (10301)', hex: '#FF9016', category: 'Basic' },
  { id: 'orange', name: 'Orange (10300)', hex: '#FF6A13', category: 'Basic' },
  { id: 'bambu-green', name: 'Bambu Green (10501)', hex: '#00AE42', category: 'Basic' },
  { id: 'pink', name: 'Pink (10203)', hex: '#F55A74', category: 'Basic' },
  { id: 'hot-pink', name: 'Hot Pink (10204)', hex: '#F5547C', category: 'Basic' },
  { id: 'red', name: 'Red (10200)', hex: '#C12E1F', category: 'Basic' },
  { id: 'maroon-red', name: 'Maroon Red (10205)', hex: '#9D2235', category: 'Basic' },
  { id: 'purple', name: 'Purple (10700)', hex: '#5E43B7', category: 'Basic' },
  { id: 'cyan', name: 'Cyan (10603)', hex: '#0086D6', category: 'Basic' },
  { id: 'blue', name: 'Blue (10601)', hex: '#0A2989', category: 'Basic' },
  { id: 'brown', name: 'Brown (10800)', hex: '#9D432C', category: 'Basic' },
  { id: 'cocoa-brown', name: 'Cocoa Brown (10802)', hex: '#6F5034', category: 'Basic' },
  { id: 'silver', name: 'Silver (10102)', hex: '#A6A9AA', category: 'Basic' },
  { id: 'black', name: 'Black (10101)', hex: '#000000', category: 'Basic' },
  { id: 'blue-grey', name: 'Blue Grey', hex: '#6699CC', category: 'Basic' },
  { id: 'bright-green', name: 'Bright Green', hex: '#32CD32', category: 'Basic' },
  { id: 'bronze', name: 'Bronze', hex: '#CD7F32', category: 'Basic' },
  { id: 'cobalt-blue', name: 'Cobalt Blue', hex: '#0047AB', category: 'Basic' },
  { id: 'dark-gray', name: 'Dark Gray', hex: '#666666', category: 'Basic' },
  { id: 'gray', name: 'Gray', hex: '#999999', category: 'Basic' },
  { id: 'indigo-purple', name: 'Indigo Purple', hex: '#5B17A6', category: 'Basic' },
  { id: 'magenta', name: 'Magenta', hex: '#E0007A', category: 'Basic' },
  { id: 'mistletoe-green', name: 'Mistletoe Green', hex: '#49796B', category: 'Basic' },
  { id: 'turquoise', name: 'Turquoise', hex: '#40E0D0', category: 'Basic' },
];
