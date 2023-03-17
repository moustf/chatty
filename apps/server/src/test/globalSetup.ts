import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';

import { config } from './testConfig';

mongoose.set('strictQuery', true);

export default async function globalSetup() {
  if (config.Memory) {
    // Config to decided if an mongodb-memory-server instance should be used
    // it's needed in global space, because we don't want to create a new instance every test-suite
    const instance = await MongoMemoryServer.create({
      binary: {
        version: config.version,
      },
    });
    const uri = instance.getUri();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    globalThis.__MONGOINSTANCE = instance as any;
    process.env.TEST_DB_URI = uri.slice(0, uri.lastIndexOf('/'));
  } else {
    process.env.TEST_DB_URI = `mongodb://${config.IP}:${config.Port}`;
  }

  // The following is to make sure the database is clean before an test starts
  await mongoose.connect(`${process.env.TEST_DB_URI}/${config.Database}`);
  // await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
}
