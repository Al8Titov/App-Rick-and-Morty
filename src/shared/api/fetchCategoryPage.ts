import { API_BASE_URL, categoryToResource, type ApiListResponse, type Category, type Item } from '../../data';

export async function fetchCategoryPage(
  category: Category,
  page: number,
): Promise<ApiListResponse<Item>> {
  const resource = categoryToResource[category];
  const response = await fetch(`${API_BASE_URL}/${resource}?page=${page}`);

  if (!response.ok) {
    throw new Error(`Ошибка загрузки данных (${response.status})`);
  }

  return response.json() as Promise<ApiListResponse<Item>>;
}

