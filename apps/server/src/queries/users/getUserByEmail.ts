import { User } from '../../models';

export const getUserByEmail = (email: string) => User.findOne({ email }).exec();
