import request from 'supertest';

import { app } from '../server';

describe('Testing the auth providers route', () => {
  test('Testing the success route, the user should return 200 status code and success message for google auth', (done) => {
    request(app)
      .post('/api/v1/auth/providers')
      .send({
        firstName: 'Mustafa',
        lastName: 'Salem',
        email: 'tepro.18@gmail.com',
        provider: 'google.com',
        token:
          'ya29.a0AVvZVsp8JBrACJirMYq6DeYdbkS9Y8R1r-ProXuPY1uu-o3a405DkEc0oK8Gh8j8IDfHXq0DOZJeMGExx0rJM2gXHcSpurgI-TtrPi9Q_ncDYg2MTW3V2MGitl71Bp4x21lpWMN3PHsOrVKV0zH83Jc8g2k0aCgYKASESARESFQGbdwaIpBBR_h4l8W5psISzAUP7vw0163',
      })
      .expect(201)
      .end((error, res) => {
        if (error) return done(error);

        expect(res.body.msg).toBe('The user have been created successfully!');
        return done();
      });
  });

  test('Testing the success route, the user should return 200 status code and success message for facebook route', (done) => {
    request(app)
      .post('/api/v1/auth/providers')
      .send({
        firstName: 'Mustafa',
        lastName: 'Salem',
        email: 'mustafa@gmail.com',
        provider: 'facebook.com',
        token:
          'EAAXiGICYZBhoBAAzr28XZCjSO0UcejyKhyF9srCBfnGRArCbtpwqJM5K5g8juhBKbtHLvuH2hEzIVmHArT006zlIehLpriHmIodFf36DDOyrTQWu52FXE3Ud7uF5TAmBbn7FKWia51NfZCZCHGMVJ1jqPk1KBEwn1EAjOWXPJMcCiYULy8ZCewgyZAyZC7nnmahriTr9nOwslz2U0xhlDhwx01huVFMMgZCKRn1LzaTFSQZDZD',
      })
      .expect(201)
      .end((error, res) => {
        if (error) return done(error);

        expect(res.body.msg).toBe('The user have been created successfully!');
        return done();
      });
  });

  test('Testing the failure route, the user should return 400 status code and failure message message', (done) => {
    request(app)
      .post('/api/v1/auth/providers')
      .send({
        firstName: 'Mustafa',
        lastName: 'Salem',
        email: 'hello',
        provider: 'facebook.com',
        token:
          'EAAXiGICYZBhoBAAzr28XZCjSO0UcejyKhyF9srCBfnGRArCbtpwqJM5K5g8juhBKbtHLvuH2hEzIVmHArT006zlIehLpriHmIodFf36DDOyrTQWu52FXE3Ud7uF5TAmBbn7FKWia51NfZCZCHGMVJ1jqPk1KBEwn1EAjOWXPJMcCiYULy8ZCewgyZAyZC7nnmahriTr9nOwslz2U0xhlDhwx01huVFMMgZCKRn1LzaTFSQZDZD',
      })
      .expect(400)
      .end((error, res) => {
        if (error) return done(error);

        expect(res.body.msg).toBe('The user has provided wrong data!');
        return done();
      });
  });
});
