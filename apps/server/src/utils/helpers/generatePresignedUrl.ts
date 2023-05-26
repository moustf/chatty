import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { config } from '../../config/environments';

const { doKey, doSecret } = config;

const s3 = new S3Client({
  endpoint: 'https://fra1.digitaloceanspaces.com',
  credentials: {
    accessKeyId: doKey as string,
    secretAccessKey: doSecret as string,
  },
  forcePathStyle: false,
  region: 'fra1',
});

export const generatePresignedUrl = async (
  fileType: string,
  fileName: string
) => {
  try {
    const command = new PutObjectCommand({
      Bucket: 'chatty-bucket',
      Key: `uploads/${fileName}`,
      ACL: 'public',
    });

    const url = await getSignedUrl(s3 as any, command as any, {
      expiresIn: 3600,
    });

    return url;
  } catch (error) {
    return error;
  }
};
