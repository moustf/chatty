export const baseUrl = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_APP_BASE_URL
  : import.meta.env.VITE_APP_PROD_BASE_URL;
