import request from 'supertest';

import { app } from '../server';
import { getUserTokenFromSignup } from '../utils/helpers';
import { generateToken } from '../utils/jwt';

describe('Testing the get user by id route', () => {
  test('Testing the success case, the route should return the users info and the 200 status code', async () => {
    const testToken = await getUserTokenFromSignup(
      'test',
      'test',
      'test@gmail.com',
      'Test@123'
    );

    const res = await request(app)
      .get('/api/v1/user')
      .set('Cookie', [`token=${testToken}`])
      .expect(200);

    expect(res.body.data.email).toBe('test@gmail.com');
  });

  test('Testing the failure case, the route should return not found msg and the 404 status code', async () => {
    const token = await generateToken({ id: '93739', email: 'test@gmail.com' });

    const res = await request(app)
      .get('/api/v1/user')
      .set('Cookie', [`token=${token}`])
      .expect(404);

    expect(res.body.msg).toBe('The user you are searching for does not exist!');
  });

  test('Testing the failure case, the route should return unauthorized msg and the 401 status code', (done) => {
    request(app)
      .get('/api/v1/user')
      .expect(401)
      .end((error, res) => {
        if (error) return done(error);

        expect(res.body.msg).toBe('Unauthenticated!');
        return done();
      });
  });
});
