'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState, useEffect } from 'react';

import type { Score } from '../types/score';

function getSavedValue(key: string, initialValue: Score) {
  const jsonValue = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
  if (jsonValue != null) {
    return JSON.parse(jsonValue) as Score;
  }
  if (initialValue instanceof Function) {
    return initialValue();
  }
  return initialValue;
}

function useLocalStorage(key: string, initialValue: Score) {
  const [value, setValue] = useState(() => getSavedValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const remove = useCallback(() => {
    localStorage.removeItem(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { value, setValue, remove } as {
    value: Score;
    setValue: Dispatch<SetStateAction<Score>>;
    remove: () => void;
  };
}

export default useLocalStorage;
