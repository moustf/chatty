import request from 'supertest';

import { app } from '../server';
import { generateToken } from '../utils/jwt';

describe('Testing the signup route', () => {
  test('Testing the success case, the route should return the users info and the 200 status code', (done) => {
    request(app)
      .get('/api/v1/user')
      .set('Cookie', [
        'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTdmNzA4ZWQwYzU3MDU0MDA4ZTMwMCIsImVtYWlsIjoibXVzdGFmYUBnbWFpbC5jb20iLCJpYXQiOjE2Nzk4Nzg3MzR9.Gj-cDCv8kj2cSP0kWWYo_5eMMwMMDKzEC3bQGutRjNE',
      ])
      .expect(200)
      .end((error, res) => {
        if (error) return done(error);

        expect(res.body.data.email).toBe('mustafa@gmail.com');
        return done();
      });
  });

  test('Testing the failure case, the route should return not found msg and the 404 status code', async () => {
    const token = await generateToken({ id: 93739, email: 'test@gmail.com' });

    console.log(token, 'tokkkkkkkkkkkken');

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
