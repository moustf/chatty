import { User as UserInterface } from '@chatty/types';

import { User } from '../models/users';

export const getUserByEmail = (email: string) => User.findOne({ email }).exec();

export const createUser = (userObj: UserInterface) => User.create(userObj);

export const getUser = (filterObj = {}, options = {}) =>
  User.findOne(filterObj, options).exec();

export const searchForUser = (searchText: string) =>
  User.find(
    {
      $or: [
        {
          firstName: {
            $regex: searchText,
            $options: 'i',
          },
        },
        {
          lastName: {
            $regex: searchText,
            $options: 'i',
          },
        },
        {
          email: {
            $regex: searchText,
            $options: 'i',
          },
        },
      ],
    },
    { firstName: 1, lastName: 1, email: 1, createdAt: 1 }
  );
