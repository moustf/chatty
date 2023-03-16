import request from 'supertest';

import { app } from '../server';

describe('Testing the signup route', () => {
  // TODO: you havent verified that the user got created in the user model
  // TODO: make sure to use async await syntax in tests
  // TODO: no expects on status code?
  test('Testing the success case, creating the user and returning 201 status code', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'test1',
        lastName: 'test1',
        email: 'test1@gmail.com',
        password: 'Test@123',
      })
      .expect(201)
      .end((error, res) => {
        if (error) return done(error);

        expect(res.status).toBe(201);
        return done();
      });
  });

  test('Testing the success case, creating the user and returning the user account object', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'test2',
        lastName: 'test2',
        email: 'test2@gmail.com',
        password: 'Test@123',
      })
      .end((error, res) => {
        if (error) return done(error);

        expect(res.body.data.firstName).toBe('test2');
        return done();
      });
  });

  // TODO: THIS TEST IS BAD because it assumes that the previous test ran successfully,
  // the data base now gets reset before each test and gets reseeded, instead of one before ALL tests.
  test('Testing the failure case, returning an error for duplicate email account', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'test2',
        lastName: 'test2',
        email: 'test2@gmail.com',
        password: 'Test@123',
      })
      .expect(409)
      .end((error, res) => {
        if (error) return done(error);

        expect(res.body.msg).toBe('User already exists!');
        return done();
      });
  });

  test('Testing the failure case, returning an error for not valid user data', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'test3',
        lastName: 'test3',
        email: 'test3@gmail',
        password: 'Test@123',
      })
      .expect(400)
      .end((error, res) => {
        if (error) return done(error);

        expect(res.body.msg).toBe('The user has provided wrong data!');
        return done();
      });
  });

  test('Testing the failure case, returning an error for not valid user data', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'test3',
        lastName: 'test3',
        email: 'test3@gmail',
        password: 'test@123',
      })
      .expect(400)
      .end((error, res) => {
        if (error) return done(error);

        expect(res.body.msg).toBe('The user has provided wrong data!');
        return done();
      });
  });
});
