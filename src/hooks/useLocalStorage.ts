import { useEffect, useState } from 'react'



function useLocalStorage<T>(key: string, initialState: T) {
  const [entry, setEntry] = useState<T>(() => {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(entry));
  }, [entry]);

  return setEntry
}

export default useLocalStorage