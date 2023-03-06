import { config } from './environments';

export const serverCorsOptions = {
  origin: config.origin,
  credentials: true, // ? access-control-allow-credentials: true
};
