import charactersData from './characters.json';
import locationsData from './location.json';
import episodesData from './episode.json';

export const getCharacters = () => charactersData;
export const getLocations = () => locationsData;
export const getEpisodes = () => episodesData;

export const getDataByCategory = (category) => {
  switch (category) {
    case 'characters':
      return charactersData;
    case 'locations':
      return locationsData;
    case 'episodes':
      return episodesData;
    default:
      return null;
  }
};

export const getItemById = (category, id) => {
  const data = getDataByCategory(category);
  if (!data) return null;
  const numId = Number(id);
  return data.find((item) => item.id === numId) ?? null;
};

export const categoryLabels = {
  characters: 'Персонажи',
  locations: 'Локации',
  episodes: 'Эпизоды',
};
