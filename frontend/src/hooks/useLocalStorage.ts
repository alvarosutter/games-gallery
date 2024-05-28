import { useCallback, useState, useEffect } from 'react';

function getSavedValue(
  key: string,
  initialValue: string | number | boolean | object | (() => void),
) {
  const jsonValue = localStorage.getItem(key);
  if (jsonValue != null) {
    return JSON.parse(jsonValue) as unknown;
  }
  if (initialValue instanceof Function) {
    return initialValue();
  }
  return initialValue;
}

function useLocalStorage(
  key: string,
  initialValue: string | number | boolean | object | (() => void),
) {
  const [value, setValue] = useState(() => getSavedValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const remove = useCallback(() => {
    localStorage.removeItem(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [value, setValue, remove];
}

export default useLocalStorage;
