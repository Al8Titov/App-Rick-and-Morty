import { Link } from 'react-router-dom';
import { categoryLabels } from '../data';

const categories = [
  { path: '/characters', key: 'characters' },
  { path: '/locations', key: 'locations' },
  { path: '/episodes', key: 'episodes' },
];

export default function HomePage() {
  return (
    <div className="home">
      <h1 className="home-title">Добро пожаловать во вселенную Рика и Морти</h1>
      <p className="home-intro">
        Исследуйте персонажей, локации и эпизоды культового мультсериала.
      </p>
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
