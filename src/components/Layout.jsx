import { NavLink, Outlet } from 'react-router-dom';
import { categoryLabels } from '../data';

const navItems = [
  { to: '/characters', label: categoryLabels.characters },
  { to: '/locations', label: categoryLabels.locations },
  { to: '/episodes', label: categoryLabels.episodes },
];

export default function Layout() {
  return (
    <div className="layout">
      <header className="header">
        <NavLink to="/" className="logo">
          Rick & Morty
        </NavLink>
        <nav className="nav">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
