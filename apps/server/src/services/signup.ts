import { User, STATUS_CODES } from '@chatty/types';

import { getUserByEmail, createUser, getUser } from '../queries/user';
import { hashPassword } from '../utils/bcrypt';
import { GenericError } from '../utils/custom/GenericError';
import { generateToken } from '../utils/jwt';

export const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
}: User) => {
  const userByEmail = await getUserByEmail(email);

  if (userByEmail)
    throw new GenericError(STATUS_CODES.CONFLICT, 'User already exists!');

  const hashedPassword = await hashPassword(password);

  await createUser({
    firstName,
    lastName,
    email,
    hashedPassword,
  });

  const createdUser = await getUser({ email }, { password: 0 });

  const token = await generateToken({ email });

  return { createdUser, token };
};
