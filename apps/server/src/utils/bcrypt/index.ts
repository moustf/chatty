import { hash, compare } from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const hashed = await hash(password, 12);

  return hashed;
};

export const comparePasswords = (password: string, hashed: string) =>
  compare(password, hashed);
