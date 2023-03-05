import { config } from './environments';

export const serverCorsOptions = {
  origin: config.origin,
  credentials: true, // ? access-control-allow-credentials: true
};

export const socketCorsOptions = {
  origin: config.origin,
  methods: ['POST', 'GET'],
};
