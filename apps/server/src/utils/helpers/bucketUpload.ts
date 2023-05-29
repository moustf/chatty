/* eslint-disable no-console */
import { PutObjectCommand } from '@aws-sdk/client-s3';

import { StatusCodes } from '@chatty/types';

import { s3Client } from '../../aws';
import { GenericError } from '../custom';

// ? The s3Client function validates your request adn directs it to your Space's specified endpoint using the AWS SDK.

// ? Define a function that uploads your object using SDK's PutObjectCommand object and catch any errors.
export const uploadObject = async (file: Express.Multer.File) => {
  // ? Define the parameters for the object you want to upload.
  const params = {
    Bucket: 'chatty-bucket',
    Key: `uploads/${file.originalname}`,
    Body: file.buffer,
    ACL: 'public-read', // Access Control Lists.
    Metadata: {
      'x-amx-meta-description': 'Uploading static files.',
    },
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    return data;
  } catch (error) {
    console.log(error, 'upload files controller error!');

    throw new GenericError(
      StatusCodes.ServerError,
      'Error while uploading the files!'
    );
  }
};

export const uploadMany = async (
  files: Express.Multer.File[],
  result: string[]
): Promise<string[]> => {
  try {
    if (files.length === 0) return result;

    const file = files.shift();

    await uploadObject(file as any);

    result.push(
      `https://chatty-bucket.fra1.digitaloceanspaces.com/uploads/${file?.originalname}`
    );

    return uploadMany(files, result);
  } catch (error) {
    throw new GenericError(
      StatusCodes.ServerError,
      'Error while uploading the files!'
    );
  }
};
