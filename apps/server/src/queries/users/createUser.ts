import { User as UserInterface } from '@chatty/types';

import { User } from '../../models';

export const createUser = (userObj: UserInterface) => User.create(userObj);
