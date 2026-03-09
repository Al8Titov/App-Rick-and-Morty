import { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type LocationState = {
  from?: { pathname: string };
};

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = (location.state as LocationState | null)?.from?.pathname || '/';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Введите логин и пароль');
      return;
    }
    login(username.trim());
    navigate(from, { replace: true });
  };

  return (
    <div className="login">
      <h1 className="login-title">Вход</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-field">
          <span>Логин</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="login-field">
          <span>Пароль</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="login-error">{error}</p>}
        <button type="submit" className="login-button">
          Войти
        </button>
      </form>
    </div>
  );
}

