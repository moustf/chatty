export const SERVER_CORS_OPTIONS = {
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  credentials: true, // ? access-control-allow-credentials: true
};

export const SOCKET_CORS_OPTIONS = {
  origin: '*',
  methods: ['POST', 'GET'],
};
