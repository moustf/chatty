import request from 'supertest';

import { app } from '../server';
import {
  getUserTokenFromLogin,
  getUserTokenFromSignup,
} from '../utils/helpers';

describe('Testing the get users conversations route', () => {
  test("Testing the success case, the route should return the user's conversations and the 200 status code with the conversations array", async () => {
    const mustafaToken = await getUserTokenFromLogin(
      'mustafa@gmail.com',
      'Root@123'
    );

    const res = await request(app)
      .get('/api/v1/user/conversations')
      .set('Cookie', [`token=${mustafaToken}`])
      .expect(200);

    expect(res.body.msg).toBe(
      "The user's conversations did return successfully!"
    );
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('Testing the failure case, the route should return not found msg and the 404 status code', async () => {
    const testToken = await getUserTokenFromSignup(
      'test2',
      'test2',
      'test2@gmail.com',
      'Test@123'
    );

    const res = await request(app)
      .get('/api/v1/user/conversations')
      .set('Cookie', [`token=${testToken}`])
      .expect(404);

    expect(res.body.msg).toBe('The users has no conversations!');
  });

  test('In the failure case, the route should return 401 status code and the unauthorized message when the user is not logged in', (done) => {
    request(app)
      .get('/api/v1/user/conversations')
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.msg).toBe('Unauthenticated!');
        return done();
      });
  });
});
