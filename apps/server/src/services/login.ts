import { StatusCodes, validateLoginData } from '@chatty/types';

import { getUserByEmail } from '../queries/user';
import { comparePasswords } from '../utils/bcrypt';
import { GenericError } from '../utils/custom/GenericError';
import { generateToken } from '../utils/jwt';

export const loginUser = async (email: string, password: string) => {
  await validateLoginData.validate({ email, password });

  const user = await getUserByEmail(email);
  const userPassword = user?.password as string;

  if (!user) {
    throw new GenericError(
      StatusCodes.NotFound,
      'The user does not have account on the platform!'
    );
  }

  const areSamePasswords = await comparePasswords(password, userPassword);

  if (!areSamePasswords) {
    throw new GenericError(
      StatusCodes.Unauthorized,
      "The user's password is not valid!"
    );
  }

  const token = await generateToken({ id: user.id, email });

  return { token, user };
};
