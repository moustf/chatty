import { config } from './config/environments';
import { httpServer as server } from './server';

const { port } = config;

server.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(`Server started http://localhost:${port}`)
);
