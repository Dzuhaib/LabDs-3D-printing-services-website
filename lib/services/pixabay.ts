const API_KEY = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;
const BASE_URL = 'https://pixabay.com/api/';

export interface PixabayImage {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
}

export async function fetch3DProductImages(query: string = '3d printed object', count: number = 6): Promise<PixabayImage[]> {
  // Pixabay keys are usually [numbers]-[string]. 
  // If the key doesn't look like this, it might be invalid.
  const isKeyLikelyInvalid = !API_KEY || !API_KEY.includes('-');
  
  if (isKeyLikelyInvalid) {
    if (API_KEY) console.warn('Pixabay API key format looks unusual. Expected "[numbers]-[string]".');
    return [];
  }

  try {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=${count}&safesearch=true`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Pixabay API error (${response.status}):`, errorText);
      return [];
    }

    const data = await response.json();
    return data.hits || [];
  } catch (error) {
    console.error('Error fetching images from Pixabay:', error);
    return [];
  }
}
