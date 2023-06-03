/* eslint-disable no-console */
import { Seeder } from 'mongo-seeding';
import mongoose from 'mongoose';

import { config } from '../../config/environments';

const { nodeEnv, prodURI, testURI, devURI } = config;

const seederConfig = {
  database: '',
  dropDatabase: true,
};

switch (nodeEnv) {
  case 'production':
    seederConfig.database = prodURI as string;
    break;
  case 'development':
    seederConfig.database = devURI as string;
    break;
  case 'test':
    seederConfig.database = testURI as string;
    break;
  default:
    throw new Error('No node env is provided!');
}

const seeder = new Seeder(seederConfig);

const collections = [
  {
    name: 'users',
    documents: [
      {
        _id: new mongoose.Types.ObjectId('6357f708ed0c57054008e300'),
        firstName: 'Mustafa',
        lastName: 'Salem',
        email: 'mustafa@gmail.com',
        password:
          '$2a$12$Gel7UtDBU1oP13rc5hu.juVNcnrkxQabnFgYw7OYXLqE74vgNFuhW', // Root@123
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId('123ea40720dcfa02e0ae42db'),
        firstName: 'Imad',
        lasName: 'Shatali',
        email: 'imad@gmail.com',
        password:
          '$2a$12$Gel7UtDBU1oP13rc5hu.juVNcnrkxQabnFgYw7OYXLqE74vgNFuhW',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId('456ea40720dcfa02e0ae42db'),
        firstName: 'Rashad',
        lastName: 'Rami',
        email: 'rashad@gmail.com',
        password:
          '$2a$12$Gel7UtDBU1oP13rc5hu.juVNcnrkxQabnFgYw7OYXLqE74vgNFuhW',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId('8977f708ed0c57054008e400'),
        firstName: 'Hani',
        lastName: 'Sami',
        email: 'hani@gmail.com',
        password:
          '$2a$12$Gel7UtDBU1oP13rc5hu.juVNcnrkxQabnFgYw7OYXLqE74vgNFuhW',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId('2587f708ed0c57054008e500'),
        firstName: 'Heba',
        lastName: 'Nour',
        email: 'heba@gmail.com',
        password:
          '$2a$12$Gel7UtDBU1oP13rc5hu.juVNcnrkxQabnFgYw7OYXLqE74vgNFuhW',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId('789ea40720dcfa02e0ae42db'),
        firstName: 'Kamal',
        lastName: 'Issa',
        email: 'kamal@gmail.com',
        password:
          '$2a$12$Gel7UtDBU1oP13rc5hu.juVNcnrkxQabnFgYw7OYXLqE74vgNFuhW',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId('147ea40720dcfa02e0ae42db'),
        firstName: 'Lina',
        lastName: 'Abbas',
        email: 'lina@gmail.com',
        password:
          '$2a$12$Gel7UtDBU1oP13rc5hu.juVNcnrkxQabnFgYw7OYXLqE74vgNFuhW',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId('6411ec3d1feb9523d5036e9d'),
        firstName: 'Tamara',
        lastName: 'Rushdi',
        email: 'tamara@gmail.com',
        password:
          '$2a$12$Gel7UtDBU1oP13rc5hu.juVNcnrkxQabnFgYw7OYXLqE74vgNFuhW',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId('6411bd24231678cfdf841048'),
        firstName: 'Arwa',
        lastName: 'Ammar',
        email: 'arwa@gmail.com',
        password:
          '$2a$12$Gel7UtDBU1oP13rc5hu.juVNcnrkxQabnFgYw7OYXLqE74vgNFuhW',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId('6411bd4547dc76574443c75a'),
        firstName: 'Nada',
        lastName: 'Ammar',
        email: 'nada@gmail.com',
        password:
          '$2a$12$Gel7UtDBU1oP13rc5hu.juVNcnrkxQabnFgYw7OYXLqE74vgNFuhW',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
  },
  {
    name: 'conversations',
    documents: [
      {
        _id: new mongoose.Types.ObjectId('6411bf90d1d20cd44e2911b9'),
        users: [
          new mongoose.Types.ObjectId('6357f708ed0c57054008e300'),
          new mongoose.Types.ObjectId('123ea40720dcfa02e0ae42db'),
        ],
        messages: [
          {
            type: 'text',
            text: 'Hello',
            media: [
              'https://chatty-bucket.fra1.digitaloceanspaces.com/uploads/question1.png',
            ],
            sender: new mongoose.Types.ObjectId('6357f708ed0c57054008e300'),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            type: 'text',
            text: 'Hi there!',
            sender: new mongoose.Types.ObjectId('123ea40720dcfa02e0ae42db'),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId('6411ec8cd7b346af1913d46d'),
        users: [
          new mongoose.Types.ObjectId('456ea40720dcfa02e0ae42db'),
          new mongoose.Types.ObjectId('8977f708ed0c57054008e400'),
        ],
        messages: [
          {
            type: 'text',
            text: 'Hi',
            sender: new mongoose.Types.ObjectId('8977f708ed0c57054008e400'),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            type: 'text',
            text: 'Hello there!',
            sender: new mongoose.Types.ObjectId('456ea40720dcfa02e0ae42db'),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId('6411bfa23854cf0b8f4ddea8'),
        users: [
          new mongoose.Types.ObjectId('456ea40720dcfa02e0ae42db'),
          new mongoose.Types.ObjectId('8977f708ed0c57054008e400'),
        ],
        messages: [
          {
            type: 'text',
            text: 'Hi',
            sender: new mongoose.Types.ObjectId('8977f708ed0c57054008e400'),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            type: 'text',
            text: 'Hello there!',
            sender: new mongoose.Types.ObjectId('456ea40720dcfa02e0ae42db'),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId('6411eca56e9d4cac192a49bd'),
        users: [
          new mongoose.Types.ObjectId('6357f708ed0c57054008e300'),
          new mongoose.Types.ObjectId('6411bd4547dc76574443c75a'),
          new mongoose.Types.ObjectId('6411bd24231678cfdf841048'),
          new mongoose.Types.ObjectId('147ea40720dcfa02e0ae42db'),
        ],
        messages: [
          {
            type: 'message',
            text: 'Hi all',
            media: [
              'https://chatty-bucket.fra1.digitaloceanspaces.com/uploads/image2.jpg',
            ],
            sender: new mongoose.Types.ObjectId('2587f708ed0c57054008e500'),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            type: 'message',
            text: 'Hello there!',
            sender: new mongoose.Types.ObjectId('6411bd4547dc76574443c75a'),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            type: 'message',
            media: [
              'https://chatty-bucket.fra1.digitaloceanspaces.com/uploads/image1.jpg',
            ],
            sender: new mongoose.Types.ObjectId('6411bd24231678cfdf841048'),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            type: 'action',
            action: 'add',
            sender: new mongoose.Types.ObjectId('147ea40720dcfa02e0ae42db'),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        name: 'Awesome People',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
  },
];

export const seed = () =>
  seeder
    .import(collections)
    .then(() => console.log('Database seeded successfully!'))
    .catch((error) => console.log(`Failed to seed the database! ${error}`));
