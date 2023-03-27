import request from 'supertest';

import { app } from '../server';

describe('Testing the route for searching for user', () => {
  test('Testing the success case, the route should return the success status code and the user info', (done) => {
    request(app)
      .get('/api/v1/user/find?q=mustafa')
      .set('Cookie', [
        'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTdmNzA4ZWQwYzU3MDU0MDA4ZTMwMCIsImVtYWlsIjoibXVzdGFmYUBnbWFpbC5jb20iLCJpYXQiOjE2Nzk4Nzg3MzR9.Gj-cDCv8kj2cSP0kWWYo_5eMMwMMDKzEC3bQGutRjNE',
      ])
      .expect(200)
      .end((error, res) => {
        if (error) return done(error);

        expect(res.body.data[0].email).toBe('mustafa@gmail.com');
        return done();
      });
  });

  test('Testing the failure case, the route should return the not found status code and the user does not exist message', (done) => {
    request(app)
      .get('/api/v1/user/find?q=haraty')
      .set('Cookie', [
        'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTdmNzA4ZWQwYzU3MDU0MDA4ZTMwMCIsImVtYWlsIjoibXVzdGFmYUBnbWFpbC5jb20iLCJpYXQiOjE2Nzk4Nzg3MzR9.Gj-cDCv8kj2cSP0kWWYo_5eMMwMMDKzEC3bQGutRjNE',
      ])
      .expect(404)
      .end((error, res) => {
        if (error) return done(error);

        expect(res.body.msg).toBe(
          'The user you are searching for does not exist!'
        );
        return done();
      });
  });

  test('Testing the failure case, the route should return the bad request status code and the wrong data message', (done) => {
    request(app)
      .get('/api/v1/user/find')
      .set('Cookie', [
        'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTdmNzA4ZWQwYzU3MDU0MDA4ZTMwMCIsImVtYWlsIjoibXVzdGFmYUBnbWFpbC5jb20iLCJpYXQiOjE2Nzk4Nzg3MzR9.Gj-cDCv8kj2cSP0kWWYo_5eMMwMMDKzEC3bQGutRjNE',
      ])
      .expect(400)
      .end((error, res) => {
        if (error) return done(error);

        expect(res.body.msg).toBe(
          'The text you are searching with does not belong to any user!'
        );
        return done();
      });
  });
});
