import { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Paper, TextField, Typography } from '@mui/material';
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
  const { login, isAuthenticated, user } = useAuth();

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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h5" component="h1" align="center">
          Вход
        </Typography>
        {isAuthenticated && user && (
          <Alert severity="info">Вы уже вошли как {user}</Alert>
        )}
        <TextField
          label="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          fullWidth
        />
        <TextField
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          fullWidth
        />
        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Войти
        </Button>
      </Paper>
    </Box>
  );
}

