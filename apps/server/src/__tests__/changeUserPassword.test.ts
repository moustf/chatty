import request from 'supertest';

import { app } from '../server';

describe("Testing the route of changing the user's password route", () => {
  test('In the success case, the route should return 200 status code, success message and true as a data', async () => {
    const user = await request(app).post('/api/v1/auth/signup').send({
      firstName: 'test2',
      lastName: 'test2',
      email: 'test2@gmail.com',
      password: 'Test@123',
    });

    const token = user.header['set-cookie'][0].split('=')[1].split(';')[0];

    const res = await request(app)
      .put('/api/v1/user/password')
      .set('Cookie', [`token=${token}`])
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
    const user = await request(app).post('/api/v1/auth/signup').send({
      firstName: 'test2',
      lastName: 'test2',
      email: 'test2@gmail.com',
      password: 'Test@123',
    });

    const token = user.header['set-cookie'][0].split('=')[1].split(';')[0];

    const res = await request(app)
      .put('/api/v1/user/password')
      .set('Cookie', [`token=${token}`])
      .send({
        oldPassword: 'Test@123',
        newPassword: 'Test',
      })
      .expect(400);

    expect(res.body.msg).toBe('Users must match the pattern requirements!');
  });

  test('Testing the failure case, the route should return 401 status code and the Forbidden message', async () => {
    const user = await request(app).post('/api/v1/auth/signup').send({
      firstName: 'test2',
      lastName: 'test2',
      email: 'test2@gmail.com',
      password: 'Test@123',
    });

    const token = user.header['set-cookie'][0].split('=')[1].split(';')[0];

    const res = await request(app)
      .put('/api/v1/user/password')
      .set('Cookie', [`token=${token}`])
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
