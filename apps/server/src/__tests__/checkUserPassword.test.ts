import request from 'supertest';

import { app } from '../server';
import {
  getUserTokenFromSignup,
  getUserTokenWithSocialAuth,
} from '../utils/helpers';

describe('Testing the check user password route.', () => {
  test('In the success case, the route should return 200 status code and the success message and true as a data', async () => {
    const testToken = await getUserTokenFromSignup(
      'test2',
      'test2',
      'test2@gmail.com',
      'Test@123'
    );

    const res = await request(app)
      .get('/api/v1/user/password')
      .set('Cookie', [`token=${testToken}`])
      .expect(200);

    expect(res.body.data).toBe(true);
    expect(res.body.msg).toBe(
      'The user has a password assigned to his account!'
    );
  });

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
    const mustafaToken = await getUserTokenWithSocialAuth(
      'Mustafa',
      'Salem',
      'tepro.18@gmail.com',
      'google.com',
      'ya29.a0AVvZVsp8JBrACJirMYq6DeYdbkS9Y8R1r-ProXuPY1uu-o3a405DkEc0oK8Gh8j8IDfHXq0DOZJeMGExx0rJM2gXHcSpurgI-TtrPi9Q_ncDYg2MTW3V2MGitl71Bp4x21lpWMN3PHsOrVKV0zH83Jc8g2k0aCgYKASESARESFQGbdwaIpBBR_h4l8W5psISzAUP7vw0163'
    );

    const res = await request(app)
      .get('/api/v1/user/password')
      .set('Cookie', [`token=${mustafaToken}`])
      .expect(200);

    expect(res.body.data).toBe(false);
    expect(res.body.msg).toBe('The user has no password on the system!');
  });
});
