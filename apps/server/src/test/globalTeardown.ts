import { MongoMemoryServer } from 'mongodb-memory-server';

import { config } from './testConfig';

export default async function globalTeardown() {
  // Config to decided if an mongodb-memory-server instance should be used
  if (config.Memory) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const instance: MongoMemoryServer = globalThis.__MONGOINSTANCE;
    await instance.stop();
  }
}
