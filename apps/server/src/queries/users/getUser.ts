import { User } from '../../models';

export const getUser = (filterObj = {}, options = {}) =>
  User.findOne(filterObj, options).exec();
