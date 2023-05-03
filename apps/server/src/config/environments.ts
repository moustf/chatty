import dotenv from 'dotenv';

console.log(
  process.cwd(),
  'The current working directory in the environment config file!'
);

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

console.log(config, '==> Environment config file, all the exported env vars!');
console.log(
  process.env.SPACES_SECRET,
  '==> Environment config file, SPACES SECRET!'
);
console.log(process.env.SPACES_KEY, '==> Environment config file, SPACES KEY!');
console.log(
  process.env.DIGITAL_OCEAN_TOKEN,
  '==> Environment config file, DIGITAL OCEAN TOKEN!'
);
