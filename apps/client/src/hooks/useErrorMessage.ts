import { useEffect, useState } from 'react';
import { FieldErrors } from 'react-hook-form';

export const useErrorMessage = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const setError = (error: string) => {
    setErrorMessage(error);
  };

  useEffect(() => {
    const resetErrorMessage = () => setErrorMessage('');

    const inputFields = document.querySelectorAll('input');
    inputFields.forEach((input) => {
      input.addEventListener('input', resetErrorMessage);
    });

    return () => {
      inputFields.forEach((input) => {
        input.removeEventListener('input', resetErrorMessage);
      });
    };
  }, []);

  return { errorMessage, setError };
};