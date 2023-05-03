import mongoose from 'mongoose';

import { config } from '../config/environments';

const { prodURI, devURI, testURI, nodeEnv } = config;

let connectionString: string | undefined = '';

switch (nodeEnv) {
  case 'production':
    connectionString = prodURI;
    console.log(prodURI, 'Production database environment variable uri!');
    console.log(connectionString, 'Production connection string!');
    break;
  case 'development':
    connectionString = devURI;
    break;
  case 'test':
    connectionString = testURI;
}

export const dbConnect = () => mongoose.connect(connectionString as string);
