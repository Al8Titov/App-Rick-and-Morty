import { Link } from 'react-router-dom';
import { categoryLabels, type Category } from '../data';
import { useAuth } from '../context/AuthContext';

type CategoryConfig = {
  path: string;
  key: Category;
};

const categories: CategoryConfig[] = [
  { path: '/characters', key: 'characters' },
  { path: '/locations', key: 'locations' },
  { path: '/episodes', key: 'episodes' },
];

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home">
      <h1 className="home-title">Добро пожаловать во вселенную Рика и Морти</h1>
      {isAuthenticated && user ? (
        <p className="home-greeting">Привет, {user}! Рады тебя видеть.</p>
      ) : (
        <p className="home-intro">
          Исследуйте персонажей, локации и эпизоды культового мультсериала.
        </p>
      )}
      <div className="home-categories">
        {categories.map(({ path, key }) => (
          <Link key={path} to={path} className="home-card">
            <span className="home-card-label">{categoryLabels[key]}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

