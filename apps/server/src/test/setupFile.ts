import mongoose from 'mongoose';

import { dbConnect } from '../database/connection';
import { seed } from '../database/seeders';

mongoose.set('strictQuery', true);

beforeAll(async () => {
  await dbConnect().then(() => seed());
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
  await dbConnect().then(() => seed());
});

afterAll(async () => {
  await mongoose.disconnect();
});

afterAll((done) => {
  return done();
});
