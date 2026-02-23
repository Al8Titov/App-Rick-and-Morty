import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Страница не найдена. Портал в другое измерение закрыт.</p>
      <Link to="/" className="not-found-link">
        Вернуться на главную
      </Link>
    </div>
  );
}
