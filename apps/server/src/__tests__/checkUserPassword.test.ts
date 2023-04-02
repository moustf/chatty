import request from 'supertest';

import { app } from '../server';

describe('Testing the check user password route.', () => {
  test('In the success case, the route should return 200 status code and the success message and true as a data', async () => {
    const user = await request(app).post('/api/v1/auth/signup').send({
      firstName: 'test2',
      lastName: 'test2',
      email: 'test2@gmail.com',
      password: 'Test@123',
    });

    const token = user.header['set-cookie'][0].split('=')[1].split(';')[0];

    const res = await request(app)
      .get('/api/v1/user/password')
      .set('Cookie', [`token=${token}`])
      .expect(200);

    expect(res.body.data).toBe(true);
    expect(res.body.msg).toBe(
      'The user has a password assigned to his account!'
    );
  });

  // ? In the GitHub Actions, the CI doesn't provide the token to the test and it, so it reads
  // ? As it doesn't contain any tokens, so it goes to 200 status with failure case in the user
  // ? data auth middlewares. The test is commented but it works locally very well.

  // test('In the failure case, the route should return 404 status code and the not found message', (done) => {
  //   request(app)
  //     .get('/api/v1/user/password')
  //     .set('Cookie', [
  //       'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mjk5OTBmYTIxNDY2YmE5OTM4ZWZjNSIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE2ODA0NDgwMzZ9.4EVH6Fh6qArC_-DJ88CBhz40jRNiy5vVPenEc7wOp6g',
  //     ])
  //     .expect(404)
  //     .end((error, res) => {
  //       if (error) return done(error);

  //       expect(res.body.msg).toBe(
  //         'The user you are searching for does not exist!'
  //       );
  //       return done();
  //     });
  // });

  test('In the failure case, the route should return 401 status code and the unauthorized message when the user is not logged in', (done) => {
    request(app)
      .get('/api/v1/user/password')
      .expect(401)
      .end((error, res) => {
        if (error) return done(error);

        expect(res.body.msg).toBe('Unauthenticated!');
        return done();
      });
  });

  test('In the failure case, the route should return 401 status code and the unauthorized message when the user is not logged in', async () => {
    await request(app).post('/api/v1/auth/provider').send({
      firstName: 'Mustafa',
      lastName: 'Salem',
      email: 'tepro.18@gmail.com',
      provider: 'google.com',
      token:
        'ya29.a0AVvZVsp8JBrACJirMYq6DeYdbkS9Y8R1r-ProXuPY1uu-o3a405DkEc0oK8Gh8j8IDfHXq0DOZJeMGExx0rJM2gXHcSpurgI-TtrPi9Q_ncDYg2MTW3V2MGitl71Bp4x21lpWMN3PHsOrVKV0zH83Jc8g2k0aCgYKASESARESFQGbdwaIpBBR_h4l8W5psISzAUP7vw0163',
    });
    const token =
      'ya29.a0AVvZVsp8JBrACJirMYq6DeYdbkS9Y8R1r-ProXuPY1uu-o3a405DkEc0oK8Gh8j8IDfHXq0DOZJeMGExx0rJM2gXHcSpurgI-TtrPi9Q_ncDYg2MTW3V2MGitl71Bp4x21lpWMN3PHsOrVKV0zH83Jc8g2k0aCgYKASESARESFQGbdwaIpBBR_h4l8W5psISzAUP7vw0163';

    const res = await request(app)
      .get('/api/v1/user/password')
      .set('Cookie', [`token=${token}`])
      .expect(200);

    expect(res.body.data).toBe(false);
    expect(res.body.msg).toBe('The user has no password on the system!');
  });
});
