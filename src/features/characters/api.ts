import type { ApiListResponse, Item } from '../../data';
import { fetchCategoryPage } from '../../shared/api/fetchCategoryPage';

export async function getCharactersPage(page: number): Promise<ApiListResponse<Item>> {
  return fetchCategoryPage('characters', page);
}

