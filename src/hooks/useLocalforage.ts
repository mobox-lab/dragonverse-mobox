import localforage from 'localforage';
import { useCallback, useEffect, useState } from 'react';

export const useLocalforage = <T>(key?: string) => {
  const [value, setValue] = useState<T | null>(null); // <T>

  const getLocalValue = useCallback(async () => {
    if (!key) return null;
    const res = await localforage.getItem<T>(key);
    setValue(res);
    return res;
  }, [key]);

  const setLocalValue = useCallback(
    async (value?: any) => {
      if (!key) return null;
      const res = await localforage.setItem(key, value);
      return res;
    },
    [key],
  );

  const removeLocalValue = useCallback(() => {
    return localforage.removeItem(key ?? '');
  }, [key]);

  useEffect(() => {
    getLocalValue();
  }, [getLocalValue]);

  return {
    value,
    setValue,
    getLocalValue,
    setLocalValue,
    removeLocalValue,
  };
};
