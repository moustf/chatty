import request from 'supertest';

import { app } from '../server';

describe('Testing the get users conversations route', () => {
  // ? This test is maybe going to fail in the GitHub Actions tests.
  test("Testing the success case, the route should return the user's conversations and the 200 status code with the conversations array", async () => {
    const user = await request(app).post('/api/v1/auth/login').send({
      email: 'mustafa@gmail.com',
      password: 'Root@123',
    });

    const token = user.header['set-cookie'][0].split('=')[1].split(';')[0];

    const res = await request(app)
      .get('/api/v1/user/conversations')
      .set('Cookie', [`token=${token}`])
      .expect(200);

    expect(res.body.msg).toBe(
      "The user's conversations did return successfully!"
    );
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('Testing the failure case, the route should return not found msg and the 404 status code', async () => {
    const user = await request(app).post('/api/v1/auth/signup').send({
      firstName: 'test2',
      lastName: 'test2',
      email: 'test2@gmail.com',
      password: 'Test@123',
    });

    const token = user.header['set-cookie'][0].split('=')[1].split(';')[0];

    const res = await request(app)
      .get('/api/v1/user/conversations')
      .set('Cookie', [`token=${token}`])
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
