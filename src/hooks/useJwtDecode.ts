import { useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function useJwtDecode<T>(token?: string) {
  return useMemo(() => {
    if (!token) return {} as Partial<T>;
    return jwtDecode<T>(token);
  }, [token]);
}
