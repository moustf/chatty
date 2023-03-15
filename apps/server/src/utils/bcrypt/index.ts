import bcrypt from 'bcrypt';

export const hashPassword = (password: string) => bcrypt.hash(password, 12);

export const comparePasswords = (password: string, hashed: string) =>
  bcrypt.compare(password, hashed);
