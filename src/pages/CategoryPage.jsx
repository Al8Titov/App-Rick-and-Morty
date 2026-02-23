import { useLocation, useSearchParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { getDataByCategory, categoryLabels } from '../data';

const SORT_ASC = 'createdASC';
const SORT_DESC = 'createdDESC';

export default function CategoryPage() {
  const { pathname } = useLocation();
  const category = pathname.split('/').filter(Boolean)[0] || null;
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || SORT_ASC;

  const data = useMemo(() => getDataByCategory(category), [category]);
  const label = categoryLabels[category];

  const sortedData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    const arr = [...data];
    arr.sort((a, b) => {
      const dateA = new Date(a.created).getTime();
      const dateB = new Date(b.created).getTime();
      return sort === SORT_DESC ? dateB - dateA : dateA - dateB;
    });
    return arr;
  }, [data, sort]);

  const setSort = (value) => {
    setSearchParams({ sort: value });
  };

  if (!data || !label) {
    return null;
  }

  return (
    <div className="category">
      <h1 className="category-title">{label}</h1>
      <div className="category-sort">
        <span>Сортировка по дате создания:</span>
        <button
          type="button"
          className={sort === SORT_ASC ? 'sort-btn active' : 'sort-btn'}
          onClick={() => setSort(SORT_ASC)}
        >
          по возрастанию
        </button>
        <button
          type="button"
          className={sort === SORT_DESC ? 'sort-btn active' : 'sort-btn'}
          onClick={() => setSort(SORT_DESC)}
        >
          по убыванию
        </button>
      </div>
      <ul className="category-list">
        {sortedData.map((item) => (
          <li key={item.id}>
            <Link to={`/${category}/${item.id}`} className="category-item">
              {item.image && (
                <img src={item.image} alt={item.name} className="category-item-img" />
              )}
              <div className="category-item-text">
                <span className="category-item-name">{item.name}</span>
                {category === 'characters' && (
                  <span className="category-item-meta">
                    {item.status} · {item.species}
                    {item.type ? ` · ${item.type}` : ''}
                  </span>
                )}
                {category === 'episodes' && (
                  <span className="category-item-meta">
                    {item.episode} · {item.air_date}
                  </span>
                )}
                {category === 'locations' && (
                  <span className="category-item-meta">
                    {item.type} · {item.dimension}
                  </span>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
