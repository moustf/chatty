import mongoose from 'mongoose';

import { config } from '../config/environments';

const { prodURI, devURI, testURI, nodeEnv } = config;

let connectionString: string | undefined = '';

switch (nodeEnv) {
  case 'production':
    connectionString = prodURI;
    break;
  case 'development':
    connectionString = devURI;
    break;
  case 'test':
    connectionString = testURI;
}

export const dbConnect = () => mongoose.connect(connectionString as string);
