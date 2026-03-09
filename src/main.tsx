import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { AppThemeProvider } from './app/theme/AppThemeProvider';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container with id "root" not found');
}

createRoot(container).render(
  <StrictMode>
    <AppThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </AppThemeProvider>
  </StrictMode>,
);

