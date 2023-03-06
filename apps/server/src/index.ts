import { config } from './config/environments';
import { httpServer as server } from './server';
import { initializeSocketIOServer } from './ws/index.socket';

const { port } = config;

server.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(`Server started http://localhost:${port}`)
);

initializeSocketIOServer(server);
