import { config } from './environments';

export const SERVER_CORS_OPTIONS = {
  origin: '*',
  credentials: true, // ? access-control-allow-credentials: true
};

export const SOCKET_CORS_OPTIONS = {
  origin: '*',
  methods: ['POST', 'GET'],
};
