import { useState, useEffect } from 'react';

export const useDebouncedValue = (value: string, time: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState<string>('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, time);

    return () => clearTimeout(timeout);
  }, [value, time]);

  return debouncedValue;
};
