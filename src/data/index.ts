export type Category = 'characters' | 'locations' | 'episodes';

export const categoryLabels: Record<Category, string> = {
  characters: 'Персонажи',
  locations: 'Локации',
  episodes: 'Эпизоды',
};

export type Item = {
  id: number;
  name: string;
  image?: string;
  created: string;
  [key: string]: unknown;
};

export type ApiListResponse<TItem> = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: TItem[];
};

export const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const categoryToResource: Record<Category, 'character' | 'location' | 'episode'> = {
  characters: 'character',
  locations: 'location',
  episodes: 'episode',
};

