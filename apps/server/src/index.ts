/* eslint-disable no-console */
import { config } from './config/environments';
import { dbConnect } from './database/connection';
import { seed } from './database/seeders';
import { httpServer as server } from './server';
import { initializeSocketIOServer } from './ws/index.socket';

const { port } = config;

dbConnect()
  .then(async () => {
    await seed();
    initializeSocketIOServer(server);
  })
  .then(() => {
    server.listen(port, () =>
      console.log(`Server started http://localhost:${port}`)
    );
  })
  .catch((error) => console.log(error));
