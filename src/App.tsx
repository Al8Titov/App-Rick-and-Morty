import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import { Category } from './data';
import { PageLoader } from './shared/ui/PageLoader';
import './App.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const DetailPage = lazy(() => import('./pages/DetailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

const VALID_CATEGORIES: Category[] = ['characters', 'locations', 'episodes'];

type CategoryGuardProps = {
  children: React.ReactNode;
};

function CategoryGuard({ children }: CategoryGuardProps) {
  const { category } = useParams<{ category: Category }>();

  if (!category || !VALID_CATEGORIES.includes(category)) {
    return <Navigate to="/404" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={(
              <Suspense fallback={<PageLoader />}>
                <HomePage />
              </Suspense>
            )}
          />
          <Route
            path="login"
            element={(
              <Suspense fallback={<PageLoader />}>
                <LoginPage />
              </Suspense>
            )}
          />
          <Route
            path=":category"
            element={(
              <RequireAuth>
                <CategoryGuard>
                  <Suspense fallback={<PageLoader />}>
                    <CategoryPage />
                  </Suspense>
                </CategoryGuard>
              </RequireAuth>
            )}
          />
          <Route
            path=":category/:id"
            element={(
              <RequireAuth>
                <CategoryGuard>
                  <Suspense fallback={<PageLoader />}>
                    <DetailPage />
                  </Suspense>
                </CategoryGuard>
              </RequireAuth>
            )}
          />
          <Route
            path="404"
            element={(
              <Suspense fallback={<PageLoader />}>
                <NotFoundPage />
              </Suspense>
            )}
          />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

