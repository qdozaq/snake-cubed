import { useState, useEffect } from 'react';

export default function useStateWithStorage<T>(
  localStorageKey: string,
  initial: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const v = localStorage.getItem(localStorageKey);

    return v !== null ? JSON.parse(v) : initial;
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value, localStorageKey]);

  return [value, setValue];
}
