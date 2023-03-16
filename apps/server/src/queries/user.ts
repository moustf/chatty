import { User as UserInterface } from '@chatty/types';

import { User } from '../models/users';

export const getUserByEmail = (email: string) => User.findOne({ email }).exec();

export const createUser = (userObj: UserInterface) => User.create(userObj);

export const getUser = (filterObj = {}, options = {}) =>
  User.findOne(filterObj, options).exec();
