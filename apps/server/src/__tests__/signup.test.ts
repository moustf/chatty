import request from 'supertest';

import { dbConnect } from '../database/connection';
import { seed } from '../database/seeders';
import { app } from '../server';

beforeAll(() => dbConnect().then(() => seed()));

afterAll(() => dbConnect().then((db) => db.connection.close()));

describe('Testing the signup route', () => {
  test('Testing the success case, creating the user and returning 201 status code', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'test1',
        lastName: 'test1',
        email: 'test1@gmail.com',
        password: 'Test@123',
      })
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
