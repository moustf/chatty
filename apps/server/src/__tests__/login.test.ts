import request from 'supertest';

import { app } from '../server';

describe('Testing the login route', () => {
  test('Testing the login route on the success case, returning the success status code and the success message', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'mustafa@gmail.com',
        password: 'Root@123',
      })
      .expect(200)
      .end((error, res) => {
        if (error) return done(error);

        expect(res.body.msg).toBe(
          'The user has logged in to his account successfully!'
        );
        expect(res.body.data.email).toBe('mustafa@gmail.com');
        return done();
      });
  });

  test('Testing the login route on the failure case, returning the not found status code and the does not exist message', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'haka@gmail.com',
        password: 'Root@123',
      })
      .expect(404)
      .end((error, res) => {
        if (error) return done(error);

        expect(res.body.msg).toBe(
          'The user does not have account on the platform!'
        );
        return done();
      });
  });

  test('Testing the login route on the failure case, returning the unauthorized status code and the does unauthorized message', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'mustafa@gmail.com',
        password: 'Root@1',
      })
      .expect(403)
      .end((error, res) => {
        if (error) return done(error);

        expect(res.body.msg).toBe("The user's password is not valid!");
        return done();
      });
  });
});
