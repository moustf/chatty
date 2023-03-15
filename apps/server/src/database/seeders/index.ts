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
      },
      {
        _id: new mongoose.Types.ObjectId('123ea40720dcfa02e0ae42db'),
        firstName: 'Imad',
        lasName: 'Shatali',
        email: 'imad@gmail.com',
        password:
          '$2a$12$Gel7UtDBU1oP13rc5hu.juVNcnrkxQabnFgYw7OYXLqE74vgNFuhW',
      },
      {
        _id: new mongoose.Types.ObjectId('456ea40720dcfa02e0ae42db'),
        firstName: 'Rashad',
        lastName: 'Rami',
        email: 'rashad@gmail.com',
        password:
          '$2a$12$Gel7UtDBU1oP13rc5hu.juVNcnrkxQabnFgYw7OYXLqE74vgNFuhW',
      },
      {
        _id: new mongoose.Types.ObjectId('8977f708ed0c57054008e400'),
        firstName: 'Hani',
        lastName: 'Sami',
        email: 'hani@gmail.com',
        password:
          '$2a$12$Gel7UtDBU1oP13rc5hu.juVNcnrkxQabnFgYw7OYXLqE74vgNFuhW',
      },
      {
        _id: new mongoose.Types.ObjectId('2587f708ed0c57054008e500'),
        firstName: 'Heba',
        lastName: 'Nour',
        email: 'heba@gmail.com',
        password:
          '$2a$12$Gel7UtDBU1oP13rc5hu.juVNcnrkxQabnFgYw7OYXLqE74vgNFuhW',
      },
      {
        _id: new mongoose.Types.ObjectId('789ea40720dcfa02e0ae42db'),
        firstName: 'Kamal',
        lastName: 'Issa',
        email: 'kamal@gmail.com',
        password:
          '$2a$12$Gel7UtDBU1oP13rc5hu.juVNcnrkxQabnFgYw7OYXLqE74vgNFuhW',
      },
      {
        _id: new mongoose.Types.ObjectId('147ea40720dcfa02e0ae42db'),
        firstName: 'Lina',
        lastName: 'Abbas',
        email: 'lina@gmail.com',
        password:
          '$2a$12$Gel7UtDBU1oP13rc5hu.juVNcnrkxQabnFgYw7OYXLqE74vgNFuhW',
      },
      {
        _id: new mongoose.Types.ObjectId('6411ec3d1feb9523d5036e9d'),
        firstName: 'Tamara',
        lastName: 'Rushdi',
        email: 'tamara@gmail.com',
        password:
          '$2a$12$Gel7UtDBU1oP13rc5hu.juVNcnrkxQabnFgYw7OYXLqE74vgNFuhW',
      },
      {
        _id: new mongoose.Types.ObjectId('6411bd24231678cfdf841048'),
        firstName: 'Arwa',
        lastName: 'Ammar',
        email: 'arwa@gmail.com',
        password:
          '$2a$12$Gel7UtDBU1oP13rc5hu.juVNcnrkxQabnFgYw7OYXLqE74vgNFuhW',
      },
      {
        _id: new mongoose.Types.ObjectId('6411bd4547dc76574443c75a'),
        firstName: 'Nada',
        lastName: 'Ammar',
        email: 'nada@gmail.com',
        password:
          '$2a$12$Gel7UtDBU1oP13rc5hu.juVNcnrkxQabnFgYw7OYXLqE74vgNFuhW',
      },
    ],
  },
  {
    name: 'conversations',
    documents: [
      {
        _id: new mongoose.Types.ObjectId('6411bf90d1d20cd44e2911b9'),
        users: ['6357f708ed0c57054008e300', '123ea40720dcfa02e0ae42db'],
        messages: [
          {
            type: 'text',
            text: 'Hello',
            sender: '6357f708ed0c57054008e300',
          },
          {
            type: 'text',
            text: 'Hi there!',
            sender: '123ea40720dcfa02e0ae42db',
          },
        ],
      },
      {
        _id: new mongoose.Types.ObjectId('6411ec8cd7b346af1913d46d'),
        users: ['456ea40720dcfa02e0ae42db', '8977f708ed0c57054008e400'],
        messages: [
          {
            type: 'text',
            text: 'Hi',
            sender: '8977f708ed0c57054008e400',
          },
          {
            type: 'text',
            text: 'Hello there!',
            sender: '456ea40720dcfa02e0ae42db',
          },
        ],
      },
      {
        _id: new mongoose.Types.ObjectId('6411bfa23854cf0b8f4ddea8'),
        users: ['456ea40720dcfa02e0ae42db', '8977f708ed0c57054008e400'],
        messages: [
          {
            type: 'text',
            text: 'Hi',
            sender: '8977f708ed0c57054008e400',
          },
          {
            type: 'text',
            text: 'Hello there!',
            sender: '456ea40720dcfa02e0ae42db',
          },
        ],
      },
      {
        _id: new mongoose.Types.ObjectId('6411eca56e9d4cac192a49bd'),
        users: [
          '2587f708ed0c57054008e500',
          '6411bd4547dc76574443c75a',
          '6411bd24231678cfdf841048',
          '147ea40720dcfa02e0ae42db',
        ],
        messages: [
          {
            type: 'text',
            text: 'Hi all',
            sender: '2587f708ed0c57054008e500',
          },
          {
            type: 'text',
            text: 'Hello there!',
            sender: '6411bd4547dc76574443c75a',
          },
          {
            type: 'image',
            image:
              'https://images.pexels.com/photos/8289647/pexels-photo-8289647.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
            sender: '6411bd24231678cfdf841048',
          },
          {
            type: 'action',
            text: 'added',
            sender: '147ea40720dcfa02e0ae42db',
          },
        ],
      },
    ],
  },
];

export const seed = () =>
  seeder
    .import(collections)
    .then(() => console.log('Database seeded successfully!'))
    .catch((error) => console.log(`Failed to seed the database! ${error}`));