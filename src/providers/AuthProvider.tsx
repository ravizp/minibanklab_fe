'use client';

import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { storage } from '@/utils/storage';
import { authService } from '@/services/auth.service';
import type { User } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  refreshUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getInitialToken(): string | null {
  if (typeof window === 'undefined') return null;
  return storage.getToken();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(getInitialToken);
  const queryClient = useQueryClient();

  const { data: user = null, isLoading } = useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: async () => {
      try {
        return await authService.getProfile();
      } catch {
        storage.removeToken();
        setToken(null);
        return null;
      }
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const login = useCallback(
    (newToken: string) => {
      storage.setToken(newToken);
      setToken(newToken);
      queryClient.invalidateQueries({ queryKey: ['auth', 'profile'] });
    },
    [queryClient]
  );

  const logout = useCallback(() => {
    storage.removeToken();
    setToken(null);
    queryClient.clear();
    window.location.href = '/login';
  }, [queryClient]);

  const refreshUser = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['auth', 'profile'] });
  }, [queryClient]);

  const authLoading = token ? isLoading : false;

  const value = useMemo<AuthContextType>(
    () => ({
      user: user as User | null,
      token,
      isLoading: authLoading,
      isAuthenticated: !!token && !!user,
      login,
      logout,
      refreshUser,
    }),
    [user, token, authLoading, login, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
