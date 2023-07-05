import { User, StatusCodes } from '@chatty/types';

import { getUserByEmail, createUser, getUser } from '../queries';
import { hashPassword, generateToken, GenericError } from '../utils';

export const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
}: User) => {
  const userByEmail = await getUserByEmail(email as string);

  if (userByEmail)
    throw new GenericError(StatusCodes.Conflict, 'User already exists!');

  const hashedPassword = await hashPassword(password as string);

  const user = await createUser({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  const createdUser = await getUser({ email }, { password: 0 });

  const token = await generateToken({ id: user.id, email });

  return { user: createdUser, token };
};
