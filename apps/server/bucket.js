/* eslint-disable no-console */
const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');

// process.chdir(join(process.cwd(), 'apps', 'server'));
require('dotenv').config();

// ? The s3Client function validates your request adn directs it to your Space's specified endpoint using the AWS SDK.
const s3Client = new S3Client({
  endpoint: 'https://fra1.digitaloceanspaces.com',
  forcePathStyle: false,
  region: 'fra1',
  credentials: {
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET,
  },
});

// ? Define a function that uploads your object using SDK's PutObjectCommand object and catch any errors.
const uploadObject = async (fileName, fileData) => {
  // ? Define the parameters for the object you want to upload.
  const params = {
    Bucket: '_static',
    Key: fileName,
    Body: fileData,
    ACL: 'public', // Access Control Lists.
    Metadata: {
      'x-amx-meta-description': 'Uploading static files.',
    },
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log(
      'The object has been uploaded successfully, the object is: ',
      params.Bucket + '/' + params.Key
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { uploadObject };
