import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type AuthContextValue = {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: user !== null,
      user,
      login: (username: string) => setUser(username),
      logout: () => setUser(null),
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

