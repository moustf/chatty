import { S3Client } from '@aws-sdk/client-s3';

import { config } from '../config/environments';

const { doKey, doSecret } = config;

export const s3Client = new S3Client({
  endpoint: 'https://fra1.digitaloceanspaces.com',
  region: 'fra1',
  credentials: {
    accessKeyId: doKey as string,
    secretAccessKey: doSecret as string,
  },
});
