import { useState, useEffect } from 'react';
import type { Host } from '../types';

export const useHostAuth = () => {
  const [host, setHost] = useState<Host | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedHost = localStorage.getItem('host');
    const token = localStorage.getItem('host_token');

    if (storedHost && token) {
      setHost(JSON.parse(storedHost));
    }
    setIsLoading(false);
  }, []);

  const login = (hostData: Host, token: string) => {
    localStorage.setItem('host', JSON.stringify(hostData));
    localStorage.setItem('host_token', token);
    setHost(hostData);
  };

  const logout = () => {
    localStorage.removeItem('host');
    localStorage.removeItem('host_token');
    setHost(null);
  };

  const isAuthenticated = !!host;

  return { host, isLoading, isAuthenticated, login, logout };
};
