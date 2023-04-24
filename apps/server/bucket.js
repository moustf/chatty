const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config({
  path: '/home/moustf/projects_personal/chatty/apps/server/.env',
});

// ? Step 2: The s3Client function validates your request adn directs it to your Space's specified endpoint using the AWS SDK.
const s3Client = new S3Client({
  endpoint: 'https://chatty-bucket.fra1.digitaloceanspaces.com',
  forcePathStyle: false,
  region: 'fra1',
  credentials: {
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET,
  },
});

// ? Step 3: Define the parameters for the object you want to upload.
const params = {
  Bucket: '_exp',
  Key: 'hello-world.txt',
  Body: 'Hello, World!',
  ACL: 'private', // Access Control Lists.
  Metadata: {
    'x-amx-meta-description': 'This is just an experimentally upload',
  },
};

// ? Step 4: Define a function that uploads your object using SDK's PutObjectCommand object and catch any errors.
const uploadObject = async () => {
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

// ? Step 5: Call the uploadedObject function.
uploadObject();
