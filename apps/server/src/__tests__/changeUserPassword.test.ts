import request from 'supertest';

import { app } from '../server';
import { getUserTokenFromSignup } from '../utils/helpers/signupHelper';

describe("Testing the route of changing the user's password", () => {
  test('In the success case, the route should return 200 status code, success message and true as a data', async () => {
    const testToken = await getUserTokenFromSignup(
      'test2',
      'test2',
      'test2@gmail.com',
      'Test@123'
    );

    const res = await request(app)
      .put('/api/v1/user/password')
      .set('Cookie', [`token=${testToken}`])
      .send({
        oldPassword: 'Test@123',
        newPassword: 'Test@12345',
      })
      .expect(200);

    expect(res.body.msg).toBe("The user's password did change successfully!");
    expect(res.body.data).toBe(true);

    await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test2@gmail.com',
        password: 'Test@12345',
      })
      .expect(200);
  });

  test('Testing the failure case, the route should return 400 status code and the user not found message', async () => {
    const testToken = await getUserTokenFromSignup(
      'test2',
      'test2',
      'test2@gmail.com',
      'Test@123'
    );

    const res = await request(app)
      .put('/api/v1/user/password')
      .set('Cookie', [`token=${testToken}`])
      .send({
        oldPassword: 'Test@123',
        newPassword: 'Test',
      })
      .expect(400);

    expect(res.body.msg).toBe('Users must match the pattern requirements!');
  });

  test('Testing the failure case, the route should return 401 status code and the Forbidden message', async () => {
    const testToken = await getUserTokenFromSignup(
      'test2',
      'test2',
      'test2@gmail.com',
      'Test@123'
    );

    const res = await request(app)
      .put('/api/v1/user/password')
      .set('Cookie', [`token=${testToken}`])
      .send({
        oldPassword: 'Test@456',
        newPassword: 'Test@12345',
      })
      .expect(403);

    expect(res.body.msg).toBe(
      'The old password is not compatible with the new password!'
    );
  });
});
