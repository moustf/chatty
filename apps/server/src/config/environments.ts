import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV, PORT, ORIGIN, SECRET_KEY } = process.env;

export const config = {
  nodeEnv: NODE_ENV,
  port: PORT,
  origin: ORIGIN || 'http://localhost:3000',
  secretKey: SECRET_KEY,
};
