import request from 'supertest';

import { app } from '../server';
import { getUserTokenFromSignup } from '../utils/helpers/signupHelper';

describe('Testing the user auth route for getting the user data', () => {
  test('Testing the success case, returning the success status code the email fo the user', async () => {
    const himaToken = await getUserTokenFromSignup(
      'Hima',
      'Hima',
      'Hima@gmail.com',
      'Root@123'
    );

    const res = await request(app)
      .post('/api/v1/auth')
      .set('Cookie', [`token=${himaToken}`])
      .expect(200);

    expect(res.body.msg).toBe('The user is authenticated successfully!');
    expect(res.body.data.email).toBe('Hima@gmail.com');
  });

  test('Testing the failure case, returning the unauthorized status code the unauthenticated message', (done) => {
    request(app)
      .post('/api/v1/auth')
      .expect(401)
      .end((error, res) => {
        if (error) return done(error);

        expect(res.body.msg).toBe('Unauthenticated!');
        done();
      });
  });
});
