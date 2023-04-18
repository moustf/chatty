import request from 'supertest';

import { app } from '../../server';

export const getUserTokenFromLogin = async (
  email: string,
  password: string
) => {
  const user = await request(app)
    .post('/api/v1/auth/login')
    .send({ email, password });

  return user.header['set-cookie'][0].split('=')[1].split(';')[0];
};
