import request from 'supertest';

import { app } from '../../server';

export const getUserTokenWithSocialAuth = async (
  firstName: string,
  lastName: string,
  email: string,
  provider: string,
  token: string
) => {
  await request(app).post('/api/v1/auth/providers').send({
    firstName,
    lastName,
    email,
    provider,
    token,
  });

  return token;
};
