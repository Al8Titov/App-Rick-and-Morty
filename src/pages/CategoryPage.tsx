import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  categoryLabels,
  type Category,
  type Item,
} from '../data';
import { fetchCategoryPage } from '../shared/api/fetchCategoryPage';

const SORT_ASC = 'createdASC';
const SORT_DESC = 'createdDESC';

type SortValue = typeof SORT_ASC | typeof SORT_DESC;

export default function CategoryPage() {
  const { category } = useParams<{ category: Category }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = (searchParams.get('sort') as SortValue) || SORT_ASC;

  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const label = category ? categoryLabels[category] : undefined;

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, [category]);

  useEffect(() => {
    if (!category) return;

    const controller = new AbortController();

    const loadPage = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCategoryPage(category, page);

        setItems((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
        setHasMore(Boolean(data.info.next));
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        setError('Не удалось загрузить данные. Попробуйте позже.');
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    void loadPage();

    return () => {
      controller.abort();
    };
  }, [category, page]);

  const sortedData = useMemo(() => {
    if (!Array.isArray(items)) return [];
    const arr = [...items];
    arr.sort((a: Item, b: Item) => {
      const dateA = new Date(String(a.created)).getTime();
      const dateB = new Date(String(b.created)).getTime();
      return sort === SORT_DESC ? dateB - dateA : dateA - dateB;
    });
    return arr;
  }, [items, sort]);

  const setSort = (value: SortValue) => {
    setSearchParams({ sort: value });
  };

  useEffect(() => {
    if (!observerRef.current) return;
    if (!hasMore || loading) return;

    const element = observerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      {
        rootMargin: '200px',
      },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [hasMore, loading]);

  if (!category || !label) {
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
      {!loading && !error && sortedData.length === 0 && (
        <p className="category-empty">Нет данных для отображения</p>
      )}
      <ul className="category-list">
        {sortedData.map((item) => (
          <li key={item.id}>
            <Link to={`/${category}/${item.id}`} className="category-item">
              {item.image && (
                <img src={String(item.image)} alt={String(item.name)} className="category-item-img" />
              )}
              <div className="category-item-text">
                <span className="category-item-name">{String(item.name)}</span>
                {category === 'characters' && (
                  <span className="category-item-meta">
                    {String(item.status)} · {String(item.species)}
                    {item.type ? ` · ${String(item.type)}` : ''}
                  </span>
                )}
                {category === 'episodes' && (
                  <span className="category-item-meta">
                    {String((item as Item & { episode?: string }).episode)} ·{' '}
                    {String((item as Item & { air_date?: string }).air_date)}
                  </span>
                )}
                {category === 'locations' && (
                  <span className="category-item-meta">
                    {String((item as Item & { type?: string }).type)} ·{' '}
                    {String((item as Item & { dimension?: string }).dimension)}
                  </span>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {error && <p className="category-error">{error}</p>}
      <div ref={observerRef} className="category-sentinel" />
      {loading && <p className="category-loading">Загрузка...</p>}
    </div>
  );
}

