import dotenv from 'dotenv';

dotenv.config();

const {
  NODE_ENV,
  PORT,
  ORIGIN,
  SECRET_KEY,
  PRODUCTION_DB_URI,
  DEVELOPMENT_DB_URI,
  TEST_DB_URI,
} = process.env;

export const config = {
  nodeEnv: NODE_ENV,
  port: PORT,
  origin: ORIGIN || 'http://localhost:3000',
  secretKey: SECRET_KEY,
  prodURI: PRODUCTION_DB_URI,
  devURI: DEVELOPMENT_DB_URI,
  testURI: TEST_DB_URI,
};
