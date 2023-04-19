import request from 'supertest';

import { app } from '../../server';

export const getUserTokenFromSignup = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const user = await request(app).post('/api/v1/auth/signup').send({
    firstName,
    lastName,
    email,
    password,
  });

  return user.header['set-cookie'][0].split('=')[1].split(';')[0];
};
