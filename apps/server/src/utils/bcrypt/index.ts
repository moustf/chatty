import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const hashed = await bcrypt.hash(password, 12);

  return hashed;
};

export const comparePasswords = (password: string, hashed: string) =>
  bcrypt.compare(password, hashed);
