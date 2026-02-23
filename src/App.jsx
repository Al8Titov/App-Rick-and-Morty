import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';
import { getDataByCategory } from './data';


const VALID_CATEGORIES = ['characters', 'locations', 'episodes'];

function CategoryGuard({ category, children }) {
  if (!VALID_CATEGORIES.includes(category)) {
    return <Navigate to="/404" replace />;
  }
  const data = getDataByCategory(category);
  if (!data) return <Navigate to="/404" replace />;
  return children;
}

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="characters"
            element={
              <CategoryGuard category="characters">
                <CategoryPage />
              </CategoryGuard>
            }
          />
          <Route path="characters/:id" element={<DetailPage />} />
          <Route
            path="locations"
            element={
              <CategoryGuard category="locations">
                <CategoryPage />
              </CategoryGuard>
            }
          />
          <Route path="locations/:id" element={<DetailPage />} />
          <Route
            path="episodes"
            element={
              <CategoryGuard category="episodes">
                <CategoryPage />
              </CategoryGuard>
            }
          />
          <Route path="episodes/:id" element={<DetailPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </div>
  );
}
