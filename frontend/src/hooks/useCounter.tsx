'use client';

import { useState } from 'react';

export default function useCounter(initialValue?: number) {
  const [counter, setCounter] = useState(initialValue || 0);

  function increment() {
    setCounter((prev) => prev + 1);
  }

  function decrement() {
    setCounter((prev) => prev - 1);
  }

  function reset() {
    setCounter(0);
  }

  function add(num: number) {
    setCounter((prev) => prev + num);
  }

  return { counter, increment, decrement, reset, add };
}
