import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  API_BASE_URL,
  categoryLabels,
  categoryToResource,
  type Category,
  type Item,
} from '../data';

type RouteParams = {
  category: Category;
  id: string;
};

const fieldLabels: Record<string, string> = {
  id: 'ID',
  name: 'Имя',
  status: 'Статус',
  species: 'Вид',
  type: 'Тип',
  gender: 'Пол',
  air_date: 'Дата выхода',
  episode: 'Эпизод',
  dimension: 'Измерение',
  created: 'Дата создания',
};

const formatValue = (key: string, value: unknown): string => {
  if (value === '' || value == null) return '—';
  if (key === 'created' && typeof value === 'string') {
    return new Date(value).toLocaleString('ru-RU');
  }
  return String(value);
};

export default function DetailPage() {
  const { category, id } = useParams<RouteParams>();
  const [item, setItem] = useState<Item | null | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!category || !id) {
    return <Navigate to="/404" replace />;
  }

  useEffect(() => {
    const controller = new AbortController();

    const loadItem = async () => {
      try {
        setLoading(true);
        setError(null);
        const resource = categoryToResource[category];
        const response = await fetch(
          `${API_BASE_URL}/${resource}/${id}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          if (response.status === 404) {
            setItem(null);
            return;
          }
          throw new Error(`Ошибка загрузки (${response.status})`);
        }

        const data = (await response.json()) as Item;
        setItem(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        setError('Не удалось загрузить данные. Попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    void loadItem();

    return () => {
      controller.abort();
    };
  }, [category, id]);

  if (!loading && !error && item === null) {
    return <Navigate to="/404" replace />;
  }

  const label = categoryLabels[category];

  if (loading || item === undefined) {
    return (
      <div className="detail">
        <p className="detail-loading">Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail">
        <p className="detail-error">{error}</p>
      </div>
    );
  }

  if (item === null) {
    return <Navigate to="/404" replace />;
  }

  const entries = Object.entries(item)
    .filter(([key]) => key !== 'image')
    .map<[string, string]>(([key, value]) => [key, formatValue(key, value)]);

  return (
    <div className="detail">
      <Link to={`/${category}`} className="detail-back">
        ← Назад к {label}
      </Link>
      <div className="detail-card">
        {item.image && (
          <img src={String(item.image)} alt={String(item.name)} className="detail-image" />
        )}
        <div className="detail-info">
          <h1 className="detail-title">{String(item.name)}</h1>
          <dl className="detail-list">
            {entries.map(([key, value]) => (
              <div key={key} className="detail-row">
                <dt className="detail-term">{fieldLabels[key] || key}</dt>
                <dd className="detail-desc">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

