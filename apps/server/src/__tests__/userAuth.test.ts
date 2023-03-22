import request from 'supertest';

import { app } from '../server';

describe('Testing the user auth route for getting the user data', () => {
  test('Testing the success case, returning the success status code the email fo the user', async () => {
    await request(app).post('/api/v1/auth/signup').send({
      firstName: 'hima',
      lastName: 'hims',
      email: 'hima@gmail.com',
      password: 'Root@123',
    });

    const res = await request(app)
      .post('/api/v1/auth')
      .set('Cookie', [
        'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhpbWFAZ21haWwuY29tIiwiaWF0IjoxNjc5NTAxMDQ0fQ.cZuD4gnmWJUTxM0lgqva6SH_OZYoJ1Va_ZxoxpUaRNA',
      ])
      .expect(200);

    expect(res.body.msg).toBe('The user is authenticated successfully!');
    expect(res.body.data.email).toBe('hima@gmail.com');
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
