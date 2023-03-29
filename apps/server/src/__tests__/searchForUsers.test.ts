import request from 'supertest';

import { app } from '../server';

describe('Testing the route for searching for user', () => {
  test('Testing the success case, the route should return the success status code and the user info', async () => {
    const user = await request(app).post('/api/v1/auth/signup').send({
      firstName: 'Hadi',
      lastName: 'Hadi',
      email: 'hadi@gmail.com',
      password: 'Test@123',
    });

    const token = user.headers['set-cookie'][0].split('=')[1].split(';')[0];

    const res = await request(app)
      .get('/api/v1/user/find?q=mustafa')
      .set('Cookie', [`token=${token}`])
      .expect(200);

    expect(res.body.data[0].email).toBe('mustafa@gmail.com');
  });

  test('Testing the failure case, the route should return the not found status code and the user does not exist message', async () => {
    const user = await request(app).post('/api/v1/auth/signup').send({
      firstName: 'Hadi',
      lastName: 'Hadi',
      email: 'hadi@gmail.com',
      password: 'Test@123',
    });

    const token = user.headers['set-cookie'][0].split('=')[1].split(';')[0];

    const res = await request(app)
      .get('/api/v1/user/find?q=haraty')
      .set('Cookie', [`token=${token}`])
      .expect(404);

    expect(res.body.msg).toBe('The user you are searching for does not exist!');
  });

  test('Testing the failure case, the route should return the bad request status code and the wrong data message', async () => {
    const user = await request(app).post('/api/v1/auth/signup').send({
      firstName: 'Hadi',
      lastName: 'Hadi',
      email: 'hadi@gmail.com',
      password: 'Test@123',
    });

    const token = user.headers['set-cookie'][0].split('=')[1].split(';')[0];

    const res = await request(app)
      .get('/api/v1/user/find')
      .set('Cookie', [`token=${token}`])
      .expect(400);

    expect(res.body.msg).toBe(
      'The text you are searching with does not belong to any user!'
    );
  });
});
