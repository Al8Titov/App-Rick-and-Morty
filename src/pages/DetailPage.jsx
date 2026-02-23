import { useParams, Link, Navigate } from 'react-router-dom';
import { getItemById, categoryLabels } from '../data';

export default function DetailPage() {
  const { category, id } = useParams();
  const item = getItemById(category, id);

  if (!item) {
    return <Navigate to="/404" replace />;
  }

  const label = categoryLabels[category];
  const fieldLabels = {
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
  const formatValue = (key, value) => {
    if (value === '' || value == null) return '—';
    if (key === 'created' && typeof value === 'string') {
      return new Date(value).toLocaleString('ru-RU');
    }
    return String(value);
  };

  const entries = Object.entries(item)
    .filter(([key]) => key !== 'image')
    .map(([key, value]) => [key, formatValue(key, value)]);

  return (
    <div className="detail">
      <Link to={`/${category}`} className="detail-back">
        ← Назад к {label}
      </Link>
      <div className="detail-card">
        {item.image && (
          <img src={item.image} alt={item.name} className="detail-image" />
        )}
        <div className="detail-info">
          <h1 className="detail-title">{item.name}</h1>
          <dl className="detail-list">
            {entries.map(([key, value]) => (
              <div key={key} className="detail-row">
                <dt className="detail-term">{fieldLabels[key] || key}</dt>
                <dd className="detail-desc">{String(value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
